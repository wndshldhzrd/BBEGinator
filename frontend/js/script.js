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
    fetchMonster(monsterSizeNum)
})


// https://stackoverflow.com/questions/64934381/fetch-multiple-kind-of-data

// semi functional fetch monster that sends data with its request
// TODO: Catch invalid json/timeouts so we don't have errors on loadMonster
function fetchMonster(monsterSizeNum) {
    const url = 'https://zevce.pythonanywhere.com/getMonster/' + monsterSizeNum
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}
