document.addEventListener("DOMContentLoaded", function () {
    let calendarEl = document.getElementById("calendar");
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        selectable: true,
        editable: true,
        events: loadReminders(),
        dateClick: function (info) {
            let reminderText = prompt("Enter reminder for " + info.dateStr);
            if (reminderText) {
                addReminder(reminderText, info.dateStr, calendar);
            }
        },
        eventClick: function (info) {
            if (confirm("Delete this reminder?")) {
                removeReminder(info.event.id, calendar);
            }
        }
    });

    calendar.render();

    document.getElementById("add-reminder").addEventListener("click", function () {
        let text = document.getElementById("reminder-input").value;
        let date = document.getElementById("reminder-date").value;
        if (text.trim() && date) {
            addReminder(text, date, calendar);
            document.getElementById("reminder-input").value = "";
            document.getElementById("reminder-date").value = "";
        }
    });

    // Notes functionality
    document.getElementById("open-note-editor").addEventListener("click", function () {
        document.getElementById("note-editor").classList.toggle("hidden");
    });

    document.getElementById("save-note").addEventListener("click", function () {
        let content = document.getElementById("note-content").value;
        if (content.trim()) {
            saveNote(content);
            document.getElementById("note-content").value = "";
            document.getElementById("note-editor").classList.add("hidden");
        }
    });

    document.getElementById("close-note-editor").addEventListener("click", function () {
        document.getElementById("note-editor").classList.add("hidden");
    });

    loadNotes();

    // Dark mode toggle
    const toggleSwitch = document.querySelector(".toggle-switch");
    const body = document.body;
    const calendarSection = document.querySelector(".calendar-section");
    const contentSection = document.querySelector(".content-section");
    const reminderSection = document.querySelector(".reminder-section");
    const notesSection = document.querySelector(".notes-section");
    const noteEditor = document.getElementById("note-editor");
    const fabIcon = document.getElementById("fab-icon");
    

    // Load saved theme preference
    if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
    }

    toggleSwitch.addEventListener("click", function () {
        if (body.classList.contains("dark-theme")) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-theme");
        toggleSwitch.classList.add("state-on");

        // Apply dark styles to sections
        calendarSection.style.background = "#222";
        contentSection.style.background = "#2c2c2c";
        reminderSection.style.background = "#333";
        notesSection.style.background = "#333";
        noteEditor.style.background = "#222";
        fabIcon.src = "FAB Dark.png";

        // Save to localStorage
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        body.classList.remove("dark-theme");
        toggleSwitch.classList.remove("state-on");

        // Revert styles
        calendarSection.style.background = "#ffffff";
        contentSection.style.background = "#ffffff";
        reminderSection.style.background = "#ffffff";
        notesSection.style.background = "#ffffff";
        noteEditor.style.background = "#ffffff";
        fabIcon.src = "FAB.png";

        // Save to localStorage
        localStorage.setItem("darkMode", "disabled");
    }
});


function addReminder(text, date, calendar) {
    let reminder = { id: Date.now().toString(), text, date };
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    calendar.addEvent({ title: text, start: date, id: reminder.id });

    let li = document.createElement("li");
    li.innerHTML = `${text} - ${date} <button onclick="removeReminder('${reminder.id}', calendar)">Delete</button>`;
    document.getElementById("reminder-list").appendChild(li);
}

function removeReminder(id, calendar) {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    reminders = reminders.filter(r => r.id !== id);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    let event = calendar.getEventById(id);
    if (event) event.remove();

    document.querySelectorAll(`#reminder-list li`).forEach(li => {
        if (li.innerHTML.includes(id)) {
            li.remove();
        }
    });
}

function loadReminders() {
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    return reminders.map(r => ({ title: r.text, start: r.date, id: r.id }));
}

function saveNote(content) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let note = { id: Date.now().toString(), content };
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

function loadNotes() {
    displayNotes();
}

function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    notes.forEach(note => {
        let div = document.createElement("div");
        div.className = "note-item";
        div.innerHTML = `<p onclick="viewNote('${note.id}')">${note.content.substring(0, 30)}...</p><button onclick="deleteNote('${note.id}')">Delete</button>`;
        notesList.appendChild(div);
    });
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
