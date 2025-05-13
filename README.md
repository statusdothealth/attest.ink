# Attest.ink

## Verifiable Content Attribution Badges

![Human Generated](assets/badges/human-generated.svg) ![AI Generated](assets/badges/ai-generated.svg)

## Overview

Attest.ink provides a standardized, professional method for clearly identifying the origin of content across digital media. Our badges offer a simple, elegant solution for transparent content attribution in an era where distinguishing between human and AI-generated content is increasingly important.

## Features

- **Professional Badge System**: Clean, minimalist SVG badges that can be embedded in any digital content
- **Clear Visual Distinction**: Instantly recognizable icons and color schemes that differentiate human-crafted from AI-generated content
- **Cross-Platform Compatibility**: Lightweight SVGs designed to work consistently across all platforms and environments
- **Elegant Typography**: Carefully selected fonts that maintain legibility at various sizes
- **Developer-Friendly**: Simple implementation for content platforms, websites, documents, and media

## Quick Start

1. Include the badges in your content:

```html
<!-- For human-generated content -->
<img src="https://yourusername.github.io/attest.ink/assets/badges/human-generated.svg" alt="Human Generated" width="120" height="30">

<!-- For AI-generated content -->
<img src="https://yourusername.github.io/attest.ink/assets/badges/ai-generated.svg" alt="AI Generated" width="120" height="30">
```

2. Alternatively, use our simple JavaScript snippet for dynamic badge insertion:

```html
<script src="https://yourusername.github.io/attest.ink/js/attest.js"></script>
<script>
  // Add a human-generated badge to an element
  AttestInk.addBadge('human', '#my-human-content');
  
  // Add an AI-generated badge to an element
  AttestInk.addBadge('ai', '#my-ai-content');
</script>
```

## Live Demo

Check out our [live demo page](https://yourusername.github.io/attest.ink/) to see the badges in action and try the integration tools.

## Badge Design Principles

Our badges follow these key design principles:

1. **Clarity**: Instantly recognizable at various sizes
2. **Professionalism**: Suitable for business, academic, and creative contexts
3. **Neutrality**: Avoids value judgments about content origins
4. **Simplicity**: Minimal design that doesn't distract from the content
5. **Accessibility**: High contrast and clear typography for all users

## Why Attribution Matters

In today's digital landscape, understanding content origin is valuable for:

- **Transparency**: Users have the right to know how content was created
- **Trust**: Clear attribution builds trust between creators and audiences
- **Value**: Appropriately recognizing human creative effort
- **Context**: Providing important context for interpretation
- **Responsibility**: Promoting accountability in content creation

## Local Development

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/attest.ink.git
   cd attest.ink
   ```

2. Open `index.html` in your browser to view the demo page.

3. Modify the SVG badges in the `assets/badges` directory if needed.

## Contributing

We welcome contributions to improve Attest.ink! Please feel free to submit issues or pull requests.

## License

[MIT License](LICENSE)

---

© 2025 attest.ink | Content attribution that matters