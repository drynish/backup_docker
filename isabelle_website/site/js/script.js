// Fonction pour afficher/masquer le menu mobile
function toggleMobileMenu() {
  var mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('hidden');
}

// Fonction de scroll avec offset pour la barre fixe
function scrollToAnchor(event, id) {
  event.preventDefault();
  var element = document.getElementById(id);
  if (element) {
    var offsetTop = element.offsetTop - 100; // 100px pour la barre fixe
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }
}

// Ajouter les listeners aux liens de navigation
document.addEventListener('DOMContentLoaded', function() {
  var navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href && href !== '#') {
        var id = href.substring(1);
        scrollToAnchor(e, id);
      }
    });
  });

  // Hamburger menu
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Fermer le menu mobile quand on clique sur un lien
  var mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
  mobileMenuLinks.forEach(function(link) {
    link.addEventListener('click', toggleMobileMenu);
  });

  // Boutons des cours
  var courseButtons = document.querySelectorAll('.course-btn');
  courseButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      toggleCourseDetails(this.dataset.course);
    });
  });

  // Gestion du formulaire de contact
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var formMessage = document.getElementById('formMessage');

    function showMessage(text, success) {
      formMessage.textContent = text;
      formMessage.className = 'mt-4 px-4 py-3 rounded-lg text-sm font-semibold text-center ' +
        (success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800');
    }

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      formMessage.className = 'hidden';

      if (typeof grecaptcha === 'undefined') {
        showMessage('Le reCAPTCHA n\'a pas pu se charger. Veuillez rafraîchir la page.', false);
        return;
      }

      var form = this;
      var submitButton = form.querySelector('button[type="submit"]');
      var originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours...';

      grecaptcha.ready(function() {
        grecaptcha.execute('6LfM4t4sAAAAAPfPPD_PZvlq0WRLZKnb53tC9DPJ', {action: 'contact'})
          .then(function(token) {
            var formData = new FormData(form);
            formData.append('captcha', token);
            return fetch('sendmail.php', { method: 'POST', body: formData });
          })
          .then(function(response) { return response.json(); })
          .then(function(data) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            if (data.success) {
              showMessage('✅ Message envoyé! Nous vous répondrons dans les 24 heures.', true);
              form.reset();
            } else {
              showMessage('❌ ' + (data.message || 'Une erreur est survenue'), false);
            }
          })
          .catch(function(error) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            console.error('Erreur:', error);
            showMessage('❌ Erreur réseau: impossible d\'envoyer le formulaire.', false);
          });
      });
    });
  }
});

// Fonction pour afficher/masquer les détails des cours
function toggleCourseDetails(courseNumber) {
  // Cacher tous les détails des cours
  var courses = document.querySelectorAll('.course-details');
  courses.forEach(function(course) {
    course.style.display = 'none';
  });

  // Afficher le cours sélectionné
  var selectedCourse = document.getElementById('course' + courseNumber);
  if (selectedCourse) {
    selectedCourse.style.display = 'block';
  }
}
