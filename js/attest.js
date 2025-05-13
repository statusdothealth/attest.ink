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

            const badgeContainer = document.createElement('div');
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
            element.appendChild(badgeContainer);
            
            // Add data attributes for future reference
            badgeContainer.dataset.badgeType = type;
            badgeContainer.dataset.badgePosition = position;
            badgeContainer.dataset.badgeSize = size;
            badgeContainer.dataset.badgeStyle = style;
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

   // Generate HTML code for a badge
    function generateBadgeHTML(type, options = {}) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return '';
        }

        const position = options.position || 'bottom-right';
        const size = options.size || 'medium';
        
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
        
        return `<div style="position: relative;">
    <!-- Your content here -->
    <img src="${badgeURL}" alt="${badgeLabel}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
    }

    // Generate Markdown code for a badge
    function generateBadgeMarkdown(type) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return '';
        }
        
        const badgeURL = badges[type];
        const badgeLabel = badgeLabels[type];
        
        return `![${badgeLabel}](${badgeURL})`;
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

    // Get badge data for a specific type
    function getBadgeData(type) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return null;
        }
        
        return {
            url: badges[type],
            label: badgeLabels[type],
            type: type
        };
    }

    // Add footer attribution to html content
    function addHTMLFooter(html, type) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return html;
        }
        
        const badgeURL = badges[type];
        const badgeLabel = badgeLabels[type];
        
        const footer = `
<div class="attest-ink-footer" style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
    <img src="${badgeURL}" alt="${badgeLabel}" style="height: 36px; margin-bottom: 10px;">
    <p style="color: #666; font-size: 14px; margin-top: 5px;">This content was created with ${badgeLabel} assistance. Attribution provided by <a href="https://attest.ink" target="_blank">attest.ink</a>.</p>
</div>`;
        
        // Check if the HTML content has a body tag
        if (html.includes('</body>')) {
            return html.replace('</body>', `${footer}</body>`);
        } else {
            return html + footer;
        }
    }

    // Add footer attribution to markdown content
    function addMarkdownFooter(markdown, type) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return markdown;
        }
        
        const badgeURL = badges[type];
        const badgeLabel = badgeLabels[type];
        
        const footer = `
---

![${badgeLabel}](${badgeURL})

*This content was created with ${badgeLabel} assistance. Attribution provided by [attest.ink](https://attest.ink).*`;
        
        return markdown + footer;
    }

    // Add footer attribution to text content
    function addTextFooter(text, type) {
        if (!badges[type]) {
            console.error(`Invalid badge type: ${type}.`);
            return text;
        }
        
        const badgeLabel = badgeLabels[type];
        
        const footer = `
--------------------------------------------------
This content was created with ${badgeLabel} assistance.
Attribution provided by attest.ink (https://attest.ink)
`;
        
        return text + footer;
    }

    // Public API
    return {
        addBadge,
        removeBadge,
        getBadgeUrl: type => badges[type],
        getBadgeLabel: type => badgeLabels[type],
        generateBadgeHTML,
        generateBadgeMarkdown,
        generateBadgeText,
        getBadgeData,
        addHTMLFooter,
        addMarkdownFooter,
        addTextFooter
    };
})(); 