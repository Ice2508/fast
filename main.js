'use strict'
AOS.init({
  offset: 100,
});

const isMobile = window.matchMedia('(max-width: 768px)').matches;
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
  effect: isMobile ? 'fade' : 'cube',
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
const popupStatus = document.querySelector('.popup__status');

callTOActionBtn.addEventListener('click', () => {
     popupOverlay.classList.add('popup__overlay--active');
     popupForm.classList.add('popup__form--active');
     document.documentElement.style.overflow = 'hidden';
});

popupOverlay.addEventListener('click', (e) => {
    if(e.target === popupOverlay) {
    setTimeout(() => {
      popupForm.classList.remove('popup__form--active');
      popupOverlay.classList.remove('popup__overlay--active');
      document.documentElement.style.overflow = '';
  },100)
  }
});

popupClose.addEventListener('click', () => {

    setTimeout(() => {
    popupForm.classList.remove('popup__form--active');
    popupOverlay.classList.remove('popup__overlay--active');
    document.documentElement.style.overflow = '';
  },100);
})



popupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(popupForm);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      if(response.ok) {
        popupStatus.innerHTML = 'отправлено успешно! &#10004;'
        popupStatus.style.color = 'green';
        setTimeout(() => {
          popupOverlay.classList.remove('popup__overlay--active');
          popupForm.classList.remove('popup__form--active');
          document.documentElement.style.overflow = '';
          popupStatus.textContent = '';
          popupForm.reset();
        }, 800);
      } else {
        popupStatus.textContent = 'ошибка отправки!'
      }
    } catch {
      popupStatus.textContent = 'ошбика сетeвого соединения!'
    }
})