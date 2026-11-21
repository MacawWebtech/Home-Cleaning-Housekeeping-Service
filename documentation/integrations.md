# Cleanora – Backend & Third-Party Integrations Guide

Cleanora is engineered as an integration-ready frontend template. This guide explains how to connect your backend, APIs, and third-party services.

---

## 1. Contact Form Integration
Open `contact.html` and find the `<form id="cleanora-contact-form">`:

### Using Formspree:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Form inputs -->
</form>
```

### Using Netlify Forms:
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- Form inputs -->
</form>
```

---

## 2. Newsletter Subscription (Mailchimp / ConvertKit)
In `index.html` and `footer`:
```html
<form action="https://yourdomain.us1.list-manage.com/subscribe/post?u=xxxx&id=xxxx" method="POST">
  <input type="email" name="EMAIL" required>
  <button type="submit">Claim</button>
</form>
```

---

## 3. Google Maps API
In `contact.html`, locate the Google Maps placeholder and replace it with your Google Maps embed iframe or JavaScript API initialization:

```html
<iframe 
  src="https://www.google.com/maps/embed?pb=..." 
  width="100%" 
  height="220" 
  style="border:0; border-radius: var(--radius-lg);" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

---

## 4. Payment Gateway Placeholders (Razorpay / Stripe)
In `booking.html`, when the user confirms their booking, the frontend creates a booking payload. You can integrate Razorpay Checkout directly:

```javascript
// Example Razorpay Integration
const options = {
  key: "rzp_test_YOUR_KEY_HERE",
  amount: bookingState.pricing.total * 100, // in paise
  currency: "INR",
  name: "Cleanora Home Cleaning",
  description: "Cleaning Service Deposit",
  handler: function (response) {
    window.location.href = `booking-confirmation.html?ref=${response.razorpay_payment_id}`;
  }
};
const rzp = new Razorpay(options);
rzp.open();
```

---

## 5. Security Best Practices
- Never commit secret API keys or private database credentials to frontend HTML/JS files.
- All real customer authentication and payment processing should be validated server-side.
- The template uses `localStorage` strictly for non-sensitive sample preferences (theme, text direction).