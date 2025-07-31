// attestation-result.js - Logic for displaying attestation results

async function generateAttestationDisplay(attestation) {
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
    
    // Try to create a shortened URL if we're on Vercel
    let shortUrl = null;
    let requiresPayment = false;
    
    console.log('Current hostname:', window.location.hostname);
    
    // Check if we're on Vercel, attest.ink, or localhost (for development)
    if (window.location.hostname.includes('vercel.app') || 
        window.location.hostname === 'attest.ink' || 
        window.location.hostname === 'localhost') {
        try {
            // Check localStorage for email or API key
            const savedEmail = localStorage.getItem('attest_ink_email');
            const savedApiKey = localStorage.getItem('attest_ink_api_key');
            
            console.log('Attempting to create short URL...');
            console.log('Email:', savedEmail);
            console.log('API Key:', savedApiKey ? 'Present' : 'Not present');
            
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    dataUrl: fullDataUrl,
                    email: savedEmail,
                    apiKey: savedApiKey
                })
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (response.ok) {
                shortUrl = data.shortUrl;
                
                // Update the link code to show short URL
                linkCodeEl.textContent = shortUrl;
                
                // Add a note about the permanent short URL
                const shortUrlNote = document.createElement('div');
                shortUrlNote.style.cssText = 'margin-top: 10px; font-size: 12px; color: var(--color-success);';
                shortUrlNote.textContent = '✓ Permanent short URL created';
                linkCodeEl.parentElement.appendChild(shortUrlNote);
            } else if (response.status === 403 && data.requiresPayment) {
                requiresPayment = true;
                
                // Show payment button instead of short URL
                linkCodeEl.textContent = shortVerifyUrl;
                
                const paymentContainer = document.createElement('div');
                paymentContainer.style.cssText = 'margin-top: 15px; padding: 15px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 8px;';
                paymentContainer.innerHTML = `
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: var(--text-secondary);">
                        Want a permanent short URL? Get lifetime access for just $20.
                    </p>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <input type="email" id="payment-email" placeholder="Enter your email" 
                               value="${savedEmail || ''}"
                               style="flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid var(--border-color); 
                                      border-radius: 4px; background: var(--bg-input); color: var(--text-primary);">
                        <button id="purchase-short-urls" class="btn btn-primary" style="white-space: nowrap;">
                            Get Lifetime Access - $20
                        </button>
                    </div>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: var(--text-secondary);">
                        • Create unlimited permanent short URLs<br>
                        • URLs never expire<br>
                        • One-time payment, lifetime access
                    </p>
                `;
                linkCodeEl.parentElement.appendChild(paymentContainer);
                
                // Add click handler for purchase button
                document.getElementById('purchase-short-urls').addEventListener('click', async () => {
                    const email = document.getElementById('payment-email').value.trim();
                    if (!email) {
                        alert('Please enter your email address');
                        return;
                    }
                    
                    // Save email for future use
                    localStorage.setItem('attest_ink_email', email);
                    
                    const button = document.getElementById('purchase-short-urls');
                    button.disabled = true;
                    button.textContent = 'Processing...';
                    
                    try {
                        const checkoutResponse = await fetch('/api/create-checkout', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                email,
                                attestationData: attestation
                            })
                        });
                        
                        const checkoutData = await checkoutResponse.json();
                        
                        if (checkoutData.alreadyPurchased) {
                            // User already has access
                            localStorage.setItem('attest_ink_api_key', checkoutData.apiKey);
                            alert('Great news! You already have lifetime access. The page will now reload to create your short URL.');
                            window.location.reload();
                        } else if (checkoutData.checkoutUrl) {
                            // Redirect to Stripe checkout
                            window.location.href = checkoutData.checkoutUrl;
                        } else {
                            throw new Error('Failed to create checkout session');
                        }
                    } catch (error) {
                        console.error('Checkout error:', error);
                        alert('Failed to start checkout process. Please try again.');
                        button.disabled = false;
                        button.textContent = 'Get Lifetime Access - $20';
                    }
                });
            }
        } catch (error) {
            console.error('Failed to create short URL:', error);
            console.error('Error details:', error.message);
            console.error('Stack trace:', error.stack);
            // Fall back to regular URL
        }
    }
    
    // If no short URL was created and no payment required, use the regular one
    if (!shortUrl && !requiresPayment) {
        linkCodeEl.textContent = shortVerifyUrl;
    }
    
    // Handle LaTeX style
    if (badgeStyle === 'latex') {
        latexSection.style.display = 'block';
        badgePreview.innerHTML = '<div style="font-family: monospace; background: var(--bg-panel); padding: 10px; border: 1px solid var(--border-color); color: var(--text-primary);">LaTeX Badge (see code below)</div>';
        
        // Basic LaTeX code - now shows how to include the modular file
        const roleDisplay = attestation.role === 'edited' ? 'AI-ASSISTED' : attestation.role.toUpperCase().replace('_', '-');
        const latexCode = `% Include AI Attestation section
\\input{ai-attestation}`;
        
        // Extended LaTeX - the content for ai-attestation.tex file
        const modelDisplay = attestation.model === 'human' ? 'Human' : attestation.model;
        const latexExtended = `% ai-attestation.tex
% AI Attestation section for inclusion in main document
\\section{AI Attestation}
\\begin{center}
\\fbox{\\small\\texttt{${roleDisplay}}}
\\end{center}

This ${attestation.document_type === 'latex' ? 'paper' : 'work'} was ${attestation.role === 'assisted' || attestation.role === 'edited' ? 'assisted by' : attestation.role === 'generated' ? 'generated by' : 'created with'} ${modelDisplay}. These tools served a role similar to LaTeX for typesetting or computational systems for verification, enabling more rigorous expression and validation of ideas. All core concepts, insights, and creative decisions are original human work.\\footnote{For detailed AI tool attribution and transparency, see \\href{${fullDataUrl}}{the attest.ink verification URL}.}`;
        
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
        
        // Generate embed code - use short URL if available, otherwise full data URL
        const embedUrl = shortUrl || fullDataUrl;
        const embedCode = `<!-- attest.ink AI Badge -->
<a href="${embedUrl}" target="_blank" style="text-decoration: none;">
    ${badgeHtml}
</a>`;
        
        embedCodeEl.textContent = embedCode;
    }
    
    // Always set the data URL
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
                    this.textContent = 'Copy Main File Code';
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
                    this.textContent = 'Copy ai-attestation.tex Content';
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