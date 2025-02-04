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
   *  NOTES FUNCTIONALITY
   *  =============================== */
  const notesList = document.getElementById('notesList');
  const newNoteInput = document.getElementById('newNote');
  const addNoteBtn = document.getElementById('addNoteBtn');

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = notes
      .map((note, index) => `<div class="card"><div class="content">${note}</div><button class="delete-btn" data-index="${index}">Delete</button></div>`)
      .join('');

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        deleteNote(this.getAttribute('data-index'));
      });
    });
  }

  function addNote() {
    const note = newNoteInput.value.trim();
    if (!note) return;
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    newNoteInput.value = '';
    loadNotes();
  }

  function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
  }

  addNoteBtn.addEventListener('click', addNote);
  loadNotes();

  /** ===============================
   *  REMINDER FUNCTIONALITY
   *  =============================== */
  const remindersList = document.getElementById('remindersList');
  const newReminderInput = document.getElementById('newReminder');
  const reminderDateInput = document.getElementById('reminderDate');
  const addReminderBtn = document.getElementById('addReminderBtn');

  function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    remindersList.innerHTML = reminders
      .map(
        (reminder, index) => `<div class="card"><div class="content">${reminder.content} - ${new Date(reminder.dateTime).toLocaleString()}</div>
        <button class="delete-btn" data-index="${index}">Delete</button></div>`
      )
      .join('');

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        deleteReminder(this.getAttribute('data-index'));
      });
    });
  }

  function addReminder() {
    const content = newReminderInput.value.trim();
    const dateTime = reminderDateInput.value;
    if (!content || !dateTime) return;
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push({ content, dateTime });
    localStorage.setItem('reminders', JSON.stringify(reminders));
    newReminderInput.value = '';
    loadReminders();
  }

  function deleteReminder(index) {
    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.splice(index, 1);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    loadReminders();
  }

  addReminderBtn.addEventListener('click', addReminder);
  loadReminders();

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
