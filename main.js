window.addEventListener('DOMContentLoaded', function() {
    const reviews = JSON.parse(localStorage.getItem('rev')) || [];
    const reviewsList = document.getElementById('reviews-list');
    const template = document.getElementById('review-card-template');

    reviews.forEach(function(review) {
        const reviewCard = template.content.cloneNode(true);

        reviewCard.querySelector('.review-name').textContent = review.name;
        reviewCard.querySelector('.review-feedback').textContent = review.feedback;
        reviewCard.querySelector('.review-date').textContent = review.date;

        reviewsList.appendChild(reviewCard);
    });
});


//     почему оно работает
// способы хранения крроме локал