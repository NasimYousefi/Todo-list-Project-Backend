
import { query } from '../../core/database/database-handler.js';


// async function getTodos(){
//   const sql = `SELECT * FROM public.todos;`;
//   const result = await query(sql);
//   return result.rows;
// }

async function getTasksByUserId(userId) {
  const sql = 'SELECT * FROM tasks WHERE user_id = $1';
  const result = await query(sql, [userId]);
  return result.rows;
}


async function getTaskById(id){
  const sql = `
  SELECT * 
  FROM tasks
  where id = $1;
  `;
  const result = await query(sql,[id]);
  return result.rows[0];
}

async function createTask(taskData){
  const { user_id, title, description, completed = false } = taskData;
  const sql = 'INSERT INTO tasks (user_id, title, description, completed) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await query(sql, [user_id, title, description, completed]);
  return result.rows[0];
}

async function updateTask(id, taskData){
  const { title, description, completed } = taskData;
  const sql =`
  UPDATE tasks SET title = $2, description = $3, completed = $4
  WHERE id = $1
  RETURNING *`;
  const result = await query(sql,[id,title, description,completed]);
  return result.rows[0];
}

async function deleteTaskById(id){
  const sql = `
  Delete 
  FROM tasks
  where id = $1
  RETURNING *
  `;
  const result = await query(sql,[id]);
  return result.rows[0];
}

// async function deleteAllTodos(){
//   const sql = `
//   Delete 
//   FROM todos;
//   `;
//   const result = await query(sql);
//   return result.rows;
// }

// async function allTodosIsCompleted() {
//   const sql =`
//   UPDATE todos SET is_completed = true`;
//   const result = await query(sql);
//   return result.rows;
// }

export{
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
}