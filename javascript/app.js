// app.js - polished interactivity for Speedtest Clone

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startTest");
  const result = document.getElementById("result");

  button.addEventListener("click", () => {
    result.innerHTML = "<p>Running speed test...</p>";

    // Simulate a fake test result after 2 seconds
    setTimeout(() => {
      const download = (50 + Math.random() * 150).toFixed(2); // 50–200 Mbps
      const upload = (25 + Math.random() * 25).toFixed(2);   // 25–50 Mbps

      result.innerHTML = `
        <div class="stat-box">
          <strong>Download</strong>
          <span>${download} Mbps</span>
        </div>
        <div class="stat-box">
          <strong>Upload</strong>
          <span>${upload} Mbps</span>
        </div>
      `;
    }, 2000);
  });
});
