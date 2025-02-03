document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");
  
    // Обробник подій для форми
    checkoutForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Зупиняємо стандартну поведінку форми
  
      // Збираємо дані з форми
      const formData = {
        name: checkoutForm.querySelector("#name").value.trim(),
        phone: checkoutForm.querySelector("#phone").value.trim(),
        city: checkoutForm.querySelector("#city").value.trim(),
        delivery: checkoutForm.querySelector('input[name="delivery"]:checked')?.value,
        payment: checkoutForm.querySelector('input[name="payment"]:checked')?.value,
      };
  
      // Перевіряємо, чи всі поля заповнені
      if (!formData.name || !formData.phone || !formData.city || !formData.delivery || !formData.payment) {
        alert("Будь ласка, заповніть усі поля!");
        return;
      }
  
      // Отримуємо дані кошика
      const cart = Cart.getCart();
      const products = await loadProducts();
      const currency = Currency.getCurrency();
  
      // Підраховуємо загальну суму та створюємо масив товарів
      let totalValue = 0;
      const items = Object.entries(cart).map(([id, quantity]) => {
        const product = products.find((p) => p.id === parseInt(id));
        const price = currency === "UA"
          ? product.priceUAH - product.discountUAH
          : product.priceUSD - product.discountUSD;
  
        totalValue += price * quantity;
  
        return {
          item_id: id,
          item_name: product.name,
          price: price,
          quantity: quantity,
        };
      });
  
      // Генеруємо унікальний ID транзакції
      const transactionId = `ORDER_${Date.now()}`;
  
      // Зберігаємо дані замовлення у localStorage
      const orderDetails = {
        transaction_id: transactionId,
        value: totalValue,
        currency: currency,
        items: items,
        city: formData.city,
        delivery: formData.delivery,
        payment: formData.payment,
      };
  
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  
      // Логування збережених даних
      console.log("Збережено дані замовлення у localStorage:", orderDetails);
  
      // Очищаємо кошик
      Cart.clearCart();
  
      // Перенаправляємо користувача на сторінку подяки
      window.location.href = "thank-you.html";
    });
  });