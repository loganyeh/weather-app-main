
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");

// VARIABLES 
let weatherData = {};

// EVENT LISTENERS
searchButton.addEventListener("click", () => {

    const cityName = inputBar.value;
    // const cleanedCityName = cityName.trimStart();
    // const capitalizedCityName = capitalizeFirstLetter(cleanedCityName);


    if(inputBar.value == ""){
        // window.alert(`Enter a City.`);
        console.log("Enter a city");
    } 
    // else if () MAYBE ADD THING FOR IF THERE IS A NUMBER
    else {

        console.log(`First if statement call ${cityName}`);
    }

    getWeatherInfo(cityName);
    clearInputBar();

});

// CALLS

// FUNCTIONS
function clearInputBar(){
    inputBar.value = "";
};

function capitalizeFirstLetter(word){
    const lowercasedString = word.toLowerCase();
    return lowercasedString.charAt(0).toUpperCase() + lowercasedString.slice(1);
}

// ASYNCS
async function getWeatherInfo(city){
    
    // GEOCODING API URL
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
        const data = await response.json();
        console.log(data);

        weatherData.cityName = data.results[0].name;
        weatherData.cityState = data.results[0].admin1;
        weatherData.latitude = data.results[0].latitude;
        weatherData.longitude = data.results[0].longitude;

    }
    catch(error){
        console.error(`Error in getCityName(): ${error}`);
    }

    // WEATHER FORECAST API
    const response2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${weatherData.latitude}&longitude=${weatherData.longitude}&hourly=temperature_2m`);
    const data2 = await response2.json();

    console.log(data2);

}

// SANDBOX
console.log(".....JS WORKING")
// getWeatherInfo('Tokyo');




