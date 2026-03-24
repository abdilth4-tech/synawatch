/**
 * SYNAWATCH - SPA Application
 * Main application entry point
 */

const App = {
    currentUser: null,
    initialized: false,

    /**
     * Initialize the application
     */
    async init() {
        if (this.initialized) return;

        console.log('Initializing SYNAWATCH SPA...');

        // Wait for Firebase auth
        await this.waitForAuth();

        // Setup router
        this.setupRouter();

        // Setup navigation
        this.setupNavigation();

        // Initialize BLE if available
        if (typeof BLEConnection !== 'undefined') {
            BLEConnection.onDataUpdate(this.handleBLEData.bind(this));
            BLEConnection.onConnectionChange(this.handleBLEConnection.bind(this));
        }

        // Update time
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);

        this.initialized = true;
        console.log('SYNAWATCH SPA initialized');
    },

    /**
     * Wait for Firebase authentication
     */
    waitForAuth() {
        return new Promise((resolve) => {
            if (typeof auth === 'undefined') {
                resolve();
                return;
            }

            const unsubscribe = auth.onAuthStateChanged(async (user) => {
                this.currentUser = user;
                
                // Check onboarding status
                if (user && typeof db !== 'undefined') {
                    try {
                        const userDoc = await db.collection('users').doc(user.uid).get();
                        if (!userDoc.exists || !userDoc.data().onboardingCompleted) {
                            setTimeout(() => {
                                Router.navigate('assessment', true);
                            }, 100);
                        }
                    } catch (e) {
                        console.error('Failed to get user data:', e);
                    }
                }
                
                unsubscribe();
                resolve();
            });
        });
    },

    /**
     * Setup the router with all routes
     */
    setupRouter() {
        // Register routes
        Router.register('assessment', () => {
            Router.render(Views.assessment());
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.style.display = 'none'; // Hide nav during assessment
        });

        Router.register('dashboard', () => {
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.style.display = 'flex';
            Router.render(Views.dashboard());
            this.initDashboardView();
        });

        Router.register('health', () => {
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.style.display = 'flex';
            Router.render(Views.health());
            this.initHealthView();
        });

        Router.register('analytics', () => {
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.style.display = 'flex';
            Router.render(Views.analytics());
            this.initAnalyticsView();
        });

        Router.register('profile', () => {
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.style.display = 'flex';
            Router.render(Views.profile());
            this.initProfileView();
        });

        Router.register('synachat', () => {
            const nav = document.querySelector('.bottom-nav');
            if (nav) nav.style.display = 'flex';
            Router.render(Views.synachat());
            this.initSynachatView();
        });

        // Initialize router
        Router.init();
    },

    /**
     * Setup navigation
     */
    setupNavigation() {
        // Create bottom navigation
        const nav = document.createElement('nav');
        nav.className = 'bottom-nav';
        nav.innerHTML = `
            <a class="nav-item" data-route="dashboard">
                <div class="nav-icon">
                    <i class="fas fa-home"></i>
                </div>
                <span class="nav-label">Home</span>
            </a>
            <a class="nav-item" data-route="health">
                <div class="nav-icon">
                    <i class="fas fa-heartbeat"></i>
                </div>
                <span class="nav-label">Health</span>
            </a>
            <a class="nav-item" data-route="analytics">
                <div class="nav-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <span class="nav-label">Analytics</span>
            </a>
            <a class="nav-item" data-route="synachat">
                <div class="nav-icon">
                    <i class="fas fa-comments"></i>
                </div>
                <span class="nav-label">AI Chat</span>
            </a>
            <a class="nav-item" data-route="profile">
                <div class="nav-icon">
                    <i class="fas fa-user"></i>
                </div>
                <span class="nav-label">Profile</span>
            </a>
        `;
        document.body.appendChild(nav);

        // Update active state based on current route
        Router.updateNavigation();
    },

    /**
     * Update time display
     */
    updateTime() {
        const timeEl = document.getElementById('currentTime');
        if (timeEl) {
            const now = new Date();
            timeEl.textContent = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },

    /**
     * Handle BLE connection changes
     */
    handleBLEConnection(connected) {
        // Update BLE indicator
        const indicator = document.getElementById('bleIndicator');
        const bleBtn = document.getElementById('bleConnectBtn');
        const bleStatus = bleBtn?.querySelector('.ble-status');

        if (indicator) {
            indicator.className = connected ? 'ble-indicator connected' : 'ble-indicator disconnected';
        }
        if (bleStatus) {
            bleStatus.textContent = connected ? 'Connected' : 'Connect';
        }

        // Update dashboard chart mode (if on dashboard)
        if (typeof setLiveMode === 'function') {
            setLiveMode(connected);
        }
    },

    /**
     * Handle BLE data updates
     */
    handleBLEData(data) {
        // Update UI elements if they exist
        this.updateElementText('hrValue', data.finger ? data.hr : '--');
        this.updateElementText('spo2Value', data.finger ? data.spo2 : '--');
        this.updateElementText('btValue', data.bt ? data.bt.toFixed(1) : '--');
        this.updateElementText('atValue', data.at ? data.at.toFixed(1) : '--');
        this.updateElementText('stressValue', data.stress + '%');
        this.updateElementText('gsrValue', data.gsr + '%');

        // Update live value displays on dashboard charts
        this.updateElementText('hrLiveValue', data.finger && data.hr > 0 ? `${data.hr} BPM` : '-- BPM');
        this.updateElementText('stressLiveValue', `${data.stress}%`);
        this.updateElementText('gsrLiveValue', `${data.gsr}%`);

        // Update progress bars
        this.updateProgressBar('stressBar', data.stress);
        this.updateProgressBar('gsrBar', data.gsr);

        // Update activity
        if (typeof Utils !== 'undefined') {
            this.updateElementText('actValue', Utils.getActivityLabel(data.act));
            const actIcon = document.getElementById('actIcon');
            if (actIcon) {
                actIcon.className = 'fas ' + Utils.getActivityIcon(data.act);
            }
        }

        // Update finger status
        const fingerEl = document.getElementById('fingerStatus');
        if (fingerEl) {
            if (fingerEl.querySelector('span')) {
                fingerEl.querySelector('span').textContent = data.finger ? 'Finger detected' : 'Place finger on sensor';
            } else {
                fingerEl.textContent = data.finger ? 'Detected' : 'Not Detected';
                fingerEl.style.color = data.finger ? 'var(--success-400)' : 'var(--danger-400)';
            }
        }

        // Update context for Synachat
        this.updateElementText('contextHr', data.finger ? data.hr : '--');
        this.updateElementText('contextSpo2', data.finger ? data.spo2 : '--');
        this.updateElementText('contextStress', data.stress);
        this.updateElementText('contextGsr', data.gsr);

        // Call handleDataUpdate from dashboard.js to update charts (if on dashboard)
        if (typeof handleDataUpdate === 'function') {
            handleDataUpdate(data);
        }
        this.updateElementText('contextTemp', data.bt ? data.bt.toFixed(1) : '--');
    },

    /**
     * Helper to update element text
     */
    updateElementText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    },

    /**
     * Helper to update progress bar
     */
    updateProgressBar(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.style.width = value + '%';
        }
    },

    /**
     * Initialize Dashboard View
     */
    initDashboardView() {
        // Set greeting
        const greetingEl = document.getElementById('greeting');
        const userNameEl = document.getElementById('userName');

        if (greetingEl) {
            const hour = new Date().getHours();
            let greeting = 'Good Evening';
            if (hour < 12) greeting = 'Good Morning';
            else if (hour < 17) greeting = 'Good Afternoon';
            greetingEl.textContent = greeting + ' 👋';
        }

        if (userNameEl && this.currentUser) {
            userNameEl.textContent = this.currentUser.displayName || this.currentUser.email?.split('@')[0] || 'User';
        }

        // Initialize charts from dashboard.js
        if (typeof initCharts === 'function') {
            initCharts();
        }

        // Start demo animation if not connected
        if (typeof BLEConnection !== 'undefined' && !BLEConnection.isConnected()) {
            if (typeof startDemoAnimation === 'function') {
                startDemoAnimation();
            }
        }
    },

    /**
     * Initialize Health View
     */
    initHealthView() {
        // Initialize health page logic
        if (typeof initHealthPage === 'function') {
            initHealthPage();
        }

        // Initialize realtime charts
        if (typeof initRealtimeCharts === 'function') {
            initRealtimeCharts();
        }
    },

    /**
     * Initialize Analytics View
     */
    initAnalyticsView() {
        // Set current date
        const dateEl = document.getElementById('currentDate');
        if (dateEl) {
            dateEl.textContent = new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        }

        // Initialize analytics
        if (typeof initAnalyticsPage === 'function') {
            initAnalyticsPage();
        }
    },

    /**
     * Initialize Profile View
     */
    initProfileView() {
        if (this.currentUser) {
            this.updateElementText('profileName', this.currentUser.displayName || 'User');
            this.updateElementText('profileEmail', this.currentUser.email || '');

            // Set avatar
            const avatarContainer = document.getElementById('avatarContainer');
            if (avatarContainer && this.currentUser.photoURL) {
                avatarContainer.innerHTML = `<img src="${this.currentUser.photoURL}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
            }

            // Set joined date
            const joinedEl = document.getElementById('profileJoined');
            if (joinedEl && this.currentUser.metadata?.creationTime) {
                const joinDate = new Date(this.currentUser.metadata.creationTime);
                joinedEl.textContent = `Joined ${joinDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`;
            }
        }

        // Load stats from Firebase
        this.loadProfileStats();

        // Initialize weekly chart
        this.initWeeklyChart();
    },

    /**
     * Load profile statistics
     */
    async loadProfileStats() {
        try {
            const user = auth?.currentUser;
            if (!user) return;

            const stats = await FirebaseService.getUserStatistics(user.uid);

            this.updateElementText('daysActive', stats.daysActive || 0);
            this.updateElementText('totalSessions', stats.totalSessions || 0);
            this.updateElementText('healthScore', stats.avgHealthScore || '--');

            // Format total time
            const hours = Math.floor((stats.totalDuration || 0) / 3600);
            const minutes = Math.floor(((stats.totalDuration || 0) % 3600) / 60);
            this.updateElementText('totalTime', hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`);
        } catch (error) {
            console.error('Error loading profile stats:', error);
        }
    },

    /**
     * Initialize weekly chart
     */
    initWeeklyChart() {
        const ctx = document.getElementById('weeklyChart');
        if (!ctx || typeof Chart === 'undefined') return;

        // Generate demo data for weekly chart
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const data = labels.map(() => Math.floor(Math.random() * 30) + 60);

        new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Health Score',
                    data: data,
                    backgroundColor: data.map(v => {
                        if (v >= 80) return 'rgba(16, 185, 129, 0.8)';
                        if (v >= 60) return 'rgba(139, 92, 246, 0.8)';
                        return 'rgba(251, 191, 36, 0.8)';
                    }),
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: 'rgba(107, 114, 128, 0.8)', font: { size: 11 } }
                    },
                    y: {
                        min: 0,
                        max: 100,
                        grid: { color: 'rgba(107, 114, 128, 0.1)' },
                        ticks: { color: 'rgba(107, 114, 128, 0.8)', font: { size: 10 } }
                    }
                }
            }
        });
    },

    /**
     * Initialize Synachat View with 3D Avatar
     */
    initSynachatView() {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            if (typeof initSynachat === 'function') {
                initSynachat();
            }
        }, 100);
    },

    /**
     * Cleanup previous view before switching
     */
    cleanupPreviousView(previousRoute) {
        // Cleanup synachat if leaving that view
        if (previousRoute === 'synachat' && typeof cleanupSynachat === 'function') {
            cleanupSynachat();
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    if (typeof auth !== 'undefined') {
        auth.onAuthStateChanged((user) => {
            if (user) {
                App.init();
            } else {
                // Redirect to auth page
                window.location.href = 'auth.html';
            }
        });
    } else {
        App.init();
    }
});

// Handle authenticated event
document.addEventListener('authenticated', () => {
    App.init();
});

// Make it globally available
window.App = App;

/**
 * Confirm logout with modal
 */
function confirmLogout() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'logout-modal-overlay';
    overlay.innerHTML = `
        <div class="logout-modal">
            <div class="logout-modal-icon">
                <i class="fas fa-sign-out-alt"></i>
            </div>
            <h3>Logout</h3>
            <p>Are you sure you want to logout from SYNAWATCH?</p>
            <div class="logout-modal-buttons">
                <button class="btn btn-secondary" onclick="closeLogoutModal()">Cancel</button>
                <button class="btn btn-danger" onclick="performLogout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });
}

/**
 * Close logout modal
 */
function closeLogoutModal() {
    const overlay = document.querySelector('.logout-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    }
}

/**
 * Perform logout
 */
async function performLogout() {
    try {
        if (typeof Auth !== 'undefined') {
            const result = await Auth.logout();
            if (result.success) {
                window.location.href = 'auth.html';
            } else {
                Utils.showToast('Failed to logout', 'error');
                closeLogoutModal();
            }
        } else if (typeof auth !== 'undefined') {
            await auth.signOut();
            window.location.href = 'auth.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
        Utils.showToast('Failed to logout', 'error');
        closeLogoutModal();
    }
}

/**
 * Open Edit Profile Modal
 */
function openEditProfile() {
    Utils.showToast('Edit Profile coming soon!', 'info');
}

/**
 * Open Change Password Modal
 */
function openChangePassword() {
    Utils.showToast('Change Password coming soon!', 'info');
}

// Make functions globally available
window.confirmLogout = confirmLogout;
window.closeLogoutModal = closeLogoutModal;
window.performLogout = performLogout;
window.openEditProfile = openEditProfile;
window.openChangePassword = openChangePassword;
