const portal = document.querySelector('.portal');

function react(cat) {
  portal.classList.remove('white', 'black');
  // Flush the previous animation so every click starts a fresh cycle.
  void portal.offsetWidth;
  portal.classList.add(cat);
}

for (const zone of document.querySelectorAll('[data-cat]')) {
  zone.addEventListener('click', () => react(zone.dataset.cat));
  zone.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!event.repeat) react(zone.dataset.cat);
    }
  });
}

portal.addEventListener('animationend', () => {
  portal.classList.remove('white', 'black');
});
