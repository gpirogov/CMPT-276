const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, 'public')));  //required for /public files


/*var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);
var msg = require('./public/js/avatarChanger.js');*/
/*var testasdas = "asdasdasgas2221312asd";
msg.alert(testasdas);*/
//msg.testFunc("results");



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
});

// solved error where i couldn't display or log res.body by looking at this focum post:
// https://stackoverflow.com/questions/35931135/cannot-post-error-using-express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/students/:id', async function(req,res) {
  try {
    var selectString = "SELECT * FROM students WHERE id = " + req.params.id.toString();
    const result = await pool.query(selectString);
    var results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results);
    //res.redirect('../students.html');

  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }

});


app.delete('/students/:id', function(req,res) {
  var deleteString = "DELETE FROM students WHERE id = " + req.params.id.toString();     //i do not know why this wouldn't work.
  pool.query(deleteString);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));