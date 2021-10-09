const storage = new Storage();

const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.state);


const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);
document.getElementById('w-change-btn').addEventListener('click', (e) => {
   const city = document.getElementById('city').value;
   const state = document.getElementById('state').value;

   weather.changeLocation(city, state);

   storage.setLocationData(city, state);
   
   getWeather();
   $('#locModal').modal('hide');
})

function getWeather(){

weather.getWeather()
  .then(results => {
    
    ui.paint(results);
    console.log(results);
  })
  .catch(err => console.log(err));
}






// // Init weather object
// const weather = new Weather('Boston', 'MA');

// // Get weather on DOM load
// document.addEventListener('DOMContentLoaded', getWeather);

// // weather.changeLocation('Miami', 'FL');

// function getWeather(){
//   weather.getWeather()
//     .then(results => {
//       console.log(results);
//     })
//     .catch(err => console.log(err));
// }