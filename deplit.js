// ============================================================
// Google OAuth Login
// ============================================================

function googleLogin() {
    google.accounts.id.initialize({
        client_id: "621822595965-gaeg8uvcngbfbkojnqo88io540f4h6jp.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.prompt(); // Shows Google login popup
}

function handleCredentialResponse(response) {
    const idToken = response.credential;

    // Save token locally
    localStorage.setItem("deplit_token", idToken);

    document.getElementById("login-status").textContent =
        "✔ Logged in with Google!";
    document.getElementById("output").textContent =
        "✔ Google login successful!";
}


// ============================================================
// Deploy Code
// ============================================================

function deployCode() {
    const code = document.getElementById("editor").value;

    // Save deployed code locally
    localStorage.setItem("deplit_deployed", code);

    document.getElementById("output").textContent =
        "✔ Deployment successful! Use Preview to view your deployed page.";
}


// ============================================================
// Preview Code
// ============================================================

function previewCode() {
    const code = localStorage.getItem("deplit_deployed");

    if (!code) {
        document.getElementById("output").textContent =
            "⚠ No deployed code found. Deploy first.";
        return;
    }

    // Open preview in new tab
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(code);
    previewWindow.document.close();
}
