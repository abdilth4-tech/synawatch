/**
 * SYNAWATCH - Journaling
 */

const Journal = {
    init() {
        this.loadRecent();
    },

    async loadRecent() {
        const user = auth?.currentUser;
        if (!user || typeof db === 'undefined') return;
        try {
            const snps = await db.collection('journals').where('userId', '==', user.uid).orderBy('timestamp', 'desc').limit(3).get();
            const list = document.getElementById('journalList');
            if(list) {
                if(snps.empty) {
                    list.innerHTML = `<p style="color:var(--text-tertiary);text-align:center;">Belum ada jurnal.</p>`;
                } else {
                    let html = '';
                    snps.forEach(doc => {
                        html += `
                            <div style="background:var(--bg-secondary);padding:16px;border-radius:12px;margin-bottom:12px;">
                                <div style="font-size:0.8rem;color:var(--text-tertiary);margin-bottom:8px;">${new Date(doc.data().date).toLocaleString('id-ID')}</div>
                                <div style="color:var(--text-primary);">${doc.data().text}</div>
                            </div>
                        `;
                    });
                    list.innerHTML = html;
                }
            }
        } catch(e){ console.error(e); }
    },

    async save() {
        const text = document.getElementById('journalInput')?.value;
        if (!text || text.trim() === '') return Utils.showToast("Jurnal kosong!", "error");
        
        const user = auth?.currentUser;
        if (user && typeof db !== 'undefined') {
            try {
                await db.collection('journals').add({
                    userId: user.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    date: new Date().toISOString(),
                    text: text
                });
                Utils.showToast("Jurnal disimpan", "success");
                document.getElementById('journalInput').value = '';
                this.loadRecent();
            } catch(e) {
                Utils.showToast("Gagal menyimpan", "error");
            }
        }
    }
};

window.Journal = Journal;
