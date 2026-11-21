/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * Form Validations & Integrations - forms.js
 * Formspree / Netlify / Mailchimp integration ready with frontend validation
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // 1. Contact Form
    const contactForm = document.getElementById('cleanora-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          if (submitBtn) submitBtn.disabled = false;
          if (window.showCleanoraToast) {
            window.showCleanoraToast('Thank you! Your message has been received. Our cleaning advisor will reach out within 30 minutes.');
          }
        }, 600);
      });
    }

    // 2. Newsletter Forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim()) {
          input.value = '';
          if (window.showCleanoraToast) {
            window.showCleanoraToast('Subscribed! Check your inbox for your ₹300 first-booking voucher.');
          }
        }
      });
    });

    // 3. Login Form
    const loginForm = document.getElementById('cleanora-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const btn = loginForm.querySelector('button[type="submit"]');
        if (btn) btn.textContent = 'Signing in...';

        setTimeout(() => {
          if (window.showCleanoraToast) {
            window.showCleanoraToast(`Welcome back, ${email.split('@')[0]}! Redirecting to Customer Portal...`);
          }
          setTimeout(() => {
            window.location.href = 'customer-dashboard/index.html';
          }, 800);
        }, 500);
      });
    }

    // 3b. Social sign-in (Google / Apple) - demo handler; replace with real OAuth
    document.querySelectorAll('.btn-social').forEach((btn) => {
      btn.addEventListener('click', () => {
        const provider = btn.getAttribute('data-provider');
        if (window.showCleanoraToast) {
          window.showCleanoraToast(`Signing in with ${provider}... Redirecting to Customer Portal...`);
        }
        setTimeout(() => {
          window.location.href = 'customer-dashboard/index.html';
        }, 800);
      });
    });

    // 4. Register Form
    const registerForm = document.getElementById('cleanora-register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm-password').value;

        if (pass !== confirm) {
          alert('Passwords do not match. Please verify your password.');
          return;
        }

        const btn = registerForm.querySelector('button[type="submit"]');
        if (btn) btn.textContent = 'Creating Account...';

        setTimeout(() => {
          if (window.showCleanoraToast) {
            window.showCleanoraToast('Account created successfully! Welcome to Cleanora.');
          }
          setTimeout(() => {
            window.location.href = 'customer-dashboard/index.html';
          }, 800);
        }, 600);
      });
    }

    // 5. Forgot Password Form
    const forgotForm = document.getElementById('cleanora-forgot-form');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        const successBox = document.getElementById('forgot-success-state');
        if (successBox) successBox.style.display = 'block';
        forgotForm.style.display = 'none';

        if (window.showCleanoraToast) {
          window.showCleanoraToast(`Password reset link dispatched to ${email}!`);
        }
      });
    }

  });
})();
