import 'dotenv/config';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export{
    auth
}