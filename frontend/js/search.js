//Function which takes in various parameters and then gets a json of all
//monsters that match that criteria

function searchMonster() {
    //building the json
    payload = {
        'hit_points__gte': document.getElementById("hpMax").value, //max hp
        'hit_points__lte': document.getElementById("hpMin").value, //min hp
        'armor_class__gte': document.getElementById("acMax").value, //max ac
        'armor_class__lte': document.getElementById("acMin").value, //min ac
        'type__iexact': document.getElementById("type-dropdown").value,  //creature type
        'size__iexact': document.getElementById("size-dropdown").value, //creature size
        'alignmnet': document.getElementById('alignmment-dropdown').value, //creature alignment
        'swim_speed_lte' : '', //min swimspeed
        'swim_speed_gte' : '', //max swimspeed
        'fly_speed_lte' : '', //min flyspeed
        'fly_speed_gte' : '', //max flyspeed
        'walk_speed_lte' : '', //min walkspeed
        'walk_speed_gte' : '', //max walkspeed
        'str_lte' : document.getElementById("strMin").value, //min str
        'str_gte' : document.getElementById("strMax").value, //max str
        'dex_lte' : document.getElementById("dexMin").value, //min dex
        'dex_gte' : document.getElementById("dexMax").value, //max dex
        'con_lte' : document.getElementById("conMin").value, //min con
        'con_gte' : document.getElementById("conMax").value, //max con
        'int_lte' : document.getElementById("intMin").value, //min int
        'int_gte' : document.getElementById("intMax").value, //max int
        'wis_lte' : document.getElementById("wisMin").value, //min wis
        'wis_gte' : document.getElementById("wisMax").value, //max wis
        'cha_lte' : document.getElementById("chaMin").value, //min cha
        'cha_gte' : document.getElementById("chaMax").value, //max cha
        //metric which creatures should be ordered by
        'sort_by': document.getElementById("Sort-dropdown").value + "-" 
        + document.getElementById("Sort-style").value
    }

    //testing to ensure that parameters are being passed correctly
    console.log(payload);

    const url = 'https://zevce.pythonanywhere.com/searchMonster/' + JSON.stringify(payload);
    fetch(url)
    .then(response => response.json())  
    .then(json => {
        console.log(json);
    })
}

//function for downloading monsters from the webpage
function downloadMonster() {
    obj = {"lol" : "lmao"}
    filename = "goat";

    const blob = new Blob([JSON.stringify(obj, null, 2)], {
        type: 'application/json',
      });


      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.monster`;
      a.click();
      URL.revokeObjectURL(url);
}

//test function
const testMessage = document.getElementById('testMsg');
const testMessage2 = document.getElementById('testMsg2');

//store our search results here
let data = null;
let dataIndex = 0;

async function testRunningPython() {
    testMessage.textContent = "Button clicked, awaiting result... ";
    const url = "http://localhost:5000/test-script";

    console.log("fetching");

    try {
        const response = await fetch(url);
        console.log("response received, supposedly");
        if (response.status == 200) {
            const json = await response.json();

            //get the new data, reset index to 0
            data = JSON.parse(json);
            dataIndex = 0;

            //console.log(data);
            console.log("let's not print the whole json...");
            if (data.length == 0) {
                testMessage.innerHTML = "No monsters found. Please try other filters.";
                return;
            }

            testMessage.innerHTML = "Search results:<br>";
            testMessage2.innerHTML = "";

            let i = 0;
            for (r of data) {
                const name = r["name"];
                testMessage2.innerHTML += name + "<br>";
                i++;
                if (i > 3) {
                    break;
                }
            }
        }
        else {
            console.log("response.status error");
        }
    }
    catch (error) {
        console.error("ERROR! ", error);
        testMessage2.textContent = "ERROR";
    }

    console.log("fetched");
}

//get previous 4 monsters
function prevResults() {
    if (data == null || dataIndex == 0 || data.length == 0) {
        return;
    }

    dataIndex = dataIndex - 4;
    if (dataIndex < 0) {
        dataIndex = 0;
    }

    testMessage2.innerHTML = "";
    for (let i = dataIndex; i < data.length && i < dataIndex + 4; i++) {
        r = data[i];
        const name = r["name"];
        testMessage2.innerHTML += name + "<br>";
    }
}

//get next 4 monsters
function nextResults() {
    if (data == null || dataIndex + 4 >= data.length || data.length == 0) {
        return;
    }

    dataIndex += 4;
    testMessage2.innerHTML = "";
    for (let i = dataIndex; i < data.length && i < dataIndex + 4; i++) {
        r = data[i];
        const name = r["name"];
        testMessage2.innerHTML += name + "<br>";
    }
}

//Opening/closing filter options
function toggleFilter(){
    const filters = document.getElementById("inputs");
    if(filters.style.display === "block"){
        filters.style.display = "none";
    }else{
        filters.style.display = "block";
    }
}