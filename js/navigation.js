// File: js/navigation.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navLinks && navbar) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active') && 
                !event.target.closest('.nav-links') && 
                !event.target.closest('.hamburger-menu')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }
    
    // Initialize active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') || 
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});