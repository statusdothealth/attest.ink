// attestation-result.js - Logic for displaying attestation results

// Check if we're coming back from a successful payment
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment_success') === 'true') {
        // Show success message
        if (window.AttestModal) {
            window.AttestModal.alert('Payment successful! Your short URL is being created...', '🎉 Success');
        }
        // Remove the payment_success parameter from URL
        const newUrl = window.location.pathname + '?id=' + urlParams.get('id');
        window.history.replaceState({}, document.title, newUrl);
    }
});

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
    
    // Create a proper data URL for the API
    const dataUrlForApi = `data:application/json;base64,${attestationB64}`;
    
    // Try to create a shortened URL if we're on Vercel
    let shortUrl = null;
    let requiresPayment = false;
    
    console.log('Current hostname:', window.location.hostname);
    
    // Check if we're on Vercel, attest.ink, or localhost (for development)
    if (window.location.hostname.includes('vercel.app') || 
        window.location.hostname.includes('attest.ink') || 
        window.location.hostname === 'localhost') {
        try {
            // Check localStorage for email or API key
            const savedEmail = localStorage.getItem('attest_ink_email');
            const savedApiKey = localStorage.getItem('attest_ink_api_key');
            
            console.log('Attempting to create short URL...');
            console.log('Email:', savedEmail);
            console.log('API Key:', savedApiKey ? 'Present' : 'Not present');
            console.log('Data URL length:', dataUrlForApi.length);
            console.log('Data URL preview:', dataUrlForApi.substring(0, 100) + '...');
            
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    dataUrl: dataUrlForApi,
                    email: savedEmail,
                    apiKey: savedApiKey
                })
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);
            
            if (response.status === 400) {
                console.error('Bad request error:', data.error);
            }
            
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
                
                // Show blurred preview of short URL
                linkCodeEl.innerHTML = `
                    <span style="display: flex; align-items: center; gap: 10px;">
                        <span style="filter: blur(3px); pointer-events: none; color: var(--text-secondary);">
                            https://attest.ink/s/abc123
                        </span>
                        <span style="display: flex; align-items: center; gap: 5px; color: var(--text-secondary); font-size: 14px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12l2 2 4-4"/>
                                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                                <path d="m3 12 18 0"/>
                            </svg>
                            Unlock ↓
                        </span>
                    </span>
                `;
                
                const paymentContainer = document.createElement('div');
                paymentContainer.style.cssText = 'margin-top: 15px; padding: 15px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 8px;';
                paymentContainer.innerHTML = `
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: var(--text-secondary);">
                        <strong>Unlock permanent short URLs</strong> - Get lifetime access for just $20.
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
                        if (window.AttestModal) {
                            window.AttestModal.alert('Please enter your email address to continue.', 'Email Required');
                        } else {
                            alert('Please enter your email address');
                        }
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
                                attestationData: attestation,
                                attestationId: attestation.id
                            })
                        });
                        
                        const checkoutData = await checkoutResponse.json();
                        
                        if (checkoutData.alreadyPurchased) {
                            // User already has access
                            localStorage.setItem('attest_ink_api_key', checkoutData.apiKey);
                            if (window.AttestModal) {
                                window.AttestModal.alert('Great news! You already have lifetime access. The page will now reload to create your short URL.', '🎉 Already Purchased');
                                setTimeout(() => window.location.reload(), 2000);
                            } else {
                                alert('Great news! You already have lifetime access. The page will now reload to create your short URL.');
                                window.location.reload();
                            }
                        } else if (checkoutData.checkoutUrl) {
                            // Redirect to Stripe checkout
                            window.location.href = checkoutData.checkoutUrl;
                        } else {
                            throw new Error('Failed to create checkout session');
                        }
                    } catch (error) {
                        console.error('Checkout error:', error);
                        if (window.AttestModal) {
                            window.AttestModal.alert('Failed to start checkout process. Please try again.', 'Error');
                        } else {
                            alert('Failed to start checkout process. Please try again.');
                        }
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
    
    // Handle URL display based on payment status
    if (shortUrl) {
        // User has paid and got a short URL
        linkCodeEl.textContent = shortUrl;
    } else if (requiresPayment) {
        // User needs to pay - don't show URL or copy button
        linkCodeEl.textContent = '';
        const copyBtn = document.getElementById('copy-link-code');
        if (copyBtn) {
            copyBtn.style.display = 'none';
        }
    } else {
        // Fallback to regular URL
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
        
        // Use short URL if available, otherwise full data URL
        const verificationUrl = shortUrl || fullDataUrl;
        const urlText = shortUrl ? shortUrl : 'the attest.ink verification URL';
        
        // Add note about short URLs if user has paid
        if (shortUrl) {
            const shortUrlNote = document.createElement('div');
            shortUrlNote.style.cssText = 'margin: 15px 0; padding: 15px; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 8px;';
            shortUrlNote.innerHTML = `<p style="margin: 0; color: var(--text-secondary);"><strong>✓ Using short URL in LaTeX code</strong><br>Short URLs are better for printed documents as they're more readable and less likely to break across lines.</p>`;
            latexSection.insertBefore(shortUrlNote, latexSection.firstChild);
        }
        
        const latexExtended = `% ai-attestation.tex
% AI Attestation section for inclusion in main document
\\section{AI Attestation}
\\begin{center}
\\fbox{\\small\\texttt{${roleDisplay}}}
\\end{center}

This ${attestation.document_type === 'latex' ? 'paper' : 'work'} was ${attestation.role === 'assisted' || attestation.role === 'edited' ? 'assisted by' : attestation.role === 'generated' ? 'generated by' : 'created with'} ${modelDisplay}. These tools served a role similar to LaTeX for typesetting or computational systems for verification, enabling more rigorous expression and validation of ideas. All core concepts, insights, and creative decisions are original human work.\\footnote{For detailed AI tool attribution and transparency, see \\href{${verificationUrl}}{${urlText}}.}`;
        
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