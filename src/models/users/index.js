
import { query } from '../../core/database/database-handler.js';

async function getUserById(id){
    const sql = `
    SELECT * 
    FROM users
    where id = $1;
    `;
    const result = await query(sql,[id]);
    return result.rows;
  }

  async function createUser(userData){
    const { name, email } = userData;
    const sql = `
    insert into users 
    (name, email) 
    values
    ($1, $2)
    RETURNING *
    `;
    const result = await query(sql,[name, email]);
    return result.rows;
  }

  async function updateUser(id,userData){
    const { name, email } = userData;
    const sql =`
    UPDATE users SET name = $2, email = $3
    WHERE id = $1
    RETURNING *`;
    const result = await query(sql,[id,name, email]);
    return result.rows[0];
  }
  
  export{
      getUserById,
      createUser,
      updateUser
  
    }