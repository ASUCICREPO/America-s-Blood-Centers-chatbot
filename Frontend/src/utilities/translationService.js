// AI-powered translation service for chat messages
// This service translates messages dynamically without hardcoded translations

// Simple language detection
export const detectLanguage = (text) => {
  if (!text) return 'en'
  
  // Basic Spanish detection
  const spanishPatterns = /[ñáéíóúü¿¡]|(\b(el|la|los|las|de|del|en|con|por|para|que|es|son|está|están|soy|eres|somos|dónde|cuántas|cómo|qué|puede|puedo)\b)/i
  
  return spanishPatterns.test(text) ? 'es' : 'en'
}

// AI Translation using a free translation service
export const translateText = async (text, targetLanguage, sourceLanguage = 'auto') => {
  if (!text || targetLanguage === sourceLanguage) {
    return text
  }

  try {
    // Using LibreTranslate (free, open-source translation API)
    // You can also use Google Translate API, Azure Translator, etc.
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage === 'auto' ? 'auto' : sourceLanguage,
        target: targetLanguage,
        format: 'text'
      }),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })

    if (response.ok) {
      const data = await response.json()
      return data.translatedText || text
    } else {
      console.warn('Translation API returned error:', response.status)
    }
  } catch (error) {
    console.warn('Translation failed, using original text:', error.message)
  }

  // Fallback: return original text if translation fails
  return text
}

// Enhanced message block creation with translation support
export const createTranslatableMessageBlock = (message, sentBy, type = "TEXT", state = "PROCESSING") => {
  const detectedLanguage = detectLanguage(message)
  
  return {
    message,
    sentBy,
    type,
    state,
    originalMessage: message, // Store original for admin logs
    originalLanguage: detectedLanguage,
    displayMessage: message, // What user sees (can be translated)
    fileName: "",
    fileStatus: "",
  }
}

// Translate a message block for display
export const translateMessageBlock = async (messageBlock, targetLanguage) => {
  if (!messageBlock.originalMessage || messageBlock.originalLanguage === targetLanguage) {
    return messageBlock
  }

  const translatedText = await translateText(
    messageBlock.originalMessage,
    targetLanguage,
    messageBlock.originalLanguage
  )

  return {
    ...messageBlock,
    message: translatedText,
    displayMessage: translatedText
  }
}