'use strict';

//HTML elements
const btn = document.querySelector('[search]');
const inputEL = document.querySelector('[input]');
const controlEL = document.querySelector('[control]');
const temperatureEL = document.querySelector('[tempSecond]');
const sunriseEL = document.querySelector('[sunriseSecond]');
const sunsetEL = document.querySelector('[sunsetSecond]');
const dropdownContentEL = document.querySelector('[dropdown-content]');
const dropdownValueEL = document.querySelector('[dropdown-value]');
const inputError = document.querySelector('input[name="name"]');

//variables
let apiKey = 'eafb8fbf299373ccddfba8adbc96f97b';
let icon = document.getElementById('icon');
let temperature = '';
let unixTimestampSunrise = '';
let unixTimestampSunset = '';
let systemChosen = 'metric';
let errorObj = {};

//time Conversion
function convertUnixTimeStampToLocalTime(time) {
  unixTimestampSunrise = time * 1000;
  let dateObject = new Date(unixTimestampSunrise);
  return dateObject.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

//invalid Input`
function Error(returnedData) {
  if (returnedData === '400') {
    alert('Nothing to geocode');
  }
}

//calculation system
myDropdown.onchange = function () {
  systemChosen = this.value;
};

//temp calculation
function temperatureCalculation(temp) {
  if (systemChosen === 'metric') {
    temperature = Math.trunc(Number(temp));
    temperatureEL.textContent = `${temperature} °C`;
  } else if (systemChosen === 'imperial') {
    temperature = Math.trunc(Number(temp));
    temperatureEL.textContent = `${temperature} °F`;
  } else {
    temperature = Math.trunc(Number(temp));
    temperatureEL.textContent = `${temperature} °K`;
  }
}

//API pull
btn.addEventListener('click', function () {
  if (inputEL.value !== '') {
    $.ajax({
      method: 'GET',
      url: `http://api.openweathermap.org/data/2.5/weather?q=${inputEL.value}&appid=${apiKey}&units=${systemChosen}`,
      //headers: { 'X-Api-Key': 'YOUR_API_KEY'},
      //contentType: 'application/json',
      dataType: 'JSON',
      success: function (data) {
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        //temperature textContent
        temperatureCalculation(data.main.temp);

        //sunrise & sunset
        sunriseEL.textContent = convertUnixTimeStampToLocalTime(
          data.sys.sunrise
        );
        sunsetEL.textContent = convertUnixTimeStampToLocalTime(data.sys.sunset);
      },

      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
        errorObj = JSON.parse(jqXHR.responseText);
        Error(errorObj.cod);
      },
    });
  } else {
    //alert("Input Field can't be empty!");
  }
});

//grid css / html
//5 day weather forecast per 3 hours https://openweathermap.org/forecast5
//error handling (if http =/= 200, plain textfield, wrong city etc)
