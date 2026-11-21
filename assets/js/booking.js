/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * Interactive Multi-Step Booking Engine - booking.js
 * Calculates live pricing in INR (₹), validates steps, handles calendar selection,
 * and saves demo booking state for confirmation and customer portal.
 */

(function () {
  'use strict';

  // Base Pricing Matrix in INR (₹)
  const PRICING_CONFIG = {
    services: {
      'deep-cleaning': { name: 'Deep Home Cleaning', base: 2499, duration: '4 - 6 Hours' },
      'regular-cleaning': { name: 'Regular Housekeeping', base: 1499, duration: '2 - 3 Hours' },
      'move-in-out': { name: 'Move-In / Move-Out Cleaning', base: 3999, duration: '5 - 7 Hours' },
      'kitchen-cleaning': { name: 'Kitchen Deep Degreasing', base: 1199, duration: '2 - 3 Hours' },
      'bathroom-cleaning': { name: 'Bathroom Sanitization', base: 799, duration: '1.5 - 2 Hours' }
    },
    packages: {
      'essential': { name: 'Essential Plan', multiplier: 1.0 },
      'premium': { name: 'Premium Sanitized', multiplier: 1.25 },
      'deluxe': { name: 'Elite Deluxe Care', multiplier: 1.50 }
    },
    bedroomMultiplier: {
      1: 0,
      2: 700,
      3: 1400,
      4: 2100,
      5: 2900
    },
    bathroomMultiplier: {
      1: 0,
      2: 350,
      3: 700,
      4: 1050,
      5: 1400
    },
    addons: {
      'addon-refrigerator': { name: 'Refrigerator Interior Degreasing', price: 399 },
      'addon-oven': { name: 'Microwave & Oven Scrub', price: 299 },
      'addon-range hood': { name: 'Kitchen Range Hood & Filter Scrub', price: 599 },
      'addon-balcony': { name: 'Balcony Pressure Wash', price: 499 },
      'addon-sofa': { name: 'Sofa & Fabric Upholstery Shampoo', price: 799 }
    }
  };

  // Current Booking State
  const bookingState = {
    currentStep: 1,
    service: 'deep-cleaning',
    package: 'premium',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1250,
    addons: ['addon-range hood'],
    scheduledDate: 'Tomorrow, 10:00 AM',
    timeSlot: '09:00 AM - 12:00 PM',
    customer: {
      name: 'Michael Carter',
      email: 'arjun.sharma@example.com',
      phone: '+1 (512) 555-0187',
      address: 'Apt 402, Green Glen Palms, East Austin, Austin, TX 78702',
      notes: 'Please bring eco-friendly pet-safe cleaning agents.'
    },
    paymentMethod: 'Pay After Service (Cash / UPI)',
    pricing: {
      subtotal: 0,
      addonsTotal: 0,
      gst: 0,
      discount: 0,
      total: 0
    }
  };

  function calculatePrice() {
    const srv = PRICING_CONFIG.services[bookingState.service] || PRICING_CONFIG.services['deep-cleaning'];
    const pkg = PRICING_CONFIG.packages[bookingState.package] || PRICING_CONFIG.packages['premium'];

    const baseServicePrice = srv.base * pkg.multiplier;
    const bedFee = PRICING_CONFIG.bedroomMultiplier[bookingState.bedrooms] || 0;
    const bathFee = PRICING_CONFIG.bathroomMultiplier[bookingState.bathrooms] || 0;

    let addonsFee = 0;
    bookingState.addons.forEach(addonKey => {
      if (PRICING_CONFIG.addons[addonKey]) {
        addonsFee += PRICING_CONFIG.addons[addonKey].price;
      }
    });

    const subtotal = Math.round(baseServicePrice + bedFee + bathFee + addonsFee);
    const gst = Math.round(subtotal * 0.18); // 18% sales tax
    const discount = subtotal > 3000 ? 300 : 0; // ₹300 welcome discount
    const total = subtotal + gst - discount;

    bookingState.pricing = {
      subtotal,
      addonsTotal: addonsFee,
      gst,
      discount,
      total
    };

    updatePriceDisplay();
  }

  function updatePriceDisplay() {
    const srv = PRICING_CONFIG.services[bookingState.service];
    const pkg = PRICING_CONFIG.packages[bookingState.package];

    document.querySelectorAll('.summary-service-name').forEach(el => el.textContent = srv.name);
    document.querySelectorAll('.summary-package-name').forEach(el => el.textContent = pkg.name);
    document.querySelectorAll('.summary-home-config').forEach(el => {
      el.textContent = `${bookingState.bedrooms} Bedroom (${bookingState.bathrooms} Baths, ~${bookingState.sqft} sq.ft)`;
    });
    document.querySelectorAll('.summary-schedule').forEach(el => {
      el.textContent = `${bookingState.scheduledDate} (${bookingState.timeSlot})`;
    });

    // Numbers in INR ₹
    document.querySelectorAll('.calc-subtotal').forEach(el => el.textContent = `₹${bookingState.pricing.subtotal.toLocaleString('en-IN')}`);
    document.querySelectorAll('.calc-gst').forEach(el => el.textContent = `₹${bookingState.pricing.gst.toLocaleString('en-IN')}`);
    document.querySelectorAll('.calc-discount').forEach(el => el.textContent = `-₹${bookingState.pricing.discount.toLocaleString('en-IN')}`);
    document.querySelectorAll('.calc-total').forEach(el => el.textContent = `₹${bookingState.pricing.total.toLocaleString('en-IN')}`);

    // Update Add-ons summary list
    const addonsContainer = document.querySelector('.summary-addons-list');
    if (addonsContainer) {
      if (bookingState.addons.length === 0) {
        addonsContainer.innerHTML = '<li class="text-muted" style="font-size: 0.85rem;">No add-ons selected</li>';
      } else {
        addonsContainer.innerHTML = bookingState.addons.map(key => {
          const item = PRICING_CONFIG.addons[key];
          return `<li style="display: flex; justify-content: space-between; font-size: 0.85rem; padding: 4px 0;">
            <span>${item.name}</span>
            <span style="font-weight: 700;">+₹${item.price}</span>
          </li>`;
        }).join('');
      }
    }
  }

  function renderSteps() {
    // Show active step section
    for (let i = 1; i <= 5; i++) {
      const stepEl = document.getElementById(`booking-step-${i}`);
      const indicatorEl = document.querySelector(`.step-indicator[data-step="${i}"]`);
      if (stepEl) {
        if (i === bookingState.currentStep) {
          stepEl.style.display = 'block';
        } else {
          stepEl.style.display = 'none';
        }
      }
      if (indicatorEl) {
        if (i === bookingState.currentStep) {
          indicatorEl.classList.add('active');
          indicatorEl.classList.remove('completed');
        } else if (i < bookingState.currentStep) {
          indicatorEl.classList.remove('active');
          indicatorEl.classList.add('completed');
        } else {
          indicatorEl.classList.remove('active');
          indicatorEl.classList.remove('completed');
        }
      }
    }
    window.scrollTo({ top: 180, behavior: 'smooth' });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('cleanora-booking-container');
    if (!bookingForm) return;

    // 1. Service Selection Cards
    document.querySelectorAll('.service-select-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.service-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingState.service = card.getAttribute('data-service-key');
        calculatePrice();
      });
    });

    // 2. Package Selection Cards
    document.querySelectorAll('.package-select-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.package-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingState.package = card.getAttribute('data-package-key');
        calculatePrice();
      });
    });

    // 3. Add-on Checkbox tiles
    document.querySelectorAll('.addon-checkbox-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const key = tile.getAttribute('data-addon-key');
        const checkbox = tile.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          tile.classList.toggle('selected', checkbox.checked);
          if (checkbox.checked) {
            if (!bookingState.addons.includes(key)) bookingState.addons.push(key);
          } else {
            bookingState.addons = bookingState.addons.filter(k => k !== key);
          }
          calculatePrice();
        }
      });
    });

    // 4. Steppers: Bedrooms & Bathrooms
    document.querySelectorAll('.stepper-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.getAttribute('data-stepper-type');
        const action = btn.getAttribute('data-stepper-action');
        const displayEl = document.querySelector(`.stepper-val[data-stepper-type="${type}"]`);

        if (type === 'bedrooms') {
          if (action === 'plus' && bookingState.bedrooms < 5) bookingState.bedrooms++;
          if (action === 'minus' && bookingState.bedrooms > 1) bookingState.bedrooms--;
          if (displayEl) displayEl.textContent = `${bookingState.bedrooms} Bedroom`;
        } else if (type === 'bathrooms') {
          if (action === 'plus' && bookingState.bathrooms < 5) bookingState.bathrooms++;
          if (action === 'minus' && bookingState.bathrooms > 1) bookingState.bathrooms--;
          if (displayEl) displayEl.textContent = `${bookingState.bathrooms} Bathrooms`;
        }
        calculatePrice();
      });
    });

    // 5. Calendar dates & Time slots
    document.querySelectorAll('.calendar-day-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        bookingState.scheduledDate = btn.getAttribute('data-date-label') || btn.textContent.trim();
        calculatePrice();
      });
    });

    document.querySelectorAll('.timeslot-pill').forEach(slot => {
      slot.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.timeslot-pill').forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        bookingState.timeSlot = slot.textContent.trim();
        calculatePrice();
      });
    });

    // 6. Navigation Buttons (Next / Prev)
    document.querySelectorAll('[data-booking-next]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Step validation
        if (bookingState.currentStep === 4) {
          const nameInput = document.getElementById('book-name');
          const phoneInput = document.getElementById('book-phone');
          const addrInput = document.getElementById('book-address');

          if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim() || !addrInput || !addrInput.value.trim()) {
            alert('Please fill in your Name, Phone Number, and Complete Address to proceed.');
            return;
          }

          bookingState.customer.name = nameInput.value.trim();
          bookingState.customer.phone = phoneInput.value.trim();
          bookingState.customer.address = addrInput.value.trim();
          const emailInput = document.getElementById('book-email');
          if (emailInput) bookingState.customer.email = emailInput.value.trim();
        }

        if (bookingState.currentStep < 5) {
          bookingState.currentStep++;
          calculatePrice();
          renderSteps();
        }
      });
    });

    document.querySelectorAll('[data-booking-prev]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (bookingState.currentStep > 1) {
          bookingState.currentStep--;
          renderSteps();
        }
      });
    });

    // 7. Final Confirm Booking
    const confirmBtn = document.getElementById('confirm-booking-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = `<span>Booking Confirmed...</span>`;

        // Generate Booking Reference
        const bookingRef = 'STK-' + Math.floor(10000 + Math.random() * 90000);
        bookingState.referenceNumber = bookingRef;
        bookingState.bookedAt = new Date().toISOString();

        // Save demo booking to localStorage
        localStorage.setItem('cleanora_latest_booking', JSON.stringify(bookingState));

        setTimeout(() => {
          window.location.href = `booking-confirmation.html?ref=${bookingRef}`;
        }, 800);
      });
    }

    // Initial calculation and step render
    calculatePrice();
    renderSteps();
  });
})();
