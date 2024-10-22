// Easier way to create a paragraph when loading moster
function getElement (type, text) {
    const newEle = document.createElement(type);
    newEle.textContent = text;
    return newEle;
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
<<<<<<< HEAD
=======

    //create statblock variable
    const statBlock = document.createElement("stat-block");

    //creature-heading
    const creatureHeading = document.createElement("creature-heading");
    const name = createElement("h1", monster.name);
    const sizeType = createElement("h2", `{$monster.size} {$monster.type}, {$monster.alignment}`);
    creatureHeading.appendChild(name);
    creatureHeading.appendChild(sizeType);

    //top-stats
    const topStats = document.createElement("top-stats");

    //ac
    const propLine = document.createElement("property-line");
    const acHeader = createElement("h4", "Armor Class");
    let acDesc = `{$monster.armor_class}`;
    if (monster.armor_desc != null) {
        acDesc += `( {$monster.armor_desc})`;
    }
    const ac = createElement("p", acDesc);
    propLine.appendChild(acHeader);
    propLine.appendChild(ac);
    topStats.appendChild(propLine);

    //hp
    const propLine2 = document.createElement("property-line");
    const hpHeader = createElement("h4", "Hit Points");
    const hp = createElement("p", `{$monster.hit_points} ({$monster.hit_dice})`);
    propLine2.appendChild(hpHeader);
    propLine2.appendChild(hp);
    topStats.appendChild(propLine2);

    //speed
    const propLine3 = document.createElement("property-line");
    const speedHeader = createElement("h4", "Speed");
    const speedDesc = `{$monster.speed["walk"]} ft.`;
    const speed = createElement("p", speedDesc);
    propLine3.appendChild(speedHeader);
    propLine3.appendChild(speed);
    topStats.appendChild(propLine3);

    //abilities-block
    const abilitiesBlock = document.createElement(`abliities-block data-cha="{$monster.charisma}" data-con="{$monster.constitution}" data-dex="{$monster.dexterity}" data-int="{$monster.intelligence}" data-wis="{$monster.wisdom}"`)
    topStats.appendChild(abilitiesBlock);

    //damage immunities

    statBlock.appendChild(creatureHeading);
    statBlock.appendChild(topStats);


    // Div where we will display monsters
>>>>>>> 3469e0ccded24e6ae90e92240668e825ac8e7574
    const showMonsterDiv = document.querySelector(".monster-display");

    // Resetting Div (Temp for now)
    showMonsterDiv.innerHTML = "";

    // Adding name to first line
    showMonsterDiv.appendChild(getElement("p", monster.name));
}

//eventually move api calls into their own file??

//Function which takes in various parameters and then gets a json of all
//monsters that match that criteria
function searchMonster() {

    //building the json
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

//Function which takes in a list of up to 10 players and gets a list of recommended monsters
//for them to fight
function getRecommendedMonster() {

    //initializing our JSON
    payload = {}
    
    //getting our list of players
    playerList = document.getElementsByClassName("playerInput");

    //looping through each player and getting the values
    for(let i = 0; i < playerList.length; i++) {

        //ignore the ugly grabbing this was the easiest solution I could think of
        playerData = playerList[i];
        playerClass = playerData.getElementsByClassName("dropdown")[0].value
        playerLevel = playerData.getElementsByClassName("stat-Input")[0].value
        playerHealth = playerData.getElementsByClassName("stat-Input")[1].value
        
        //ensuring all our data is valid, will need to update html page eventually to
        //tell players which fields still need to be filled out
        if(playerClass == "" || playerLevel == "" || playerHealth == "") {
            console.error("ERROR ERROR INCOMPLETE INPUT DATA");
            return;
        }
        
        //adding values to our payload
        payload["p" + i] = {
            "class" : playerClass,
            "level" : playerLevel,
            "health" : playerHealth,
        }
    }

    //adding a terminating player so backend knows when to stop parsing players
    payload["p" + playerList.length] = "0"


    //testing to ensure that parameters are being passed correctly
    console.log(payload);

    //making our api call
    const url = 'https://zevce.pythonanywhere.com/getRecommendation/' + JSON.stringify(payload)
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


async function fetchMonster(monsterName) {
    // Currently local only, need to change this for backend fetch calls when set up
    const response = await fetch(`data/${monsterName}.json `)
    .then (response => response.json())
    .then (monster => loadMonster(monster));
}

//James this is terrible practice im going to kill you
createMonsterButton.addEventListener("click", () => {
    fetchMonster("goat");
})

