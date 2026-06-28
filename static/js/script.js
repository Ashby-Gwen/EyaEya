// --- NAVBAR SCROLL EFFECT ---
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// --- MODAL LOGIC FOR BUY BUTTONS ---
const modal = document.getElementById("contactModal");
const selectedItemText = document.getElementById("selectedItem");

// This function needs to be globally available so the dynamically generated buttons can trigger it
window.openModal = function (itemName) {
    selectedItemText.innerText = itemName;

    // 💡 Create the copy-paste order template message
    const orderMessage = `Hello EyaEya! I would like to purchase the following item:\n\n` +
        `Product: ${itemName}\n\n` +
        `Please send me details on payment and shipping. Thank you!`;

    // Inject the message into the text area inside the modal
    document.getElementById("orderTemplate").value = orderMessage;

    // Reset the copy button text back to default in case it was clicked before
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.innerText = "📋 Copy Message";
    copyBtn.style.backgroundColor = "var(--muted-pink)";

    modal.style.display = "flex";
}

// function to handle the one-click copy behavior
window.copyToClipboard = function () {
    const textEl = document.getElementById("orderTemplate");
    const copyBtn = document.getElementById("copyBtn");

    // Select and copy the text
    textEl.select();
    textEl.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(textEl.value);

    // Visual UX Feedback: Change button color & text to show it worked!
    copyBtn.innerText = "✅ Copied!";
    copyBtn.style.backgroundColor = "#34a853"; // Changes to green
    copyBtn.style.color = "#ffffff";
}


window.closeModal = function () {
    modal.style.display = "none";
}

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// --- DYNAMICALLY LOAD PRODUCTS FROM JSON ---
document.addEventListener("DOMContentLoaded", () => {

    // Fetch the data from our new JSON file
    fetch("../json/products.json")
        .then(response => {
            if (!response.ok) throw new Error("Could not load products.json");
            return response.json();
        })
        .then(data => {
            // Load Women's Bags
            const womenGrid = document.getElementById("women-grid");
            data.women.forEach(product => {
                womenGrid.innerHTML += createProductCard(product);
            });

            // Load Men's Bags
            const menGrid = document.getElementById("men-grid");
            data.men.forEach(product => {
                menGrid.innerHTML += createProductCard(product);
            });
        })
        .catch(error => console.error("Error loading products:", error));
});

// Helper function to generate the HTML for a single product card
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.source}" alt="${product.h3}" class="product-img">
            <div class="product-details">
                <h3>${product.h3}</h3>
                <p class="price">${product.price}</p>
                <button class="buy-btn" onclick="openModal('${product.h3}')">Buy Now</button>
            </div>
        </div>
    `;

    // clicking this will also display a copy and paste message so that the viewer/customer can just paste it to the Seller
}
