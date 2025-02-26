async function updateTimeAndDate() {
    const now = new Date();

    // Retrieve time zone and language settings from Chrome Storage
    chrome.storage.sync.get(['locale', 'greetingName'], async (data) => {
        const locale = data.locale || 'en-US';
        const name = data.greetingName || 'Flamevel';
        
        const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const date = now.toLocaleDateString(locale, options);

        let greetings = {};
        try {
            const response = await fetch('/src/data/greetings.json');
            greetings = await response.json();
        } catch (error) {
            console.error('Error loading the greetings:', error);
        }

        const hoursNumber = now.getHours();

        let greetingText = '';
        if (hoursNumber >= 0 && hoursNumber < 6) {
            greetingText = greetings[locale]?.[0] || greetings['en-US'][0];
        } else if (hoursNumber >= 6 && hoursNumber < 12) {
            greetingText = greetings[locale]?.[1] || greetings['en-US'][1];
        } else if (hoursNumber >= 12 && hoursNumber < 15) {
            greetingText = greetings[locale]?.[2] || greetings['en-US'][2];
        } else if (hoursNumber >= 15 && hoursNumber < 18) {
            greetingText = greetings[locale]?.[3] || greetings['en-US'][3];
        } else if (hoursNumber >= 18 && hoursNumber < 24) {
            greetingText = greetings[locale]?.[4] || greetings['en-US'][4];
        }

        document.getElementById('greeting').innerHTML = `${greetingText}, ${name}.`;
        document.getElementById('time').textContent = time;
        document.getElementById('date').textContent = date;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimeAndDate();
    setInterval(updateTimeAndDate, 1000);

    // Save name and language if the user changes them in the settings
    document.getElementById('save-settings').addEventListener('click', () => {
        const newName = document.getElementById('greeting-name').value.trim();
        const newLocale = document.getElementById('locale-select').value;

        chrome.storage.sync.set({ greetingName: newName, locale: newLocale }, () => {
            updateTimeAndDate();
        });
    });
});
