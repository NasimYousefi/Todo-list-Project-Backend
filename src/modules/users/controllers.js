import {
    getUserByIdService,
    createUserService,
    updateUserService,
  } from '../../services/users/services.js'
  
  const getUserByIdController = async (req, res, next) => {
    try {
      const userId = req.validatedParams.id;
      const user = await getUserByIdService(userId);
      if (user === null) {
        res.status(404).json({
          message: `The user with id=${userId} is not exists`
        });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message
      });
    }
  }

  const createUserController = async (req, res, next) => {
    try {
      const user = req.body;
      const createdUser = await createUserService(user);
      res.status(201).json(createdUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message
      });
    }
  }

const updatedUserDataController = async (req, res, next) => {
 
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await updateUserService(id, userData);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error in updateUserController:', error);
    if (error.message === 'User not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'At least one field (name or email) is required for update') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
  
  export {
    getUserByIdController,
    createUserController,
    updatedUserDataController,
  }
  