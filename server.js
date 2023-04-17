const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const apiKey = '22602f6b8a8652b3ed13a931c5225cb1';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {weather:null, error:null});
});

app.post('/', function(req, res) {
   let city = req.body.city;
   let url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined) {
                res.render('index', {weather : null, error : 'Error, please try again'});
            } else {
                let result = `Its ${weather.main.temp} degress in ${weather.name} !`;
                res.render('index', {weather: result, error : null});
            }
        }
   })   
});

app.listen(3000, function(){
    console.log("Kode Weather Listening On Port 3000")
});