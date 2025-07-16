// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the button
    const backToTopButton = document.createElement('a');
    backToTopButton.className = 'back-to-top';
    backToTopButton.href = '#';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    // Add to body
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', toggleBackToTop);
    
    // Initial check
    toggleBackToTop();
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});