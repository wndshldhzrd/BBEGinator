function getJSON() {
    const url = 'http://127.0.0.1:5000/getJSON'
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}
function loadMonster (monsterFile) {

}

function fetchMonster (monsterName) {

}

const showMonsterDiv = document.querySelector(".show-monster");

const createMonsterButton = document.querySelector("#create-monster");

createMonsterButton.addEventListener("click", () => {
    showMonsterDiv.innerHTML = "";
    let text = document.createElement("p");
    text.innerText = "MOnster here";
    showMonsterDiv.appendChild(text);
})
