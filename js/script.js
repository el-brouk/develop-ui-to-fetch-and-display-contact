// copy here the solution code for implementing validation of contact inputs

let contacts = [];
import {persistSubmittedContact} from './contact_service.js';

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

//init();

let submit = document.querySelector('input[type="submit"]');
//let submit = document.getElementById('submitCon');
    submit.addEventListener('click', event => {
       submitContact(event);
    });

export const submitContact = (event) => {
//const submitContact = (event) => {
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
const setMaxDate = element => {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    element.max = date.toISOString().split("T")[0];
}

init();

//module.exports = submitContact
