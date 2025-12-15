// Dynamic constants that get populated automatically by the deployment process

// Primary color constants for the theme - America's Blood Centers red theme
export const PRIMARY_MAIN = "#B91C1C" // Deep red for nav panel
export const primary_50 = "#FEE2E2" // Light red for chat bubbles
export const SECONDARY_MAIN = "#D3D3D3" // Secondary color

// Background color constants
export const CHAT_BODY_BACKGROUND = "#FFFFF7" // White background for chat
export const CHAT_LEFT_PANEL_BACKGROUND = "#7F1D1D" // Dark red for left panel
export const ABOUT_US_HEADER_BACKGROUND = "#FFFFFF" // White text for headers in left panel
export const FAQ_HEADER_BACKGROUND = "#FFFFFF" // White text for headers in left panel
export const ABOUT_US_TEXT = "#FFFFFF" // White text for about us
export const FAQ_TEXT = "#FFFFFF" // White text for FAQs
export const HEADER_BACKGROUND = "#FFFFFF" // White background for header
export const HEADER_TEXT_GRADIENT = "#B91C1C" // Deep red for header text

// Message background colors
export const BOTMESSAGE_BACKGROUND = "#FEE2E2" // Light red for bot messages
export const USERMESSAGE_BACKGROUND = "#F3F4F6" // Light gray for user messages

// API endpoints - These are automatically populated by the deployment process
// The CDK will inject these values as environment variables in Amplify
const getApiBaseUrl = () => {
  // In production (Amplify), use environment variables
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL
  }

  // Check for runtime environment variables (injected by Amplify)
  if (typeof window !== "undefined" && window.ENV?.REACT_APP_API_BASE_URL) {
    return window.ENV.REACT_APP_API_BASE_URL
  }

  // If no API URL is configured, throw an error instead of using localhost
  throw new Error("API Base URL not configured. Please set REACT_APP_API_BASE_URL environment variable.")
}

export const API_BASE_URL = getApiBaseUrl()
export const CHAT_ENDPOINT =
  process.env.REACT_APP_CHAT_ENDPOINT ||
  (typeof window !== "undefined" && window.ENV?.REACT_APP_CHAT_ENDPOINT) ||
  API_BASE_URL
export const HEALTH_ENDPOINT =
  process.env.REACT_APP_HEALTH_ENDPOINT ||
  (typeof window !== "undefined" && window.ENV?.REACT_APP_HEALTH_ENDPOINT) ||
  API_BASE_URL

// Features
export const ALLOW_FILE_UPLOAD = false
export const ALLOW_FAQ = true

// Language Support
export const LANGUAGES = {
  en: "English",
  es: "Español"
}

// Text Constants with Language Support
export const TEXT = {
  en: {
    APP_NAME: "America's Blood Centers AI Assistant",
    APP_ASSISTANT_NAME: "America's Blood Centers AI Assistant",
    ABOUT_US_TITLE: "About us",
    ABOUT_US:
      "Welcome to the America's Blood Centers AI Assistant. We bring together all our blood donation information and services in one place so you can quickly find help or information. America's Blood Centers is the national association for the nation's largest network of community-based, independent blood centers, serving communities across the United States with safe, available blood products and related services.",
    FAQ_TITLE: "FAQs",
    FAQS: [
      "How many people donate blood?",
      "Am I eligible to donate?",
      "Where can I donate blood?",
      "How can I support the blood supply other than donating?",
      "What legislation is actively affecting the blood supply?",
      "How can I write my member of congress to support the blood supply through legislation?",
    ],
    CHAT_HEADER_TITLE: "America's Blood Centers AI Assistant",
    CHAT_INPUT_PLACEHOLDER: "Ask about blood donation, eligibility, or find a blood center...",
    HELPER_TEXT: "Cannot send empty message",
    LANGUAGE_SELECTOR: "Language",
    BLOOD_CENTER_LINK: "Find a Blood Center",
  },
  es: {
    APP_NAME: "Asistente de IA de America's Blood Centers",
    APP_ASSISTANT_NAME: "Asistente de IA de America's Blood Centers",
    ABOUT_US_TITLE: "Acerca de nosotros",
    ABOUT_US:
      "Bienvenido al Asistente de IA de America's Blood Centers. Reunimos toda nuestra información y servicios de donación de sangre en un solo lugar para que pueda encontrar rápidamente ayuda o información. America's Blood Centers es la asociación nacional de la red más grande de centros de sangre independientes basados en la comunidad, sirviendo a comunidades en todo Estados Unidos con productos sanguíneos seguros y disponibles y servicios relacionados.",
    FAQ_TITLE: "Preguntas Frecuentes",
    FAQS: [
      "¿Cuántas personas donan sangre?",
      "¿Soy elegible para donar?",
      "¿Dónde puedo donar sangre?",
      "¿Cómo puedo apoyar el suministro de sangre además de donar?",
      "¿Qué legislación está afectando activamente el suministro de sangre?",
      "¿Cómo puedo escribir a mi miembro del congreso para apoyar el suministro de sangre a través de la legislación?",
    ],
    CHAT_HEADER_TITLE: "Asistente de IA de America's Blood Centers",
    CHAT_INPUT_PLACEHOLDER: "Pregunta sobre donación de sangre, elegibilidad, o encuentra un centro de sangre...",
    HELPER_TEXT: "No se puede enviar mensaje vacío",
    LANGUAGE_SELECTOR: "Idioma",
    BLOOD_CENTER_LINK: "Encontrar un Centro de Sangre",
  }
}

// Default to English, but allow dynamic switching
export const getCurrentLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('selectedLanguage') || 'en'
  }
  return 'en'
}

export const getCurrentText = (language = null) => {
  const lang = language || getCurrentLanguage()
  return TEXT[lang] || TEXT['en']
}

// Log configuration info (for debugging)
if (process.env.NODE_ENV === "development") {
  console.log("🔧 API Configuration:", {
    API_BASE_URL,
    CHAT_ENDPOINT,
    HEALTH_ENDPOINT,
  })
}

// Runtime configuration check
if (typeof window !== "undefined" && !process.env.REACT_APP_API_BASE_URL && !window.ENV?.REACT_APP_API_BASE_URL) {
  console.warn("⚠️ API endpoints not configured properly.")
  console.log("💡 Make sure REACT_APP_API_BASE_URL is set in your environment variables.")
}
