
/* Everyday Comfort Tee - Quantity Controls */

const decreaseButton = document.getElementById("decrease-qty");
const increaseButton = document.getElementById("increase-qty");
const quantityDisplay = document.getElementById("quantity-value");

let quantity = 1;

increaseButton.addEventListener("click", function () {
    quantity++;
    quantityDisplay.textContent = quantity;
});

decreaseButton.addEventListener("click", function () {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});

/* Everyday Comfort Tee - Email Ordering */

const orderButton = document.getElementById("order-now");

orderButton.addEventListener("click", function () {
    const selectedSize = document.querySelector(
        'input[name="shirt-size"]:checked'
    ).value;

    const price = 499;
    const total = price * quantity;

    const subject = "Real Deal - Everyday Comfort Tee Order";

    const body =
        "Hello Real Deal!\n\n" +
        "I would like to order:\n\n" +
        "Product: Everyday Comfort Tee\n" +
        "Size: " + selectedSize + "\n" +
        "Quantity: " + quantity + "\n" +
        "Unit Price: PHP " + price + "\n" +
        "Total: PHP " + total + "\n\n" +
        "Thank you!";

    const emailLink =
        "mailto:orders@examplewebsite142.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.location.href = emailLink;
});
