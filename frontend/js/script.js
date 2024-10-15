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
        'hit_points__gte': '', //number u want hp to be greater than or equal to
        'hit_points__lte': '', //number u want hp to be less than or equal to
        'armor_class__gte': '', //number u want ac to be greater than or equal to
        'armor_class__lte': '', //number u want ac to be less than or equal to
        'type__iexact': '', //creature type
        'size__iexact': '', //exact size
        'alignmnet': '',
        'swim_speed_lte' : '',
        'swim_speed_gte' : '',
        'fly_speed_lte' : '',
        'fly_speed_gte' : '',
        'walk_speed_lte' : '',
        'walk_speed_gte' : '',
        'str_lte' : '',
        'str_gte' : '',
        'dex_lte' : '',
        'dex_gte' : '',
        'con_lte' : '',
        'con_gte' : '',
        'int_lte' : '',
        'int_gte' : '',
        'wis_lte' : '',
        'wis_gte' : '',
        'cha_lte' : '',
        'cha_gte' : '',
        'filter_by': ''
    }

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

