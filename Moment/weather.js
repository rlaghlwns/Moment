// 유튜브 영상
// https://www.youtube.com/watch?v=l6hSze8vgVo&feature=emb_logo

// Weather API 가입후 키코드 받기
// API - API KEY - KEY

// https://openweathermap.org/current
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

const weather = document.querySelector(".js-weather");


const API_KEY ="155ef6cb33269d151df463242d714bb7";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        // lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric 부분 수정, 추가
        )
          .then(function(response){
            return response.json();
        })
          .then(function(json){
              const temperature = json.main.temp;
              const place = json.name;
              weather.innerText = `${temperature}℃ ${place}`;
          })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();