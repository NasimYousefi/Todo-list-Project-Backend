import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userModel from '../../models/users/index.js';



function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
}


export async function registerUser(userData) {
  const user = await userModel.createUser(userData);
  const token = generateToken(user.id);
  return { user, token };
}

export async function loginUser(email, password) {
  const user = await userModel.findByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id);
  return { user: { id: user.id, username: user.username, email: user.email }, token };
}

