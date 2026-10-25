const bcrypt = require('bcryptjs');
 
const users = []; 
 
async function createUser(username, password) {
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
}
 
async function findUser(username) {
  return users.find(u => u.username === username);
}

async function getUsers(){
  return users
}
 
module.exports = { createUser, findUser, getUsers };