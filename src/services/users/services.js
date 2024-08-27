
import { 
    getUserById,
    createUser,
    updateUser,
    findByEmail,
    updateUserPassword
  } from '../../models/users/index.js'
  import bcrypt from 'bcryptjs';
  import jwt from 'jsonwebtoken';
  
  async function getUserByIdService(userId) {
    const user = await getUserById(userId);
    if (user === null || user === undefined || user.length === 0) {
      return null;
    }
    return user[0];
  }


// async function createUserService(userData){
//   try {
//     const user = await createUser(userData);
//     return user;
//   } catch (error) {
//     console.error('Error in createUserService:', error);
//   }
  
// };

async function createUserService(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await createUser({ ...userData, password: hashedPassword });
    return user;
  } catch (error) {
    console.error('Error in createUserService:', error);
    throw error;
  }
}

async function updateUserService(userId, updatedUserData){
  try {
    
    const user = await updateUser(userId, updatedUserData);
    if (user === null || user === undefined || user.length === 0) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('Error in updateUserService:', error);
    throw error;
  }
  
}


const updateUserPasswordService = async (userId, currentPassword, newPassword) => {
  
  const user = await getUserById(userId); 
  
  if (!user) {
    throw new Error('User not found');
  }
  console.log('User found, checking password');
  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) {
    
    throw new Error('Current password is incorrect');
  }
 
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(userId, newPasswordHash);
  console.log('Password updated successfully for user:', userId);
};

async function loginService(email, password) {
  const user = await findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
}



  
  export {
    getUserByIdService,
    createUserService,
    updateUserService,
    loginService,
    updateUserPasswordService,
  }