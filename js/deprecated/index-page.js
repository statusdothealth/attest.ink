/**
 * attest.ink - Index Page JavaScript
 * Handles badge type selector and code example updates
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize badge type selector
    initializeBadgeTypeSelector();
    
    // Initialize copy buttons
    initializeCopyButtons();
});

// Initialize badge type selector functionality
function initializeBadgeTypeSelector() {
    const badgeTypeSelector = document.getElementById('badge-type-select');
    if (!badgeTypeSelector) return;
    
    // Update code examples when badge type changes
    badgeTypeSelector.addEventListener('change', function() {
        const badgeType = badgeTypeSelector.value;
        updateImplementationExamples(badgeType);
    });
    
    // Initialize with default badge type (human)
    updateImplementationExamples('human');
}

// Update implementation examples based on selected badge type
function updateImplementationExamples(badgeType) {
    // Badge information
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    const badgeTooltips = {
        'human': 'Human-created content',
        'ai': 'AI-assisted content',
        'claude': 'Assisted with Claude AI',
        'chatgpt': 'Assisted with ChatGPT',
        'gemini': 'Assisted with Gemini AI',
        'midjourney': 'Image assisted with Midjourney',
        'dalle': 'Image assisted with DALL-E'
    };
    
    // Update HTML implementation
    const htmlImplementationCode = document.getElementById('html-implementation-code');
    if (htmlImplementationCode) {
        htmlImplementationCode.textContent = `<!-- For ${badgeNames[badgeType].toLowerCase()} content -->
<a href="https://attest.ink" target="_blank" class="badge-link" rel="noopener">
  <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">
  <span class="badge-tooltip">${badgeTooltips[badgeType]}</span>
</a>`;
    }
    
    // Update Markdown implementation
    const markdownImplementationCode = document.getElementById('markdown-implementation-code');
    if (markdownImplementationCode) {
        markdownImplementationCode.textContent = `[![${badgeNames[badgeType]}](https://attest.ink/assets/badges/${badgeType}-generated.svg)](https://attest.ink "${badgeTooltips[badgeType]}")`;
    }
    
    // Update JavaScript implementation
    const javascriptImplementationCode = document.getElementById('javascript-implementation-code');
    if (javascriptImplementationCode) {
        javascriptImplementationCode.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add ${badgeType} badge
  AttestInk.addBadge('${badgeType}', '#your-content', {
    position: 'bottom-right',
    linkToAttestInk: true,
    showTooltip: true
  });
<\/script>`;
    }
}

// Initialize copy button functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            let codeElement;
            
            if (targetId) {
                codeElement = document.getElementById(targetId);
                
                if (!codeElement) {
                    // Try to find by querySelector if getElementById fails
                    codeElement = document.querySelector(`#${targetId} code`);
                }
                
                if (!codeElement) {
                    // If still not found, check if button has a previous sibling
                    codeElement = button.previousElementSibling?.querySelector('code');
                }
                
                if (!codeElement && targetId === 'css-tooltip-code') {
                    // Special case for CSS tooltip code
                    codeElement = document.querySelector('.css-example code');
                }
            } else {
                // Default to previous sibling if no target specified
                codeElement = button.previousElementSibling?.querySelector('code');
            }
            
            if (codeElement && codeElement.textContent) {
                navigator.clipboard.writeText(codeElement.textContent)
                    .then(() => {
                        const originalText = button.querySelector('.copy-text')?.textContent || 'Copy';
                        
                        // Change button style to indicate success
                        button.style.backgroundColor = '#e6f3e6';
                        button.style.borderColor = '#4caf50';
                        if (button.querySelector('.copy-text')) {
                            button.querySelector('.copy-text').textContent = 'Copied!';
                        } else {
                            button.textContent = 'Copied!';
                        }
                        
                        if (button.querySelector('.copy-icon')) {
                            button.querySelector('.copy-icon').style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234caf50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E\")";
                        }
                        
                        // Reset button after 2 seconds
                        setTimeout(() => {
                            button.style.backgroundColor = '';
                            button.style.borderColor = '';
                            if (button.querySelector('.copy-text')) {
                                button.querySelector('.copy-text').textContent = originalText;
                            } else {
                                button.textContent = originalText;
                            }
                            
                            if (button.querySelector('.copy-icon')) {
                                button.querySelector('.copy-icon').style.backgroundImage = '';
                            }
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                    });
            }
        });
    });
}