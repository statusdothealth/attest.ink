/**
 * attest.ink - Demo Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize demo functionality
    initializeDemo();
    
    // Initialize example tabs
    initializeExampleTabs();
    
    // Initialize view code buttons
    initializeViewCodeButtons();
    
    // Initialize copy buttons
    initializeCopyButtons();
    
    // Apply default badge
    applyBadge('human', 'bottom-right');
    
    // Update code examples
    updateCodeExamples('human', 'blog', 'bottom-right');
});

// Initialize demo functionality
function initializeDemo() {
    const contentButtons = document.querySelectorAll('.content-btn');
    const badgeButtons = document.querySelectorAll('.badge-btn');
    const badgePosition = document.getElementById('badge-position');
    
    // Content type selection
    contentButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            contentButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get content type
            const contentType = button.dataset.content;
            
            // Change content preview
            changeContentPreview(contentType);
            
            // Get current badge type and position
            const badgeType = document.querySelector('.badge-btn.active').dataset.badge;
            const position = badgePosition.value;
            
            // Update preview with selected badge
            applyBadge(badgeType, position);
            
            // Update code examples
            updateCodeExamples(badgeType, contentType, position);
        });
    });
    
    // Badge type selection
    badgeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            badgeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get badge type
            const badgeType = button.dataset.badge;
            
            // Get position
            const position = badgePosition.value;
            
            // Apply badge
            applyBadge(badgeType, position);
            
            // Get current content type
            const contentType = document.querySelector('.content-btn.active').dataset.content;
            
            // Update code examples
            updateCodeExamples(badgeType, contentType, position);
        });
    });
    
    // Badge position selection
    badgePosition.addEventListener('change', () => {
        // Get badge type
        const badgeType = document.querySelector('.badge-btn.active').dataset.badge;
        
        // Get position
        const position = badgePosition.value;
        
        // Apply badge
        applyBadge(badgeType, position);
        
        // Get current content type
        const contentType = document.querySelector('.content-btn.active').dataset.content;
        
        // Update code examples
        updateCodeExamples(badgeType, contentType, position);
    });
}

// Initialize example tabs
function initializeExampleTabs() {
    const exampleTabButtons = document.querySelectorAll('.example-tab-btn');
    const exampleTabContents = document.querySelectorAll('.example-tab-content');
    
    exampleTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            exampleTabButtons.forEach(btn => btn.classList.remove('active'));
            exampleTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = `example-${button.dataset.exampleTab}-tab`;
            
            // Show corresponding content
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize view code buttons
function initializeViewCodeButtons() {
    const viewCodeButtons = document.querySelectorAll('.view-code-btn');
    const modal = document.getElementById('code-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (!modal) return;
    
    viewCodeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const exampleType = button.dataset.example;
            const badgeType = document.querySelector('.badge-btn.active').dataset.badge;
            
            // Update modal content
            updateModalContent(exampleType, badgeType);
            
            // Show modal
            modal.classList.add('active');
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal on click outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Initialize modal tabs
    const modalTabButtons = document.querySelectorAll('.modal-tab-btn');
    const modalTabContents = document.querySelectorAll('.modal-tab-content');
    
    modalTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            modalTabButtons.forEach(btn => btn.classList.remove('active'));
            modalTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = `modal-${button.dataset.modalTab}-tab`;
            
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
            let codeElement;
            
            if (targetId.includes('modal')) {
                // For modal content
                codeElement = document.querySelector(`#${targetId} code`);
            } else if (targetId.includes('example')) {
                // For example tab content
                codeElement = document.querySelector(`#${targetId} code`);
            } else {
                // For individual code boxes
                codeElement = button.previousElementSibling.querySelector('code');
            }
            
            if (codeElement) {
                navigator.clipboard.writeText(codeElement.textContent)
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
                    });
            }
        });
    });
}

// Change content preview based on content type
function changeContentPreview(contentType) {
    const contentPreview = document.getElementById('content-preview');
    
    if (!contentPreview) return;
    
    // Remove existing content
    contentPreview.innerHTML = '';
    
    // Remove all content type classes
    contentPreview.className = 'content-preview';
    
    // Add new content class
    contentPreview.classList.add(`${contentType}-preview`);
    
    // Get content template
    let contentTemplate = document.getElementById(`${contentType}-template`);
    
    if (contentTemplate) {
        contentPreview.innerHTML = contentTemplate.innerHTML;
    } else {
        // Default to blog content if template not found
        contentPreview.classList.add('blog-preview');
        contentPreview.innerHTML = `
            <div class="blog-header">
                <h2>The Future of Content Attribution in the AI Era</h2>
                <div class="blog-meta">
                    <span class="author">By Sarah Johnson</span>
                    <span class="date">May 10, 2025</span>
                </div>
            </div>
            <div class="blog-content">
                <p>In today's digital landscape, the line between human-created and AI-generated content continues to blur. As artificial intelligence tools become more sophisticated, the need for transparent attribution has never been more important.</p>
                
                <p>Content creators, publishers, and platforms are now facing new challenges in clearly identifying the origin of digital media. This is where standardized attribution badges can play a crucial role in maintaining transparency and trust.</p>
                
                <h3>Why Attribution Matters</h3>
                
                <p>Understanding content origin is important for several reasons:</p>
                
                <ul>
                    <li>Transparency builds trust with your audience</li>
                    <li>Attribution acknowledges both human creativity and AI capabilities</li>
                    <li>Clear labeling helps prevent misunderstandings and false claims</li>
                    <li>Readers gain important context for interpreting information</li>
                </ul>
                
                <p>As we navigate the evolving media landscape, establishing clear standards for content attribution will be essential for maintaining the value of human creativity while embracing the capabilities of artificial intelligence.</p>
            </div>
        `;
    }
}

// Apply badge to content preview
function applyBadge(badgeType, position) {
    const contentPreview = document.getElementById('content-preview');
    
    if (!contentPreview) return;
    
    // Remove existing badge
    const existingBadge = contentPreview.querySelector('.attest-badge-container');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Remove existing footer badge
    const existingFooterBadge = contentPreview.querySelector('.footer-badge-container');
    if (existingFooterBadge) {
        existingFooterBadge.remove();
    }
    
    // Apply badge based on position
    if (position === 'footer') {
        // Add footer badge
        const badgeNames = {
            'human': 'Human Generated',
            'ai': 'AI Generated',
            'claude': 'Claude AI Generated',
            'chatgpt': 'ChatGPT Generated',
            'gemini': 'Gemini Generated',
            'midjourney': 'Midjourney Generated',
            'dalle': 'DALL-E Generated'
        };
        
        const badgeDescriptions = {
            'human': 'This content was created by a human author',
            'ai': 'This content was created with artificial intelligence assistance',
            'claude': 'This content was created with Anthropic\'s Claude AI assistant',
            'chatgpt': 'This content was created with OpenAI\'s ChatGPT',
            'gemini': 'This content was created with Google\'s Gemini AI',
            'midjourney': 'This image was created with Midjourney',
            'dalle': 'This image was created with DALL-E'
        };
        
        const footerBadge = document.createElement('div');
        footerBadge.className = 'footer-badge-container';
        footerBadge.innerHTML = `
            <div class="footer-badge-left">
                <img src="assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" class="footer-badge-icon">
                <div class="footer-badge-text">
                    <div class="footer-badge-title">${badgeNames[badgeType]}</div>
                    <div class="footer-badge-description">${badgeDescriptions[badgeType]}</div>
                </div>
            </div>
            <a href="https://attest.ink" target="_blank" class="footer-badge-link" rel="noopener">
                attest.ink
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </a>
        `;
        
        contentPreview.appendChild(footerBadge);
    } else {
        // Add regular badge
        const badgeURL = `assets/badges/${badgeType}-generated.svg`;
        const badgeNames = {
            'human': 'Human Generated',
            'ai': 'AI Generated',
            'claude': 'Claude AI Generated',
            'chatgpt': 'ChatGPT Generated',
            'gemini': 'Gemini Generated',
            'midjourney': 'Midjourney Generated',
            'dalle': 'DALL-E Generated'
        };
        
        const badgeTooltips = {
            'human': 'Human-created content, verified by attest.ink',
            'ai': 'AI-generated content, verified by attest.ink',
            'claude': 'Generated with Claude AI',
            'chatgpt': 'Generated with ChatGPT',
            'gemini': 'Generated with Gemini AI',
            'midjourney': 'Image generated with Midjourney',
            'dalle': 'Image generated with DALL-E'
        };
        
        const badge = document.createElement('a');
        badge.href = 'https://attest.ink';
        badge.target = '_blank';
        badge.rel = 'noopener';
        badge.className = 'badge-link attest-badge-container';
        badge.style.position = 'absolute';
        
        // Set position
        switch(position) {
            case 'top-right':
                badge.style.top = '10px';
                badge.style.right = '10px';
                break;
            case 'top-left':
                badge.style.top = '10px';
                badge.style.left = '10px';
                break;
            case 'bottom-right':
                badge.style.bottom = '10px';
                badge.style.right = '10px';
                break;
            case 'bottom-left':
                badge.style.bottom = '10px';
                badge.style.left = '10px';
                break;
            default:
                badge.style.bottom = '10px';
                badge.style.right = '10px';
        }
        
        badge.style.zIndex = '10';
        
        badge.innerHTML = `
            <img src="${badgeURL}" alt="${badgeNames[badgeType]}" width="120" height="30" class="attest-badge">
            <span class="badge-tooltip">${badgeTooltips[badgeType]}</span>
        `;
        
        const contentType = document.querySelector('.content-btn.active').dataset.content;
        
        // For image content, add badge to image container
        if (contentType === 'image') {
            const imageContainer = contentPreview.querySelector('.image-container');
            if (imageContainer) {
                imageContainer.style.position = 'relative';
                imageContainer.appendChild(badge);
            } else {
                contentPreview.appendChild(badge);
            }
        } else {
            // For other content types, add to main container
            contentPreview.style.position = 'relative';
            contentPreview.appendChild(badge);
        }
    }
}

// Update code examples based on badge type, content type, and position
function updateCodeExamples(badgeType, contentType, position) {
    const htmlCodeExample = document.getElementById('html-code-example');
    const markdownCodeExample = document.getElementById('markdown-code-example');
    const javascriptCodeExample = document.getElementById('javascript-code-example');
    
    if (!htmlCodeExample || !markdownCodeExample || !javascriptCodeExample) return;
    
    // Badge information
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Generated',
        'claude': 'Claude AI Generated',
        'chatgpt': 'ChatGPT Generated',
        'gemini': 'Gemini Generated',
        'midjourney': 'Midjourney Generated',
        'dalle': 'DALL-E Generated'
    };
    
    const badgeTooltips = {
        'human': 'Human-created content, verified by attest.ink',
        'ai': 'AI-generated content, verified by attest.ink',
        'claude': 'Generated with Claude AI',
        'chatgpt': 'Generated with ChatGPT',
        'gemini': 'Generated with Gemini AI',
        'midjourney': 'Image generated with Midjourney',
        'dalle': 'Image generated with DALL-E'
    };
    
    // Update HTML example
    if (position === 'footer') {
        htmlCodeExample.textContent = `<!-- Add this footer badge to your ${contentType} -->
<div class="footer-badge-container">
  <div class="footer-badge-left">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" class="footer-badge-icon">
    <div class="footer-badge-text">
      <div class="footer-badge-title">${badgeNames[badgeType]}</div>
      <div class="footer-badge-description">This content was created with ${contentType === 'image' || contentType === 'video' ? badgeType + ' AI' : 'AI assistance'}</div>
    </div>
  </div>
  <a href="https://attest.ink" target="_blank" class="footer-badge-link" rel="noopener">attest.ink</a>
</div>`;
    } else {
        // Generate example based on content type
        switch(contentType) {
            case 'blog':
            case 'text':
                htmlCodeExample.textContent = `<!-- Add this to your ${contentType} HTML -->
<a href="https://attest.ink" target="_blank" class="badge-link" rel="noopener">
  <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">
  <span class="badge-tooltip">${badgeTooltips[badgeType]}</span>
</a>`;
                break;
            case 'email':
                htmlCodeExample.textContent = `<!-- Add this to your email HTML -->
<div style="position: relative; margin-top: 20px;">
  <a href="https://attest.ink" target="_blank" style="display: inline-block;" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>`;
                break;
            case 'image':
                htmlCodeExample.textContent = `<!-- Add this to your image container -->
<div style="position: relative; display: inline-block;">
  <img src="your-image.jpg" alt="Your image description" style="max-width: 100%;">
  <a href="https://attest.ink" target="_blank" style="position: absolute; ${position === 'top-right' ? 'top: 10px; right: 10px;' : position === 'top-left' ? 'top: 10px; left: 10px;' : position === 'bottom-left' ? 'bottom: 10px; left: 10px;' : 'bottom: 10px; right: 10px;'}" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>`;
                break;
            case 'video':
                htmlCodeExample.textContent = `<!-- Add this to your video container -->
<div style="position: relative;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <a href="https://attest.ink" target="_blank" style="position: absolute; ${position === 'top-right' ? 'top: 10px; right: 10px;' : position === 'top-left' ? 'top: 10px; left: 10px;' : position === 'bottom-left' ? 'bottom: 10px; left: 10px;' : 'bottom: 10px; right: 10px;'}" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>`;
                break;
            case 'pdf':
                htmlCodeExample.textContent = `<!-- For PDF documents, add this to your HTML page showing the PDF -->
<div style="position: relative;">
  <embed src="your-document.pdf" type="application/pdf" width="100%" height="600px">
  <a href="https://attest.ink" target="_blank" style="position: absolute; ${position === 'top-right' ? 'top: 10px; right: 10px;' : position === 'top-left' ? 'top: 10px; left: 10px;' : position === 'bottom-left' ? 'bottom: 10px; left: 10px;' : 'bottom: 10px; right: 10px;'}" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>

<!-- For PDF export, add this to your document footer -->
<img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">`;
                break;
            default:
                htmlCodeExample.textContent = `<!-- Add this badge to your content -->
<a href="https://attest.ink" target="_blank" class="badge-link" rel="noopener">
  <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">
  <span class="badge-tooltip">${badgeTooltips[badgeType]}</span>
</a>`;
        }
    }
    
    // Update Markdown example
    markdownCodeExample.textContent = `[![${badgeNames[badgeType]}](https://attest.ink/assets/badges/${badgeType}-generated.svg)](https://attest.ink "${badgeTooltips[badgeType]}")`;
    
    // Update JavaScript example
    if (position === 'footer') {
        javascriptCodeExample.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add a ${badgeType} footer badge to your ${contentType}
  AttestInk.addFooterBadge('${badgeType}', '#your-content-selector', {
    linkToAttestInk: true,
    customText: 'This content was created with ${contentType === 'image' || contentType === 'video' ? badgeType + ' AI' : 'AI assistance'}'
  });
<\/script>`;
    } else {
        javascriptCodeExample.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add a ${badgeType} badge to your ${contentType}
  AttestInk.addBadge('${badgeType}', '#your-content-selector', {
    position: '${position}',
    linkToAttestInk: true,
    showTooltip: true,
    tooltip: '${badgeTooltips[badgeType]}'
  });
<\/script>`;
    }
}

// Update modal content for view code examples
function updateModalContent(exampleType, badgeType) {
    const modalTitle = document.getElementById('modal-title');
    const modalHtmlCode = document.getElementById('modal-html-code');
    const modalMarkdownCode = document.getElementById('modal-markdown-code');
    const modalJavascriptCode = document.getElementById('modal-javascript-code');
    
    if (!modalTitle || !modalHtmlCode || !modalMarkdownCode || !modalJavascriptCode) return;
    
    // Badge information
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Generated',
        'claude': 'Claude AI Generated',
        'chatgpt': 'ChatGPT Generated',
        'gemini': 'Gemini Generated',
        'midjourney': 'Midjourney Generated',
        'dalle': 'DALL-E Generated'
    };
    
    const badgeTooltips = {
        'human': 'Human-created content, verified by attest.ink',
        'ai': 'AI-generated content, verified by attest.ink',
        'claude': 'Generated with Claude AI',
        'chatgpt': 'Generated with ChatGPT',
        'gemini': 'Generated with Gemini AI',
        'midjourney': 'Image generated with Midjourney',
        'dalle': 'Image generated with DALL-E'
    };
    
    // Update modal title
    const exampleNames = {
        'blog': 'Blog Posts',
        'text': 'Plain Text',
        'email': 'Email',
        'image': 'Images',
        'video': 'Videos',
        'pdf': 'PDF Documents'
    };
    
    modalTitle.textContent = `Code Example: ${exampleNames[exampleType] || exampleType}`;
    
    // Update HTML example
    switch(exampleType) {
        case 'blog':
            modalHtmlCode.textContent = `<!-- For blog posts like Medium, Wordpress, etc. -->
<!-- Add at the end of your article or in the author byline section -->
<a href="https://attest.ink" target="_blank" class="badge-link" rel="noopener">
  <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">
  <span class="badge-tooltip">${badgeTooltips[badgeType]}</span>
</a>`;
            break;
        case 'text':
            modalHtmlCode.textContent = `<!-- For plain text documents converted to HTML -->
<div class="document-content">
  <!-- Your content here -->
  <p>This is your document content...</p>
  
  <!-- Badge at the end of the document -->
  <div style="margin-top: 30px;">
    <a href="https://attest.ink" target="_blank" rel="noopener">
      <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">
    </a>
  </div>
</div>`;
            break;
        case 'email':
            modalHtmlCode.textContent = `<!-- For HTML email templates -->
<!-- Add to your email signature -->
<div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
  <div style="font-family: Arial, sans-serif; margin-bottom: 15px;">
    <div style="font-weight: bold;">Your Name</div>
    <div>Your Title</div>
    <div>Your Company</div>
    <div><a href="mailto:you@example.com">you@example.com</a></div>
  </div>
  
  <a href="https://attest.ink" target="_blank" style="display: inline-block; text-decoration: none;" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>`;
            break;
        case 'image':
            modalHtmlCode.textContent = `<!-- For images with badge overlay -->
<div style="position: relative; display: inline-block;">
  <img src="your-image-url.jpg" alt="Your image description" style="max-width: 100%;">
  <a href="https://attest.ink" target="_blank" style="position: absolute; bottom: 10px; right: 10px;" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>

<!-- For images with badge underneath -->
<figure style="margin: 0;">
  <img src="your-image-url.jpg" alt="Your image description" style="max-width: 100%;">
  <figcaption style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
    <span>Your image caption</span>
    <a href="https://attest.ink" target="_blank" rel="noopener">
      <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
    </a>
  </figcaption>
</figure>`;
            break;
        case 'video':
            modalHtmlCode.textContent = `<!-- For YouTube videos with badge overlay -->
<div style="position: relative;">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/2kigO0bR16Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <a href="https://attest.ink" target="_blank" style="position: absolute; bottom: 10px; right: 10px;" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>

<!-- For videos with badge underneath -->
<div>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/2kigO0bR16Y" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
    <span>Your video title or description</span>
    <a href="https://attest.ink" target="_blank" rel="noopener">
      <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
    </a>
  </div>
</div>`;
            break;
        case 'pdf':
            modalHtmlCode.textContent = `<!-- For PDF embedded in website -->
<div style="position: relative;">
  <embed src="your-document.pdf" type="application/pdf" width="100%" height="600px">
  <a href="https://attest.ink" target="_blank" style="position: absolute; bottom: 10px; right: 10px;" rel="noopener">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30" style="border: 0;">
  </a>
</div>

<!-- For adding to PDFs directly -->
<!-- When creating your PDF, add this image to your header or footer template -->
<img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">`;
            break;
        default:
            modalHtmlCode.textContent = `<!-- Add this badge to your content -->
<a href="https://attest.ink" target="_blank" class="badge-link" rel="noopener">
  <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" width="120" height="30">
  <span class="badge-tooltip">${badgeTooltips[badgeType]}</span>
</a>`;
    }
    
    // Update Markdown example
    switch(exampleType) {
        case 'blog':
            modalMarkdownCode.textContent = `# Your Blog Post Title

Your blog post content here...

## Section Heading

More content...

---

[![${badgeNames[badgeType]}](https://attest.ink/assets/badges/${badgeType}-generated.svg)](https://attest.ink "${badgeTooltips[badgeType]}")`;
            break;
        case 'text':
            modalMarkdownCode.textContent = `# Your Document Title

Your document content here...

---

[![${badgeNames[badgeType]}](https://attest.ink/assets/badges/${badgeType}-generated.svg)](https://attest.ink "${badgeTooltips[badgeType]}")`;
            break;
        case 'image':
            modalMarkdownCode.textContent = `![Your image description](your-image-url.jpg)

[![${badgeNames[badgeType]}](https://attest.ink/assets/badges/${badgeType}-generated.svg)](https://attest.ink "${badgeTooltips[badgeType]}")`;
            break;
        default:
            modalMarkdownCode.textContent = `[![${badgeNames[badgeType]}](https://attest.ink/assets/badges/${badgeType}-generated.svg)](https://attest.ink "${badgeTooltips[badgeType]}")`;
    }
    
    // Update JavaScript example
    switch(exampleType) {
        case 'blog':
            modalJavascriptCode.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add badge to your blog post
  AttestInk.addBadge('${badgeType}', '.blog-post', {
    position: 'bottom-right',
    linkToAttestInk: true,
    showTooltip: true
  });
  
  // Or add as a footer badge
  AttestInk.addFooterBadge('${badgeType}', '.blog-post', {
    linkToAttestInk: true,
    customText: 'This blog post was created with ${badgeType === 'human' ? 'human creativity' : 'AI assistance'}'
  });
<\/script>`;
            break;
        case 'image':
            modalJavascriptCode.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add badge overlay to your image
  AttestInk.addBadge('${badgeType}', '.image-container', {
    position: 'bottom-right',
    linkToAttestInk: true,
    showTooltip: true,
    tooltip: '${badgeTooltips[badgeType]}'
  });
<\/script>`;
            break;
        case 'video':
            modalJavascriptCode.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add badge overlay to your video
  AttestInk.addBadge('${badgeType}', '.video-container', {
    position: 'bottom-right',
    linkToAttestInk: true,
    showTooltip: true,
    tooltip: '${badgeTooltips[badgeType]}'
  });
<\/script>`;
            break;
        case 'pdf':
            modalJavascriptCode.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add badge to your PDF viewer
  AttestInk.addBadge('${badgeType}', '.pdf-container', {
    position: 'bottom-right',
    linkToAttestInk: true,
    showTooltip: true
  });
<\/script>`;
            break;
        default:
            modalJavascriptCode.textContent = `<script src="https://attest.ink/js/attest.js"><\/script>
<script>
  // Add badge to your content
  AttestInk.addBadge('${badgeType}', '#your-content', {
    position: 'bottom-right',
    linkToAttestInk: true,
    showTooltip: true,
    tooltip: '${badgeTooltips[badgeType]}'
  });
<\/script>`;
    }
}