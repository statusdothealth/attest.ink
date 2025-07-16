# AI Attestation Badge Analysis

## Summary of Badge Styles Found in Footer Sections

### 1. Rainbow Badge (Legacy Style)
**Class:** `badge-legacy badge-rainbow`
**Text:** "AI ASSISTED"
**Found in:**
- `/index.html`
- `/verify/index.html`
- `/protocol/index.html`
- `/examples/index.html`
- `/showcase/index.html`
- `/create/index.html`
- `/developers/index.html`

**HTML Structure:**
```html
<a href="https://attest.ink/verify/?data=..." target="_blank" style="text-decoration: none;">
    <span class="badge-legacy badge-rainbow">AI ASSISTED</span>
</a>
```

### 2. Glass Badge (Modern Style)
**Class:** `ai-badge ai-badge-small ai-badge-glass`
**Text Variations:**
- "Made with Claude"
- "AI Assisted" (in demo.html)
- "Made with AI" (in badge-showcase.html)

**Found in:**
- `/badge-generator.html` - "Made with Claude"
- `/badge-showcase.html` - "Made with Claude" and "Made with AI"
- `/demo.html` - "Made with Claude" and "AI Assisted"
- `/docs.html` - "Made with Claude"

**HTML Structure:**
```html
<a href="https://attest.ink" class="ai-badge ai-badge-small ai-badge-glass">
    <svg class="ai-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
        <path d="M12 6V8M12 16V18M18 12H16M8 12H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
    <span>[Text Variation]</span>
</a>
```

### 3. Image Badge Style
**Found in:** `/404.html`
**Class:** `ai-attestation-badge`
**HTML Structure:**
```html
<a href="https://attest.ink/verify/?hash=..." class="ai-attestation-badge">
    <img src="/assets/badges/ai-generated.svg" alt="AI Generated" style="height: 20px; vertical-align: middle;">
</a>
```

### Pages Without AI Attestation Badges
- `/examples/footer-example.html`
- `/api/create.html`
- `/api/store.html`
- `/badge/index.html`

## Key Differences

1. **Rainbow Badge**: Used on most main pages, always says "AI ASSISTED", includes full attestation data in URL
2. **Glass Badge**: Used on demo/showcase pages, has text variations, cleaner modern design with SVG icon
3. **Image Badge**: Used only on 404 page, uses an SVG image file instead of inline HTML/CSS

The glass badge appears to be the newer, more versatile style with customizable text, while the rainbow badge is the legacy style with fixed "AI ASSISTED" text.