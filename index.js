
// DOMS VARIABLES 
const inputBar = document.getElementById("input-bar");
const searchButton = document.getElementById("search-button");

// VARIABLES 
// const cityName = "";


// EVENT LISTENERS
searchButton.addEventListener("click", () => {
    const cityName = inputBar.value;
    console.log(`The city is ${cityName}`);
    
    clearInputBar();
});


// CALLS

// FUNCTIONS
function clearInputBar(){
    inputBar.value = "";
};


// ASYNCS


// SANDBOX
console.log("JS WORKING");
console.log("------------------");






