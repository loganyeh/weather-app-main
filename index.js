
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");

// VARIABLES 
// const cityName = "";


// EVENT LISTENERS
searchButton.addEventListener("click", () => {

    const cityName = inputBar.value;
    const cleanedCityName = cityName.trimStart();
    const capitalizedCityName = capitalizeFirstLetter(cleanedCityName);


    if(inputBar.value == ""){
        // window.alert(`Enter a City.`);
        console.log("Enter a city");
    } 
    // else if () MAYBE ADD THING FOR IF THERE IS A NUMBER
    else {
        //  CHECK IF CITY IS VALID 
        

        console.log(`${capitalizedCityName}`);
    }

    getCityName(capitalizedCityName);
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
    // GEOCODING API URL
async function getCityName(city){

    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
        const data = await response.json();
    
        console.log("-----");
        console.log(data);
    }
    catch(error){
        console.error(`Error in getCityName(): ${error}`);
    }

}



// SANDBOX
console.log(".....JS WORKING")




