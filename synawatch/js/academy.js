/**
 * SYNAWATCH - Syna Academy Module
 */

const Academy = {
    initAcademy() {
        console.log("Syna Academy Initialized");
        let container = document.getElementById('academyContent');
        if (!container) return;

        container.innerHTML = `
            <div style="margin-bottom:24px;">
                <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">Syna Academy</h2>
                <p style="color:var(--text-tertiary);">Pahami tubuh dan pikiranmu lebih dalam.</p>
            </div>
            
            <div style="display:grid;gap:16px;">
                <div class="card" style="cursor:pointer;" onclick="Utils.showToast('Membaca artikel...','info')">
                    <div style="display:flex;gap:16px;align-items:center;">
                        <div style="width:60px;height:60px;background:var(--primary-100);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--primary-600);font-size:1.5rem;"><i class="fas fa-heartbeat"></i></div>
                        <div>
                            <h4 style="font-size:1.05rem;font-weight:600;">Mengapa Heart Rate Naik Saat Stres?</h4>
                            <p style="font-size:0.8rem;color:var(--text-tertiary);margin-top:4px;">Waktu baca: 3 Menit</p>
                        </div>
                    </div>
                </div>
                <div class="card" style="cursor:pointer;" onclick="Utils.showToast('Membaca artikel...','info')">
                    <div style="display:flex;gap:16px;align-items:center;">
                        <div style="width:60px;height:60px;background:var(--info-100);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--info-600);font-size:1.5rem;"><i class="fas fa-lungs"></i></div>
                        <div>
                            <h4 style="font-size:1.05rem;font-weight:600;">Pentingnya SpO2 untuk Kualitas Tidur</h4>
                            <p style="font-size:0.8rem;color:var(--text-tertiary);margin-top:4px;">Waktu baca: 4 Menit</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

window.Academy = Academy;
