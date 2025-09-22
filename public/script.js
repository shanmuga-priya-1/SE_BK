// Highlight active nav link based on current URL
document.querySelectorAll('nav a').forEach(link => {
  if(link.href === window.location.href) {
    link.classList.add('active');
  }
});

// Contact form validation and submission handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if(name === '' || email === '' || message === '') {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Please fill in all fields.';
      return;
    }

    // Email basic validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!emailPattern.test(email.toLowerCase())) {
      formMessage.style.color = 'red';
      formMessage.textContent = 'Please enter a valid email.';
      return;
    }

    // Simulate successful submission
    formMessage.style.color = 'green';
    formMessage.textContent = 'Thanks for reaching out! We will get back to you soon.';

    // Clear form fields
    contactForm.reset();
  });
}
// Toggle more info text on click for Fresh Ingredients & Diverse Flavors
const toggleCards = ['fresh-ingredients', 'diverse-flavors'];

toggleCards.forEach(id => {
  const card = document.getElementById(id);
  if(card) {
    card.addEventListener('click', () => {
      const moreInfo = card.querySelector('.more-info');
      const shortDesc = card.querySelector('.short-desc');

      if(moreInfo.style.display === 'none') {
        moreInfo.style.display = 'block';
        shortDesc.style.display = 'none';

        // Add fade-in animation
        moreInfo.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
          opacity += 0.05;
          moreInfo.style.opacity = opacity;
          if(opacity >= 1) clearInterval(fadeIn);
        }, 30);
      } else {
        moreInfo.style.display = 'none';
        shortDesc.style.display = 'block';
      }
    });
  }
});



// FAVORITES FEATURE
const favButtons = document.querySelectorAll('.fav-btn');

// Load favorites from localStorage or empty array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Set button state based on favorites saved
favButtons.forEach(btn => {
  const card = btn.closest('.food-card');
  const foodId = card.dataset.foodId;

  if(favorites.includes(foodId)) {
    btn.classList.add('favorited');
    btn.textContent = '❤️';
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if(btn.classList.contains('favorited')) {
      // Remove from favorites
      favorites = favorites.filter(id => id !== foodId);
      btn.classList.remove('favorited');
      btn.textContent = '🤍';
    } else {
      // Add to favorites
      favorites.push(foodId);
      btn.classList.add('favorited');
      btn.textContent = '❤️';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        formMessage.textContent = result.message;

        if (response.ok) {
          form.reset();
        } else {
          formMessage.style.color = 'red';
        }
      } catch (err) {
        formMessage.textContent = 'An error occurred. Try again later.';
        formMessage.style.color = 'red';
      }
    });
  }
});
