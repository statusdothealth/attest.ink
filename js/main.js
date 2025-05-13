/**
 * attest.ink - Enhanced Main JavaScript
 * Provides interactive elements, animations, and badge functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles for background animation
    createFloatingParticles();
    
    // Tab functionality with enhanced animation
    initializeTabs();
    
    // Copy button functionality with feedback animation
    initializeCopyButtons();
    
    // Enhanced demo functionality with animations
    initializeBadgeDemo();
    
    // Initialize animations for elements entering viewport
    initializeScrollAnimations();

    // New initializations
    initializeBadgeOptionPreviews();
    initializeShareModalExtras();

});

// Function to create floating background particles
function createFloatingParticles() {
    const particleCount = window.innerWidth > 768 ? 15 : 8;
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `floating-particle ${i % 2 === 0 ? 'particle-human' : 'particle-ai'}`;
        
        // Set random size
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Set random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Set random animation properties
        const xDistance = (Math.random() * 200 - 100);
        const yDistance = (Math.random() * 200 - 100);
        const xDistanceAlt = (Math.random() * 200 - 100);
        const yDistanceAlt = (Math.random() * 200 - 100);
        
        particle.style.setProperty('--x-distance', `${xDistance}px`);
        particle.style.setProperty('--y-distance', `${yDistance}px`);
        particle.style.setProperty('--x-distance-alt', `${xDistanceAlt}px`);
        particle.style.setProperty('--y-distance-alt', `${yDistanceAlt}px`);
        particle.style.setProperty('--x-distance-rev', `${-xDistance/2}px`);
        particle.style.setProperty('--y-distance-rev', `${-yDistance/2}px`);
        
        // Set animation duration and delay
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 10;
        
        particle.style.animation = `floatingParticle ${duration}s infinite ease-in-out ${delay}s`;
        
        container.appendChild(particle);
    }
}

// Initialize tab functionality with enhanced animations
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabContainer = document.querySelector('.tabs');
    
    // Create tab slider
    const tabSlider = document.createElement('div');
    tabSlider.className = 'tab-slider';
    if (tabContainer) {
        tabContainer.appendChild(tabSlider);
        
        // Set initial tab slider position
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            updateTabSlider(activeTab);
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = `${button.dataset.tab}-tab`;
                
                // Update tab slider
                updateTabSlider(button);
                
                // Animation for tab content
                setTimeout(() => {
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) {
                        tabContent.classList.add('active');
                    }
                }, 50);
            });
        });
        
        // Function to update tab slider position
        function updateTabSlider(activeButton) {
            const buttonRect = activeButton.getBoundingClientRect();
            const containerRect = tabContainer.getBoundingClientRect();
            
            tabSlider.style.width = `${buttonRect.width}px`;
            tabSlider.style.transform = `translateX(${buttonRect.left - containerRect.left}px)`;
        }
        
        // Update slider position on window resize
        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.tab-btn.active');
            if (currentActive) {
                updateTabSlider(currentActive);
            }
        });
    }
}

// Initialize copy button functionality with enhanced feedback
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
                        
                        // Play success animation
                        button.classList.add('copy-success');
                        
                        // Change button style to indicate success
                        button.style.backgroundColor = '#e6f3e6';
                        button.style.borderColor = '#4caf50';
                        button.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
                        button.querySelector('.copy-text').textContent = 'Copied!';
                        button.querySelector('.copy-icon').style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234caf50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\")";
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            button.classList.remove('copy-success');
                            button.style.backgroundColor = '';
                            button.style.borderColor = '';
                            button.style.boxShadow = '';
                            button.querySelector('.copy-text').textContent = originalText;
                            button.querySelector('.copy-icon').style.backgroundImage = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                        
                        // Indicate error
                        button.style.backgroundColor = '#ffe6e6';
                        button.style.borderColor = '#ff6b6b';
                        button.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.3)';
                        button.querySelector('.copy-text').textContent = 'Error!';
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            button.style.backgroundColor = '';
                            button.style.borderColor = '';
                            button.style.boxShadow = '';
                            button.querySelector('.copy-text').textContent = 'Copy';
                        }, 2000);
                    });
            }
        });
    });
}

// Initialize badge demo functionality with enhanced animations
function initializeBadgeDemo() {
    const addHumanBtn = document.getElementById('add-human-badge');
    const addAiBtn = document.getElementById('add-ai-badge');
    const resetBtn = document.getElementById('reset-demo');
    const demoBlock1 = document.getElementById('demo-block-1');
    const demoBlock2 = document.getElementById('demo-block-2');
    
    // Platform selector functionality
    const platformButtons = document.querySelectorAll('.platform-btn');
    let selectedPlatform = 'ai'; // Default AI platform
    
    // Set up platform selection
    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            platformButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedPlatform = button.dataset.platform;
        });
    });
    
    // Add human badge button
    if (addHumanBtn) {
        addHumanBtn.addEventListener('click', () => {
            // Add subtle flash effect before adding the badge
            flashElement(demoBlock1, 'var(--human-light)');
            
            setTimeout(() => {
                // Remove any existing badge
                if (demoBlock1.querySelector('.attest-badge-container')) {
                    AttestInk.removeBadge('#demo-block-1');
                }
                
                // Add the badge after a short delay
                setTimeout(() => {
                    AttestInk.addBadge('human', '#demo-block-1');
                    
                    // Add custom animation to the badge
                    pulseBadge(demoBlock1);
                }, 100);
            }, 300);
        });
    }
    
    // Add AI badge button
    if (addAiBtn) {
        addAiBtn.addEventListener('click', () => {
            // Add subtle flash effect before adding the badge
            flashElement(demoBlock2, 'var(--ai-light)');
            
            setTimeout(() => {
                // Remove any existing badge
                if (demoBlock2.querySelector('.attest-badge-container')) {
                    AttestInk.removeBadge('#demo-block-2');
                }
                
                // Add the badge after a short delay
                setTimeout(() => {
                    // Use the selected platform instead of default AI
                    AttestInk.addBadge(selectedPlatform, '#demo-block-2');
                    
                    // Add custom animation to the badge
                    pulseBadge(demoBlock2);
                }, 100);
            }, 300);
        });
    }
    
    // Reset button
    if (resetBtn) {
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
                    AttestInk.removeBadge('#demo-block-1');
                    AttestInk.removeBadge('#demo-block-2');
                }, 300);
            }
        });
    }
}

// Initialize animations for elements entering viewport
function initializeScrollAnimations() {
    // Only initialize if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observeElements = document.querySelectorAll('.reason-card, .content-card, .badge-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation with a slight delay based on index
                    setTimeout(() => {
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
    }
}

// Helper function for flashing an element
function flashElement(element, color) {
    if (!element) return;
    
    const originalBg = getComputedStyle(element).backgroundColor;
    
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = color;
    
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
    }, 300);
}

// Helper function to fade out an element
function fadeOutElement(element) {
    if (!element) return;
    
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
}

// Add pulse animation to newly added badge
function pulseBadge(container) {
    if (!container) return;
    
    const badge = container.querySelector('.attest-badge-container');
    if (badge) {
        badge.style.animation = 'pulseGlow 2s ease-in-out';
        
        // Remove animation after it completes
        setTimeout(() => {
            badge.style.animation = '';
        }, 2000);
    }
}

// Initialize badge position and size previews
function initializeBadgeOptionPreviews() {
    const positionSelect = document.getElementById('badge-position');
    const sizeSelect = document.getElementById('badge-size');
    const positionPreview = document.querySelector('.position-preview');
    
    if (positionSelect && positionPreview) {
        // Update position preview when selection changes
        positionSelect.addEventListener('change', function() {
            // Remove all position classes
            positionPreview.classList.remove('top-right', 'top-left', 'bottom-right', 'bottom-left', 'center-top', 'center-bottom');
            // Add selected position class
            positionPreview.classList.add(this.value);
        });
    }
    
    if (sizeSelect) {
        // Update size preview when selection changes
        sizeSelect.addEventListener('change', function() {
            const sizeIndicators = document.querySelectorAll('.size-indicator');
            
            // Reset all size indicators
            sizeIndicators.forEach(indicator => {
                indicator.style.backgroundColor = '#e0e0e0';
            });
            
            // Highlight selected size
            const selectedIndex = this.selectedIndex;
            if (sizeIndicators[selectedIndex]) {
                sizeIndicators[selectedIndex].style.backgroundColor = 'var(--primary)';
            }
        });
    }
}

// Initialize extra interactions for the share modal
function initializeShareModalExtras() {
    const downloadTypeButtons = document.querySelectorAll('.download-type-selector button');
    
    if (downloadTypeButtons) {
        downloadTypeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                downloadTypeButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update download button text
                const downloadButton = document.getElementById('download-button');
                if (downloadButton) {
                    downloadButton.textContent = `Download as ${this.dataset.format.toUpperCase()}`;
                }
            });
        });
    }
}

// Update manual code examples in share modal
function updateManualCodeExamples(badgeType) {
    const htmlCode = document.getElementById('manual-html-code');
    const markdownCode = document.getElementById('manual-markdown-code');
    const textCode = document.getElementById('manual-text-code');
    
    if (htmlCode) {
        htmlCode.textContent = AttestInk.generateBadgeHTML(badgeType);
    }
    
    if (markdownCode) {
        markdownCode.textContent = AttestInk.generateBadgeMarkdown(badgeType);
    }
    
    if (textCode) {
        textCode.textContent = AttestInk.generateBadgeText(badgeType);
    }
}

// Initialize function to update download options
function updateDownloadOptions(badgeType, position, size) {
    const downloadTypeButtons = document.querySelectorAll('.download-type-selector button');
    const downloadButton = document.getElementById('download-button');
    
    if (downloadTypeButtons && downloadTypeButtons.length > 0) {
        // Set the first button as active by default
        downloadTypeButtons.forEach(btn => btn.classList.remove('active'));
        downloadTypeButtons[0].classList.add('active');
        
        // Update download button to show the format
        if (downloadButton) {
            downloadButton.textContent = `Download as ${downloadTypeButtons[0].dataset.format.toUpperCase()}`;
        }
        
        // Update the click handlers
        downloadTypeButtons.forEach(button => {
            button.onclick = function() {
                // Update active state
                downloadTypeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update download button
                if (downloadButton) {
                    downloadButton.textContent = `Download as ${this.dataset.format.toUpperCase()}`;
                    
                    // Update download handler
                    downloadButton.onclick = function() {
                        downloadWithBadge(getContentType(), badgeType, button.dataset.format);
                        showCopyFeedback(downloadButton, 'Downloaded!');
                    };
                }
            };
        });
    }
    
    // Update manual code examples
    updateManualCodeExamples(badgeType);
}