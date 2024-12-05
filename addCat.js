document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cat-form');
    const preloader = document.getElementById('preloader');
    const catContainer = document.getElementById('cat-container');

    const showPreloader = () => {
        preloader.style.display = 'block';
    };

    const hidePreloader = () => {
        preloader.style.display = 'none';
    };

    const showError = (message) => {
        hidePreloader();
        catContainer.innerHTML = `<p class="error">${message}</p>`;
    };

    const renderCat = (catUrl) => {
        hidePreloader();
        catContainer.innerHTML = `
      <img src="${catUrl}" alt="Кошка">
    `;
    };

    const loadCat = async (url) => {
        showPreloader();

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }
            renderCat(response.url);
        } catch (error) {
            showError('Не удалось загрузить кошку. Проверьте URL и соединение.');
            console.error(error);
        }
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const catUrl = document.getElementById('cat-url').value;
        if (catUrl) {
            loadCat(catUrl);
        } else {
            showError('Введите корректный URL.');
        }
    });
});
