// ADD EVENT LISTENER TO FIND OUR RENDERED CLASSES AND BUTTON ON PAGE LOAD
window.addEventListener('DOMContentLoaded', runPageFunctions)

// RUN PAGE FUNCTIONS ON LOAD
function runPageFunctions() {
    // CREATE LOCAL STORAGE []
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", '[]')
    }

    const productBtns = document.querySelectorAll('.product-button')
    for (let i = 0; i < productBtns.length; i++) {
        const element = productBtns[i];
        element.addEventListener('click', addToCart)
    }

    const removeCartBtn = document.querySelectorAll('.remove-cart-btn')
    for (let i = 0; i < removeCartBtn.length; i++) {
        const element = removeCartBtn[i];
        element.addEventListener('click', () => {
            cartInLocal.splice(i, 1)
            localStorage.setItem("cart", JSON.stringify(cartInLocal))
            window.location.reload()
        })
    }

    let totalCartPrice = document.querySelector('.total-cart-price')
    let itemAmounts = document.querySelectorAll('.cart-item-amount')

    // START FROM ZERO
    let accumTotal = 0

    // FIND ITEM AMOUNT
    for (let i = 0; i < itemAmounts.length; i++) {

        // GET TEXT CONTENT
        const element = itemAmounts[i].textContent;

        // REMOVE $ AND TURN INTO NUMBER
        let makeNumber = parseFloat(element.replace("$",""))

        // ADD EACH ITEM AMOUNT TO VAIABLE
        accumTotal += makeNumber
    }

    // IF TOTAL PRICE EXISTS IN OUR HTML UPDATE DOM WITH TOTAL AMOUNTS ADDED UP
    totalCartPrice ? totalCartPrice.textContent = `$${accumTotal}` : false

}


// FIND ELEMENT AND ADD TO CART
function addToCart(event) {
    let parent = event.target.parentElement

    // FIND NAME
    let itemName = parent.querySelector('h3').textContent

    // FIND IMAGE SOURCE
    let itemImgSrc = parent.querySelector('img').src

    // FIND PRICE
    let itemPrice = parent.querySelector('p').textContent


    // CREATE NEW OBJECT
    let newCartOBJ = {
        item: itemName,
        imgSrc: itemImgSrc,
        price: itemPrice
    }

    
    // GET LOCAL STORAGE ARRAY
    let cartInLocal = JSON.parse(localStorage.getItem("cart"))
    
    // ADD NEW OBJECT TO LOCAL STORAGE
    cartInLocal.push(newCartOBJ)
    localStorage.setItem("cart", JSON.stringify(cartInLocal))
}


let cartInLocal = JSON.parse(localStorage.getItem("cart"))

// FIND HTML ELEMENT AND RENDER FROM LOCAL STORAGE
let displayLocal = document.querySelector('.cart-section')
displayLocal ?
    cartInLocal === null || (! typeof localStorage.cart[0]) === "string" || cartInLocal.length === 0 ?
        displayLocal.textContent = ("Your Cart Is Empty").toUpperCase() :
        cartInLocal.forEach((item, index) => {
            let itemHTML =
                `<div class="cart-item" id=${index}>
                    
                    <img class="cart-image" src=${item.imgSrc}>

                    <div class="cart-details">
                        <div class="cart-item-name">
                            ${item.item}
                        </div>
                        <div class="cart-item-total">
                            <span class="cart-total">Total</span>
                            <span class="cart-item-amount">${item.price}</span>
                        </div>

                        <button class="remove-cart-btn">Remove</button>
                    </div>
                </div>`
            displayLocal ? displayLocal.innerHTML += itemHTML : false
        }) : false

