const Pool = require('pg').Pool
const pool = new Pool({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 1234,
});

const getUser = (body) => {
    const {username,password} = body;
    const sql = `SELECT * FROM userTable where username = '${username}' AND password = '${password}';`;
    return new Promise(function(resolve, reject) {
      pool.query(sql, (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(JSON.stringify(results.rows));
      })
    }) 
  }

  const insertUser = (body) => {
    const {username,password} = body;
    const sql = `INSERT INTO userTable (username, password) VALUES ('${username}', '${password}') RETURNING *;`;
    return new Promise(function(resolve, reject) {
      pool.query(sql, (error, results) => {
        console.log(results);
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  module.exports = {
    getUser,
    insertUser
  }