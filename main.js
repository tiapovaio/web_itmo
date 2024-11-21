    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const reviewsList = document.getElementById('reviews-list');

    reviews.forEach((review) => {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.innerHTML = `
        <h4>${review.name}</h4>
        <p>${review.feedback}</p>
      `;
    reviewsList.appendChild(reviewElement);
});
