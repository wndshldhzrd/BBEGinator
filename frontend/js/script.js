// Easier way to create a paragraph when loading moster
function createPar (text) {
    const par = document.createElement("p");
    par.textContent = text;
    return par;
}

// Calculates the modifier of a stat
function getModifier (score) {
    return Math.floor((score - 10) / 2);
}

// Returns the average HP of a monster using the formula
// HP = Floor(<Size Modifier> * <Number of dice>) + modifier
function getHP (monsterSize, numDice, constMod) {
    switch (monsterSize) {
        case "tiny":
            return `${Math.floor(2.5 * numDice) + constMod} (${numDice}d4)`;
        case "small":
            return `${Math.floor(3.5 * numDice) + constMod} (${numDice}d6)`;
        case "medium":
            return `${Math.floor(4.5 * numDice) + constMod} (${numDice}d8)`;
        case "large":
            return `${Math.floor(5.5 * numDice) + constMod} (${numDice}d10)`;
        case "huge":
            return `${Math.floor(6.5 * numDice) + constMod} (${numDice}d12)`;
        case "gargantuan":
            return `${Math.floor(10.5 * numDice) + constMod} (${numDice}d20)`;
        default:
            return `Error`;
    }
}

// Creates a div containing moster information and adds it to the monster display div
function loadMonster (monster) {
    // Div where we will display monsters
    const showMonsterDiv = document.querySelector(".monster-display");

    // Monster background information
    const monsterBackground = new Image();
    monsterBackground.src = "./img/MonsterBackground.png";
    showMonsterDiv.style.backgroundImage = 'url("./img/MonsterBackground.png")';
    showMonsterDiv.style.maxWidth = monsterBackground.width + "px";

    // Resetting Div (Temp for now)
    showMonsterDiv.innerHTML = "";

    // Adding name to first line
    showMonsterDiv.appendChild(createPar(monster.name));
    // Adding size, type, and alignment
    showMonsterDiv.appendChild(createPar(monster.size + " " + monster.type + ", " + monster.alignment));
    // Line break
    showMonsterDiv.appendChild(document.createElement("hr"));
    // Adding Armor class
    showMonsterDiv.appendChild(createPar("Armor Class " + monster.otherArmorDesc));
    // Calculating and adding Hit Points
    const maybeHP = monster.hpText;
    const constMod = getModifier(monster.conPoints);
    if (/^\d+$/.test(maybeHP)) {
        showMonsterDiv.appendChild(createPar("Hit Points " + getHP(monster.size, maybeHP, constMod)));
    } else {
        showMonsterDiv.appendChild(createPar("Hit Points " + monster.hpText));
    }
    // Speed
}

// function for grabbing monsters from the website based on various search criteria
// currently the only paramter we have is the size of the monster
// TODO: Catch invalid json/timeouts so we don't have errors on loadMonster
function getMonster(monsterSizeNum) {
    const url = 'https://zevce.pythonanywhere.com/getMonster/' + monsterSizeNum
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

//testing sending data to our flask server
//will eventually send a json which contains info about all players in the party
//any html file that uses this method will need to have
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
//above its script.js source
function sendData() {
    /*
    $.ajax({
        type: 'POST',
        //contentType: 'application/json',
        data: {"hello" : "world"},
        dataType: 'json',
        url: 'https://zevce.pythonanywhere.com/testRoute',
        success: function (e) {
            console.log(e);
        },
        error: function(error) {
            console.log(error);
        }
   });
   */

   $.post("https://zevce.pythonanywhere.com/testRoute",
    {
      hello: "world",
    },
    function(e){
      console.log(e);
    });

}


/****************************
** TESTING STUFF GOES HERE **
****************************/

// Button that creates a monster (TEMP)
const createMonsterButton = document.querySelector("#create-monster");

//James this is terrible practice im going to kill you
createMonsterButton.addEventListener("click", () => {
    fetchMonster("goat");
});

async function fetchMonster(monsterName) {
    // Currently local only, need to change this for backend fetch calls when set up
    const response = await fetch(`data/${monsterName}.monster`)
    .then (response => response.json())
    .then (monster => loadMonster(monster));
}