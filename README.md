# attest.ink

## Professional Content Attribution Badges

![Human Generated](assets/badges/human-generated.svg) ![AI Generated](assets/badges/ai-generated.svg)

## Overview

attest.ink provides a standardized, professional method for clearly identifying the origin of content across digital media. Our badges offer a simple, elegant solution for transparent content attribution in an era where distinguishing between human and AI-generated content is increasingly important.

## Features

- **Professional Animated Badge System**: Dynamic, animated SVG badges that can be embedded in any digital content
- **Platform-Specific Attribution**: Specialized badges for content created with Claude, ChatGPT, Gemini, Midjourney, and DALL-E
- **Cross-Platform Compatibility**: Lightweight SVGs designed to work consistently across all platforms and environments
- **Interactive Implementation**: Easy-to-use JavaScript library with customization options
- **Content Upload & Attribution**: Upload your content and apply attribution badges with a single click

## Quick Start

### HTML Implementation

```html
<!-- For human-generated content -->
<img src="https://attest.ink/assets/badges/human-generated.svg" alt="Human Generated" width="120" height="30">

<!-- For AI-generated content -->
<img src="https://attest.ink/assets/badges/ai-generated.svg" alt="AI Generated" width="120" height="30">

<!-- For specific AI platforms -->
<img src="https://attest.ink/assets/badges/claude-generated.svg" alt="Claude AI Generated" width="120" height="30">
<img src="https://attest.ink/assets/badges/chatgpt-generated.svg" alt="ChatGPT Generated" width="120" height="30">
<img src="https://attest.ink/assets/badges/gemini-generated.svg" alt="Gemini Generated" width="120" height="30">
<img src="https://attest.ink/assets/badges/midjourney-generated.svg" alt="Midjourney Generated" width="120" height="30">
<img src="https://attest.ink/assets/badges/dalle-generated.svg" alt="DALL-E Generated" width="120" height="30">
```

### JavaScript Implementation

```html
<script src="https://attest.ink/js/attest.js"></script>
<script>
  // Add a human-generated badge to an element
  AttestInk.addBadge('human', '#my-human-content');
  
  // Add an AI-generated badge to an element
  AttestInk.addBadge('ai', '#my-ai-content');
  
  // Add a specific AI platform badge
  AttestInk.addBadge('claude', '#claude-generated-content');
  
  // Advanced usage with options
  AttestInk.addBadge('human', '#custom-content', {
    position: 'top-right',  // top-right, top-left, bottom-right, bottom-left, center-top, center-bottom
    size: 'medium',         // small, medium, large
    style: 'default'        // default, subtle, prominent
  });
</script>
```

## Recent Updates

### Version 2.0 (May 2025)

#### New Features
- **Content Upload Integration**: Upload your content and apply badges directly through our interface
- **Platform-Specific Badges**: Specialized badges for all major AI platforms (Claude, ChatGPT, Gemini, Midjourney, DALL-E)
- **Enhanced Animation**: Smooth, engaging SVG animations for all badges
- **Customization Options**: Control badge position, size, and style through our JavaScript API
- **Sharing Capabilities**: Generate links and embed codes for content with attribution badges

#### Improvements
- **Interactive Demo**: Try different badge types on example content
- **Platform Selector**: Easily switch between different AI platform badges
- **Enhanced User Interface**: More intuitive, responsive design with improved animations
- **Modernized Visual Style**: Updated color scheme and visual effects
- **Mobile Optimization**: Fully responsive design that works on all device sizes

## Badge Design Principles

Our badges follow these key design principles:

1. **Clarity**: Instantly recognizable at various sizes
2. **Professionalism**: Suitable for business, academic, and creative contexts
3. **Neutrality**: Avoids value judgments about content origins
4. **Animation**: Subtle motion that draws attention without distraction
5. **Accessibility**: High contrast and clear typography for all users

## Why Attribution Matters

In today's digital landscape, understanding content origin is valuable for:

- **Transparency**: Users have the right to know how content was created
- **Trust**: Clear attribution builds trust between creators and audiences
- **Value**: Appropriately recognizing human creative effort
- **Context**: Providing important context for interpretation
- **Responsibility**: Promoting accountability in content creation

## License

attest.ink is proprietary software. All rights reserved.

---

© 2025 attest.ink | Transparent attribution for the AI era

For inquiries: info@attest.ink