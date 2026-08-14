// ============================================================
// Deplit JS — Deployment + Preview Logic
// ============================================================

function deployCode() {
    const code = document.getElementById("editor").value;

    // Save deployed code locally
    localStorage.setItem("deplit_deployed", code);

    document.getElementById("output").textContent =
        "✔ Deployment successful! Use Preview to view your deployed page.";
}

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
