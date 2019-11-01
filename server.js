const express = require('express');
const bodyParser =require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex =require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//localhost = '127.0.0.1'
const database =knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'KanwalHamza',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* database */

app.get('/', (req,res)=>{
	res.json(database.users);

});

//Sign In user
app.post('/signIn', (req, res) => { signin.handleSignin(req, res, database, bcrypt) })

//Register user 
app.post('/register', (req, res) => { register.handleRegister(req, res, database, bcrypt) })

//Profile get user
app.get('/profile/:id' , (req, res) => { profile.handleProfileGet(req, res, database)})

//update entries when image post
app.put('/image' , (req, res) => { image.handleImage(req, res, database)})

//Clarafai API use
app.post('/imageurl' , (req, res) => { image.handleApiCall(req, res)})

/*//hash functions takes string and jumbles that up
bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});
const hash = bcrypt.hashSync(password);
// Load hash from your password DB.
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
const isValid = bcrypt.compareSync(password, data[0].hash);
*/

app.listen(3000, ()=>{

	console.log('app is running on port 3000');
});

