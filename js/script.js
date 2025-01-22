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
        // Якщо товару немає в наявності
        priceHTML = `
          <p class="price faded" data-uah="${product.priceUAH}" data-usd="${product.priceUSD}">
            ${product.priceUAH} грн
          </p>`;
        buttonHTML = '<button class="reserve">Забронювати</button>';
      } else if (product.discountUAH > 0) {
        // Якщо товар є в наявності і є знижка
        priceHTML = `
          <p class="discount" data-uah="${product.priceUAH}" data-usd="${product.priceUSD}">
            ${product.priceUAH} грн
          </p>
          <p class="price" data-uah="${finalPriceUAH}" data-usd="${finalPriceUSD}">
            ${finalPriceUAH} грн
          </p>`;
        buttonHTML = '<button>Додати в кошик</button>';
      } else {
        // Якщо товар є в наявності і знижки немає
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
            <i class="fa-solid fa-truck"></i> ${product.availability}
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
document.getElementById('currency-switch').addEventListener('click', () => {
  const prices = document.querySelectorAll('.price');
  const discountPrices = document.querySelectorAll('.discount');

  // Перевіряємо, яка валюта зараз активна (UAH або USD)
  const isUAH = prices[0].textContent.includes('грн');

  // Оновлюємо ціни
  prices.forEach(priceEl => {
    const priceUAH = priceEl.dataset.uah;
    const priceUSD = priceEl.dataset.usd;

    // Оновлюємо ціну незалежно від стану
    priceEl.textContent = isUAH ? `${priceUSD} $` : `${priceUAH} грн`;
  });

  // Оновлюємо старі ціни
  discountPrices.forEach(discountEl => {
    const discountUAH = discountEl.dataset.uah;
    const discountUSD = discountEl.dataset.usd;

    // Перемикаємо між UAH та USD
    discountEl.textContent = isUAH ? `${discountUSD} $` : `${discountUAH} грн`;
  });
});

// Логіка для перемикання валют
document.getElementById('currency-switch').addEventListener('click', () => {
  const prices = document.querySelectorAll('.price');
  const discountPrices = document.querySelectorAll('.discount');

  // Перевіряємо, яка валюта зараз активна (UAH або USD)
  const isUAH = prices[0].textContent.includes('грн');

  // Оновлюємо ціни
  prices.forEach(priceEl => {
    const priceUAH = priceEl.dataset.uah;
    const priceUSD = priceEl.dataset.usd;

    if (priceEl.classList.contains('faded')) {
      // Якщо товару немає в наявності, додаємо "Попередня ціна:"
      priceEl.textContent = isUAH
        ? `Попередня ціна: ${priceUSD} $`
        : `Попередня ціна: ${priceUAH} грн`;
    } else {
      // Звичайне оновлення ціни
      priceEl.textContent = isUAH ? `${priceUSD} $` : `${priceUAH} грн`;
    }
  });

  // Оновлюємо старі ціни
  discountPrices.forEach(discountEl => {
    const discountUAH = discountEl.dataset.uah;
    const discountUSD = discountEl.dataset.usd;

    // Перемикаємо між UAH та USD
    discountEl.textContent = isUAH ? `${discountUSD} $` : `${discountUAH} грн`;
  });
});

// Логіка для перемикання валют
document.getElementById('currency-switch').addEventListener('click', () => {
  const prices = document.querySelectorAll('.price');
  const discountPrices = document.querySelectorAll('.discount');

  // Перевіряємо, яка валюта зараз активна (UAH або USD)
  const isUAH = prices[0].textContent.includes('грн');

  // Оновлюємо ціни
  prices.forEach(priceEl => {
    const priceUAH = priceEl.dataset.uah;
    const priceUSD = priceEl.dataset.usd;

    // Перемикаємо між UAH та USD
    priceEl.textContent = isUAH ? `${priceUSD} $` : `${priceUAH} грн`;
  });

  // Оновлюємо старі ціни
  discountPrices.forEach(discountEl => {
    const discountUAH = discountEl.dataset.uah;
    const discountUSD = discountEl.dataset.usd;

    // Перемикаємо між UAH та USD
    discountEl.textContent = isUAH ? `${discountUSD} $` : `${discountUAH} грн`;
  });
});