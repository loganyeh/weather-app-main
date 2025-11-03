
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");
const cityText = document.getElementById("city-text");
const dateText = document.getElementById("date-text");

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
    const now = new Date();
    let day = now.getDay();
    let month = now.getMonth();
    let date = now.getDate();
    let year = now.getFullYear();

    // DATE
    // -----DAY-----
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
        case 0: 
            month = "Jan";
            break;
        case 1: 
            month = "Feb";
            break;
        case 2: 
            month = "Mar";
            break;
        case 3: 
            month = "Apr";
            break;
        case 4: 
            month = "May";
            break;
        case 5: 
            month = "Jun";
            break;
        case 6: 
            month = "Jul";
            break;
        case 7: 
            month = "Aug";
            break;
        case 8: 
            month = "Sep";
            break;
        case 9: 
            month = "Oct";
            break;
        case 10: 
            month = "Nov";
            break;
        case 11: 
            month = "Dec";
            break;
    }

    dateText.innerHTML = `
        ${day}. ${month} ${date}, ${year}
    `
}

// CALLS 
updateDate();

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






