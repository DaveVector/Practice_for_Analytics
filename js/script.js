// Завантаження даних із JSON
fetch('data/products.json') // Шлях до JSON-файлу
  .then(response => {
    if (!response.ok) {
      throw new Error('Помилка завантаження JSON');
    }
    return response.json();
  })
  .then(products => {
    const container = document.getElementById('products-container');
    products.forEach(product => {
      // Створення HTML-картки товару
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="images/${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p><span class="price">${product.price}</span> <span class="currency">${product.currency}</span></p>
      `;
      container.appendChild(productCard);
    });
  })
  .catch(error => {
    console.error('Помилка:', error);
  });

// Логіка для перемикання валют
document.getElementById('currency-switch').addEventListener('click', () => {
    const prices = document.querySelectorAll('.price');
    const currencyElements = document.querySelectorAll('.currency');
  
    prices.forEach((priceEl, index) => {
      const currentCurrency = currencyElements[index].textContent;
      let newCurrency, conversionRate;
  
      // Зміна валюти та коефіцієнту конверсії
      if (currentCurrency === 'UAH') {
        newCurrency = 'USD';
        conversionRate = 0.027; // Приклад курсу
      } else {
        newCurrency = 'UAH';
        conversionRate = 37; // Приклад курсу
      }
  
      // Оновлення ціни та валюти
      const newPrice = (parseFloat(priceEl.textContent) * conversionRate).toFixed(2);
      priceEl.textContent = newPrice;
      currencyElements[index].textContent = newCurrency;
    });
  });
  