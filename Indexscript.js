// Indexscript.js
document.addEventListener('DOMContentLoaded', function() {
  // Tab Navigation (Same as before)
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabName) {
      tabContents.forEach(content => content.style.display = 'none');
      document.getElementById(tabName).style.display = 'block';
  }

  tabLinks.forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.getAttribute('data-tab')));
  });

  switchTab('profile'); // Default tab


  // Modal Functionality (Same as before)
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalInfo = document.getElementById('modal-info');
  const closeModalBtns = document.querySelectorAll('.close, #close-modal');

  function showModal(title, info) {
      modalTitle.textContent = title;
      modalInfo.innerHTML = info;
      modal.style.display = 'flex';
  }

  closeModalBtns.forEach(btn => btn.addEventListener('click', () => modal.style.display = 'none'));

  document.querySelectorAll('.book').forEach(book => {
      book.addEventListener('click', function() {
          showModal(this.getAttribute('data-title'), this.getAttribute('data-info'));
      });
  });

  // Theme Toggle (With Smooth Icon Animation)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Function to smoothly change icon
function changeIcon(newIcon) {
    themeIcon.classList.add('fade-out'); // Start fade-out animation
    setTimeout(() => {
        themeIcon.textContent = newIcon; // Change icon
        themeIcon.classList.remove('fade-out'); // Remove fade-out animation
        themeIcon.classList.add('fade-in'); // Start fade-in animation
        setTimeout(() => {
            themeIcon.classList.remove('fade-in'); // Remove fade-in animation after transition
        }, 300);
    }, 200); // Adjust delay to sync with CSS animation
}

  // Theme Toggle (Corrected and Improved)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      body.classList.add(savedTheme);
      themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙'; // Change icon
  } else {
      body.classList.add('light'); // Default theme
      themeIcon.textContent = '🌙'; // Default moon icon
  }

  themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀️'; // Change to sun icon in dark mode
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '🌙'; // Change to moon icon in light mode
    }
  });
});