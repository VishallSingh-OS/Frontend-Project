document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNamedisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "7c5c9f36793ee0d2a703fa31f042e451";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError(error.message);
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        "City not found. Please check the spelling and try again."
      );
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    errorMessage.classList.add("hidden");
    weatherInfo.classList.remove("hidden");

    cityNamedisplay.textContent = data.name;
    temperatureDisplay.textContent = `Temperature: ${Math.round(
      data.main.temp
    )}°C`;
    descriptionDisplay.textContent = `Description: ${data.weather[0].description}`;
  }

  function showError(message) {
    weatherInfo.classList.add("hidden");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }
});
