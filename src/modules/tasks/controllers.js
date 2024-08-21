import * as taskService from '../../services/tasks/services.js';

// const getTasksByUserIdController = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const tasks = await taskService.getTasksByUserIdService(userId);
//     res.json(tasks);
//   } catch (error) {
//     console.error('Error in getTasksByUserIdController:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const getTasksByUserIdController = async (req, res) => {
  try {
    const userId = req.userId;
    const { status, search, category } = req.query;
    const tasks = await taskService.getTasksByUserIdService(userId, { status, search, category });
    res.json(tasks);
  } catch (error) {
    console.error('Error in getTasksByUserIdController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const getTaskByIdController = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const task = await taskService.getTaskByIdService(id);
//     res.json(task);
//   } catch (error) {
//     console.error('Error in getTaskByIdController:', error);
//   }
// };

const getTaskByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskByIdService(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user_id !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access to this task' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error in getTaskByIdController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const createTaskController = async (req, res) => {
//   try {
//     const taskData = req.body;
//     const newTask = await taskService.createTaskService(taskData);
//     res.status(201).json(newTask);
//   } catch (error) {
//     console.error('Error in createTaskController:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const createTaskController = async (req, res) => {
  try {
    const { userId } = req;
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const taskData = req.body;
 
    // taskData.due_date = new Date(taskData.due_date);
    // taskData.due_date.setUTCHours(0, 0, 0, 0);
    const dueDate = new Date(taskData.due_date);
    taskData.due_date = new Date(Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()));
    
    const newTask = await taskService.createTaskService(taskData, userId);
    
    if (newTask.due_date) {
      newTask.due_date = newTask.due_date.toISOString().split('T')[0];
    }
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error in createTaskController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const updateTaskController = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const taskData = req.body;
//     const updatedTask = await taskService.updateTaskService(id, taskData);
//     res.json(updatedTask);
//   } catch (error) {
//     console.error('Error in updateTaskController:', error);
//   }
// };

const updateTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskByIdService(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user_id !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access to this task' });
    }
    const updatedTask = await taskService.updateTaskService(id, req.body);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error in updateTaskController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const deleteTaskController = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedTask = await taskService.deleteTaskService(id);
//     res.json({ message: 'Task deleted successfully', task: deletedTask });
//   } catch (error) {
//     console.error('Error in deleteTaskController:', error);
//   }
// };

const deleteTaskController = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskByIdService(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user_id !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access to this task' });
    }
    const deletedTask = await taskService.deleteTaskService(id);
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error('Error in deleteTaskController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export{
    getTasksByUserIdController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
  
}