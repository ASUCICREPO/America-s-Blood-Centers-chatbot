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

// Text Constants
export const TEXT = {
  APP_NAME: "America's Blood Centers AI Assistant",
  APP_ASSISTANT_NAME: "America's Blood Centers AI Assistant",
  ABOUT_US_TITLE: "About us",
  ABOUT_US:
    "Welcome to the America's Blood Centers AI Assistant. We bring together all our blood donation information and services in one place so you can quickly find help or information. America's Blood Centers is the national association for the nation's largest network of community-based, independent blood centers, serving communities across the United States with safe, available blood products and related services.",
  FAQ_TITLE: "FAQs",
  FAQS: [
    "How do I donate blood?",
    "What are the eligibility requirements for blood donation?",
    "Where can I find a blood center near me?",
    "What is the blood donation process?",
    "How often can I donate blood?",
    "What should I do before donating blood?",
  ],
  CHAT_HEADER_TITLE: "America's Blood Centers AI Assistant",
  CHAT_INPUT_PLACEHOLDER: "Ask about blood donation, eligibility, or find a blood center...",
  HELPER_TEXT: "Cannot send empty message",
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
