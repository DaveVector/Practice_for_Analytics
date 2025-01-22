// Завантаження даних із JSON
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
      // Розрахунок ціни зі знижкою
      const finalPriceUAH = product.priceUAH - product.discountUAH;
      const finalPriceUSD = product.priceUSD - product.discountUSD;

      // Умови для наявності товару
      let priceHTML = '';
      let buttonHTML = '';

      if (product.availability === 'Немає в наявності') {
        priceHTML = `
          <p class="price faded" data-uah="${product.priceUAH}" data-usd="${product.priceUSD}">
            ${product.priceUAH} грн
          </p>`;
        buttonHTML = '<button class="reserve">Забронювати</button>';
      } else if (product.discountUAH > 0) {
        priceHTML = `
          <p class="discount" data-uah="${product.priceUAH}" data-usd="${product.priceUSD}">
            ${product.priceUAH} грн
          </p>
          <p class="price" data-uah="${finalPriceUAH}" data-usd="${finalPriceUSD}">
            ${finalPriceUAH} грн
          </p>`;
        buttonHTML = '<button>Додати в кошик</button>';
      } else {
        priceHTML = `
          <p class="price no-discount" data-uah="${product.priceUAH}" data-usd="${product.priceUSD}">
            ${product.priceUAH} грн
          </p>`;
        buttonHTML = '<button>Додати в кошик</button>';
      }

      // Створення картки товару
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
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
  })
  .catch(error => {
    console.error('Помилка:', error.message);
  });

// Логіка для перемикання валют
const currencySwitch = document.getElementById('currency-switch');

currencySwitch.addEventListener('click', () => {
  // Перевіряємо поточну валюту
  const isUAH = currencySwitch.textContent === 'UA';
  const newCurrency = isUAH ? 'USD' : 'UA';
  currencySwitch.textContent = newCurrency; // Змінюємо текст кнопки

  // Оновлюємо ціни на сторінці
  const prices = document.querySelectorAll('.price, .discount');
  prices.forEach(priceEl => {
    const priceUAH = priceEl.dataset.uah;
    const priceUSD = priceEl.dataset.usd;

    // Відображаємо ціну залежно від обраної валюти
    priceEl.textContent = newCurrency === 'USD'
      ? `${priceUSD} $`
      : `${priceUAH} грн`;
  });
});