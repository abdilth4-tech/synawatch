/**
 * SYNAWATCH - Mood Booster Module
 * Provides instant mood alleviation via music and guided steps
 */

const MoodBooster = {
    init() {
        console.log("MoodBooster Initialized");
    },

    setMood(level) {
        document.querySelectorAll('.mood-btn').forEach(btn => btn.style.transform = 'scale(1)');
        event.currentTarget.style.transform = 'scale(1.2)';
        Utils.showToast("Mood Anda telah dicatat oleh sistem", "success");
    },

    playTherapy(track) {
        Utils.showToast(`Memutar Terapi: ${track}...`, "info");
        // In real app, integrate with Spotify/Youtube API or local audio
    }
};

window.MoodBooster = MoodBooster;
