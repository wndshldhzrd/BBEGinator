function getJSON() {
    const url = 'https://zevce.pythonanywhere.com/getJSON'
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

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

// TODO: Catch invalid json/timeouts so we don't have errors on loadMonster
async function fetchMonster(monsterName) {
    // Currently local only, need to change this for backend fetch calls when set up
    const response = await fetch(`data/${monsterName}.monster`)
    .then (response => response.json())
    .then (monster => loadMonster(monster));
}

createMonsterButton.addEventListener("click", () => {
    fetchMonster("goat");
})
