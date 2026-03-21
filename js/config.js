/**
 * SYNAWATCH Configuration
 * Replace placeholder values with your actual API keys
 */

const CONFIG = {
    // Firebase Configuration - SYNAWACTH-ID
    FIREBASE_API_KEY: 'AIzaSyCSfe6L9nYPLBCx4SsZ7Wb8vhh34VKexYc',
    FIREBASE_AUTH_DOMAIN: 'synawacth-id.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'synawacth-id',
    FIREBASE_STORAGE_BUCKET: 'synawacth-id.firebasestorage.app',
    FIREBASE_MESSAGING_SENDER_ID: '362856081724',
    FIREBASE_APP_ID: '1:362856081724:web:56e6dd619d391adedc9639',

    // Gemini AI Configuration
    GEMINI_API_KEY: 'AIzaSyCAiJgXoqcN8IGGUzT5z0H-UhXWMfDaD5c',

    // ElevenLabs TTS Configuration
    ELEVENLABS_API_KEY: 'e7639c34914b1734706406e174f9ae11e5e230c16ddb37a5a0af4e3496ec27f0',
    ELEVENLABS_VOICE_ID: '9BWtsMINqrJLrRacOk9x', // Aria - multilingual female voice

    // BLE Configuration for ESP32 SYNAWATCH
    BLE_DEVICE_NAME: 'SYNAWATCH',
    BLE_SERVICE_UUID: '12345678-1234-1234-1234-123456789abc',
    BLE_CHARACTERISTIC_UUID: 'abcd1234-ab12-cd34-ef56-123456789abc',

    // App Configuration
    APP_NAME: 'SYNAWATCH',
    APP_VERSION: '1.0.0',
    DATA_REFRESH_INTERVAL: 500, // milliseconds

    // Health Thresholds
    HEALTH_THRESHOLDS: {
        HR_LOW: 60,
        HR_HIGH: 100,
        SPO2_EXCELLENT: 98,
        SPO2_NORMAL: 95,
        SPO2_LOW: 90,
        STRESS_LOW: 30,
        STRESS_MODERATE: 60,
        GSR_RELAXED: 30,
        GSR_NORMAL: 60,
        GSR_AROUSED: 80,
        TEMP_MIN: 36.1,
        TEMP_MAX: 37.2
    }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.HEALTH_THRESHOLDS);
