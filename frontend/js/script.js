// Button that creates a monster (TEMP)
const createMonsterButton = document.querySelector("#create-monster");

function loadMonster (monster) {
    // Div where we will display monsters
    const showMonsterDiv = document.querySelector(".monster-display");
    showMonsterDiv.innerHTML = "";

    // Adding name to first line
    const name = document.createElement("p");
    name.textContent = monster.name;

    // Adding size, type, and alignment
    const description = document.createElement("p");
    description.textContent = monster.size + " " + monster.type + ", " + monster.alignment;

    // Line break
    const lbreak = document.createElement("hr");
    // lbreak.textContent = "-------";

    showMonsterDiv.appendChild(name);
    showMonsterDiv.appendChild(description);
    showMonsterDiv.appendChild(lbreak);
}


//James this is terrible practice im going to kill you
createMonsterButton.addEventListener("click", () => {
    monsterSizeNum = document.querySelector("#size-dropdown").value;
    getMonster(monsterSizeNum)
})


// SO post that explains how to send data back and forth I think?
// https://stackoverflow.com/questions/29987323/how-do-i-send-data-from-js-to-python-with-flask
// This one in case ajax isnt compatible with Jekyll?
// https://stackoverflow.com/questions/6396101/pure-javascript-send-post-data-without-a-form 

// semi functional fetch monster that sends data with its request
// TODO: Catch invalid json/timeouts so we don't have errors on loadMonster
function getMonster(monsterSizeNum) {
    const url = 'https://zevce.pythonanywhere.com/getMonster/' + monsterSizeNum
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

//lets hope this works lol
$.post( "/postmethod", {
    "hello": "world" 
});
