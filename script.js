(function () {
    window.addEventListener("load", () => {
        const loadTime = performance.now();
        const footer = document.querySelector("footer");

        if (footer) {
            const loadTimeElement = document.createElement("div");
            loadTimeElement.classList.add("load-time");
            loadTimeElement.textContent = `Page load time: ${loadTime.toFixed(2)} ms`;
            footer.appendChild(loadTimeElement);
        }
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const donateButton = document.querySelector(".donate");
    if (donateButton) {
        donateButton.addEventListener("click", () => {
            window.location.href = "donate.html";
        });
    }

    const currentPage = document.location.pathname;
    if (donateButton.dataset.page === currentPage) {
        donateButton.classList.add("active");
    }
});
