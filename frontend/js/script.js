function getJSON() {
    const url = 'http://127.0.0.1:5000/getJSON'
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

function loadMonster (monsterName) {
    const monster = getMonster(monsterName)
    //  .then(data => JSON.parse(data))
        .then(data => console.log(data));

    monster = JSON.parse(monster);
    // console.log(monster);
}

async function getMonster(monsterName) {
    const response = await fetch(`data/${monsterName}.json`);
    const data = await response.json();
    return data;
}

const showMonsterDiv = document.querySelector(".show-monster");
const createMonsterButton = document.querySelector("#create-monster");

createMonsterButton.addEventListener("click", () => {
    showMonsterDiv.innerHTML = "";
    let text = document.createElement("p");
    loadMonster("goat");
    text.innerText = "MOnster here";
    showMonsterDiv.appendChild(text);
})
