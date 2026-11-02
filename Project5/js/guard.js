import {auth, onAuthStateChanged, signOut} from "./firebase.js";

async function logOut(button){
    button.disabled = true;
    await signOut(auth);
    window.location.replace("index.html");
}

function unlockPage(){
    document.getElementById("auth-check").hidden = true;
    document.getElementById("main-content").hidden = false;
    const button = document.getElementById("logout-button");
    button.hidden = false;
    button.addEventListener("click", function(){
        logOut(button);
    });
}

export function requireUser(){
    return new Promise(function(resolve){
        const stopListening = onAuthStateChanged(auth, function(user){
            if(user){
                unlockPage();
                resolve(user);
            } else {
                window.location.replace("index.html");
            }
        });
    });
}