const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('#contactForm');
const formNote = document.querySelector('#formNote');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

document.querySelector('#year').textContent = new Date().getFullYear();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = encodeURIComponent(`Solicitud de evento - ${data.get('evento')}`);
  const body = encodeURIComponent(
    `Nombre: ${data.get('nombre')}\n` +
    `Correo: ${data.get('correo')}\n` +
    `Tipo de evento: ${data.get('evento')}\n\n` +
    `${data.get('mensaje') || 'Sin información adicional.'}`
  );

  formNote.textContent = 'Se abrirá tu aplicación de correo para completar el envío.';
  window.location.href = `mailto:contacto@mialogistics.com.mx?subject=${subject}&body=${body}`;
});
