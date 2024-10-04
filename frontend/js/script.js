// Button that creates a monster (TEMP)
const createMonsterButton = document.querySelector("#create-monster");

function createPar (text) {
    const par = document.createElement("p");
    par.textContent = text;
    return par;
}

function getModifier (score) {
    console.log(`${Math.floor((score - 10) / 2)}`);
    return Math.floor((score - 10) / 2);
}

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

function loadMonster (monster) {
    // Div where we will display monsters
    const showMonsterDiv = document.querySelector(".monster-display");
    showMonsterDiv.innerHTML = "";

    // Adding name to first line
    showMonsterDiv.appendChild(createPar(monster.name));
    // Adding size, type, and alignment
    showMonsterDiv.appendChild(createPar(monster.size + " " + monster.type + ", " + monster.alignment));
    // Line break
    showMonsterDiv.appendChild(document.createElement("hr"));
    // Armor class
    showMonsterDiv.appendChild(createPar("Armor Class " + monster.otherArmorDesc));
    // Hit Points
    const maybeHP = monster.hpText;
    const constMod = getModifier(monster.conPoints);
    if (/^\d+$/.test(maybeHP)) {
        showMonsterDiv.appendChild(createPar("Hit Points " + getHP(monster.size, maybeHP, constMod)));
    } else {
        showMonsterDiv.appendChild(createPar("Hit Points " + monster.hpText));
    }
    // Speed
}


//James this is terrible practice im going to kill you
createMonsterButton.addEventListener("click", () => {
    monsterSizeNum = document.querySelector("#size-dropdown").value;
    getMonster(monsterSizeNum)
})

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


