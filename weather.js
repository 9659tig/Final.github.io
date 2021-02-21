const API_KEY = 'edc7ddacc07a00afa3087a887a6bcb1f';
const coords = "Coords";
const weather = document.querySelector(".weather");
const W = document.querySelector(".W");
W.innerText='💧';
function showWeather(){
  weather.classList.toggle('showing');
}
function getweather(lat,lon) {
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
     return response.json();
   }).then(function(json){
     const temperature = json.main.temp;
     const place = json.name;
     const cloud = json.weather[0].main;
     weather.innerText=`${place}, ${temperature}°C, ${cloud}`
   })
}
function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const corrdsObj = {
    latitude,
    longitude
  };
  localStorage.setItem(coords, JSON.stringify(corrdsObj));
  getweather(latitude,longitude);
}
function handleGeoError(){
  console.log("Cant load");
}
function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}
function loadcoords(){
  const loadedcoords=localStorage.getItem(coords);
  if (loadedcoords===null) {
    askForCoords();
  }else{
    const parsecoords = JSON.parse(loadedcoords);
    getweather(parsecoords.latitude, parsecoords.longitude);
  }
}
function init(){
  loadcoords();
  W.addEventListener("click", showWeather);
}
init();
