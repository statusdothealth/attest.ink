// File: js/attest.js (updated)
/**
 * attest.ink - Enhanced Content Attribution Badge System
 * Provides badges for both human and AI content attribution
 */

const AttestInk = (function() {
    // Badge URLs - these paths must match your actual SVG files
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
    
    // Default badge tooltips
    const defaultTooltips = {
        human: 'Human-created content, verified by attest.ink',
        ai: 'AI-generated content, verified by attest.ink',
        claude: 'Generated with Claude AI',
        chatgpt: 'Generated with ChatGPT',
        gemini: 'Generated with Gemini AI',
        midjourney: 'Image generated with Midjourney',
        dalle: 'Image generated with DALL-E'
    };

    // Add a badge to a specified element with enhanced options
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
        const position = options.position || 'bottom-right';
        const size = options.size || 'medium';
        const style = options.style || 'default';
        const linkToAttestInk = options.linkToAttestInk || false;
        const showTooltip = options.showTooltip || false;
        const tooltip = options.tooltip || defaultTooltips[type];
        
        // Size mapping with enhanced options
        const sizeMap = {
            small: '24px',
            medium: '36px',
            large: '48px'
        };
        
        // Position mapping with enhanced options
        const positionMap = {
            'top-left': { top: '-15px', left: '10px', right: 'auto', bottom: 'auto' },
            'top-right': { top: '-15px', right: '10px', left: 'auto', bottom: 'auto' },
            'bottom-left': { bottom: '-15px', left: '10px', top: 'auto', right: 'auto' },
            'bottom-right': { bottom: '-15px', right: '10px', top: 'auto', left: 'auto' },
            'center-top': { top: '-15px', left: '50%', transform: 'translateX(-50%)', right: 'auto', bottom: 'auto' },
            'center-bottom': { bottom: '-15px', left: '50%', transform: 'translateX(-50%)', top: 'auto', right: 'auto' }
        };

        // Style mapping for different badge styles
        const styleMap = {
            'default': {},
            'subtle': { opacity: '0.8' },
            'prominent': { 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                transform: 'scale(1.05)'
            }
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

            let badgeContainer;
            
            if (linkToAttestInk) {
                // Create an <a> element for the badge container
                badgeContainer = document.createElement('a');
                badgeContainer.href = 'https://attest.ink';
                badgeContainer.target = '_blank';
                badgeContainer.rel = 'noopener';
            } else {
                // Create a div container
                badgeContainer = document.createElement('div');
            }
            
            badgeContainer.className = 'attest-badge-container';
            badgeContainer.style.position = 'absolute';
            badgeContainer.style.zIndex = '999';
            
            // Apply position settings
            const positionSettings = positionMap[position] || positionMap['bottom-right'];
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
            
            // Apply style settings
            const styleSettings = styleMap[style] || styleMap.default;
            Object.keys(styleSettings).forEach(key => {
                badgeImg.style[key] = styleSettings[key];
            });

            badgeContainer.appendChild(badgeImg);
            
            // Add tooltip if enabled
            if (showTooltip && tooltip) {
                const tooltipSpan = document.createElement('span');
                tooltipSpan.className = 'badge-tooltip';
                tooltipSpan.textContent = tooltip;
                badgeContainer.appendChild(tooltipSpan);
                
                // If linkToAttestInk is true, add badge-link class for hover effects
                if (linkToAttestInk) {
                    badgeContainer.classList.add('badge-link');
                }
            }
            
            element.appendChild(badgeContainer);
            
            // Add data attributes for future reference
            badgeContainer.dataset.badgeType = type;
            badgeContainer.dataset.badgePosition = position;
            badgeContainer.dataset.badgeSize = size;
            badgeContainer.dataset.badgeStyle = style;
        });
    }
    
    // Add a footer-style badge to an element
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
        const linkToAttestInk = options.linkToAttestInk !== undefined ? options.linkToAttestInk : true;
        const customText = options.customText || `This content was created with ${type === 'human' ? 'human creativity' : 'AI assistance'}`;
        
        elements.forEach(element => {
            // Don't add if footer badge already exists
            if (element.querySelector('.footer-badge-container')) {
                element.querySelector('.footer-badge-container').remove();
            }

            const footerBadge = document.createElement('div');
            footerBadge.className = 'footer-badge-container';
            
            // Add appropriate class based on badge type
            footerBadge.classList.add(type);

            const leftDiv = document.createElement('div');
            leftDiv.className = 'footer-badge-left';

            const badgeImg = document.createElement('img');
            badgeImg.src = badges[type];
            badgeImg.alt = badgeLabels[type];
            badgeImg.className = 'footer-badge-icon';

            const textDiv = document.createElement('div');
            textDiv.className = 'footer-badge-text';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'footer-badge-title';
            titleDiv.textContent = badgeLabels[type];

            const descDiv = document.createElement('div');
            descDiv.className = 'footer-badge-description';
            descDiv.textContent = customText;

            textDiv.appendChild(titleDiv);
            textDiv.appendChild(descDiv);

            leftDiv.appendChild(badgeImg);
            leftDiv.appendChild(textDiv);

            footerBadge.appendChild(leftDiv);

            if (linkToAttestInk) {
                const link = document.createElement('a');
                link.href = 'https://attest.ink';
                link.target = '_blank';
                link.rel = 'noopener';
                link.className = 'footer-badge-link';
                link.innerHTML = 'attest.ink <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

                footerBadge.appendChild(link);
            }

            element.appendChild(footerBadge);
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
            
            const footerBadge = element.querySelector('.footer-badge-container');
            if (footerBadge) {
                footerBadge.remove();
            }
        });
    }

    // Generate HTML code for a badge
    function generateBadgeHTML(type, options = {}) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return '';
        }

        const position = options.position || 'bottom-right';
        const size = options.size || 'medium';
        const linkToAttestInk = options.linkToAttestInk !== undefined ? options.linkToAttestInk : true;
        const showTooltip = options.showTooltip !== undefined ? options.showTooltip : true;
        const tooltip = options.tooltip || defaultTooltips[type];
        
        const posMap = {
            'top-left': { top: '-15px', left: '10px' },
            'top-right': { top: '-15px', right: '10px' },
            'bottom-left': { bottom: '-15px', left: '10px' },
            'bottom-right': { bottom: '-15px', right: '10px' },
            'center-top': { top: '-15px', left: '50%', transform: 'translateX(-50%)' },
            'center-bottom': { bottom: '-15px', left: '50%', transform: 'translateX(-50%)' }
        };
        
        const sizeMap = {
            'small': '24px',
            'medium': '36px',
            'large': '48px'
        };
        
        const badgeURL = badges[type];
        const badgeLabel = badgeLabels[type];
        const posStyle = Object.entries(posMap[position] || posMap['bottom-right'])
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ');
        const heightValue = sizeMap[size] || sizeMap['medium'];
        
        if (linkToAttestInk) {
            let html = `<div style="position: relative;">
    <!-- Your content here -->
    <a href="https://attest.ink" target="_blank" style="position: absolute; ${posStyle} z-index: 10;" rel="noopener">
        <img src="${badgeURL}" alt="${badgeLabel}" style="height: ${heightValue}; border: 0;">`;
            
            if (showTooltip) {
                html += `
        <span class="badge-tooltip" style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%) scale(0.8); background-color: #333; color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; opacity: 0; transition: opacity 0.3s, transform 0.3s; pointer-events: none; white-space: nowrap; z-index: 10;">${tooltip}</span>`;
            }
            
            html += `
    </a>
</div>`;
            
            return html;
        } else {
            return `<div style="position: relative;">
    <!-- Your content here -->
    <img src="${badgeURL}" alt="${badgeLabel}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
        }
    }
    
    // Generate HTML for a footer badge
    function generateFooterBadgeHTML(type, options = {}) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return '';
        }
        
        const linkToAttestInk = options.linkToAttestInk !== undefined ? options.linkToAttestInk : true;
        const customText = options.customText || `This content was created with ${type === 'human' ? 'human creativity' : 'AI assistance'}`;
        
        const badgeURL = badges[type];
        const badgeLabel = badgeLabels[type];
        
        let html = `<div style="position: relative; width: 100%; padding: 10px 0; margin-top: 20px; display: flex; align-items: center; justify-content: space-between; border-top: 2px solid var(--${type}-color, #4a7bca); background-color: #f9f9f9;">
    <div style="display: flex; align-items: center; gap: 10px; margin-left: 15px;">
        <img src="${badgeURL}" alt="${badgeLabel}" style="height: 36px;">
        <div style="display: flex; flex-direction: column;">
            <div style="font-weight: 600; font-size: 16px;">${badgeLabel}</div>
            <div style="font-size: 12px; color: #666;">${customText}</div>
        </div>
    </div>`;
        
        if (linkToAttestInk) {
            html += `
    <a href="https://attest.ink" target="_blank" style="margin-right: 15px; color: #4a7bca; text-decoration: none; display: flex; align-items: center; gap: 5px; font-size: 12px;" rel="noopener">
        attest.ink
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
    </a>`;
        }
        
        html += `
</div>`;
        
        return html;
    }

    // Generate Markdown code for a badge
    function generateBadgeMarkdown(type, options = {}) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return '';
        }
        
        const linkToAttestInk = options.linkToAttestInk !== undefined ? options.linkToAttestInk : true;
        const tooltip = options.tooltip || defaultTooltips[type];
        
        const badgeURL = badges[type];
        const badgeLabel = badgeLabels[type];
        
        if (linkToAttestInk) {
            return `[![${badgeLabel}](${badgeURL})](https://attest.ink "${tooltip}")`;
        } else {
            return `![${badgeLabel}](${badgeURL})`;
        }
    }

    // Generate plain text attribution for a badge
    function generateBadgeText(type) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return '';
        }
        
        const badgeLabel = badgeLabels[type];
        
        return `[${badgeLabel}] - Content created with attribution by attest.ink`;
    }

    // Public API
    return {
        addBadge,
        addFooterBadge,
        removeBadge,
        getBadgeUrl: type => badges[type],
        getBadgeLabel: type => badgeLabels[type],
        generateBadgeHTML,
        generateFooterBadgeHTML,
        generateBadgeMarkdown,
        generateBadgeText
    };
})();