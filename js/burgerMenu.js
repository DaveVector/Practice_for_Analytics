// Керування бургер-меню
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // Додаємо/видаляємо клас active
});

document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target)) {
      navLinks.classList.remove('active'); // Закриваємо меню
    }
  });