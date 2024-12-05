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
        .catch(error => console.error('Ошибка запроса тега:', error));


    function fetchCatImage(tag) {
        const imageElement = document.getElementById('cat-image');
        imageElement.src = '';


        fetch(`https://cataas.com/cat/${tag}`)
            .then(response => {
                if (response.ok) {
                    imageElement.src = response.url;
                } else {
                    console.error('Ошибка запроса картинки:', response.statusText);
                }
            })
            .catch(error => console.error('Ошибка запроса картинки:', error));
    }








    toastr.options = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        timeOut: "3000",
    };

    fetch('https://cataas.com/api/tags')
        .then(response => response.json())
        .then(tags => {
            const container = document.getElementById('button-container2');

            tags.forEach(tag => {
                const button = document.createElement('button');
                button.textContent = tag;
                button.className = 'cat-button';
                button.addEventListener('click', () => showCatImage(tag));
                container.appendChild(button);
            });
        })
        .catch((error) => {toastr.error('Ошибка запроса: ' + error.message); console.log(error)});

    function showCatImage(tag) {
        toastr.info(`Загрузка: ${tag}...`);

        fetch(`https://cataas.com/cat/${tag}`)
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: `кошка: ${tag}`,
                        imageUrl: response.url,
                        imageWidth: 400,
                        imageAlt: `кошка ${tag}`,
                        confirmButtonText: 'крутая!',

                    });
                } else {
                    toastr.error(`Не получилось загрузить картинку для тега: ${tag}`);
                    console.log(tag);
                }
            })
            .catch((error) => {toastr.error('Ошибка запроса картинки: ' + error.message); console.log(error)});
    }
});