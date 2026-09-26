// =========================================================
// KUDY RESTAURANT
// CART + CHECKOUT SYSTEM
// =========================================================


// =========================================================
// CART DATA
// =========================================================

let cart = JSON.parse(
    localStorage.getItem("kudyCart")
) || [];


// =========================================================
// GET HTML ELEMENTS
// =========================================================

const addButtons =
    document.querySelectorAll(".add-btn");

const cartBox =
    document.querySelector("aside");

const cartButton =
    document.querySelector(".Cart-btn");


// =========================================================
// MAKE SURE CART STRUCTURE EXISTS
// =========================================================

// Your current HTML may not have these elements yet.
// This creates them automatically if they are missing.

let cartItems =
    document.querySelector(".cart-items");

if (!cartItems && cartBox) {

    cartItems =
        document.createElement("div");

    cartItems.className =
        "cart-items";

    cartBox.insertBefore(
        cartItems,
        cartBox.querySelector(".total")
    );
}


let cartTotal =
    document.querySelector(".cart-total");


// If .total exists, create the actual total number
if (!cartTotal && cartBox) {

    const totalElement =
        cartBox.querySelector(".total");

    if (totalElement) {

        totalElement.innerHTML = `
            <span>Total</span>
            <span>
                <span class="cart-total">0</span> Tzs
            </span>
        `;

        cartTotal =
            cartBox.querySelector(".cart-total");
    }
}


const cartCount =
    document.querySelector(".cart-count");

const checkoutButton =
    document.querySelector(".checkout");


// =========================================================
// SAVE CART
// =========================================================

function saveCart() {

    localStorage.setItem(
        "kudyCart",
        JSON.stringify(cart)
    );

}


// =========================================================
// ADD TO CART
// =========================================================

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        // Check whether item already exists
        const existingItem =
            cart.find(
                item => item.name === name
            );


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        // Update everything
        updateCart();


        // Open cart automatically on desktop
       if (cartBox) {

            cartBox.classList.add(
                "cart-open"
            );

}

    });

});


// =========================================================
// UPDATE CHECKOUT BUTTON
// =========================================================

function updateCheckoutButton() {

    if (!checkoutButton) {

        return;
    }


    if (cart.length === 0) {

        // Cart empty
        checkoutButton.disabled = true;

        checkoutButton.setAttribute(
            "aria-disabled",
            "true"
        );

    } else {

        // Cart has items
        checkoutButton.disabled = false;

        checkoutButton.removeAttribute(
            "aria-disabled"
        );

    }

}


// =========================================================
// CHECKOUT BUTTON
// IMPORTANT:
// THIS IS OUTSIDE addButtons.forEach()
// =========================================================

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            // Do nothing if cart is empty
            if (cart.length === 0) {

                return;

            }


            // Go to checkout page
            window.location.href =
                "checkout.html";

        }
    );

}


// =========================================================
// UPDATE CART
// =========================================================

function updateCart() {

    // Make sure cart items container exists
    if (!cartItems) {

        return;

    }


    // Clear previous items
    cartItems.innerHTML = "";


    let total = 0;

    let totalQuantity = 0;


    // =====================================================
    // CREATE CART ITEMS
    // =====================================================

    cart.forEach((item, index) => {

        // Calculate price
        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        totalQuantity += item.quantity;


        // Create item
        const cartItem =
            document.createElement("div");


        cartItem.classList.add(
            "cart-item"
        );


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h5>
                    ${item.name}
                </h5>

                <span>
                    ${item.price.toLocaleString()} Tzs
                </span>

            </div>


            <div class="cart-controls">

                <button
                    class="quantity-btn decrease"
                    data-index="${index}"
                    type="button"
                >
                    -
                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    class="quantity-btn increase"
                    data-index="${index}"
                    type="button"
                >
                    +
                </button>


                <button
                    class="delete-btn"
                    data-index="${index}"
                    type="button"
                    aria-label="Remove ${item.name}"
                >
                    <i class="fa fa-trash"></i>
                </button>

            </div>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    // =====================================================
    // UPDATE CART COUNT
    // =====================================================

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    // =====================================================
    // UPDATE CART TOTAL
    // =====================================================

    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString();

    }


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cart.length === 0) {

        if (cartBox) {

            cartBox.classList.remove(
                "cart-open"
            );

        }

    }


    // =====================================================
    // SAVE
    // =====================================================

    saveCart();


    // =====================================================
    // UPDATE CHECKOUT
    // =====================================================

    updateCheckoutButton();


    // =====================================================
    // RE-ADD CART CONTROLS
    // =====================================================

    addCartControls();

}


// =========================================================
// QUANTITY + DELETE CONTROLS
// =========================================================

function addCartControls() {


    // =====================================================
    // INCREASE
    // =====================================================

    document
        .querySelectorAll(".increase")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (!cart[index]) {

                        return;

                    }


                    cart[index].quantity++;


                    updateCart();

                }
            );

        });


    // =====================================================
    // DECREASE
    // =====================================================

    document
        .querySelectorAll(".decrease")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (!cart[index]) {

                        return;

                    }


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    updateCart();

                }
            );

        });


    // =====================================================
    // DELETE
    // =====================================================

    document
        .querySelectorAll(".delete-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (!cart[index]) {

                        return;

                    }


                    cart.splice(
                        index,
                        1
                    );


                    updateCart();

                }
            );

        });

}


// =========================================================
// CART ICON
// =========================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            if (!cartBox) {

                return;

            }

            cartBox.classList.toggle(
                "cart-open"
            );

        }
    );

}

// =========================================================
// CLOSE CART WHEN CLICKING OUTSIDE
// =========================================================

document.addEventListener(
    "click",
    (event) => {

        if (!cartBox) {

            return;

        }


        // Only apply this behavior on mobile
        if (window.innerWidth > 600) {

            return;

        }


        // If cart is closed, nothing to do
        if (
            !cartBox.classList.contains(
                "cart-open"
            )
        ) {

            return;

        }


        // Don't close when clicking inside cart
        if (
            cartBox.contains(event.target)
        ) {

            return;

        }


        // Don't close when clicking cart icon
        if (
            cartButton &&
            cartButton.contains(event.target)
        ) {

            return;

        }


        // Close cart
        cartBox.classList.remove(
            "cart-open"
        );

    }
);


// =========================================================
// INITIALIZE CART
// =========================================================

updateCart();