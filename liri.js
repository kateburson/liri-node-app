
require("dotenv").config();

const axios = require('axios');

var  keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const command = process.argv[2];
const artist = process.argv[3];
const song = process.argv.slice(3);
const movie = process.argv.slice(3).toString().split(' ').join('+');


if(command === 'concert-this') {
    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
} else 
if(command === 'spotify-this-song') {
    spotify
    .search({
        type: 'track', 
        query: song,
        limit: 2,
    })
    .then(function(response) {
        var artist = response.tracks.items[0].artists[0].name; 
        console.log('Artist:', artist);
        var song = response.tracks.items[0].name;
        console.log('Song:', song);
        var preview = response.tracks.items[0].preview_url;
        console.log('Preview:', preview);
        var album = response.tracks.items[0].album.name;
        console.log('Album:', album);
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });
} else if(command === 'movie-this') {
    // axios.get('http://www.omdbapi.com/?apikey=1b061057&'+ movie)
    axios.get('http://www.omdbapi.com/?t=' + movie + '&apikey=1b061057&')
        .then(function (response) {
            var title = response.data.Title;
            console.log('Title:', title);
            var year = response.data.Year;
            console.log('Year:', year);
            var rating = response.data.Rated;
            console.log('Rating:', rating);
            var rottenTomatoes = response.data.Ratings[1].Value;
            console.log('Rotten Tomatoes:', rottenTomatoes);
            var country= response.data.Country;
            console.log('Country', country);
            var language = response.data.Language;
            console.log('Language:', language);
            var plot = response.data.Plot;
            console.log('Plot:', plot);
            var actors = response.data.Actors;
            console.log('Actors:', actors);
        })
        .catch(function (error) {
            console.error(error);
        });
}
