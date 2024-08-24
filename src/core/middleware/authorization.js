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
  
  const token = req.header('Authorization')?.replace('Bearer ', '');
 
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    req.body.user_id = req.userId;

   
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}