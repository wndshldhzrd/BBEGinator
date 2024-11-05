//variable which keeps track of how many players the page is currently displaying
var monsters = [];

//function for adding a player to the recommendMonster page
function addMonster() {

    //getting the div which players are added to
    var monsterStatBlockDisplay = document.getElementById("monsterStatBlocks");

    //creating our player stat block to be added to the page
    var monsterStatBlock = document.createElement("div");

    //adding our player element to the list of player elements
    monsters.push(monsterStatBlock)

    //setting the inner html of the player statblock
    //ideally refactor into an html template page, but good enough for now
    monsterStatBlock.innerHTML =
    `<div class="playerInput">
        <label class="playerName">Player ${players.length}</label><br>
        <hr>
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
    </div>`;

    //displaying our player on the page
    monsterStatBlockDisplay.appendChild(monsterStatBlock);

    toggleRemoveMonsterButton();
}

function removePlayer() {

    //grabbing all of our player stat blocks
    var monsterStatBlocks = document.getElementsByClassName("monsterInput");

    //removing the last one
    monsterStatBlocks[monsters.length-1].remove();

    //removing the player element from our array
    monsters.pop();

    toggleRemoveMonsterButton();
}

//determining whether to hide/show our remove player button
function toggleRemoveMonsterButton() {
    if (monsters.length > 1) {
        document.getElementById("removeMonster").style.display= "inline-block";
    }
    else {
        document.getElementById("removeMonster").style.display= "none";
    }
}
