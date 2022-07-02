function currentDate(now = new Date()) {
  let date = now.getDate();
  let time = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let mainDay = document.querySelector("#main-day");
  mainDay.innerHTML = `${day}`;
  let mainDate = document.querySelector("#main-date ");
  mainDate.innerHTML = `${date} ${month}  ${time}:${minutes}`;
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(getTempOfLocation);
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#tempNumber");
  let temp = Math.round(response.data.main.temp);
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = ` ${temp}`;
  let currentWeather = document.querySelector("#currentWeather");
  currentWeather.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  let hum = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${hum} %`;
  let wind = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${speed} m/s`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celTemp = response.data.main.temp;
  
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="d-flex row-12 p-2 ">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class=" boxWidth container  p-3  border weather-forecast">
    <div >
      <span class="material-symbols-outlined">
        sunny
      </span>   
        <div >
          ${day}
        </div>
            <div >
                 30°C
            </div>
     </div>
     </div>
     `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
function getTempOfCity(city) {
  let apiKey = "916448310e3a306ffba91ecebe45fae4";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then((res) => showTemperature(res));
}

function getTempOfLocation(position) {
  let apiKey = "916448310e3a306ffba91ecebe45fae4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  const city = event.inputCity.value;
  getTempOfCity(city);
}

function onStart() {
  let button = document.querySelector("#currentPosition");
  button.addEventListener("click", getCurrentCity);
  currentDate();
  const location = getCurrentCity();
  getTempOfLocation(location);
}
function showFahTemp(event) {
  event.preventDefault();
  let fahTemp = (celTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(fahTemp);
}
let fah = document.querySelector("#fahrenheit");
fah.addEventListener("click", showFahTemp);
function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempNumber");
  temperatureElement.innerHTML = Math.round(celTemp);
}
let cel = document.querySelector("#celsius");
cel.addEventListener("click", showCelTemp);
onStart();
getTempOfCity("Lviv");
