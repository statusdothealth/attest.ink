/**
 * attest.ink - Enhanced File Upload and Processing
 * Handles content upload and badge application for various file types
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize file upload
    initializeFileUpload();
    
    // Initialize apply badge button
    initializeApplyBadge();
    
    // Initialize share functionality
    initializeShareFunctionality();
    
    // Initialize export options
    initializeExportOptions();
});

// Initialize file upload functionality with enhanced file type support
function initializeFileUpload() {
    const fileInput = document.getElementById('content-file');
    const fileLabel = document.querySelector('.file-label');
    const fileZone = document.querySelector('.file-upload-zone');
    const textArea = document.getElementById('content-text');
    const previewContainer = document.getElementById('preview-content');
    const userContentPreview = document.getElementById('user-content-preview');
    const fileTypeIndicator = document.getElementById('file-type-indicator');
    
    // Handle drag over event
    fileZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        fileZone.classList.add('active');
    });
    
    // Handle drag leave event
    fileZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        fileZone.classList.remove('active');
    });
    
    // Handle drop event
    fileZone.addEventListener('drop', function(e) {
        e.preventDefault();
        fileZone.classList.remove('active');
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
    
    // Handle file input change
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length) {
            handleFileUpload(fileInput.files[0]);
        }
    });
    
    // Handle text input
    textArea.addEventListener('input', function() {
        if (textArea.value.trim()) {
            displayTextPreview(textArea.value);
            updateFileTypeIndicator('text');
        }
    });
    
    // Function to handle file upload with extended file type support
    function handleFileUpload(file) {
        // Clear text area when uploading a file
        textArea.value = '';
        
        // Determine file type and display appropriate preview
        const fileType = file.type.split('/')[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        updateFileTypeIndicator(fileType, fileExtension);
        
        // Show preview based on file type
        if (fileType === 'image') {
            displayImagePreview(file);
        } else if (fileType === 'video') {
            displayVideoPreview(file);
        } else if (fileType === 'audio') {
            displayAudioPreview(file);
        } else if (fileExtension === 'pdf') {
            displayPDFPreview(file);
        } else {
            // For text and other file types
            readFileContent(file);
        }
    }
    
    // Update file type indicator to show appropriate badge options
    function updateFileTypeIndicator(fileType, fileExtension = '') {
        if (fileTypeIndicator) {
            let typeText = 'Text';
            
            if (fileType === 'image') {
                typeText = 'Image';
            } else if (fileType === 'video') {
                typeText = 'Video';
            } else if (fileType === 'audio') {
                typeText = 'Audio';
            } else if (fileExtension === 'pdf') {
                typeText = 'PDF Document';
            } else if (fileExtension === 'doc' || fileExtension === 'docx') {
                typeText = 'Word Document';
            }
            
            fileTypeIndicator.textContent = `Content Type: ${typeText}`;
            fileTypeIndicator.style.display = 'block';
            
            // Update export options based on file type
            updateExportOptions(fileType, fileExtension);
        }
    }
    
    // Function to display image preview
    function displayImagePreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Update preview container
            previewContainer.innerHTML = `
                <div class="image-container">
                    <img src="${e.target.result}" alt="Preview of ${file.name}">
                </div>`;
            
            // Show preview container
            userContentPreview.style.display = 'block';
            
            // Update export options
            updateExportOptions('image');
            
            // Scroll to preview
            setTimeout(() => {
                userContentPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        };
        
        reader.readAsDataURL(file);
    }
    
    // Function to display video preview
    function displayVideoPreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Update preview container
            previewContainer.innerHTML = `
                <div class="video-container">
                    <video controls>
                        <source src="${e.target.result}" type="${file.type}">
                        Your browser does not support the video tag.
                    </video>
                </div>`;
            
            // Show preview container
            userContentPreview.style.display = 'block';
            
            // Update export options
            updateExportOptions('video');
            
            // Scroll to preview
            setTimeout(() => {
                userContentPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        };
        
        reader.readAsDataURL(file);
    }
    
    // Function to display audio preview
    function displayAudioPreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Update preview container
            previewContainer.innerHTML = `
                <div class="audio-container">
                    <audio controls>
                        <source src="${e.target.result}" type="${file.type}">
                        Your browser does not support the audio tag.
                    </audio>
                    <div class="audio-info">${file.name}</div>
                </div>`;
            
            // Show preview container
            userContentPreview.style.display = 'block';
            
            // Update export options
            updateExportOptions('audio');
            
            // Scroll to preview
            setTimeout(() => {
                userContentPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        };
        
        reader.readAsDataURL(file);
    }
    
    // Function to display PDF preview
    function displayPDFPreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Update preview container
            previewContainer.innerHTML = `
                <div class="pdf-container">
                    <embed src="${e.target.result}" type="application/pdf" width="100%" height="400px">
                    <div class="pdf-info">${file.name}</div>
                </div>`;
            
            // Show preview container
            userContentPreview.style.display = 'block';
            
            // Update export options
            updateExportOptions('pdf');
            
            // Scroll to preview
            setTimeout(() => {
                userContentPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        };
        
        reader.readAsDataURL(file);
    }
    
    // Function to read and display text file content
    function readFileContent(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            displayTextPreview(e.target.result, file.name);
        };
        
        reader.readAsText(file);
    }
    
    // Function to display text preview
    function displayTextPreview(text, filename = '') {
        // Update preview container
        previewContainer.innerHTML = `
            <div class="text-preview">
                ${filename ? `<div class="file-name">${filename}</div>` : ''}
                <div class="text-content">${text}</div>
            </div>`;
        
        // Show preview container
        userContentPreview.style.display = 'block';
        
        // Update export options
        updateExportOptions('text');
        
        // Scroll to preview
        setTimeout(() => {
            userContentPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Initialize apply badge button functionality
function initializeApplyBadge() {
    const applyBadgeBtn = document.getElementById('apply-badge');
    const previewContainer = document.getElementById('preview-content');
    
    applyBadgeBtn.addEventListener('click', function() {
        // Check if there's content to add a badge to
        if (previewContainer.querySelector('img') || 
            previewContainer.querySelector('.text-preview') ||
            previewContainer.querySelector('.video-container') ||
            previewContainer.querySelector('.audio-container') ||
            previewContainer.querySelector('.pdf-container')) {
            
            // Get selected badge type
            const selectedBadge = document.querySelector('input[name="badge-type"]:checked').value;
            
            // Get position option
            const selectedPosition = document.querySelector('select[name="badge-position"]').value;
            
            // Get size option
            const selectedSize = document.querySelector('select[name="badge-size"]').value;
            
            // Add badge to the content
            AttestInk.removeBadge('#preview-content');
            AttestInk.addBadge(selectedBadge, '#preview-content', {
                position: selectedPosition,
                size: selectedSize,
                style: 'prominent'
            });
            
            // Add pulse animation to badge
            const badge = previewContainer.querySelector('.attest-badge-container');
            if (badge) {
                badge.style.animation = 'pulseGlow 2s ease-in-out';
                
                setTimeout(() => {
                    badge.style.animation = '';
                }, 2000);
            }
            
            // Enable export options
            document.querySelectorAll('.export-option button').forEach(button => {
                button.disabled = false;
            });
            
            // Open share modal
            setTimeout(() => {
                openShareModal(selectedBadge, selectedPosition, selectedSize);
            }, 1000);
        }
    });
}

// Function to open share modal with enhanced export options
function openShareModal(badgeType, position, size) {
    const shareModal = document.getElementById('share-modal');
    const embedCode = document.getElementById('embed-code');
    const downloadLink = document.getElementById('download-link');
    const shareLink = document.getElementById('share-link');
    
    // Set share link (in a real implementation, this would be a unique link)
    shareLink.value = `https://attest.ink/share/${generateUniqueID()}`;
    
    // Set embed code based on badge type and content type
    const contentType = getContentType();
    
    if (contentType === 'image' || contentType === 'text') {
        embedCode.value = generateEmbedCode(badgeType, position, size, contentType);
    } else {
        embedCode.value = generateEmbedCode(badgeType, 'bottom-right', 'medium', contentType);
    }
    
    // Open modal
    shareModal.classList.add('active');
    
    // Update download options
    updateDownloadOptions(badgeType, position, size);
}

// Generate unique ID for share links
function generateUniqueID() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Get content type from current preview
function getContentType() {
    const previewContainer = document.getElementById('preview-content');
    
    if (previewContainer.querySelector('img')) {
        return 'image';
    } else if (previewContainer.querySelector('video')) {
        return 'video';
    } else if (previewContainer.querySelector('audio')) {
        return 'audio';
    } else if (previewContainer.querySelector('.pdf-container')) {
        return 'pdf';
    } else {
        return 'text';
    }
}

// Generate appropriate embed code based on content type
function generateEmbedCode(badgeType, position, size, contentType) {
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    const posMap = {
        'top-right': { top: '-15px', right: '10px' },
        'top-left': { top: '-15px', left: '10px' },
        'bottom-right': { bottom: '-15px', right: '10px' },
        'bottom-left': { bottom: '-15px', left: '10px' },
        'center-top': { top: '-15px', left: '50%', transform: 'translateX(-50%)' },
        'center-bottom': { bottom: '-15px', left: '50%', transform: 'translateX(-50%)' }
    };
    
    const sizeMap = {
        'small': '24px',
        'medium': '36px',
        'large': '48px'
    };
    
    const pos = posMap[position] || posMap['bottom-right'];
    const posStyle = Object.entries(pos).map(([key, value]) => `${key}: ${value};`).join(' ');
    const heightValue = sizeMap[size] || sizeMap['medium'];
    
    // HTML embed code
    if (contentType === 'image') {
        return `<div style="position: relative;">
    <!-- Your image here -->
    <img src="your-image-url.jpg" alt="Your content" style="max-width: 100%;">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
    } else if (contentType === 'video') {
        return `<div style="position: relative;">
    <!-- Your video here -->
    <video controls style="max-width: 100%;">
        <source src="your-video-url.mp4" type="video/mp4">
    </video>
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
    } else if (contentType === 'audio') {
        return `<div style="position: relative;">
    <!-- Your audio here -->
    <audio controls style="width: 100%;">
        <source src="your-audio-url.mp3" type="audio/mpeg">
    </audio>
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
    } else if (contentType === 'pdf') {
        return `<div style="position: relative;">
    <!-- Your PDF embed here -->
    <embed src="your-pdf-url.pdf" type="application/pdf" width="100%" height="600px">
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
    } else {
        // Text content
        return `<div style="position: relative; padding-bottom: 40px;">
    <!-- Your text content here -->
    <p>Your text content goes here...</p>
    
    <!-- Attribution badge -->
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${badgeNames[badgeType]}" style="position: absolute; ${posStyle} height: ${heightValue}; z-index: 10;">
</div>`;
    }
}

// Initialize share functionality with enhanced export options
function initializeShareFunctionality() {
    const shareModal = document.getElementById('share-modal');
    const closeBtn = shareModal.querySelector('.close-modal');
    const copyLinkBtn = document.getElementById('copy-link-button');
    const copyEmbedBtn = document.getElementById('copy-embed-button');
    const downloadBtn = document.getElementById('download-button');
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        closeShareModal();
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            closeShareModal();
        }
    });
    
    // Copy link functionality
    copyLinkBtn.addEventListener('click', () => {
        const shareLink = document.getElementById('share-link');
        shareLink.select();
        document.execCommand('copy');
        
        showCopyFeedback(copyLinkBtn);
    });
    
    // Copy embed code functionality
    copyEmbedBtn.addEventListener('click', () => {
        const embedCode = document.getElementById('embed-code');
        embedCode.select();
        document.execCommand('copy');
        
        showCopyFeedback(copyEmbedBtn);
    });
    
    // Download functionality with actual file generation
    downloadBtn.addEventListener('click', () => {
        const contentType = getContentType();
        const badgeType = document.querySelector('input[name="badge-type"]:checked').value;
        
        downloadWithBadge(contentType, badgeType);
        
        // Show feedback
        showCopyFeedback(downloadBtn, 'Downloaded!');
    });
    
    // Function to close share modal
    function closeShareModal() {
        const modalContent = shareModal.querySelector('.modal-content');
        
        // Animate closing
        modalContent.style.animation = 'modalZoomOut 0.2s forwards';
        shareModal.style.opacity = '0';
        
        // Remove active class after animation
        setTimeout(() => {
            shareModal.classList.remove('active');
            modalContent.style.animation = '';
        }, 200);
    }
    
    // Function to show copy feedback
    function showCopyFeedback(button, message = 'Copied!') {
        const originalText = button.textContent;
        
        button.textContent = message;
        button.style.backgroundColor = '#4caf50';
        button.style.borderColor = '#45a049';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.borderColor = '';
            button.style.color = '';
        }, 2000);
    }
}

// Initialize export options
function initializeExportOptions() {
    const exportBtns = document.querySelectorAll('.export-option button');
    const previewContainer = document.getElementById('preview-content');
    
    exportBtns.forEach(button => {
        button.addEventListener('click', () => {
            const format = button.dataset.format;
            const badgeType = document.querySelector('input[name="badge-type"]:checked').value;
            
            // Check if there's content with a badge to export
            if (previewContainer.querySelector('.attest-badge-container')) {
                exportContent(format, badgeType);
                
                // Show feedback
                const originalText = button.textContent;
                button.textContent = 'Exported!';
                button.style.backgroundColor = '#4caf50';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.style.color = '';
                }, 2000);
            }
        });
    });
}

// Update export options based on file type
function updateExportOptions(fileType, fileExtension = '') {
    const htmlOption = document.getElementById('export-html');
    const markdownOption = document.getElementById('export-markdown');
    const textOption = document.getElementById('export-text');
    const imageOption = document.getElementById('export-image');
    
    // Reset all options
    if (htmlOption) htmlOption.style.display = 'block';
    if (markdownOption) markdownOption.style.display = 'block';
    if (textOption) textOption.style.display = 'block';
    if (imageOption) imageOption.style.display = 'block';
    
    // Show/hide options based on file type
    if (fileType === 'image') {
        if (textOption) textOption.style.display = 'none';
    } else if (fileType === 'video' || fileType === 'audio' || fileExtension === 'pdf') {
        if (markdownOption) markdownOption.style.display = 'none';
        if (textOption) textOption.style.display = 'none';
    }
}

// Export content with badge in the selected format
function exportContent(format, badgeType) {
    const contentType = getContentType();
    const previewContainer = document.getElementById('preview-content');
    const badgePosition = document.querySelector('select[name="badge-position"]').value;
    const badgeSize = document.querySelector('select[name="badge-size"]').value;
    
    // Get badge info
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    // Create appropriate export content
    let exportContent = '';
    let filename = `content-with-${badgeType}-badge`;
    
    if (format === 'html') {
        exportContent = generateHtmlExport(contentType, badgeType, badgePosition, badgeSize);
        filename += '.html';
    } else if (format === 'markdown') {
        exportContent = generateMarkdownExport(contentType, badgeType);
        filename += '.md';
    } else if (format === 'text') {
        exportContent = generateTextExport(contentType, badgeType);
        filename += '.txt';
    } else if (format === 'image') {
        // For image export, we'd ideally generate an actual image with the badge
        // But for this implementation, we'll create a placeholder
        // In a real implementation, you would use canvas to merge the content and badge
        exportContent = generateHtmlExport(contentType, badgeType, badgePosition, badgeSize);
        filename += '.html';
    }
    
    // Trigger download
    downloadFile(exportContent, filename);
}

// Generate HTML export format
function generateHtmlExport(contentType, badgeType, position, size) {
    const badgeURL = `https://attest.ink/assets/badges/${badgeType}-generated.svg`;
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    // Get content from preview
    let contentHTML = '';
    const previewContainer = document.getElementById('preview-content');
    
    if (contentType === 'text') {
        const textContent = previewContainer.querySelector('.text-content').textContent;
        contentHTML = `<div class="content">${textContent.split('\n').map(line => `<p>${line}</p>`).join('')}</div>`;
    } else if (contentType === 'image') {
        const imageSrc = previewContainer.querySelector('img').src;
        contentHTML = `<img src="${imageSrc}" alt="Content" style="max-width: 100%;">`;
    } else if (contentType === 'video') {
        const videoSrc = previewContainer.querySelector('video source').src;
        const videoType = previewContainer.querySelector('video source').type;
        contentHTML = `
        <video controls style="max-width: 100%;">
            <source src="${videoSrc}" type="${videoType}">
            Your browser does not support the video tag.
        </video>`;
    } else if (contentType === 'audio') {
        const audioSrc = previewContainer.querySelector('audio source').src;
        const audioType = previewContainer.querySelector('audio source').type;
        contentHTML = `
        <audio controls style="width: 100%;">
            <source src="${audioSrc}" type="${audioType}">
            Your browser does not support the audio tag.
        </audio>`;
    } else if (contentType === 'pdf') {
        const pdfSrc = previewContainer.querySelector('embed').src;
        contentHTML = `<embed src="${pdfSrc}" type="application/pdf" width="100%" height="600px">`;
    }
    
    // Generate HTML with badge
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Content with ${badgeNames[badgeType]} Badge</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .content-container {
            position: relative;
            margin-bottom: 40px;
        }
        .badge-container {
            position: absolute;
            ${getPositionCSS(position, size)}
            z-index: 10;
        }
        .badge-container img {
            height: ${getSizeValue(size)};
        }
        .content img, .content video, .content audio, .content embed {
            max-width: 100%;
        }
        .attribution-footer {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 15px;
            font-size: 0.9rem;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="content-container">
        ${contentHTML}
        <div class="badge-container">
            <img src="${badgeURL}" alt="${badgeNames[badgeType]}">
        </div>
    </div>
    
    <div class="attribution-footer">
        <p>This content was created with ${badgeNames[badgeType]} assistance. Attribution provided by <a href="https://attest.ink" target="_blank">attest.ink</a>.</p>
    </div>
</body>
</html>`;
}

// Generate Markdown export format
function generateMarkdownExport(contentType, badgeType) {
    const badgeURL = `https://attest.ink/assets/badges/${badgeType}-generated.svg`;
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    // Get content from preview
    let contentMarkdown = '';
    const previewContainer = document.getElementById('preview-content');
    
    if (contentType === 'text') {
        const textContent = previewContainer.querySelector('.text-content').textContent;
        contentMarkdown = textContent;
    } else if (contentType === 'image') {
        const imageSrc = previewContainer.querySelector('img').src;
        contentMarkdown = `![Content](${imageSrc})`;
    }
    
    // Generate Markdown with badge
    return `# Content with ${badgeNames[badgeType]} Badge

${contentMarkdown}

---

![${badgeNames[badgeType]}](${badgeURL})

*This content was created with ${badgeNames[badgeType]} assistance. Attribution provided by [attest.ink](https://attest.ink).*
`;
}

// Generate Text export format
function generateTextExport(contentType, badgeType) {
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    // Get content from preview
    let contentText = '';
    const previewContainer = document.getElementById('preview-content');
    
    if (contentType === 'text') {
        contentText = previewContainer.querySelector('.text-content').textContent;
    }
    
    // Generate Text with badge attribution
    return `${contentText}

--------------------------------------------------
This content was created with ${badgeNames[badgeType]} assistance.
Attribution provided by attest.ink (https://attest.ink)
`;
}

// Download file with attribution badge
function downloadWithBadge(contentType, badgeType) {
    const position = document.querySelector('select[name="badge-position"]').value;
    const size = document.querySelector('select[name="badge-size"]').value;
    
    // Generate appropriate export format based on content type
    let exportContent = '';
    let filename = `content-with-${badgeType}-badge`;
    
    // For this implementation, we'll use HTML for all types
    // In a real implementation, you would use appropriate formats for each type
    exportContent = generateHtmlExport(contentType, badgeType, position, size);
    filename += '.html';
    
    // Trigger download
    downloadFile(exportContent, filename);
}

// Helper function to get position CSS
function getPositionCSS(position, size) {
    const posMap = {
        'top-right': { top: '-15px', right: '10px' },
        'top-left': { top: '-15px', left: '10px' },
        'bottom-right': { bottom: '-15px', right: '10px' },
        'bottom-left': { bottom: '-15px', left: '10px' },
        'center-top': { top: '-15px', left: '50%', transform: 'translateX(-50%)' },
        'center-bottom': { bottom: '-15px', left: '50%', transform: 'translateX(-50%)' }
    };
    
    const pos = posMap[position] || posMap['bottom-right'];
    return Object.entries(pos).map(([key, value]) => `${key}: ${value};`).join(' ');
}

// Helper function to get size value
function getSizeValue(size) {
    const sizeMap = {
        'small': '24px',
        'medium': '36px',
        'large': '48px'
    };
    
    return sizeMap[size] || sizeMap['medium'];
}

// Helper function to download file
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

// Helper function to get badge type name
function getBadgeTypeName(badgeType) {
    const badgeNames = {
        'human': 'Human Generated',
        'ai': 'AI Assisted',
        'claude': 'Claude AI Assisted',
        'chatgpt': 'ChatGPT Assisted',
        'gemini': 'Gemini Assisted',
        'midjourney': 'Midjourney Assisted',
        'dalle': 'DALL-E Assisted'
    };
    
    return badgeNames[badgeType] || 'AI Assisted';
}