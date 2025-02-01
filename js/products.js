const currentCurrency = Currency.getCurrency();

// Завантаження даних із JSON і відображення карток
fetch('data/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Помилка завантаження JSON');
    }
    return response.json();
  })
  .then(products => {
    const container = document.getElementById('product-grid');
    products.forEach(product => {
      const currencySymbol = currentCurrency == "UA"
        ? "грн"
        : "$";

      const currentPrice = currentCurrency == "UA"
        ? product.priceUAH
        : product.priceUSD;

      const currentFinalPrice = currentCurrency == "UA"
        ? currentPrice - product.discountUAH
        : currentPrice - product.discountUSD;

      // Умови для наявності товару
      let priceHTML = '';
      let buttonHTML = '';

      let priceClass = "";
      if (product.availability === 'Немає в наявності') {
        priceClass = "faded";
      } else if (!product.discountUAH) {
        priceClass = "no-discount";
      }

      if (product.discountUAH > 0) {
        priceHTML += `
          <p class="discount" data-uah="${product.priceUAH}" data-usd="${product.priceUSD}">
            ${currentPrice} ${currencySymbol}
          </p>
        `;
      }

      priceHTML += `
        <p class="price ${priceClass}" data-uah="${product.priceUAH - product.discountUAH}" data-usd="${product.priceUSD - product.discountUSD}">
          ${currentFinalPrice} ${currencySymbol}
        </p>
      `;

      if (product.availability === 'Немає в наявності') {
        buttonHTML = '<button class="reserve">Забронювати</button>';
      } else {
        buttonHTML = '<button class="add-to-cart--js">Додати в кошик</button>';
      }

      // Створення картки товару
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.setAttribute('data-id', product.id); // Додаємо data-id
      productCard.innerHTML = `
        <img src="images/${product.image}" alt="${product.name}">
        <div class="details">
          <h3 class="name">${product.name}</h3>
          <p class="availability ${product.availability === 'В наявності' ? 'in-stock' : 'out-of-stock'}">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="solid">
            <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
            <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
            </svg>${product.availability}
          </p>
          ${priceHTML}
        </div>
        ${buttonHTML}
      `;
      container.appendChild(productCard);
    });

    // Ініціалізація функціоналу для кнопок "Додати в кошик"
    initAddToCart();
  })
  .catch(error => {
    console.error('Помилка:', error.message);
  });

// Логіка для перемикання валют
const currencySwitch = document.getElementById('currency-switch');

document.addEventListener('DOMContentLoaded', () => {
  // Якщо валюта не збережена, встановлюємо за замовчуванням 'UA'
  if (!localStorage.getItem('currency')) {
    setCurrency('UA');
  }

  // Отримуємо збережену валюту
  const savedCurrency = currentCurrency;

  const curencySwitch = document.getElementById("currency-switch");
  curencySwitch.innerHTML = savedCurrency;
});

currencySwitch.addEventListener('click', () => {
  // Перевіряємо поточну валюту
  const isUAH = currencySwitch.textContent === 'UA';
  const newCurrency = isUAH ? 'USD' : 'UA';
  currencySwitch.textContent = newCurrency; // Змінюємо текст кнопки

  // Зберігаємо валюту в Local Storage
  setCurrency(newCurrency); // Використовуємо функцію з storage.js

  // Оновлюємо ціни на сторінці
  updatePrices(newCurrency);
});