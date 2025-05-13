/**
 * attest.ink - File Upload JavaScript
 * Handles content upload and badge application functionality
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
    
    applyBadgeBtn.addEventListener('click', function() {
        // Check if there's content to add a badge to
        if (previewContainer.querySelector('img') || previewContainer.querySelector('.text-preview')) {
            // Get selected badge type
            const selectedBadge = document.querySelector('input[name="badge-type"]:checked').value;
            
            // Add badge to the content
            AttestInk.removeBadge('#preview-content');
            AttestInk.addBadge(selectedBadge, '#preview-content', {
                position: 'top-right',
                size: 'large',
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
            
            // Open share modal
            setTimeout(() => {
                openShareModal(selectedBadge);
            }, 1000);
        }
    });
}

// Function to open share modal
function openShareModal(badgeType) {
    const shareModal = document.getElementById('share-modal');
    const embedCode = document.getElementById('embed-code');
    
    // Set embed code based on badge type
    embedCode.value = `<div style="position: relative;">
    <!-- Your content here -->
    <img src="https://attest.ink/assets/badges/${badgeType}-generated.svg" alt="${getBadgeTypeName(badgeType)}" style="position: absolute; top: -15px; right: 10px; height: 36px;">
</div>`;
    
    // Open modal
    shareModal.classList.add('active');
}

// Initialize share functionality
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
    
    // Download functionality
    downloadBtn.addEventListener('click', () => {
        // In a real implementation, this would capture the content with badge
        // For this demo, we'll just show feedback
        downloadBtn.textContent = 'Downloaded!';
        downloadBtn.style.backgroundColor = '#4caf50';
        downloadBtn.style.borderColor = '#45a049';
        
        setTimeout(() => {
            downloadBtn.textContent = 'Download';
            downloadBtn.style.backgroundColor = '';
            downloadBtn.style.borderColor = '';
        }, 2000);
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
        'human': 'Human Generated',
        'ai': 'AI Generated',
        'claude': 'Claude AI Generated',
        'chatgpt': 'ChatGPT Generated',
        'gemini': 'Gemini Generated',
        'midjourney': 'Midjourney Generated',
        'dalle': 'DALL-E Generated'
    };
    
    return badgeNames[badgeType] || 'AI Generated';
}