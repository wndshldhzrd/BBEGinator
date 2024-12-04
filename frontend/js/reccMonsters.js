import { loadJSONMonster } from "./loadMonster.js";

//variable which keeps track of how many players the page is currently displaying
let players = [];

const recMsg = document.getElementById('RecMsg');
const difficultyOption = document.getElementById("difficulty");

//function for adding a player to the recommendMonster page
function addPlayer() {

    //getting the div which players are added to
    var playerStatBlockDisplay = document.getElementById("playerStatBlocks");

    //creating our player stat block to be added to the page
    var playerStatBlock = document.createElement("div");

    //adding our player element to the list of player elements
    players.push(playerStatBlock)

    //setting the inner html of the player statblock
    //ideally refactor into an html template page, but good enough for now
    playerStatBlock.innerHTML =
    `<div class="playerInput">
        <button class="playerName">Player ${players.length}</button>
        <div class = "playerContent">
            Class <select class="dropdown">
                <option disabled="" selected="" value=""></option> 
                <option value="barbarian">Barbarian</option>      
                <option value="bard">Bard</option>
                <option value="cleric">Cleric</option>
                <option value="druid">Druid</option>
                <option value="fighter">Fighter</option>
                <option value="monk">Monk</option>
                <option value="paladin">Paladin</option>
                <option value="ranger">Ranger</option>
                <option value="rogue">Rogue</option>
                <option value="sorcerer">Sorcerer</option>
                <option value="wizard">Wizard</option>
                <option value="warlock">Warlock</option>
            </select>
            <br>
            Level <input class="stat-Input" type="number" min="1" value="1" max = "20">
            <br>
            Hp <input class="stat-Input" id="playerHealth" type="number" min="1" value="1">
            <br><br>
            Stats: <br> Str: <input class="stat-Input" id="str" type="number" min="1" value="10"></input>
            Dex: <input class="stat-Input" id="dex" type="number" min="1" value="10"></input>
            Con: <input class="stat-Input" id="con" type="number" min="1" value="10"></input>
            Int: <input class="stat-Input" id="int" type="number" min="1" value="10"></input>
            Wis: <input class="stat-Input" id="wis" type="number" min="1" value="10"></input>
            Cha: <input class="stat-Input" id="cha" type="number" min="1" value="10"></input>
                    
        </div>
    </div>`;

    //displaying our player on the page
    playerStatBlockDisplay.appendChild(playerStatBlock);

    toggleRemovePlayerButton();
    var coll = document.getElementsByClassName("playerName");

    for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
}

function removePlayer() {

    //grabbing all of our player stat blocks
    var playerStatBlocks = document.getElementsByClassName("playerInput");

    //removing the last one
    playerStatBlocks[players.length-1].remove();

    //removing the player element from our array
    players.pop();

    toggleRemovePlayerButton();
    
}

//determining whether to hide/show our remove player button
function toggleRemovePlayerButton() {
    if (players.length > 1) {
        document.getElementById("removePlayer").style.display= "inline-block";
    }
    else {
        document.getElementById("removePlayer").style.display= "none";
    }
}


//Function which takes in all the currently inputted player data sends
//it as an api call to our back end and then displays a recommended monster
//based off of the stats of the party
async function getRecommendedMonster() {
    recMsg.innerHTML = "";

    const diff = difficultyOption.value;
    console.log("Difficulty");
    console.log(diff);
    if (diff == null || diff == "") {
        recMsg.innerHTML += "Please select a difficulty<br><br>";
        return;
    }

    const monCount = document.getElementById("monCount").value;

    let bossFight = null;
    if (document.getElementById("bossOpt").checked) {
        bossFight = "boss";
    }
    else {
        bossFight = "balanced";
    }
    console.log(bossFight);
    
    let payload = [];
    //looping through each player and getting the values
    for(let i = 0; i < players.length; i++) {

        //ignore the ugly grabbing this was the easiest solution I could think of
        let playerData = players[i];
        let playerClass = playerData.getElementsByClassName("dropdown")[0].value
        let playerLevel = playerData.getElementsByClassName("stat-Input")[0].value
        let playerHealth = playerData.getElementsByClassName("stat-Input")[1].value
        
        //ensuring all our data is valid, will need to update html page eventually to
        //tell players which fields still need to be filled out
        if(playerClass == "" || playerLevel == "" || playerHealth == "") {
            recMsg.innerHTML += "Incomplete data provided--please make sure all players have a selected class, HP, and level.";
            console.error("ERROR ERROR INCOMPLETE INPUT DATA");
            return;
        }
        
        //adding values to our payload
        payload.push ({
            "class" : playerClass,
            "level" : playerLevel,
            "health" : playerHealth,
        });
    }

    if(players.length < 1) {
        console.error("ERROR ERROR INCOMPLETE INPUT DATA");
        return;
    }

    recMsg.innerHTML = "Getting monster recommendations...";

    //no need for this anymore I think
    //adding a terminating player so backend knows when to stop parsing players
    //payload["p" + players.length] = "0";

    //testing to ensure that parameters are being passed correctly
    console.log(payload);

    //making our api call
    const url = "https://zevce.pythonanywhere.com/getRecommendation";
    //const url = "http://localhost:5000/getRecommendation";
    console.log(url);

    let data = {"party": payload, "diff": diff, "count": monCount, "isBoss": bossFight};

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status == 200) {
            const results = await response.json();
            console.log("success!");
            console.log(results);

            recMsg.innerHTML = "Monsters";
            if (results.length != parseInt(monCount)) {
                recMsg.innerHTML = "No results found for this search :(<br>" +
                "We are working on increasing the flexibility of our algorithm, but for now you can try the following to get results:<br>" +
                "1) Changing the number of monsters in the encounter<br>" +
                "2) Changing the encounter difficulty<br>" +
                "3) Check/unchecking the boss fight option";
                return;
            }

            let ctr = 1;
            for (let mon of results) {
                recMsg.innerHTML += `<br>${ctr}) ${mon.name}`;
                ctr++;
                loadJSONMonster(mon);
            }
        }
        else {
            recMsg.innerHTML = "An error occurred. Make sure you filled in all search parameters (i.e. difficulty, player classes) and try again.";
            console.log("response.status error: " + response.status);
        }
    }
    catch (error) {
        console.error("ERROR! ", error);
    }
}

window.addEventListener("load", addPlayer());


// Testing as it's not hooked up
/*const createMonsterButton = document.querySelector("#create");
createMonsterButton.addEventListener("click", () => {
    const monsterDisplay = document.querySelector('#monster-display');
    monsterDisplay.innerHTML = "";
    monsters = [];
    addMonster("goat");
    addMonster("goat");
});*/

//make module functions globally accessible (createEncounter.html can access)
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;
window.toggleRemovePlayerButton = toggleRemovePlayerButton;
window.getRecommendedMonster = getRecommendedMonster;
