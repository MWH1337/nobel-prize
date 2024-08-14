/*window.addEventListener("load", async () => {
    let key = fetchPlanetsApiKey();
    let planetList = await fetchPlanets(key);
    storePlanets(planetList);

    changePageHeader();

    choosePlanet();
    let selectedPlanetId = localStorage.getItem("selectedPlanetId");
    let selectedPlanet = getStoredPlanetData(selectedPlanetId);

    createPlanetInfo(selectedPlanet);

    submitPlanetToFavorites(selectedPlanet);
    displayFavorites();

    // localStorage.clear();
});

*/


// Display data in local storage
/*
function storePlanets(planetList) {
    localStorage.setItem("planetList", JSON.stringify(planetList));
};
*/
/*
function choosePlanet() {
    let planetNamesList = document.querySelectorAll(".planet");
    planetNamesList.forEach((planet, i) => {
        planet.addEventListener("click", () => {
            localStorage.setItem("selectedPlanetId", i);
            window.open("planet.html", "_self");
        });
    });
};
*/
fetchNobelPrizes();



async function fetchNobelPrizes() {
    localStorage.clear();
    let response = await fetch(
        "https://api.nobelprize.org/2.1/nobelPrizes?_ga=2.245907908.1581705046.1723449076-997263134.1723449076");
    let data = await response.json();
    //console.log(data.nobelPrizes[0].category.en);
    let nobelInfoList = [];
    localStorage.setItem("nobelInfoList", JSON.stringify(data));
    setPrizeInfo();
}
// Sparar info från localstorage i valt Card. All data uppdateras OK
function setPrizeInfo () {
    let prizeRef = document.querySelector('.single-card-1');
    let myNobelList = JSON.parse(localStorage.getItem("nobelInfoList"));
    
    console.log(myNobelList.nobelPrizes[0].category.en);
    prizeRef.children[0].textContent=myNobelList.nobelPrizes[0].category.en;
    prizeRef.children[1].textContent=myNobelList.nobelPrizes[0].awardYear;
    prizeRef.children[2].textContent=myNobelList.nobelPrizes[0].laureates[0].fullName.en;
    

}

/*  Kolla upp imorgon onsdag
function setPrizeInfoDynamic() {
    let prizeRef = document.querySelectorAll('.single-card');
    let myNobelList = JSON.parse(localStorage.getItem("nobelInfoList"));
    prizeRef.forEach(singleCard) => {
        prizeRef.children[0].textContent=myNobelList.nobelPrizes[0].category.en;
        prizeRef.children[1].textContent=myNobelList.nobelPrizes[0].awardYear;
        prizeRef.children[2].textContent=myNobelList.nobelPrizes[0].laureates[0].fullName.en;

    } 

}
    
*/   






function togglePrizeMoney() {

}
function displayAdditionalInfo() {

}
function addToFavorites() {
    
}