// =======================================================
// app.js - Speedtest Clone Interactivity
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

  const button = document.getElementById("startTest");
  const result = document.getElementById("result");

  // ================== Event Listener ==================
  button.addEventListener("click", () => {

    // Show "running" message
    result.innerHTML = "<p>Running speed test...</p>";

    // Fake speed test after delay
    setTimeout(() => {

      const ping = (5 + Math.random() * 10).toFixed(2);       // 5–15 ms
      const download = (50 + Math.random() * 150).toFixed(2); // 50–200 Mbps
      const upload = (25 + Math.random() * 25).toFixed(2);    // 25–50 Mbps

      // Inject results
      result.innerHTML = `
        <div class="result-box">
          <strong>Ping</strong>
          <span>${ping} ms</span>
        </div>

        <div class="result-box">
          <strong>Download</strong>
          <span>${download} Mbps</span>
        </div>

        <div class="result-box">
          <strong>Upload</strong>
          <span>${upload} Mbps</span>
        </div>
      `;

    }, 2000);

  });

});
