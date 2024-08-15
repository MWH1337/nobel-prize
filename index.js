window.addEventListener("load", function() {
    // Lägg till event listener för formuläret
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Förhindra att formuläret skickas och sidan laddas om
        manageSearch(); // Anropa din funktion för att hantera inmatad data
    });
 
    // Annan kod som behöver köras när sidan har laddats
});
console.log(" 1 före FetchNobelPrizes");
fetchNobelPrizes();
console.log(" 2 Före managageSaerch");
manageSearch();



async function fetchNobelPrizes() {
    console.log("3 Före tömning av localStorage");
    localStorage.clear();
    let response = await fetch(
        "https://api.nobelprize.org/2.1/nobelPrizes?_ga=2.245907908.1581705046.1723449076-997263134.1723449076");
    let data = await response.json();
    console.log("4 Efter hämtning av data från API ");
    //console.log(data.nobelPrizes[0].category.en);
    let nobelInfoList = [];
    localStorage.setItem("nobelInfoList", JSON.stringify(data));
    // setPrizeInfo();
    console.log("5 Efter sparande på localStorage");
    setPrizeInfoDynamic();
}
// läser in input från formuläret och anropar showCard för att visa önskade cards.
async function manageSearch () {
    let wholeName = document.getElementById('wholeName').value.trim();
    let year = document.getElementById('year').value.trim();
    let category = document.querySelector('input[name="category"]:checked')?.value;
    console.log("6 Efter inläsning av search parametrar från formuläret");
    let NobelList = setPrizeInfoDynamic();
    console.log("7. Efter skapande av NobelList");
    

    
    try {
        //console.log(NobelList);

        //console.log(lname);
        // Rensa alla kort från hemsidan


        // Loopa genom listan NobelList. Om inmatat namn matchar skapas motsvarande kort och visas på hemsidan
        NobelList.forEach((n) => {
            try {
                console.log("8. Före test om search name matchar");
                if (wholeName == n.laurates[0].knownName.en) {
                    console.log("Name found!!");
                    ShowOneCard(n);
                }
                else if (year == n.awardYear) {
                    console.log("Year found!");
                    // Det finns 5 priser prt år.Anropet görs totalt 5 gånger. 
                    ShowCard(n);
                    }
                else if (category == n.category.en) {
                    console.log("Category found!");
                    // Görs för alla priser av vald kategori, totalt 5 gångner
                    ShowCard(n);
                }
                    
                }

                
            
            catch {
                console.log("9. error, name not found in data");
            }
        });
       
    }
    catch(error) {
        console.log(`10. Error 1 in search. Try again`);
    }
    
}

function ShowCard(searchParameter) {
    let NobelList = setPriceInfoDynamic();
    console.log("11. före for Each anropet");

    // rensa listan 
    let cardCollectionEl = document.querySelector('.cardCollection');
    cardCollectionEl.innerHTML = '';
    console.log("12.före genomlöpning av NobelList");

    NobelList.forEach((n) => {
        try {
            let knownName = n.laurates[0].knownName.en;
            let awardYear = n.awardYear;
            let category = n.category.en;
            if (searchParameter === knownName || searchParameter == awardYear || searchParameter === category.en) {
                console.log("13. Före kortet visas");
                showOneCard(n); // Visa kortet
            }


        } catch (error) {
            console.log('14. error in search', error)
        }
        
    })
}

function showOneCard (parameter) {
    // parameter: is all data for one prize
    console.log("15. Före skapandet av card coll.");
    let cardCollectionEl = document.querySelector('.cardCollection');
    console.log("16. Före skapandet av article");
    let nobelCardEl = document.createElement('article');
        nobelCardEl.innerHTML = `
        <p>${parameter.category.en}</p>
        <p>${parameter.awardYear}</p>
        <p>${parameter.laureates[0].knownName.en}</p>
        `;
    
        cardCollectionEl.appendChild(nobelCardEl);
        console.log("17. Före utskrift av cardCollEl");
        console.log(cardCollectionEl);

}





function setPrizeInfoDynamic() {
    console.log("18. Före dekl av prizeRef")
    let prizeRef = document.querySelectorAll('.single-card');
    let myNobelList = JSON.parse(localStorage.getItem("nobelInfoList")).nobelPrizes;
    //console.log(myNobelList);
    let cardCollectionEl = document.querySelector('.cardCollection');
    console.log("19.Före for each i SetPrizeInfoDyn");
    myNobelList.forEach((n) => {
    
        //console.log(n);
        let nobelCardEl = document.createElement('article');

        nobelCardEl.innerHTML = `
        <p>${n.category.en}</p>
        <p>${n.awardYear}</p>
        <p>${n.laureates[0].knownName.en}</p>
        
        `;
        
        cardCollectionEl.appendChild(nobelCardEl);
    
    });
    console.log("20. Efter forEeach i SetPrizeInfoDyn");
    //return myNobelList; // ny rad onsdag 
}







function togglePrizeMoney() {

}
function displayAdditionalInfo() {

}
function addToFavorites() {

}