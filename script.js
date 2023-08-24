'use strict';

//HTML elements
const btn = document.querySelector('[search]');
const inputEL = document.querySelector('[input]');
const controlEL = document.querySelector('[control]');
const temperatureEL = document.querySelector('[tempSecond]');
const sunriseEL = document.querySelector('[sunriseSecond]');
const sunsetEl = document.querySelector('.[sunsetSecond]');
//Elements

//variables
let apiKey = 'eafb8fbf299373ccddfba8adbc96f97b';
let icon = document.getElementById('icon');
let temperatur = '';
let unixTimestampSunrise = '';
let unixTimestampSunset = '';

//functions
btn.addEventListener('click', function () {
  $.ajax({
    method: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${inputEL.value}&appid=${apiKey}`,
    //headers: { 'X-Api-Key': 'YOUR_API_KEY'},
    //contentType: 'application/json',
    dataType: 'JSON',
    success: function (data) {
      console.log(data);
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temperatur = Math.trunc(Number(data.main.temp - 273, 15)); //dynamic!!!!
      temperatureEL.textContent = temperatur;

      //sunrise
      unixTimestampSunrise = data.sys.sunrise * 1000;
      let SunriseObject = new Date(unixTimestampSunrise);
      let SunriseDateFormat = SunriseObject.toLocaleTimeString();
      sunriseEL.textContent = SunriseDateFormat;

      //sunset
      unixTimestampSunset = data.sys.sunset * 1000;
      let SunsetObject = new Date(unixTimestampSunset);
      let SunsetDateFormat = SunsetObject.toLocaleTimeString();
      console.log(SunsetDateFormat);
      //sunsetEl.textContent = SunsetDateFormat; NOT WORKING
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    },
  });
});

//grid css / html
//drop down menu -> units (Celsius, Farenheit, Standard)
// sunrise sunset hint: unix timestamp
