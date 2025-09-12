// app.js - Speedtest-like simulation with animated numbers

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startTest");
  const result = document.getElementById("result");
  const progress = document.getElementById("progress");

  function animateNumber(el, from, to, duration = 1200, decimals = 0) {
    const start = performance.now();
    const diff = to - from;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const val = from + diff * t;
      el.textContent = Number(val).toFixed(decimals);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  button.addEventListener("click", () => {
    // prepare UI
    result.innerHTML = `
      <div class="stat-box ping"><div class="label">Ping</div><div class="value">--<span class="unit">ms</span></div></div>
      <div class="stat-box download"><div class="label">Download</div><div class="value">--<span class="unit">Mbps</span></div></div>
      <div class="stat-box upload"><div class="label">Upload</div><div class="value">--<span class="unit">Mbps</span></div></div>
    `;
    progress.style.width = "0%";
    progress.setAttribute('aria-hidden','false');

    // show running state
    button.disabled = true;
    button.textContent = "Testing...";

    // Simulate ping quickly
    const pingVal = Math.floor(5 + Math.random() * 45); // 5-50 ms
    const pingEl = result.querySelector(".ping .value");
    animateNumber(pingEl, 0, pingVal, 600, 0);

    // animate progress bar faux
    let pct = 0;
    const int = setInterval(() => {
      pct = Math.min(90, pct + Math.random() * 12);
      progress.style.background = `linear-gradient(90deg, rgba(52,152,219,0.9) ${pct}%, rgba(52,152,219,0.05) ${pct}%)`;
    }, 250);

    // After small delay, simulate download measurement (count up)
    setTimeout(() => {
      const downloadTarget = +(50 + Math.random() * 150).toFixed(2); // 50-200
      const downloadEl = result.querySelector(".download .value");
      animateNumber(downloadEl, 0, downloadTarget, 1400, 2);

      // raise progress step
      progress.style.background = `linear-gradient(90deg, rgba(52,152,219,0.95) 92%, rgba(52,152,219,0.05) 92%)`;
    }, 1000);

    // After download finishes, measure upload
    setTimeout(() => {
      const uploadTarget = +(25 + Math.random() * 25).toFixed(2); // 25-50
      const uploadEl = result.querySelector(".upload .value");
      animateNumber(uploadEl, 0, uploadTarget, 1200, 2);

      // finish progress bar and cleanup
      clearInterval(int);
      progress.style.background = `linear-gradient(90deg, rgba(52,152,219,0.95) 100%, rgba(52,152,219,0.05) 100%)`;
      setTimeout(() => {
        progress.style.background = `linear-gradient(90deg, rgba(52,152,219,0.25), rgba(52,152,219,0.05))`;
        progress.setAttribute('aria-hidden','true');
        button.disabled = false;
        button.textContent = "Start Test";
      }, 600);
    }, 2800); // schedule upload after download animation
  });
});
