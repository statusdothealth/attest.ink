/**
 * attest.ink - Enhanced File Upload JavaScript
 * Handles content upload and footer badge application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize file upload
    initializeFileUpload();
    
    // Initialize apply badge button
    initializeApplyBadge();
    
    // Initialize share functionality
    initializeShareFunctionality();
});

// Initialize file upload functionality
function initializeFileUpload() {
    const fileInput = document.getElementById('content-file');
    const fileLabel = document.querySelector('.file-label');
    const fileZone = document.querySelector('.file-upload-zone');
    const textArea = document.getElementById('content-text');
    const previewContainer = document.getElementById('preview-content');
    const userContentPreview = document.getElementById('user-content-preview');
    
    if (!fileInput || !fileZone || !textArea || !previewContainer || !userContentPreview) {
        console.error("Missing required upload elements.");
        return;
    }
    
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
        }
    });
    
    // Function to handle file upload
    function handleFileUpload(file) {
        // Clear text area when uploading a file
        textArea.value = '';
        
        // Show preview depending on file type
        if (file.type.startsWith('image/')) {
            displayImagePreview(file);
        } else {
            readFileContent(file);
        }
    }
    
    // Function to display image preview
    function displayImagePreview(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Update preview container
            previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview of ${file.name}">`;
            
            // Show preview container
            userContentPreview.style.display = 'block';
            
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
            displayTextPreview(e.target.result);
        };
        
        reader.readAsText(file);
    }
    
    // Function to display text preview
    function displayTextPreview(text) {
        // Update preview container
        previewContainer.innerHTML = `<div class="text-preview">${text}</div>`;
        
        // Show preview container
        userContentPreview.style.display = 'block';
        
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
    const shareModal = document.getElementById('share-modal');
    
    if (!applyBadgeBtn || !previewContainer) {
        console.error("Missing apply badge elements.");
        return;
    }
    
    applyBadgeBtn.addEventListener('click', function() {
        // Check if there's content to add a badge to
        if (previewContainer.querySelector('img') || previewContainer.querySelector('.text-preview')) {
            console.log("Content found, applying badge...");
            
            // Get selected badge type
            const selectedBadge = document.querySelector('input[name="badge-type"]:checked');
            
            if (!selectedBadge) {
                console.error("No badge type selected");
                return;
            }
            
            const badgeType = selectedBadge.value;
            console.log("Selected badge type:", badgeType);
            
            // Remove any existing badge first
            try {
                AttestInk.removeBadge('#preview-content');
            } catch (err) {
                console.warn("Error removing existing badge:", err);
            }
            
            // Add footer badge to the content
            try {
                AttestInk.addFooterBadge(badgeType, '#preview-content', {
                    includeLink: true,
                    downloadable: true
                });
                
                console.log("Badge applied successfully");
                
                // Animate preview to highlight the change
                previewContainer.style.transition = 'all 0.3s ease';
                previewContainer.style.boxShadow = '0 0 0 2px var(--primary)';
                
                setTimeout(() => {
                    previewContainer.style.boxShadow = '';
                }, 1000);
                
                // Open share modal
                setTimeout(() => {
                    openShareModal(badgeType);
                }, 1000);
                
            } catch (error) {
                console.error("Error applying badge:", error);
                alert("Failed to apply badge. Please try again.");
            }
        } else {
            alert("Please upload or paste some content first.");
        }
    });
}

// Function to open share modal
function openShareModal(badgeType) {
    const shareModal = document.getElementById('share-modal');
    const embedCode = document.getElementById('embed-code');
    
    if (!shareModal || !embedCode) {
        console.error("Share modal elements not found.");
        return;
    }
    
    // Update download button with proper badge type
    const downloadBtn = document.getElementById('download-button');
    if (downloadBtn) {
        downloadBtn.setAttribute('data-badge-type', badgeType);
    }
    
    // Set embed code based on badge type
    embedCode.value = `<div style="position: relative;">
    <!-- Your content here -->
    <div class="attest-footer-badge ${badgeType}">
        <div class="attest-badge-icon">
            <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${getBadgeTypeName(badgeType)}">
        </div>
        <div class="attest-badge-text">
            <div class="attest-badge-title">${getBadgeTypeName(badgeType)}</div>
            <div class="attest-badge-description">This content was created with ${getBadgeTypeDescription(badgeType)}</div>
        </div>
        <a href="https://attest.ink" class="attest-badge-link" target="_blank">attest.ink</a>
    </div>
</div>

<!-- Include attest.ink styles -->
<link rel="stylesheet" href="https://attest.ink/css/badge-styles.css">`;
    
    // Open modal
    shareModal.classList.add('active');
}

// Initialize share functionality
function initializeShareFunctionality() {
    const shareModal = document.getElementById('share-modal');
    
    if (!shareModal) {
        console.error("Share modal not found.");
        return;
    }
    
    const closeBtn = shareModal.querySelector('.close-modal');
    const copyLinkBtn = document.getElementById('copy-link-button');
    const copyEmbedBtn = document.getElementById('copy-embed-button');
    const downloadBtn = document.getElementById('download-button');
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeShareModal();
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === shareModal) {
            closeShareModal();
        }
    });
    
    // Copy link functionality
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const shareLink = document.getElementById('share-link');
            if (!shareLink) return;
            
            shareLink.select();
            document.execCommand('copy');
            
            showCopyFeedback(copyLinkBtn);
        });
    }
    
    // Copy embed code functionality
    if (copyEmbedBtn) {
        copyEmbedBtn.addEventListener('click', () => {
            const embedCode = document.getElementById('embed-code');
            if (!embedCode) return;
            
            embedCode.select();
            document.execCommand('copy');
            
            showCopyFeedback(copyEmbedBtn);
        });
    }
    
    // Download functionality
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const badgeType = downloadBtn.getAttribute('data-badge-type') || 'human';
            const previewContent = document.getElementById('preview-content');
            
            if (!previewContent) {
                alert("No content to download.");
                return;
            }
            
            try {
                AttestInk.createDownloadable(badgeType, '#preview-content', {
                    fileName: 'content-with-attribution',
                    fileType: 'html'
                });
                
                downloadBtn.textContent = 'Downloaded!';
                downloadBtn.style.backgroundColor = '#4caf50';
                downloadBtn.style.borderColor = '#45a049';
                
                setTimeout(() => {
                    downloadBtn.textContent = 'Download';
                    downloadBtn.style.backgroundColor = '';
                    downloadBtn.style.borderColor = '';
                }, 2000);
            } catch (error) {
                console.error("Error creating downloadable:", error);
                alert("Failed to create downloadable content. Please try again.");
            }
        });
    }
    
    // Function to close share modal
    function closeShareModal() {
        const modalContent = shareModal.querySelector('.modal-content');
        
        // Animate closing
        if (modalContent) {
            modalContent.style.animation = 'modalZoomOut 0.2s forwards';
        }
        shareModal.style.opacity = '0';
        
        // Remove active class after animation
        setTimeout(() => {
            shareModal.classList.remove('active');
            if (modalContent) {
                modalContent.style.animation = '';
            }
        }, 200);
    }
    
    // Function to show copy feedback
    function showCopyFeedback(button) {
        const originalText = button.textContent;
        
        button.textContent = 'Copied!';
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

// Helper function to get badge type name
function getBadgeTypeName(badgeType) {
    const badgeNames = {
        'human': 'Human Generated Content',
        'ai': 'AI Generated Content',
        'claude': 'Claude AI Generated Content',
        'chatgpt': 'ChatGPT Generated Content',
        'gemini': 'Gemini Generated Content',
        'midjourney': 'Midjourney Generated Content',
        'dalle': 'DALL-E Generated Content'
    };
    
    return badgeNames[badgeType] || 'AI Generated Content';
}

// Helper function to get badge type description
function getBadgeTypeDescription(badgeType) {
    const badgeDescriptions = {
        'human': 'human creativity and effort',
        'ai': 'artificial intelligence assistance',
        'claude': 'Anthropic\'s Claude AI assistant',
        'chatgpt': 'OpenAI\'s ChatGPT',
        'gemini': 'Google\'s Gemini AI',
        'midjourney': 'Midjourney\'s AI',
        'dalle': 'OpenAI\'s DALL-E'
    };
    
    return badgeDescriptions[badgeType] || 'AI assistance';
}