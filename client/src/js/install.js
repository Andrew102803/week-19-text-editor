const butInstall = document.getElementById('buttonInstall');

// instakls the thing we need
// adds event handler for it
window.addEventListener('beforeinstallprompt', (event) => {
     // streevents
     window.deferredPrompt = event;

     // Remove the hidden class from the button.
     butInstall.classList.toggle('hidden', false);
});

// adds event handler on install
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
     return;
    }
  
    // Show
    promptEvent.prompt();
    
    // reset priompt variable
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// handler from installed app 
window.addEventListener('appinstalled', (event) => {
    // Cleam
    window.deferredPrompt = null;
});