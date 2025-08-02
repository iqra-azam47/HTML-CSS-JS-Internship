const apiKey = "3fefa3babe750ec595f5f3a98498f796";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const name = data.name;
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].main;
      setBackground(condition);

      let icon = "🌤️";

if (condition === "Clear") icon = "☀️";
else if (condition === "Clouds") icon = "☁️";
else if (condition === "Rain") icon = "🌧️";
else if (condition === "Snow") icon = "❄️";
else if (condition === "Thunderstorm") icon = "⛈️";
else if (condition === "Drizzle") icon = "🌦️";
else if (condition === "Mist" || condition === "Fog") icon = "🌫️";

document.getElementById("weatherInfo").innerHTML = `
  <h2>${name}</h2>
  <p>${icon} <strong>${condition}</strong></p>
  <p>🌡️ Temperature: ${temp}°C</p>
  <p>💧 Humidity: ${humidity}%</p>
`;

    })
    .catch(error => {
      document.getElementById("weatherInfo").innerHTML = `<p style="color: white;">${error.message}</p>`;
    });
}


function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    document.getElementById("weatherInfo").innerHTML = "Geolocation is not supported by this browser.";
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const name = data.name;
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].main;
        setBackground(condition);

        let icon = "🌤️";
        if (condition === "Clear") icon = "☀️";
        else if (condition === "Clouds") icon = "☁️";
        else if (condition === "Rain") icon = "🌧️";
        else if (condition === "Snow") icon = "❄️";
        else if (condition === "Thunderstorm") icon = "⛈️";
        else if (condition === "Drizzle") icon = "🌦️";
        else if (condition === "Mist" || condition === "Fog") icon = "🌫️";

        document.getElementById("weatherInfo").innerHTML = `
          <h2>${name}</h2>
          <p>${icon} <strong>${condition}</strong></p>
          <p>🌡️ Temperature: ${temp}°C</p>
          <p>💧 Humidity: ${humidity}%</p>
        `;
      });
  }

  function error() {
    document.getElementById("weatherInfo").innerHTML = "Unable to retrieve your location.";
  }
}


function setBackground(condition) {
  let imageUrl = "";

  if (condition === "Clear") {
    imageUrl = "images/sunny.jpeg";
  } else if (condition === "Clouds") {
    imageUrl = "images/cloudy.jpeg";
  } else if (condition === "Rain") {
    imageUrl = "images/rainy.jpeg";
  } else if (condition === "Snow") {
    imageUrl = "images/snowy.jpeg";
  } else if (condition === "Thunderstorm") {
    imageUrl = "images/storm.jpeg";
  } else {
    imageUrl = "images/default.jpg";
  }

  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}


