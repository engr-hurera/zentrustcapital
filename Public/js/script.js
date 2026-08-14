/* ────── CURSOR */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
setInterval(() => {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
}, 16);
document
  .querySelectorAll(
    "a,button,.bk-card,.art-card,.why-card,.edu-card,.tool-card,.test-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.transform = "translate(-50%,-50%) scale(1.6)";
      ring.style.borderColor = "var(--cursor-hover-solid)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.transform = "translate(-50%,-50%) scale(1)";
      ring.style.borderColor = "var(--border-medium)";
    });
  });

let whatsAppBtn = document.querySelector(".whatsApp");
let enterTagBtn = document.querySelector(".enterTagBtn");

// whatsAppBtn.addEventListener('mousedown', (e) => {
//   console.log('WhatsApp button clicked', e);

//   window.addEventListener('mousemove', moveListener);

//   function moveListener(mouse) {
//     //     // console.log(mouse.clientX, mouse.clientY);
//     console.log(whatsAppBtn.clientHeight, whatsAppBtn.clientWidth);

//     mouse.clientX = e.clientX;
//     mouse.clientY = e.clientY;
//     whatsAppBtn.style.top = (mouse.clientY - (whatsAppBtn.clientHeight / 1.2)) + 'px';
//     whatsAppBtn.style.left = (mouse.clientX - (whatsAppBtn.clientWidth / 1.2)) + 'px';
//     console.log('Mouse move, updating button position to:');

//     window.addEventListener('mouseup', () => {
//       window.removeEventListener('mousemove', moveListener);
//     });
//   }

// });

function HandleMove(e) {
  // console.log(e.type, e.clientX, e.clientY, e.touches[0]);
  // let clientX = e.touches ? e.touches[0].clientX : e.clientX;
  // let clientY = e.touches ? e.touches[0].clientY : e.clientY;
  let clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let clientY = e.touches ? e.touches[0].clientY : e.clientY;
  let offsetX = clientX - whatsAppBtn.clientWidth / 1.5;
  let offsetY = clientY - whatsAppBtn.clientHeight / 1.5;

  let maxX = window.innerWidth - whatsAppBtn.clientWidth;
  let maxY = window.innerHeight - whatsAppBtn.clientHeight;

  let finalX = Math.min(Math.max(0, offsetX), maxX);
  let finalY = Math.min(Math.max(0, offsetY), maxY);
  whatsAppBtn.style.top = finalY + "px";
  whatsAppBtn.style.left = finalX + "px";
  enterTagBtn.style.pointerEvents = "none";
  // enterTagBtn.addEventListener('dragstart', preventDrag);
  if (e.type === "touchmove") {
    e.preventDefault();
  }
  // console.log('Mouse move', 'updating button position to:', clientX, clientY);
}

function Drag(e) {
  window.addEventListener("mousemove", HandleMove);
  window.addEventListener("touchmove", HandleMove, {
    passive: false,
  });
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchend", stopDrag);
}

function stopDrag(params) {
  console.log("Drag stopped");
  window.removeEventListener("mousemove", HandleMove);
  window.removeEventListener("touchmove", HandleMove);
  enterTagBtn.style.pointerEvents = "auto";
  // enterTagBtn.removeEventListener('dragstart', preventDrag);
}

whatsAppBtn.addEventListener("mousedown", Drag);
whatsAppBtn.addEventListener("touchstart", Drag, {
  passive: false,
});
// whatsAppBtn.addEventListener('touchstart', (e) => {
//   console.log('WhatsApp button clicked', e);

//   window.addEventListener('touchmove', moveListener, { passive: false });

//   function moveListener(mouse) {
//     // console.log(mouse.type ===);
//     // console.log(whatsAppBtn.clientHeight, whatsAppBtn.clientWidth);
//     if (mouse.type === 'touchmove'){
//       mouse.preventDefault();
//     }
//     mouse.touches[0].clientX = e.clientX;
//     mouse.touches[0].clientY = e.clientY;
//     whatsAppBtn.style.top = (mouse.touches[0].clientY - (whatsAppBtn.clientHeight / 1.2)) + 'px';
//     whatsAppBtn.style.left = (mouse.touches[0].clientX - (whatsAppBtn.clientWidth / 1.2)) + 'px';
//     console.log('Mouse move, updating button position to:');

//     window.addEventListener('touchend', () => {
//       window.removeEventListener('touchmove', moveListener);
//     });
//   }

// });

console.log(mx, my);

/* ────── PRELOADER */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("gone");
  }, 0);
});

/* ────── HEADER SCROLL */
window.addEventListener("scroll", () => {
  document.getElementById("hdr").classList.toggle("solid", scrollY > 50);
  // document.getElementById('btt').classList.toggle('show', scrollY > 500);
  // document.querySelector('.whatsApp').classList.toggle('moveLeft', scrollY > 500);
  let heightAdd = document.querySelectorAll("header,.ticker-wrap,.hero");
  // let heightAdd = document.querySelectorAll('header')[0].clientHeight;
  let totHeight = 0;
  for (let i = 0; i < heightAdd.length; i++) {
    totHeight += heightAdd[i].clientHeight;
  }
  totHeight = totHeight + totHeight;

  console.log(window.scrollY);
  // console.log(totHeight);
  console.log(heightAdd);
  console.log(heightAdd[0].clientHeight);
  // console.log(heightAdd[1].clientHeight);
  // console.log(heightAdd[2].clientHeight);
  if (scrollY > totHeight / 4) {
    document.querySelector(".whatsApp").classList.add("moveLeft");
    document.getElementById("btt").classList.add("show");
    // document.querySelector('.whatsApp').setAttribute('class', 'moveleft');
  } else {
    document.querySelector(".whatsApp").classList.remove("moveLeft");
    document.getElementById("btt").classList.remove("show");
    document.querySelector(".whatsApp").style = "right: 26px";
  }
  revealAll();
  animCounters();
  animPerfBars();
});

/* ────── MOBILE MENU */
document.querySelectorAll(".hbg").forEach((btn) => {
  btn.addEventListener("click", toggleMob);
});

function toggleMob() {
  document.getElementById("mobNav").classList.toggle("open");
}
document.querySelectorAll(".mob-link").forEach((link) => {
  link.addEventListener("click", closeMob);
});
function closeMob() {
  document.getElementById("mobNav").classList.remove("open");
}

/* ────── TICKER */
const ticks = [
  {
    p: "EUR/USD",
    v: "1.08472",
    c: "+0.38%",
    u: true,
  },
  {
    p: "GBP/USD",
    v: "1.26814",
    c: "+0.22%",
    u: true,
  },
  {
    p: "USD/JPY",
    v: "149.853",
    c: "-0.15%",
    u: false,
  },
  {
    p: "AUD/USD",
    v: "0.64718",
    c: "+0.11%",
    u: true,
  },
  {
    p: "USD/CAD",
    v: "1.35241",
    c: "-0.08%",
    u: false,
  },
  {
    p: "NZD/USD",
    v: "0.59836",
    c: "+0.05%",
    u: true,
  },
  {
    p: "USD/CHF",
    v: "0.89742",
    c: "-0.12%",
    u: false,
  },
  {
    p: "EUR/GBP",
    v: "0.85534",
    c: "+0.09%",
    u: true,
  },
  {
    p: "XAU/USD",
    v: "2341.50",
    c: "+0.62%",
    u: true,
  },
  {
    p: "BTC/USD",
    v: "67,432",
    c: "+2.14%",
    u: true,
  },
  {
    p: "US30",
    v: "39,842",
    c: "-0.34%",
    u: false,
  },
  {
    p: "NASDAQ",
    v: "17,924",
    c: "+0.71%",
    u: true,
  },
];

const ti = document.getElementById("tickerInner");
ti.innerHTML = [...ticks, ...ticks]
  .map(
    (t) => `
  <div class="ticker-item">
    <span class="tp">${t.p}</span>
    <span class="tv">${t.v}</span>
    <span class="tc ${t.u ? "u" : "d"}">${t.c}</span>
    <div class="t-div"></div>
  </div>`,
  )
  .join("");

/* ────── HERO PRICE FLICKER */
setInterval(() => {
  const el = document.getElementById("heroPrice");
  if (!el) return;
  const base = 1.084;
  const v = (base + Math.random() * 0.002).toFixed(5);
  el.textContent = v;
  el.style.color = "var(--teal2)";
  setTimeout(() => (el.style.color = ""), 400);
}, 2200);

/* ────── BROKERS */
const brokers = [
  {
    n: "XM",
    init: "XM",
    color: "#e55",
    star: true,
    tag: "Trusted Global Broker",
    rats: "★★★★★",
    score: "4.9",
    lev: "1:500",
    dep: "$5",
    spd: "0.6 pips",
    bon: "$30 No Dep.",
    chips: ["ECN", "MT4/5", "Regulated"],
    badge: "TOP PICK",
  },
  {
    n: "Exness",
    init: "Ex",
    color: "#22c55e",
    tag: "Ultra-Low Spreads",
    rats: "★★★★★",
    score: "4.8",
    lev: "1:2000",
    dep: "$1",
    spd: "0.1 pips",
    bon: "Unlimited Lev.",
    chips: ["ECN", "Crypto", "MT5"],
  },
  {
    n: "IC Markets",
    init: "IC",
    color: "#3b82f6",
    tag: "True ECN Trading",
    rats: "★★★★☆",
    score: "4.7",
    lev: "1:500",
    dep: "$200",
    spd: "0.0 pips",
    bon: "Copy Trading",
    chips: ["ECN", "cTrader", "Raw"],
  },
  {
    n: "FP Markets",
    init: "FP",
    color: "#a855f7",
    tag: "ASIC Regulated",
    rats: "★★★★☆",
    score: "4.6",
    lev: "1:500",
    dep: "$100",
    spd: "0.0 pips",
    bon: "Vol Rebates",
    chips: ["ECN", "IRESS"],
  },
  {
    n: "Pepperstone",
    init: "Pp",
    color: "#f97316",
    tag: "Award-Winning Broker",
    rats: "★★★★★",
    score: "4.8",
    lev: "1:400",
    dep: "$200",
    spd: "0.0 pips",
    bon: "Cashback",
    chips: ["ECN", "cTrader"],
  },
  {
    n: "AvaTrade",
    init: "Av",
    color: "#06b6d4",
    tag: "Regulated Worldwide",
    rats: "★★★★☆",
    score: "4.5",
    lev: "1:400",
    dep: "$100",
    spd: "0.9 pips",
    bon: "$10K Demo",
    chips: ["Standard", "Crypto"],
  },
];

/* ────── MARKET */
const mktData = [
  {
    p: "EUR/USD",
    f: "🇪🇺🇺🇸",
    bid: "1.08468",
    ask: "1.08475",
    c: "+0.38",
    u: true,
    spd: "0.7",
  },
  {
    p: "GBP/USD",
    f: "🇬🇧🇺🇸",
    bid: "1.26809",
    ask: "1.26820",
    c: "+0.22",
    u: true,
    spd: "1.1",
  },
  {
    p: "USD/JPY",
    f: "🇺🇸🇯🇵",
    bid: "149.848",
    ask: "149.859",
    c: "-0.15",
    u: false,
    spd: "0.9",
  },
  {
    p: "AUD/USD",
    f: "🇦🇺🇺🇸",
    bid: "0.64712",
    ask: "0.64724",
    c: "+0.11",
    u: true,
    spd: "1.2",
  },
  {
    p: "USD/CAD",
    f: "🇺🇸🇨🇦",
    bid: "1.35236",
    ask: "1.35248",
    c: "-0.08",
    u: false,
    spd: "1.4",
  },
  {
    p: "EUR/GBP",
    f: "🇪🇺🇬🇧",
    bid: "0.85528",
    ask: "0.85540",
    c: "+0.09",
    u: true,
    spd: "1.2",
  },
  {
    p: "XAU/USD",
    f: "🥇💵",
    bid: "2340.80",
    ask: "2342.20",
    c: "+0.62",
    u: true,
    spd: "1.4",
  },
  {
    p: "US30",
    f: "🇺🇸📊",
    bid: "39835",
    ask: "39848",
    c: "-0.34",
    u: false,
    spd: "2.0",
  },
];
document.getElementById("mktRows").innerHTML = mktData
  .map(
    (m) => `
  <div class="mkt-row">
    <div><div class="mkt-pair">${m.p}</div><div class="mkt-flag">${m.f}</div></div>
    <div class="mkt-price">${m.bid}</div>
    <div class="mkt-price">${m.ask}</div>
    <div class="mkt-change ${m.u ? "u" : "d"}">${m.u ? "▲" : "▼"} ${m.c}%</div>
    <div class="mkt-spread">${m.spd}</div>
  </div>`,
  )
  .join("");

const sents = [
  {
    p: "EUR/USD",
    b: 68,
  },
  {
    p: "GBP/USD",
    b: 58,
  },
  {
    p: "USD/JPY",
    b: 38,
  },
  {
    p: "XAU/USD",
    b: 75,
  },
  {
    p: "BTC/USD",
    b: 81,
  },
];
document.getElementById("sentRows").innerHTML = sents
  .map(
    (s) => `
  <div class="sent-row">
    <span class="sent-pair">${s.p}</span>
    <div class="sent-track"><div class="sent-fill" style="width:${s.b}%"></div></div>
    <span class="sent-pct">${s.b}%</span>
  </div>`,
  )
  .join("");

const sess = [
  {
    n: "Sydney",
    t: "22:00–07:00",
    live: false,
  },
  {
    n: "Tokyo",
    t: "00:00–09:00",
    live: true,
  },
  {
    n: "London",
    t: "08:00–17:00",
    live: true,
  },
  {
    n: "New York",
    t: "13:00–22:00",
    live: false,
  },
];
document.getElementById("sessRows").innerHTML = sess
  .map(
    (s) => `
  <div class="sess-row">
    <span class="sess-name">${s.n}</span>
    <span class="sess-time">${s.t} UTC</span>
    <div class="sess-dot ${s.live ? "live" : "off"}"></div>
  </div>`,
  )
  .join("");

/* Live price flicker */
setInterval(() => {
  document.querySelectorAll(".mkt-row").forEach((row) => {
    const c = row.querySelector(".mkt-change");
    if (c && Math.random() > 0.75) {
      const u = Math.random() > 0.5;
      c.className = `mkt-change ${u ? "u" : "d"}`;
      c.textContent = `${u ? "▲" : "▼"} ${(Math.random() * 0.5).toFixed(2)}%`;
    }
  });
}, 2500);

/* ────── ARTICLES */
const arts = [
  {
    cat: "Strategy",
    title: "5 Proven Forex Trading Strategies for 2025",
    exc: "Master the techniques professional traders use to consistently profit in volatile markets.",
    date: "Mar 15, 2025",
    bg: "art-bg-1",
    ico: "📊",
    big: true,
  },
  {
    cat: "Analysis",
    title: "Understanding Technical Analysis",
    exc: "Read charts like a professional trader.",
    date: "Mar 12, 2025",
    bg: "art-bg-2",
    ico: "📈",
    big: false,
  },
  {
    cat: "Risk",
    title: "Risk Management Every Trader Must Know",
    exc: "Protect your capital with these rules.",
    date: "Mar 10, 2025",
    bg: "art-bg-3",
    ico: "🛡️",
    big: false,
  },
  {
    cat: "Psychology",
    title: "Mastering Trading Psychology",
    exc: "Overcome fear and greed in trading.",
    date: "Mar 8, 2025",
    bg: "art-bg-4",
    ico: "🧠",
    big: false,
  },
];
document.getElementById("artGrid").innerHTML = arts
  .map(
    (a, i) => `
  <div class="art-card ${a.big ? "big" : ""} sr" style="transition-delay:${i * 0.1}s">
    <div class="art-thumb ${a.bg}" style="font-size:${a.big ? "5rem" : "3rem"}">${a.ico}</div>
    <div class="art-body">
      <span class="art-cat">${a.cat}</span>
      <div class="art-title">${a.title}</div>
      ${a.big ? `<div class="art-excerpt">${a.exc}</div>` : ""}
      <div class="art-foot">
        <span class="art-date">📅 ${a.date}</span>
        <a href="#" class="art-more">Read More →</a>
      </div>
    </div>
  </div>`,
  )
  .join("");

/* ────── EDUCATION */
const courses = [
  {
    n: "01",
    ico: "📚",
    t: "Forex Fundamentals",
    d: "Learn the basics of foreign exchange, how currency pairs work, and how to place your first trade safely.",
    lv: "b",
    lvt: "Beginner",
    dl: 0.1,
  },
  {
    n: "02",
    ico: "📉",
    t: "Technical Analysis",
    d: "Candlestick patterns, support & resistance, moving averages, RSI, MACD and advanced chart patterns.",
    lv: "i",
    lvt: "Intermediate",
    dl: 0.2,
  },
  {
    n: "03",
    ico: "💹",
    t: "Fundamental Analysis",
    d: "Economic indicators, central bank policies, and how global news events move the currency markets.",
    lv: "i",
    lvt: "Intermediate",
    dl: 0.15,
  },
  {
    n: "04",
    ico: "⚖️",
    t: "Risk & Money Management",
    d: "Position sizing, stop losses, risk/reward ratios, and portfolio diversification principles.",
    lv: "b",
    lvt: "Beginner",
    dl: 0.1,
  },
  {
    n: "05",
    ico: "🤖",
    t: "Algorithmic Trading & EAs",
    d: "Build automated trading systems using MetaTrader Expert Advisors and Python-based trading bots.",
    lv: "a",
    lvt: "Advanced",
    dl: 0.25,
  },
  {
    n: "06",
    ico: "🧠",
    t: "Trading Psychology",
    d: "Overcome fear, greed, and emotional trading. Develop the mental discipline for long-term profitability.",
    lv: "i",
    lvt: "Intermediate",
    dl: 0.3,
  },
];
document.getElementById("eduGrid").innerHTML = courses
  .map(
    (c) => `
  <div class="edu-card sr" data-num="${c.n}" style="transition-delay:${c.dl}s">
    <div class="edu-ico">${c.ico}</div>
    <h3>${c.t}</h3>
    <p>${c.d}</p>
    <span class="edu-badge ${c.lv}">${c.lvt}</span>
  </div>`,
  )
  .join("");

/* ────── TOOLS */
const tools = [
  {
    ico: "🧮",
    n: "Pip Calculator",
    d: "Calculate exact pip value for any pair and lot size instantly.",
  },
  {
    ico: "📊",
    n: "Position Size Calc",
    d: "Ideal position size based on account balance and risk %.",
  },
  {
    ico: "💱",
    n: "Currency Converter",
    d: "Convert between 170+ currencies with real-time rates.",
  },
  {
    ico: "📅",
    n: "Economic Calendar",
    d: "Stay ahead of market-moving events and central bank decisions.",
  },
  {
    ico: "📈",
    n: "Live Charts",
    d: "Advanced TradingView charts with 100+ indicators built in.",
  },
  {
    ico: "🎯",
    n: "Profit Calculator",
    d: "Calculate potential profit & loss before entering any trade.",
  },
  {
    ico: "📰",
    n: "Market News",
    d: "Real-time Forex news from trusted global sources.",
  },
  {
    ico: "⚡",
    n: "Spread Comparison",
    d: "Compare live spreads across all partner brokers instantly.",
  },
];
document.getElementById("toolsGrid").innerHTML = tools
  .map(
    (t, i) => `
  <div class="tool-card sr" style="transition-delay:${i * 0.05}s">
    <div class="tool-ico">${t.ico}</div>
    <h4>${t.n}</h4>
    <p>${t.d}</p>
  </div>`,
  )
  .join("");

/* ────── PLATFORMS */
const plats = [
  {
    ico: "🖥️",
    n: "MetaTrader 4/5",
    d: "The world's most popular platform, packed with professional tools and expert advisors.",
    feats: [
      "Advanced charting — 100+ indicators",
      "Expert Advisor (EA) support",
      "One-click trading",
      "Strategy backtester",
    ],
    hl: false,
  },
  {
    ico: "📱",
    n: "ZEN Mobile App",
    d: "Trade on the go with our award-winning app. Available for iOS and Android.",
    feats: [
      "Push notifications & alerts",
      "Biometric login security",
      "Full charting suite",
      "Instant deposits & withdrawals",
    ],
    hl: true,
    badge: "POPULAR",
  },
  {
    ico: "🌐",
    n: "WebTrader",
    d: "Trade directly from your browser with no downloads. Powerful and instant.",
    feats: [
      "Zero installation needed",
      "Cross-browser compatible",
      "Cloud-synced settings",
      "Advanced order types",
    ],
    hl: false,
  },
];
document.getElementById("platGrid").innerHTML = plats
  .map(
    (p, i) => `
  <div class="plat-card ${p.hl ? "hl" : ""} sr" style="transition-delay:${i * 0.15}s">
    ${p.badge ? `<div class="plat-badge">${p.badge}</div>` : ""}
    <div class="plat-ico">${p.ico}</div>
    <h3>${p.n}</h3>
    <p>${p.d}</p>
    <ul class="plat-feats">${p.feats.map((f) => `<li>${f}</li>`).join("")}</ul>
    <button class="btn-plat">Download / Launch →</button>
  </div>`,
  )
  .join("");

/* ────── PERF BARS */
const perfData = [
  {
    p: "EUR/USD",
    pct: 78,
  },
  {
    p: "GBP/JPY",
    pct: 65,
  },
  {
    p: "XAU/USD",
    pct: 83,
  },
  {
    p: "USD/CAD",
    pct: 56,
  },
  {
    p: "BTC/USD",
    pct: 91,
  },
];
document.getElementById("perfContainer").innerHTML = perfData
  .map(
    (p) => `
  <div class="perf-row">
    <span class="perf-p">${p.p}</span>
    <div class="perf-bar-bg"><div class="perf-bar-fill" style="width:0" data-w="${p.pct}%"></div></div>
    <span class="perf-pct">${p.pct}%</span>
  </div>`,
  )
  .join("");

function animPerfBars() {
  document.querySelectorAll(".perf-bar-fill[data-w]").forEach((b) => {
    if (!b.animated) {
      const r = b.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        b.animated = true;
        b.style.width = b.dataset.w;
      }
    }
  });
}

/* ────── TESTIMONIALS */
const tests = [
  {
    stars: "★★★★★",
    q: "ZEN TRUST CAPITAL completely changed how I trade. Found my perfect broker in minutes and have been making consistent profits since. Highly recommend.",
    n: "Ahmed Raza",
    l: "Lahore, Pakistan",
    i: "AR",
  },
  {
    stars: "★★★★★",
    q: "The education section is incredible. As a total beginner I learned everything from scratch. The risk management course alone saved my account multiple times.",
    n: "Fatima Khan",
    l: "Karachi, Pakistan",
    i: "FK",
  },
  {
    stars: "★★★★★",
    q: "Best IB program I've seen. Great commissions, fast payouts, and a very helpful affiliate team. Earning steady passive income every single month.",
    n: "Muhammad Ali",
    l: "Islamabad, Pakistan",
    i: "MA",
  },
  {
    stars: "★★★★☆",
    q: "Their market analysis and trading signals are consistently accurate. I follow the EUR/USD analysis every morning before opening positions.",
    n: "Sara Malik",
    l: "Faisalabad, Pakistan",
    i: "SM",
  },
  {
    stars: "★★★★★",
    q: "24/7 support is fantastic — any issue resolved within minutes. The broker comparison tool helped me switch to a much better broker with lower spreads.",
    n: "Usman Tariq",
    l: "Multan, Pakistan",
    i: "UT",
  },
  {
    stars: "★★★★★",
    q: "Been trading 3 years and ZEN TRUST CAPITAL is my daily resource. The market insights have genuinely improved my trading decisions and profitability.",
    n: "Zainab Hussain",
    l: "Rawalpindi, Pakistan",
    i: "ZH",
  },
];
document.getElementById("testGrid").innerHTML = tests
  .map(
    (t, i) => `
  <div class="test-card sr" style="transition-delay:${i * 0.1}s">
    <div class="test-stars">${t.stars}</div>
    <div class="test-q">${t.q}</div>
    <div class="test-auth">
      <div class="test-av">${t.i}</div>
      <div><div class="test-name">${t.n}</div><div class="test-loc">📍 ${t.l}</div></div>
    </div>
  </div>`,
  )
  .join("");

/* ────── FAQ */
const faqs = [
  {
    q: "What is Forex trading and how does it work?",
    a: "Forex (Foreign Exchange) trading involves buying one currency while simultaneously selling another. Currencies trade in pairs (e.g., EUR/USD). The market operates 24/5 and is the world's largest financial market with over $7 trillion in daily volume.",
  },
  {
    q: "How do I choose the right Forex broker?",
    a: "Consider regulation (FCA, CySEC, ASIC), spreads, leverage, minimum deposit, trading platforms, and customer support quality. Our broker reviews cover all these aspects thoroughly with independent testing.",
  },
  {
    q: "What is leverage and how much should I use?",
    a: "Leverage lets you control larger positions with a smaller deposit. While 1:500+ can amplify profits, it also amplifies losses significantly. Beginners should start at 1:10 to 1:50 until developing a consistently profitable strategy.",
  },
  {
    q: "Is Forex trading halal (permissible in Islam)?",
    a: "Many brokers offer swap-free (Islamic) accounts for Muslim traders. These accounts don't charge overnight interest (swap fees), making them compliant with Islamic finance principles. We highlight Islamic account availability in all our reviews.",
  },
  {
    q: "How much money do I need to start trading?",
    a: "Some brokers allow you to start with as little as $1. However, we recommend starting with $100–$500 for meaningful position sizes and proper risk management. Always practice on a demo account first before risking real money.",
  },
  {
    q: "What are the best currency pairs for beginners?",
    a: "Major pairs like EUR/USD, GBP/USD, and USD/JPY are ideal for beginners due to high liquidity, tight spreads, and abundant educational content. Avoid exotic pairs initially as they have higher spreads and unpredictable volatility.",
  },
  {
    q: "How does the ZEN TRUST CAPITAL IB program work?",
    a: "Register as an IB partner, receive your unique referral link, and earn commissions for every lot traded by clients you refer. Commissions range from $5 to $15 per lot depending on your tier level. Payouts are processed instantly.",
  },
  {
    q: "Are my funds safe with your partner brokers?",
    a: "All brokers on our platform are regulated by top-tier authorities (FCA, CySEC, ASIC). Regulated brokers are required to keep client funds in segregated bank accounts, protecting them from company insolvency.",
  },
];
document.getElementById("faqGrid").innerHTML = faqs
  .map(
    (f) => `
  <div class="faq-item" onclick="toggleFaq(this)">
    <div class="faq-q"><span>${f.q}</span><div class="faq-tog">+</div></div>
    <div class="faq-a">${f.a}</div>
  </div>`,
  )
  .join("");

function toggleFaq(el) {
  const isOpen = el.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach((e) => {
    e.classList.remove("open");
    e.querySelector(".faq-a").classList.remove("open");
  });
  if (!isOpen) {
    el.classList.add("open");
    el.querySelector(".faq-a").classList.add("open");
  }
}

/* ────── SCROLL REVEAL */
function revealAll() {
  document.querySelectorAll(".sr,.sr-l,.sr-r").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9)
      el.classList.add("in");
  });
}
revealAll();

/* ────── COUNTERS */
let countered = false;

function animCounters() {
  if (countered) return;
  const els = document.querySelectorAll("[data-target]");
  els.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      countered = true;
      els.forEach((counter) => {
        const target = +counter.dataset.target;
        const suf = counter.dataset.suffix || "";
        let cur = 0;
        const step = target / 60;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          counter.textContent =
            (target >= 10000
              ? Math.round(cur).toLocaleString()
              : Math.round(cur)) + suf;
          if (cur >= target) clearInterval(t);
        }, 25);
      });
    }
  });
}
