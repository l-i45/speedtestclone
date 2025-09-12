// app.js - Speedtest-like simulation with gauge + animated numbers

document.addEventListener("DOMContentLoaded", () => {
  const MAX_DOWNLOAD = 200; // for gauge normalization

  const button = document.getElementById("startTest");
  const result = document.getElementById("result");
  const progress = document.getElementById("progress");
  const gaugeFg = document.querySelector(".gauge-fg");
  const gaugeNumber = document.getElementById("gaugeNumber");

  // helper: animate a number into an element
  function animateNumber(el, from, to, duration = 1200, decimals = 0, onTick) {
    const start = performance.now();
    const diff = to - from;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const val = from + diff * t;
      el.textContent = Number(val).toFixed(decimals);
      if (onTick) onTick(val);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // gauge helpers
  function setGaugePercent(pct) {
    // circle r = 90 (circumference ≈ 565.48)
    const circumference = 2 * Math.PI * 90;
    const offset = circumference * (1 - Math.max(0, Math.min(1, pct)));
    gaugeFg.style.strokeDasharray = `${circumference}`;
    gaugeFg.style.strokeDashoffset = `${offset}`;
  }

  button.addEventListener("click", () => {
    // reset UI
    result.innerHTML = `
      <div class="stat-box ping"><div class="label">Ping</div><div class="value"><span class="num" id="pingVal">--</span><span class="unit"> ms</span></div></div>
      <div class="stat-box download"><div class="label">Download</div><div class="value"><span class="num" id="downloadVal">--</span><span class="unit"> Mbps</span></div></div>
      <div class="stat-box upload"><div class="label">Upload</div><div class="value"><span class="num" id="uploadVal">--</span><span class="unit"> Mbps</span></div></div>
    `;
    progress.style.opacity = "1";
    // fake running
    button.disabled = true;
    button.textContent = "Testing...";

    // animate ping
    const pingEl = document.getElementById("pingVal");
    const pingVal = Math.floor(5 + Math.random() * 45); // 5-50 ms
    animateNumber(pingEl, 0, pingVal, 600, 0);

    // small progressive visual (progress gradient) - simple increments
    let pct = 0;
    const barInterval = setInterval(() => {
      pct = Math.min(90, pct + (4 + Math.random() * 8));
      progress.style.background = `linear-gradient(90deg, rgba(0,169,255,0.95) ${pct}%, rgba(0,169,255,0.05) ${pct}%)`;
    }, 220);

    // download after short delay
    setTimeout(() => {
      const downloadTarget = +(50 + Math.random() * 150).toFixed(2); // 50-200
      const downloadEl = document.getElementById("downloadVal");

      // animate numeric value and update gauge center simultaneously
      animateNumber(downloadEl, 0, downloadTarget, 1400, 2, (val) => {
        gaugeNumber.textContent = Number(val).toFixed(0);
        // set gauge pct proportionally
        setGaugePercent(Number(val) / MAX_DOWNLOAD);
      });
      // bump progress visually further
      pct = Math.min(96, pct + 8);
      progress.style.background = `linear-gradient(90deg, rgba(0,169,255,0.95) ${pct}%, rgba(0,169,255,0.05) ${pct}%)`;
    }, 900);

    // upload after download finishes
    setTimeout(() => {
      const uploadTarget = +(25 + Math.random() * 25).toFixed(2); // 25-50
      const uploadEl = document.getElementById("uploadVal");
      animateNumber(uploadEl, 0, uploadTarget, 1100, 2);

      // finish progress and cleanup after a short wait
      clearInterval(barInterval);
      progress.style.background = `linear-gradient(90deg, rgba(0,169,255,0.95) 100%, rgba(0,169,255,0.05) 100%)`;
      setTimeout(() => {
        progress.style.opacity = "0";
        progress.style.background = `linear-gradient(90deg, rgba(0,169,255,0.25), rgba(0,169,255,0.05))`;
        button.disabled = false;
        button.textContent = "Start Test";
      }, 600);
    }, 2600);
  });

  // ensure gauge initial state
  setGaugePercent(0);
});
