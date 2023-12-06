
const longInputElem = document.getElementById("long");

const latInputElem = document.getElementById("lat");
 const containerElem = document.getElementById("weather-data-container");

let tempElem;
let unitsElem;
let unit = "k";
let apiData;

async function getWeather(location) {

const API = "a5f1e89f40e75e656ca3f922a938fc32"
  
const locationData = location ?? getLocation()


const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.long}&appid=${API}`

  apiData = await fetch(apiCall).then(res => res.json()).then(res => {

    return {
      weather: res.weather[0].main,
      temp: res.main.temp,
      humidity: res.main.humidity
    }

  })
   console.log(apiData);
  const weatherDisplayElem = createWeatherDashboard(apiData);
  if (containerElem.childElementCount === 0) {
    containerElem.appendChild(weatherDisplayElem);
  } else {
    containerElem.children[0].replaceWith(weatherDisplayElem);
  }


  tempElem = document.getElementById("temp")
  unitsElem = document.getElementById("units")
  unitsElem.addEventListener('change', recalcTemp)
  

  unitsElem.addEventListener('change', recalcTemp);
}

function createWeatherDashboard(data) {
  const weatherDisplayElem = document.createElement('div')
   weatherDisplayElem.classList.add('weather-display');
  weatherDisplayElem.innerHTML = `
      <h2>${data.weather}</h2>
      <p id="temp" >Temperature: ${standardToUnit(unit,data.temp)}° ${unit}</p>

      
      <select id="units">
        <option value="k" ${unit = "k"? "selected" : ""} > Kelvin </option>
        <option value="c" ${unit = "c"? "selected" : ""} > Celcius </option> </option>
        <option value="f" ${unit = "f"? "selected" : ""} > Fahrenheit </option>
      </select>

      <p>Humidity: ${data.humidity}%</p>
      
  `;  
  return weatherDisplayElem;
}


function standardToUnit(unit, temp) {

  if(unit == "c"){
    return Math.round(temp - 273.15);
  }

  if(unit == "f"){
    return Math.round((temp - 273.15) * 1.8 + 32);
  }
  
  return temp;
}

function recalcTemp() {

  unit = unitsElem.value;
  temp = standardToUnit(unit, apiData.temp);
  tempElem.innerHTML = `temperature: ${temp}° ${unit}`;

}
function getLocation() {
  return {
    lat: latInputElem.value,
    long: longInputElem.value
  }

}