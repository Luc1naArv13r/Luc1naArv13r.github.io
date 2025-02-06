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


  // Theme Toggle (Corrected and Improved)
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      body.classList.add(savedTheme);
  } else {
      body.classList.add('light'); // Default theme
  }

  themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark');
      } else {
          localStorage.setItem('theme', 'light');
      }
  });
});