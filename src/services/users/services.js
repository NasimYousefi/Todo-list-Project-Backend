
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