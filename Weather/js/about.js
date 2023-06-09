const apiKey = "a4e8a686b451f16bbed2be887a73e6e2";
const search = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
var longitude;
var latitude;
var xData = [];
var yData;
var myChart;
var myChart2;
for(i = 0; i < 100; i++){
  xData[i] = 1950+i;
}

const findMyCoords = () =>{
  
  const status = document.querySelector('.status');
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    graphPoints(longitude,latitude);
  }

  const error = () => {
    status.textContent = 'Unable to retrieve your location';
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
}

findMyCoords();

function calculatePercentageDifference(value1, value2) {
  const difference = Math.abs(value1 - value2);
  const percentageDifference = Math.abs((difference / value1) * 100);
  return percentageDifference.toFixed(2);
}

async function graphPoints(longitude, latitude){
  const response = await fetch(`https://climate-api.open-meteo.com/v1/climate?latitude=${latitude}&longitude=${longitude}&start_date=1950-01-01&end_date=2050-12-31&daily=temperature_2m_max,temperature_2m_min&models=CMCC_CM2_VHR4,FGOALS_f3_H,HiRAM_SIT_HR,MRI_AGCM3_2_S,EC_Earth3P_HR,MPI_ESM1_2_XR,NICAM16_8S`);
  const data = await response.json();
  console.log(data);
  yData = data.daily.temperature_2m_max_EC_Earth3P_HR;
  console.log(data.daily.temperature_2m_min_EC_Earth3P_HR[0] + " " + data.daily.temperature_2m_min_EC_Earth3P_HR[36524]);
  document.querySelector('.percentMax').innerHTML = calculatePercentageDifference(data.daily.temperature_2m_max_EC_Earth3P_HR[0],data.daily.temperature_2m_max_EC_Earth3P_HR[36524]) + '%';
  document.querySelector('.percentMin').innerHTML = calculatePercentageDifference(data.daily.temperature_2m_min_EC_Earth3P_HR[0],data.daily.temperature_2m_min_EC_Earth3P_HR[36524]) + '%';
  var yData2 = data.daily.temperature_2m_min_EC_Earth3P_HR;
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'Temperture Max (°C)',
        data: yData,
        borderColor: 'red',
        fontColor:'white',
        backgroundColor: 'transparent',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          fontColor:'white',
          display: true,
          title: {
            display: true, 
            fontColor:'white',
            text: 'Year'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Temperture Max (°C)'
          }
        }
      }
    }
  });
  const ctx2 = document.getElementById('myChart2').getContext('2d');
  myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: xData,
      datasets: [{
        label: 'Temperture Min (°C)',
        data: yData2,
        borderColor: 'blue',
        fontColor:'white',
        backgroundColor: 'transparent',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          fontColor:'white',
          display: true,
          title: {
            display: true, 
            fontColor:'white',
            text: 'Year'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Temperture Min (°C)'
          }
        }
      }
    }
  });
}
searchBtn.addEventListener("click", ()=>{
  city = search.value;
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
          myChart.destroy();
          myChart2.destroy();
          graphPoints(longitude,latitude);
          console.log(data);
        })
        .catch(err => {
            console.log(`error ${err}`);
        }); 
})

