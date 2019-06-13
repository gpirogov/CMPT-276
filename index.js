const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/loginnn', function(req, res){
  pool.query('INSERT INTO students VALUES(123123)');
});


app.use(express.static(path.join(__dirname, 'public')));	//required for /public files


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