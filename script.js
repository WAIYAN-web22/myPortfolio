/* ══════════════════════════════════════════
   PROJECT GALLERY DATA
══════════════════════════════════════════ */
const PROJECT_DATA = {

  design: {
    title: 'Design',
    tabs: [
      {
        label: 'Business Cards',
        cols: 4,
        itemClass: '',
        images: [
          '1.png',
          '2.png',
          'Business Card Deaign-01.png',
          'Business Card Deaign-02.png',
          'Business Card Deaign1-01.png',
          'Business Card Deaign1-02.png',
          'Business Card-Mockup-Vol 01.png',
          'Business-Card-Mockup.png',
          'Floating business cards showcase mockup by GraphicsFamily.png',
          'Professional Business Card Mockup.png',
          'Two Business Card Mockups.png',
          'photo_2023-04-22_20-52-53.jpg',
          'photo_2023-04-22_20-52-53 (2).jpg',
          'photo_2023-04-22_20-52-54.jpg',
          'photo_2023-04-22_20-52-54 (2).jpg',
        ]
      },
      {
        label: 'My Logo',
        cols: 4,
        itemClass: 'logo-item',
        images: [
          'Main Logo W.png',
          'Logo W.png',
          'app icon.png',
          'Cap.png',
          'keychange.png',
          'BC card.png',
        ]
      },
      {
        label: 'Poster',
        cols: 3,
        itemClass: 'poster-item',
        images: [
          'WAI YAN OO.jpg',
          'CAR  Posyer.png',
          'EXERCISE1.png',
          'EXERCISE2.png',
          'Typo2.png',
          '0602a.png',
          'Untitled-1.jpg',
          'IMG_0533.jpeg',
          'photo_2023-04-22_20-53-41.jpg',
          'photo_2023-04-22_20-53-41 (2).jpg',
          'photo_2023-04-22_20-53-42.jpg',
          'ベース2.png',
        ]
      },
      {
        label: 'Photoshop & Illustrator',
        cols: 4,
        itemClass: '',
        images: [
          '32.png',
          'ふくろう.png',
          'ベース.png',
          'ベース1.png',
          'ベース3.png',
          '人物.png',
          '人物1.png',
          '背景.png',
          '背景2.png',
          '背景3.png',
          '背景4.png',
          '背景5.png',
          '風景.png',
          'photo_2023-04-22_20-55-12.jpg',
          'photo_2023-04-22_20-55-13.jpg',
          'photo_2023-04-22_20-57-47.jpg',
        ]
      }
    ]
  },

  music: {
    title: 'Music App UI',
    tabs: [
      {
        label: 'All Screens',
        cols: 4,
        itemClass: 'ui-item',
        images: [
          'Home Screen.png',
          'New Screen.png',
          'Library Screen.png',
          'Search Screen.png',
          'Setting Screen.png',
          'Artist Screen.png',
          'Ablum Screen.png',
          'Player Screen.png',
        ]
      }
    ]
  },

  website: {
    title: 'Website',
    tabs: [
      {
        label: 'Projects',
        cols: 3,
        itemClass: '',
        links: [
          { label: 'Restaurant Site', url: 'programming/Restaurant/index.html' },
          { label: 'Wedding Site',    url: 'programming/Wedding/index.html'    },
          { label: 'Capyzou Site',    url: 'waiyan-web22.github.io/capyzou/'    },
        ]
      }
    ]
  }
};

/* ── State ── */
let currentImages  = [];
let currentLbIndex = 0;

/* ══════════════════════════════════════════
   OPEN / CLOSE MODAL
══════════════════════════════════════════ */
function openProjectModal(key) {
  const data  = PROJECT_DATA[key];
  if (!data) return;

  document.getElementById('projModalTitle').textContent = data.title;
  document.body.style.overflow = 'hidden';

  buildTabs(data.tabs);
  showTab(data.tabs, 0);

  document.getElementById('projModal').classList.add('open');
}

function closeProjModal() {
  document.getElementById('projModal').classList.remove('open');
  document.body.style.overflow = '';
  closeProjLightbox();
}

function closeProjModalOutside(e) {
  if (e.target === document.getElementById('projModal')) closeProjModal();
}

/* ══════════════════════════════════════════
   TABS
══════════════════════════════════════════ */
function buildTabs(tabs) {
  const container = document.getElementById('projTabs');
  container.innerHTML = '';
  if (tabs.length <= 1) { container.style.display = 'none'; return; }
  container.style.display = 'flex';

  tabs.forEach((tab, i) => {
    const btn = document.createElement('button');
    btn.className = 'proj-tab' + (i === 0 ? ' active' : '');
    btn.textContent = tab.label;
    btn.onclick = () => {
      container.querySelectorAll('.proj-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showTab(tabs, i);
    };
    container.appendChild(btn);
  });
}

function showTab(tabs, index) {
  const tab  = tabs[index];
  const grid = document.getElementById('projImgGrid');
  grid.innerHTML = '';
  grid.className = 'proj-img-grid cols-' + (tab.cols || 4);

  /* image gallery tab */
  if (tab.images) {
    currentImages = tab.images;
    tab.images.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'proj-thumb-item' + (tab.itemClass ? ' ' + tab.itemClass : '');

      const img = document.createElement('img');
      img.src   = encodePathSpaces(src);
      img.alt   = src.split('/').pop().replace(/\.[^.]+$/, '');
      img.loading = 'lazy';

      item.onclick = () => openProjLightbox(i);
      item.appendChild(img);
      grid.appendChild(item);
    });
  }

  /* website link tab */
  if (tab.links) {
    currentImages = [];
    tab.links.forEach(link => {
      const item = document.createElement('a');
      item.className = 'proj-thumb-item website-link-item';
      item.href      = link.url;
      item.target    = '_blank';
      item.rel       = 'noopener';
      item.style.cssText =
        'display:flex;align-items:center;justify-content:center;' +
        'flex-direction:column;gap:12px;padding:32px;aspect-ratio:16/9;' +
        'text-decoration:none;color:var(--white);cursor:pointer;';

      item.innerHTML =
        '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" stroke-width="1.5">' +
        '<circle cx="12" cy="12" r="10"/>' +
        '<line x1="2" y1="12" x2="22" y2="12"/>' +
        '<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' +
        '</svg>' +
        '<span style="font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:1rem;letter-spacing:3px;text-transform:uppercase;">' +
        link.label + '</span>';

      grid.appendChild(item);
    });
  }
}

/* ══════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════ */
function openProjLightbox(index) {
  currentLbIndex = index;
  document.getElementById('plbImg').src = encodePathSpaces(currentImages[index]);
  document.getElementById('projLightbox').classList.add('open');
}

function closeProjLightbox() {
  document.getElementById('projLightbox').classList.remove('open');
  document.getElementById('plbImg').src = '';
}

function closeProjLightboxOutside(e) {
  if (e.target === document.getElementById('projLightbox')) closeProjLightbox();
}

function lbNavProj(dir) {
  if (!currentImages.length) return;
  currentLbIndex = (currentLbIndex + dir + currentImages.length) % currentImages.length;
  document.getElementById('plbImg').src = encodePathSpaces(currentImages[currentLbIndex]);
}

/* keyboard nav */
document.addEventListener('keydown', e => {
  const lb = document.getElementById('projLightbox');
  const modal = document.getElementById('projModal');
  if (lb.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  lbNavProj(-1);
    if (e.key === 'ArrowRight') lbNavProj(1);
    if (e.key === 'Escape')     closeProjLightbox();
  } else if (modal.classList.contains('open') && e.key === 'Escape') {
    closeProjModal();
  }
});

/* ── helper: encode spaces in file paths for src attributes ── */
function encodePathSpaces(path) {
  return path.split('/').map(seg => encodeURIComponent(seg)).join('/');
}

/* ══════════════════════════════════════════
   FLIP CARD
══════════════════════════════════════════ */
function flipCard(clicked) {
  document.querySelectorAll('[data-card]').forEach(card => {
    if (card !== clicked) card.classList.remove('flipped');
  });
  clicked.classList.toggle('flipped');
}

/* ══════════════════════════════════════════
   CUSTOM CURSOR — smooth lagging ring
══════════════════════════════════════════ */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

(function lerpRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(lerpRing);
})();

const clickables = document.querySelectorAll(
  'a, button, .btn, .flip-scene, .project-card, .nav-links a'
);
clickables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovered');
    ring.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovered');
    ring.classList.remove('hovered');
  });
});

document.addEventListener('mousedown', () => {
  dot.style.transform  = 'translate(-50%, -50%) scale(2.2)';
  ring.style.transform = 'translate(-50%, -50%) scale(0.75)';
});
document.addEventListener('mouseup', () => {
  dot.style.transform  = 'translate(-50%, -50%) scale(1)';
  ring.style.transform = 'translate(-50%, -50%) scale(1)';
});

/* ══════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════ */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = Math.min(pct * 100, 100) + '%';
}, { passive: true });

/* ══════════════════════════════════════════
   SCROLL REVEAL SYSTEM
   (observes [data-reveal] elements, respects data-delay)
══════════════════════════════════════════ */
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el    = entry.target;
    const delay = parseFloat(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('is-revealed'), delay);
    revealObs.unobserve(el);
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

/* ══════════════════════════════════════════
   SKILL BARS — animate on scroll
══════════════════════════════════════════ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObs = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  skillFills.forEach((fill, i) => {
    const target = fill.dataset.width || '0';
    fill.style.setProperty('--target-width', target + '%');
    setTimeout(() => fill.classList.add('animate'), i * 120);
  });
  skillObs.disconnect();
}, { threshold: 0.3 });

const skillSection = document.querySelector('.about-right');
if (skillSection) skillObs.observe(skillSection);

/* ══════════════════════════════════════════
   COUNTER ANIMATION — stats boxes
══════════════════════════════════════════ */
const boxes = document.querySelectorAll('.box[data-count]');

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const box    = entry.target;
    const h3     = box.querySelector('h3');
    const target = parseInt(box.dataset.count, 10);
    const suffix = box.dataset.suffix || '';
    const dur    = 1400;
    const start  = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / dur, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      h3.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        box.classList.add('is-popped');
        setTimeout(() => box.classList.remove('is-popped'), 500);
      }
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(box);
  });
}, { threshold: 0.7 });

boxes.forEach(box => counterObs.observe(box));

/* ══════════════════════════════════════════
   HERO PARALLAX — fade + image translate on scroll
══════════════════════════════════════════ */
const heroSection = document.getElementById('heroSection');
const heroFrame   = document.querySelector('.hero-img-frame');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const vh       = window.innerHeight;

  if (scrolled < vh * 1.2) {
    const ratio   = scrolled / (vh * 0.85);
    const opacity = Math.max(0, 1 - ratio);
    if (heroSection) heroSection.style.opacity = opacity;

    if (heroFrame) {
      heroFrame.style.transform =
        `translateY(${scrolled * 0.14}px) rotate(-0.5deg)`;
    }
  }
}, { passive: true });

/* ══════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════ */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x    = e.clientX - rect.left - rect.width  / 2;
    const y    = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px) scale(1.05)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ══════════════════════════════════════════
   SECTION TITLE — staggered char animation
   Works on section-titles that contain plain text or an accent <span>
══════════════════════════════════════════ */
function splitAndAnimateTitle(el) {
  const childNodes = [...el.childNodes];
  el.innerHTML = '';

  childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split('').forEach((ch, i) => {
        const wrap  = document.createElement('span');
        wrap.className = 'char-wrap';
        const inner = document.createElement('span');
        inner.className = 'char-inner';
        inner.textContent = ch === ' ' ? ' ' : ch;
        inner.style.transitionDelay = (i * 28) + 'ms';
        wrap.appendChild(inner);
        el.appendChild(wrap);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const text   = node.textContent;
      const isSpan = node.tagName === 'SPAN';
      text.split('').forEach((ch, i) => {
        const wrap  = document.createElement('span');
        wrap.className = 'char-wrap';
        if (isSpan) wrap.classList.add('accent');
        const inner = document.createElement('span');
        inner.className = 'char-inner';
        inner.textContent = ch === ' ' ? ' ' : ch;
        inner.style.transitionDelay = (i * 28) + 'ms';
        wrap.appendChild(inner);
        el.appendChild(wrap);
      });
    }
  });

  const titleObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    el.querySelectorAll('.char-wrap').forEach(w => w.classList.add('is-visible'));
    titleObs.unobserve(el);
  }, { threshold: 0.4 });

  titleObs.observe(el);
}

document.querySelectorAll('.section-title').forEach(splitAndAnimateTitle);

/* ══════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
══════════════════════════════════════════ */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const nearBottom =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 80;

    if (nearBottom) {
      current = sections[sections.length - 1].id;
    } else {
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
      });
    }

    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

/* ══════════════════════════════════════════
   SCROLL HINT — add after hero (only if not already in HTML)
══════════════════════════════════════════ */
(function addScrollHint() {
  const hero = document.querySelector('.hero-flex');
  if (!hero || hero.querySelector('.scroll-hint')) return;

  const hint = document.createElement('div');
  hint.className = 'scroll-hint';
  hint.innerHTML =
    '<div class="scroll-hint-line"></div>' +
    '<span class="scroll-hint-text">Scroll</span>';
  hero.appendChild(hint);

  window.addEventListener('scroll', () => {
    hint.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
})();

/* ══════════════════════════════════════════
   PROJECT CARD — tilt on mousemove
══════════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    card.style.transform =
      `perspective(700px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
