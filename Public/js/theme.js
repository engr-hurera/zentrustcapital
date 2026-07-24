// /* theme.js — shared across all pages */
// (function () {
//   const saved = localStorage.getItem('ztc-theme') || 'dark';
//   document.documentElement.setAttribute('data-theme', saved);
// })();

// function toggleTheme() {
//   const html = document.documentElement;
//   const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
//   html.setAttribute('data-theme', next);
//   localStorage.setItem('ztc-theme', next);
// }

// // Mobile menu
// function toggleMenu() {
//   const menu = document.getElementById('mobile-menu');
//   if (menu) menu.classList.toggle('open');
// }

// // Active nav link
// document.addEventListener('DOMContentLoaded', () => {
//   const page = location.pathname.split('/').pop() || 'index.html';
//   document.querySelectorAll('.nav-links a').forEach(a => {
//     if (a.getAttribute('href') === page) a.classList.add('active');
//   });
// });



// alert('okay'); 
function colorChangeToDark() {
  document.getElementById('btt').style.background = "linear-gradient(135deg, #c8a84b, #e6c96a)";
  document.getElementById('cursor').style.mixBlendMode = "screen";
  // alert("lkj");
  let root = document.querySelector(':root');
  // console.log(root);

  // other pages
  root.style.setProperty('--pages-bg', '#080c12');
  root.style.setProperty('--pages-bg2', '#0e1420');
  root.style.setProperty('--pages-bg3', '#141c2e');
  root.style.setProperty('--pages-bg4', '#1a2338');
  root.style.setProperty('--pages-border', 'rgba(255,255,255,0.07)');
  root.style.setProperty('--pages-text', '#f0f4ff');
  root.style.setProperty('--pages-tex2', '#8a9bc0');
  root.style.setProperty('--pages-text3', '#5a6b8a');
  root.style.setProperty('--pages-card-bg', 'rgba(20,28,46,0.8)');
  root.style.setProperty('--pages-nav-bg', 'rgba(8,12,18,0.92)');
  root.style.setProperty('--pages-input-bg', '#0e1420');


// home
  root.style.setProperty('--navBg', '#142540');
  root.style.setProperty('--navBgSolid', '#0d1f30');
  root.style.setProperty('--liveBorder', '#0a7a47');
  root.style.setProperty('--ink', '#0a0e0d');
  root.style.setProperty('--ink2', '#111918');
  root.style.setProperty('--ink3', '#182120');
  root.style.setProperty('--ink4', '#c4d6e6');
  root.style.setProperty('--sage', '#2a4a45');
  root.style.setProperty('--sage2', '#3a6b63');
  root.style.setProperty('--sage3', '#1e7ec8');
  root.style.setProperty('--teal', '#c8a84b');
  root.style.setProperty('--teal2', '#13e0b8');
  root.style.setProperty('--gold', '#c8a84b');
  root.style.setProperty('--gold2', '#e6c96a');
  root.style.setProperty('--text1', '#f5e0a0');
  root.style.setProperty('--text2', '#e6c96a');
  root.style.setProperty('--text3', '#13e0b8');
  root.style.setProperty('--cream', '#fff');
  root.style.setProperty('--cream2', '#142540');
  root.style.setProperty('--mist', '#9eb5b1');
  root.style.setProperty('--mist2', '#6e8e8a');
  root.style.setProperty('--white', '#fafaf8');
  root.style.setProperty('--up', '#22c98e');
  root.style.setProperty('--dn', '#e85858');
  root.style.setProperty('--logo-text-clr', '#e6c96a');
  root.style.setProperty('--blue-to-yellow', '#e6c96a');
  root.style.setProperty('--lightBlue-to-yellow', '#e6c96a');
  root.style.setProperty('--blue-to-teal12', '#13e0b8');
  root.style.setProperty('--blue-to-teal1', '#1bb89a');
  root.style.setProperty('--darkBlue-to-sage2', '#3a6b63');
  root.style.setProperty('--darkBlue-to-teal12', '#13e0b8');
  root.style.setProperty('--sage2-to-teal2', '#13e0b8');
  root.style.setProperty('--white-to-ink3', '#182120');
  root.style.setProperty('--ink3-to-ink2', 'rgba(42, 74, 69, .3)');
  root.style.setProperty('--mist-to-cream2', '#e8e2d5');
  root.style.setProperty('--surface-card', 'rgba(17, 25, 24, .8)');
  root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, .82)');
  root.style.setProperty('--surface-glass-solid', 'rgba(255, 255, 255, .97)');
  root.style.setProperty('--surface-dark-card', 'rgba(255, 255, 255, .88)');
  root.style.setProperty('--surface-overlay', 'rgba(255, 255, 255, .92)');
  root.style.setProperty('--surface-hover', 'rgba(200, 168, 75, .08)');
  root.style.setProperty('--fb-item-hover', 'rgba(255, 255, 255, .03)');
  root.style.setProperty('--surface-hover-strong', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--surface-inset', 'rgba(14, 122, 191, .05)');
  root.style.setProperty('--surface-stripe', 'rgba(14, 122, 191, .04)');
  root.style.setProperty('--surface-row-hover', 'rgba(255, 255, 255, .04)');
  root.style.setProperty('--surface-stat-mini', 'rgba(14, 122, 191, .07)');
  root.style.setProperty('--surface-faq-tog', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--surface-faq-tog-open', 'rgba(14, 122, 191, .18)');
  root.style.setProperty('--surface-tool-hover', 'rgba(42, 74, 69, .2)');
  root.style.setProperty('--surface-plat-hl', 'linear-gradient(145deg, var(--ink3), rgba(42, 74, 69, .25))');
  root.style.setProperty('--border-subtle', 'rgba(200, 168, 75, .08)');
  root.style.setProperty('--border-medium', 'rgba(200, 168, 75, 0.4)');
  root.style.setProperty('--border-strong', 'rgba(200, 168, 75, .3)');
  root.style.setProperty('--border-gold', 'rgba(154, 104, 0, .18)');
  root.style.setProperty('--border-gold-medium', 'rgba(200, 168, 75, .35)');
  root.style.setProperty('--border-gold-strong', 'rgba(154, 104, 0, .45)');
  root.style.setProperty('--border-card', 'rgba(200, 168, 75, .18)');
  root.style.setProperty('--border-divider', 'rgba(14, 122, 191, .09)');
  root.style.setProperty('--border-header', 'rgba(200, 168, 75, .1)');
  root.style.setProperty('--border-header-solid', 'rgba(200, 168, 75, .1)');
  root.style.setProperty('--border-ticker', 'rgba(14, 122, 191, .12)');
  root.style.setProperty('--border-footer', 'rgba(14, 122, 191, .14)');
  root.style.setProperty('--border-footer-inner', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--shadow-header', 'rgba(200, 168, 75, .3)');
  root.style.setProperty('--cursor-hover-solid', 'rgba(200, 168, 75, 0.6)');
  root.style.setProperty('--card-bg', '#182120');
  root.style.setProperty('--shadow-bk-hover', '0 18px 60px rgba(0, 0, 0, .4)');
  root.style.setProperty('--shadow-chart', '0 24px 80px rgba(0, 0, 0, .6), inset 0 1px 0 rgba(255, 255, 255, .05)');
  root.style.setProperty('--shadow-chip', '0 8px 32px rgba(0, 0, 0, .4)');
  root.style.setProperty('--shadow-perf', '0 20px 60px rgba(0, 0, 0, .3)');
  root.style.setProperty('--shadow-btt', '0 6px 22px rgba(200, 168, 75, .4)');
  root.style.setProperty('--shadow-plat-btn', '0 6px 22px rgba(14, 96, 160, .22)');
  root.style.setProperty('--shadow-btn-main', '0 8px 32px rgba(27, 184, 154, .35)');
  root.style.setProperty('--shadow-btn-main-hover', '0 14px 40px rgba(27, 184, 154, .55)');
  root.style.setProperty('--shadow-btn-cta', '0 4px 18px rgba(14, 96, 160, .22)');
  root.style.setProperty('--shadow-btn-cta-hover', '0 8px 28px rgba(27, 184, 154, .45)');
  root.style.setProperty('--shadow-bk-btn', '0 6px 22px rgba(14, 96, 160, .25)');
  root.style.setProperty('--shadow-emblem', '0 4px 24px rgba(200, 168, 75, .2)');
  root.style.setProperty('--shadow-why', '0 12px 40px rgba(0, 0, 0, .3)');
  root.style.setProperty('--btn-text', '#fafaf8');
  root.style.setProperty('--badge-text', '#ffffff');
  root.style.setProperty('--preloader-bg', '#0a0e0d');
  root.style.setProperty('--preloader-track', '#1f2d2b');
  // root.style.setProperty('--header-bg', 'rgba(10, 14, 13, .7)');
  document.getElementsByTagName('header')[0].style = "background: rgba(10, 14, 13, .7); transition: none;";
  root.style.setProperty('--header-bg-solid', 'rgba(10, 14, 13, .97)');
  root.style.setProperty('--mobnav-bg', 'rgba(11, 17, 16, .98)');
  root.style.setProperty('--hero-orb1', 'rgba(21, 96, 160, .12)');
  root.style.setProperty('--hero-orb2', 'rgba(154, 104, 0, .08)');
  root.style.setProperty('--hero-grid', 'rgba(200, 168, 75, .035)');
  root.style.setProperty('--hero-grad1', 'rgba(42, 74, 69, .5)');
  root.style.setProperty('--hero-grad2', 'rgba(200, 168, 75, .07)');
  root.style.setProperty('--hero-grad3', 'rgba(27, 184, 154, .06)');
  root.style.setProperty('--hero-label-bg', 'rgba(27, 184, 154, .1)');
  root.style.setProperty('--hero-label-border', 'rgba(27, 184, 154, .25)');
  root.style.setProperty('--kpi-bg', 'rgba(255, 255, 255, .04)');
  root.style.setProperty('--kpi-border', 'rgba(255, 255, 255, .08)');
  root.style.setProperty('--ticker-div', 'rgba(14, 122, 191, .18)');
  root.style.setProperty('--cc-stat-bg', 'rgba(255, 255, 255, .03)');
  root.style.setProperty('--cc-stat-border', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--cc-badge-bg', 'rgba(10, 122, 71, .1)');
  root.style.setProperty('--cc-badge-border', 'rgba(10, 122, 71, .25)');
  root.style.setProperty('--chip-bg', 'rgba(17, 25, 24, .92)');
  root.style.setProperty('--chip-border', 'rgba(200, 168, 75, .2)');
  root.style.setProperty('--fb-ico-bg', 'linear-gradient(145deg, rgba(42, 74, 69, .8), rgba(42, 74, 69, .3))');
  root.style.setProperty('--fb-ico-border', 'rgba(200, 168, 75, .15)');
  root.style.setProperty('--perf-track', 'rgba(255, 255, 255, .06)');
  root.style.setProperty('--perf-row-border', 'rgba(14, 122, 191, .09)');
  root.style.setProperty('--stats-bg', 'linear-gradient(135deg, #2a4a45 0%, #182120 50%, #2a4a45 100%)');
  root.style.setProperty('--stats-border', 'rgba(200, 168, 75, .12)');
  root.style.setProperty('--stat-num-color', '#e6c96a');
  root.style.setProperty('--stat-lbl-color', '#6e8e8a');
  root.style.setProperty('--bfil-bg', '#182120');
  root.style.setProperty('--bfil-border', 'rgba(255, 255, 255, .08)');
  root.style.setProperty('--bfil-on-bg', 'rgba(27, 184, 154, .12)');
  root.style.setProperty('--bfil-on-border', 'rgba(27, 184, 154, .3)');
  root.style.setProperty('--bk-bg', '#111918');
  root.style.setProperty('--bk-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--bk-border-star', 'rgba(200, 168, 75, .25)');
  root.style.setProperty('--bk-border-hover', 'rgba(200, 168, 75, .25)');
  root.style.setProperty('--bk-chip-bg', 'rgba(200, 168, 75, .08)');
  root.style.setProperty('--bk-chip-border', 'rgba(200, 168, 75, .15)');
  root.style.setProperty('--wc-ico-t-bg', 'rgba(27, 184, 154, .12)');
  root.style.setProperty('--wc-ico-t-border', 'rgba(27, 184, 154, .2)');
  root.style.setProperty('--wc-ico-g-bg', 'rgba(154, 104, 0, .1)');
  root.style.setProperty('--wc-ico-g-border', 'rgba(154, 104, 0, .2)');
  root.style.setProperty('--mkt-head-bg', 'rgba(200, 168, 75, .05)');
  root.style.setProperty('--mkt-head-border', 'rgba(255, 255, 255, .06)');
  root.style.setProperty('--mkt-row-border', 'rgba(255, 255, 255, .04)');
  root.style.setProperty('--sent-track-bg', 'rgba(232, 88, 88, .2)');
  root.style.setProperty('--sent-fill-end', 'rgba(34, 201, 142, .6)');
  root.style.setProperty('--sess-divider', 'rgba(14, 122, 191, .08)');
  root.style.setProperty('--art-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--art-border-hover', 'rgba(200, 168, 75, .25)');
  root.style.setProperty('--art-shadow-hover', '0 18px 55px rgba(0, 0, 0, .35)');
  root.style.setProperty('--art-cat-bg', 'rgba(27, 184, 154, .1)');
  root.style.setProperty('--art-cat-border', 'rgba(27, 184, 154, .2)');
  root.style.setProperty('--art-cat-color', '#13e0b8');
  root.style.setProperty('--art-bg-1', 'linear-gradient(145deg, #0c2822, #1a5e50, rgba(200, 168, 75, .12))');
  root.style.setProperty('--art-bg-2', 'linear-gradient(145deg, #1a0c22, #4a1a5e, rgba(200, 168, 75, .08))');
  root.style.setProperty('--art-bg-3', 'linear-gradient(145deg, #220c0c, #5e1a1a, rgba(200, 168, 75, .08))');
  root.style.setProperty('--art-bg-4', 'linear-gradient(145deg, #0c1a22, #1a3a5e, rgba(27, 184, 154, .1))');
  root.style.setProperty('--edu-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--edu-border-hover', 'rgba(200, 168, 75, .22)');
  root.style.setProperty('--edu-num-color', 'rgba(200, 168, 75, .05)');
  root.style.setProperty('--edu-b-bg', 'rgba(34, 201, 142, .1)');
  root.style.setProperty('--edu-b-border', 'rgba(34, 201, 142, .2)');
  root.style.setProperty('--edu-i-bg', 'rgba(200, 168, 75, .1)');
  root.style.setProperty('--edu-i-border', 'rgba(200, 168, 75, .2)');
  root.style.setProperty('--edu-a-bg', 'rgba(232, 88, 88, .1)');
  root.style.setProperty('--edu-a-border', 'rgba(232, 88, 88, .2)');
  root.style.setProperty('--tool-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--tool-border-hover', 'rgba(27, 184, 154, .25)');
  root.style.setProperty('--tool-ico-bg', 'rgba(42, 74, 69, .5)');
  root.style.setProperty('--tool-ico-border', 'rgba(200, 168, 75, .12)');
  root.style.setProperty('--plat-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--plat-border-hover', 'rgba(200, 168, 75, .22)');
  root.style.setProperty('--plat-badge-bg', 'linear-gradient(135deg, var(--gold), var(--gold2))');
  root.style.setProperty('--plat-badge-text', 'var(--ink)');
  root.style.setProperty('--ib-bg', 'linear-gradient(145deg, var(--sage) 0%, var(--ink3) 55%, var(--ink2) 100%)');
  root.style.setProperty('--ib-orb', 'rgba(14, 122, 191, .08)');
  root.style.setProperty('--ib-panel-bg', 'rgba(0, 0, 0, .25)');
  root.style.setProperty('--ib-panel-border', 'rgba(200, 168, 75, .2)');
  root.style.setProperty('--ib-tier-border', 'rgba(200, 168, 75, .08)');
  root.style.setProperty('--test-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--test-border-hover', 'rgba(200, 168, 75, .2)');
  root.style.setProperty('--test-shadow-hover', '0 14px 48px rgba(14, 96, 160, .1)');
  root.style.setProperty('--faq-border', 'rgba(255, 255, 255, .07)');
  root.style.setProperty('--faq-open-border', 'rgba(200, 168, 75, .25)');
  root.style.setProperty('--faq-tog-bg', 'rgba(200, 168, 75, .1)');
  root.style.setProperty('--faq-tog-border', 'rgba(200, 168, 75, .2)');
  root.style.setProperty('--faq-tog-color', '#e6c96a');
  root.style.setProperty('--faq-tog-open-bg', 'rgba(200, 168, 75, .15)');
  root.style.setProperty('--cta-bg', 'linear-gradient(145deg, var(--sage) 0%, var(--ink3) 40%, var(--sage2) 100%)');
  root.style.setProperty('--cta-grid', 'rgba(200, 168, 75, .04)');
  root.style.setProperty('--cta-orb', 'rgba(27, 184, 154, .1)');
  root.style.setProperty('--cta-text', '#f0ebe0');
  root.style.setProperty('--cta-sub', '#9eb5b1');
  root.style.setProperty('--cta-btn-main-bg', 'linear-gradient(135deg, var(--blue-to-teal12), var(--darkBlue-to-sage2))');
  root.style.setProperty('--cta-btn-main-hover-bg', 'linear-gradient(135deg, var(--blue-to-teal12), var(--darkBlue-to-sage2))');
  root.style.setProperty('--cta-btn-main-text', '#fafaf8');
  root.style.setProperty('--cta-btn-main-shadow', '0 8px 32px rgba(27, 184, 154, .35)');
  root.style.setProperty('--cta-btn-main-hover-shadow', '0 14px 40px rgba(27, 184, 154, .55)');
  root.style.setProperty('--cta-btn-out-border', 'rgba(255, 255, 255, .18)');
  root.style.setProperty('--cta-btn-out-bg', 'transparent');
  root.style.setProperty('--cta-btn-out-hover-bg', 'rgba(200, 168, 75, .05)');
  root.style.setProperty('--cta-btn-out-hover-border', '#e6c96a');
  root.style.setProperty('--footer-bg', 'var(--ink2)');
  root.style.setProperty('--footer-border', 'rgba(14, 122, 191, .12)');
  root.style.setProperty('--footer-inner-border', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--ft-social-bg', '#182120');
  root.style.setProperty('--ft-social-border', 'rgba(255, 255, 255, .08)');
  root.style.setProperty('--ft-social-hover-bg', 'rgba(200, 168, 75, .1)');
  root.style.setProperty('--ft-social-hover-border', 'rgba(200, 168, 75, .3)');
  root.style.setProperty('--risk-bg', 'rgba(0, 0, 0, .3)');
  root.style.setProperty('--risk-border', 'rgba(200, 168, 75, .06)');
  root.style.setProperty('--risk-text', 'rgba(110, 142, 138, .7)');
  root.style.setProperty('--hero-out-border', 'rgba(255, 255, 255, .18)');
  root.style.setProperty('--hero-out-bg', 'transparent');
  root.style.setProperty('--hero-out-hover-border', '#e6c96a');
  root.style.setProperty('--hero-out-hover-color', '#e6c96a');
  root.style.setProperty('--hero-out-hover-bg', 'rgba(200, 168, 75, .05)');
  console.log(window.getComputedStyle(document.getElementsByTagName('header')[0]).backgroundColor);
  // document.getElementsByTagName('header')[0].style.backgroundColor ="rgba(10, 14, 13, .7)";
  console.log(document.getElementsByTagName('header')[0].style.backgroundColor);
  // isOn = !isOn;
  console.log(isOn);
}

function colorChangeToLight() {
  document.getElementById('btt').style = "";
  document.getElementById('cursor').style.mixBlendMode = "";
  let root = document.querySelector(':root');

   // other pages
  root.style.setProperty('--pages-bg', '');
  root.style.setProperty('--pages-bg2', '');
  root.style.setProperty('--pages-bg3', '');
  root.style.setProperty('--pages-bg4', '');
  root.style.setProperty('--pages-border', '');
  root.style.setProperty('--pages-text', '');
  root.style.setProperty('--pages-tex2', '');
  root.style.setProperty('--pages-text3', '');
  root.style.setProperty('--pages-card-bg', '');
  root.style.setProperty('--pages-nav-bg', '');
  root.style.setProperty('--pages-input-bg', '');


// home
  root.style.setProperty('--navBg', '#142540');
  root.style.setProperty('--navBgSolid', '#0d1f30');
  root.style.setProperty('--liveBorder', '#0a7a47');
  root.style.setProperty('--ink', '');
  root.style.setProperty('--ink2', '');
  root.style.setProperty('--ink3', '');
  root.style.setProperty('--ink4', '#c4d6e6');
  root.style.setProperty('--sage', '');
  root.style.setProperty('--sage2', '');
  root.style.setProperty('--sage3', '#1e7ec8');
  root.style.setProperty('--teal', '');
  root.style.setProperty('--teal2', '');
  root.style.setProperty('--gold', '');
  root.style.setProperty('--gold2', '');
  root.style.setProperty('--text1', '');
  root.style.setProperty('--text2', '');
  root.style.setProperty('--text3', '');
  root.style.setProperty('--cream', '');
  root.style.setProperty('--cream2', '#142540');
  root.style.setProperty('--mist', '');
  root.style.setProperty('--mist2', '');
  root.style.setProperty('--white', '');
  root.style.setProperty('--up', '');
  root.style.setProperty('--dn', '');
  root.style.setProperty('--logo-text-clr', '');
  root.style.setProperty('--blue-to-yellow', '');
  root.style.setProperty('--lightBlue-to-yellow', '');
  root.style.setProperty('--blue-to-teal12', '');
  root.style.setProperty('--blue-to-teal1', '');
  root.style.setProperty('--darkBlue-to-sage2', '');
  root.style.setProperty('--darkBlue-to-teal12', '');
  root.style.setProperty('--sage2-to-teal2', '');
  root.style.setProperty('--white-to-ink3', '');
  root.style.setProperty('--ink3-to-ink2', '');
  root.style.setProperty('--surface-card', '');
  root.style.setProperty('--mist-to-cream2', '');
  root.style.setProperty('--surface-glass', 'rgba(255, 255, 255, .82)');
  root.style.setProperty('--surface-glass-solid', 'rgba(255, 255, 255, .97)');
  root.style.setProperty('--surface-dark-card', 'rgba(255, 255, 255, .88)');
  root.style.setProperty('--surface-overlay', 'rgba(255, 255, 255, .92)');
  root.style.setProperty('--surface-hover', '');
  root.style.setProperty('--fb-item-hover', '');
  root.style.setProperty('--surface-hover-strong', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--surface-inset', 'rgba(14, 122, 191, .05)');
  root.style.setProperty('--surface-stripe', 'rgba(14, 122, 191, .04)');
  root.style.setProperty('--surface-row-hover', '');
  root.style.setProperty('--surface-stat-mini', 'rgba(14, 122, 191, .07)');
  root.style.setProperty('--surface-faq-tog', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--surface-faq-tog-open', 'rgba(14, 122, 191, .18)');
  root.style.setProperty('--surface-tool-hover', '');
  root.style.setProperty('--surface-plat-hl', '');
  root.style.setProperty('--border-subtle', '');
  root.style.setProperty('--border-medium', '');
  root.style.setProperty('--border-strong', '');
  root.style.setProperty('--border-gold', 'rgba(154, 104, 0, .18)');
  root.style.setProperty('--border-gold-medium', 'rgba(154, 104, 0, .3)');
  root.style.setProperty('--border-gold-strong', 'rgba(154, 104, 0, .45)');
  root.style.setProperty('--border-card', '');
  root.style.setProperty('--border-divider', 'rgba(14, 122, 191, .09)');
  root.style.setProperty('--border-header', '');
  root.style.setProperty('--border-header-solid', '');
  root.style.setProperty('--border-ticker', 'rgba(14, 122, 191, .12)');
  root.style.setProperty('--border-footer', 'rgba(14, 122, 191, .14)');
  root.style.setProperty('--border-footer-inner', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--shadow-header', '');
  root.style.setProperty('--cursor-hover-solid', '');
  root.style.setProperty('--card-bg', '');
  root.style.setProperty('--shadow-bk-hover', '');
  root.style.setProperty('--shadow-chart', '');
  root.style.setProperty('--shadow-chip', '');
  root.style.setProperty('--shadow-perf', '');
  root.style.setProperty('--shadow-btt', '');
  root.style.setProperty('--shadow-plat-btn', '0 6px 22px rgba(14, 96, 160, .22)');
  root.style.setProperty('--shadow-btn-main', '');
  root.style.setProperty('--shadow-btn-main-hover', '');
  root.style.setProperty('--shadow-btn-cta', '0 4px 18px rgba(14, 96, 160, .22)');
  root.style.setProperty('--shadow-btn-cta-hover', '');
  root.style.setProperty('--shadow-bk-btn', '0 6px 22px rgba(14, 96, 160, .25)');
  root.style.setProperty('--shadow-emblem', '');
  root.style.setProperty('--shadow-why', '');
  root.style.setProperty('--btn-text', '');
  root.style.setProperty('--badge-text', '');
  root.style.setProperty('--preloader-bg', '');
  root.style.setProperty('--preloader-track', '');
  // root.style.setProperty('--header-bg', 'rgba(240, 245, 249, 0.82)');
  root.style.setProperty('--header-bg-solid', '');
  root.style.setProperty('--mobnav-bg', '');
  root.style.setProperty('--hero-orb1', 'rgba(21, 96, 160, .12)');
  root.style.setProperty('--hero-orb2', 'rgba(154, 104, 0, .08)');
  root.style.setProperty('--hero-grid', '');
  root.style.setProperty('--hero-grad1', '');
  root.style.setProperty('--hero-grad2', '');
  root.style.setProperty('--hero-grad3', '');
  root.style.setProperty('--hero-label-bg', '');
  root.style.setProperty('--hero-label-border', '');
  root.style.setProperty('--kpi-bg', '');
  root.style.setProperty('--kpi-border', '');
  root.style.setProperty('--ticker-div', 'rgba(14, 122, 191, .18)');
  root.style.setProperty('--cc-stat-bg', '');
  root.style.setProperty('--cc-stat-border', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--cc-badge-bg', 'rgba(10, 122, 71, .1)');
  root.style.setProperty('--cc-badge-border', 'rgba(10, 122, 71, .25)');
  root.style.setProperty('--chip-bg', '');
  root.style.setProperty('--chip-border', '');
  root.style.setProperty('--fb-ico-bg', '');
  root.style.setProperty('--fb-ico-border', '');
  root.style.setProperty('--perf-track', '');
  root.style.setProperty('--perf-row-border', 'rgba(14, 122, 191, .09)');
  root.style.setProperty('--stats-bg', '');
  root.style.setProperty('--stats-border', '');
  root.style.setProperty('--stat-num-color', '');
  root.style.setProperty('--stat-lbl-color', '');
  root.style.setProperty('--bfil-bg', '');
  root.style.setProperty('--bfil-border', '');
  root.style.setProperty('--bfil-on-bg', '');
  root.style.setProperty('--bfil-on-border', '');
  root.style.setProperty('--bk-bg', '');
  root.style.setProperty('--bk-border', '');
  root.style.setProperty('--bk-border-star', '');
  root.style.setProperty('--bk-border-hover', '');
  root.style.setProperty('--bk-chip-bg', '');
  root.style.setProperty('--bk-chip-border', '');
  root.style.setProperty('--wc-ico-t-bg', '');
  root.style.setProperty('--wc-ico-t-border', '');
  root.style.setProperty('--wc-ico-g-bg', 'rgba(154, 104, 0, .1)');
  root.style.setProperty('--wc-ico-g-border', 'rgba(154, 104, 0, .2)');
  root.style.setProperty('--mkt-head-bg', '');
  root.style.setProperty('--mkt-head-border', '');
  root.style.setProperty('--mkt-row-border', '');
  root.style.setProperty('--sent-track-bg', '');
  root.style.setProperty('--sent-fill-end', '');
  root.style.setProperty('--sess-divider', 'rgba(14, 122, 191, .08)');
  root.style.setProperty('--art-border', '');
  root.style.setProperty('--art-border-hover', '');
  root.style.setProperty('--art-shadow-hover', '');
  root.style.setProperty('--art-cat-bg', '');
  root.style.setProperty('--art-cat-border', '');
  root.style.setProperty('--art-cat-color', '');
  root.style.setProperty('--art-bg-1', '');
  root.style.setProperty('--art-bg-2', '');
  root.style.setProperty('--art-bg-3', '');
  root.style.setProperty('--art-bg-4', '');
  root.style.setProperty('--edu-border', '');
  root.style.setProperty('--edu-border-hover', '');
  root.style.setProperty('--edu-num-color', '');
  root.style.setProperty('--edu-b-bg', '');
  root.style.setProperty('--edu-b-border', '');
  root.style.setProperty('--edu-i-bg', '');
  root.style.setProperty('--edu-i-border', '');
  root.style.setProperty('--edu-a-bg', '');
  root.style.setProperty('--edu-a-border', '');
  root.style.setProperty('--tool-border', '');
  root.style.setProperty('--tool-border-hover', '');
  root.style.setProperty('--tool-ico-bg', '');
  root.style.setProperty('--tool-ico-border', '');
  root.style.setProperty('--plat-border', '');
  root.style.setProperty('--plat-border-hover', '');
  root.style.setProperty('--plat-badge-bg', '');
  root.style.setProperty('--plat-badge-text', '');
  root.style.setProperty('--ib-bg', '');
  root.style.setProperty('--ib-orb', '');
  root.style.setProperty('--ib-panel-bg', '');
  root.style.setProperty('--ib-panel-border', '');
  root.style.setProperty('--ib-tier-border', '');
  root.style.setProperty('--test-border', '');
  root.style.setProperty('--test-border-hover', '');
  root.style.setProperty('--test-shadow-hover', '0 14px 48px rgba(14, 96, 160, .1)');
  root.style.setProperty('--faq-border', '');
  root.style.setProperty('--faq-open-border', '');
  root.style.setProperty('--faq-tog-bg', '');
  root.style.setProperty('--faq-tog-border', '');
  root.style.setProperty('--faq-tog-color', '');
  root.style.setProperty('--faq-tog-open-bg', '');
  root.style.setProperty('--cta-bg', 'linear-gradient(145deg, var(--sage) 0%, var(--sage2) 40%, var(--sage) 100%)');
  root.style.setProperty('--cta-grid', '');
  root.style.setProperty('--cta-orb', '');
  root.style.setProperty('--cta-text', '');
  root.style.setProperty('--cta-sub', '');
  root.style.setProperty('--cta-btn-main-bg', '');
  root.style.setProperty('--cta-btn-main-hover-bg', '');
  root.style.setProperty('--cta-btn-main-text', '');
  root.style.setProperty('--cta-btn-main-shadow', '');
  root.style.setProperty('--cta-btn-main-hover-shadow', '');
  root.style.setProperty('--cta-btn-out-border', '');
  root.style.setProperty('--cta-btn-out-bg', '');
  root.style.setProperty('--cta-btn-out-hover-bg', '');
  root.style.setProperty('--cta-btn-out-hover-border', '');
  root.style.setProperty('--footer-bg', 'var(--ink2)');
  root.style.setProperty('--footer-border', 'rgba(14, 122, 191, .12)');
  root.style.setProperty('--footer-inner-border', 'rgba(14, 122, 191, .1)');
  root.style.setProperty('--ft-social-bg', '');
  root.style.setProperty('--ft-social-border', '');
  root.style.setProperty('--ft-social-hover-bg', '');
  root.style.setProperty('--ft-social-hover-border', '');
  root.style.setProperty('--risk-bg', '');
  root.style.setProperty('--risk-border', '');
  root.style.setProperty('--risk-text', '');
  root.style.setProperty('--hero-out-border', '');
  root.style.setProperty('--hero-out-bg', '');
  root.style.setProperty('--hero-out-hover-border', '');
  root.style.setProperty('--hero-out-hover-color', '');
  root.style.setProperty('--hero-out-hover-bg', '');
  console.log(isOn);
  document.getElementsByTagName('header')[0].style.backgroundColor = "rgba(240, 245, 249, 0.82)";
  console.log("2", document.getElementsByTagName('header')[0].style.backgroundColor);
}

let isOn = 0;


function ChangeNightMode(btn) {
  console.log(isOn);
  console.log(document.getElementsByTagName('header')[0].style.backgroundColor);
  document.querySelectorAll('body,nav,footer,div,a,button,.bk-card,.art-card,.why-card,.edu-card,.tool-card,.test-card').forEach(el => el.style = "transition: none");
  isOn = !isOn;
  if (isOn == 0 && window.getComputedStyle(document.getElementsByTagName('header')[0]).backgroundColor == "rgba(240, 245, 249, 0.82)") {
    colorChangeToDark();
    btn.innerText = "Light ☀️";
    console.log("1");
  localStorage.setItem('ztc-theme', "dark");

  } else {
    colorChangeToLight();
    btn.innerText = "Dark 🌙";
    console.log("2");
  localStorage.setItem('ztc-theme', "light");
  }
  console.log(isOn);

  console.log(document.getElementsByTagName('header')[0].style.backgroundColor);
}
  console.log(isOn);

(function () {

  const saved = localStorage.getItem('ztc-theme') || "ThemeOnlyByFetchingPreferedBrowserTheme";
console.log(saved);
   // You must include 'dark' (or 'light'), but it catches BOTH changes!
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    
    // This code runs whenever the user switches from light->dark OR dark->light.
    console.log("The user just changed their browser theme setting!");
    
    // e.matches is true if they changed to dark, and false if they changed to light.
    // const currentTheme = e.matches ? 'dark' : 'light';
    // console.log(`The new theme is now: ${currentTheme}`);
    
    // Put your update logic here
    localStorage.setItem('ztc-theme', "ThemeOnlyByFetchingPreferedBrowserTheme");
});
    if (saved === "ThemeOnlyByFetchingPreferedBrowserTheme") {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
console.log("Dark theme is prefered by User's browser",saved);

  console.log("dark prefered");
  document.getElementsByTagName('header')[0].style.backgroundColor = "rgba(10, 14, 13, .7)";
  colorChangeToDark();
  document.getElementById('night-mode').innerText = "Light ☀️";
  // localStorage.setItem('ztc-theme', "dark");

} else {
console.log("Light theme is prefered by User's browser",saved);

  document.getElementsByTagName('header')[0].style.backgroundColor = "rgba(240, 245, 249, 0.82)";
  colorChangeToLight();
  isOn = 1;
  console.log(document.getElementsByTagName('header')[0].style.backgroundColor);
  // localStorage.setItem('ztc-theme', "light");
}
    
    }else if(saved === "light"){
colorChangeToLight();
  document.getElementById('night-mode').innerText = "Dark 🌙";
isOn = 1;
console.log(saved);
    }else{
    colorChangeToDark();
  document.getElementById('night-mode').innerText = "Light ☀️";

console.log(saved);
    }

})();

console.log(isOn);


window.addEventListener('mousemove', () => {
  document.querySelectorAll('body,nav,footer,div,a,button,.bk-card,.art-card,.why-card,.edu-card,.tool-card,.test-card').forEach(el => el.style.transition = "");
})
