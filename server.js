const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/Register');
const signIn = require('./controllers/SignIn');
const profile = require('./controllers/Profile');
const entries = require('./controllers/Entries');

/**
 * connecting to database using Knex npm
 */
const database = knex({
    client:'pg',
    version:'13.2',
    connection: {
        host: '127.0.0.1',
        port: '5434',
        user: 'postgres',
        password:'postgres',
        database:'facedb'
    }
});

// initialize node express 
const app = express();
app.use(express.json());
app.use(cors());

// handlers
app.get('/', (req, res) => { res.send(database.users) });

app.post('/signIn', signIn.handleSignIn(database, bcrypt));
   
app.post('/register', (req, res) => register.handleRegister(req, res, database, bcrypt));
    
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, database));

app.put('/image', (req, res) => entries.handleEntries(req, res, database));
    
app.post('/imageurl', (req, res) => entries.handleApiCall(req, res));

app.listen(3000, () => {
        console.log('app is listening');
});
    
    