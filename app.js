
const express = require('express');
const hbs = require('hbs')
const app = express();

const SpotifyWebApi = require('spotify-web-api-node');
//app.engine('html', require('express').renderFile);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

  // 3i67sGIVw8EBlgfSRv3Lj2
  // come fly with me: 5KKiN9LDoI510Yf4VWboOz
  // fly me to the moon: 7FXj7Qg3YorUxdrzvrcY25
  // that's life: 4dt6XKr0xKdPzjFhwB8dBm
  // my way: 2YkIDPL5lGhRhomCq4S2RO
app.get('/', (request, response) => {
  response.render('index')
});

app.get('/about', (request, response) => {
  response.render('about');
});

app.get('/works', (request, response) => {

  spotifyApi.getAlbumTracks('3i67sGIVw8EBlgfSRv3Lj2', { limit : 5, offset : 1 })
  .then(data => {
    const trackInfo = data.body.items;
    console.log(trackInfo);

    response.render('works', { trackInfo });
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
});




app.get('*', (request, response) => {
  response.render('error');
});


app.listen(3000);
