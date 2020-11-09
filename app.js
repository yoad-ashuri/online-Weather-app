const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){

    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=cbebd67b2428bb2991157993a25e30c0&units=metric";
    https.get(url, function (response){
        response.on("data", function (data){
            const wheaterData = JSON.parse(data);
            console.log(wheaterData);
            const temp = wheaterData.main.temp;
            const wheatherDes = wheaterData.weather[0].description;
            const icon = wheaterData.weather[0].icon;
            const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The weather in " + city + " is currently " + wheatherDes + "</h1>");
            res.write("<h2>The current Temprature is " + temp + " Celsius degrees.</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

app.listen(process.env.PORT || 3000, function (){
    console.log("server running on port 3000");
});