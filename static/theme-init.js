/**
 * Theme initialization - runs immediately to prevent flicker
 * This script should be inlined in the <head> of each page
 */
(function() {
    // Get theme from localStorage or use default
    const saved = localStorage.getItem('theme');
    let theme = 'light'; // default
    
    if (saved) {
        theme = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
    } else {
        const hour = new Date().getHours();
        if (hour >= 18 || hour < 6) {
            theme = 'dark';
        }
    }
    
    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', theme);
})();