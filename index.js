const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/db', async function(req, res){
      pool.query("SELECT * FROM students", function(error, result){
        const results = { 'results': (result) ? result.rows : null};
        res.render('pages/db', results );
      });
  });

/*app.get('/users/:id', function(req, res){
  console.log(req.params.id);
})*/


express().listen(PORT, () => console.log(`Listening on ${ PORT }`));