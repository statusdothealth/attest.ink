/**
 * attest.ink - Enhanced Content Attribution Badge System
 * Version 2.0 - Footer Badge Implementation
 */

const AttestInk = (function() {
    // Badge URLs - update these to your actual deployment URLs
    const badges = {
        human: 'assets/badges/human-generated.svg',
        ai: 'assets/badges/ai-generated.svg',
        claude: 'assets/badges/claude-generated.svg',
        chatgpt: 'assets/badges/chatgpt-generated.svg',
        gemini: 'assets/badges/gemini-generated.svg',
        midjourney: 'assets/badges/midjourney-generated.svg',
        dalle: 'assets/badges/dalle-generated.svg'
    };

    // Badge labels and descriptions
    const badgeInfo = {
        human: {
            title: 'Human Generated Content',
            description: 'This content was created by human creativity and effort'
        },
        ai: {
            title: 'AI Generated Content',
            description: 'This content was created with artificial intelligence assistance'
        },
        claude: {
            title: 'Claude AI Generated Content',
            description: 'This content was created using Anthropic\'s Claude AI assistant'
        },
        chatgpt: {
            title: 'ChatGPT Generated Content',
            description: 'This content was created using OpenAI\'s ChatGPT'
        },
        gemini: {
            title: 'Gemini Generated Content',
            description: 'This content was created using Google\'s Gemini AI'
        },
        midjourney: {
            title: 'Midjourney Generated Content',
            description: 'This image was created using Midjourney\'s AI'
        },
        dalle: {
            title: 'DALL-E Generated Content',
            description: 'This image was created using OpenAI\'s DALL-E'
        }
    };

    // Add a corner badge to a specified element (legacy method)
    function addCornerBadge(type, selector, options = {}) {
        // Validate badge type
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}. Use 'human', 'ai', 'claude', 'chatgpt', 'gemini', 'midjourney', or 'dalle'.`);
            return;
        }

        // Find elements
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.error(`No elements found matching selector: ${selector}`);
            return;
        }

        // Parse options and set defaults
        const position = options.position || 'top-right';
        const size = options.size || 'medium';
        const style = options.style || 'default';
        
        // Size mapping
        const sizeMap = {
            small: '24px',
            medium: '30px',
            large: '36px'
        };
        
        // Position mapping
        const positionMap = {
            'top-left': { top: '-15px', left: '10px', right: 'auto', bottom: 'auto' },
            'top-right': { top: '-15px', right: '10px', left: 'auto', bottom: 'auto' },
            'bottom-left': { bottom: '-15px', left: '10px', top: 'auto', right: 'auto' },
            'bottom-right': { bottom: '-15px', right: '10px', top: 'auto', left: 'auto' },
            'center-top': { top: '-15px', left: '50%', transform: 'translateX(-50%)', right: 'auto', bottom: 'auto' },
            'center-bottom': { bottom: '-15px', left: '50%', transform: 'translateX(-50%)', top: 'auto', right: 'auto' }
        };
        
        // Style mapping
        const styleMap = {
            default: { opacity: '1', filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1))' },
            subtle: { opacity: '0.85', filter: 'none' },
            prominent: { opacity: '1', filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.2))' }
        };
        
        // Get position, size and style settings
        const positionSettings = positionMap[position] || positionMap['top-right'];
        const sizeValue = sizeMap[size] || sizeMap.medium;
        const styleSettings = styleMap[style] || styleMap.default;

        elements.forEach(element => {
            // Don't add if badge already exists
            if (element.querySelector('.attest-badge-container')) {
                removeCornerBadge(selector);
            }

            // Set position relative if not already set
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.position === 'static') {
                element.style.position = 'relative';
            }

            const badgeContainer = document.createElement('div');
            badgeContainer.className = 'attest-badge-container';
            badgeContainer.style.position = 'absolute';
            badgeContainer.style.zIndex = '999';
            badgeContainer.style.opacity = styleSettings.opacity;
            badgeContainer.style.transition = 'all 0.3s ease';
            
            // Apply position settings
            Object.keys(positionSettings).forEach(key => {
                badgeContainer.style[key] = positionSettings[key];
            });

            const badgeImg = document.createElement('img');
            badgeImg.src = badges[type];
            badgeImg.alt = badgeInfo[type].title;
            badgeImg.title = badgeInfo[type].title;
            badgeImg.className = `attest-badge attest-${type}-badge`;
            badgeImg.style.height = sizeValue;
            badgeImg.style.display = 'block';
            badgeImg.style.filter = styleSettings.filter;
            badgeImg.style.transition = 'transform 0.3s ease';
            
            // Add hover effect
            badgeContainer.addEventListener('mouseenter', () => {
                badgeImg.style.transform = 'scale(1.05)';
            });
            
            badgeContainer.addEventListener('mouseleave', () => {
                badgeImg.style.transform = '';
            });

            badgeContainer.appendChild(badgeImg);
            element.appendChild(badgeContainer);
        });
    }

    // Remove corner badge from element
    function removeCornerBadge(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const badgeContainer = element.querySelector('.attest-badge-container');
            if (badgeContainer) {
                badgeContainer.remove();
            }
        });
    }
    
    // Add a footer badge to a specified element (new method)
    function addFooterBadge(type, selector, options = {}) {
        // Validate badge type
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}. Use 'human', 'ai', 'claude', 'chatgpt', 'gemini', 'midjourney', or 'dalle'.`);
            return;
        }

        // Find elements
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.error(`No elements found matching selector: ${selector}`);
            return;
        }
        
        // Parse options
        const includeLink = options.includeLink !== false; // Default to true
        const downloadable = options.downloadable === true; // Default to false
        
        elements.forEach(element => {
            // Remove existing footer badge if present
            removeFooterBadge(selector);
            
            // If downloadable option is true, wrap the content in a container
            if (downloadable) {
                // Create wrapper if it doesn't exist
                if (!element.parentElement.classList.contains('attest-download-wrapper')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'attest-download-wrapper';
                    
                    // Create content container
                    const contentContainer = document.createElement('div');
                    contentContainer.className = 'attest-content-container';
                    
                    // Move the element inside the content container
                    element.parentNode.insertBefore(wrapper, element);
                    contentContainer.appendChild(element);
                    wrapper.appendChild(contentContainer);
                    
                    // Set the element for the footer badge to the wrapper
                    element = wrapper;
                }
            }
            
            // Create footer badge
            const footerBadge = document.createElement('div');
            footerBadge.className = `attest-footer-badge ${type}`;
            
            // Badge icon
            const badgeIcon = document.createElement('div');
            badgeIcon.className = 'attest-badge-icon';
            
            const badgeImg = document.createElement('img');
            badgeImg.src = badges[type];
            badgeImg.alt = badgeInfo[type].title;
            
            badgeIcon.appendChild(badgeImg);
            footerBadge.appendChild(badgeIcon);
            
            // Badge text
            const badgeText = document.createElement('div');
            badgeText.className = 'attest-badge-text';
            
            const badgeTitle = document.createElement('div');
            badgeTitle.className = 'attest-badge-title';
            badgeTitle.textContent = badgeInfo[type].title;
            
            const badgeDescription = document.createElement('div');
            badgeDescription.className = 'attest-badge-description';
            badgeDescription.textContent = badgeInfo[type].description;
            
            badgeText.appendChild(badgeTitle);
            badgeText.appendChild(badgeDescription);
            footerBadge.appendChild(badgeText);
            
            // Add link to attest.ink if includeLink is true
            if (includeLink) {
                const badgeLink = document.createElement('a');
                badgeLink.className = 'attest-badge-link';
                badgeLink.href = 'https://attest.ink';
                badgeLink.target = '_blank';
                badgeLink.rel = 'noopener noreferrer';
                
                const badgeLinkIcon = document.createElement('div');
                badgeLinkIcon.className = 'attest-badge-link-icon';
                
                badgeLink.appendChild(badgeLinkIcon);
                badgeLink.appendChild(document.createTextNode('attest.ink'));
                
                footerBadge.appendChild(badgeLink);
            }
            
            // Add footer badge to element
            element.appendChild(footerBadge);
        });
    }
    
    // Remove footer badge from element
    function removeFooterBadge(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            // If wrapped in download wrapper, target that instead
            if (element.parentElement.classList.contains('attest-content-container') && 
                element.parentElement.parentElement.classList.contains('attest-download-wrapper')) {
                element = element.parentElement.parentElement;
            }
            
            const footerBadge = element.querySelector('.attest-footer-badge');
            if (footerBadge) {
                footerBadge.remove();
            }
        });
    }
    
    // Create a downloadable version of content with badge
    function createDownloadable(type, selector, options = {}) {
        // Validate badge type
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}. Use 'human', 'ai', 'claude', 'chatgpt', 'gemini', 'midjourney', or 'dalle'.`);
            return;
        }
        
        // Find elements
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
            console.error(`No elements found matching selector: ${selector}`);
            return;
        }
        
        // Parse options
        const fileName = options.fileName || 'content-with-attribution';
        const fileType = options.fileType || 'html';
        
        elements.forEach(element => {
            // Create a clone of the element
            const clone = element.cloneNode(true);
            
            // Create a downloadable HTML document with the badge
            const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${badgeInfo[type].title}</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                    .content-container { padding: 20px; }
                    .footer-badge {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px;
                        border-top: 2px solid #4a7bca;
                        background-color: #f5f9ff;
                        margin-top: 30px;
                    }
                    .badge-text { flex-grow: 1; }
                    .badge-title { font-weight: bold; margin-bottom: 5px; }
                    .badge-link { color: #4a7bca; text-decoration: none; }
                    .badge-link:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <div class="content-container">
                    ${clone.outerHTML}
                </div>
                <div class="footer-badge">
                    <img src="${badges[type]}" alt="${badgeInfo[type].title}" height="40">
                    <div class="badge-text">
                        <div class="badge-title">${badgeInfo[type].title}</div>
                        <div class="badge-description">${badgeInfo[type].description}</div>
                    </div>
                    <a href="https://attest.ink" target="_blank" class="badge-link">attest.ink</a>
                </div>
            </body>
            </html>`;
            
            // Create a download link
            const downloadLink = document.createElement('a');
            downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
            downloadLink.download = `${fileName}.html`;
            
            // Trigger download
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }
    
    // Add a badge (wrapper function that defaults to footer badge)
    function addBadge(type, selector, options = {}) {
        const badgeStyle = options.badgeStyle || 'footer'; // 'footer' or 'corner'
        
        if (badgeStyle === 'corner') {
            addCornerBadge(type, selector, options);
        } else {
            addFooterBadge(type, selector, options);
        }
    }
    
    // Remove a badge (wrapper function)
    function removeBadge(selector) {
        removeCornerBadge(selector);
        removeFooterBadge(selector);
    }

    // Public API
    return {
        addBadge,
        removeBadge,
        addCornerBadge,
        removeCornerBadge,
        addFooterBadge,
        removeFooterBadge,
        createDownloadable,
        getBadgeUrl: type => badges[type]
    };
})();