'use strict'
AOS.init({
  offset: 100,
});

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  effect: 'flip',
  speed: 1500,
  cubeEffect: {
  shadow: true,
  slideShadows: true,
  shadowOffset: 20,
  shadowScale: 0.94,
  },
  fadeEffect: {
    crossFade: true,
  }
});

const swiperEl = document.querySelector('.swiper');

let touchStartX = 0;
let touchStartY = 0;

swiperEl.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });

swiperEl.addEventListener('touchmove', (e) => {
  if (e.touches.length !== 1) return;

  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    e.preventDefault(); 
  }
}, { passive: false });


const callTOActionBtn = document.querySelector('.call-to-action__btn');
const popupOverlay = document.querySelector('.popup__overlay');
const popupForm = document.querySelector('.popup__form');
const popupClose = document.querySelector('.popup__close');
const popupStatus = document.querySelector('.popup-status');
const popupStatusTitle = document.querySelector('.popup-status__title');
const popupStatusSubtitle = document.querySelector('.popup-status__subtitle');
const popupStatusIcon = document.querySelector('.popup-status__icon');
const popupBtn = document.querySelector('.popup__btn');

callTOActionBtn.addEventListener('click', () => {
     popupOverlay.classList.add('popup__overlay--active');
     popupForm.classList.add('popup__form--active');
     document.documentElement.style.overflow = 'hidden';
});

popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
    setTimeout(() => {
      popupForm.classList.remove('popup__form--active');
      popupOverlay.classList.remove('popup__overlay--active');
      document.documentElement.style.overflow = '';
  },100)
  }
});

popupClose.addEventListener('click', () => {
    popupForm.classList.remove('popup__form--active');
    setTimeout(() => {
    
    popupOverlay.classList.remove('popup__overlay--active');
    document.documentElement.style.overflow = '';
  },300);
})



popupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    popupBtn.disabled = true;
    popupBtn.style.opacity = 0.5;
    const formData = new FormData(popupForm);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      if(response.ok) {
          popupForm.classList.remove('popup__form--active');
          setTimeout(() => {
          popupStatus.classList.add('popup-status--active');
        }, 300)
        popupForm.reset();
      } else {
        popupForm.classList.remove('popup__form--active');
        popupStatus.classList.add('popup-status--active');
        popupStatusTitle.textContent = "Не удалось отправить сообщение!!!";
        popupStatusSubtitle.textContent = "Попробуйте еще раз через несколько минут.";
        popupStatusIcon.style.backgroundImage = "url(icon-form-error.webp)";
      }
    } catch {
      popupStatus.classList.add('popup-status--active');
      popupStatusTitle.textContent = "Не удалось отправить сообщение!!!";
      popupStatusSubtitle.textContent = "Проверьте подключение к интернету и попробуйте снова.";
      popupStatusIcon.style.backgroundImage = "url(icon-form-error.webp)"
    } finally {
      popupBtn.disabled = false;
      popupBtn.style.opacity = 1;
    }
})

const popupStatusBtn = document.querySelector('.popup-status__btn');
popupStatusBtn.addEventListener('click', () => {
  popupStatus.classList.remove('popup-status--active');
  popupOverlay.classList.remove('popup__overlay--active');
  document.documentElement.style.overflow = '';
})