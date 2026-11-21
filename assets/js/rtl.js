/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * RTL Controller - rtl.js
 * Handles Right-To-Left switching with localStorage persistence
 */

(function () {
  'use strict';

  const RTL_STORAGE_KEY = 'cleanora_direction_preference';

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(RTL_STORAGE_KEY, dir);
    updateRTLButtons(dir);
  }

  function updateRTLButtons(dir) {
    const buttons = document.querySelectorAll('.rtl-toggle-btn');
    buttons.forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const savedDir = localStorage.getItem(RTL_STORAGE_KEY) || 'ltr';
    applyDirection(savedDir);

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(nextDir);
      });
    });
  });
})();
