// Note.js
import { db, addReminder, removeReminder, loadReminders } from './firebase-config.js';

// Function to initialize the calendar (separate function)
function initializeCalendar(calendarEl) {
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        events: [],
        dateClick: function(info) {
            let reminderText = prompt('Enter reminder for ' + info.dateStr);
            if (reminderText) {
                addReminder(reminderText, info.dateStr, calendar); // Use imported function
            }
        },
        eventClick: function(info) {
            if (confirm('Do you want to delete this reminder?')) {
                removeReminder(info.event.id, calendar); // Use imported function
            }
        }
    });
    calendar.render();
    return calendar; // Return the calendar instance
}

// Wait for both the DOM and Firebase to be ready
Promise.all([
    new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve)),
    // Add a promise to check if db is available.
    new Promise(resolve => {
        const checkDb = setInterval(() => {
            if (db) {
                clearInterval(checkDb);
                resolve();
            }
        }, 100); // Check every 100ms
    })
]).then(() => {
    const calendarEl = document.getElementById('calendar');
    const calendar = initializeCalendar(calendarEl);  // Initialize calendar

    document.getElementById("addReminderBtn").addEventListener("click", function() {
        let reminderText = document.getElementById("newReminder").value;
        let reminderDate = document.getElementById("reminderDate").value;
        if (reminderText.trim() && reminderDate) {
            addReminder(reminderText, reminderDate, calendar);
            document.getElementById("newReminder").value = "";
            document.getElementById("reminderDate").value = "";
        }
    });

    loadReminders(calendar); // Load reminders after calendar is initialized
});


// ... rest of your Note.js code (theme toggle, etc.) ...
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});