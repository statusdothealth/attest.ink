// attestation-result.js - Logic for displaying attestation results

function generateAttestationDisplay(attestation) {
    const badgePreview = document.getElementById('badge-preview');
    const embedCodeEl = document.getElementById('badge-embed-code');
    const linkCodeEl = document.getElementById('badge-link-code');
    const dataUrlEl = document.getElementById('badge-data-url');
    const latexSection = document.getElementById('latex-section');
    const markdownSection = document.getElementById('markdown-section');
    
    // Get badge style from attestation metadata or default
    const badgeStyle = attestation.badge_style || 'default';
    
    // Create short URL using just the ID
    const shortVerifyUrl = `https://attest.ink/verify/?id=${attestation.id}`;
    
    // Also create the full data URL for embedding (self-contained)
    const attestationB64 = btoa(JSON.stringify(attestation));
    const fullDataUrl = `https://attest.ink/verify/?data=${attestationB64}`;
    
    // Handle LaTeX style
    if (badgeStyle === 'latex') {
        latexSection.style.display = 'block';
        badgePreview.innerHTML = '<div style="font-family: monospace; background: var(--bg-panel); padding: 10px; border: 1px solid var(--border-color); color: var(--text-primary);">LaTeX Badge (see code below)</div>';
        
        // Basic LaTeX code
        const roleDisplay = attestation.role === 'edited' ? 'AI-ASSISTED' : attestation.role.toUpperCase().replace('_', '-');
        const latexCode = `% AI Attestation
\\section{AI Attestation}
\\begin{center}
\\fbox{\\small\\texttt{${roleDisplay}}}
\\end{center}

\\noindent Verification URL: \\url{${shortVerifyUrl}}`;
        
        // Extended LaTeX with footnote
        const latexExtended = `% AI Attestation
\\section{AI Attestation}
\\begin{center}
\\fbox{\\small\\texttt{${roleDisplay}}}
\\end{center}

\\noindent Verification URL: \\url{${shortVerifyUrl}}

The ${attestation.role === 'generated' ? 'generation of content' : attestation.role === 'assisted' ? 'development and refinement' : 'editing'} in this work was ${attestation.role === 'generated' ? 'performed' : 'assisted'} using ${attestation.model}. What began as an experiment to explore the boundaries of AI-${attestation.role} research evolved into a fully-realized work. These tools served a role similar to LaTeX for typesetting or computational systems for verification, enabling more rigorous expression and validation of ideas. All core concepts, insights, and creative decisions are original human work.\\footnote{For detailed AI tool attribution and transparency, see \\url{${shortVerifyUrl}}.}`;
        
        document.getElementById('latex-code').textContent = latexCode;
        document.getElementById('latex-extended').textContent = latexExtended;
        
        // Show link section for LaTeX too
        document.getElementById('embed-section').style.display = 'none';
        document.getElementById('link-section').style.display = 'block';
        markdownSection.style.display = 'none';
    } else if (badgeStyle === 'markdown') {
        // Handle markdown style
        markdownSection.style.display = 'block';
        latexSection.style.display = 'none';
        document.getElementById('embed-section').style.display = 'none';
        document.getElementById('link-section').style.display = 'block';
        
        const roleText = attestation.role === 'generated' ? 'AI Generated' : 
                        attestation.role === 'assisted' ? 'AI Assisted' : 
                        attestation.role === 'edited' ? 'AI Edited' : 'AI Involved';
        
        const markdownCode = `[![${roleText}](https://img.shields.io/badge/AI-${encodeURIComponent(roleText.replace(' ', '_'))}-blue)](${shortVerifyUrl})`;
        document.getElementById('markdown-code').textContent = markdownCode;
        
        badgePreview.innerHTML = `<img src="https://img.shields.io/badge/AI-${encodeURIComponent(roleText.replace(' ', '_'))}-blue" alt="${roleText}">`;
    } else {
        // Regular badge styles
        latexSection.style.display = 'none';
        markdownSection.style.display = 'none';
        document.getElementById('embed-section').style.display = 'block';
        document.getElementById('link-section').style.display = 'block';
        
        // Create badge preview based on style
        let badgeHtml = '';
        if (badgeStyle === 'glass') {
            badgeHtml = `<span class="badge-glass badge-glass-primary">AI ${attestation.role.toUpperCase()}</span>`;
        } else if (badgeStyle === 'glass-minimal') {
            badgeHtml = `<span class="badge-glass-minimal">${attestation.role === 'generated' ? 'ai-generated' : 'ai-' + attestation.role}</span>`;
        } else if (badgeStyle === 'terminal') {
            badgeHtml = `<span class="badge-legacy badge-terminal">AI_${attestation.role.toUpperCase()}</span>`;
        } else if (badgeStyle === 'neon') {
            badgeHtml = `<span class="badge-legacy badge-neon">AI ${attestation.role.toUpperCase()}</span>`;
        } else if (badgeStyle === 'rainbow') {
            badgeHtml = `<span class="badge-legacy badge-rainbow">AI ${attestation.role.toUpperCase()}</span>`;
        } else if (badgeStyle === 'matrix') {
            badgeHtml = `<span class="badge-legacy badge-matrix">AI ${attestation.role.toUpperCase()}</span>`;
        } else if (badgeStyle === 'holographic') {
            badgeHtml = `<span class="badge-legacy badge-holographic">AI ${attestation.role.toUpperCase()}</span>`;
        } else {
            // Default badge
            const svg = window.AttestInk ? window.AttestInk.createBadgeSVG(attestation.model, attestation.role) : '';
            badgeHtml = svg || `<span style="display: inline-flex; align-items: center; padding: 4px 12px; background: #2563eb; color: white; font-family: VT323, monospace; font-size: 16px; text-transform: uppercase; border-radius: 4px;">AI ${attestation.role.toUpperCase()}</span>`;
        }
        
        badgePreview.innerHTML = badgeHtml;
        
        // Generate self-contained embed code (uses full data URL for portability)
        const embedCode = `<!-- attest.ink AI Badge -->
<a href="${fullDataUrl}" target="_blank" style="text-decoration: none;">
    ${badgeHtml}
</a>`;
        
        embedCodeEl.textContent = embedCode;
    }
    
    // Always set both URLs
    linkCodeEl.textContent = shortVerifyUrl;
    dataUrlEl.textContent = fullDataUrl;
    
    // Generate curl command for API
    const curlCommand = `curl -s "https://attest.ink/api/create.html?content_name=${encodeURIComponent(attestation.content_name)}&model=${encodeURIComponent(attestation.model)}&role=${encodeURIComponent(attestation.role)}&document_type=${encodeURIComponent(attestation.document_type)}&author=${encodeURIComponent(attestation.author || 'Anonymous')}&output=curl"`;
    document.getElementById('api-curl-command').textContent = curlCommand;
}

// Initialize copy button handlers
function initializeCopyButtons() {
    // Copy embed code
    const copyEmbedBtn = document.getElementById('copy-embed-code');
    if (copyEmbedBtn) {
        copyEmbedBtn.addEventListener('click', async function() {
            const code = document.getElementById('badge-embed-code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy Embed Code';
                }, 2000);
            } catch (err) {
                alert('Failed to copy embed code');
            }
        });
    }
    
    // Copy link code
    const copyLinkBtn = document.getElementById('copy-link-code');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async function() {
            const code = document.getElementById('badge-link-code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy Short URL';
                }, 2000);
            } catch (err) {
                alert('Failed to copy link');
            }
        });
    }
    
    // Copy data URL
    const copyDataUrlBtn = document.getElementById('copy-data-url');
    if (copyDataUrlBtn) {
        copyDataUrlBtn.addEventListener('click', async function() {
            const code = document.getElementById('badge-data-url').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy Data URL';
                }, 2000);
            } catch (err) {
                alert('Failed to copy data URL');
            }
        });
    }
    
    // Copy API command
    const copyApiBtn = document.getElementById('copy-api-command');
    if (copyApiBtn) {
        copyApiBtn.addEventListener('click', async function() {
            const code = document.getElementById('api-curl-command').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy curl Command';
                }, 2000);
            } catch (err) {
                alert('Failed to copy command');
            }
        });
    }
    
    // Copy LaTeX code
    const copyLatexBtn = document.getElementById('copy-latex-code');
    if (copyLatexBtn) {
        copyLatexBtn.addEventListener('click', async function() {
            const code = document.getElementById('latex-code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy LaTeX Code';
                }, 2000);
            } catch (err) {
                alert('Failed to copy LaTeX code');
            }
        });
    }
    
    // Copy extended LaTeX
    const copyLatexExtBtn = document.getElementById('copy-latex-extended');
    if (copyLatexExtBtn) {
        copyLatexExtBtn.addEventListener('click', async function() {
            const code = document.getElementById('latex-extended').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy Extended LaTeX';
                }, 2000);
            } catch (err) {
                alert('Failed to copy LaTeX code');
            }
        });
    }
    
    // Copy markdown code
    const copyMarkdownBtn = document.getElementById('copy-markdown-code');
    if (copyMarkdownBtn) {
        copyMarkdownBtn.addEventListener('click', async function() {
            const code = document.getElementById('markdown-code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy Markdown';
                }, 2000);
            } catch (err) {
                alert('Failed to copy markdown');
            }
        });
    }
}

// Export functions for use in HTML
window.generateAttestationDisplay = generateAttestationDisplay;
window.initializeCopyButtons = initializeCopyButtons;