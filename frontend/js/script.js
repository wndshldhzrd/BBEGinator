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
