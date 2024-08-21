import * as taskModel from '../../models/tasks/index.js';

// async function getTasksByUserIdService(userId) {
//   return await taskModel.getTasksByUserId(userId);
// }

async function getTasksByUserIdService(userId, filters = {}) {
  return await taskModel.findByUserWithFilters(userId, filters);
}

 async function getTaskByIdService(id) {
  return await taskModel.getTaskById(id);
}

async function createTaskService(taskData, user_id) {
  return await taskModel.createTask(taskData, user_id);
}

async function updateTaskService(id, taskData) {
  return await taskModel.updateTask(id, taskData);
}

async function deleteTaskService(id) {
  return await taskModel.deleteTaskById(id);
}

export{
    getTasksByUserIdService,
    getTaskByIdService,
    createTaskService,
    updateTaskService,
    deleteTaskService,
 };
