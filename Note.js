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

    document.getElementById("addReminderBtn").addEventListener("click", function() {
        let reminderText = document.getElementById("newReminder").value;
        let reminderDate = document.getElementById("reminderDate").value;
        if (reminderText.trim() && reminderDate) {
            addReminder(reminderText, reminderDate, calendar);
            document.getElementById("newReminder").value = "";
        }
    });
});

function addReminder(text, date, calendar) {
    let event = calendar.addEvent({ 
        title: text, 
        start: date,
        id: Date.now().toString() // Unique ID for deletion
    });

    let reminderList = document.getElementById("reminderList");
    let reminderItem = document.createElement("div");
    reminderItem.classList.add("reminder-item");
    reminderItem.setAttribute("data-event-id", event.id);
    reminderItem.textContent = text + " - " + date;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function() {
        removeReminder(event.id, calendar);
    };
    reminderItem.appendChild(deleteBtn);
    reminderList.appendChild(reminderItem);
}

function removeReminder(eventId, calendar) {
    let event = calendar.getEventById(eventId);
    if (event) {
        event.remove();
    }

    let reminderItems = document.querySelectorAll(".reminder-item");
    reminderItems.forEach(item => {
        if (item.getAttribute("data-event-id") === eventId) {
            item.remove();
        }
    });
}

document.getElementById("addNoteBtn").addEventListener("click", function() {
    let noteText = document.getElementById("newNote").value;
    if (noteText.trim()) {
        let note = document.createElement("div");
        note.className = "note";
        note.textContent = noteText;
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function() {
            note.remove();
        };
        note.appendChild(deleteBtn);
        document.getElementById("notesList").appendChild(note);
        document.getElementById("newNote").value = "";
    }
});
