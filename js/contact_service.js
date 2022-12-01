
let url = "http://localhost:3000/posts"
// put the solution code to persist and fetch data here
 
/*
    persistSumittedContact() should contain code to persist given contact to server
    use axios to call the post method and persist data
    ensure the return from axios handles both success and error
    the posted data should be displayed on the browser as well.
*/
const persistSubmittedContact = (contact) => {

   /*  let xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://localhost:3000/posts" );
    
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(contact));
    /*xhr.onreadyStateChange = function() {
        if (this.readyState == 4 && this.status == 201) {
            console.log ('data added succcessfully');
        }
    };
    xhr.onload = () => {
        console.log(`Loaded: ${xhr.status} ${xhr.response}`);
    };
    xhr.onerror = function() {
    console.log(`Network error: ${xhr.status}`);
};*/
    fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(contact)
        })
            .then(response => response.json())
            .then(result => console.log(JSON.stringify(result)));

}

/*
    getDetails() should contain code to fetch details of contact for the given contact-id from server
    use axios to call the get method and fetch data
    ensure the return from axios handles both success and error
    the fetched data should be displayed on the browser in a modal dialog.
*/
const getDetails = (id)=>{
   
}

/*
    showPersistedData() should contain code to fetch details of all existing contacts from server
    use axios to call the get method and fetch data
    ensure the return from axios handles both success and error
    the fetched data should be displayed on the browser
*/
const showPersistedData = () => {

}
// showPersistedData(); //uncomment this code to display the existing contacts on browser


module.exports = { persistSubmittedContact, showPersistedData, getDetails }

