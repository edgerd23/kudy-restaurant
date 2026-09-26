// =========================================================
// KUDY RESTAURANT
// CHECKOUT SYSTEM
// =========================================================


// Get cart from localStorage
let cart = JSON.parse(
    localStorage.getItem("kudyCart")
) || [];


// Get elements
const checkoutItems =
    document.getElementById("checkout-items");

const emptyCheckout =
    document.getElementById("empty-checkout");

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("checkout-total");

const itemCountElement =
    document.getElementById("item-count");

const placeOrderButton =
    document.getElementById("place-order");


// =========================================================
// RENDER CHECKOUT
// =========================================================

function renderCheckout() {

    checkoutItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        emptyCheckout.classList.add("show");

        placeOrderButton.disabled = true;

        subtotalElement.textContent = "0";

        totalElement.textContent = "0";

        itemCountElement.textContent = "0 items";

        return;
    }


    // Hide empty message
    emptyCheckout.classList.remove("show");


    // Enable button
    placeOrderButton.disabled = false;


    let subtotal = 0;

    let totalQuantity = 0;


    // Create order items
    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        subtotal += itemTotal;

        totalQuantity += item.quantity;


        const itemElement =
            document.createElement("div");


        itemElement.classList.add(
            "checkout-item"
        );


        itemElement.innerHTML = `

            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.quantity}
                    ×
                    ${item.price.toLocaleString()} Tzs
                </p>

            </div>


            <div class="checkout-item-price">

                ${itemTotal.toLocaleString()} Tzs

            </div>

        `;


        checkoutItems.appendChild(
            itemElement
        );

    });


    // Update totals
    subtotalElement.textContent =
        subtotal.toLocaleString();


    totalElement.textContent =
        subtotal.toLocaleString();


    itemCountElement.textContent =
        `${totalQuantity} ${
            totalQuantity === 1
                ? "item"
                : "items"
        }`;

}


// =========================================================
// PLACE ORDER
// =========================================================

placeOrderButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            return;
        }


        alert(
            "Your order has been received! Thank you for choosing Kudy Restaurant."
        );


        // Clear cart after order
        localStorage.removeItem("kudyCart");


        cart = [];


        renderCheckout();

    }
);

// =========================================================
// INITIALIZE
// =========================================================

renderCheckout();