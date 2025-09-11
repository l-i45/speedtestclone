// app.js - starter interactivity for Speedtest Clone

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startTest");
  const result = document.getElementById("result");

  button.addEventListener("click", () => {
    result.textContent = "Running speed test...";

    // Simulate a fake test result after 2 seconds
    setTimeout(() => {
      const download = (50 + Math.random() * 50).toFixed(2); // 50–100 Mbps
      const upload = (10 + Math.random() * 20).toFixed(2);   // 10–30 Mbps
      result.innerHTML = `
        <strong>Download:</strong> ${download} Mbps <br>
        <strong>Upload:</strong> ${upload} Mbps
      `;
    }, 2000);
  });
});
