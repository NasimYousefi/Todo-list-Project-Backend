import * as taskModel from '../../models/tasks/index.js';

async function getTasksByUserIdService(userId) {
  return await taskModel.getTasksByUserId(userId);
}

 async function getTaskByIdService(id) {
  return await taskModel.getTaskById(id);
}

async function createTaskService(taskData) {
  return await taskModel.createTask(taskData);
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
