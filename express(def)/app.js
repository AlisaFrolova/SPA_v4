const express = require("express");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUser, getUsers } = require('./users');
const cookieParser = require("cookie-parser")

const ACCESS_SECRET = 'mySecretWord1'
const ACCESS_EXPIRES = 60*15

const REFRESH_SECRET = 'mySecretWord2'
const REFRESH_EXPIRES = 60*60*24 //sec*min*hours

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(`[${req.method}]: ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server launched on http://localhost:${PORT}`);
});


//register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body
  if (await findUser(username))
    return res.status(400).json({ message: "User already exists" })
 
  if(isValidValue(username) && isValidValue(password)){
    await createUser(username, password)
    res.json({ message: "User registered" })
  }else return res.status(400).json({ message: "Invalid enter" })
})
function isValidValue(value){
  if(value.indexOf(" ") !== -1 || value.length < 5 || value.length > 12){
    return false
  }else return true
}



//login
app.post('/api/login', async (req, res) => { 
  const { username, password } = req.body
  const user = await findUser(username)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
 
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })
 
  const accessToken = jwt.sign(
    { username },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  )
  const refreshToken = jwt.sign(
    { username },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES }
  )

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_EXPIRES*1000
  })
 
  return res.json({ accessToken })
})

app.post('/api/clear', (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message:"No refresh token"})
    res.clearCookie("refreshToken")
    res.end()
})


function authMiddleware(req, res, next) { 
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401).json({ message: "No access token" })
 
  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({message:"Invalid token"})
    req.user = user
    next()
  })
}

app.post("/api/refresh", (req,res) => { 
  const refreshToken = req.cookies.refreshToken

  if(!refreshToken) return res.status(401).json({message:"No refresh token"})
  
  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if(err) return res.status(403).json({message:"Invalid refresh token"})

    const newAccessToken = jwt.sign(
      { username: user.username },
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXPIRES }
    )
    return res.json({accessToken: newAccessToken})
  })
})

app.post("/api/isAuth", (req, res) => {
   const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({message:"No refresh token"})
    
    jwt.verify(refreshToken, REFRESH_SECRET, (err) => {
    if(err) return res.status(403).json({message:"Invalid refresh token"})
      else return res.sendStatus(200)
    })
})


app.get('/api/username', authMiddleware, (req, res) => {
  res.json({ username: req.user.username })
})
//user: wra1th  pass: 1q2w3e
//user: wra11tthh  pass: 0p9o8i