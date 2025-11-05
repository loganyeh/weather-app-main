
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");
const cityText = document.getElementById("city-text");
const dateText = document.getElementById("date-text");
const weatherTemperatureNumber = document.getElementById("weather-temperature-number");

// GLOBAL VARIABLES 
let weatherData = {};

// EVENT LISTENERS
searchButton.addEventListener("click", async () => {
    const cityName = inputBar.value;

    await getWeatherInfo(cityName);
    updateCityName();
    displayTemp();
    clearInputBar();
    hourlyForecast();
    extraWeatherInfo();
});

// FUNCTIONS
function clearInputBar(){
    inputBar.value = "";
};
function updateCityName(){
    cityText.innerHTML = `
        ${weatherData.cityName}, ${weatherData.cityState}
    `;
}
function updateDate(){
    const now = new Date();
    let dayOfTheWeek = "";
    weatherData.day = now.getDay();
    weatherData.month = now.getMonth();
    weatherData.monthForTemp = now.getMonth() + 1;
    weatherData.date = now.getDate();
    weatherData.year = now.getFullYear();
    weatherData.hour = now.getHours();

    // 2025-11-04T00:00

    // console.log(`Current Time variable in the updateDate() function: ${weatherData.currentTime}`);

    // DATE
    // -----DAY-----
    switch(weatherData.day){
        case 0: 
            weatherData.dayOfTheWeek = "Sunday";
            break;
        case 1: 
            weatherData.dayOfTheWeek = "Monday";
            break;
        case 2: 
            weatherData.dayOfTheWeek = "Tuesday";
            break;
        case 3: 
            weatherData.dayOfTheWeek = "Wednesday";
            break;
        case 4:
            weatherData.dayOfTheWeek = "Thursday";
            break;
        case 5: 
            weatherData.dayOfTheWeek = "Friday";
            break;
        case 6: 
            weatherData.dayOfTheWeek = "Saturday";
            break;
        default: 
            console.log("Not a valid day of the week");
    }
    // ----- MONTH -----
    switch(weatherData.month){
        case 0: 
            weatherData.monthName = "Jan";
            break;
        case 1: 
            weatherData.monthName = "Feb";
            break;
        case 2: 
            weatherData.monthName = "Mar";
            break;
        case 3: 
            weatherData.monthName = "Apr";
            break;
        case 4: 
            weatherData.monthName = "May";
            break;
        case 5: 
            weatherData.monthName = "Jun";
            break;
        case 6: 
            weatherData.monthName = "Jul";
            break;
        case 7: 
            weatherData.monthName = "Aug";
            break;
        case 8: 
            weatherData.monthName = "Sep";
            break;
        case 9: 
            weatherData.monthName = "Oct";
            break;
        case 10: 
            weatherData.monthName = "Nov";
            break;
        case 11: 
            weatherData.monthName = "Dec";
            break;
    }

    dateText.innerHTML = `
        ${weatherData.dayOfTheWeek}. ${weatherData.monthName} ${weatherData.date}, ${weatherData.year}
    `
}
function displayTemp(){
    weatherTemperatureNumber.innerHTML = `
        ${weatherData.currentTemperature}°;
    `
}
function hourlyForecast(){
    let count = 1;

    for(let i = weatherData.currentTimeArrayIndex + 5; i < weatherData.currentTimeArrayIndex + 13; i++){
        const div = document.getElementById(`temperature-${count}`);
        const div2 = document.getElementById(`time-of-day-${count}`);
        let APM = ""

        // let utc = Number(weatherData.data2.hourly.time[i].slice(11, 13));
        // const easternHour = (utc - 5 + 24) % 24;
        // console.log(`EASTERN HOUR: ${easternHour}`);

        if(Number(weatherData.data2.current.time.slice(11, 13) < 12)) {
            APM = "AM";
        }
        else{
            APM = "PM";
        }

        console.log(`Time at ${Number(weatherData.data2.hourly.time[i].slice(11, 13))} ${APM} is ${weatherData.data2.hourly.temperature_2m[i]} F°`);
        // PROABBLY FORMAT THE TIME INTO 12 HOUR FORMAT
        div.innerHTML = `
            ${weatherData.data2.hourly.temperature_2m[i]}°
        `;
        div2.innerHTML =  `
            ${Number(weatherData.data2.hourly.time[i].slice(11, 13))} ${APM}
        `
        
        count++;
    }

    let currentTimeSliced = Number(weatherData.data2.current.time.slice(11, 13));
}
function hourlyForecastDay(){
    const div = document.getElementById(`day-${weatherData.day}`);
    const select = document.getElementById(`dotw-dropdown`);
    select.value = weatherData.dayOfTheWeek;
}
function extraWeatherInfo(){
    const feelsLikeTemp = document.getElementById("feels-like-temp");
    feelsLikeTemp.innerHTML = `
        ${weatherData.apparentTemp}°
    `

    const humidityUnits = document.getElementById("humidity-units");
    humidityUnits.innerHTML = `
        ${weatherData.humidity}%
    `

    const windUnits = document.getElementById("wind-units");
    windUnits.innerHTML = `
        ${weatherData.wind}km/h
    `

    const precipitationUnits = document.getElementById("precipitation-units");
    precipitationUnits.innerHTML = `
        ${weatherData.precipitation}mm
    `


}
function dailyForecast(){
    let count = 1;
    for(let i = weatherData.day; i < weatherData.day + 7; i++){
        const div = document.getElementById(`day-${count}-of-the-week`);

        switch(i % 7){
            case 0: 
                div.innerHTML = `Sun`;
                break;
            case 1: 
                div.innerHTML = `Mon`;
                break;
            case 2: 
                div.innerHTML = `Tue`;
                break;
            case 3: 
                div.innerHTML = `Wed`;
                break;
            case 4:
                div.innerHTML = `Thu`;
                break;
            case 5: 
                div.innerHTML = `Fri`;
                break;
            case 6: 
                div.innerHTML = `Sat`;
                break;
        }
        count++;
    }
}

// CALLS 
updateDate();
hourlyForecastDay();
dailyForecast();

// ASYNCS
async function getWeatherInfo(city){
    // GEOCODING API URL
    console.log(`Welcome to ${city}`);
    let temp = 0;

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
        const data = await response.json();
        // console.log(data);
        weatherData.data = data;

        weatherData.cityName = data.results[0].name;
        weatherData.cityState = data.results[0].admin1;
        weatherData.latitude = data.results[0].latitude;
        weatherData.longitude = data.results[0].longitude;

    }
    catch(error){
        console.error(`Error in getCityName(): ${error}`);
    }

    // WEATHER FORECAST API
    const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${weatherData.latitude}&longitude=${weatherData.longitude}&hourly=temperature_2m&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation,relative_humidity_2m&temperature_unit=fahrenheit`);
    const data2 = await response2.json();
    console.log(data2);

    weatherData.data2 = data2;

    weatherData.currentTime = `${weatherData.year}-${weatherData.month + 1}-0${weatherData.date}T${weatherData.hour}:00`;
    weatherData.currentTemperature = data2.current.temperature_2m;
    const currentCityTempInfo = (element => element == weatherData.currentTime);
    weatherData.currentTimeArrayIndex = (data2.hourly.time.findIndex(currentCityTempInfo));

    // FEELS LIKE
    weatherData.apparentTemp = data2.current.apparent_temperature;
    // HUMIDITY
    weatherData.humidity = data2.current.relative_humidity_2m;
    // WIND
    weatherData.wind = data2.current.wind_speed_10m;
    // PRECIPITATION
    weatherData.precipitation = data2.current.precipitation;
}

// SANDBOX



