const apiKey = "a4e8a686b451f16bbed2be887a73e6e2";
const search = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
var longitude;
var latitude;
var city;
var today = new Date();
var time = today.getHours();
const iconsDay = [];
const iconsNight = [];
for (let i = 0; i < 100; i++) {
  if (i === 0 || i === 1) {
    iconsDay[i] = '<img src = images/sun.png style="width: 60%; filter: invert();">';
  } else if(i == 2){
    iconsDay[i] = '<img src = images/weather.png style="width: 60%; filter: invert();">';
  } else if (i == 3) {
    iconsDay[i] = '<img src = images/cloudy-day.png style="width: 60%; filter: invert();">';
  } else if (i >= 45 && i <= 48) {
    iconsDay[i] = '<img src = images/fog.png style="width: 60%; filter: invert();">';
  } else if (i >= 51 && i <= 57) {
    iconsDay[i] = '<img src = images/rainy.png style="width: 60%; filter: invert();">';
  } else if ((i >= 61 && i <= 67) || (i >= 80 && i <= 82)) {
    iconsDay[i] = '<img src = images/rainy.png style="width: 60%; filter: invert();">';
  } else if ((i >= 71 && i <= 77) || i === 85 || i === 86) {
    iconsDay[i] = '<img src = images/snow.png style="width: 60%; filter: invert();">';
  } else if (i >= 95 && i <= 99) {
    iconsDay[i] = '<img src = images/heavy-rain.png style="width: 60%; filter: invert();">';
  } else {
    iconsDay[i] = null;
  }
}
for (let i = 0; i < 100; i++) {
  if (i === 0 || i === 1) {
    iconsNight[i] = '<img src = images/moon.png style="width: 60%; filter: invert();">';
  } else if(i == 2){
    iconsNight[i] = '<img src = images/cloudy-night.png style="width: 60%; filter: invert();">';
  } else if (i == 3) {
    iconsNight[i] = '<img src = images/cloudy-day.png style="width: 60%; filter: invert();">';
  } else if (i >= 45 && i <= 48) {
    iconsNight[i] = '<img src = images/fog.png style="width: 60%; filter: invert();">';
  } else if (i >= 51 && i <= 57) {
    iconsNight[i] = '<img src = images/snowy.png style="width: 60%; filter: invert();">';
  } else if ((i >= 61 && i <= 67) || (i >= 80 && i <= 82)) {
    iconsNight[i] = '<img src = images/rainy.png style="width: 60%; filter: invert();">';
  } else if ((i >= 71 && i <= 77) || i === 85 || i === 86) {
    iconsNight[i] = '<img src = images/snow.png';
  } else if (i >= 95 && i <= 99) {
    iconsNight[i] = '<img src = images/heavy-rain.png style="width: 60%; filter: invert();">';
  } else {
    iconsNight[i] = null;
  }
}

async function getSunset(longitude, latitude){
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunset,sunrise&timezone=EST`);
  const data = await response.json();
  // console.log(data);
  var sunrise = data.daily.sunrise[0];
  var sunset = data.daily.sunset[0];
  checkWeatherHourly(longitude,latitude,sunrise,sunset);
}

// async function getCoords(city){
//   const api_url = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
//   const response = await fetch(api_url, headers={'X-Api-Key': 'LmD0ZK5HTYnAzC6NFgDMIw==VlocDrZKOPyfM5Hm'});
//   const data = await response.json();
//   console.log(data);

// }



const findMyCoords = () =>{
  
  const status = document.querySelector('.status');
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let coordURL=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    async function checkWeatherInLoca(){
      const response = await fetch(coordURL);
      const data = await response.json();
      var numTemps = document.getElementsByClassName('currentTemp');
      var numLow = document.getElementsByClassName('tempMin');
      var numMax = document.getElementsByClassName('tempMax');
      for(i = 0; i < numTemps.length; i++){
        numTemps[i].innerHTML = Math.round(data.main.temp) + "&deg;";
      }
      for(i = 0; i < numLow.length; i++){
        numLow[i].innerHTML = Math.round(data.main.temp_min) + "&deg;";
      }
      for(i = 0; i < numMax.length; i++){
        numMax[i].innerHTML = Math.round(data.main.temp_max) + "&deg;";
      }
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".tempMin").innerHTML = Math.round(data.main.temp_min) + "&deg;";
      document.querySelector(".tempMax").innerHTML = Math.round(data.main.temp_max) + "&deg;";
      document.querySelector(".feelsLike").innerHTML = Math.round(data.main.feels_like) + "&deg;";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".windSpeed").innerHTML = data.wind.speed + " kmh";
      document.querySelector(".pressure").innerHTML = Math.round(data.main.pressure) + " mb";
      if(Math.round(data.visibility)>5){
        document.querySelector(".visibility").innerHTML = "unlimited";
      } else{
        document.querySelector(".visibility").innerHTML = Math.round(data.visibility) + " km";
      }
    }
    checkWeatherInLoca();
    checkWeatherHourly(longitude,latitude);
    checkWeatherDaily(longitude,latitude);
    getSunset(longitude, latitude);
  }
  
  const error = () => {
    status.textContent = 'Unable to retrieve your location';
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
}

findMyCoords();

async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();
  var numTemps = document.getElementsByClassName('currentTemp');
  var numLow = document.getElementsByClassName('tempMin');
  var numMax = document.getElementsByClassName('tempMax');

  for(i = 0; i < numTemps.length; i++){
    numTemps[i].innerHTML = Math.round(data.main.temp) + "&deg;";
  }
  for(i = 0; i < numLow.length; i++){
    numLow[i].innerHTML = Math.round(data.main.temp_min) + "&deg;";
  }
  for(i = 0; i < numMax.length; i++){
    numMax[i].innerHTML = Math.round(data.main.temp_max) + "&deg;";
  }
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".tempMin").innerHTML = Math.round(data.main.temp_min) + "&deg;";
  document.querySelector(".tempMax").innerHTML = Math.round(data.main.temp_max) + "&deg;";
  document.querySelector(".feelsLike").innerHTML = Math.round(data.main.feels_like) + "&deg;";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".windSpeed").innerHTML = data.wind.speed + " kmh";
  document.querySelector(".pressure").innerHTML = Math.round(data.main.pressure) + " mb";
  if(Math.round(data.visibility)>5){
    document.querySelector(".visibility").innerHTML = "unlimited";
  } else{
    document.querySelector(".visibility").innerHTML = Math.round(data.visibility) + " km";
  }
}
async function checkWeatherHourly(longitude, latitude,sunrise,sunset){
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,dewpoint_2m,precipitation_probability,weathercode&timezone=EST`);
  const data = await response.json();
  var numHour = document.getElementsByClassName('hour');
  var numHourW = document.getElementsByClassName('hourW');
  var numP = document.getElementsByClassName('preci');
  var numIcons = document.getElementsByClassName('cIcon');
  var temp = time;
  // console.log(data);
  for(i = 0; i < numHour.length; i++){
    temp = temp+1;
    if(temp > 23){temp=0;}
    if(temp == 0){numHour[i].innerHTML = "12 a.m";}
    else if(temp == 12){
      numHour[i].innerHTML = (temp) + "p.m";
    } else if(temp > 12){
      numHour[i].innerHTML = (temp-12) + "p.m";
    } else{
      numHour[i].innerHTML = (temp) + "a.m";
    }
  }
  for(i = 0; i < numHourW.length; i++){
    numHourW[i].innerHTML = Math.round(data.hourly.temperature_2m[time+i+1]) + "&deg;";
  }
  for(i = 0; i < numP.length; i++){
    numP[i].innerHTML = Math.round(data.hourly.precipitation_probability[time+i]) + "%";
  }
  for(i = 0; i < numIcons.length; i++){
    if(today.getHours() < sunset && today.getHours() > sunrise){
      numIcons[i].innerHTML = iconsDay[data.hourly.weathercode[time+i]];
    } else{
      numIcons[i].innerHTML = iconsNight[data.hourly.weathercode[time+i]];
    }
  }
  if(today.getHours() < sunrise || today.getHours() < sunset){
    document.querySelector('#icon').innerHTML = iconsDay[data.hourly.weathercode[time]];
  } else{
    document.querySelector('#icon').innerHTML = iconsNight[data.hourly.weathercode[time]];
  }
}

async function checkWeatherDaily(longitude, latitude){
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,precipitation_probability_max,weathercode&timezone=EST`);
  const data = await response.json();
  var numTemp = document.getElementsByClassName('weeklyTemp');
  var numPerci = document.getElementsByClassName('weeklyPerci');
  var numDates = document.getElementsByClassName('date');
  var numIconsD = document.getElementsByClassName('iconDaily');
  console.log(data);
  for(i = 0; i < numTemp.length; i++){
    numTemp[i].innerHTML = Math.round(data.daily.temperature_2m_max[i+1]) + "&deg;";
  }
  for(i = 0; i < numPerci.length; i++){
    numPerci[i].innerHTML = Math.round(data.daily.precipitation_probability_max[i]) + "%";
  }
  for(i = 0; i < numDates.length; i++){
    today.setDate(today.getDate()+1);
    numDates[i].innerHTML = today.toString().substring(0,3);
  }
  today = new Date();
  // console.log(today.toString());
  for(i = 0; i < numIconsD.length; i++){
    // console.log(data.daily.weathercode[i] + " " + numIconsD[i] );
      numIconsD[i].innerHTML = iconsDay[data.daily.weathercode[i]];
  }
}

searchBtn.addEventListener("click", ()=>{
  // console.log(search.value);
  city = search.value;
  checkWeather(search.value);
  // getCoords(search.value);
  let options = {
    method: 'GET',
    headers: { 'x-api-key': 'LmD0ZK5HTYnAzC6NFgDMIw==VlocDrZKOPyfM5Hm' }
  }
  
  let url = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
  
  
  fetch(url,options)
        .then(res => res.json())
        .then(data => {
          longitude = data[0].longitude;
          latitude = data[0].latitude;
          checkWeatherDaily(longitude,latitude);
          getSunset(longitude, latitude);
          console.log(data);
        })
        .catch(err => {
            console.log(`error ${err}`);
        }); 
})
