function getJSON() {
    const url = 'http://127.0.0.1:5000/getJSON'
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

function loadMonster (monster) {
    console.log(`${monster.speed}`);
}

// TODO: Catch invalid json/timeouts so we don't have errors on loadMonster
async function fetchMonster(monsterName) {
    // Currently local only, need to change this for backend fetch calls when set up
    const response = await fetch(`data/${monsterName}.monster`)
    .then (response => response.json())
    .then (monster => loadMonster(monster));
}

const showMonsterDiv = document.querySelector(".monster-display");
const createMonsterButton = document.querySelector("#create-monster");

createMonsterButton.addEventListener("click", () => {
    showMonsterDiv.innerHTML = "";
    let text = document.createElement("p");
    fetchMonster("goat");
    text.innerText = "MOnster here";
    showMonsterDiv.appendChild(text);
})
