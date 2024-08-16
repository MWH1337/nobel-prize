window.addEventListener("load", function() {
    // Lägg till event listener för formuläret
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om
        manageSearch(); // Anropa din funktion för att hantera inmatad data
    });
 
    // Annan kod som behöver köras när sidan har laddats
});
getData();

// Denna funktion anropar först en funktion som hämtar hem data från API. 
// Därefter anropas en funktion som hämtar in sökning från användaren.
async function getData() {
    await fetchNobelPrizes();
    manageSearch();
}






// Denna funktion hämtar data från API och sparar därefter data i local Storage.
async function fetchNobelPrizes() {

    localStorage.clear();
    let response = await fetch(
        "https://api.nobelprize.org/2.1/nobelPrizes?_ga=2.245907908.1581705046.1723449076-997263134.1723449076");
        
    let data = await response.json();
    
    
    let nobelInfoList = [];
    localStorage.setItem("nobelInfoList", JSON.stringify(data));
    
    
    setPrizeInfoDynamic();
}
// läser in input från formuläret och anropar showCard för att visa önskade cards.
async function manageSearch () {
    let wholeName = await document.getElementById('wholeName').value.trim();
    let year = await document.getElementById('year').value.trim();
    let category = await document.querySelector('input[name="radioName"]:checked')?.value;
    
    let NobelList = setPrizeInfoDynamic();
    
    
    
    try {


        // Loopa genom listan NobelList. Om inmatat namn matchar skapas motsvarande kort och visas på hemsidan
        NobelList.forEach((n) => {
            try {
                
                if (wholeName == n.laurates[0].knownName.en) {
                    console.log("Name found!!");
                    ShowOneCard(n);
                }
                else if (year == n.awardYear) {
                    console.log("Year found!");
                    // Det finns 5 priser prt år.Anropet görs totalt 5 gånger. 
                    ShowOneCard(n);
                    }
                else if (category == n.category.en) {
                    console.log("Category found!");
                    // Görs för alla priser av vald kategori, totalt 5 gångner
                    ShowOneCard(n);
                }
                    
                }

                
            
            catch {
                console.log("error, name not found in data");
            }
        });
       
    }
    catch(error) {
        console.log(` Error in search. Try again`);
    }
    
}

// Denna funktion ska skapa korten dynamiskt och placera på hemsidan. Fungerar inte för stunden.
function showOneCard (parameter) {
    // parameter: is all data for one prize
    
    let cardCollectionEl = document.querySelector('.cardCollection');
    cardCollectionEl.innerHTML = '';
    
    try {
        let nobelCardEl = document.createElement('article');
        nobelCardEl.innerHTML = `
        <p>${parameter.category.en}</p>
        <p>${parameter.awardYear}</p>
        <p>${parameter.laureates[0].knownName.en}</p>
        `;

    }
    catch {
        console.log("error, wrong format in data");
    }
    
    
        cardCollectionEl.appendChild(nobelCardEl);
        

}




// Denna funktion ska skapa en array med kort som innehåller data om 
// Namn, årtal och priskategori för alla priser i local Storage.
function setPrizeInfoDynamic() {
    
    let prizeRef = document.querySelectorAll('.single-card');
    let myNobelList = JSON.parse(localStorage.getItem("nobelInfoList")).nobelPrizes;
    let cardCollectionEl = document.querySelector('.cardCollection');
    try {

        myNobelList.forEach((n) => {
    
            console.log(n);
            let nobelCardEl = document.createElement('article');
            console.log(n.laureates[0].knownName.en);
    
    
            nobelCardEl.innerHTML = `
            <p>${n.category.en}</p>
            <p>${n.awardYear}</p>
            <p>${n.laureates[0].knownName.en}</p>
            
            `;
            
            cardCollectionEl.appendChild(nobelCardEl);
    });

    
    
    
    }
    catch {
        console.log("wrong format in data");
    }

    
    
    return myNobelList; 
}





/* Dessa funktioner har ej hunnit implementerats

function togglePrizeMoney() {

}
function displayAdditionalInfo() {

}
function addToFavorites() {

}
*/