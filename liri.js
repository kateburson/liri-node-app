require('colors');
require("dotenv").config();
var fs = require('fs');

const axios = require('axios');
const moment = require('moment');

var  keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const command = process.argv[2];
var artist = process.argv.slice(3).join('');
var song = process.argv.slice(3).join(' ');
var movie = process.argv.slice(3).toString().split(' ').join('+');
var divider = "\n------------------------------------------------------------\n\n";

function concertThis(artist) {
    var URL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
    console.log(URL);
    axios.get(URL)
    .then(function (response) {

        var info = []; 

        var venue = response.data[0].venue.name;
        console.log(venue ? 'Venue: '.magenta + venue : 'error');

        var location = response.data[0].venue.city;
        console.log(location ? 'Location: '.magenta + location : 'error');

        var datetime = response.data[0].datetime.split('T');      
        var a = moment(datetime[0]);
        var date = a.format('MM/DD/YYYY');
        console.log(date ? 'Date: '.magenta + date : 'error');
        info.push(venue, location, date);
        
        fs.appendFile('log.txt', info.join('\n') + divider, function(err){
            if(err) {
                console.error(err);
            }
        })

    })
    .catch(function (error) {
        console.error(error);
    });
};

function spotifyThisSong(song) {
    spotify
    .search({
        type: 'track', 
        query: song,
    })
    .then(function(response) {
            var info = []; 

            var artist = response.tracks.items[0].artists[0].name; 
            console.log('Artist:'.green, artist);
            var song = response.tracks.items[0].name;
            console.log('Song:'.green, song);
            var preview = response.tracks.items[0].preview_url;
            console.log('Preview:'.green, preview);
            var album = response.tracks.items[0].album.name;
            console.log('Album:'.green, album);

            info.push(artist, song, preview, album);

            fs.appendFile('log.txt', info.join('\n') + divider, function(err){
                if(err) {
                    console.error(err);
                }
            })
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
    });
};

function movieThis(movie) {
    axios.get('http://www.omdbapi.com/?t=' + movie + '&apikey=1b061057&')
    .then(function (response) {

        var info = [];

        var title = response.data.Title;
        console.log('Title:'.blue, title);
        var year = response.data.Year;
        console.log('Year:'.blue, year);
        var rating = response.data.Rated;
        console.log('Rating:'.blue, rating);
        var rottenTomatoes = response.data.Ratings[1].Value;
        console.log('Rotten Tomatoes:'.blue, rottenTomatoes);
        var country= response.data.Country;
        console.log('Country:'.blue, country);
        var language = response.data.Language;
        console.log('Language:'.blue, language);
        var plot = response.data.Plot;
        console.log('Plot:'.blue, plot);
        var actors = response.data.Actors;
        console.log('Actors:'.blue, actors);

        info.push(title, year, rating, rottenTomatoes, country, language, plot, actors);

        fs.appendFile('log.txt', info.join('\n') + divider, function(err){
            if(err) {
                console.error(err);
            }
        })

    })
    .catch(function (error) {
        console.error(error);
    });
}

if(command === 'concert-this') {
    if(artist) {
        concertThis(artist);
    } else {
        console.log('Enter a band name');
    }
} else if(command === 'spotify-this-song') {
    if(song.length){
        spotifyThisSong(song);
    } else {
        song = 'the sign';
        spotifyThisSong(song);
    }
} else if(command === 'movie-this') {
    if(movie){
        movieThis(movie);
    } else {
        movie = 'mr+nobody'
        movieThis(movie);
    }
} else if(command === 'do-what-it-says') {
    var doThis = fs.readFile('random.txt', 'utf-8', function(err){
        if(err){
            console.error(err);
        }
    })
    command = doThis.split(',')[0];
    song = doThis.split(',')[1];




}
