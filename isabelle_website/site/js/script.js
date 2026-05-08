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

  // Gestion du formulaire de contact
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      if (typeof grecaptcha === 'undefined') {
        alert('❌ Erreur: Le reCAPTCHA n\'a pas pu se charger. Veuillez rafraîchir la page.');
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
            if (data.success) {
              alert('✅ Email envoyé avec succès! Nous vous répondrons bientôt.');
              form.reset();
            } else {
              alert('❌ Erreur: ' + (data.message || 'Une erreur est survenue'));
            }
          })
          .catch(function(error) {
            console.error('Erreur:', error);
            alert('❌ Erreur réseau: impossible d\'envoyer le formulaire');
          })
          .finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
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
