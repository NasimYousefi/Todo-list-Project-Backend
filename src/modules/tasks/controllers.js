import * as taskService from '../../services/tasks/services.js';

const getTasksByUserIdController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await taskService.getTasksByUserIdService(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error in getTasksByUserIdController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTaskByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskByIdService(id);
    res.json(task);
  } catch (error) {
    console.error('Error in getTaskByIdController:', error);
  }
};

const createTaskController = async (req, res) => {
  try {
    const taskData = req.body;
    const newTask = await taskService.createTaskService(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error in createTaskController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    const taskData = req.body;
    const updatedTask = await taskService.updateTaskService(id, taskData);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error in updateTaskController:', error);
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await taskService.deleteTaskService(id);
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error in deleteTaskController:', error);
  }
};

export{
    getTasksByUserIdController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
  
}