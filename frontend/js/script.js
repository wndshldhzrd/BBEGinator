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