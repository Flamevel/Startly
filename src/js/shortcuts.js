const settingsButton = document.getElementById('settings-button');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsButton = document.getElementById('close-settings');
const addShortcutButton = document.getElementById('add-shortcut');
const shortcutsBar = document.getElementById('shortcuts-bar');
const shortcutNameInput = document.getElementById('shortcut-name');
const shortcutUrlInput = document.getElementById('shortcut-url');
const shortcutList = document.getElementById('shortcut-list');

// Open and close the settings panel
settingsButton.addEventListener('click', () => {
    loadShortcutList(); // Load shortcuts into the delete section
    settingsPanel.style.display = 'block';
});

closeSettingsButton.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
});
  
function getHighResolutionFavicon(url) {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`; 
}
  
// Load shortcuts from storage
function loadShortcuts() {
    chrome.storage.sync.get('shortcuts', (data) => {
        const shortcuts = data.shortcuts || [];
        shortcutsBar.innerHTML = '';
      
        shortcuts.forEach((shortcut) => {
            const link = document.createElement('a');
            link.href = shortcut.url;
            link.className = 'shortcut';
            link.target = '_blank';
            
            const faviconUrl = getHighResolutionFavicon(shortcut.url);
    
            const faviconImg = document.createElement('img');
            faviconImg.src = faviconUrl;
            faviconImg.alt = `${shortcut.name} icon`;
            faviconImg.style.width = '32px';  
            faviconImg.style.height = '32px'; 
            faviconImg.style.marginBottom = '5px';
    
            link.innerHTML = `<div><img src="${faviconUrl}" alt="${shortcut.name}" style="width:32px; height:32px; margin-bottom: 5px;"/><br>${shortcut.name}</div>`;
            shortcutsBar.appendChild(link);
        });
    });
}
  
// Load shortcuts into the delete section (function)
function loadShortcutList() {
    chrome.storage.sync.get('shortcuts', (data) => {
        const shortcuts = data.shortcuts || [];
        shortcutList.innerHTML = '';
        shortcuts.forEach((shortcut, index) => {
            const item = document.createElement('div');
            item.style.marginBottom = '10px';
  
            const name = document.createElement('span');
            name.textContent = shortcut.name;
            name.style.marginRight = '10px';
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.background = '#d9534f';
            deleteButton.style.color = 'white';
            deleteButton.style.border = 'none';
            deleteButton.style.borderRadius = '5px';
            deleteButton.style.padding = '5px 10px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.paddingTop = '10px';
            deleteButton.style.paddingBottom = '10px';
  
            deleteButton.addEventListener('click', () => {
            deleteShortcut(index);
            });
  
            item.appendChild(name);
            item.appendChild(deleteButton);
            shortcutList.appendChild(item);
        });
    });
}
  
// Add a new shortcut
addShortcutButton.addEventListener('click', () => {
    const name = shortcutNameInput.value.trim();
    const url = shortcutUrlInput.value.trim();
    if (!name || !url) {
        alert('Please enter both name and URL.');
        return;
    }
  
    chrome.storage.sync.get('shortcuts', (data) => {
        const shortcuts = data.shortcuts || [];
        shortcuts.push({ name, url });
        chrome.storage.sync.set({ shortcuts }, () => {
            loadShortcuts();
            shortcutNameInput.value = '';
            shortcutUrlInput.value = '';
            settingsPanel.style.display = 'none';
        });
    });
});
  
// Delete a shortcut by its index
function deleteShortcut(index) {
    chrome.storage.sync.get('shortcuts', (data) => {
        const shortcuts = data.shortcuts || [];
        shortcuts.splice(index, 1); // Remove the shortcut at the specified index
        chrome.storage.sync.set({ shortcuts }, () => {
            loadShortcuts(); // Reload shortcuts in the bottom bar
            loadShortcutList(); // Reload shortcuts in the delete section
        });
    });
}
  
// Initialize shortcuts on page load
document.addEventListener('DOMContentLoaded', loadShortcuts);  