const apikey = "25eaf260cb9409818a090a7a4038ea1b";

const weatherDataE1 = document.getElementById("weather-data")

const cityInputE1 = document.getElementById("city-input")

const formE1 = document.querySelector("form")

formE1.addEventListener("submit", (e)=>{
    e.preventDefault();
    const cityValue = cityInputE1.value;
    console.log(cityValue);
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();
        
        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ]

        weatherDataE1.querySelector(".icon").innerHTML = 
        `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon">`;
        weatherDataE1.querySelector(
            ".temperature").textContent = `${temperature}°C`;
        weatherDataE1.querySelector(".description").textContent = description;

        weatherDataE1.querySelector(".details").innerHTML = details.map(
            (detail)=> `<div>${detail}</div>`).join("");
    }catch (error){
        weatherDataE1.querySelector(".icon").innerHTML = 
        "";
        weatherDataE1.querySelector(".temperature").textContent = "";
        weatherDataE1.querySelector(".description").textContent = "An error happend";

        weatherDataE1.querySelector(".details").innerHTML = "";
    }
}