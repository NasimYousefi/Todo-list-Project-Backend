
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


const formatDateForDatabase = (date) => {
  return new Date(date).toISOString().split('T')[0];
}
async function createTask(taskData,user_id){
  const { title, description, due_date, completed = false } = taskData;
  const formattedDueDate = formatDateForDatabase(due_date);
  const sql = 'INSERT INTO tasks (user_id, title, description,due_date, completed) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const result = await query(sql, [user_id, title, description, formattedDueDate, completed]);
  return result.rows[0];
}


async function updateTask(id, taskData){
  const { title, description,due_date, completed} = taskData;
  const sql =`
  UPDATE tasks SET title = $2, description = $3, due_date=$4, completed = $5
  WHERE id = $1
  RETURNING *`;
  const result = await query(sql,[id,title, description, due_date,completed]);
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



async function findByUserWithFilters(userId, filters = {}) {
  let sql = 'SELECT * FROM tasks WHERE user_id = $1';
  const values = [userId];
  let index = 2;

  if (filters.status !== undefined) {
    sql += ` AND completed = $${index}`;
    values.push(filters.status === 'completed');
    index++;
  }

  if (filters.search) {
    sql += ` AND (title ILIKE $${index} OR description ILIKE $${index})`;
    values.push(`%${filters.search}%`);
    index++;
  }

  if (filters.category === 'today') {
    sql += ` AND due_date = CURRENT_DATE`;
  } else if (filters.category === 'upcoming') {
    sql += ` AND due_date > CURRENT_DATE`;
  }

  const result = await query(sql, values);
  return result.rows;
}

export{
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
  findByUserWithFilters,
}