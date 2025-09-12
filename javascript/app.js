document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startTest");
  const pingEl = document.getElementById("pingValue");
  const downloadEl = document.getElementById("downloadValue");
  const uploadEl = document.getElementById("uploadValue");
  const tsEl = document.getElementById("timestamp");

  function format(n, decimals = 2) {
    return Number(n).toFixed(decimals);
  }

  startBtn.addEventListener("click", () => {
    pingEl.textContent = "… ms";
    downloadEl.textContent = "… Mbps";
    uploadEl.textContent = "… Mbps";
    tsEl.textContent = "Testing…";

    setTimeout(() => {
      pingEl.textContent = format(5 + Math.random() * 10) + " ms";
      setTimeout(() => {
        downloadEl.textContent = format(100 + Math.random() * 80) + " Mbps";
        setTimeout(() => {
          uploadEl.textContent = format(30 + Math.random() * 20) + " Mbps";
          tsEl.textContent = new Date().toLocaleString();
        }, 800);
      }, 800);
    }, 500);
  });
});
