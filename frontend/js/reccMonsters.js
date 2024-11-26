//variable which keeps track of how many players the page is currently displaying
let players = [];
let monsters = [];


function addMonster() {
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
            Level <input class="stat-Input" type="number" min="1" value="1">
            <br>
            Hp <input class="stat-Input" id="playerHealth" type="number" min="1" value="1">
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
function getRecommendedMonster() {

    //initializing our JSON
    payload = {}

    //looping through each player and getting the values
    for(let i = 0; i < players.length; i++) {

        //ignore the ugly grabbing this was the easiest solution I could think of
        playerData = players[i];
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

    if(players.length < 1) {
        console.error("ERROR ERROR INCOMPLETE INPUT DATA");
        return;
    }

    //adding a terminating player so backend knows when to stop parsing players
    payload["p" + players.length] = "0";


    //testing to ensure that parameters are being passed correctly
    console.log(payload);

    //making our api call
    const url = 'https://zevce.pythonanywhere.com/getRecommendation/' + JSON.stringify(payload)
    console.log(url);
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}