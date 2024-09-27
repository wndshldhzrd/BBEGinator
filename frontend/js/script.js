function getJSON() {
    fetch("http://127.0.0.1:5000/getJSON", {mode: 'no-cors'})
        .then(function(response) {
            //checking if api returns successfully
            if (!response.ok) console.log("json was not grabbed correctly!")
            else return response.json();
        })
        .then(function(response) {
            //printing out our json object to the console for easy reference
            console.log(response);
        });
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
