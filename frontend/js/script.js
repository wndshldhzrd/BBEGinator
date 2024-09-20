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