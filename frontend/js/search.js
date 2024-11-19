//Function which takes in various parameters and then gets a json of all
//monsters that match that criteria

function searchMonster() {
    //building the json
    payload = {
        //most comments copy/pasted from mgetter
    'slug__in': '', //allows you to search for specific slugs, can do multiple at a time but formatting awkward
    'slug__iexact': '', //allows you to search for 1 slug specifically
    'slug': '', //tbh idk dfference between this and prev
    'name__iexact': '', //specific name
    'name': '', //SPECIFIC NAME
    'name__icontains': '', //allows you to search for creatures w names that contain this string. example is dragon will return al dragons
    'desc__iexact': '', //exact description
    'desc': '', //idk difference between this and prev
    'desc__in': '', //unsure rn
    'desc__icontains': '', //unsure
    'cr': '', //exact cr
    'cr__range': '', //range for cr but annoying to do so i implement later
    'cr__gt': '', //number you want cr to be greater than
    'cr__gte': '', //number u want cr to be greater than or equal to
    'cr__lt': '', //number u want cr to be less than
    'cr__lte': '', //number u want cr to be less than or equal to
    'hit_points': '', //hit points of creature
    'hit_points__range': '', //range for hp but annoying to do so i implement later
    'hit_points__gt': '', //number u want hp to be greater than
    'hit_points__gte': document.getElementById("hpMax").value, //max hp
    'hit_points__lt': '', //number u want hp to be less than
    'hit_points__lte': document.getElementById("hpMin").value, //min hp
    'armor_class': '', //exact ac
    'armor_class__range': '', //range for ac but annoying to do so i implement later
    'armor_class__gt': '', //number u want ac to be greater than
    'armor_class__gte': document.getElementById("acMax").value, //max ac
    'armor_class__lt': '', //number u want ac to be less than
    'armor_class__lte': document.getElementById("acMin").value, //min ac
    'type__iexact': document.getElementById("type-dropdown").value,  //creature type
    'type': '', //unsure of difference between ^
    'type__in': '', //disregard
    'type__icontains': '', //allows you to search w a term and have results be types that contain that term
    'size__iexact': document.getElementById("size-dropdown").value, //creature size
    'size': '', //unsure of difference between^
    'size__in': '', //unsure
    'size__icontains': '', //allows you to search w a term and have results be sizes that contain that term, not sure why ud want this
    'page_no': '', //specific page #
    'page_no__range': '', //annoying, alr explained this 100x
    'page_no__gt': '', //page number greater than
    'page_no__gte': '', //page number greater than or equal to
    'page_no__lt': '', //page number less than
    'page_no__lte': '', //page number less than or equal to
    //all this document slug stuff is for what compendium the content is from, not sure if we will ever really be using
    'document__slug__iexact': '', 
    'document__slug': '',
    'document__slug__in': '',
    'document__slug__not_in': ''
    }
    //everything that's in search and not in mgetter 
    payload2 = {
    'alignment': document.getElementById('alignment-dropdown').value, //creature alignment
    //(was misspelled as alignmment-dropdown earlier. leaving this comment incase fixing the typo broke something)
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