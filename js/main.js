document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = `${button.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const codeBlock = document.querySelector(`#${targetId} code`);
            
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        });
    });

    // Demo functionality
    const addHumanBtn = document.getElementById('add-human-badge');
    const addAiBtn = document.getElementById('add-ai-badge');
    const resetBtn = document.getElementById('reset-demo');

    addHumanBtn.addEventListener('click', () => {
        AttestInk.removeBadge('#demo-block-1');
        AttestInk.addBadge('human', '#demo-block-1');
    });

    addAiBtn.addEventListener('click', () => {
        AttestInk.removeBadge('#demo-block-2');
        AttestInk.addBadge('ai', '#demo-block-2');
    });

    resetBtn.addEventListener('click', () => {
        AttestInk.removeBadge('#demo-block-1, #demo-block-2');
    });
});