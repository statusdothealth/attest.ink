/**
 * attest.ink - Platform Badges JavaScript
 * Handles functionality for platform-specific badges and modals
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize platform badges functionality
    initializePlatformBadges();
    
    // Initialize modal functionality
    initializeModal();
});

// Initialize platform badges functionality
function initializePlatformBadges() {
    const platformButtons = document.querySelectorAll('.platform-badge .btn');
    
    // Platform-specific information
    const platformInfo = {
        claude: {
            name: 'Claude AI Assisted',
            color: 'var(--claude-color)',
            description: `The Claude AI Assisted badge clearly identifies content created with Anthropic's Claude AI assistant. This animated badge features Anthropic's signature purple color scheme and a distinctive orbital design that represents Claude's thoughtful, nuanced approach to content generation.`,
            implementation: {
                html: '<img src="https://attest.ink/assets/badges/claude-generated.svg" alt="Claude AI Generated" width="120" height="30">',
                markdown: '![Claude AI Generated](https://attest.ink/assets/badges/claude-generated.svg)',
                javascript: `AttestInk.addBadge('claude', '#my-content');`
            },
            options: [
                { title: 'Position', description: 'Top-right, top-left, bottom-right, bottom-left' },
                { title: 'Size', description: 'Small, medium, large' },
                { title: 'Style', description: 'Default, subtle, prominent' }
            ]
        },
        chatgpt: {
            name: 'ChatGPT Assisted',
            color: 'var(--chatgpt-color)',
            description: `The ChatGPT Assisted badge identifies content created with OpenAI's ChatGPT models. This animated badge features OpenAI's recognizable teal color scheme and a hexagonal pattern symbolizing ChatGPT's neural network connections and knowledge structure.`,
            implementation: {
                html: '<img src="https://attest.ink/assets/badges/chatgpt-generated.svg" alt="ChatGPT Generated" width="120" height="30">',
                markdown: '![ChatGPT Generated](https://attest.ink/assets/badges/chatgpt-generated.svg)',
                javascript: `AttestInk.addBadge('chatgpt', '#my-content');`
            },
            options: [
                { title: 'Position', description: 'Top-right, top-left, bottom-right, bottom-left' },
                { title: 'Size', description: 'Small, medium, large' },
                { title: 'Style', description: 'Default, subtle, prominent' }
            ]
        },
        gemini: {
            name: 'Gemini Assisted',
            color: 'var(--gemini-color)',
            description: `The Gemini Assisted badge identifies content created with Google's Gemini AI models. This animated badge features a cosmic-inspired design with purple/violet tones that represent Google's Gemini branding, with star-like elements symbolizing the constellation.`,
            implementation: {
                html: '<img src="https://attest.ink/assets/badges/gemini-generated.svg" alt="Gemini Generated" width="120" height="30">',
                markdown: '![Gemini Generated](https://attest.ink/assets/badges/gemini-generated.svg)',
                javascript: `AttestInk.addBadge('gemini', '#my-content');`
            },
            options: [
                { title: 'Position', description: 'Top-right, top-left, bottom-right, bottom-left' },
                { title: 'Size', description: 'Small, medium, large' },
                { title: 'Style', description: 'Default, subtle, prominent' }
            ]
        },
        midjourney: {
            name: 'Midjourney Assisted',
            color: 'var(--midjourney-color)',
            description: `The Midjourney Assisted badge identifies images created with Midjourney's AI image generation system. This animated badge features a distinctive blue color scheme with a stylized 'M' and creative particle effects that symbolize the artistic and imaginative nature of Midjourney's output.`,
            implementation: {
                html: '<img src="https://attest.ink/assets/badges/midjourney-generated.svg" alt="Midjourney Generated" width="120" height="30">',
                markdown: '![Midjourney Generated](https://attest.ink/assets/badges/midjourney-generated.svg)',
                javascript: `AttestInk.addBadge('midjourney', '#my-content');`
            },
            options: [
                { title: 'Position', description: 'Top-right, top-left, bottom-right, bottom-left' },
                { title: 'Size', description: 'Small, medium, large' },
                { title: 'Style', description: 'Default, subtle, prominent' }
            ]
        },
        dalle: {
            name: 'DALL-E Assisted',
            color: 'var(--dalle-color)',
            description: `The DALL-E Assisted badge identifies images created with OpenAI's DALL-E image generation system. This animated badge features a vibrant, colorful design with a characteristic eye-like symbol representing DALL-E's visual creativity and the kaleidoscopic range of images it can create.`,
            implementation: {
                html: '<img src="https://attest.ink/assets/badges/dalle-generated.svg" alt="DALL-E Generated" width="120" height="30">',
                markdown: '![DALL-E Generated](https://attest.ink/assets/badges/dalle-generated.svg)',
                javascript: `AttestInk.addBadge('dalle', '#my-content');`
            },
            options: [
                { title: 'Position', description: 'Top-right, top-left, bottom-right, bottom-left' },
                { title: 'Size', description: 'Small, medium, large' },
                { title: 'Style', description: 'Default, subtle, prominent' }
            ]
        }
    };
    
    platformButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Determine which platform this button is for
            const parent = button.closest('.platform-badge');
            const platformTitle = parent.querySelector('h3').textContent.toLowerCase();
            let platform;
            
            // Match the platform title with our data
            if (platformTitle.includes('claude')) platform = 'claude';
            else if (platformTitle.includes('chatgpt')) platform = 'chatgpt';
            else if (platformTitle.includes('gemini')) platform = 'gemini';
            else if (platformTitle.includes('midjourney')) platform = 'midjourney';
            else if (platformTitle.includes('dall-e')) platform = 'dalle';
            
            if (platform && platformInfo[platform]) {
                openPlatformModal(platform, platformInfo[platform]);
            }
        });
    });
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('platform-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Function to close the modal with animation
    function closeModal() {
        const modalContent = modal.querySelector('.modal-content');
        
        // Animate closing
        modalContent.style.animation = 'modalZoomOut 0.2s forwards';
        modal.style.opacity = '0';
        
        // Remove active class after animation
        setTimeout(() => {
            modal.classList.remove('active');
            modalContent.style.animation = '';
        }, 200);
    }
}

// Function to open platform-specific modal
function openPlatformModal(platform, info) {
    const modal = document.getElementById('platform-modal');
    const modalBody = document.getElementById('modal-body');
    
    // Set modal content
    modalBody.innerHTML = `
        <h2 style="color: ${info.color}">${info.name}</h2>
        <p>${info.description}</p>
        
        <div class="badge-showcase">
            <img src="assets/badges/${platform}-generated.svg" alt="${info.name}" width="240" height="60">
        </div>
        
        <h3>Implementation</h3>
        
        <div class="code-tabs">
            <div class="tabs">
                <button class="tab-btn active" data-tab="modal-html">HTML</button>
                <button class="tab-btn" data-tab="modal-markdown">Markdown</button>
                <button class="tab-btn" data-tab="modal-javascript">JavaScript</button>
            </div>
            
            <div class="tab-content active" id="modal-html-tab">
                <div class="code-example">
                    <code>${info.implementation.html}</code>
                </div>
            </div>
            
            <div class="tab-content" id="modal-markdown-tab">
                <div class="code-example">
                    <code>${info.implementation.markdown}</code>
                </div>
            </div>
            
            <div class="tab-content" id="modal-javascript-tab">
                <div class="code-example">
                    <code>${info.implementation.javascript}</code>
                </div>
            </div>
        </div>
        
        <div class="badge-options">
            <h3>Customization Options</h3>
            <p>When using the JavaScript implementation, you can customize the badge with these options:</p>
            
            <div class="option-grid">
                ${info.options.map(option => `
                    <div class="option-item">
                        <h4>${option.title}</h4>
                        <p>${option.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Show the modal
    modal.classList.add('active');
    
    // Initialize tabs in the modal
    initializeModalTabs();
}

// Initialize tabs within the modal
function initializeModalTabs() {
    const tabButtons = document.querySelectorAll('.code-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.code-tabs .tab-content');
    
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