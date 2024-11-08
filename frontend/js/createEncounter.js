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

//Gets the file contents and puts them on the page (currently just the .monster in its entirety)
function getFileContents(fileList) {
    data.innerHTML = '';
    for (const f of fileList) {
        readFile(f);
    }
}

function readFile(f) {
    let fr = new FileReader();
    fr.onload = function () {
        let result = fr.result;
        data.innerHTML += `NAME: ${f.name}<br>` + `CONTENTS:<br>` + result + '<br><br><br>';
    }
    fr.readAsText(f);
}
