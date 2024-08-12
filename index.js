fetchNobelPrizes();


async function fetchNobelPrizes() {
    let response = await fetch(
        "https://api.nobelprize.org/2.1/nobelPrizes?_ga=2.245907908.1581705046.1723449076-997263134.1723449076");
    let data = await response.json();
    console.log(data.nobelPrizes[0].prizeAmount);
}

function togglePrizeMoney() {

}
function displayAdditionalInfo() {

}
function addToFavorites() {
    
}