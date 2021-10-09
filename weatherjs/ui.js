class UI{
    constructor() {
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.icon = document.getElementById('w-icon');
        this.details = document.getElementById('w-details');
        this.humidity = document.getElementById('w-humidity');
        this.temperature = document.getElementById('w-temperature');
        this.FeelsLike = document.getElementById('w-feels-like');
        this.wind = document.getElementById('w-wind');
    }

    paint(weather) {
       const icon = weather.weather[0].icon;
       
        this.location.textContent = weather.name + ' ' + weather.sys.country;

        this.desc.textContent = weather.weather[0].description;

        this.string.textContent = weather.main.temp;

        
        this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);

        this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;

        this.FeelsLike.textContent = `Feels Like: ${weather.main.feels_like}`;

        this.temperature.textContent = `Temperature: (Minimum Temp:${weather.main.temp_min}) (Maximum Temp:${weather.main.temp_max})`;

        this.wind.textContent = `Wind: (Degree:${weather.wind.deg}), (Gust:${weather.wind.gust}), (Speed:${weather.wind.speed})`;
    }
}