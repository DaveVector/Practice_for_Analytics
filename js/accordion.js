document.addEventListener("DOMContentLoaded", () => {
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    const cancelBtn = document.querySelector(".cancel-btn");
  
    // Логіка для акордеону
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        // Перемикаємо клас 'active' для заголовка
        header.classList.toggle("active");
  
        // Знаходимо вміст акордеону
        const content = header.nextElementSibling;
  
        // Розгортаємо або згортаемо вміст
        if (content.classList.contains("open")) {
          content.classList.remove("open");
          content.style.maxHeight = null;
        } else {
          content.classList.add("open");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  
    // Обробник подій для чекбоксів і радіо-кнопок
    document.querySelectorAll(".filter-accordion input").forEach((input) => {
      input.addEventListener("change", () => {
        updateFilters();
      });
    });
  
    // Функція для оновлення URL на основі вибраних фільтрів
    function updateFilters() {
      const urlParams = new URLSearchParams();
  
      // Збираємо вибрані фільтри
      document.querySelectorAll(".filter-accordion input:checked").forEach((input) => {
        const filterType = input.dataset.filter; // Назва категорії (наприклад, "бренди")
        const filterValue = input.dataset.value; // Значення фільтра (наприклад, "Samsung")
  
        // Додаємо значення до параметрів URL
        const currentValues = urlParams.get(filterType);
        if (currentValues) {
          urlParams.set(filterType, `${currentValues},${filterValue}`);
        } else {
          urlParams.set(filterType, filterValue);
        }
      });
  
      // Оновлюємо URL без перезавантаження сторінки
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, "", newUrl);
  
      console.log(`Фільтри оновлено! Новий URL: ${newUrl}`);
    }
  
    // Обробник подій для кнопки "Скасовувати"
    cancelBtn.addEventListener("click", () => {
      // Очищаємо всі вибрані фільтри
      document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((input) => {
        input.checked = false;
      });
  
      // Очищаємо URL
      window.history.pushState({}, "", window.location.pathname);
  
      console.log("Фільтри скасовано!");
    });
  
    // Відкриваємо категорію "Бренди" з початку
    const brandContent = document.querySelector(".filter-accordion .accordion-content.open");
    if (brandContent) {
      brandContent.style.maxHeight = brandContent.scrollHeight + "px";
    }
  });