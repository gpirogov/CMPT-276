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
app.use(bodyParser.json());  */

app.get('/new-student', function(req, res){
  res.render('form');
  res.sendFile("index.html"); //if html file is within public directory
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/new-student', function(req, res){
  /*var insertString = "INSERT INTO students VALUES(" + "12" + req.gender + ")";

  pool.query(insertString);*/

  

  /*var insertString = 'INSERT INTO students VALUES(777)';
  pool.query(insertString);*/
  //res.redirect('/students.html');
  
   //var reqBody = req.body;
   //var htmlData = 'Hello:' + reqBody;
   var htmlData = "test6";
   res.send(htmlData);
   //console.log(htmlData);

  /*alert(insertString);
  alert("test4");
  console.log(insertString);
  console.log("test4");*/
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