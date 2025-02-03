// Функція для завантаження товарів з products.json
const loadProducts = async () => {
  try {
    const response = await fetch("data/products.json");
    if (!response.ok) throw new Error("Помилка завантаження JSON");
    const products = await response.json();
    console.log("Завантажені товари:", products); // Логування завантажених товарів
    return products;
  } catch (error) {
    console.error("Помилка:", error.message);
    return [];
  }
};

document.addEventListener("DOMContentLoaded", () => {
    const cartGrid = document.getElementById("cart-grid");
    const cartTotalContainer = document.getElementById("cart-total-container");
  
    // Функція для відображення товарів у кошику
    const renderCart = async () => {
      const cart = Cart.getCart(); // Отримуємо кошик з localStorage
      const products = await loadProducts(); // Завантажуємо всі товари
  
      // Очищаємо попередній вміст кошика
      cartGrid.innerHTML = "";
  
      let totalSum = 0;
  
      for (const [id, quantity] of Object.entries(cart)) {
        const product = products.find((p) => p.id === parseInt(id));
        if (!product) continue; // Пропускаємо, якщо товар не знайдено
  
        const priceWithoutDiscount =
          Currency.getCurrency() === "UA"
            ? product.priceUAH
            : product.priceUSD;
  
        const priceWithDiscount =
          Currency.getCurrency() === "UA"
            ? product.priceUAH - product.discountUAH
            : product.priceUSD - product.discountUSD;
  
        const totalPriceWithoutDiscount = priceWithoutDiscount * quantity;
        const totalPriceWithDiscount = priceWithDiscount * quantity;
        totalSum += totalPriceWithDiscount;
  
        // HTML для ціни
        let priceHTML = ``;
        if (product.discountUAH > 0 || product.discountUSD > 0) {
        priceHTML = `
            <div class="price-container">
            <span class="discounted-price">${formatPrice(totalPriceWithoutDiscount)} ${
            Currency.getCurrency() === "UA" ? "грн" : "$"
        }</span>
            <span class="final-price">${formatPrice(totalPriceWithDiscount)} ${
            Currency.getCurrency() === "UA" ? "грн" : "$"
        }</span>
            </div>
        `;
        } else {
        priceHTML = `
            <div class="price-container">
            <span class="final-price">${formatPrice(totalPriceWithDiscount)} ${
            Currency.getCurrency() === "UA" ? "грн" : "$"
        }</span>
            </div>
        `;
        }
  
        // Створюємо HTML для товару
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
        <img src="images/${product.image}" alt="${product.name}">
        <div class="details">
            <h4>${product.name}</h4>
            <div class="quantity">
                <div class="quantity-control">
                    <button class="decrease" data-id="${product.id}">-</button>
                    <span>${quantity}</span>
                    <button class="increase" data-id="${product.id}">+</button>
                </div>
                <button class="remove-item" data-id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="solid">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
        ${priceHTML}
        `;
        cartGrid.appendChild(cartItem);

        // Додаємо обробник подій для кнопки "Видалити"
        cartItem.querySelector(".remove-item").addEventListener("click", () => {
        Cart.removeFromCart(product.id); // Видаляємо товар з кошика
        renderCart(); // Перерендеримо кошик
        });
  
        // Додаємо обробники подій для кнопок зміни кількості
        cartItem.querySelector(".increase").addEventListener("click", () => {
          Cart.addToCart(product.id);
          renderCart(); // Перерендеримо кошик
        });
  
        cartItem.querySelector(".decrease").addEventListener("click", () => {
          Cart.decreaseItemQuantity(product.id);
          renderCart(); // Перерендеримо кошик
        });
  
        // Додаємо лінію після кожного товару (крім останнього)
        if (Object.keys(cart).indexOf(id) !== Object.keys(cart).length - 1) {
          const divider = document.createElement("div");
          divider.className = "cart-divider";
          cartGrid.appendChild(divider);
        }
      }
  
        // Відображення загальної суми
        cartTotalContainer.innerHTML = `
        <div>Загальна сума: 
            <span>${formatPrice(totalSum)} ${
        Currency.getCurrency() === "UA" ? "грн" : "$"
        }</span>
        </div>
        `;
    };

    // Функція для форматування ціни
    const formatPrice = (price) => {
        return price % 1 === 0 ? price.toFixed(0) : price.toFixed(2).replace(/\.?0+$/, '');
    };
  
    // Ініціалізація кошика
    renderCart();
  
    // Обробник подій для перемикання валюти
    const currencySwitch = document.getElementById("currency-switch");
    currencySwitch.addEventListener("click", () => {
      // Перевіряємо поточну валюту
      const isUAH = currencySwitch.textContent === "UA";
      const newCurrency = isUAH ? "USD" : "UA";
      currencySwitch.textContent = newCurrency; // Змінюємо текст кнопки
  
      // Зберігаємо валюту в Local Storage
      Currency.setCurrency(newCurrency);
  
      // Оновлюємо кошик
      renderCart();
    });
  });