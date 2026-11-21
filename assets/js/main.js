/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * Core JavaScript - main.js
 * Handles Mobile Menu, Sticky Navigation, Modals, FAQ Accordions,
 * Before-After Slider, Toasts, Offline/Online Icons, and Scroll Reveal Animations.
 */

(function () {
  'use strict';

  // 1. Toast Notification Manager
  window.showCleanoraToast = function (message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--color-lime); font-size: 1.2rem;">&#10003;</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // 2. DOM Initialization
  document.addEventListener('DOMContentLoaded', () => {

    // --- Premium Scroll Reveal Animation (IntersectionObserver) ---
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale, .stagger-container');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      });

      revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Responsive dashboard tables: label every cell so rows can stack as cards ---
    document.querySelectorAll('table.dashboard-table').forEach(table => {
      const heads = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.replace(/\s+/g, ' ').trim());
      if (!heads.length) return;
      table.querySelectorAll('tbody tr').forEach(tr => {
        Array.from(tr.children).forEach((td, i) => {
          if (td.tagName !== 'TD' || td.hasAttribute('colspan')) return;
          td.setAttribute('data-label', heads[i] || '');
          if (!td.querySelector(':scope > .td-value')) {
            const wrap = document.createElement('span');
            wrap.className = 'td-value';
            while (td.firstChild) wrap.appendChild(td.firstChild);
            td.appendChild(wrap);
          }
        });
      });
    });

    // --- Mobile Drawer Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');
    const mobileClose = document.querySelector('.mobile-drawer-close');

    let overlay = document.querySelector('.mobile-drawer-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-drawer-overlay';
      document.body.appendChild(overlay);
    }

    function openMobileMenu() {
      if (mobileDrawer) mobileDrawer.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }


    // --- Mobile drawer: Services dropdown ---
    document.querySelectorAll('.mobile-sub-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const li = btn.closest('.mobile-has-sub');
        const open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('.header-wrapper');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }

    // --- FAQ Accordions ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const headerBtn = item.querySelector('.faq-header');
      if (headerBtn) {
        headerBtn.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          // Close other active in same container
          const parent = item.parentElement;
          if (parent) {
            parent.querySelectorAll('.faq-item').forEach(sibling => sibling.classList.remove('active'));
          }
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });

    // --- Before & After Comparison Slider ---
    const baWrappers = document.querySelectorAll('.before-after-wrapper');
    baWrappers.forEach(wrapper => {
      const overlayImg = wrapper.querySelector('.before-after-overlay');
      const handle = wrapper.querySelector('.before-after-handle');
      const input = wrapper.querySelector('.before-after-slider-input');

      if (input && overlayImg && handle) {
        input.addEventListener('input', (e) => {
          const val = e.target.value;
          overlayImg.style.width = val + '%';
          handle.style.left = val + '%';
        });
      }
    });

    // --- Global Modal Triggers ---
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = closeBtn.closest('.modal-overlay');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // --- Admin/Customer Sidebar Toggle on Mobile/Tablet ---
    const sidebarToggle = document.querySelector('.sidebar-toggle-btn');
    const dashboardSidebar = document.querySelector('.dashboard-sidebar');
    if (sidebarToggle && dashboardSidebar) {
      sidebarToggle.addEventListener('click', () => {
        dashboardSidebar.classList.toggle('mobile-open');
      });
    }

    // --- Lucide Icons initialization fallback ---
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();
