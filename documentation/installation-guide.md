# Cleanora – Installation & Quick Start Guide

Welcome to **Cleanora – Home Cleaning & Housekeeping Service HTML Template**. This production-ready template is designed for commercial cleaning businesses, housekeeping agencies, and maid service startups.

---

## 1. Quick Start

Cleanora is built with pure, modern HTML5, CSS3, and Vanilla ES6+ JavaScript. You do not need Node.js, npm, or complex build tooling to run the template.

### Option A: Local Browser Opening
1. Unzip the template archive or navigate to the project directory.
2. Double-click `index.html` to open Home Page 1 directly in your preferred browser (Chrome, Edge, Safari, Firefox).
3. All relative asset links, SVG illustrations, and JavaScript modules work out of the box.

### Option B: Local HTTP Server (Recommended)
Running through an HTTP server ensures full compatibility with module loading, theme preference persistence, and form demonstrations.

#### Using Python:
```bash
# Navigate to the folder
cd cleanora-home-cleaning

# Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

#### Using VS Code Live Server:
1. Open the `cleanora-home-cleaning` folder in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.

#### Using Node `npx serve`:
```bash
npx serve .
```

---

## 2. Directory Structure Overview

- `index.html` – Home Page 1 (General Home Services Landing)
- `index-2.html` – Home Page 2 (Deep Cleaning Specific with Before-After Slider)
- `customer-dashboard/` – Complete registered customer portal (11 pages)
- `admin/` – Full business management operations portal (13 pages)
- `assets/css/` – Modular stylesheets (`style.css`, `components.css`, `dashboard.css`, `dark-mode.css`, `rtl.css`, `responsive.css`)
- `assets/js/` – Clean ES6+ logic (`main.js`, `theme.js`, `rtl.js`, `booking.js`, `customer-dashboard.js`, `admin-dashboard.js`, `forms.js`)
- `assets/images/` – High-fidelity SVG graphics for rooms, cleaners, and before/after comparisons

---

## 3. Browser Support
- Google Chrome (latest 2 versions)
- Apple Safari (iOS & macOS)
- Mozilla Firefox (latest 2 versions)
- Microsoft Edge (Chromium based)