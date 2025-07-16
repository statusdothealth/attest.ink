// Global Footer Component - FORCE CONSISTENT FOOTER
(function() {
    // Footer HTML template - EXACTLY matching index.html
    const footerHTML = `
        <footer>
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="/" class="logo">
                        <img src="/assets/logo/circular-2-ai.svg" alt="attest.ink logo">
                        <span>attest.ink</span>
                    </a>
                    <p>Transparent AI attribution for the modern web</p>
                </div>
                
                <div class="footer-links">
                    <a href="/showcase/">Badges</a>
                    <a href="/examples/">Examples</a>
                    <a href="/developers/">Documentation</a>
                    <a href="https://github.com/statusdothealth/attest.ink" target="_blank">GitHub</a>
                    <a href="mailto:info@attest.ink">Contact</a>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 <a href="https://0x42r.io/" target="_blank">0x42 Research</a>. 
                    <a href="https://github.com/statusdothealth/attest.ink/blob/main/LICENSE" target="_blank">
                        <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License" style="vertical-align: middle; margin-left: 8px;">
                    </a>
                </p>
                <a href="https://attest.ink/verify/?data=eyJ2ZXJzaW9uIjoiMi4wIiwiaWQiOiIyMDI1LTA3LTE2LTM0ZXpucyIsImNvbnRlbnRfbmFtZSI6ImltcG9ydGVkLWNvbnRlbnQiLCJkb2N1bWVudF90eXBlIjoid2Vic2l0ZSIsIm1vZGVsIjoiY2xhdWRlLTQtb3B1cyIsInJvbGUiOiJhc3Npc3RlZCIsInRpbWVzdGFtcCI6IjIwMjUtMDctMTZUMDI6NTI6MDYuNjU1WiIsInBsYXRmb3JtIjoiYXR0ZXN0LmluayIsImNvbnRlbnRfaGFzaCI6InNoYTI1NjplNWUzMDJmMzczOWViZjU4MTI5YWM5NGJlZGU4OTQ0ZGJhOGVkYWM3N2FlYzBmOGM2ZWQ1ZmY5ZGExOWYwMGJmIiwiYXV0aG9yIjoiMHg0MiBSZXNlYXJjaCIsInNpZ25hdHVyZSI6eyJ0eXBlIjoiZXRoZXJldW0iLCJ2YWx1ZSI6IjB4OTExODcwMGYzZDBiMGQ5M2RiMDQ4YTRkODNlZTk4MTZlZjI0NzEyNWJiN2ExMzNiYzA1MWM2NmIzZGZjNWE4OTRmMWRlYzY1OTMyNWRlNTViMWYxNGIyZmQxYzg1MjlkZjExM2E2OGYyZGE1ZjFiMzUwYjc5YzllMzgyMGQ5NTYxYiIsInNpZ25lciI6IjB4NzlhNzJhMDJiOWIxOTNjNDUyMGYyMmYyY2QyZDYzYTM1NGRmZTRkMyIsIm1lc3NhZ2UiOiJ7XCJjb250ZW50X25hbWVcIjpcImltcG9ydGVkLWNvbnRlbnRcIixcIm1vZGVsXCI6XCJjbGF1ZGUtNC1vcHVzXCIsXCJ0aW1lc3RhbXBcIjpcIjIwMjUtMDctMTZUMDI6NTI6MDYuNjU1WlwiLFwiY29udGVudF9oYXNoXCI6XCJzaGEyNTY6ZTVlMzAyZjM3MzllYmY1ODEyOWFjOTRiZWRlODk0NGRiYThlZGFjNzdhZWMwZjhjNmVkNWZmOWRhMTlmMDBiZlwifSJ9fQ==" target="_blank" style="text-decoration: none;">
                    <span class="badge-legacy badge-rainbow">AI ASSISTED</span>
                </a>
            </div>
        </footer>
    `;
    
    // Function to FORCE footer placement
    function replaceFooter() {
        // Remove ALL existing footers first
        const existingFooters = document.querySelectorAll('footer');
        existingFooters.forEach(footer => footer.remove());
        
        // Find the main element and container
        const main = document.querySelector('main');
        const container = document.querySelector('.container');
        
        if (container && main && container.contains(main)) {
            // If main is inside container, append footer to container
            container.insertAdjacentHTML('beforeend', footerHTML);
        } else if (main) {
            // If main exists but not in container, insert after main
            main.insertAdjacentHTML('afterend', footerHTML);
        } else if (container) {
            // If only container exists, append to it
            container.insertAdjacentHTML('beforeend', footerHTML);
        } else {
            // Fallback: append to body
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }
    
    // Force execution after everything loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(replaceFooter, 100);
            // Load back-to-top functionality
            loadBackToTop();
        });
    } else {
        setTimeout(replaceFooter, 100);
        // Load back-to-top functionality
        loadBackToTop();
    }
    
    // Function to load back-to-top script
    function loadBackToTop() {
        const script = document.createElement('script');
        script.src = '/static/back-to-top.js';
        document.body.appendChild(script);
    }
})();