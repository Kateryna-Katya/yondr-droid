document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация иконок Lucide
  lucide.createIcons();

  // 2. Хедер при скролле
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 50);
  });

  // 3. Мобильное меню
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.menu-overlay');
  const navLinks = document.querySelectorAll('.nav__link');

  const toggleMenu = () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  navLinks.forEach(link => link.addEventListener('click', () => {
      if(nav.classList.contains('active')) toggleMenu();
  }));

  // 4. Reveal анимация (появление при скролле)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, { threshold: 0.1 });

  revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 3) * 0.1}s`; // Небольшой каскад
      revealObserver.observe(el);
  });

  // 5. Эффект свечения карточек (Glow Effect)
  const cards = document.querySelectorAll('.tech__card, .bento');
  cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
  });

  // 6. Параллакс карточки в Hero (только для десктопов)
  const heroCard = document.querySelector('.hero__card');
  if (heroCard && window.innerWidth > 992) {
      document.addEventListener('mousemove', (e) => {
          const x = (window.innerWidth / 2 - e.pageX) / 40;
          const y = (window.innerHeight / 2 - e.pageY) / 40;
          heroCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      });
  }

  // 7. Контактная форма и Капча
  const form = document.getElementById('ai-contact-form');
  if (form) {
      const phoneInput = document.getElementById('user_phone');
      const captchaLabel = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha_answer');
      const successMsg = document.getElementById('form-success');
      let captchaResult;

      const generateCaptcha = () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          captchaResult = a + b;
          captchaLabel.textContent = `${a} + ${b} = ?`;
      };

      generateCaptcha();

      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
      });

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(captchaInput.value) !== captchaResult) {
              alert('Неверный ответ капчи');
              generateCaptcha();
              return;
          }

          const btn = form.querySelector('.form__submit');
          btn.disabled = true;
          btn.textContent = 'Отправка...';

          setTimeout(() => {
              successMsg.classList.add('active');
              form.reset();
              setTimeout(() => {
                  successMsg.classList.remove('active');
                  btn.disabled = false;
                  btn.innerHTML = '<span>Отправить запрос</span><i data-lucide="send"></i>';
                  generateCaptcha();
                  lucide.createIcons();
              }, 4000);
          }, 1500);
      });
  }

  // 8. Cookie Popup
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieAccept = document.getElementById('cookie-accept');

  if (!localStorage.getItem('cookies-accepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('active');
      }, 2000);
  }

  cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      cookiePopup.classList.remove('active');
  });
});