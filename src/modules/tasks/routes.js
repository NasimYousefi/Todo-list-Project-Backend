
import express from 'express';
import { authMiddleware } from '../../core/middleware/authorization.js';
import {
  getTasksByUserIdController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController
} from './controllers.js';
import { createTaskValidator, updateTaskValidator } from './validations.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/user/:userId', getTasksByUserIdController);
router.get('/:id', getTaskByIdController);
router.post('/', createTaskValidator, createTaskController);
router.put('/:id', updateTaskValidator, updateTaskController);
router.delete('/:id', deleteTaskController);

export {
  router
};