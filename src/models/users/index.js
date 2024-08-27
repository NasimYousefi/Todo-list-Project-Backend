
import { query } from '../../core/database/database-handler.js';
import bcrypt from 'bcryptjs';

async function getUserById(id){
    const sql = `
    SELECT * 
    FROM users
    where id = $1;
    `;
    const result = await query(sql,[id]);
    return result.rows[0];
  }

  // async function createUser(userData){
  //   const { name, email } = userData;
  //   const sql = `
  //   insert into users 
  //   (name, email) 
  //   values
  //   ($1, $2)
  //   RETURNING *
  //   `;
  //   const result = await query(sql,[name, email]);
  //   return result.rows;
  // }

    async function createUser(userData) {
    const { username, email, password } = userData;
    if (!password) {
      throw new Error('Password is required');
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
    const result = await query(sql, [username, email, hashedPassword]);
    return result.rows[0];
  }

  
  async function updateUser(id,userData){
    const { username, email } = userData;
    const sql =`
    UPDATE users SET username = $2, email = $3
    WHERE id = $1
    RETURNING *`;
    const result = await query(sql,[id,username, email]);
    return result.rows[0];
  }

  const updateUserPassword = async (id, newPasswordHash) => {
    const sql = 'UPDATE users SET password = $1 WHERE id = $2';
    await query(sql, [newPasswordHash, id]);
  };

   async function findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const result = await query(sql, [email]);
    return result.rows[0];
  }
  
  

  export{
      getUserById,
      createUser,
      updateUser,
      findByEmail,
      updateUserPassword,
  
    }