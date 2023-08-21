'use strict';

const btn = document.querySelector('[search]');
const input = document.querySelector('[input]');
const control = document.querySelector('[control]');
let city = '';



btn.addEventListener('click', function () {
  city = input.value;
});

let apiKey = 'eafb8fbf299373ccddfba8adbc96f97b';
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey};

fetch(queryURL)
