// Note.js
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'; // Or your preferred UUID library

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        events: [],
        dateClick: function(info) {
            let reminderText = prompt('Enter reminder for ' + info.dateStr);
            if (reminderText) {
                addReminder(reminderText, info.dateStr, calendar);
            }
        },
        eventClick: function(info) {
            if (confirm('Do you want to delete this reminder?')) {
                removeReminder(info.event.id, calendar);
            }
        }
    });
    calendar.render();

    loadReminders(calendar); // Load reminders from local storage

    document.getElementById("addReminderBtn").addEventListener("click", function() {
        let reminderText = document.getElementById("newReminder").value;
        let reminderDate = document.getElementById("reminderDate").value;
        if (reminderText.trim() && reminderDate) {
            addReminder(reminderText, reminderDate, calendar);
            document.getElementById("newReminder").value = "";
            document.getElementById("reminderDate").value = "";
        }
    });

    // Event delegation for reminder delete buttons
    const reminderList = document.getElementById("reminderList");
    reminderList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-reminder')) {
            const reminderId = event.target.dataset.reminderId;
            removeReminder(reminderId, calendar);
        }
    });

    // Note handling
    const notesList = document.getElementById("notesList");
    loadNotes(); // Load notes from local storage

    document.getElementById("addNoteBtn").addEventListener("click", function() {
        let noteText = document.getElementById("newNote").value;
        if (noteText.trim()) {
            addNote(noteText);
            document.getElementById("newNote").value = "";
        }
    });

    // Event delegation for note delete buttons
    notesList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-note')) {
            const noteId = event.target.dataset.noteId;
            removeNote(noteId);
        }
    });
});

// Reminder Functions
function addReminder(text, date, calendar) {
    const reminder = {
        id: uuidv4(),
        text: text,
        date: date
    };

    let reminders = getRemindersFromLocalStorage() || [];
    reminders.push(reminder);
    saveRemindersToLocalStorage(reminders);

    let event = calendar.addEvent({
        title: reminder.text,
        start: reminder.date,
        id: reminder.id
    });

    const reminderList = document.getElementById("reminderList");
    const reminderItem = createReminderItem(reminder, calendar);
    reminderList.appendChild(reminderItem);
}

function createReminderItem(reminder, calendar) {
    const reminderItem = document.createElement("div");
    reminderItem.classList.add("reminder-item");
    reminderItem.setAttribute("data-event-id", reminder.id); // Keep this for FullCalendar
    reminderItem.innerHTML = `${reminder.text} - ${reminder.date} <button class="delete-reminder" data-reminder-id="${reminder.id}">Delete</button>`; // Use innerHTML

    return reminderItem;
}

function removeReminder(reminderId, calendar) {
    let reminders = getRemindersFromLocalStorage() || [];
    reminders = reminders.filter(reminder => reminder.id !== reminderId);
    saveRemindersToLocalStorage(reminders);

    let event = calendar.getEventById(reminderId);
    if (event) {
        event.remove();
    }

    const reminderList = document.getElementById("reminderList");
    const itemToRemove = reminderList.querySelector(`.reminder-item[data-event-id="${reminderId}"]`);
    if (itemToRemove) {
        reminderList.removeChild(itemToRemove);
    }
}

function loadReminders(calendar) {
    const reminders = getRemindersFromLocalStorage() || [];
    reminders.forEach(reminder => {
        calendar.addEvent({
            title: reminder.text,
            start: reminder.date,
            id: reminder.id
        });

        const reminderList = document.getElementById("reminderList");
        const reminderItem = createReminderItem(reminder, calendar);
        reminderList.appendChild(reminderItem);
    });
}

// Local Storage Functions for Reminders
function getRemindersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('reminders')) || [];
}

function saveRemindersToLocalStorage(reminders) {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}


// Note Functions
function addNote(text) {
    const note = {
        id: uuidv4(),
        text: text
    };

    let notes = getNotesFromLocalStorage() || [];
    notes.push(note);
    saveNotesToLocalStorage(notes);

    const notesList = document.getElementById("notesList");
    const noteDiv = createNoteElement(note);
    notesList.appendChild(noteDiv);
}

function createNoteElement(note) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note"); // Use classList
    noteDiv.innerHTML = `${note.text} <button class="delete-note" data-note-id="${note.id}">Delete</button>`; // Use innerHTML and data attribute
    return noteDiv;
}

function removeNote(noteId) {
    let notes = getNotesFromLocalStorage() || [];
    notes = notes.filter(note => note.id !== noteId);
    saveNotesToLocalStorage(notes);

    const notesList = document.getElementById("notesList");
    const noteToRemove = notesList.querySelector(`.note [data-note-id="${noteId}"]`); // More specific selector
    if (noteToRemove) {
        noteToRemove.parentNode.remove(); // Remove the entire note element
    }
}

function loadNotes() {
    const notes = getNotesFromLocalStorage() || [];
    const notesList = document.getElementById("notesList");
    notes.forEach(note => {
        const noteDiv = createNoteElement(note);
        notesList.appendChild(noteDiv);
    });
}

// Local Storage Functions for Notes
function getNotesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNotesToLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}



// ... (Your theme toggle code, etc.)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});