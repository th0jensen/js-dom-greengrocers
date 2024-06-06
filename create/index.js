import { state } from '../index.js'

const form = document.querySelector('#new-item-form')

const nameLabel = document.createElement('label')
nameLabel.setAttribute('for', 'name')
nameLabel.innerText = 'Item name'

const nameInput = document.createElement('input')
nameInput.setAttribute('type', 'text')
nameInput.setAttribute('name', 'name')
nameInput.required = true

const priceLabel = document.createElement('label')
priceLabel.setAttribute('for', 'price')
priceLabel.innerText = 'Item price (£)'

const priceInput = document.createElement('input')
priceInput.setAttribute('type', 'number')
priceInput.setAttribute('name', 'price')
nameInput.required = true

const kindLabel = document.createElement('label')
kindLabel.setAttribute('for', 'kind')
kindLabel.innerText = 'Item kind'

const kindInput = document.createElement('input')
kindInput.setAttribute('type', 'text')
kindInput.setAttribute('name', 'kind')
nameInput.required = true

const submit = document.createElement('input')
submit.setAttribute('type', 'submit')
submit.setAttribute('id', 'submit')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const newItemData = new FormData(form)
    const newItem = {
        id: `0${state.items.length + 1}-${newItemData.get('name')}`,
        name: newItemData.get('name'),
        price: Number(newItemData.get('price')),
        kind: newItemData.get('kind'),
    }
    state.items.push(newItem)
    // The state resets on reload 🤷‍♂️
    window.location.assign('/')
    console.log(state.items)
})

form.append(nameLabel, nameInput)
form.append(priceLabel, priceInput)
form.append(kindLabel, kindInput)
form.append(submit)
