/**
 * attest.ink - Main JavaScript
 * Handles general website functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabs
    initializeTabs();
    
    // Initialize copy buttons
    initializeCopyButtons();
});

// Initialize tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = `${button.dataset.tab}-tab`;
            
            // Show corresponding content
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize copy button functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const codeBlock = document.querySelector(`#${targetId} code`);
            
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent)
                    .then(() => {
                        const originalText = button.querySelector('.copy-text').textContent;
                        
                        // Change button style to indicate success
                        button.style.backgroundColor = '#e6f3e6';
                        button.style.borderColor = '#4caf50';
                        button.querySelector('.copy-text').textContent = 'Copied!';
                        button.querySelector('.copy-icon').style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234caf50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\")";
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            button.style.backgroundColor = '';
                            button.style.borderColor = '';
                            button.querySelector('.copy-text').textContent = originalText;
                            button.querySelector('.copy-icon').style.backgroundImage = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                        
                        // Indicate error
                        button.style.backgroundColor = '#ffe6e6';
                        button.style.borderColor = '#ff6b6b';
                        button.querySelector('.copy-text').textContent = 'Error!';
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            button.style.backgroundColor = '';
                            button.style.borderColor = '';
                            button.querySelector('.copy-text').textContent = 'Copy';
                        }, 2000);
                    });
            }
        });
    });
}