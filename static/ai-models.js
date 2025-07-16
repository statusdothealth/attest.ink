/**
 * Comprehensive AI Model Registry
 * Organized by provider and version (newest first)
 */

const AI_MODELS = {
    human: {
        name: "Human",
        models: [
            { id: "human", name: "Human (No AI)", color: "#4a5568" }
        ]
    },
    
    openai: {
        name: "OpenAI",
        models: [
            // GPT-4 Series
            { id: "gpt-4-turbo-2024-04-09", name: "GPT-4 Turbo (Apr 2024)", color: "#74aa9c" },
            { id: "gpt-4-0125-preview", name: "GPT-4 Turbo Preview", color: "#74aa9c" },
            { id: "gpt-4-1106-preview", name: "GPT-4 Turbo (Nov 2023)", color: "#74aa9c" },
            { id: "gpt-4-vision-preview", name: "GPT-4 Vision", color: "#74aa9c" },
            { id: "gpt-4-32k", name: "GPT-4 32K", color: "#74aa9c" },
            { id: "gpt-4", name: "GPT-4", color: "#74aa9c" },
            { id: "gpt-4-0613", name: "GPT-4 (Jun 2023)", color: "#74aa9c" },
            { id: "gpt-4-0314", name: "GPT-4 (Mar 2023)", color: "#74aa9c" },
            
            // GPT-3.5 Series
            { id: "gpt-3.5-turbo-0125", name: "GPT-3.5 Turbo (Jan 2024)", color: "#74aa9c" },
            { id: "gpt-3.5-turbo-1106", name: "GPT-3.5 Turbo (Nov 2023)", color: "#74aa9c" },
            { id: "gpt-3.5-turbo-16k", name: "GPT-3.5 Turbo 16K", color: "#74aa9c" },
            { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", color: "#74aa9c" },
            { id: "gpt-3.5-turbo-0613", name: "GPT-3.5 Turbo (Jun 2023)", color: "#74aa9c" },
            { id: "gpt-3.5-turbo-0301", name: "GPT-3.5 Turbo (Mar 2023)", color: "#74aa9c" },
            
            // DALL-E Series
            { id: "dall-e-3", name: "DALL-E 3", color: "#ff6b6b" },
            { id: "dall-e-2", name: "DALL-E 2", color: "#ff6b6b" },
            
            // Legacy
            { id: "text-davinci-003", name: "Davinci-003", color: "#74aa9c" },
            { id: "text-davinci-002", name: "Davinci-002", color: "#74aa9c" }
        ]
    },
    
    anthropic: {
        name: "Anthropic",
        models: [
            // Claude 4 Series
            { id: "claude-4-opus", name: "Claude 4 Opus", color: "#d4a373" },
            
            // Claude 3 Opus Series
            { id: "claude-3-opus-20240229", name: "Claude 3 Opus", color: "#d4a373" },
            { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet", color: "#d4a373" },
            { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku", color: "#d4a373" },
            
            // Claude 2 Series
            { id: "claude-2.1", name: "Claude 2.1", color: "#d4a373" },
            { id: "claude-2.0", name: "Claude 2.0", color: "#d4a373" },
            
            // Claude Instant
            { id: "claude-instant-1.2", name: "Claude Instant 1.2", color: "#d4a373" },
            { id: "claude-instant-1.1", name: "Claude Instant 1.1", color: "#d4a373" },
            
            // Legacy
            { id: "claude-1.3", name: "Claude 1.3", color: "#d4a373" },
            { id: "claude-1.0", name: "Claude 1.0", color: "#d4a373" }
        ]
    },
    
    google: {
        name: "Google",
        models: [
            // Gemini Series
            { id: "gemini-1.5-pro-latest", name: "Gemini 1.5 Pro", color: "#4285f4" },
            { id: "gemini-1.5-flash-latest", name: "Gemini 1.5 Flash", color: "#4285f4" },
            { id: "gemini-1.0-pro", name: "Gemini 1.0 Pro", color: "#4285f4" },
            { id: "gemini-1.0-pro-vision", name: "Gemini Pro Vision", color: "#4285f4" },
            { id: "gemini-ultra", name: "Gemini Ultra", color: "#4285f4" },
            
            // PaLM Series
            { id: "palm-2", name: "PaLM 2", color: "#4285f4" },
            { id: "text-bison-001", name: "Text Bison", color: "#4285f4" },
            { id: "chat-bison-001", name: "Chat Bison", color: "#4285f4" },
            
            // Legacy
            { id: "lamda", name: "LaMDA", color: "#4285f4" }
        ]
    },
    
    meta: {
        name: "Meta",
        models: [
            // Llama 3 Series
            { id: "llama-3-70b-instruct", name: "Llama 3 70B Instruct", color: "#0084ff" },
            { id: "llama-3-70b", name: "Llama 3 70B", color: "#0084ff" },
            { id: "llama-3-8b-instruct", name: "Llama 3 8B Instruct", color: "#0084ff" },
            { id: "llama-3-8b", name: "Llama 3 8B", color: "#0084ff" },
            
            // Llama 2 Series
            { id: "llama-2-70b-chat", name: "Llama 2 70B Chat", color: "#0084ff" },
            { id: "llama-2-70b", name: "Llama 2 70B", color: "#0084ff" },
            { id: "llama-2-13b-chat", name: "Llama 2 13B Chat", color: "#0084ff" },
            { id: "llama-2-13b", name: "Llama 2 13B", color: "#0084ff" },
            { id: "llama-2-7b-chat", name: "Llama 2 7B Chat", color: "#0084ff" },
            { id: "llama-2-7b", name: "Llama 2 7B", color: "#0084ff" },
            
            // Code Llama
            { id: "codellama-70b-instruct", name: "Code Llama 70B", color: "#0084ff" },
            { id: "codellama-34b-instruct", name: "Code Llama 34B", color: "#0084ff" },
            { id: "codellama-13b-instruct", name: "Code Llama 13B", color: "#0084ff" },
            { id: "codellama-7b-instruct", name: "Code Llama 7B", color: "#0084ff" }
        ]
    },
    
    mistral: {
        name: "Mistral AI",
        models: [
            { id: "mistral-large-latest", name: "Mistral Large", color: "#ff7000" },
            { id: "mistral-medium-latest", name: "Mistral Medium", color: "#ff7000" },
            { id: "mistral-small-latest", name: "Mistral Small", color: "#ff7000" },
            { id: "mixtral-8x22b", name: "Mixtral 8x22B", color: "#ff7000" },
            { id: "mixtral-8x7b-instruct", name: "Mixtral 8x7B Instruct", color: "#ff7000" },
            { id: "mixtral-8x7b", name: "Mixtral 8x7B", color: "#ff7000" },
            { id: "mistral-7b-instruct", name: "Mistral 7B Instruct", color: "#ff7000" },
            { id: "mistral-7b", name: "Mistral 7B", color: "#ff7000" }
        ]
    },
    
    cohere: {
        name: "Cohere",
        models: [
            { id: "command-r-plus", name: "Command R+", color: "#39b3a7" },
            { id: "command-r", name: "Command R", color: "#39b3a7" },
            { id: "command-nightly", name: "Command Nightly", color: "#39b3a7" },
            { id: "command", name: "Command", color: "#39b3a7" },
            { id: "command-light", name: "Command Light", color: "#39b3a7" }
        ]
    },
    
    stability: {
        name: "Stability AI",
        models: [
            { id: "stable-diffusion-xl-1024-v1-0", name: "SDXL 1.0", color: "#9333ea" },
            { id: "stable-diffusion-xl-beta-v2-2-2", name: "SDXL Beta", color: "#9333ea" },
            { id: "stable-diffusion-v2-1", name: "SD 2.1", color: "#9333ea" },
            { id: "stable-diffusion-v2", name: "SD 2.0", color: "#9333ea" },
            { id: "stable-diffusion-v1-5", name: "SD 1.5", color: "#9333ea" },
            { id: "stable-diffusion-v1-4", name: "SD 1.4", color: "#9333ea" }
        ]
    },
    
    midjourney: {
        name: "Midjourney",
        models: [
            { id: "midjourney-v6", name: "Midjourney V6", color: "#5865f2" },
            { id: "midjourney-v5.2", name: "Midjourney V5.2", color: "#5865f2" },
            { id: "midjourney-v5.1", name: "Midjourney V5.1", color: "#5865f2" },
            { id: "midjourney-v5", name: "Midjourney V5", color: "#5865f2" },
            { id: "midjourney-v4", name: "Midjourney V4", color: "#5865f2" },
            { id: "niji-v6", name: "Niji V6", color: "#5865f2" },
            { id: "niji-v5", name: "Niji V5", color: "#5865f2" }
        ]
    },
    
    runway: {
        name: "Runway",
        models: [
            { id: "gen-3-alpha", name: "Gen-3 Alpha", color: "#000000" },
            { id: "gen-2", name: "Gen-2", color: "#000000" },
            { id: "gen-1", name: "Gen-1", color: "#000000" }
        ]
    },
    
    ai21: {
        name: "AI21 Labs",
        models: [
            { id: "jamba-instruct", name: "Jamba Instruct", color: "#6c5ce7" },
            { id: "j2-ultra", name: "Jurassic-2 Ultra", color: "#6c5ce7" },
            { id: "j2-mid", name: "Jurassic-2 Mid", color: "#6c5ce7" },
            { id: "j2-light", name: "Jurassic-2 Light", color: "#6c5ce7" }
        ]
    },
    
    inflection: {
        name: "Inflection AI",
        models: [
            { id: "inflection-2.5", name: "Inflection 2.5", color: "#f97316" },
            { id: "inflection-2", name: "Inflection 2", color: "#f97316" },
            { id: "inflection-1", name: "Inflection 1", color: "#f97316" }
        ]
    },
    
    xai: {
        name: "xAI",
        models: [
            { id: "grok-1.5", name: "Grok 1.5", color: "#1a1a1a" },
            { id: "grok-1", name: "Grok 1", color: "#1a1a1a" }
        ]
    },
    
    replicate: {
        name: "Replicate/Open Source",
        models: [
            { id: "falcon-180b", name: "Falcon 180B", color: "#059669" },
            { id: "falcon-40b", name: "Falcon 40B", color: "#059669" },
            { id: "vicuna-33b", name: "Vicuna 33B", color: "#059669" },
            { id: "vicuna-13b", name: "Vicuna 13B", color: "#059669" },
            { id: "alpaca-7b", name: "Alpaca 7B", color: "#059669" },
            { id: "dolly-v2-12b", name: "Dolly 2.0 12B", color: "#059669" },
            { id: "pythia-12b", name: "Pythia 12B", color: "#059669" },
            { id: "stablelm-alpha-7b", name: "StableLM Alpha 7B", color: "#059669" }
        ]
    },
    
    other: {
        name: "Other",
        models: [
            { id: "github-copilot", name: "GitHub Copilot", color: "#24292e" },
            { id: "amazon-codewhisperer", name: "CodeWhisperer", color: "#ff9900" },
            { id: "perplexity-online", name: "Perplexity Online", color: "#20c4cb" },
            { id: "you-chat", name: "You.com Chat", color: "#5f27cd" },
            { id: "poe-assistant", name: "Poe Assistant", color: "#866bdc" },
            { id: "deepl-write", name: "DeepL Write", color: "#0f2b46" },
            { id: "custom", name: "Custom Model", color: "#6b7280" }
        ]
    }
};

// Helper function to get all models as flat array
function getAllModels() {
    const models = [];
    for (const provider of Object.values(AI_MODELS)) {
        models.push(...provider.models);
    }
    return models;
}

// Helper function to get model by ID
function getModelById(modelId) {
    for (const provider of Object.values(AI_MODELS)) {
        const model = provider.models.find(m => m.id === modelId);
        if (model) return model;
    }
    return null;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AI_MODELS, getAllModels, getModelById };
}