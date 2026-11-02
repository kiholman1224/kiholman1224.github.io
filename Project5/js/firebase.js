import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7GdVfnSnJiJsN2TrHwRQP9qywTHCHVVw",
    authDomain: "project-5-f2aba.firebaseapp.com",
    projectId: "project-5-f2aba",
    storageBucket: "project-5-f2aba.firebasestorage.app",
    messagingSenderId: "680959593195",
    appId: "1:680959593195:web:ac94aafeed5d87430a0cae"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    emailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export {ref, get, push, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";