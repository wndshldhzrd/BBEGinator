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

function createStatDiv (name, value) {
    const statDiv = document.createElement("div");
    statDiv.appendChild(createPar(name));
    statDiv.appendChild(createPar(value));
    return statDiv;
}

// Creates the monster stats
// Returns a div containing the monsters stats that can be immediately used
// in the monster display
function createStats (monster) {
    const statsDiv = document.createElement("div");
    statsDiv.setAttribute("id", "stats");

    // STR
    statsDiv.appendChild(createStatDiv("STR", monster.strPoints));
    // DEX
    statsDiv.appendChild(createStatDiv("DEX", monster.dexPoints));
    // CON
    statsDiv.appendChild(createStatDiv("CON", monster.conPoints));
    // INT
    statsDiv.appendChild(createStatDiv("INT", monster.intPoints));
    // WIS
    statsDiv.appendChild(createStatDiv("WIS", monster.wisPoints));
    // CHA
    statsDiv.appendChild(createStatDiv("CHA", monster.chaPoints));

    return statsDiv;
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
    if (/^\d+$/.test(maybeHP)) { // Checks if maybeHP is only digits
        showMonsterDiv.appendChild(createPar("Hit Points " + getHP(monster.size, maybeHP, constMod)));
    } else {
        showMonsterDiv.appendChild(createPar("Hit Points " + monster.hpText));
    }
    // Speed
}

//Function which takes in various parameters and then gets a json of all
//monsters that match that criteria
function searchMonster() {

    payload = {
        'hit_points__gte': document.getElementById("hpMax").value, //max hp
        'hit_points__lte': document.getElementById("hpMin").value, //min hp
        'armor_class__gte': document.getElementById("acMax").value, //max ac
        'armor_class__lte': document.getElementById("acMin").value, //min ac
        'type__iexact': document.getElementById("type-dropdown").value,  //creature type
        'size__iexact': document.getElementById("size-dropdown").value, //creature size
        'alignmnet': document.getElementById('alignmment-dropdown').value, //creature alignment
        'swim_speed_lte' : '', //min swimspeed
        'swim_speed_gte' : '', //max swimspeed
        'fly_speed_lte' : '', //min flyspeed
        'fly_speed_gte' : '', //max flyspeed
        'walk_speed_lte' : '', //min walkspeed
        'walk_speed_gte' : '', //max walkspeed
        'str_lte' : document.getElementById("strMin").value, //min str
        'str_gte' : document.getElementById("strMax").value, //max str
        'dex_lte' : document.getElementById("dexMin").value, //min dex
        'dex_gte' : document.getElementById("dexMax").value, //max dex
        'con_lte' : document.getElementById("conMin").value, //min con
        'con_gte' : document.getElementById("conMax").value, //max con
        'int_lte' : document.getElementById("intMin").value, //min int
        'int_gte' : document.getElementById("intMax").value, //max int
        'wis_lte' : document.getElementById("wisMin").value, //min wis
        'wis_gte' : document.getElementById("wisMax").value, //max wis
        'cha_lte' : document.getElementById("chaMin").value, //min cha
        'cha_gte' : document.getElementById("chaMax").value, //max cha
        //metric which creatures should be ordered by
        'sort_by': document.getElementById("Sort-dropdown").value + "-" 
        + document.getElementById("Sort-style").value
    }

    //testing to ensure that parameters are being passed correctly
    console.log(payload);

    const url = 'https://zevce.pythonanywhere.com/searchMonster/' + JSON.stringify(payload)
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })

}




/****************************
** TESTING STUFF GOES HERE **
****************************/

// Button that creates a monster (TEMP)
const createMonsterButton = document.querySelector("#create-monster");

//James this is terrible practice im going to kill you
createMonsterButton.addEventListener("click", () => {
    monsterSizeNum = document.querySelector("#size-dropdown").value;
    getMonster(monsterSizeNum)
});

