/**
 * attest.ink - Content Attribution Badge System
 */

const AttestInk = (function() {
    // Badge URLs - these paths must match your actual files
    const badges = {
        human: 'assets/badges/human-generated.svg',
        ai: 'assets/badges/ai-generated.svg',
        claude: 'assets/badges/claude-generated.svg',
        chatgpt: 'assets/badges/chatgpt-generated.svg',
        gemini: 'assets/badges/gemini-generated.svg',
        midjourney: 'assets/badges/midjourney-generated.svg',
        dalle: 'assets/badges/dalle-generated.svg'
    };

    // Badge labels for accessibility and tooltips
    const badgeLabels = {
        human: 'Human Generated',
        ai: 'AI Generated',
        claude: 'Claude AI Generated',
        chatgpt: 'ChatGPT Generated',
        gemini: 'Gemini Generated',
        midjourney: 'Midjourney Generated',
        dalle: 'DALL-E Generated'
    };

    // Add a badge to a specified element
    function addBadge(type, selector, options = {}) {
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

        elements.forEach(element => {
            // Don't add if badge already exists
            if (element.querySelector('.attest-badge-container')) {
                removeBadge(selector);
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
            
            // Apply position settings
            const positionSettings = positionMap[position] || positionMap['top-right'];
            Object.keys(positionSettings).forEach(key => {
                badgeContainer.style[key] = positionSettings[key];
            });

            const badgeImg = document.createElement('img');
            badgeImg.src = badges[type];
            badgeImg.alt = badgeLabels[type];
            badgeImg.title = badgeLabels[type];
            badgeImg.className = `attest-badge attest-${type}-badge`;
            badgeImg.style.height = sizeMap[size] || sizeMap.medium;
            badgeImg.style.display = 'block';

            badgeContainer.appendChild(badgeImg);
            element.appendChild(badgeContainer);
        });
    }

    // Remove badge from element
    function removeBadge(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const badgeContainer = element.querySelector('.attest-badge-container');
            if (badgeContainer) {
                badgeContainer.remove();
            }
        });
    }

    // Public API
    return {
        addBadge,
        removeBadge,
        getBadgeUrl: type => badges[type]
    };
})();