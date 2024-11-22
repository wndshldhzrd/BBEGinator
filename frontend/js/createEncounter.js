import { loadMonsterMonster } from './loadMonster.js';
//Upload files event listener and behavior upon receiving a submit
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

//Runs when a submit (hitting the submit button) occurs
function handleSubmit(event) {
    event.preventDefault();
    uploadFiles();
}

//Display an error message in the case of submitting invalid file type
const errorMessage = document.getElementById('errorMessage');

//Set up the button and uploaded files
const submitButton = document.querySelector('button[name="submitMonsters"]');
const fileInput = document.querySelector('input[name="file"]');
fileInput.addEventListener('change', handleInputChange);

//Upon an upload, displays if the upload is in progress, successful, or failed
const uploadMessage = document.getElementById('uploadMessage');

//The data contained in the .monster files is currently pasted here
const data = document.getElementById('fileData');

//Update the errorMessage that gets displayed
function updateErrorMessage(e) {
    errorMessage.textContent = e;
}

//Check filetype validity
function checkFileType(files) {
    for (const f of files) {
        const {name: fileName} = f;

        if (fileName.slice(-8) != '.monster') {
            throw new Error(`\nERROR: File ${fileName} is not a valid upload type--please only upload .monster files`);
        }
    }
}

//User has selected new files, check their validity and handle the submitButton
function handleInputChange() {
    resetErrorMessage();
    try {
        checkFileType(fileInput.files);
    }
    catch (err) {
        updateErrorMessage(err.message);
        return;
    }
    submitButton.disabled = false;
}

//resets everything when new files are selected by the user
function resetErrorMessage() {
    submitButton.disabled = true;
    updateErrorMessage("");
    uploadMessage.textContent = "";
    data.textContent = '';
}

//When files are uploaded (submitted), run this function
function uploadFiles() {
    const url = 'https://httpbin.org/post';
    const method = 'post';

    const xhr = new XMLHttpRequest();
    const data = new FormData(form);

    uploadMessage.textContent = 'Uploading...';

    xhr.addEventListener('loadend', () => {
        if (xhr.status === 200) {
            uploadMessage.textContent = 'Successful upload';
            getFileContents(fileInput.files);
        } else {
            uploadMessage.textContent = 'Failed upload';
        }
    });

    xhr.open(method, url);
    xhr.send(data);
}

//Function that loops through all the submitted monster files and calls readFile(f) to display their contents
//(currently just the .monster in its entirety)
function getFileContents(fileList) {
    data.innerHTML = '';
    for (const f of fileList) {
        readFile(f);
    }
}

//Made into separate function to stop errors from occurring :)
function readFile(f) {
    let fr = new FileReader();
    fr.onload = function () {
        let result = fr.result;
        data.innerHTML += `NAME: ${f.name}<br>` + `CONTENTS:<br>` + result + '<br><br><br>';
    }
    fr.readAsText(f);
}

//taking the search.js jsonmonster but it has to be a monstermonster
export async function searchMonster() {
    let payload = {
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
    'hit_points__gte': document.getElementById("hpMin").value, //max hp
    'hit_points__lt': '', //number u want hp to be less than
    'hit_points__lte': document.getElementById("hpMax").value, //min hp
    'armor_class': '', //exact ac
    'armor_class__range': '', //range for ac but annoying to do so i implement later
    'armor_class__gt': '', //number u want ac to be greater than
    'armor_class__gte': document.getElementById("acMin").value, //max ac
    'armor_class__lt': '', //number u want ac to be less than
    'armor_class__lte': document.getElementById("acMax").value, //min ac
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
    /*everything that's in search and not in mgetter 
    let payload2 = {
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
    } */


    testMessage.textContent = "Button clicked, awaiting result... ";
    testMessage2.textcontent = "";
    const url = "https://zevce.pythonanywhere.com/searchMonster/" + JSON.stringify(payload);

    console.log(payload);

    console.log("fetching");
    test();

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
            statBlockDiv.innerHTML = "";

            for (let i = 0; i < data.length && i < 4; i++) {
                const r = data[i];
                const name = r["name"];
                testMessage2.innerHTML += name + "<br>";
                loadMonsterMonster(r);
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