# Cleanora – Customization Guide

This guide details how to personalize brand colors, typography, images, prices, and content in the Cleanora template.

---

## 1. The Strict Three-Colour Branding System

Cleanora strictly follows the 3-brand-colour rule across every page and portal:

| Color | Hex Code | Variable in CSS | Usage |
|---|---|---|---|
| Black | `#111111` | `--color-black` | Headings, text, dark backgrounds, high-contrast surfaces |
| White | `#FFFFFF` | `--color-white` | Page canvas, card backgrounds, light surfaces |
| Electric Lime | `#C6FF00` | `--color-lime` | Primary CTA buttons, badges, highlights, active states |

### Changing Brand Colors:
Open `assets/css/style.css` and locate the `:root` block:

```css
:root {
  --color-black: #111111;
  --color-white: #FFFFFF;
  --color-lime: #C6FF00;
  --color-lime-hover: #B4E600;
  --color-lime-subtle: rgba(198, 255, 0, 0.12);
}
```

To update the primary accent color across the entire project (all 43 HTML pages and dashboards), change `--color-lime` and its hover state.

---

## 2. Typography Customization

Cleanora uses exactly two font families:
1. **Headings:** `Manrope`
2. **Body Text:** `Inter`

To modify the fonts, edit the `@import` statement and the font variables in `assets/css/style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800;900&display=swap');

:root {
  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 3. Modifying Prices & Currency

All sample pricing is configured in Indian Rupees (`₹ INR`). You can easily replace `₹` with `$`, `€`, `£`, `AED`, or any local currency.

To update prices in the interactive booking engine:
Open `assets/js/booking.js` and modify the `PRICING_CONFIG` object:

```javascript
const PRICING_CONFIG = {
  services: {
    'deep-cleaning': { name: 'Deep Home Cleaning', base: 2499, duration: '4 - 6 Hours' },
    'regular-cleaning': { name: 'Regular Housekeeping', base: 1499, duration: '2 - 3 Hours' },
    ...
  }
};
```

---

## 4. Replacing Photographs and Vectors

All image assets are neatly organized under `assets/images/`:
- `home/` – Hero vectors, guarantee badges, before/after room illustrations
- `services/` – Cleaning service preview graphics
- `team/` – Verified cleaning specialist profile cards
- `blog/` – Article feature graphics
- `dashboard/` – Dashboard illustrations & placeholders

Replace any `.svg` file with your preferred `.webp`, `.jpg`, or `.png` photo.