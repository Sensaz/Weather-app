// 'use strict'

const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=c64ddfeef56d6ac92e7e98746816e49c';
const units = '&units=metric';
let $city;
let $url;

const getWeather = () => {
    $city = (!input.value) ? 'Warsaw': input.value;
    $url = apiLink + $city + apiKey + units;

    axios.get($url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather)

            cityName.textContent = res.data.name;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';
            weather.textContent = status.main;

            warning.textContent = '';
            input.value = '';
            
            if(status.id >= 200 && status.id < 300){
                photo.setAttribute('src', 'Photo/thunderstorm.png');
            } else if (status.id >= 300 && status.id < 400){
                photo.setAttribute('src', 'Photo/drizzle.png');
            } else if (status.id >= 500 && status.id < 600){
                photo.setAttribute('src', 'Photo/rain.png');
            } else if (status.id >= 600 && status.id < 700){
                photo.setAttribute('src', 'Photo/ice.png');
            } else if(status.id >= 700 && status.id < 800){
                photo.setAttribute('src', 'Photo/fog.png');
            } else if (status.id === 800){
                photo.setAttribute('src', 'Photo/sun.png');
            } else if (status.id > 800 && status.id < 900){
                photo.setAttribute('src', 'Photo/cloud.png');
            } else{
                photo.setAttribute('src', 'Photo/unknown.png');
            }

        })
        .catch(() => {warning.textContent = 'Wpisz poprawną nazwe miasta.'})
};

const enterCheck = (event) =>{
    if(event.code === 'Enter'){
        getWeather();
    };
}

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);