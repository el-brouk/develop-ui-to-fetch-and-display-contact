// copy here the solution code for implementing persistence of contact data

let url = "http://localhost:3000/posts"
// put the solution code to persist and fetch data here
 
/*
    persistSumittedContact() should contain code to persist given contact to server
    the posted data should be displayed on the browser as well.
*/
 export const persistSubmittedContact = (contact) => {
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
}

/*
    getDetails() should contain code to fetch details of contact for the given contact-id from server
    the fetched data should be displayed on the browser in a modal dialog.
*/
//export  
const getDetails = (id)=>{
    let expId = id;
   fetch(url)
      .then(response => response.json())
      .then(result => {
                let item = result.find( it => it.id == expId );
                createDetails(item);
            })
            .catch(error => {
                console.log(error);
            });
}

/*
    showPersistedData() should contain code to fetch details of all existing contacts from server
    the fetched data should be displayed on the browser
*/
 //export
  const showPersistedData = () => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
                 var sorted = result.sort(function(a, b) {
                   let nameA = a.firstname.toLowerCase();
                   let nameB = b.firstname.toLowerCase();
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

showPersistedData(); //uncomment this code to display the existing contacts on browser


/* Display all the contacts in a table */
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
       button.setAttribute("data-bs-contact", contact.id);
       let badge = document.createElement('span');
        badge.innerHTML = '+';
        button.appendChild(badge);
       td5.appendChild(button); 
       row.appendChild(td5);
    });
}

/* Create a modal for contact details */
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

/* Opening a modal on clicking a button */
var openedModal = document.getElementById('detModal');
openedModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var openedId = button.getAttribute('data-bs-contact');
    getDetails(openedId);
})

/* Writing contact's details in the modal */
    let createDetails = (item) => {
        let message = openedModal.querySelector('p');
        message.textContent = '';
        let name = document.createElement('strong');
        name.innerText = `${item.firstname} ${item.lastname}`;
        message.appendChild(name);
        let home = document.createElement('p');
        home.innerText = `Home ${item.homeNo}`;
        message.appendChild(home);
        let work = document.createElement('p');
        work.innerText = `Work ${item.workNo}`;
        message.appendChild(work);
        let birth = document.createElement('p');
        birth.innerText = `Birthdate ${item.birthdate}`;
        message.appendChild(birth);
        let company = document.createElement('p');
        company.innerText = `Company ${item.company}`;
        message.appendChild(company);
        let job = document.createElement('p');
        job.innerText = `Job Title ${item.jobTitle}`;
        message.appendChild(job);
        let notes = document.createElement('p');
        notes.innerText = item.notes;
        message.appendChild(notes);
    } 
    

//module.export = { persistSubmittedContact, showPersistedData, getDetails };
