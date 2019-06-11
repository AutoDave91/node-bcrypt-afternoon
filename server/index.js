const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

// controllers + middleware
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

// communication
app.use(express.json());
massive(CONNECTION_STRING)
    .then(db =>{
        app.set('db', db);
        console.log('Database connected')})
    .catch(()=>{
        console.log('Error connecting to database')
    })
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
}))

// express points
app.get('/auth/logout', authCtrl.logout)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

app.get('/api/treasure/dragon', treasureCtrl.get_treas)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user',auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.adminsOnly, treasureCtrl.getAllTreasure)

// listen
app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port ${SERVER_PORT}`)
})