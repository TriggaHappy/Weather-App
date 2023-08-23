'use strict';

const btn = document.querySelector('[search]');
const input = document.querySelector('[input]');
const control = document.querySelector('[control]');
let apiKey = 'eafb8fbf299373ccddfba8adbc96f97b';

btn.addEventListener('click', function () {
  $.ajax({
    method: 'GET',
    url: `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`,
    //headers: { 'X-Api-Key': 'YOUR_API_KEY'},
    //contentType: 'application/json',
    success: function (result) {
      console.log(result);
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    },
  });
});
