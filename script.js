
/* =====================================
   VELORA LUXE - SCRIPT.JS
   Luxury Shopping Website
===================================== */

// 1. SELECT HTML ELEMENTS
const searchInput = document.querySelector("#searchInput");
const productCards = document.querySelectorAll(".product-card");

const cartBtn = document.querySelector("#cartBtn");
const cartModal = document.querySelector("#cartModal");
const closeCart = document.querySelector("#closeCart");

const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const clearCartBtn = document.querySelector("#clearCart");

const loginBtn = document.querySelector("#loginBtn");
const loginModal = document.querySelector("#loginModal");
const closeLogin = document.querySelector("#closeLogin");
const loginForm = document.querySelector("#loginForm");

const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

// 2. SHOPPING CART
let cart = [];

// ADD PRODUCT TO CART
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", () => {

        const productCard = button.closest(".product-card");

        if (!productCard) return;

        const productName =
            productCard.querySelector(".product-name").textContent.trim();

        const priceText =
            productCard.querySelector(".product-price").textContent;

        const productPrice = Number(
            priceText.replace(/[^\d.]/g, "")
        );

        const productImage =
            productCard.querySelector("img")?.src || "";

        const existingItem = cart.find(
            item => item.name === productName
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        renderCart();

        button.textContent = "ADDED ✓";

        setTimeout(() => {
            button.textContent = "ADD TO CART";
        }, 1000);

    });

});

// 3. DISPLAY CART ITEMS
function renderCart() {

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";

    let total = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your bag is currently empty.
            </p>
        `;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("h4");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent =
            "₹" + item.price.toLocaleString("en-IN");

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        details.append(name, price, quantity);

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✕";
        removeBtn.className = "remove-item";
        removeBtn.setAttribute("aria-label", "Remove " + item.name);

        removeBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        cartItem.append(image, details, removeBtn);
        cartItems.appendChild(cartItem);

    });

    cartTotal.textContent = "₹" + total.toLocaleString("en-IN");
    cartCount.textContent = totalQuantity;

}

// 4. OPEN AND CLOSE CART MODAL
if (cartBtn && cartModal) {

    cartBtn.addEventListener("click", () => {
        cartModal.classList.add("active");
    });

}

if (closeCart && cartModal) {

    closeCart.addEventListener("click", () => {
        cartModal.classList.remove("active");
    });

}

// CLOSE CART BY CLICKING OUTSIDE
if (cartModal) {

    cartModal.addEventListener("click", event => {

        if (event.target === cartModal) {
            cartModal.classList.remove("active");
        }

    });

}

// 5. CLEAR CART
if (clearCartBtn) {

    clearCartBtn.addEventListener("click", () => {

        cart = [];
        renderCart();

    });

}

// 6. PRODUCT SEARCH
if (searchInput) {

    searchInput.addEventListener("input", () => {

        const searchTerm = searchInput.value
            .toLowerCase()
            .trim();

        productCards.forEach(card => {

            const productName =
                card.querySelector(".product-name")
                    ?.textContent.toLowerCase() || "";

            const category =
                card.dataset.category?.toLowerCase() || "";

            const matches =
                productName.includes(searchTerm) ||
                category.includes(searchTerm);

            card.style.display = matches ? "" : "none";

        });

    });

}

// 7. LOGIN MODAL
if (loginBtn && loginModal) {

    loginBtn.addEventListener("click", () => {
        loginModal.classList.add("active");
    });

}

if (closeLogin && loginModal) {

    closeLogin.addEventListener("click", () => {
        loginModal.classList.remove("active");
    });

}

// CLOSE LOGIN BY CLICKING OUTSIDE
if (loginModal) {

    loginModal.addEventListener("click", event => {

        if (event.target === loginModal) {
            loginModal.classList.remove("active");
        }

    });

}

// 8. LOGIN FORM DEMO
if (loginForm) {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = loginForm.querySelector(
            'input[type="email"]'
        );

        const password = loginForm.querySelector(
            'input[type="password"]'
        );

        if (!email || !password) {
            alert("Please add email and password fields.");
            return;
        }

        if (!email.value.trim() || !password.value) {
            alert("Please fill in all fields.");
            return;
        }

        alert("Demo login successful! Welcome to VELORA LUXE.");

        loginForm.reset();

        loginModal.classList.remove("active");

    });

}

// 9. MOBILE NAVIGATION MENU
if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuBtn.setAttribute("aria-expanded", String(isOpen));

    });

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

        });

    });

}

// 10. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}

// 11. CLOSE MODALS WITH ESCAPE KEY
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        cartModal?.classList.remove("active");
        loginModal?.classList.remove("active");

    }

});

// INITIAL CART DISPLAY
renderCart();

console.log("VELORA LUXE website is ready!");
