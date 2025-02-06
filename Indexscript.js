document.addEventListener('DOMContentLoaded', function() {
  /** ===============================
   *  TAB NAVIGATION FUNCTIONALITY
   *  =============================== */
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  function switchTab(tabName) {
    tabContents.forEach(content => (content.style.display = 'none'));
    document.getElementById(tabName).style.display = 'block';
  }

  tabLinks.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.getAttribute('data-tab')));
  });

  switchTab('profile'); // Default tab

  /** ===============================
   *  MODAL FUNCTIONALITY (BOOKS ONLY)
   *  =============================== */
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalInfo = document.getElementById('modal-info');
  const closeModalBtns = document.querySelectorAll('.close, #close-modal');

  function showModal(title, info) {
    modalTitle.textContent = title;
    modalInfo.innerHTML = info;
    modal.style.display = 'flex';
  }

  closeModalBtns.forEach(btn => btn.addEventListener('click', () => (modal.style.display = 'none')));

  document.querySelectorAll('.book').forEach(book => {
    book.addEventListener('click', function() {
      showModal(this.getAttribute('data-title'), this.getAttribute('data-info'));
    });
  });


  /** ===============================
   *  THEME TOGGLE FUNCTIONALITY
   *  =============================== */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check if theme is saved in localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  body.classList.add(currentTheme);

  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    if (body.classList.contains('light')) {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  });
});
