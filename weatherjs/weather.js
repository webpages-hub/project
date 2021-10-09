class Weather {
  constructor(city, state) {
    this.apiKey = '7e3fd3c44a20da0540b062b4b3065489';
    this.city = city;
    this.state = state;
  }

  async getWeather(){
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&appid=${this.apiKey}`);

    const responseData = await response.json();

    return responseData;
  }

  changeLocation(city, state){
    this.city = city;
    this.state = state;
  }
 
}









// class Weather {
//   constructor(city, state) {
//     this.apiKey = '99dfe35fcb7de1ee';
//     this.city = city;
//     this.state = state;
//   }

//   // Fetch weather from API
//   async getWeather() {
//     const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`);

//     const responseData = await response.json();

//     return responseData.current_observation;
//   }

//   // Change weather location
//   changeLocation(city, state) {
//     this.city = city;
//     this.state = state;
//   }
// }