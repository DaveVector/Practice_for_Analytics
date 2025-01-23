// === Додавання товару до Local Storage ===
function addToCart(id) {
  // Отримуємо поточний кошик
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Додаємо товар або збільшуємо його кількість
  cart[id] = (cart[id] || 0) + 1;

  // Зберігаємо оновлений кошик
  localStorage.setItem('cart', JSON.stringify(cart));

  // Оновлюємо лічильник
  updateCartCount();

  console.log(`Товар із id ${id} додано до кошика. Поточний кошик:`, cart);
}

// === Оновлення лічильника товарів у кошику ===
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const totalCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = totalCount;

  // Ховаємо або показуємо лічильник залежно від кількості товарів
  if (totalCount === 0) {
    cartCountElement.classList.add("hidden");
  } else {
    cartCountElement.classList.remove("hidden");
  }
}

// Викликаємо функцію при завантаженні сторінки
updateCartCount();

// === Отримання кошика з Local Storage ===
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || {};
}

// === Зменшення кількості товару ===
function decreaseItemQuantity(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Зменшуємо кількість товару, якщо він є
  if (cart[id]) {
    cart[id] -= 1;

    // Видаляємо товар, якщо кількість дорівнює 0
    if (cart[id] <= 0) {
      delete cart[id];
    }

    // Оновлюємо Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    console.log(`Кількість товару із id ${id} зменшено. Поточний кошик:`, cart);
  } else {
    console.log(`Товар із id ${id} не знайдено в кошику.`);
  }
}

// === Видалення товару з кошика ===
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Видаляємо товар, якщо він існує
  if (cart[id]) {
    delete cart[id];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    console.log(`Товар із id ${id} видалено. Поточний кошик:`, cart);
  } else {
    console.log(`Товар із id ${id} не знайдено в кошику.`);
  }
}

// === Очищення кошика ===
function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
  console.log('Кошик очищено');
}

function updatePrices(currency) {
  const prices = document.querySelectorAll('.price, .discount');
  prices.forEach(priceEl => {
    const priceUAH = priceEl.dataset.uah;
    const priceUSD = priceEl.dataset.usd;

    priceEl.textContent = currency === 'USD'
      ? `${priceUSD} $`
      : `${priceUAH} грн`;
  });
}

// Збереження обраної валюти в Local Storage
function setCurrency(currency) {
  localStorage.setItem('currency', currency);
}

// Отримання обраної валюти з Local Storage
function getCurrency() {
  return localStorage.getItem('currency') || 'UA'; // 'UA' за замовчуванням
}


// === Ініціалізація функціоналу кнопок "Додати в кошик" ===
function initAddToCart() {
  document.querySelectorAll(".product-card .add-to-cart--js").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.closest(".product-card")?.dataset.id;
      addToCart(productId);
    });
  });
}