const apiKey = "a4e8a686b451f16bbed2be887a73e6e2";
const search = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
var longitude;
var latitude;

const findMyCoords = () =>{
  
  const status = document.querySelector('.status');


  const success = (position) => {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    let coordURL=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    async function checkWeatherInLoca(){
      const response = await fetch(coordURL);
      var data = await response.json();
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
      console.log(data);
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
  }
  
  const error = () => {
    status.textContent = 'Unable to retrieve your location';
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
  
  
}

findMyCoords();

//let coordURL=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;


async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
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
  console.log(data);
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
searchBtn.addEventListener("click", ()=>{
  console.log(search.value);
  checkWeather(search.value);
})
