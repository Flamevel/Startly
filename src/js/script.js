chrome.runtime.onStartup.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            console.log("Active Tab URL:", activeTab.url);
        }
    });
});