
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");
const cityText = document.getElementById("city-text");

// GLOBAL VARIABLES 
let weatherData = {};

// EVENT LISTENERS
searchButton.addEventListener("click", async () => {
    const cityName = inputBar.value;

    await getWeatherInfo(cityName);
    updateCityName();
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

}

// ASYNCS
async function getWeatherInfo(city){
    // GEOCODING API URL
    console.log(`Welcome to ${city}`);
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
    // console.log(data2);

    // WORK ON THE TIME STUFF HERE WHERE TO RETIEVE TIME AND MANIPULATE IT STUFF IDK
    
}

// SANDBOX
const now = new Date();

let day = now.getDay();
// let day = 1;
const month = now.getMonth();
const date = now.getDate();
const year = now.getFullYear();


// -----DAY-----
console.log(day);
console.log(`Before Switch: ${day}`);
switch(day){
    case 0: 
        day = "Sunday";
        break;
    case 1: 
        day = "Monday";
        break;
    case 2: 
        day = "Tuesday";
        break;
    case 3: 
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5: 
        day = "Friday";
        break;
    case 6: 
        day = "Saturday";
        break;
    default: 
        console.log("Not a valid day of the week");
}

// ----- MONTH -----
switch(month){
    case 
}




console.log(`After Switch: ${day}`);
console.log(`${day}. ${month} ${date}, ${year}`);




