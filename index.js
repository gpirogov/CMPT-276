const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const { Pool } = require('pg');

var pool = new Pool({
  	connectionString: process.env.DATABASE_URL
	/*user: 'postgres',
   	host: 'localhost',
   	password: 'root',
   	database: 'postgres'*/

});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/users', function(req, res){
	pool.query("INSERT INTO students(id, lName, fName, gender, ethnicity, hColour, fColour, weight, wType, fHeight, iHeight, gpa) VALUES(0, 'Clarke', 'Melissa', 'Female', 'Caucasian', 'Blonde', 'Brown', 165.0, 'lbs', 5, 10, 3.4)", (error, result) =>{
		console.log(error, result);
		pool.end();
	});

	pool.query("SELECT * FROM students", (error, result) =>{
		console.log(error, result);
		pool.end();
	});
});

/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/students', async function(req, res){
  pool.query("SELECT * FROM students", function(error, result){
    var results = { 'results': (result.rows[0].id) ? result.rows : [] };
    res.render('pages/db', results);
  });

  console.log("test");
});
app.get('/students/:id', function(req, res){
  console.log(req.params.id);
});*/


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));