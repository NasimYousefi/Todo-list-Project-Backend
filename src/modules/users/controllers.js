import {
    getUserByIdService,
    createUserService,
    updateUserService,
    loginService,
    updateUserPasswordService,
  } from '../../services/users/services.js';
  import { getUserById } from '../../models/users/index.js';


  const getUserInfo = async (req, res) => {
    try {

      const userId = req.userId; 
      const user = await getUserById(userId);
  
      if (!user || user.length === 0) {

        console.log("User not found");

        return res.status(404).json({ error: 'User not found' });
      }
  
     
      const { password, ...userWithoutPassword } = user;

      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // const getUserByIdController = async (req, res, next) => {
  //   try {
  //     const userId = req.validatedParams.id;
  //     const user = await getUserByIdService(userId);
  //     if (user === null) {
  //       res.status(404).json({
  //         message: `The user with id=${userId} is not exists`
  //       });
  //     } else {
  //       res.json(user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({
  //       message: error.message
  //     });
  //   }
  // }

  const getUserByIdController = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await getUserByIdService(userId);
      if (user === null) {
        res.status(404).json({
          message: `The user with id=${userId} does not exist`
        });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error('Error in getUserByIdController:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  // const createUserController = async (req, res, next) => {
  //   try {
  //     const user = req.body;
  //     const createdUser = await createUserService(user);
  //     res.status(201).json(createdUser);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({
  //       message: error.message
  //     });
  //   }
  // }

  const createUserController = async (req, res) => {
    try {
      const userData = req.body;
      const createdUser = await createUserService(userData);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error('Error in createUserController:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

// const updatedUserDataController = async (req, res, next) => {
 
//   try {
//     const { id } = req.params;
//     const userData = req.body;
//     const updatedUser = await updateUserService(id, userData);
//     res.json(updatedUser);
//   } catch (error) {
//     console.error('Error in updateUserController:', error);
//     if (error.message === 'User not found') {
//       res.status(404).json({ message: error.message });
//     } else if (error.message === 'At least one field (name or email) is required for update') {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// };

const updatedUserDataController = async (req, res) => {
  try {
    // const { id } = req.params;
    // const userData = req.body;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const userData = req.body;
   
    const updatedUser = await updateUserService(id, userData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error in updatedUserDataController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updateUserPasswordController = async (req, res) => {
  // const { id } = req.params;
  const id = parseInt(req.params.id, 10);
  const { currentPassword, newPassword } = req.body;
  console.log('Received password update request:', { id, currentPassword: !!currentPassword, newPassword: !!newPassword });

  try {
    await updateUserPasswordService(id, currentPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginService(email, password);
    res.json({ user, token });
  } catch (error) {
    console.error('Error in loginController:', error);
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
  
  export {
    getUserByIdController,
    createUserController,
    updatedUserDataController,
    loginController,
    getUserInfo,
    updateUserPasswordController,
  }
  