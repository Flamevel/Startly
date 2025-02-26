document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.getElementById("settings-button");
    const settingsPanel = document.getElementById("settings-panel");
    const closeButton = document.getElementById("close-settings");
    const body = document.body;

    settingsButton.addEventListener("click", () => {
        settingsPanel.classList.toggle("active"); 
        body.style.overflow = settingsPanel.classList.contains("active") ? "hidden" : "auto"; 
    });

    closeButton.addEventListener("click", () => {
        settingsPanel.classList.remove("active");
        body.style.overflow = "auto"; 
    });

    document.addEventListener("click", (event) => {
        if (!settingsPanel.contains(event.target) && event.target !== settingsButton) {
            settingsPanel.classList.remove("active");
            body.style.overflow = "auto"; 
        }
    });
});
