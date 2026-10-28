const bcrypt = require('bcryptjs')

const users = []

async function generateStaticUsers(){
    const pass1 = await bcrypt.hash("1q2w3e", 10)
    users.push({ username: "wra1th", password: pass1, posts: [
      { title: "Who cares about design", description: "-nobody"}, 
      { title: "sin^2 + cos^2 = 1", description: "ctg is useless when tg is nearby"}
    ]})

    const pass2 = await bcrypt.hash("0p9o8i", 10)
    users.push({ username: "wra11tthh", password: pass2, posts: []})

    const pass3 = await bcrypt.hash("1234", 10)
    users.push({ username: "JohnWick", password: pass3, posts: [
      { title: "Johnny Silverhand as a calm and sensitive character", description: "lorem lorem lorem lorem lorem"}
    ]})
}
 
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
 
module.exports = { createUser, findUser, getUsers, generateStaticUsers };