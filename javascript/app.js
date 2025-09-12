// app.js - Simulated Speed Test (plain stats, no boxes)

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const startBtn = document.getElementById("startTest");
  const pingEl = document.getElementById("pingValue");
  const downloadEl = document.getElementById("downloadValue");
  const uploadEl = document.getElementById("uploadValue");
  const tsEl = document.getElementById("timestamp");

  // Helper to format numbers
  function formatNumber(n, decimals = 2) {
    return Number(n).toFixed(decimals);
  }

  // Click handler
  startBtn.addEventListener("click", () => {

    // Show immediate running state
    pingEl.textContent = "… ms";
    downloadEl.textContent = "… Mbps";
    uploadEl.textContent = "… Mbps";
    tsEl.textContent = "Running test…";

    // Simulate a short staged run for better UX (optional)
    setTimeout(() => {
      // Ping first
      const ping = 5 + Math.random() * 10;          // 5 - 15 ms
      pingEl.textContent = formatNumber(ping, 2) + " ms";

      // Next stage: download
      setTimeout(() => {
        const download = 50 + Math.random() * 150; // 50 - 200 Mbps
        downloadEl.textContent = formatNumber(download, 2) + " Mbps";

        // Next stage: upload
        setTimeout(() => {
          const upload = 25 + Math.random() * 25; // 25 - 50 Mbps
          uploadEl.textContent = formatNumber(upload, 2) + " Mbps";

          // final timestamp
          const now = new Date();
          tsEl.textContent = now.toLocaleString();
        }, 700);

      }, 700);

    }, 500);

  });
});
