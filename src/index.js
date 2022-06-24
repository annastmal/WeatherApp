function onStart() {
  let button = document.querySelector("#currentPosition");
  button.addEventListener("click", getCurrentCity);
}

function getCurrentCity() {
  navigator.geolocation.getCurrentPosition(getTempOfLocation);
}

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

onStart();
currentDate();

function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#tempNumber");
  let temp = Math.round(response.data.main.temp);
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = ` ${temp}`;
}

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
