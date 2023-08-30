'use strict';

//HTML elements
const btn = document.querySelector('[search]');
const inputEL = document.querySelector('[input]');
const controlEL = document.querySelector('[control]');
const temperatureEL = document.querySelector('[tempSecond]');
const sunriseEL = document.querySelector('[sunriseSecond]');
const sunsetEL = document.querySelector('[sunsetSecond]');
const btnDropdownEl = document.querySelector('[dropbtn]');
const dropdownContentEL = document.querySelector('[dropdown-content]');
const dropdownValueEL = document.querySelector('[dropdown-value]');
//Elements

//variables
let apiKey = 'eafb8fbf299373ccddfba8adbc96f97b';
let icon = document.getElementById('icon');
let temperatur = '';
let unixTimestampSunrise = '';
let unixTimestampSunset = '';
let systemChosen = 'metric';

//functions
function convertUnixTimeStampToLocalTime(time) {
  unixTimestampSunrise = time * 1000;
  let dateObject = new Date(unixTimestampSunrise);
  return dateObject.toLocaleTimeString();
}

btnDropdownEl.addEventListener('click', function () {
  document.getElementById('myDropdown').classList.toggle('show');
});

//calculation system
myDropdown.onchange = function () {
  systemChosen = this.value;
  console.log(systemChosen);
};

//API pull
btn.addEventListener('click', function () {
  $.ajax({
    method: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${inputEL.value}&appid=${apiKey}&units=${systemChosen}`,
    //headers: { 'X-Api-Key': 'YOUR_API_KEY'},
    //contentType: 'application/json',
    dataType: 'JSON',
    success: function (data) {
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temperatur = Math.trunc(Number(data.main.temp - 273, 15)); //dynamic!!!!
      temperatureEL.textContent = temperatur;

      //sunrise & sunset
      sunriseEL.textContent = convertUnixTimeStampToLocalTime(data.sys.sunrise);
      sunsetEL.textContent = convertUnixTimeStampToLocalTime(data.sys.sunset);
      console.log(systemChosen);
    },

    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    },
  });
});

//grid css / html
//drop down menu -> units (Celsius, Farenheit, Standard)
// sunrise sunset hint: unix timestamp
