//get current day
var dayOf = document.getElementById("to-Day");
var dateOf = document.getElementById("to-Date");
var formatDay = moment().format('dddd');
var formatDate = moment().format("MMMM Do YYYY");

function getDay() {
    dayOf.textContent = formatDay;
    dateOf.textContent = formatDate;
};
getDay();

var APIKey = "1d885c7bf9c1a3c6f39c0d44c2182d2f";
var queryURL = "";
//var queryUV ="";

var city = document.getElementById("city");
var longi = 0;
var lati = 0;

function currentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lati = position.coords.latitude; 
            longi = position.coords.longitude;

            queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + longi + "&appid=" + APIKey;
            queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
        "&lat=" + lati + "&lon=" + longi;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            city.textContent = response.name;
            console.log(response.name);
            $("#temperature").text("Temeperature: " + Math.floor((response.main.temp - 273.15) * 1.8 + 32));
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#wind").text("Wind: " + response.wind.speed);
            
        })
        $.ajax({
            url: queryUV,
            method: "GET"
          }).then(function(response){
            $("#uvi").text(response.value); 
          });

        })
    }
}
currentLocation();