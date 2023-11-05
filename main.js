document.addEventListener("DOMContentLoaded", () => {
  const apiKey = '0cfd0ded533c5d2967d622e6b8d52427';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const cityInput = document.querySelector('.search-bar');
  const searchBtn = document.querySelector('button');
  const city = document.querySelector('.city');
  const temp = document.querySelector('.temp');
  const icon = document.querySelector('.icon');
  const descrip = document.querySelector('.descript');
  const humid = document.querySelector('.humidity');
  const wind = document.querySelector('.wind');

  // ** Fetching weather data
  const fetchWeatherData = async (city) => {
    const weatherUrl = `${apiUrl}?q=${city}&appid=${apiKey}`;
    try {
      const res = await fetch(weatherUrl);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Error fetching weather data:', err);
      throw err;
    }
  };

  // ** Update weather data in the DOM
  const updateWeatherData = (data) => {
    city.textContent = "Weather in " + data.name + ", " + data.sys.country;
    temp.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
    icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    descrip.textContent = data.weather[0].description;
    humid.textContent = 'Humidity: ' + data.main.humidity + '%';
    wind.textContent = 'Wind speed: ' + data.wind.speed + ' m/s';
    document.querySelector('.weather').classList.remove('load');
  };

  // ? Event listeners
  searchBtn.addEventListener('click', async () => {
    const cityValue = cityInput.value;
    const weatherData = await fetchWeatherData(cityValue);
    updateWeatherData(weatherData);
  });

  // ? Event listeners for keypress events
  cityInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const cityValue = cityInput.value;
      const weatherData = await fetchWeatherData(cityValue);
      updateWeatherData(weatherData);
    }
  });

  fetchWeatherData('Eket').then(updateWeatherData);
});
