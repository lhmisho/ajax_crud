import axios from 'axios'


const URL = 'http://localhost:3000/contacts'

window.onload = function(){

    let tBody = document.querySelector("#tBody")
    
    axios.get(URL)
        .then(res => {
            res.data.forEach(contact => {
                createTDElement(contact, tBody)
            })
        })
        .catch(err => console.log(err))

    let saveButton = document.querySelector("#saveButton")
    saveButton.addEventListener('click', function(){
        createContact()
    })
}

// create contact

function createContact(){

    let nameField   = document.querySelector("#name")
    let phoneField  = document.querySelector("#phone")
    let emailField  = document.querySelector("#email")

    let contact = {
        name    : nameField.value,
        phone   : phoneField.value,
        email   : emailField.value
    }
    let tBody = document.querySelector("#tBody")

    axios.post(URL, contact)
        .then(res => {
            createTDElement(contact, tBody)

            nameField.value     = ''
            phoneField.value    = ''
            emailField.value    = ''
        })
        .catch(err => console.log(err))
}

// creating a TR element and appending it to it's parent
function createTDElement(contact, parentElement){
    
    const TR = document.createElement('tr')
    
    const tdName        = document.createElement('td')
    tdName.innerHTML    = contact.name 
    TR.appendChild(tdName)

    const tdPhone       = document.createElement('td')
    tdPhone.innerHTML   = contact.phone ? contact.phone : 'N/A'
    TR.appendChild(tdPhone)
    
    const tdEmail       = document.createElement('td')
    tdEmail.innerHTML   = contact.email ? contact.email : 'N/A'
    TR.appendChild(tdEmail)

    const tdAction  = document.createElement('td')
    const editBtn   = document.createElement('button')
    editBtn.className = 'btn btn-warning'
    editBtn.innerHTML = 'Edit'
    editBtn.addEventListener('click', function(){
        let mainModal = $("#contactEditModal")
        mainModal.modal('toggle')

        let editName    = document.querySelector("#edit-name")
        let editPhone   = document.querySelector("#edit-phone")
        let editEmail   = document.querySelector("#edit-email")

        editName.value = contact.name
        editEmail.value = contact.email ? contact.email : 'N/A'
        editPhone.value = contact.phone ? contact.phone : 'N/A'

        let updateButton = document.querySelector("#updateBtn")
        updateButton.addEventListener('click', function(){
            axios.put(`${URL}/${contact.id}`, {
                name    : editName.value,
                phone   : editPhone.value,
                email   : editEmail.value 
            })
            .then(res => {
                tdName.innerHTML    = res.data.name
                tdEmail.innerHTML   = res.data.email
                tdPhone.innerHTML   = res.data.phone
                
                mainModal.modal('hide')
            })
            .catch(err => console.log(err))
        })
    })
    tdAction.appendChild(editBtn)

    const deleteBtn   = document.createElement('button')
    deleteBtn.className = 'btn btn-danger'
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.addEventListener('click', function(){
        axios.delete(`${URL}/${contact.id}`)
                .then(res => {
                    parentElement.removeChild(TR)
                })
                .catch(err => console.log(err))
    })
    tdAction.appendChild(deleteBtn)

    TR.appendChild(tdAction)
    parentElement.appendChild(TR)   

}