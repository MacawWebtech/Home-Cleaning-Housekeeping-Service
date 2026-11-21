/**
 * CLEANORA HOME CLEANING & HOUSEKEEPING SERVICE TEMPLATE
 * Premium Motion Controller - motion.js
 * Scroll progress, smart header, hero choreography, split-text headings,
 * staggered grids, 3D tilt + spotlight cards,
 * count-up numbers, dashboard micro-motion and a circular theme-switch reveal.
 * Everything is skipped for users who prefer reduced motion.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var isSmall = window.matchMedia && window.matchMedia('(max-width: 767px)').matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function raf(fn) { return window.requestAnimationFrame(fn); }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ------------------------------------------------------------------ *
   * Theme switch: circular reveal via View Transitions (fade fallback)
   * ------------------------------------------------------------------ */
  function themeTransition() {
    var bypass = false;
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.theme-toggle-btn');
      if (!btn || bypass || reduce) return;

      if (typeof document.startViewTransition === 'function') {
        e.stopImmediatePropagation();
        e.preventDefault();
        var r = btn.getBoundingClientRect();
        var x = r.left + r.width / 2;
        var y = r.top + r.height / 2;
        var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        var t = document.startViewTransition(function () {
          bypass = true;
          btn.click();
          bypass = false;
        });
        t.ready.then(function () {
          document.documentElement.animate(
            { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
            { duration: 750, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
          );
        }).catch(function () {});
      } else {
        var root = document.documentElement;
        root.classList.add('m-theme-fade');
        window.setTimeout(function () { root.classList.remove('m-theme-fade'); }, 650);
      }
    }, true);
  }

  /* ------------------------------------------------------------------ *
   * Scroll progress bar
   * ------------------------------------------------------------------ */
  function progressBar() {
    var bar = document.createElement('div');
    bar.className = 'm-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;

    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; raf(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ *
   * Smart header: hides on scroll down, returns on scroll up
   * ------------------------------------------------------------------ */
  function smartHeader() {
    var header = $('.header-wrapper');
    if (!header) return;
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      var drawerOpen = $('.mobile-nav-drawer.open');
      if (drawerOpen || y < 240) {
        header.classList.remove('m-hide');
      } else if (y > lastY + 8) {
        header.classList.add('m-hide');
      } else if (y < lastY - 8) {
        header.classList.remove('m-hide');
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; raf(update); }
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('m-hide'); });
  }

  /* ------------------------------------------------------------------ *
   * Split text into masked words (accessible: aria-label on the heading)
   * ------------------------------------------------------------------ */
  function splitWords(el) {
    if (el.getAttribute('data-split-done')) return;
    el.setAttribute('data-split-done', '1');
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var idx = 0;

    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var parts = ch.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) {
              frag.appendChild(document.createTextNode(' '));
            } else {
              var w = document.createElement('span');
              w.className = 'm-word';
              w.setAttribute('aria-hidden', 'true');
              var inner = document.createElement('span');
              inner.className = 'm-word-inner';
              inner.style.setProperty('--w', idx++);
              inner.textContent = p;
              w.appendChild(inner);
              frag.appendChild(w);
            }
          });
          ch.parentNode.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.tagName !== 'BR') {
          walk(ch);
        }
      });
    })(el);

    el.classList.add('m-split');
  }

  /* ------------------------------------------------------------------ *
   * Hero choreography
   * ------------------------------------------------------------------ */
  function hero() {
    var h1 = $('main h1') || $('h1');
    if (!h1) return;
    var host = h1.closest('section');
    if (!host) return;
    host.classList.add('m-hero-host');

    var order = 0;
    var picked = $$('.badge, .section-subtitle, h1, p, a.btn, [style*="border-top"]', host).filter(function (el) {
      return !el.closest('.m-hero-art') && !el.closest('form') && !el.closest('nav');
    });

    picked.forEach(function (el) {
      if (el.tagName === 'H1') {
        splitWords(el);
        el.style.setProperty('--base', (order * 110 + 180) + 'ms');
        el.classList.add('m-in');
        order += 2;
      } else {
        el.style.setProperty('--d', order);
        el.classList.add('m-hero-item');
        order += 1;
      }
    });

    /* Artwork: float, glow, mouse parallax */
    var img = $('img[src*="hero"]', host) || $('img', host);
    var art = img && img.parentElement;
    if (art && !art.closest('.service-card, .before-after-wrapper')) {
      art.classList.add('m-hero-art', 'm-hero-item');
      art.style.setProperty('--d', 3);

      if (finePointer && !isSmall) {
        host.addEventListener('pointermove', function (e) {
          var r = host.getBoundingClientRect();
          var nx = (e.clientX - r.left) / r.width - 0.5;
          var ny = (e.clientY - r.top) / r.height - 0.5;
          art.style.setProperty('--rx', (-ny * 7).toFixed(2) + 'deg');
          art.style.setProperty('--ry', (nx * 9).toFixed(2) + 'deg');
          art.style.setProperty('--px', (nx * -16).toFixed(1) + 'px');
          art.style.setProperty('--py', (ny * -10).toFixed(1) + 'px');
        }, { passive: true });
        host.addEventListener('pointerleave', function () {
          art.style.setProperty('--rx', '0deg');
          art.style.setProperty('--ry', '0deg');
          art.style.setProperty('--px', '0px');
          art.style.setProperty('--py', '0px');
        });
      }
    }

    /* Hero badge shimmers */
    var badge = $('.badge-lime', host);
    if (badge) badge.classList.add('m-shimmer');

    /* Cursor-following lime aura (dark heroes only) */
    if (finePointer && !isSmall && host.classList.contains('bg-dark')) {
      var aura = document.createElement('div');
      aura.className = 'm-hero-aura';
      aura.setAttribute('aria-hidden', 'true');
      host.insertBefore(aura, host.firstChild);
      var tx = 0, ty = 0, cx = 0, cy = 0, active = false;

      host.addEventListener('pointermove', function (e) {
        var r = host.getBoundingClientRect();
        tx = e.clientX - r.left;
        ty = e.clientY - r.top;
        if (!active) { cx = tx; cy = ty; active = true; loop(); }
      }, { passive: true });

      var looping = false;
      function loop() {
        if (looping) return;
        looping = true;
        (function step() {
          cx += (tx - cx) * 0.08;
          cy += (ty - cy) * 0.08;
          aura.style.setProperty('--ax', cx.toFixed(1) + 'px');
          aura.style.setProperty('--ay', cy.toFixed(1) + 'px');
          if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) {
            raf(step);
          } else {
            looping = false;
          }
        })();
      }
    }
  }

  /* ------------------------------------------------------------------ *
   * Section headings: words rise when scrolled into view
   * ------------------------------------------------------------------ */
  function headings() {
    var els = $$('main .section-title, main h2.page-title, main .cta-title').filter(function (el) {
      return !el.closest('.m-hero-host h1') && !el.hasAttribute('data-no-split') && el.textContent.trim().length > 0;
    });
    if (!els.length || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('m-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -6% 0px' });

    els.forEach(function (el) {
      splitWords(el);
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------ *
   * Auto-staggered grids
   * ------------------------------------------------------------------ */
  function staggerGrids() {
    if (!('IntersectionObserver' in window)) return;
    var grids = $$('.grid, .kpi-grid').filter(function (g) {
      return g.children.length > 1 &&
        !g.classList.contains('stagger-container') &&
        !g.closest('.stagger-container, form, .modal-box, .mobile-nav-drawer, .m-hero-host, .dashboard-table, [data-no-stagger]');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var g = en.target;
        io.unobserve(g);
        var cols = getComputedStyle(g).gridTemplateColumns.split(' ').length || 1;
        var kids = Array.prototype.slice.call(g.children).filter(function (k) { return k.classList.contains('m-item'); });
        kids.forEach(function (k, i) {
          k.style.setProperty('--i', i % Math.max(cols, 1));
          k.classList.add('m-in');
        });
        window.setTimeout(function () {
          kids.forEach(function (k) {
            k.classList.remove('m-item', 'm-in');
            k.style.removeProperty('--i');
          });
        }, 1500 + cols * 90);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    grids.forEach(function (g) {
      Array.prototype.slice.call(g.children).forEach(function (k) {
        if (k.tagName !== 'SCRIPT' && k.tagName !== 'STYLE') k.classList.add('m-item');
      });
      io.observe(g);
    });
  }

  /* ------------------------------------------------------------------ *
   * Cards: cursor spotlight + subtle 3D tilt
   * ------------------------------------------------------------------ */
  function cards() {
    if (!finePointer) return;
    var sel = '.service-card, .pricing-card, .feature-box, .testimonial-card, .kpi-card, .team-card, .blog-card';
    $$(sel).forEach(function (card) {
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      var glow = document.createElement('span');
      glow.className = 'm-glow';
      glow.setAttribute('aria-hidden', 'true');
      card.appendChild(glow);
      card.classList.add('m-card');

      var tilt = !card.classList.contains('featured') && card.offsetWidth < 620;
      var pending = null;

      card.addEventListener('pointerenter', function () { card.classList.add('m-tilting'); });
      card.addEventListener('pointermove', function (e) {
        if (card.classList.contains('m-item')) return;
        var r = card.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        if (pending) return;
        pending = raf(function () {
          pending = null;
          card.style.setProperty('--mx', x.toFixed(0) + 'px');
          card.style.setProperty('--my', y.toFixed(0) + 'px');
          if (tilt) {
            var rx = ((0.5 - y / r.height) * 6).toFixed(2);
            var ry = ((x / r.width - 0.5) * 6).toFixed(2);
            card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-6px)';
          }
        });
      }, { passive: true });
      card.addEventListener('pointerleave', function () {
        card.classList.remove('m-tilting');
        card.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Count-up numbers
   * ------------------------------------------------------------------ */
  function counters() {
    if (!('IntersectionObserver' in window)) return;
    var re = /^([^\d\n]*?)(\d[\d,]*(?:\.\d+)?)((?:[^\d\n]|\/\s*\d+)*)$/;
    var list = [];

    $$('main *, .dashboard-content *').forEach(function (el) {
      if (el.children.length || el.id || el.closest('[id], form, .pricing-card, [style*="position: sticky"], .m-split, .dashboard-table')) return;
      var txt = el.textContent.trim();
      if (txt.length === 0 || txt.length > 18) return;
      var m = txt.match(re);
      if (!m) return;
      var isKpi = el.classList.contains('kpi-value');
      if (!isKpi) {
        var fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 26) return;
        if (/price|amount/i.test(el.className)) return;
      }
      if (m[2].length > 1 && m[2].charAt(0) === '0' && m[2].charAt(1) !== '.') return;
      list.push({ el: el, text: el.textContent, pre: m[1], num: m[2], suf: m[3] });
    });

    if (!list.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var item = en.target.__mc;
        run(item);
      });
    }, { threshold: 0.6 });

    list.forEach(function (item) {
      var el = item.el;
      el.__mc = item;
      el.classList.add('m-count');
      el.style.minWidth = el.getBoundingClientRect().width + 'px';
      el.textContent = item.pre + fmt(0, item) + item.suf;
      io.observe(el);
    });

    function fmt(v, item) {
      var dec = (item.num.split('.')[1] || '').length;
      var s = v.toFixed(dec);
      if (item.num.indexOf(',') > -1) {
        var parts = s.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        s = parts.join('.');
      }
      return s;
    }

    function run(item) {
      var target = parseFloat(item.num.replace(/,/g, ''));
      var dur = 1600;
      var t0 = null;
      function frame(t) {
        if (t0 === null) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 4);
        item.el.textContent = item.pre + fmt(target * eased, item) + item.suf;
        if (p < 1) raf(frame);
        else item.el.textContent = item.text;
      }
      raf(frame);
    }
  }

  /* ------------------------------------------------------------------ *
   * Dashboard micro-motion
   * ------------------------------------------------------------------ */
  function dashboard() {
    $$('.dashboard-table tbody tr').forEach(function (tr, i) {
      tr.style.setProperty('--i', Math.min(i, 12));
      tr.classList.add('m-row');
    });
    $$('.chart-bar').forEach(function (b, i) {
      b.style.setProperty('--i', i);
      b.classList.add('m-bar');
    });
  }

  /* ------------------------------------------------------------------ */
  themeTransition();

  ready(function () {
    if (reduce) return;
    progressBar();
    smartHeader();
    hero();
    headings();
    staggerGrids();
    cards();
    counters();
    dashboard();
  });
})();
