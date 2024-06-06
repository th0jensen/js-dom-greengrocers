export const state = {
    items: [
        {
            id: '001-beetroot',
            name: 'beetroot',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '002-carrot',
            name: 'carrot',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '003-apple',
            name: 'apple',
            price: 0.35,
            kind: 'Fruit',
        },
        {
            id: '004-apricot',
            name: 'apricot',
            price: 0.35,
            kind: 'Fruit',
        },
        {
            id: '005-avocado',
            name: 'avocado',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '006-bananas',
            name: 'bananas',
            price: 0.35,
            kind: 'Fruit',
        },
        {
            id: '007-bell-pepper',
            name: 'bell pepper',
            price: 0.35,
            kind: 'Vegetable',
        },
        {
            id: '008-berry',
            name: 'berry',
            price: 0.35,
            kind: 'Berry',
        },
        {
            id: '009-blueberry',
            name: 'blueberry',
            price: 0.35,
            kind: 'Berry',
        },
        {
            id: '010-eggplant',
            name: 'eggplant',
            price: 0.35,
            kind: 'Vegetable',
        },
    ],
    cart: [],
    sorted: false,
    filterVariable: null,
}

function createItemImage(item) {
    const itemIconContainer = document.createElement('div')
    const itemIcon = document.createElement('img')
    itemIcon.src = `assets/icons/${item.id}.svg`
    itemIcon.alt = item.name
    itemIconContainer.appendChild(itemIcon)
    return itemIconContainer
}

// TODO (#3): Add items to cart
function createAddToCartButton(item, cart) {
    const addToCartButton = document.createElement('button')
    addToCartButton.innerText = 'Add to cart'
    addToCartButton.addEventListener('click', () => {
        const matchingItem = cart.find((cartItem) => cartItem.id.match(item.id))
        if (matchingItem) {
            matchingItem.quantity += 1
            console.log(`INFO: ${item.name} quantity increased by one`)
            renderCart()
        } else if (!matchingItem) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            cart.push(newItem)
            console.log(`INFO: ${item.name} added to cart`)
            renderCart()
        } else {
            console.error('ERROR: Failed to add item to cart')
        }
    })
    return addToCartButton
}

// TODO (#5): Add logic to incremental buttons
function addButton(cart) {
    const addButton = document.createElement('button')
    addButton.setAttribute('class', 'quantity-btn add-btn center')
    addButton.addEventListener('click', () => {
        cart.quantity += 1
        console.log(`INFO: ${cart.name} quantity increased by one`)
        renderCart()
    })
    return addButton
}

function removeButton(cart) {
    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'quantity-btn remove-btn center')
    removeButton.addEventListener('click', () => {
        if (cart.quantity > 1) {
            cart.quantity -= 1
            console.log(`INFO: ${cart.name} quantity decreased by one`)
        } else {
            for (let i = 0; i < state.cart.length; i++) {
                if (state.cart[i].name === cart.name) {
                    state.cart.splice(i, 1)
                    break
                }
            }
            console.log(`INFO: ${cart.name} removed from cart`)
        }
        renderCart()
    })
    return removeButton
}

// TODO (#6): Do the maths for the cart
function calculateTotalAmount() {
    let totalAmount = 0
    for (let i = 0; i < state.cart.length; i++) {
        const cartItem = state.cart[i]
        totalAmount += cartItem.price * cartItem.quantity
        console.log(`INFO: Total amount: ${totalAmount}`)
    }
    return totalAmount.toFixed(2)
}

// TODO (#4): Render the cart
function renderCart() {
    const cartItemList = document.querySelector('.cart--item-list')
    cartItemList.innerHTML = ''

    for (let i = 0; i < state.cart.length; i++) {
        const cart = state.cart[i]
        const cartItem = document.createElement('li')

        const cartItemImage = document.createElement('img')
        cartItemImage.src = `assets/icons/${cart.id}.svg`
        cartItemImage.alt = cart.name
        cartItem.appendChild(cartItemImage)

        const cartItemName = document.createElement('p')
        cartItemName.innerText = cart.name[0].toUpperCase() + cart.name.slice(1)
        cartItem.appendChild(cartItemName)

        const itemCount = document.createElement('span')
        itemCount.innerText = cart.quantity

        cartItem.appendChild(removeButton(cart))
        cartItem.appendChild(itemCount)
        cartItem.appendChild(addButton(cart))
        cartItemList.appendChild(cartItem)
    }

    const totalAmount = document.querySelector('.total-number')
    totalAmount.innerText = `£${calculateTotalAmount()}`
}

// TODO (#8): Add sort functionality
// TODO (#7): Add filter buttons to the top of the screen
function createFilter() {
    const filterContainer = document.createElement('div')
    const filterButton = document.createElement('button')
    filterButton.innerText = 'No filter'
    filterButton.addEventListener('click', () => {
        switch (state.filterVariable) {
            case 'Fruit':
                state.filterVariable = 'Berry'
                filterButton.innerText = 'Berry filter'
                break
            case 'Berry':
                state.filterVariable = 'Vegetable'
                filterButton.innerText = 'Vegetable filter'
                break
            case 'Vegetable':
                state.filterVariable = null
                filterButton.innerText = 'No filter'
                break
            default:
                state.filterVariable = 'Fruit'
                filterButton.innerText = 'Fruit filter'
        }
        render()
    })

    const sortButton = document.createElement('button')
    sortButton.innerText = 'Not sorted'
    sortButton.addEventListener('click', () => {
        if (!state.sorted) {
            state.sorted = true
            sortButton.innerText = 'Sorted'
        } else {
            state.sorted = false
            sortButton.innerText = 'Not sorted'
        }
        render()
    })

    const addNewItemButton = document.createElement('button')
    addNewItemButton.innerText = 'Add a new item'
    addNewItemButton.addEventListener('click', () => {
        window.location.assign('/create')
    })

    filterContainer.appendChild(filterButton)
    filterContainer.appendChild(sortButton)
    filterContainer.appendChild(addNewItemButton)
    return filterContainer
}

// TODO (#1): Render the initial state
function render() {
    const storeItemList = document.querySelector('.store--item-list')
    storeItemList.innerHTML = ''

    let filteredItems
    if (state.filterVariable != null) {
        filteredItems = state.items.filter(
            (item) => item.kind === state.filterVariable
        )
    } else {
        filteredItems = state.items
    }

    if (state.sorted) {
        filteredItems = filteredItems.sort((a, b) =>
            a.name.localeCompare(b.name)
        )
    } else {
        filteredItems = filteredItems.sort((a, b) => a.id.localeCompare(b.id))
    }

    for (let i = 0; i < filteredItems.length; i++) {
        const item = filteredItems[i]
        const listItem = document.createElement('li')

        const itemName = document.createElement('p')
        itemName.innerText = item.name[0].toUpperCase() + item.name.slice(1)
        listItem.appendChild(createItemImage(item))
        listItem.appendChild(itemName)
        listItem.appendChild(createAddToCartButton(item, state.cart))
        storeItemList.appendChild(listItem)
    }
}

// TODO (#2): Load the initial state
document.addEventListener('DOMContentLoaded', () => {
    const storeItemList = document.querySelector('.store--item-list')
    storeItemList.before(createFilter(), storeItemList)
    render()
    renderCart()
})
