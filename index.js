const {response} = require('express')
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


app.post('/', (req, res) => {
    const query = req.body.cityName
    const api_key = 'decc8746d7ab89b4c8bdea846f79ada1'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+api_key+'&units=metric'
        https.get(url, (response) => {
            response.on('data', (data) => {
                const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            res.write('<h1>The temperature in '+query+' is '+temp+' degree celcius</h1>')
            })
        })
    })



app.listen(3000, ()=> console.log('listening on port'))

