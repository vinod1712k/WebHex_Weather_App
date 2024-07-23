document.addEventListener('DOMContentLoaded', () => {
    updateCurrentDateTime();
    setInterval(updateCurrentDateTime, 1000); // Update every second
});

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = '6f6590a62001f999f810262a87b98fe8';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => displayCurrentWeather(data))
        .catch(error => console.error('Error fetching current weather:', error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast:', error));
});

function updateCurrentDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

function displayCurrentWeather(data) {
    const { main, weather, name } = data;
    const temperature = Math.round(main.temp);
    const description = weather[0].description;
    const icon = weather[0].icon;
    const date = new Date().toLocaleDateString();

    document.getElementById('cityName').textContent = name;
    document.getElementById('date').textContent = date;
    document.getElementById('weatherDescription').innerHTML = `<img id="weatherIcon" src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"> <span id="descriptionText">${description}</span>`;
    document.getElementById('temperature').textContent = `${temperature}°`;

    document.getElementById('initialInfo').classList.add('hidden');
    document.getElementById('weatherDetails').classList.remove('hidden');
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('.forecast-daily');
    forecastContainer.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) { // Taking 1 forecast per day
        const forecast = data.list[i];
        const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const temperature = Math.round(forecast.main.temp);
        const icon = forecast.weather[0].icon;

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <p>${day}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
            <p>${temperature}°</p>
        `;
        forecastContainer.appendChild(forecastElement);
    }
}
