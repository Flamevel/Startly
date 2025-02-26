document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("daily-qoutes");

    async function loadQuotes() {
        try {
            const response = await fetch("../src/data/quotes.json");
            const quotes = await response.json();

            // Random quote based on the current date
            const index = new Date().getDate() % quotes.length;
            const selectedQuote = quotes[index];

            chrome.storage.sync.get(["locale"], (data) => {
                const locale = data.locale || "en-US"; 
                const lang = locale.startsWith("de") ? "de" : "en";

                quoteElement.innerHTML = `"${selectedQuote[lang]}" ~ <strong>${selectedQuote.author}</strong>`;
            });
        } catch (error) {
            console.error("Error loading quotes:", error);
        }
    }

    loadQuotes();

    document.getElementById("save-settings").addEventListener("click", () => {
        loadQuotes();
    });
});
