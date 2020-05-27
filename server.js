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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 


const db=knex({
  client: 'pg',
  connection: {
   connectionString: process.env.DATABASE_URL,
  ssl: true,
}
});


db.select('*').from('users');
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=> {
	res.send("it is working");
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

app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})

/*// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
*/