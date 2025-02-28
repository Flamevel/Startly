document.addEventListener('DOMContentLoaded', () => {
    const backgroundInput = document.getElementById('background-upload');
    const resetBackgroundButton = document.getElementById('reset-background');
    const blurSlider = document.getElementById('blur-slider');
    const blurValueDisplay = document.getElementById('blur-value');

    chrome.storage.local.get(['backgroundImage', 'blurAmount'], (data) => {
        if (data.backgroundImage) {
            document.querySelector('.background').style.setProperty('--bg-image', `url(${data.backgroundImage})`);
        }
        if (data.blurAmount !== undefined) {
            document.querySelector('.background').style.setProperty('--blur-amount', `${data.blurAmount}px`);
            blurSlider.value = data.blurAmount;
            blurValueDisplay.textContent = data.blurAmount;
        }
    });

    backgroundInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                chrome.storage.local.set({ backgroundImage: imageUrl }, () => {
                    if (!chrome.runtime.lastError) {
                        document.querySelector('.background').style.setProperty('--bg-image', `url(${imageUrl})`);
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    });

    resetBackgroundButton.addEventListener('click', () => {
        chrome.storage.local.remove('backgroundImage', () => {
            if (!chrome.runtime.lastError) {
                document.querySelector('.background').style.setProperty('--bg-image', `url('../../assets/images/extension/riccardo-trimeloni-unsplashBG.jpg')`);
            }
        });
    });

    blurSlider.addEventListener('input', (event) => {
        const blurAmount = event.target.value;
        document.querySelector('.background').style.setProperty('--blur-amount', `${blurAmount}px`);
        blurValueDisplay.textContent = blurAmount;
    });

    blurSlider.addEventListener('change', (event) => {
        const blurAmount = event.target.value;
        chrome.storage.local.set({ blurAmount: blurAmount });
    });
});
