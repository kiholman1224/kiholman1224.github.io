import { db, ref, push, serverTimestamp } from "./firebase.js";
import { showStatus, runRequest } from "./feedback.js";
import { requireUser } from "./guard.js";

const CONTACTS_PATH = "contacts";

async function handleContactSubmit(event, user) {
    event.preventDefault();
    const entry = {
        name: document.getElementById("contact-name").value.trim(),
        email: document.getElementById("contact-email").value.trim(),
        message: document.getElementById("contact-message").value.trim(),
        uid: user.uid,
        sentAt: serverTimestamp()
    };
    const succeeded = await runRequest(event.submitter, "Sending your message…", function () {
        return push(ref(db, CONTACTS_PATH), entry);
    });
    if (succeeded) {
        event.target.reset();
        showStatus("Thanks, " + entry.name + "! Your message was received and saved.", "success");
    }
}

async function init() {
    const user = await requireUser();
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        handleContactSubmit(event, user);
    });
}

init();