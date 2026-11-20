/* Real Deal | Solo product pages (based on Mariel's Everyday Comfort
   Tee script, now shared by all three product pages)
   - Quantity stepper (1 to 10)
   - Order Now opens the visitor's email app with the t-shirt
     details already written, addressed to the orders email.
   Bootstrap 6 has no global "bootstrap" object, so this script
   does not depend on it. */

(function () {
  const ORDER_EMAIL = "orders@examplewebsite142.com";
  const MIN_QTY = 1;
  const MAX_QTY = 10;

  const form = document.getElementById("order-form");
  if (!form) return;

  // Product name and price come from the form's data attributes,
  // so this one script works on every product page.
  const productName = form.dataset.product;
  const price = Number(form.dataset.price);

  function peso(amount) {
    return "₱" + amount.toLocaleString("en-PH");
  }

  /* ---------- Quantity stepper ---------- */
  const qtyInput = document.getElementById("qty");
  const minusButton = form.querySelector('[data-step="-1"]');
  const plusButton = form.querySelector('[data-step="1"]');

  function setQuantity(value) {
    let qty = Number.isFinite(value) ? Math.round(value) : MIN_QTY;
    qty = Math.min(MAX_QTY, Math.max(MIN_QTY, qty));
    qtyInput.value = qty;
    minusButton.disabled = qty <= MIN_QTY;
    plusButton.disabled = qty >= MAX_QTY;
  }

  form.querySelectorAll("[data-step]").forEach(function (button) {
    button.addEventListener("click", function () {
      setQuantity(Number(qtyInput.value) + Number(button.dataset.step));
    });
  });

  qtyInput.addEventListener("change", function () {
    setQuantity(Number(qtyInput.value));
  });

  setQuantity(Number(qtyInput.value));

  /* ---------- Feedback message ---------- */
  const toast = document.getElementById("order-toast");
  let toastTimer;

  function showMessage(text) {
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 6000);
  }

  /* ---------- Order Now: open the email app ---------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const size = form.querySelector('input[name="size"]:checked');
    if (!size) {
      showMessage("Please choose a size first.");
      form.querySelector('input[name="size"]').focus();
      return;
    }

    const qty = Number(qtyInput.value);
    const total = price * qty;

    const subject = "Order: " + productName + " (Size " + size.value + ", Qty " + qty + ")";
    const body = [
      "Hello Real Deal,",
      "",
      "I would like to order:",
      "",
      "Product: " + productName,
      "Size: " + size.value,
      "Quantity: " + qty,
      "Price: " + peso(price) + " each",
      "Total: " + peso(total),
      "",
      "Name: ",
      "Delivery address: ",
      "Contact number: ",
      "",
      "Thank you!"
    ].join("\r\n");

    const mailtoLink =
      "mailto:" + ORDER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;

    showMessage(
      "Opening your email app with your order for " + qty + " × " + productName +
      " (" + size.value + "). If nothing opens, email us at " + ORDER_EMAIL + "."
    );
  });
})();
