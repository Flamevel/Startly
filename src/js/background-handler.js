document.addEventListener('DOMContentLoaded', () => {
    const backgroundInput = document.getElementById('background-upload');
    const resetBackgroundButton = document.getElementById('reset-background');
    
    chrome.storage.local.get(['backgroundImage'], (data) => {
        if (data.backgroundImage) {
            document.body.style.backgroundImage = `url(${data.backgroundImage})`;
        }
    });
  
    backgroundInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
            const imageUrl = e.target.result;
        
            chrome.storage.local.set({ backgroundImage: imageUrl }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Error saving the background image:', chrome.runtime.lastError);
                } else {
                    document.body.style.backgroundImage = `url(${imageUrl})`;
                }
            });
        };
        reader.readAsDataURL(file);
        }
    });
    
    resetBackgroundButton.addEventListener('click', () => {
        chrome.storage.local.remove('backgroundImage', () => {
            if (chrome.runtime.lastError) {
                console.error('Error removing the background image:', chrome.runtime.lastError);
            } else {
                document.body.style.backgroundImage = '';
            }
        });
    });
});  