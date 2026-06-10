// ============================================
// Maine Net Clear LLC — Site Scripts
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Sticky nav: opacity on scroll ----------
  var header = document.getElementById('site-header');

  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---------- Mobile nav toggle ----------
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    var isActive = navLinks.classList.toggle('active');
    navToggle.classList.toggle('active', isActive);
    navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Quote form handling ----------
  var form = document.getElementById('quote-form');
  var successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          if (response.ok) {
            form.hidden = true;
            successMessage.hidden = false;
          } else {
            response.json().then(function (data) {
              if (data && data.errors) {
                alert('There was a problem submitting the form. Please try again or call us directly.');
              } else {
                alert('There was a problem submitting the form. Please try again or call us directly.');
              }
            }).catch(function () {
              alert('There was a problem submitting the form. Please try again or call us directly.');
            });
          }
        })
        .catch(function () {
          alert('There was a problem submitting the form. Please check your connection and try again, or call us directly.');
        });
    });
  }

});
