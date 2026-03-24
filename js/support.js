/**
 * SYNAWATCH - Support Hub Module
 */

const SupportHub = {
    initSupportHub() {
        console.log("Support Hub Initialized");
        const state = App.getInterventionState ? App.getInterventionState() : {};
        
        let container = document.getElementById('supportContent');
        if (!container) return;
        
        const emergencyTriggered = sessionStorage.getItem('support_emergency_trigger');
        if (emergencyTriggered) {
            sessionStorage.removeItem('support_emergency_trigger');
        }

        // Show emergency banner if high risk
        let warning = '';
        if (state.phq9Score >= 15 || emergencyTriggered) {
            warning = `
                <div style="background:var(--danger-100);padding:16px;border-radius:12px;margin-bottom:20px;border-left:4px solid var(--danger-500);animation: pulse 2s infinite;">
                    <h4 style="color:var(--danger-700);margin-bottom:8px;"><i class="fas fa-exclamation-triangle"></i> Peringatan Sistem: Beban Emosional Tinggi</h4>
                    <p style="color:var(--danger-600);font-size:0.9rem;">Analisis bio-sensor mendeteksi tingkat stres kritis. Mode Keselamatan telah diaktifkan. Mohon hubungi layanan profesional.</p>
                </div>
            `;
        }

        container.innerHTML = `
            ${warning}
            <div class="card" style="margin-bottom:16px;">
                <h3 style="margin-bottom:12px;font-size:1.1rem;"><i class="fas fa-phone-alt" style="color:var(--danger-500);"></i> Hotline Darurat (24/7)</h3>
                <div style="background:#f8fafc;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <div>
                        <strong>Layanan Sejiwa (119 ext 8)</strong>
                        <div style="font-size:0.8rem;color:var(--text-tertiary);">Kemenkes RI</div>
                    </div>
                    <a href="tel:119" class="btn btn-primary btn-sm" id="btnCallEmergency"><i class="fas fa-phone"></i> Hubungi</a>
                </div>
            </div>
            <div class="card" style="margin-bottom:16px;">
                <h3 style="margin-bottom:12px;font-size:1.1rem;"><i class="fas fa-shield-alt" style="color:var(--warning-500);"></i> Rencana Keselamatan (Safety Plan)</h3>
                <ol style="margin-left: 16px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                    <li>Lakukan pernapasan 4-7-8 untuk menenangkan diri</li>
                    <li>Hubungi kontak darurat pribadi Anda</li>
                    <li>Alihkan perhatian dengan mendengarkan musik di Mood Booster</li>
                    <li>Bicarakan perasaan Anda dengan Dr. Synachat</li>
                </ol>
                <button class="btn btn-outline" style="width:100%;justify-content:center;margin-top:12px;" onclick="Router.navigate('mindful')">Mulai Latihan Pernapasan</button>
            </div>
            <div class="card">
                <h3 style="margin-bottom:12px;font-size:1.1rem;"><i class="fas fa-user-md" style="color:var(--primary-500);"></i> Psikolog Mitra</h3>
                <p style="font-size:0.9rem;color:var(--text-tertiary);margin-bottom:12px;">Dapatkan sesi konseling langsung lewat jadwal berikut:</p>
                <button class="btn btn-outline" style="width:100%;justify-content:center;"><i class="fas fa-calendar-alt"></i> Pesan Jadwal</button>
            </div>
        `;

        if (emergencyTriggered) {
             this.showEmergencyTimer();
        }
    },

    showEmergencyTimer() {
        if (document.querySelector('.emergency-timer-modal')) return;

        const overlay = document.createElement('div');
        overlay.className = 'intervention-modal-overlay emergency-timer-modal';
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(239,68,68,0.2);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:9999;animation:fadeIn 0.3s;';
        
        let timeLeft = 10;
        
        overlay.innerHTML = `
            <div style="background:white;padding:32px 24px;border-radius:32px;width:90%;max-width:400px;text-align:center;box-shadow:0 20px 40px rgba(239,68,68,0.3);transform:scale(0.95);animation:slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
                <div style="width:72px;height:72px;background:var(--danger-100);border-radius:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:var(--danger-500);font-size:2.5rem;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:12px;color:var(--danger-700);letter-spacing:-0.5px;">Bantuan Darurat Otomatis</h3>
                <p style="color:var(--text-secondary);margin-bottom:20px;font-size:1rem;line-height:1.6;">Menghubungi layanan darurat 119 dalam <strong id="emergencyCountdown" style="color:var(--danger-500);font-size:1.2rem;">${timeLeft}</strong> detik...</p>
                <div style="display:flex;flex-direction:column;gap:12px;">
                    <a href="tel:119" id="btnCallNow" class="btn" style="width:100%;padding:16px;font-size:1.1rem;border-radius:16px;justify-content:center;background:var(--danger-500);color:white;text-decoration:none;">Hubungi Sekarang</a>
                    <button id="btnCancelEmergency" class="btn btn-outline" style="width:100%;padding:16px;font-size:1.1rem;border-radius:16px;justify-content:center;border-color:var(--border-color);color:var(--text-tertiary);">Saya Baik-Baik Saja (Batal)</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const timerId = setInterval(() => {
            timeLeft--;
            const countEl = document.getElementById('emergencyCountdown');
            if (countEl) countEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                window.location.href = 'tel:119';
                closeModal();
            }
        }, 1000);

        function closeModal() {
            clearInterval(timerId);
            overlay.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => overlay.remove(), 300);
        }

        document.getElementById('btnCancelEmergency').onclick = closeModal;
        document.getElementById('btnCallNow').onclick = closeModal;
    }
};

window.SupportHub = SupportHub;
