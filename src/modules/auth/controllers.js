import * as authService from '../../services/auth/services.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await authService.registerUser({ username, email, password });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error in register controller:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    console.error('Error in login controller:', error);
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
};