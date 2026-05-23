const products = [
    { 
        id: 1,
        name: "ເນື້ອຝອຍ 1Kg",
        en: "Shredded Coconut Meat",
        price: 80000,
        image: "1.png.jpeg"
    },

    { 
        id: 2,
        name: "ນໍ້າຫມາກພ້າວ 1L",
        en: "Coconut Water 1ML",
        price: 50000,
        image: "2.png.jpeg"
    },

    { 
        id: 3,
        name: "ເນື້ອເສັ້ນ 1Kg",
        en: "Sliced Coconut Meat Strips",
        price: 80000,
        image: "3.png.jpeg"
    },

    { 
        id: 4,
        name: "ນໍ້າຫມາກພ້າວຈອກ 250ML",
        en: "Coconut Water Cup 250ML",
        price: 25000,
        image: "4.png.jpeg"
    },

    { 
        id: 5,
        name: "ວຸ້ນໝາກພ້າວ ",
        en: "Coconut Jelly",
        price: 25000,
        image: "5.png.jpeg"
    },

    { 
        id: 6,
        name: "ນໍ້າຫມາກພ້າວອັດກະປ໋ອງ 370ML",
        en: "Canned Coconut Water 370ML",
        price: 28000,
        image: "6.png.jpeg"
    },

    { 
        id: 7,
        name: "ນໍ້າຫມາກພ້າວອັດກະປ໋ອງ 250ML",
        en: "Canned Coconut Water 250ML",
        price: 19000,
        image: "7.png.jpeg"
    },

    { 
        id: 8,
        name: "ນ້ຳໝາກພ້າວຕຸກ 250ML",
        en: "Bottled Coconut Water",
        price: 25000,
        image: "8.png.jpeg"
    },

    { 
        id: 9,
        name: "ເນື້ອລິ້ວ 1Kg",
        en: "Ribbon Cut Coconut Meat",
        price: 80000,
        image: "9.png.jpeg"
    },

    { 
        id: 10,
        name: "ເນື້ອເບົ້າ 1kg",
        en: "Half-Shell Coconut Meat",
        price: 80000,
        image: "10.png.jpeg"
    },

    { 
        id: 11,
        name: "ເຊັດລວມເນື້ອຫມາກພ້າວ 1Kg",
        en: "Mixed Coconut Meat Set",
        price: 220000,
        image: "11.png.jpeg"
    },

    { 
        id: 12,
        name: "ເນື້ອເບົ້າ 1Kg",
        en: "Half-Shell Coconut Meat",
        price: 80000,
        image: "12.png.jpeg"
    }
];


let cart = [];
let discountPercent = 0;

function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>
    ${product.name}
    <span>${product.en}</span>
</h3>
                <p>${product.price.toLocaleString()} ກີບ</p>
                <button class="btn-add" onclick="addToCart(${product.id})">ເພີ່ມລົງກະຕ່າ</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const exist = cart.find(item => item.id === id);
    
    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalCount = document.getElementById('total-count');
    const totalPrice = document.getElementById('total-price');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let count = 0;
    let subtotal = 0;
    
    cart.forEach(item => {
        count += item.quantity;
        subtotal += item.price * item.quantity;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.price.toLocaleString()} x ${item.quantity}</small>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">ລຶບລາຍການ</button>
            </div>
        `;
    });
    
    let discountAmount = (subtotal * discountPercent) / 100;
    let finalTotal = subtotal - discountAmount;
    
    if (totalCount) totalCount.innerText = count;
    if (totalPrice) totalPrice.innerText = finalTotal.toLocaleString();
}

function applyDiscount(event) {
    if (event) event.preventDefault();

    const codeInput = document.getElementById('coupon-code-input');
    const msg = document.getElementById('discount-msg');
    
    if (!codeInput) return;
    const code = codeInput.value.trim();
    
    if (code === 'LAO2024') {
        discountPercent = 5;
        if (msg) {
            msg.innerText = "ຫຼຸດລາຄາ 5% ສຳເລັດ!";
            msg.style.color = "green";
        }
    } else {
        discountPercent = 0;
        if (msg) {
            msg.innerText = "ລະຫັດບໍ່ຖືກຕ້ອງ";
            msg.style.color = "red";
        }
    }
    updateCart();
}

function handleCheckout(event) {
    if (event) event.preventDefault();
    
    if (cart.length === 0) {
        alert('ກະລຸນາເລືອກສິນຄ້າລົງກະຕ່າກ່ອນ!');
        return;
    }
    
    const customerNameInput = document.getElementById('customer-name');
    const customerTelInput = document.getElementById('customer-tel');
    
    const customerName = customerNameInput ? customerNameInput.value : "ລູກຄ້າທົ່ວໄປ";
    const customerTel = customerTelInput ? customerTelInput.value : "ບໍ່ລະບຸ";
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = (subtotal * discountPercent) / 100;
    let finalTotal = subtotal - discountAmount;

    const orderData = {
        date: new Date().toLocaleDateString('lo-LA') + ' ' + new Date().toLocaleTimeString('lo-LA'),
        customerName: customerName,
        customerTel: customerTel,
        items: cart,
        discount: discountPercent,
        total: finalTotal
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    window.open('receipt.html', '_blank');
}

window.onload = function() {
    displayProducts();
};