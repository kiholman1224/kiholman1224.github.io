import{
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "./firebase.js";

import { showStatus, runRequest } from "./feedback.js";

function showAccountPanels(user) {
    document.getElementById("signed-out-panel").hidden = Boolean(user);
    document.getElementById("signed-in-panel").hidden = !user;
    if (user) {
        document.getElementById("welcome-message").textContent = "You're logged in as " + user.email + ".";
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const succeeded = await runRequest(event.submitter, "Logging in…", function () {
        return signInWithEmailAndPassword(auth, email, password);
    });
    if (succeeded) {
        event.target.reset();
        showStatus("Welcome back! The whole site is now unlocked.", "success");
    }
}

async function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const succeeded = await runRequest(event.submitter, "Creating your account…", function () {
        return createUserWithEmailAndPassword(auth, email, password);
    });
    if (succeeded) {
        event.target.reset();
        showStatus("Account created! The whole site is now unlocked.", "success");
    }
}

async function handleLogout(event) {
    const succeeded = await runRequest(event.currentTarget, "Logging out…", function () {
        return signOut(auth);
    });
    if (succeeded) {
        showStatus("You're logged out. Log in again to keep exploring.", "success");
    }
}

async function handleChangePassword(event) {
    event.preventDefault();
    const user = auth.currentUser;
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const succeeded = await runRequest(event.submitter, "Updating your password…", async function () {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
    });
    if (succeeded) {
        event.target.reset();
        showStatus("Your password was changed.", "success");
    }
}

function init() {
    let firstCheck = true;
    onAuthStateChanged(auth, function (user) {
        showAccountPanels(user);
        if (firstCheck) {
            showStatus("");
            firstCheck = false;
        }
    });
    document.getElementById("login-form").addEventListener("submit", handleLogin);
    document.getElementById("signup-form").addEventListener("submit", handleSignup);
    document.getElementById("password-form").addEventListener("submit", handleChangePassword);
    document.getElementById("home-logout-button").addEventListener("click", handleLogout);
}

init();