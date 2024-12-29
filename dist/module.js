document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuClose = document.getElementById('menu-close');
  
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('top-[6%]','opacity-100');
      menuToggle.classList.add('hidden');
      menuClose.classList.remove('hidden');
    });
    menuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('top-[6%]','opacity-100');
      menuClose.classList.add('hidden');
      menuToggle.classList.remove('hidden');
    });
  });
  

    // Scroll vers les sections
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Afficher/Masquer le formulaire
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('form-container').classList.remove('hidden');
        });
    });

    document.getElementById('close-form').addEventListener('click', () => {
        document.getElementById('form-container').classList.add('hidden');
    });

