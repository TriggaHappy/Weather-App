'use strict';

//HTML elements
const btn = document.querySelector('[search]');
const inputEL = document.querySelector('[input]');
const controlEL = document.querySelector('[control]');
const temperatureEL = document.querySelector('[temp]');
//Elements

//variables
let apiKey = 'eafb8fbf299373ccddfba8adbc96f97b';
let icon = document.getElementById('icon');
let temperatur = '';

//functions
btn.addEventListener('click', function fetch() {
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
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    },
  });
});

//grid css / html
//drop down menu -> units (Celsius, Farenheit, Standard)
// sunrise sunset hint: unix timestamp
