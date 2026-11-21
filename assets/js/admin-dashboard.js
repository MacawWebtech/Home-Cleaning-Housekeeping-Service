/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * Admin Dashboard Management - admin-dashboard.js
 * Handles Table Searches, Status Filtering, Cleaner Assignments,
 * Service CRUD, and Moderation Actions.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // 1. Live Table Search Filter
    const adminSearchInput = document.getElementById('admin-table-search');
    if (adminSearchInput) {
      adminSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const rows = document.querySelectorAll('.admin-data-row');

        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(query)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }

    // 2. Status Filter Dropdown
    const statusSelect = document.getElementById('admin-status-filter');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        const filter = e.target.value;
        const rows = document.querySelectorAll('.admin-data-row');

        rows.forEach(row => {
          const status = row.getAttribute('data-status');
          if (filter === 'all' || status === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }

    // 3. Cleaner Assignment Modal / Quick Dropdown
    document.querySelectorAll('.cleaner-assign-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const cleanerName = e.target.options[e.target.selectedIndex].text;
        const bookingId = select.getAttribute('data-booking-id') || 'STK-84920';
        if (window.showCleanoraToast) {
          window.showCleanoraToast(`Assigned ${cleanerName} to Booking #${bookingId}!`);
        }
      });
    });

    // 4. Add Service Form Modal
    const addServiceForm = document.getElementById('add-service-form');
    if (addServiceForm) {
      addServiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('service-title-input').value;
        const price = document.getElementById('service-price-input').value;

        const modal = document.getElementById('add-service-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        if (window.showCleanoraToast) {
          window.showCleanoraToast(`Service "${title}" (₹${price}) created and published successfully!`);
        }
      });
    }

    // 5. Reply to Message Modal
    const replyForm = document.getElementById('reply-message-form');
    if (replyForm) {
      replyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modal = document.getElementById('reply-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        if (window.showCleanoraToast) {
          window.showCleanoraToast('Support response sent to customer email & SMS.');
        }
      });
    }

    // 6. Review Moderation (Approve / Hide)
    document.querySelectorAll('.btn-review-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const action = btn.getAttribute('data-action');
        const card = btn.closest('.review-card');
        if (card) {
          if (action === 'approve') {
            card.style.borderColor = 'var(--color-lime)';
            if (window.showCleanoraToast) window.showCleanoraToast('Review approved & published on website.');
          } else {
            card.style.opacity = '0.4';
            if (window.showCleanoraToast) window.showCleanoraToast('Review hidden from public view.');
          }
        }
      });
    });

  });
})();
