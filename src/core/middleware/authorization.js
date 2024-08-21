// import 'dotenv/config';

// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader === process.env.API_KEY) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// export{
//     auth
// }

import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  console.log("Headers received:", req.headers);
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("Token extracted:", token);
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("User ID from token:", req.userId);
    req.body.user_id = req.userId;

    console.log("in auth =>",req.userId);
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}