document.getElementById('submit-btn').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (name === '' || feedback === '') {
        alert('Пожалуйста, заполните все поля!');
    } else {
        document.getElementById('thank-you-message').style.display = 'block';
    }

    const review = {
        name: name,
        feedback: feedback,
        date: new Date().toLocaleDateString()
    };

    let reviews = JSON.parse(localStorage.getItem('rev')) || [];
    reviews.push(review);
    localStorage.setItem('rev', JSON.stringify(reviews));

    document.getElementById('feedback-form').reset();
});