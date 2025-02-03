document.addEventListener("DOMContentLoaded", () => {
    // Отримуємо дані замовлення з localStorage
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  
    if (orderDetails) {
      // Відображаємо номер замовлення
      document.getElementById("order-id").textContent = orderDetails.transaction_id;
  
      // Відправляємо подію purchase у dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          transaction_id: orderDetails.transaction_id,
          value: orderDetails.value,
          currency: orderDetails.currency,
          items: orderDetails.items,
          city: orderDetails.city, // Місто
          delivery: orderDetails.delivery, // Спосіб доставки
          payment: orderDetails.payment, // Спосіб оплати
        },
      });
  
      // Логування відправленої події
      console.log("Подія purchase відправлена:", {
        transaction_id: orderDetails.transaction_id,
        value: orderDetails.value,
        currency: orderDetails.currency,
        items: orderDetails.items,
        city: orderDetails.city,
        delivery: orderDetails.delivery,
        payment: orderDetails.payment,
      });
  
      // Очищаємо дані замовлення з localStorage
      localStorage.removeItem("orderDetails");
    } else {
      console.error("Помилка: Дані замовлення не знайдені.");
      alert("Помилка: Дані замовлення не знайдені.");
      window.location.href = "index.html"; // Перенаправляємо на головну сторінку
    }
  });