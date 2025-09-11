// app.js - starter interactivity for Speedtest Clone

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("startTest");
  const result = document.getElementById("result");

  button.addEventListener("click", () => {
    result.textContent = "Running speed test...";

    // Simulate a fake test result after 2 seconds
    setTimeout(() => {
      const download = (50 + Math.random() * 150).toFixed(2); // 50–200 Mbps
      const upload = (25 + Math.random() * 25).toFixed(2);    // 25–50 Mbps
      result.innerHTML = `
        <strong>Download:</strong> ${download} Mbps <br>
        <strong>Upload:</strong> ${upload} Mbps
      `;
    }, 2000);
  });
});
