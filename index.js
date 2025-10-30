
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");
const cityText = document.getElementById("city-text");

// GLOBAL VARIABLES 
let weatherData = {};

// EVENT LISTENERS
searchButton.addEventListener("click", async () => {
    const cityName = inputBar.value;

    if(inputBar.value == ""){
        // window.alert(`Enter a City.`);
        console.log("Enter a city");
    } 
    // else if () MAYBE ADD THING FOR IF THERE IS A NUMBER
    else {

        getWeatherInfo(cityName);
        // console.log(`weatherData.cityName: ${weatherData.cityName}`); WORKING NOW
        console.log(`First if statement call ${cityName}`);
    }

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

}

// SANDBOX



