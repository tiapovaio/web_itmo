document.getElementById('submit-btn').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (!name || !feedback) {
        alert('Пожалуйста, заполните все поля формы!');
        return;
    }
    const review = {
        name,
        feedback,
        date: new Date().toLocaleString(),
    };

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    window.location.href = 'main.html';
});