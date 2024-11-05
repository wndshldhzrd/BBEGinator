//variable which keeps track of how many monsters the page is currently displaying
var monsters = [];

//upload files event listener and behavior upon receiving a submit
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    uploadFiles();
}

function uploadFiles() {
    const url = 'https://httpbin.org/post';
    const method = 'post';

    const xhr = new XMLHttpRequest();
    const data = new FormData(form);

    xhr.open(method, url);
    xhr.send(data);
}


//function for adding a monster to the createEncounter page
function addMonster() {

    //getting the div which monsters are added to
    var monsterStatBlockDisplay = document.getElementById("monsterStatBlocks");

    //creating our monster stat block to be added to the page
    var monsterStatBlock = document.createElement("div");

    //adding our monster element to the list of monster elements
    monsters.push(monsterStatBlock)

    //setting the inner html of the monster statblock
    //ideally refactor into an html template page, but good enough for now
    monsterStatBlock.innerHTML =
    `<div class="monsterInput">
        <label class="monsterName">Monster ${monsters.length}</label><br>
        <hr>
        UploadMonster <button onclick="uploadMonster();">Upload Monster</button>
        <br>
        Level <input class="stat-Input" type="number" min="1" value="1">
        <br>
        Hp <input class="stat-Input" id="monsterHealth" type="number" min="1" value="1">
    </div>`;

    //displaying our monster on the page
    monsterStatBlockDisplay.appendChild(monsterStatBlock);

    toggleRemoveMonsterButton();
}

function uploadMonster() {
    
}

function removeMonster() {

    //grabbing all of our monster stat blocks
    var monsterStatBlocks = document.getElementsByClassName("monsterInput");

    //removing the last one
    monsterStatBlocks[monsters.length-1].remove();

    //removing the monster element from our array
    monsters.pop();

    toggleRemoveMonsterButton();
}

//determining whether to hide/show our remove monster button
function toggleRemoveMonsterButton() {
    if (monsters.length > 1) {
        document.getElementById("removeMonster").style.display= "inline-block";
    }
    else {
        document.getElementById("removeMonster").style.display= "none";
    }
}
