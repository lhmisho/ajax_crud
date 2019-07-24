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
        console.log('hello i am edit button')
    })
    tdAction.appendChild(editBtn)

    const deleteBtn   = document.createElement('button')
    deleteBtn.className = 'btn btn-danger'
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.addEventListener('click', function(){
        console.log('hello i am delete button')
    })
    tdAction.appendChild(deleteBtn)

    TR.appendChild(tdAction)
    parentElement.appendChild(TR)   

}