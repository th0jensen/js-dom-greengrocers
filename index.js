const state = {
    items: [
        {
            id: '001-beetroot',
            name: 'beetroot',
            price: 0.35,
        },
        {
            id: '002-carrot',
            name: 'carrot',
            price: 0.35,
        },
        {
            id: '003-apple',
            name: 'apple',
            price: 0.35,
        },
        {
            id: '004-apricot',
            name: 'apricot',
            price: 0.35,
        },
        {
            id: '005-avocado',
            name: 'avocado',
            price: 0.35,
        },
        {
            id: '006-bananas',
            name: 'bananas',
            price: 0.35,
        },
        {
            id: '007-bell-pepper',
            name: 'bell pepper',
            price: 0.35,
        },
        {
            id: '008-berry',
            name: 'berry',
            price: 0.35,
        },
        {
            id: '009-blueberry',
            name: 'blueberry',
            price: 0.35,
        },
        {
            id: '010-eggplant',
            name: 'eggplant',
            price: 0.35,
        },
    ],
    cart: [],
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
            state.cart.splice(cart, 1)
            console.log(`INFO: ${cart.name} removed from cart`)
        }
        renderCart()
    })
    return removeButton
}

// TODO (#6): Do the maths for the cart
function calculateTotalAmount() {
    let totalAmount = 0
    for (i = 0; i < state.cart.length; i++) {
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

    for (i = 0; i < state.cart.length; i++) {
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

// TODO (#1): Render the initial state
function render() {
    const storeItemList = document.querySelector('.store--item-list')
    storeItemList.innerHTML = ''

    for (i = 0; i < state.items.length; i++) {
        const item = state.items[i]
        const listItem = document.createElement('li')
        listItem.appendChild(createItemImage(item))
        listItem.appendChild(createAddToCartButton(item, state.cart))
        storeItemList.appendChild(listItem)
    }
}

// TODO (#2): Load the initial state
document.addEventListener('DOMContentLoaded', () => {
    render()
    renderCart()
})
