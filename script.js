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
var queryUV ="";

var city = document.getElementById("city");
var longi = 0;
var lati = 0;

function currentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lati = position.coords.latitude; 
            longi = position.coords.longitude;

            queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + longi + "&appid=" + APIKey;
            queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
        "&lat=" + lati + "&lon=" + longi;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            city.textContent = response.name;
            console.log(response.name);
            $("#temperature").text("Temperature: " + Math.floor((response.main.temp - 273.15) * 1.8 + 32) + " F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind: " + Math.floor(response.wind.speed * 2.237) + " mph");
            
        })
        $.ajax({
            url: queryUV,
            method: "GET"
          }).then(function(response){
              var ultra = response.value;
              console.log(response);
            $("#vally").text(ultra); 
          });

        })

        // 4-Day forecast
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi + "&exclude=minutely,hourly&appid=1d885c7bf9c1a3c6f39c0d44c2182d2f",
            method: "GET"
        }).then(function(response) {
            //console.log(response.daily[2].wind.speed)
            for (var i = 1; i < 5; i++) {
                $("#forecast"+i+" #foredate").text(new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US"));
                $("#forecast"+i+" #foretemperature").text("Temeperature: " + Math.floor((response.daily[i].temp.max - 273.15) * 1.8 + 32) + "F");
                $("#forecast"+i+" #forehumidity").text("Humidity: " + response.daily[i].humidity + "%");
                $("#forecast"+i+" #foredesc").html('<img src="http://openweathermap.org/img/wn/' + response.daily[i].weather[0].icon + '@2x.png">');
            }
        })

    } else {
        city.textContent = "location unknown.";
    }
}
currentLocation();


//search by city
citySearch = [];
$("#search").on("click", function(event) {
    console.log("search clicked");
    event.preventDefault();
    var cityname = $("#searchinfo").val();
    console.log(cityname);

    citySearch.push(cityname);
    saveSearches();
    displaySearches();

    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        city.textContent = response.name;
        console.log(city.textContent);
          $("#temperature").text("Temperature: " + Math.floor((response.main.temp - 273.15) * 1.8 + 32) + "F");
          $("#humidity").text("Humidity: " + response.main.humidity + "%");
          $("#wind").text("Wind: " + Math.floor(response.wind.speed * 2.237) + "mph");

        lati = response.coord.lat;
        longi = response.coord.lon;
        queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
        "&lat=" + lati + "&lon=" + longi;
    
        $.ajax({
        url: queryUV,
        method: "GET"
     }).then(function(response) {
         ultra2 = response.value;
         $("#vally").empty();
        $("#vally").text(ultra2); 
     });
     
     $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi + "&exclude=minutely,hourly&appid=95d5fa275b00b66c86cd3920c0de76f3",
        method: "GET"
      }).then(function(response) {
          for (var i = 1; i < 5; i++) {
            $("#forecast"+i+" #foredate").text(new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US"));
            $("#forecast"+i+" #foretemperature").text("Temeperature: " + Math.floor((response.daily[i].temp.max - 273.15) * 1.8 + 32) + "F");
            $("#forecast"+i+" #forehumidity").text("Humidity: " + response.daily[i].humidity + "%")
          } 
        })
    
    })


})
// search by city ends //

//clicking on saved searches 

$(document).on("click", ".city-btn", function(){
    console.log("click me");
    var cityname = $(this).text();
  
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        city.textContent = response.name;
        $("#temperature").text("Temperature: " + Math.floor((response.main.temp - 273.15) * 1.8 + 32) + "F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind: " + Math.floor(response.wind.speed * 2.237) + "mph");
        lati = response.coord.lat;
        longi = response.coord.lon;
        queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey +
        "&lat=" + lati + "&lon=" + longi;
        
        $.ajax({
          url: queryUV,
          method: "GET"
        }).then(function(response){
          $("#vally").text(response.value); 
        });
        
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longi + "&exclude=minutely,hourly&appid=95d5fa275b00b66c86cd3920c0de76f3",
          method: "GET"
        }).then(function(response){
          for(var i = 1; i = 5; i++){
            $("#forecast"+i+" #foredate").text(new Date(response.daily[i].dt * 1000).toLocaleDateString("en-US"));
            $("#forecast"+i+" #foretemperature").text("Temeperature: " + Math.floor((response.daily[i].temp.max - 273.15) * 1.8 + 32) + "F");
            $("#forecast"+i+" #forehumidity").text("Humidity: " + response.daily[i].humidity + "%")
          } 
        });
    });
  });
//  ends

 






//
var citySearch = [];
function displaySearches() {
$("#buttons-view").empty();
for  (var i = 0; i < citySearch.length; i++) {
    var c = $( "<button>");
    c.addClass("city-btn btn btn-primary btn-sm");
    c.attr("data-name", citySearch[i]);
    c.text(citySearch[i]);
    $("#buttons-view").append(c);
  }
}
//$(document).on("click", ".city-btn",)
function saveSearches() {
    localStorage.setItem("searches", JSON.stringify(citySearch));
}
function init() {
    var savedSearch = JSON.parse(localStorage.getItem("searches"));
    if (savedSearch !== null) {
        citySearch = savedSearch;
    }
    displaySearches();
}
init();
