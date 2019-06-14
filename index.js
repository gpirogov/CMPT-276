const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, 'public')));  //required for /public files


/*app.use(express.static(__dirname + '/public')); // try removing all this
var bodyParser = require('body-parser');    
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());*/


// solved error where i couldn't display or log res.body by looking at this focum post:
// https://stackoverflow.com/questions/35931135/cannot-post-error-using-express
app.get('/new-student', function(req, res){
  res.sendFile("index.html"); //if html file is within public directory
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/new-student', function(req, res){

  // turn the selections into ints

  var insertString = "INSERT INTO students VALUES(" + "0, '" + req.body.fName + "', '" + 
  req.body.lName + "', " + "-1" + ", " + "-1" + ", " + "-1" + ", " + "-1" + ", " + 
  req.body.weight + ", " + "-1" + ", " + req.body.height + ", " + "-1" + ", " + req.body.gpa + ")";
  pool.query(insertString);
  
  pool.query("INSERT INTO students VALUES(3)");

  var testString = "INSERT INTO students VALUES(2)";
  pool.query(testString);
  //res.redirect('/students.html');
  
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


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));