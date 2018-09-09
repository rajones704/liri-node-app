require("dotenv").config();

var Spotify = require('node-spotify-api')
var request = require('request')
var fs = require('fs')

var input1 = process.argv[2]
var input2 = process.argv[3]


var myKeys = require('./keys.js')


var spotify = new Spotify(myKeys.spotify)

function spotifyThis(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err)
        }
       
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
      console.log("Title: " + data.tracks.items[0].name)
      console.log("Preview: " + data.tracks.items[0].href)
      console.log("Album: " + data.tracks.items[0].album.name)
      })
}

function movieThis(movie){
    var myRequest = "http://www.omdbapi.com/?t=" + movie +"&y=&plot=short&apikey=trilogy"
    request(myRequest, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Title: ",JSON.parse(body).Title)
    console.log("Year: ",JSON.parse(body).Year)
    console.log("Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value)
    console.log("Country: ",JSON.parse(body).Country)
    console.log("Language: ",JSON.parse(body).Language)
    console.log("Plot: ",JSON.parse(body).Plot)
    console.log("Actors: ",JSON.parse(body).Actors)
  }
})
}

function doThis(){
    var commandMe = "spotify-this-song"
    var whatIWant = "Maps"
    var split = 0
    fs.readFile('random.txt','utf8', function(err, fileContents){
        if(err){
            console.log(err)
        }
        for(i=0;i<fileContents.length;i++){
            if(fileContents[i] === ","){
                split = i+2
            }
        }
        commandMe = fileContents.slice(0,split-2)
        whatIWant = fileContents.slice(split,fileContents.length-1)

        switch (commandMe){
            case "spotify-this-song":
                spotifyThis(whatIWant)
                break
            case "movie-this":
                movieThis(whatIWant)
            }
    })
}

switch (input1){
   
    case "spotify-this-song":
        console.log("---------spotify--------------")
        if(input2 !== undefined){
            spotifyThis(input2)
        }
        else{
            spotifyThis("Ace of base The Sign")
        }
        break
    case "movie-this":
        console.log("---------movie this---------")
        if(input2 !== undefined){
            movieThis(input2)
        }
        else{
            movieThis("Mr. Nobody")
        }
        break
    case "do-what-it-says":
        console.log("------------do it--------------")
        doThis()
}


