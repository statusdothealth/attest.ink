// Back to Top Button Functionality
(function() {
    // Create the button element
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '▲';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.setAttribute('title', 'Back to top');
    
    // Add to the page
    document.body.appendChild(backToTopButton);
    
    // Show/hide based on scroll position
    let isVisible = false;
    
    function toggleVisibility() {
        const shouldShow = window.pageYOffset > 300;
        
        if (shouldShow && !isVisible) {
            backToTopButton.classList.add('visible');
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            backToTopButton.classList.remove('visible');
            isVisible = false;
        }
    }
    
    // Throttle scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(toggleVisibility);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', requestTick);
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleVisibility();
})();