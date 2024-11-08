//upload files event listener and behavior upon receiving a submit
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

//runs when a submit occurs
function handleSubmit(event) {
    event.preventDefault();
    uploadFiles();
}

//display an error message in the case of submitting invalid file type
const errorMessage = document.getElementById('errorMessage');
const submitButton = document.querySelector('button[name="submitMonsters"]');
const fileInput = document.querySelector('input[name="file"]');
fileInput.addEventListener('change', handleInputChange);

//Changes upon upload
const uploadMessage = document.getElementById('uploadMessage');

//file data
const data = document.getElementById('fileData');

//update the errorMessage that gets displayed
function updateErrorMessage(e) {
    errorMessage.textContent = e;
}

//check filetype validity
function checkFileType(files) {
    for (const f of files) {
        const {name: fileName} = f;

        if (fileName.slice(-8) != '.monster') {
            throw new Error(`\nERROR: File ${fileName} is not a valid upload type--please only upload .monster files`);
        }
    }
}

//user has selected new files, check their validity
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

function resetErrorMessage() {
    submitButton.disabled = true;
    updateErrorMessage("");
    uploadMessage.textContent = "";
    data.textContent = '';
}

//after files are uploaded, run this function
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

function getFileContents(fileList) {
    data.textContent = '';
    for (const f of fileList) {
        data.innerHTML = `NAME: ${f.name}<br><br>`;
        data.innerHTML += `CONTENTS:`;
        let fr = new FileReader();
        fr.onload = function () {
            data.innerHTML += fr.result;
        }
        fr.readAsText(f);
    }
}
