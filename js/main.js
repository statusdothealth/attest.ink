document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality with animation
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
            
            // Small delay for animation effect
            setTimeout(() => {
                document.getElementById(tabId).classList.add('active');
            }, 50);
        });
    });

    // Enhanced copy button functionality with feedback animation
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const codeBlock = document.querySelector(`#${targetId} code`);
            
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
        });
    });

    // Enhanced demo functionality with animations
    const addHumanBtn = document.getElementById('add-human-badge');
    const addAiBtn = document.getElementById('add-ai-badge');
    const resetBtn = document.getElementById('reset-demo');
    const demoBlock1 = document.getElementById('demo-block-1');
    const demoBlock2 = document.getElementById('demo-block-2');

    addHumanBtn.addEventListener('click', () => {
        // Add subtle flash effect before adding the badge
        flashElement(demoBlock1, 'var(--human-light)');
        
        setTimeout(() => {
            AttestInk.removeBadge('#demo-block-1');
            AttestInk.addBadge('human', '#demo-block-1');
        }, 300);
    });

    addAiBtn.addEventListener('click', () => {
        // Add subtle flash effect before adding the badge
        flashElement(demoBlock2, 'var(--ai-light)');
        
        setTimeout(() => {
            AttestInk.removeBadge('#demo-block-2');
            AttestInk.addBadge('ai', '#demo-block-2');
        }, 300);
    });

    resetBtn.addEventListener('click', () => {
        if (demoBlock1.querySelector('.attest-badge-container') || 
            demoBlock2.querySelector('.attest-badge-container')) {
            
            // Add subtle reset effect
            if (demoBlock1.querySelector('.attest-badge-container')) {
                fadeOutElement(demoBlock1.querySelector('.attest-badge-container'));
            }
            
            if (demoBlock2.querySelector('.attest-badge-container')) {
                fadeOutElement(demoBlock2.querySelector('.attest-badge-container'));
            }
            
            // Remove badges after animation
            setTimeout(() => {
                AttestInk.removeBadge('#demo-block-1, #demo-block-2');
            }, 300);
        }
    });
    
    // Helper functions for animations
    function flashElement(element, color) {
        const originalBg = getComputedStyle(element).backgroundColor;
        
        element.style.transition = 'background-color 0.3s ease';
        element.style.backgroundColor = color;
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 300);
    }
    
    function fadeOutElement(element) {
        element.style.transition = 'opacity 0.3s ease';
        element.style.opacity = '0';
    }
    
    // Animate elements when they enter the viewport
    const observeElements = document.querySelectorAll('.reason-card, .content-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                // Add animation with a slight delay based on index
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observeElements.forEach(element => {
        observer.observe(element);
    });
});