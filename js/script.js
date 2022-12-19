

// put validation code here

let contacts = [];
//import persistSubmittedContact from './contact_service.js';
//import axios from 'axios';

function init() {
   
    // listen to click of addContact button and add maximum of two additional inputs for inputting Contact Nos.
   document.getElementById('addContactNo').addEventListener('click', createContact) 
    let count = 1;
    function createContact () {
        if (count < 3 ) {
            let div = document.createElement('div');
            div.classList.add('col-md-6');
            //input.class = "form-control form-control-sm";
            let input = document.createElement('input');
            input.classList.add('form-control');
            input.name = `addContact${count}`;
            input.id = `addContact${count}`;
            div.appendChild(input);
            let small = document.createElement('small');
            small.id = `addContactError${count}`;
            div.appendChild(small);
            let element = document.getElementById('contactNos');
            element.appendChild(div);
            count ++;
        } else {
         return
    }};
    
    //disable all dates for whom age is less than 18
    setMaxDate(document.getElementById('birthdate'));

    //fix + button
    let btn = document.getElementById('addContactNo');
    btn.addEventListener('click', event => {
       event.preventDefault();
    });

}

const submitContact = (event) => {
 //contact object captures all the inputs provided
 let contactForm = document.querySelector('form');
    
 let contact = Object.fromEntries(new FormData(contactForm));
 
 let result = validateData(contact);

 event.preventDefault();

 return result;
 
}
 
 const validateData = (contact) => {
 //errors object captures all the validation errors
 let error = {
     firstNameError: validateFirstname(contact.firstname, 'FirstName'),
     lastNameError: validateLastname(contact.lastname, 'LastName'),
     emailError: validateEmail(contact.email),
     homeNoError: validateHomeNo(contact.homeNo),
     workNoError: validateWorkNo(contact.workNo),
     birthdateError: "",
     companyError: "",
     jobTitleError: "", 
     notesError: validateNotes(contact.notes),
 }

if (document.getElementById('addContact1')) {
    error.addContactError1 = validateContactNo1(contact.addContact1);
}

if(document.getElementById('addContact2')){
    error.addContactError2 = validateContactNo2(contact.addContact2);
}

 //display validation summary with error messages
 //if no errors, push the contact to contacts array
 let errorMessages = Object.values(error).filter(e => e !== '');
 if (errorMessages.length === 0) {
     contacts.push(contact);
     persistSubmittedContact(contact);
     alert('feedback submitted');
     return true;
    } else {
 //display validation summary with error messages
     displayValidationSummary(errorMessages);
 //display error messages alongside input fields
    displayIndividualErrorMessages(error);
     return false;
 }

 //contacts can be logged on to console, or can even be updated on UI
 //console.log(contacts);
}



//function to display validation summary with error messages provided
function displayValidationSummary(error) {
   let list = error.map(e => `<li>${e}</li>`).join('');
    document.getElementsByTagName('ul')[0].innerHTML = list;
    /*document.getElementsByTagName('ul')[0].innerHTML = errorMessages
    .map(e => `<li>${e}</li>`)
    .join('');*/
    
}

//function to display error messages alongside the input fields
function displayIndividualErrorMessages(error) {
    let smallElements = document.getElementsByTagName('small');
    [...smallElements].forEach((element) => {
        element.innerText = error[element.id]
    });
}
//function to validate firstName
const validateFirstname = (firstName) => {
    let validRegex = /^[a-zA-Z,.]+$/;
    let firstNameError = validateInput(firstName,"FirstName");
    return firstNameError !== '' ? firstNameError : !firstName.match(validRegex) ? "FirstName can contain only alphabets and (.)" : '';    
}
//function to validate lastName
const validateLastname = (lastName) => {
    let validRegex = /^[a-zA-Z,.]*$/;
    let lastNameError = !lastName.match(validRegex) ? "LastName can contain only alphabets and (.)" : '';  
    return lastNameError; 
}


const isEmpty = value => value === '' || value === undefined || value === null;
const validateInput = (value, fieldName) => isEmpty(value) ? `${fieldName} cannot be left blank` : '';


//function to validate email
const validateEmail = (email) => {
    let validRegex = /^[a-zA-Z0-9#$.'_`~-]+@[a-z]+\.[a-z]+$/;
    let emailError = validateInput(email,"Email");
    return emailError !== '' ? emailError : !email.match(validRegex) ? "Invalid Email" : '';    
}
//function to validate home no
const validateHomeNo = (HomeNo) => {
    let validRegex = /^[+]\d{2}[(, ]*\d{3}[), ,.,-]*\d{3}[-, ,.]*\d{4}$/;
	let homeNoError = validateInput(HomeNo,"Home No");
	return homeNoError !== '' ? homeNoError : !HomeNo.match(validRegex) ? 'Home Contact No should start with country code prefixed by + and followed by 10 digits' : '';
}
//function to validate work no
const validateWorkNo = (WorkNo) => {
	let validRegex = /^[+]\d{2}[(, ]*\d{3}[), ,.,-]*\d{3}[-, ,.]*\d{4}$/;
	let workNoError = ( WorkNo !== '' && !WorkNo.match(validRegex) ) ? 'Work Contact No should start with country code prefixed by + and followed by 10 digits' : '';
    return workNoError;
}
//function to validate additional contact no
const validateContactNo1 = (ContactNo1) => {
    let validRegex = /^[+]\d{2}[(, ]*\d{3}[), ,.,-]*\d{3}[-, ,.]*\d{4}$/;
    let addContactError1 = ( ContactNo1 !== '' && !ContactNo1.match(validRegex) ) ? 'Contact No should start with country code prefixed by + and followed by 10 digits' : '';
    return addContactError1;
}
//function to validate additional contact no
const validateContactNo2 = (ContactNo2) => {
    let validRegex = /^[+]\d{2}[(, ]*\d{3}[), ,.,-]*\d{3}[-, ,.]*\d{4}$/;
    let addContactError2 = ( ContactNo2 !== '' && !ContactNo2.match(validRegex) ) ? 'Contact No should start with country code prefixed by + and followed by 10 digits' : '';
    return addContactError2;

}

//function to validate notes
const validateNotes = (notes) => {
    let notesError = notes.length > 200 ? "Notes should contain maximum of 200 characters" : '';
    return notesError;
}

//disable all dates for whom age is less than 18
const setMaxDate = (element) => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    element.max = date.toISOString().split("T")[0];
}

//module.exports = submitContact





//all this should be inside another js file:

let url = "http://localhost:3000/posts";

/*
    persistSumittedContact() should contain code to persist given contact to server
    ensure the return handles both success and error
    the posted data should be displayed on the browser as well.
*/
function persistSubmittedContact(contact) {    
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(contact) 
        })
            .then(response => {
                console.log(`status is: ${response.status}`);
                return response.json();
            })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    //getDetails(3);
}

/*
    getDetails() should contain code to fetch details of contact for the given contact-id from server
    call the get method and fetch data
    ensure the return handles both success and error
    the fetched data should be displayed on the browser in a modal dialog.
*/
const getDetails = (id) => {
   let expId = id;
   fetch(url)
      .then(response => response.json())
      .then(result => {
                let item = result.find( it => it.id == expId );
                console.log (item);
            })
            .catch(error => {
                console.log(error);
            });
}

/*
    showPersistedData() should contain code to fetch details of all existing contacts from server
    use axios to call the get method and fetch data
    ensure the return from axios handles both success and error
    the fetched data should be displayed on the browser
*/
const showPersistedData = () => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
                 let sorted = result.sort(function(a, b) {
                   let nameA = JSON.stringify(a.firstname).toLowerCase();
                   //let nameB = JSON.stringify(b.firstname).toLowerCase()
                   let nameB = JSON.stringify(b.firstname);
                    if (nameA > nameB) return 1;
                    if (nameA < nameB) return -1;
                    return 0;
                });
                displayContacts(sorted);
            })
            .catch(error => {
                console.log(error);
            });

}

showPersistedData(); 

const displayContacts = (sorted) => {
    let table = document.getElementById('contact-list').getElementsByTagName('tbody')[0];
    
    sorted.forEach((contact) => {
       let row = table.insertRow();
       let td1 = document.createElement('td');
       td1.name = 'firstname'
       td1.innerHTML = contact.firstname;
       row.appendChild(td1);
       let td2 = document.createElement('td');
       td2.name = 'lastname'
       td2.innerHTML = contact.lastname;
       row.appendChild(td2);
       let td3 = document.createElement('td');
       td3.name = 'email'
       td3.innerHTML = contact.email;
       row.appendChild(td3);
       let td4 = document.createElement('td');
       td4.name = 'contactNo'
       td4.innerHTML = contact.homeNo;
       row.appendChild(td4);
       let td5 = document.createElement('td');
       td5.name = 'plusButton'
       let button = document.createElement('button')
       button.type = 'button';
       button.setAttribute("class", "btn btn-primary");
       button.setAttribute("data-bs-toggle", "modal");
       button.setAttribute("data-bs-target", "#detModal");
       button.setAttribute("data-bs-contact", "contact.id");
       let badge = document.createElement('span');
        badge.innerHTML = '+';
        button.appendChild(badge);
       td5.appendChild(button); 
       row.appendChild(td5);
       
       button.addEventListener("click", function() {
                
            modal.show();

       });

     

    });
}

const createModal = () => {
   let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = "detModal";
    modal.setAttribute('tabindex', '-1');
    let modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    let modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    let title = document.createElement('h5');
    title.classList.add('modal-title');
    title.innerHTML = 'Contact Details';
    let buttonTop = document.createElement('button')
    buttonTop.type = 'button';
    buttonTop.setAttribute("class", "btn-close");
    buttonTop.setAttribute("data-bs-dismiss", "modal");
    let modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    let message = document.createElement('p');
   // message.innerText = `id: ${contact.id}`;
    message.innerText = 'hello';
    let modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    let buttonFoot = document.createElement('button')
    buttonFoot.type = 'button';
    buttonFoot.setAttribute("class", "btn btn-secondary");
    buttonFoot.setAttribute("data-bs-dismiss", "modal");
    buttonFoot.innerHTML = 'Close';

    modalHeader.appendChild(title);
    modalHeader.appendChild(buttonTop);
    modalContent.appendChild(modalHeader);
    modalBody.appendChild(message);
    modalContent.appendChild(modalBody);
    modalFooter.appendChild(buttonFoot);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent); 
    modal.appendChild(modalDialog); 
    document.body.appendChild(modal); 
}

createModal();



