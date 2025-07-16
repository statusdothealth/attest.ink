# <img src="assets/logo/circular-2-ai.svg" alt="attest.ink" width="40" height="40" align="left"> attest.ink - AI Content Attestation Protocol

A decentralized, privacy-preserving protocol for creating verifiable attestations about AI involvement in content creation. No servers, no tracking, no blockchain - just cryptographic proof that works everywhere.

## Overview

attest.ink is an open-source protocol that enables transparent disclosure of AI involvement in content creation through:

- **Cryptographic Attestations**: Create tamper-proof records of AI usage
- **Beautiful Badges**: Display verification badges that link to cryptographic proofs
- **Complete Decentralization**: Works offline, no servers or blockchain required
- **Privacy-First**: Keep prompts private while proving AI involvement
- **Universal Compatibility**: Integrate with any platform or content type

## Key Features

### For Content Creators
- **Simple Creation**: Generate attestations in seconds at [attest.ink/create](https://attest.ink/create/)
- **Multiple AI Models**: Support for 100+ models from OpenAI, Anthropic, Google, Meta, and more
- **Flexible Roles**: Document if AI generated, assisted, or edited your content
- **File Support**: Attest any content type - text, code, images, audio, video
- **Digital Signatures**: Optional Ethereum wallet signatures for enhanced verification

### For Developers
- **Static Architecture**: Runs on GitHub Pages, Netlify, or any static host
- **Client-Side Only**: All operations happen in the browser
- **Simple Integration**: One-line badge embedding
- **REST API**: Programmatic attestation creation via curl/HTTP
- **Open Protocol**: MIT licensed, no vendor lock-in

### For Verifiers
- **One-Click Verification**: Click any badge to verify authenticity
- **Content Hash Verification**: Verify content hasn't been modified
- **Signature Validation**: Verify digital signatures when present
- **Offline Verification**: Download and verify attestations locally

## Quick Start

### 1. Create an Attestation

#### Web Interface
Visit [attest.ink/create](https://attest.ink/create/) and fill out the form.

#### API / Automation
```bash
# Create attestation via curl
curl -s "https://attest.ink/api/create.html?content_name=My%20Blog%20Post&model=gpt-4&role=assisted&output=curl"

# With content hash
curl -s "https://attest.ink/api/create.html?content_name=My%20Article&content=$(cat article.txt | jq -sRr @uri)&model=claude-3-opus"
```

### 2. Embed a Badge

#### HTML
```html
<!-- Self-contained badge with full attestation data -->
<a href="https://attest.ink/verify/?data=eyJ2ZXJzaW9uIj..." target="_blank">
    <img src="https://attest.ink/assets/badges/gpt-4-generated.svg" alt="AI Generated with GPT-4" />
</a>
```

#### Markdown
```markdown
[![AI Generated](https://attest.ink/assets/badges/ai-generated.svg)](https://attest.ink/verify/?data=...)
```

#### Dynamic Loading
```html
<div class="ai-attest-badge" data-attestation-url="https://example.com/attestation.json"></div>
<script src="https://attest.ink/static/badge-renderer.js"></script>
```

### 3. Verify Content

Click any attestation badge or visit [attest.ink/verify](https://attest.ink/verify/) to verify:
- Attestation format and schema validity
- Content hash (if original content provided)
- Digital signatures (if present)
- Timestamp and metadata

## Attestation Schema

### Version 2.0 (Current)
```json
{
  "version": "2.0",
  "id": "2025-01-16-abc123",
  "content_name": "My Blog Post About Quantum Computing",
  "content_hash": "sha256:b6a5c8d9e2f4a3b7c1d8e9f0a1b2c3d4...",
  "document_type": "markdown",
  "model": "gpt-4-turbo-2024-04-09",
  "role": "assisted",
  "author": "Dr. Jane Smith",
  "timestamp": "2025-01-16T10:30:00Z",
  "platform": "attest.ink",
  "prompt": "Write an introduction to quantum computing",
  "prompt_hash": "sha256:a1b2c3d4...",
  "signature": {
    "type": "wallet",
    "value": "0x1234567890abcdef...",
    "signer": "0x742d35Cc6634C0532925a3b844Bc9e7595f06fD3",
    "message": "{\"content_hash\":\"sha256:...\",\"model\":\"gpt-4\",\"timestamp\":\"2025-01-16T10:30:00Z\"}"
  }
}
```

### Field Descriptions

| Field | Required | Description |
|-------|----------|-------------|
| `version` | Yes | Schema version (currently "2.0") |
| `id` | Yes | Unique identifier (format: YYYY-MM-DD-random) |
| `content_name` | Yes | Human-readable name/title of the content |
| `content_hash` | No | SHA-256 hash of the content (optional in v2.0) |
| `document_type` | Yes | Type of content (text, markdown, code, image, etc.) |
| `model` | Yes | AI model identifier |
| `role` | Yes | How AI was used: generated, assisted, or edited |
| `author` | No | Human author/creator name |
| `timestamp` | Yes | ISO 8601 timestamp of attestation creation |
| `platform` | Yes | Platform used to create attestation |
| `prompt` | No | The prompt used (can be kept private) |
| `prompt_hash` | No | SHA-256 hash of prompt if kept private |
| `signature` | No | Digital signature object |

### AI Roles

- **generated**: Content was primarily created by AI
- **assisted**: Human and AI collaborated on the content
- **edited**: AI refined or improved human-created content

## Badge Gallery

### Badge Styles

#### Glass Morphism Badges
Modern badges with blur and transparency effects:
- `badge-glass` - Default glass style
- `badge-glass-primary` - Primary color variant
- `badge-glass-minimal` - Subtle, minimal design

#### Legacy Badges
Classic badge designs:
- `badge-terminal` - Retro terminal style
- `badge-neon` - Animated neon glow
- `badge-rainbow` - Animated rainbow effect
- `badge-matrix` - Digital rain animation
- `badge-holographic` - Shimmer effect

#### SVG Badges
Pre-rendered badges for all major AI models:
```
https://attest.ink/assets/badges/{model}-{role}.svg

Examples:
- gpt-4-generated.svg
- claude-assisted.svg
- midjourney-generated.svg
```

### Supported AI Models

Over 100 AI models across multiple providers:

- **OpenAI**: GPT-4, GPT-3.5, DALL-E 3, etc.
- **Anthropic**: Claude 3 Opus, Claude 3 Sonnet, Claude 3 Haiku
- **Google**: Gemini Pro, PaLM 2, Imagen
- **Meta**: Llama 3, Code Llama
- **Stability AI**: Stable Diffusion XL, SDXL Turbo
- **Midjourney**: v6, v5.2, v5.1
- **Mistral AI**: Large, Medium, Small, Mixtral
- **Cohere**: Command R+, Command R
- **And many more...**

View the complete gallery at [attest.ink/showcase](https://attest.ink/showcase/)

## Technical Architecture

### Project Structure
```
attest.ink/
├── index.html              # Homepage
├── create/                 # Attestation creator
├── verify/                 # Attestation verifier
├── protocol/               # Protocol specification
├── showcase/               # Badge gallery
├── examples/               # Integration examples
├── api/                    # API endpoints
│   └── create.html        # Programmatic creation
├── static/
│   ├── attestation-tool.js # Core attestation logic
│   ├── badge-renderer.js   # Badge rendering engine
│   ├── ai-models.js        # AI model registry
│   ├── style.css          # Main styles
│   └── badge-styles.css   # Badge-specific styles
├── assets/
│   └── badges/            # Pre-rendered SVG badges
└── attestations/          # Stored attestations (optional)
```

### How It Works

1. **Content Hashing**: Uses Web Crypto API to generate SHA-256 hashes
2. **Data Storage**: Attestations encoded as base64 data URLs or JSON files
3. **Verification**: Client-side validation of hashes and signatures
4. **No Backend**: Everything runs in the browser using JavaScript

### API Reference

#### Create Attestation
```
GET https://attest.ink/api/create.html

Parameters:
- content_name (required): Name of the content
- content: The actual content (for hash generation)
- model: AI model used (default: gpt-4)
- role: generated|assisted|edited (default: assisted)
- document_type: Type of content (default: text)
- author: Author name
- prompt: The prompt used
- prompt_private: true/false to hash the prompt
- output: json|curl (default: json)
```

#### JavaScript API
```javascript
// Create badge programmatically
const badge = AttestInk.createBadgeSVG('gpt-4', 'generated');

// Get badge URL
const url = AttestInk.getBadgeUrl('claude-3-opus');

// Render all badges on page
AttestInk.renderBadges();
```

## Development

### Local Development
```bash
# Clone repository
git clone https://github.com/statusdothealth/attest.ink.git
cd attest.ink

# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve
# or
php -S localhost:8000
```

### Testing
- Open http://localhost:8000
- Create test attestations
- Verify badges render correctly
- Test verification flow

### Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

To deploy elsewhere:
1. Build not required (pure static files)
2. Upload all files to your static host
3. Configure your domain
4. No server configuration needed

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

### Ways to Contribute
- Add new AI models to the registry
- Improve badge designs
- Add language translations
- Write integration guides
- Report bugs or suggest features

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test locally
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Documentation

### Core Documentation
- [Protocol Specification](https://attest.ink/protocol/) - Technical protocol details
- [Badge Gallery](https://attest.ink/showcase/) - Complete badge collection
- [Integration Examples](https://attest.ink/examples/) - Real-world usage examples
- [API Documentation](https://attest.ink/api/create.html) - Programmatic access

### Integration Guides

#### WordPress
```php
// In your theme or plugin
function add_ai_attestation_badge() {
    echo '<a href="https://attest.ink/verify/?data=..." target="_blank">';
    echo '<img src="https://attest.ink/assets/badges/ai-assisted.svg" alt="AI Assisted" />';
    echo '</a>';
}
```

#### React
```jsx
const AIBadge = ({ attestationUrl }) => (
    <a href={attestationUrl} target="_blank" rel="noopener noreferrer">
        <img src="https://attest.ink/assets/badges/ai-generated.svg" alt="AI Generated" />
    </a>
);
```

#### LaTeX
```latex
\usepackage{hyperref}
\href{https://attest.ink/verify/?data=...}{%
    \includegraphics[width=3cm]{ai-attestation-badge.pdf}%
}
```

## Security & Privacy

### Security Features
- **Content Integrity**: SHA-256 hashes ensure content hasn't been modified
- **Digital Signatures**: Optional cryptographic signatures for proof of authorship
- **No Data Collection**: No analytics, tracking, or server-side storage
- **Open Source**: Fully auditable codebase

### Privacy Features
- **Private Prompts**: Keep prompts confidential while proving AI use
- **Local Processing**: All operations happen in your browser
- **No Account Required**: Create attestations anonymously
- **Data Portability**: Export and backup all attestations

## Use Cases

### Academic Papers
- Disclose AI assistance in research
- Maintain academic integrity
- Provide verifiable proof for journals

### Blog Posts & Articles
- Build trust with readers
- Comply with disclosure requirements
- Stand out with transparency

### Code & Documentation
- Document AI-assisted development
- Track AI contributions
- Maintain audit trails

### Creative Works
- Attribute AI-generated art
- Protect artistic integrity
- Enable proper crediting

## Statistics

- **100+** Supported AI models
- **15+** AI providers
- **10+** Badge styles
- **8** Content types
- **3** Attestation roles
- **0** Servers required

## Roadmap

### Planned Features
- [ ] Browser extension for one-click attestation
- [ ] WordPress plugin
- [ ] npm package for Node.js integration
- [ ] Python library
- [ ] Additional signature methods (PGP, DID)
- [ ] Batch attestation creation
- [ ] Attestation chains for derivative works

### Under Consideration
- IPFS integration for permanent storage
- ENS integration for human-readable attestation IDs
- WebAuthn support for hardware key signatures
- Multi-language interface translations

## FAQ

**Q: Do I need a blockchain wallet?**
A: No, digital signatures are optional. You can create attestations without any wallet.

**Q: Where is my data stored?**
A: Attestations are encoded in URLs or saved as JSON files. No central storage.

**Q: Can I verify attestations offline?**
A: Yes, download the attestation JSON and verify locally.

**Q: Is this free to use?**
A: Yes, completely free and open source under MIT license.

**Q: Can I self-host this?**
A: Yes, it's just static files. Host anywhere that serves HTML.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Created by [@97115104](https://github.com/97115104) + AI tools
- Built as a public good for the AI community
- Supported by [0x42 Research](https://0x42r.io/)
- Special thanks to all early adopters
- [Sponsors link if you're into it 🩵](https://github.com/sponsors/97115104/dashboard)

## Contact

- **Email**: info@attest.ink
- **GitHub**: [github.com/statusdothealth/attest.ink](https://github.com/statusdothealth/attest.ink)
- **Issues**: [Report bugs or request features](https://github.com/statusdothealth/attest.ink/issues)

---

<div align="center">
    <img src="https://attest.ink/assets/badges/ai-assisted.svg" alt="AI Assisted" width="120" height="30" />
    <br>
    <em>This README was created with AI assistance and human oversight</em>
    <br>
    <strong>Made with transparency for the AI era</strong>
</div>
