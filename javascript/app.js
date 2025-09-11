
// app.js - starter script for Speedtest Clone

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("startTest");
    const result = document.getElementById("result");

    button.addEventListener("click", () => {
        result.innerText = "Running speed test...";
        setTimeout(() => {
            // Fake test result for now
            result.innerText = "Download: 50 Mbps | Upload: 20 Mbps";
        }, 2000);
    });
});

