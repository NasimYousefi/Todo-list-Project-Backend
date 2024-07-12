
import { 
    getUserById,
    createUser,
    updateUser
  } from '../../models/users/index.js'
  
  async function getUserByIdService(userId) {
    const user = await getUserById(userId);
    if (user === null || user === undefined || user.length === 0) {
      return null;
    }
    return user[0];
  }
// async function createUserService(){
//   try {
//     const { name, email } = req.body;
//     const user = await createUser(name, email);
//     res.status(201).json(user.rows[0]);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
//   return user
// };


async function createUserService(userData){
  try {
    const user = await createUser(userData);
    return user;
  } catch (error) {
    console.error('Error in createUserService:', error);
  }
  
};

async function updateUserService(userId, updatedUserData){
  try {
    const user = await updateUser(userId, updatedUserData);
    if (user === null || user === undefined || user.length === 0) {
      return null;
    }
    return user[0];
  } catch (error) {
    console.error('Error in updateUserService:', error);
  }
  
}



  
  export {
    getUserByIdService,
    createUserService,
    updateUserService,
  }