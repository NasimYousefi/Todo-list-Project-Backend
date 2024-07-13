
import express from 'express';
import {
  getTasksByUserIdController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController
} from './controllers.js';
import { createTaskValidator, updateTaskValidator } from './validations.js';

const router = express.Router();

router.get('/user/:userId', getTasksByUserIdController);
router.get('/:id', getTaskByIdController);
router.post('/', createTaskValidator, createTaskController);
router.put('/:id', updateTaskValidator, updateTaskController);
router.delete('/:id', deleteTaskController);

export {
  router
};