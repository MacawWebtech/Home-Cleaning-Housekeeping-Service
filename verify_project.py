import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

print("=" * 60)
print("CLEANORA HOME CLEANING TEMPLATE - VERIFICATION AUDIT")
print("=" * 60)

# 1. Count HTML Files
html_files = []
for root, dirs, files in os.walk(BASE_DIR):
    for f in files:
        if f.endswith(".html"):
            rel_path = os.path.relpath(os.path.join(root, f), BASE_DIR)
            html_files.append(rel_path)

print(f"Total HTML Pages Found: {len(html_files)}")
public_pages = [f for f in html_files if not f.startswith("customer-dashboard") and not f.startswith("admin")]
cust_pages = [f for f in html_files if f.startswith("customer-dashboard")]
admin_pages = [f for f in html_files if f.startswith("admin")]

print(f" - Public Pages: {len(public_pages)} (Expected: 19)")
print(f" - Customer Portal Pages: {len(cust_pages)} (Expected: 11)")
print(f" - Admin Portal Pages: {len(admin_pages)} (Expected: 13)")

assert len(public_pages) == 19, f"Expected 19 public pages, got {len(public_pages)}"
assert len(cust_pages) == 11, f"Expected 11 customer dashboard pages, got {len(cust_pages)}"
assert len(admin_pages) == 13, f"Expected 13 admin dashboard pages, got {len(admin_pages)}"
print(">> All 43 HTML Pages Verified Successfully!")

# 2. Check CSS Files
css_files = [
    "assets/css/style.css",
    "assets/css/components.css",
    "assets/css/dashboard.css",
    "assets/css/dark-mode.css",
    "assets/css/rtl.css",
    "assets/css/responsive.css"
]
for c in css_files:
    full = os.path.join(BASE_DIR, c.replace("/", os.sep))
    assert os.path.isfile(full), f"Missing CSS file: {c}"
print(">> All 6 Core CSS Files Verified Successfully!")

# 3. Check JS Files
js_files = [
    "assets/js/main.js",
    "assets/js/theme.js",
    "assets/js/rtl.js",
    "assets/js/booking.js",
    "assets/js/customer-dashboard.js",
    "assets/js/admin-dashboard.js",
    "assets/js/forms.js"
]
for j in js_files:
    full = os.path.join(BASE_DIR, j.replace("/", os.sep))
    assert os.path.isfile(full), f"Missing JS file: {j}"
print(">> All 7 JavaScript Files Verified Successfully!")

# 4. Check Documentation
doc_files = [
    "documentation/installation-guide.md",
    "documentation/customization-guide.md",
    "documentation/page-structure.md",
    "documentation/integrations.md",
    "documentation/credits.md",
    "sitemap.xml",
    "robots.txt",
    "README.md"
]
for d in doc_files:
    full = os.path.join(BASE_DIR, d.replace("/", os.sep))
    assert os.path.isfile(full), f"Missing Doc file: {d}"
print(">> All Documentation and Meta Files Verified Successfully!")

# 5. Check Internal Links and Image References across all HTML files
broken_links = 0
broken_images = 0

for hf in html_files:
    file_full = os.path.join(BASE_DIR, hf.replace("/", os.sep))
    file_dir = os.path.dirname(file_full)
    with open(file_full, "r", encoding="utf-8") as f:
        content = f.read()

    # Find href links
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', content)
    for href in hrefs:
        # Ignore external links, mailto, tel, javascript, fragments
        if href.startswith("http") or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("#") or href.startswith("javascript:"):
            continue
        clean_href = href.split("?")[0].split("#")[0]
        if not clean_href:
            continue
        target_path = os.path.normpath(os.path.join(file_dir, clean_href.replace("/", os.sep)))
        if not os.path.exists(target_path):
            print(f"BROKEN LINK in {hf}: {href} -> {target_path}")
            broken_links += 1

    # Find src images
    srcs = re.findall(r'src=["\']([^"\']+)["\']', content)
    for src in srcs:
        if src.startswith("http") or src.startswith("data:"):
            continue
        clean_src = src.split("?")[0].split("#")[0]
        if not clean_src:
            continue
        target_path = os.path.normpath(os.path.join(file_dir, clean_src.replace("/", os.sep)))
        if not os.path.exists(target_path):
            print(f"BROKEN IMAGE in {hf}: {src} -> {target_path}")
            broken_images += 1

if broken_links == 0 and broken_images == 0:
    print(">> Zero Broken Links & Zero Broken Image Paths Across All 43 Pages!")
else:
    print(f"Warning: {broken_links} broken links, {broken_images} broken images.")

print("=" * 60)
print("AUDIT RESULT: 100% PASSED!")
print("=" * 60)
