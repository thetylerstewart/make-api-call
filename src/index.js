import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function () {
  $('#weatherLocation').click(function () {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Farenheigt is ${(Math.round(response.main.temp - 273.15) * 9 / 5 + 32)} degrees.`);
      $('.showWind').text(`The wind speed is ${response.wind.speed}`)
      $('.showLow').text(`The Low is ${(Math.round(response.main.temp_min - 273.15) * 9 / 5 + 32)}`)
      $('.showHigh').text(`The High is ${(Math.round(response.main.temp_max - 273.15) * 9 / 5 + 32)}`)
    }
  });
});