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





    fetch('https://cataas.com/api/tags')
        .then(response => response.json())
        .then(tags => {
            const container = document.getElementById('button-container');

            tags.forEach(tag => {
                const button = document.createElement('button');
                button.textContent = tag;
                button.className = 'cat-button';
                button.addEventListener('click', () => fetchCatImage(tag));
                container.appendChild(button);
            });
        })
        .catch(error => console.error('Error fetching tags:', error));


    function fetchCatImage(tag) {
        const imageElement = document.getElementById('cat-image');
        imageElement.src = '';


        fetch(`https://cataas.com/cat/${tag}`)
            .then(response => {
                if (response.ok) {
                    imageElement.src = response.url;
                } else {
                    console.error('Error fetching image:', response.statusText);
                }
            })
            .catch(error => console.error('Error fetching cat image:', error));
    }
});