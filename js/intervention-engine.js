/**
 * SYNAWATCH - Closed-Loop Intervention Engine
 * Processes real-time sensor data against baseline psychological states
 * to trigger automated dynamic interventions.
 */

const InterventionEngine = {
    baseline: null,
    cooldowns: {
        breathing: 0,
        synachat: 0,
        music: 0,
        support: 0
    },
    COOLDOWN_PERIOD: 5 * 60 * 1000, // 5 minutes between automatic interventions
    SIMULATION_MODE: true, // Set to true to allow easier trigger during dev

    /**
     * Initialize engine with user baseline
     */
    init(userData) {
        this.baseline = {
            phq9Score: userData.initialPhq9Score || 0,
            stressThreshold: this.calculateStressThreshold(userData.initialPhq9Score || 0)
        };
        console.log("Intervention Engine Initialized. Baseline Threshold:", this.baseline.stressThreshold);
    },

    /**
     * Dynamically adjust sensitivity based on PHQ-9/UCLA
     */
    calculateStressThreshold(phq9Score) {
        // High PHQ-9 means lower threshold for triggering interventions
        if (phq9Score >= 15) return 60; // Very sensitive
        if (phq9Score >= 10) return 70; // Sensitive
        if (phq9Score >= 5)  return 80; // Normal
        return 85;                      // High threshold
    },

    /**
     * Process incoming telemetry data from watch (Heart Rate, GSR, Stress calc)
     * Called by App.handleBLEData automatically
     */
    processTelemetry(data) {
        if (!this.baseline || (!data.finger && !this.SIMULATION_MODE)) return;

        const now = Date.now();
        const stress = data.stress || 0;
        const hr = data.hr || 0;
        const gsr = data.gsr || 0;

        // Detect acute stress event (Panic attack / High anxiety)
        if (stress > this.baseline.stressThreshold && gsr > 70) {
            if (now - this.cooldowns.breathing > this.COOLDOWN_PERIOD) {
                this.triggerIntervention('breathing');
                this.cooldowns.breathing = now;
            }
        }

        // Detect chronic prolonged stress / elevated HR while resting (activity == 0)
        if (stress > this.baseline.stressThreshold - 10 && data.act === 0) {
             if (now - this.cooldowns.synachat > this.COOLDOWN_PERIOD * 2) {
                this.triggerIntervention('synachat');
                this.cooldowns.synachat = now;
            }
        }

        // Gap 7: Bio-signal Safety Planning - Extreme psychological distress
        if (stress > 90 && gsr > 85 && hr > 110 && data.act === 0) {
            if (now - this.cooldowns.support > this.COOLDOWN_PERIOD * 3) {
                this.triggerIntervention('support');
                this.cooldowns.support = now;
            }
        }
    },

    /**
     * Trigger specific intervention UI
     */
    triggerIntervention(type) {
        console.log("TRIGGERING CLOSED-LOOP INTERVENTION:", type);
        
        // Save intervention event to database
        this.logInterventionToDB(type);

        switch(type) {
            case 'breathing':
                this.showAlert("Detak jantung dan stres terdeteksi tinggi. Mari istirahat sejenak dengan latihan pernapasan 4-7-8.", () => {
                    // Navigate to mindful module (Batch 05)
                    Utils.showToast("Diarahkan ke Modul Mindfulness...", "info");
                    Router.navigate('mindful'); 
                });
                break;
            case 'synachat':
                this.showAlert("AI mendeteksi pola stres saat Anda sedang rileks. Mau ngobrol sebentar dengan Dr. Synachat?", () => {
                    sessionStorage.setItem('synachat_proactive_trigger', 'high_stress_resting');
                    Router.navigate('synachat');
                });
                break;
            case 'music':
                this.showAlert("Mood Booster yang menenangkan disiapkan untuk Anda berdasarkan metrik vital Anda.", () => {
                    // Navigate to moodbooster module (Batch 04)
                    Utils.showToast("Membuka Modul Mood Booster...", "info");
                });
                break;
            case 'support':
                this.showAlert("Sistem mendeteksi beban emosional yang sangat tinggi. Keselamatan Anda adalah prioritas. Mari terhubung dengan layanan darurat atau profesional.", () => {
                    sessionStorage.setItem('support_emergency_trigger', 'true');
                    Router.navigate('support');
                });
                break;
        }
    },

    /**
     * Show custom non-intrusive popup
     */
    showAlert(message, onAccept) {
        // Prevent stacking overlays
        if (document.querySelector('.intervention-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'intervention-modal-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:9999;animation:fadeIn 0.3s;';
        
        overlay.innerHTML = `
            <div style="background:white;padding:32px 24px;border-radius:32px;width:90%;max-width:400px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.2);transform:scale(0.95);animation:slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
                <div style="width:72px;height:72px;background:linear-gradient(135deg, var(--primary-100), var(--primary-200));border-radius:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:var(--primary-600);font-size:2.5rem;box-shadow:0 8px 16px rgba(99,102,241,0.2);">
                    <i class="fas fa-heart-pulse" style="animation:pulse 2s infinite;"></i>
                </div>
                <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:12px;color:var(--text-primary);letter-spacing:-0.5px;">Sinkronisasi Tubuh & Pikiran</h3>
                <p style="color:var(--text-secondary);margin-bottom:32px;font-size:1rem;line-height:1.6;">${message}</p>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <button id="btnAccept" class="btn btn-primary" style="width:100%;padding:16px;font-size:1.1rem;border-radius:16px;justify-content:center;background:linear-gradient(135deg, var(--primary-500), var(--primary-600));border:none;box-shadow:0 8px 16px rgba(99,102,241,0.3);">Ya, Tentu Saja</button>
                    <button id="btnDismiss" class="btn btn-outline" style="width:100%;padding:16px;font-size:1.1rem;border-radius:16px;justify-content:center;border-color:var(--border-color);color:var(--text-tertiary);">Nanti Saja</button>
                </div>
            </div>
            <style>
                @keyframes slideUp { 
                    from { opacity: 0; transform: translateY(20px) scale(0.95); } 
                    to { opacity: 1; transform: translateY(0) scale(1); } 
                }
            </style>
        `;

        document.body.appendChild(overlay);

        document.getElementById('btnDismiss').onclick = () => {
            overlay.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => overlay.remove(), 300);
        };
        document.getElementById('btnAccept').onclick = () => {
            overlay.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => overlay.remove(), 300);
            if(onAccept) onAccept();
        };
    },

    async logInterventionToDB(type) {
        const user = auth?.currentUser;
        if (user && typeof db !== 'undefined') {
            try {
                await db.collection('interventions').add({
                    userId: user.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    type: type,
                    baselineState: this.baseline
                });
            } catch (e) { console.error("Failed to log intervention:", e); }
        }
    }
};

window.InterventionEngine = InterventionEngine;
