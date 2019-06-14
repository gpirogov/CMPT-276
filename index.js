const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

//var studentsJS = require(__dirname + '/public/js/students.js');

/*var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);*/


const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, 'public')));  //required for /public files


// solved error where i couldn't display or log res.body by looking at this focum post:
// https://stackoverflow.com/questions/35931135/cannot-post-error-using-express
app.get('/new-student', function(req, res){
  res.sendFile("index.html"); //if html file is within public directory
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/new-student', function(req, res){
  var insertString = "INSERT INTO students VALUES(" + "0, '" + req.body.fName + "', '" + 
  req.body.lName + "', " + req.body.gender + ", " + req.body.skinTone + ", " + 
  req.body.hColour +   ", " + req.body.fColour + ", " + req.body.weight + ", " + 
  req.body.wType + ", " +   req.body.height + ", " + req.body.hType + ", " + req.body.gpa + ")";
  pool.query(insertString);
  
  res.send(req.body);

  console.log(req.body);
  console.log(insertString);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/db', async function(req, res){
  try {
    const result = await pool.query('SELECT * FROM students');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/next-student', function(req, res){
  res.redirect('students.html');

  //console.log(typeof studentsJS.foo);

  //console.log("test4");
  
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));