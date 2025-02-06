// Initialize the calendar
document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        events: [], // Empty events initially
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

    loadReminders(calendar);
});

// Add reminder to Firestore and the calendar
async function addReminder(text, date, calendar) {
    const reminderRef = await db.collection("reminders").add({
        text: text,
        date: date,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    const event = calendar.addEvent({
        title: text,
        start: date,
        id: reminderRef.id, // Use Firestore ID as event ID
    });

    const reminderList = document.getElementById("reminderList");
    const reminderItem = document.createElement("div");
    reminderItem.classList.add("reminder-item");
    reminderItem.setAttribute("data-event-id", event.id);
    reminderItem.textContent = text + " - " + date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function() {
        removeReminder(reminderRef.id, calendar);
    };
    reminderItem.appendChild(deleteBtn);
    reminderList.appendChild(reminderItem);
}

// Remove reminder from Firestore and calendar
async function removeReminder(eventId, calendar) {
    await db.collection("reminders").doc(eventId).delete();
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

// Load reminders from Firestore into the reminder list and calendar
async function loadReminders(calendar) {
    const snapshot = await db.collection("reminders").get();
    snapshot.forEach(doc => {
        const reminder = doc.data();
        const event = calendar.addEvent({
            title: reminder.text,
            start: reminder.date,
            id: doc.id
        });

        const reminderList = document.getElementById("reminderList");
        const reminderItem = document.createElement("div");
        reminderItem.classList.add("reminder-item");
        reminderItem.setAttribute("data-event-id", event.id);
        reminderItem.textContent = reminder.text + " - " + reminder.date;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = function() {
            removeReminder(doc.id, calendar);
        };
        reminderItem.appendChild(deleteBtn);
        reminderList.appendChild(reminderItem);
    });
}
