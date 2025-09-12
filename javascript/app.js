// app.js — dark-style simulation with GO + gauge animation

document.addEventListener("DOMContentLoaded", () => {
  const MAX_DOWNLOAD = 200;
  const button = document.getElementById("startTest") || document.getElementById("startTest"); // keep safe
  const goBtn = document.getElementById("startTest") ? null : document.getElementById("startTest");
  const startControl = document.getElementById("startTest") || document.getElementById("startTest");
  // we used id="startTest" earlier; but the new HTML uses id="startTest" is not present — the new uses id="startTest" or go-btn?
  // To be consistent with new HTML, use id "startTest" not "go-btn". We'll select by the GO button class as fallback:
  const goButton = document.getElementById("startTest") || document.querySelector(".go-btn");
  const result = document.getElementById("result");
  const progress = document.getElementById("progress");
  const gaugeFg = document.querySelector(".g-fg");
  const gaugeNumber = document.getElementById("gaugeNumber");

  function animateNumber(el, from, to, duration = 1200, decimals = 0, onTick) {
    const start = performance.now();
    const diff = to - from;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      // smooth ease (smoothstep-like)
      const eased = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
      const val = from + diff * eased;
      el.textContent = Number(val).toFixed(decimals);
      if (onTick) onTick(val);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function setGaugePercent(pct) {
    const r = 96;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - Math.max(0, Math.min(1, pct)));
    const circle = document.querySelector(".g-fg");
    if (circle) {
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${offset}`;
    }
  }

  function startTest() {
    // prepare UI boxes
    result.innerHTML = `
      <div class="stat-box ping">
        <div class="label">Ping</div>
        <div class="value"><span class="num" id="pingVal">--</span><span class="unit"> ms</span></div>
      </div>
      <div class="stat-box download">
        <div class="label">Download</div>
        <div class="value"><span class="num" id="downloadVal">--</span><span class="unit"> Mbps</span></div>
      </div>
      <div class="stat-box upload">
        <div class="label">Upload</div>
        <div class="value"><span class="num" id="uploadVal">--</span><span class="unit"> Mbps</span></div>
      </div>
    `;

    // update UI state
    const btn = document.querySelector(".go-btn");
    if (btn) { btn.disabled = true; btn.textContent = "…"; }
    progress.style.opacity = "1";
    progress.style.background = `linear-gradient(90deg, rgba(0,209,255,0.25), rgba(0,120,204,0.05))`;
    setGaugePercent(0);
    if (gaugeNumber) gaugeNumber.textContent = "--";

    // ping (fast)
    const pingEl = document.getElementById("pingVal");
    const pingVal = Math.floor(5 + Math.random() * 45);
    animateNumber(pingEl, 0, pingVal, 600, 0);

    // mini progress
    let pct = 0;
    const barInterval = setInterval(() => {
      pct = Math.min(90, pct + (4 + Math.random() * 9));
      progress.style.background = `linear-gradient(90deg, rgba(0,209,255,0.95) ${pct}%, rgba(0,209,255,0.05) ${pct}%)`;
    }, 220);

    // download (main)
    setTimeout(() => {
      const downloadTarget = +(50 + Math.random() * 150).toFixed(2);
      const downloadEl = document.getElementById("downloadVal");
      animateNumber(downloadEl, 0, downloadTarget, 1500, 2, (val) => {
        if (gaugeNumber) gaugeNumber.textContent = Math.round(val);
        setGaugePercent(Number(val) / MAX_DOWNLOAD);
      });
      pct = Math.min(96, pct + 8);
      progress.style.background = `linear-gradient(90deg, rgba(0,209,255,0.95) ${pct}%, rgba(0,209,255,0.05) ${pct}%)`;
    }, 900);

    // upload
    setTimeout(() => {
      const uploadTarget = +(25 + Math.random() * 25).toFixed(2);
      const uploadEl = document.getElementById("uploadVal");
      animateNumber(uploadEl, 0, uploadTarget, 1100, 2);

      clearInterval(barInterval);
      progress.style.background = `linear-gradient(90deg, rgba(0,209,255,0.95) 100%, rgba(0,209,255,0.05) 100%)`;
      setTimeout(() => {
        progress.style.opacity = "0";
        progress.style.background = `linear-gradient(90deg, rgba(0,209,255,0.25), rgba(0,209,255,0.05))`;
        const btn2 = document.querySelector(".go-btn");
        if (btn2) { btn2.disabled = false; btn2.textContent = "GO"; }
      }, 700);
    }, 2800);
  }

  // wire GO button
  const go = document.querySelector(".go-btn");
  if (go) go.addEventListener("click", startTest);

  // init
  setGaugePercent(0);
});
