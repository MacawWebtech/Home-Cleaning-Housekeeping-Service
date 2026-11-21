/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * Customer Dashboard Interactions - customer-dashboard.js
 * Handles Booking Filters, Reschedule & Cancel Modals, Address CRUD, and Invoices.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // 1. Booking Tabs Filtering (All, Upcoming, Completed, Cancelled)
    const bookingTabs = document.querySelectorAll('.booking-filter-tab');
    const bookingRows = document.querySelectorAll('.booking-item-row');

    bookingTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        bookingTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        bookingRows.forEach(row => {
          const status = row.getAttribute('data-status');
          if (filter === 'all' || status === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });

    // 2. Reschedule Modal Handling
    const rescheduleForm = document.getElementById('reschedule-form');
    if (rescheduleForm) {
      rescheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newDate = document.getElementById('reschedule-date').value;
        const newTime = document.getElementById('reschedule-time').value;

        const modal = document.getElementById('reschedule-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        if (window.showCleanoraToast) {
          window.showCleanoraToast(`Your booking has been rescheduled to ${newDate} (${newTime})!`);
        }
      });
    }

    // 3. Cancel Booking Handling
    const cancelForm = document.getElementById('cancel-booking-form');
    if (cancelForm) {
      cancelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modal = document.getElementById('cancel-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        if (window.showCleanoraToast) {
          window.showCleanoraToast('Your cancellation request has been submitted. No cancellation fees applied.');
        }
      });
    }

    // 4. Address Book Actions
    const addAddressForm = document.getElementById('add-address-form');
    if (addAddressForm) {
      addAddressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const label = document.getElementById('addr-label').value;
        const line = document.getElementById('addr-line').value;

        const modal = document.getElementById('add-address-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        if (window.showCleanoraToast) {
          window.showCleanoraToast(`New address "${label}" saved successfully!`);
        }
      });
    }

    document.querySelectorAll('.btn-set-default-address').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.address-card').forEach(card => card.classList.remove('default'));
        const card = btn.closest('.address-card');
        if (card) {
          card.classList.add('default');
          if (window.showCleanoraToast) {
            window.showCleanoraToast('Default address updated!');
          }
        }
      });
    });

    // 5. Recurring Plan Pause / Resume Demo
    const pausePlanBtn = document.getElementById('toggle-plan-status-btn');
    if (pausePlanBtn) {
      pausePlanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isPaused = pausePlanBtn.getAttribute('data-is-paused') === 'true';
        if (isPaused) {
          pausePlanBtn.setAttribute('data-is-paused', 'false');
          pausePlanBtn.textContent = 'Pause Recurring Plan';
          pausePlanBtn.className = 'btn btn-outline';
          if (window.showCleanoraToast) {
            window.showCleanoraToast('Recurring housekeeping plan resumed!');
          }
        } else {
          pausePlanBtn.setAttribute('data-is-paused', 'true');
          pausePlanBtn.textContent = 'Resume Recurring Plan';
          pausePlanBtn.className = 'btn btn-lime';
          if (window.showCleanoraToast) {
            window.showCleanoraToast('Recurring housekeeping plan paused until next month.');
          }
        }
      });
    }

    // 6. Print Invoice Helper
    document.querySelectorAll('.btn-print-invoice').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
      });
    });

  });
})();
