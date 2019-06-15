const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5432;

const app = express();

const { Pool } = require('pg');



const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, 'public')));  //required for /public files


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/students/:id', function(req, res){
  var insertString = "INSERT INTO students VALUES(" + "0, '" + req.body.fName + "', '" + 
  req.body.lName + "', " + req.body.gender + ", " + req.body.skinTone + ", " + 
  req.body.hColour +   ", " + req.body.fColour + ", " + req.body.weight + ", " + 
  req.body.wType + ", " +   req.body.height + ", " + req.body.hType + ", " + req.body.gpa + ")";
  pool.query(insertString);

  res.redirect('../students.html');
  //res.send(req.body);

  //console.log(req.body);
  //console.log(insertString);
});

// solved error where i couldn't display or log res.body by looking at this focum post:
// https://stackoverflow.com/questions/35931135/cannot-post-error-using-express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/students/:id', async function(req,res) {

  try {
  /*res.sendFile("index.html");
  console.log("test8");
  console.log(req.body);*/
  //res.redirect('../students.html');
    var selectString = "SELECT * FROM students WHERE id = " + req.params.id.toString();
    /*pool.query(selectString, function(error,result){
      
        if (error) {
          console.log(error);
        }else{
          //var results = { 'results': (result.rows[0].id) ? result.rows : [] };
          //res.render('pages/db', results);
          console.log(result.rows[0]);
          res.redirect('../studentsSimple.html');
          //console.log("results = " + results);
        }
    });
    console.log("req.id = " + req.params.id);*/
    //console.log("res = " + res);

    //const result = await pool.query(selectString);
    //const results = { 'results': (result) ? result.rows : null};
    //res.render('pages/students/:id', results);
    res.redirect('../studentsSimple.html');
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }

});

/*app.set('views', path.join(__dirname, 'views'));
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
});*/




/*app.get('/next-student', function(req, res){
  res.redirect('students.html');

  //console.log(typeof studentsJS.foo);

  //console.log("test4");
  
});*/

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));