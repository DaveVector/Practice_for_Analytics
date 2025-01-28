document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  function switchSlide() {
    currentIndex = (currentIndex + 1) % slides.length; // Обчислюємо індекс слайду
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Перемикання кожні 5 секунд
  setInterval(switchSlide, 5000);
});