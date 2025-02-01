// === Модуль "Cart" ===
const Cart = (() => {
  // === Приватні методи ===
  const getCartFromStorage = () => JSON.parse(localStorage.getItem('cart')) || {};
  const saveCartToStorage = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

  // === Публічні методи ===
  return {
    // Отримання кошика
    getCart: () => getCartFromStorage(),

    // Оновлення лічильника товарів у кошику
    updateCartCount: () => {
      const cart = getCartFromStorage();
      const totalCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
      const cartCountElement = document.getElementById('cart-count');

      if (cartCountElement) {
        cartCountElement.textContent = totalCount;
        cartCountElement.classList.toggle("hidden", totalCount === 0);
      }
    },

    // Додавання товару до кошика
    addToCart: (id) => {
      if (!id) return console.error('ID товару не вказано.');

      const cart = getCartFromStorage();
      cart[id] = (cart[id] || 0) + 1;
      saveCartToStorage(cart);
      Cart.updateCartCount();
      console.log(`Товар із id ${id} додано. Поточний кошик:`, cart);

      Cart.customEventGTM(id);
    },

    customEventGTM: (id) => {
      // Створюємо змінні для Data Layer
      const product = document.querySelector(`.product-card[data-id="${id}"]`)
      const productName = product?.querySelector(".name")?.textContent || "Unknown Product"; // Створюємо змінну "Ім'я товару"
      const productPrice = product?.querySelector(".price")?.textContent.replace(/\D/g, '') || 0; // Створюємо змінну "Ціна товару"
      const productCurrency = Currency.getCurrency(); // Створюємо змінну "Валюта"
      

      // === Передача даних у Data Layer ===
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'add_to_cart', // Назва івенту
        items: [{
          name: productName, // Ім'я товару
          value: productPrice, // Ціна товару
          currency: productCurrency, // Валюта
        }],
      });

      // Відстеження івенту
      console.log('Data Layer:', window.dataLayer);
    },

    // Зменшення кількості товару
    decreaseItemQuantity: (id) => {
      if (!id) return console.error('ID товару не вказано.');

      const cart = getCartFromStorage();
      if (cart[id]) {
        cart[id] -= 1;
        if (cart[id] <= 0) delete cart[id];
        saveCartToStorage(cart);
        Cart.updateCartCount();
        console.log(`Кількість товару із id ${id} зменшено. Поточний кошик:`, cart);
      } else {
        console.log(`Товар із id ${id} не знайдено в кошику.`);
      }
    },

    // Видалення товару з кошика
    removeFromCart: (id) => {
      if (!id) return console.error('ID товару не вказано.');

      const cart = getCartFromStorage();
      if (cart[id]) {
        delete cart[id];
        saveCartToStorage(cart);
        Cart.updateCartCount();
        console.log(`Товар із id ${id} видалено. Поточний кошик:`, cart);
      } else {
        console.log(`Товар із id ${id} не знайдено в кошику.`);
      }
    },

    // Очищення кошика
    clearCart: () => {
      localStorage.removeItem('cart');
      Cart.updateCartCount();
      console.log('Кошик очищено.');
    },
  };
})();

// === Модуль "Currency" ===
const Currency = (() => {
  // === Публічні методи ===
  return {
    // Збереження обраної валюти в Local Storage
    setCurrency: (currency) => {
      if (!currency) return console.error('Валюта не вказана.');
      localStorage.setItem('currency', currency);
    },

    // Отримання обраної валюти з Local Storage
    getCurrency: () => localStorage.getItem('currency') || 'UA',

    // Оновлення цін на сторінці
    updatePrices: (currency) => {
      const prices = document.querySelectorAll('.price, .discount');
      prices.forEach(priceEl => {
        const priceUAH = priceEl.dataset.uah;
        const priceUSD = priceEl.dataset.usd;
        priceEl.textContent = currency === 'USD'
          ? `${priceUSD} $`
          : `${priceUAH} грн`;
      });
    },
  };
})();

// === Ініціалізація функціоналу кнопок "Додати в кошик" ===
function initAddToCart() {
  document.querySelectorAll(".product-card .add-to-cart--js").forEach(button => {
    button.addEventListener("click", () => {
      const productId = button.closest(".product-card")?.dataset.id;
      if (productId) Cart.addToCart(productId);
    });
  });
}

// === Ініціалізація ===
document.addEventListener("DOMContentLoaded", () => {
  Cart.updateCartCount(); // Оновлюємо лічильник при завантаженні сторінки
  initAddToCart(); // Ініціалізуємо кнопки "Додати в кошик"
});