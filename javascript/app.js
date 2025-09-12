// app.js — simulation for the refined layout

document.addEventListener("DOMContentLoaded", () => {
  const MAX_DOWNLOAD = 200; // gauge reference
  const goButton = document.getElementById("startTest");
  const downloadNumberEl = document.getElementById("downloadNumber");
  const uploadNumberEl = document.getElementById("uploadNumber");
  const pingEl = document.getElementById("pingVal");
  const gaugeNumber = document.getElementById("gaugeNumber");
  const gaugeFg = document.querySelector(".g-fg");
  const publishedTime = document.getElementById("publishedTime");
  const gaugeLabel = document.getElementById("gaugeLabel");

  // set date/time now in the top-meta (format similar to Speedtest)
  function setNow() {
    const d = new Date();
    const opts = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = d.toLocaleDateString(undefined, opts);
    const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    publishedTime.textContent = `${date} ${time}`;
  }
  setNow();

  // helper to animate numbers
  function animateNumber(el, from, to, duration = 1200, decimals = 0, onTick) {
    const start = performance.now();
    const diff = to - from;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out
      const eased = (--t) * t * t + 1;
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
    if (gaugeFg) {
      gaugeFg.style.strokeDasharray = `${circumference}`;
      gaugeFg.style.strokeDashoffset = `${offset}`;
    }
  }

  function startTest() {
    // UI changes
    if (goButton) { goButton.disabled = true; goButton.textContent = '...'; }
    setGaugePercent(0);
    gaugeNumber.textContent = '--';
    downloadNumberEl.textContent = '--';
    uploadNumberEl.textContent = '--';
    pingEl.textContent = '--';

    // simulate ping quickly
    const pingVal = Math.floor(6 + Math.random() * 45);
    animateNumber(pingEl, 0, pingVal, 700, 0);

    // animate download after a short delay
    setTimeout(() => {
      const dlTarget = +(50 + Math.random() * 140).toFixed(2); // 50-190
      animateNumber(downloadNumberEl, 0, dlTarget, 1600, 2, (val) => {
        if (gaugeNumber) gaugeNumber.textContent = Math.round(val);
        setGaugePercent(Number(val) / MAX_DOWNLOAD);
      });
    }, 700);

    // animate upload a little later
    setTimeout(() => {
      const upTarget = +(20 + Math.random() * 50).toFixed(2); // 20-70
      animateNumber(uploadNumberEl, 0, upTarget, 1200, 2);
    }, 2200);

    // re-enable button after everything
    setTimeout(() => {
      if (goButton) { goButton.disabled = false; goButton.textContent = 'GO'; }
      // update top timestamp to now (simulate result time)
      setNow();
    }, 3600);
  }

  // wire GO
  if (goButton) goButton.addEventListener("click", startTest);

  // initial state
  setGaugePercent(0);
});
