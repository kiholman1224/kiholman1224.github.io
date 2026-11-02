const ERROR_MESSAGES = {
    "auth/invalid-credential": "That email and password combination is incorrect.",
    "auth/wrong-password": "That password is incorrect.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/email-already-in-use": "An account with that email already exists. Try logging in instead.",
    "auth/weak-password": "Passwords must be at least 6 characters long.",
    "auth/missing-password": "Please enter a password.",
    "auth/too-many-requests": "Too many attempts. Please wait a minute and try again.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
    "PERMISSION_DENIED": "You don't have permission to do that. Try logging out and back in."
}

export function showStatus(message, type=""){
    const status = document.getElementById("status");
    status.textContent = message;
    status.className = type ? "status-" + type : "";
}

export function getErrorMessage(error){
    return ERROR_MESSAGES[error.code] || error.message;
}

export async function runRequest(button, loadingMessage, request){
    button.disabled = true;
    showStatus(loadingMessage, "loading");
    try{
        await request();
        return true;
    } catch(error) {
        showStatus(getErrorMessage(error), "error");
        return false;
    } finally {
        button.disabled = false;
    }
}