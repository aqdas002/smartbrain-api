const express =require('express')
const app=express();
const cors=require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');
const register= require('./controllers/register');
const signin= require('./controllers/signin');
const profile= require('./controllers/profile');
const image = require('./controllers/image');




const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '42911',
    database : 'smart-brain'
  }
});


db.select('*').from('users');
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=> {
	res.send(database.users);
})



app.post('/signin',(req,res)=>{
	signin.handleSignin(req,res,db,bcrypt)
})


app.post('/register',(req,res)=>{
	register.handleRegister(req,res, db, bcrypt)
})


app.get('/profile/:id', (req,res)=> {
	profile.handleProfile(req,res,db);
})


app.put('/image', (req,res)=>{
	image.handleImage(req,res,db)
})

app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res)})

app.listen(3000,()=>{
	console.log('app is running ');
})

/*// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
*/