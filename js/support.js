/**
 * SYNAWATCH - Support Hub Module
 */

const SupportHub = {
    initSupportHub() {
        console.log("Support Hub Initialized");
        const state = App.getInterventionState ? App.getInterventionState() : {};
        
        let container = document.getElementById('supportContent');
        if (!container) return;
        
        // Show emergency banner if high risk
        let warning = '';
        if (state.phq9Score >= 15) {
            warning = `
                <div style="background:var(--danger-100);padding:16px;border-radius:12px;margin-bottom:20px;border-left:4px solid var(--danger-500);">
                    <h4 style="color:var(--danger-700);margin-bottom:8px;"><i class="fas fa-exclamation-triangle"></i> Kami di sini untuk Anda</h4>
                    <p style="color:var(--danger-600);font-size:0.9rem;">Analisis menunjukkan layar beban emosional yang tinggi. Mohon jangan ragu untuk menghubungi layanan profesional.</p>
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
                    <a href="tel:119" class="btn btn-primary btn-sm"><i class="fas fa-phone"></i> Hubungi</a>
                </div>
            </div>
            <div class="card">
                <h3 style="margin-bottom:12px;font-size:1.1rem;"><i class="fas fa-user-md" style="color:var(--primary-500);"></i> Psikolog Mitra</h3>
                <p style="font-size:0.9rem;color:var(--text-tertiary);margin-bottom:12px;">Dapatkan sesi konseling langsung lewat jadwal berikut:</p>
                <button class="btn btn-outline" style="width:100%;justify-content:center;"><i class="fas fa-calendar-alt"></i> Pesan Jadwal</button>
            </div>
        `;
    }
};

window.SupportHub = SupportHub;
