// File: js/components.js
document.addEventListener('DOMContentLoaded', function() {
    // Load all component placeholders
    const componentPlaceholders = document.querySelectorAll('[data-component]');
    
    if (componentPlaceholders.length > 0) {
        componentPlaceholders.forEach(placeholder => {
            const componentName = placeholder.dataset.component;
            
            if (componentName) {
                fetch(`components/${componentName}.html`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load component: ${componentName}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        placeholder.innerHTML = html;
                        
                        // Trigger a custom event when component is loaded
                        const event = new CustomEvent('componentLoaded', {
                            detail: { component: componentName }
                        });
                        document.dispatchEvent(event);
                    })
                    .catch(error => {
                        console.error(error);
                        placeholder.innerHTML = `<div class="component-error">Failed to load component: ${componentName}</div>`;
                    });
            }
        });
    }
});