(function() {
    const currentPage = document.location.href;

    const menuItems = document.querySelectorAll('nav ul li a');

    menuItems.forEach(item => {
        if (item.href === currentPage) {
            item.classList.add('active');
        }
    });

    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const footer = document.querySelector('footer');
        const loadTimeMessage = document.createElement('p');
        loadTimeMessage.textContent = `Loading time: ${loadTime} ms`;
        footer.appendChild(loadTimeMessage);
    });
})();