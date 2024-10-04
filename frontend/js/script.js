function getJSON() {
    const url = 'http://127.0.0.1:5000/getJSON'
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

// Button that creates a monster (TEMP)
const createMonsterButton = document.querySelector("#create-monster");

function createPar (text) {
    const par = document.createElement("p");
    par.textContent = text;
    return par;
}

function getModifier (score) {
    console.log(`${Math.floor((score - 10) / 2)}`);
    return Math.floor((score - 10) / 2);
}

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

function loadMonster (monster) {
    // Div where we will display monsters
    const showMonsterDiv = document.querySelector(".monster-display");
    showMonsterDiv.innerHTML = "";

    // Adding name to first line
    showMonsterDiv.appendChild(createPar(monster.name));
    // Adding size, type, and alignment
    showMonsterDiv.appendChild(createPar(monster.size + " " + monster.type + ", " + monster.alignment));
    // Line break
    showMonsterDiv.appendChild(document.createElement("hr"));
    // Armor class
    showMonsterDiv.appendChild(createPar("Armor Class " + monster.otherArmorDesc));
    // Hit Points
    const maybeHP = monster.hpText;
    const constMod = getModifier(monster.conPoints);
    if (/^\d+$/.test(maybeHP)) {
        showMonsterDiv.appendChild(createPar("Hit Points " + getHP(monster.size, maybeHP, constMod)));
    } else {
        showMonsterDiv.appendChild(createPar("Hit Points " + monster.hpText));
    }
    // Speed
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