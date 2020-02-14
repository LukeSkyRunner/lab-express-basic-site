
const express = require('express');
const hbs = require('hbs')
const app = express();


//app.engine('html', require('express').renderFile);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));




app.get('/', (request, response) => {
  response.render('index')
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.get('/works', (request, response) => {
  response.render('works');
});

app.get('*', (request, response) => {
  response.render('error');
});


app.listen(3000);
