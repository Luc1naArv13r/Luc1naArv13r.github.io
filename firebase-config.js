import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getFirestore, firebase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";  // Import firebase

const firebaseConfig = {
    apiKey: "AIzaSyC9Ch3o0NiMYsirao3DfTCIALOn3M_vDSs",
  authDomain: "personalweb-396d5.firebaseapp.com",
  projectId: "personalweb-396d5",
  storageBucket: "personalweb-396d5.firebasestorage.app",
  messagingSenderId: "1076924649419",
  appId: "1:1076924649419:web:47f3c08e2e9f546998704e",
  measurementId: "G-P88KF01Z63"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ... (rest of your functions: addReminder, createReminderItem, removeReminder, loadReminders) ...

async function addReminder(text, date, calendar) {
    try {
        const reminderRef = await db.collection("reminders").add({
            text: text,
            date: date,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Now firebase is defined
        });

        // ... (rest of addReminder function)
    } catch (error) {
        console.error("Error adding reminder:", error);
        alert("Error adding reminder. Please check the console.");
    }
}


export { db, addReminder, removeReminder, loadReminders };