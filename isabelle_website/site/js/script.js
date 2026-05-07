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
      
      // Vérifier si le widget reCAPTCHA a chargé
      if (typeof grecaptcha === 'undefined') {
        alert('❌ Erreur: Le reCAPTCHA n\'a pas pu se charger. Veuillez rafraîchir la page.');
        return;
      }

      // Vérifier si le captcha a été rempli
      var recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert('❌ Erreur: Veuillez cocher le reCAPTCHA');
        return;
      }
      
      var formData = new FormData(this);
      formData.append('captcha', recaptchaResponse);
      var submitButton = this.querySelector('button[type="submit"]');
      var originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours...';
      
      fetch('sendmail.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('✅ Email envoyé avec succès! Nous vous répondrons bientôt.');
          contactForm.reset();
          grecaptcha.reset();
        } else {
          alert('❌ Erreur: ' + (data.message || 'Une erreur est survenue'));
          grecaptcha.reset();
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        alert('❌ Erreur réseau: impossible d\'envoyer le formulaire');
        grecaptcha.reset();
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
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
