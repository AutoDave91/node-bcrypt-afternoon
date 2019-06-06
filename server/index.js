const express = require('express');
const app = express();
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

const authCtrl = require('./controllers/authController');

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

app.post('/auth/register', authCtrl.register)

app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port ${SERVER_PORT}`)
})