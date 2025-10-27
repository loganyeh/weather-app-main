
// DOMS VARIABLES


// VARIABLES






// EVENT LISTENERS






// API CALL
async function getWeather(){
    try{
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,wind_speed_10m&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code");
        const data = await response.json();
        console.log("-----getWeather API Call-----");
        console.log(data);  
    }
    catch(error){
        console.error(`Error: ${error}`);
    }

}

async function getName(location){
    try{
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`)
        const data = await response.json();
        console.log("-----getName() function-----")
        console.log(data);
    }
    catch(error){
        console.error(`Error: ${error}`);
    }

}

console.log("----- WORKING JS FILE -----");
// getWeather();
// getName();



