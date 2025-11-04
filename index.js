
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

// CALLS 
updateDate();

// ASYNCS
async function getWeatherInfo(city){
    // GEOCODING API URL
    console.log(`Welcome to ${city}`);
    let temp = 0;

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
        const data = await response.json();
        // console.log(data);

        weatherData.cityName = data.results[0].name;
        weatherData.cityState = data.results[0].admin1;
        weatherData.latitude = data.results[0].latitude;
        weatherData.longitude = data.results[0].longitude;

    }
    catch(error){
        console.error(`Error in getCityName(): ${error}`);
    }

    // WEATHER FORECAST API
    const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${weatherData.latitude}&longitude=${weatherData.longitude}&hourly=temperature_2m&current=temperature_2m&temperature_unit=fahrenheit`);
    const data2 = await response2.json();
    console.log(data2);

    weatherData.currentTemperature = data2.current.temperature_2m;

    let timeFormatVariableFind = `${weatherData.year}-${weatherData.monthForTemp}-0${weatherData.date}T${weatherData.hour}:00`;
    const currentCityTempInfo = (element => element == timeFormatVariableFind);
    let currentTimeIndexForWeather = (data2.hourly.time.findIndex(currentCityTempInfo));
    console.log(data2.hourly.temperature_2m[currentTimeIndexForWeather]);
    
}

// SANDBOX



