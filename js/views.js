/**
 * SYNAWATCH - SPA Views
 * Contains all view templates for the application
 */

const Views = {
    /**
     * Dashboard View
     */
    dashboard() {
        return `
            <div class="view-container">
                <!-- Greeting Section -->
                <div class="greeting-section">
                    <h2 id="greeting"></h2>
                    <p id="userName"></p>
                </div>

                <!-- Health Score Card -->
                <div class="featured-card">
                    <div class="content" style="display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <p style="font-size: var(--text-sm); opacity: 0.9; margin-bottom: var(--space-1); color: rgba(255,255,255,0.8);">Today's Health Score</p>
                            <div style="display: flex; align-items: baseline; gap: var(--space-2);">
                                <span id="healthScore" style="font-size: var(--text-4xl); font-weight: 800; color: white;">--</span>
                                <span style="font-size: var(--text-sm); color: rgba(255,255,255,0.7);">/100</span>
                            </div>
                        </div>
                        <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.15); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-shield-heart" style="font-size: var(--text-2xl); color: white;"></i>
                        </div>
                    </div>
                </div>

                <!-- Current Health Metrics -->
                <h3 class="section-title">Current Health</h3>
                <div class="card-grid">
                    <!-- Heart Rate -->
                    <div class="card metric-card">
                        <div class="metric-icon danger">
                            <i class="fas fa-heart pulse"></i>
                        </div>
                        <div class="metric-value">
                            <span id="hrValue">--</span>
                            <span class="metric-unit">BPM</span>
                        </div>
                        <div class="metric-label">Heart Rate</div>
                        <span id="hrStatus" class="metric-status gray">No Data</span>
                    </div>

                    <!-- SpO2 -->
                    <div class="card metric-card">
                        <div class="metric-icon info">
                            <i class="fas fa-lungs"></i>
                        </div>
                        <div class="metric-value">
                            <span id="spo2Value">--</span>
                            <span class="metric-unit">%</span>
                        </div>
                        <div class="metric-label">SpO2</div>
                        <span id="spo2Status" class="metric-status gray">No Data</span>
                    </div>

                    <!-- Stress Level -->
                    <div class="card metric-card">
                        <div class="metric-icon warning">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="metric-value">
                            <span id="stressValue">0%</span>
                        </div>
                        <div class="metric-label">Stress Level</div>
                        <span id="stressLabel" class="metric-status success" style="margin-bottom: var(--space-2);">Rendah</span>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div id="stressBar" class="progress-fill" style="width: 0%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- GSR -->
                    <div class="card metric-card">
                        <div class="metric-icon primary">
                            <i class="fas fa-hand"></i>
                        </div>
                        <div class="metric-value">
                            <span id="gsrValue">0%</span>
                        </div>
                        <div class="metric-label">GSR Activity</div>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div id="gsrBar" class="progress-fill" style="width: 0%;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Real-time Charts -->
                <h3 class="section-title">
                    Real-time Charts
                    <span id="chartStatus" class="chart-status-badge demo">
                        <i class="fas fa-circle"></i> Demo
                    </span>
                </h3>

                <div class="chart-container chart-hr">
                    <div class="chart-animated-icon hr-icon">
                        <i class="fas fa-heart"></i>
                        <div class="pulse-ring"></div>
                        <div class="pulse-ring delay"></div>
                    </div>
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-heart-pulse" style="color: var(--danger-400);"></i>
                            Heart Rate
                            <span id="hrLiveValue" class="live-value">-- BPM</span>
                        </span>
                    </div>
                    <div class="chart-canvas">
                        <canvas id="hrChart"></canvas>
                    </div>
                </div>

                <div class="chart-container chart-stress">
                    <div class="chart-animated-icon stress-icon">
                        <i class="fas fa-brain"></i>
                        <div class="wave-effect"></div>
                    </div>
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-brain" style="color: var(--warning-400);"></i>
                            Stress Level
                            <span id="stressLiveValue" class="live-value">--%</span>
                        </span>
                    </div>
                    <div class="chart-canvas">
                        <canvas id="stressChart"></canvas>
                    </div>
                </div>

                <div class="chart-container chart-gsr">
                    <div class="chart-animated-icon gsr-icon">
                        <i class="fas fa-hand-sparkles"></i>
                        <div class="sparkle s1"></div>
                        <div class="sparkle s2"></div>
                        <div class="sparkle s3"></div>
                    </div>
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-hand" style="color: var(--primary-400);"></i>
                            GSR Activity
                            <span id="gsrLiveValue" class="live-value">--%</span>
                        </span>
                    </div>
                    <div class="chart-canvas">
                        <canvas id="gsrChart"></canvas>
                    </div>
                </div>

                <!-- Additional Metrics -->
                <h3 class="section-title">Additional Metrics</h3>
                <div class="card-grid">
                    <div class="card metric-card">
                        <div class="metric-icon success">
                            <i class="fas fa-temperature-half"></i>
                        </div>
                        <div class="metric-value">
                            <span id="btValue">--</span>
                            <span class="metric-unit">°C</span>
                        </div>
                        <div class="metric-label">Body Temp</div>
                    </div>

                    <div class="card metric-card">
                        <div class="metric-icon info">
                            <i class="fas fa-cloud-sun"></i>
                        </div>
                        <div class="metric-value">
                            <span id="atValue">--</span>
                            <span class="metric-unit">°C</span>
                        </div>
                        <div class="metric-label">Ambient Temp</div>
                    </div>

                    <div class="card metric-card">
                        <div class="metric-icon primary">
                            <i id="actIcon" class="fas fa-person"></i>
                        </div>
                        <div class="metric-value" style="font-size: var(--text-lg);">
                            <span id="actValue">Resting</span>
                        </div>
                        <div class="metric-label">Activity</div>
                    </div>

                    <div class="card metric-card">
                        <div class="metric-icon success">
                            <i class="fas fa-fingerprint"></i>
                        </div>
                        <div class="metric-value" style="font-size: var(--text-sm);">
                            <span id="fingerStatus" style="color: var(--danger-400);">Not Detected</span>
                        </div>
                        <div class="metric-label">Finger Detection</div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div style="margin-top: var(--space-6); display: flex; gap: var(--space-3); flex-wrap: wrap;">
                    <button class="btn btn-primary btn-sm" data-route="health">
                        <i class="fas fa-heartbeat"></i>
                        Start Monitoring
                    </button>
                    <button class="btn btn-secondary btn-sm" data-route="synachat">
                        <i class="fas fa-comments"></i>
                        Talk to AI
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Health View
     */
    health() {
        return `
            <div class="view-container">
                <!-- BLE Connection Card -->
                <div id="bleCard" class="ble-card">
                    <i class="fas fa-bluetooth"></i>
                    <h3>Connect to SYNAWATCH</h3>
                    <p>Connect to your smartwatch via Bluetooth to start monitoring</p>
                    <button class="btn btn-primary" onclick="BLEConnection.toggle()">
                        <i class="fas fa-link"></i>
                        Connect Device
                    </button>
                </div>

                <!-- Heart Rate Hero -->
                <div class="health-hero">
                    <i class="fas fa-heart pulse" style="font-size: 2.5rem; margin-bottom: var(--space-3);"></i>
                    <div class="big-value"><span id="hrValue">--</span></div>
                    <div class="label">BPM - Heart Rate</div>
                    <div id="fingerStatus" style="margin-top: var(--space-3); font-size: var(--text-sm); display: flex; align-items: center; justify-content: center; gap: var(--space-2); opacity: 0.9;">
                        <i class="fas fa-fingerprint"></i>
                        <span>Place finger on sensor</span>
                    </div>
                </div>

                <!-- Current Metrics -->
                <div class="card-grid">
                    <div class="card metric-card">
                        <div class="metric-icon info">
                            <i class="fas fa-lungs"></i>
                        </div>
                        <div class="metric-value">
                            <span id="spo2Value">--</span>
                            <span class="metric-unit">%</span>
                        </div>
                        <div class="metric-label">SpO2</div>
                        <span id="spo2Status" class="metric-status gray">No Data</span>
                    </div>

                    <div class="card metric-card">
                        <div class="metric-icon success">
                            <i class="fas fa-temperature-half"></i>
                        </div>
                        <div class="metric-value">
                            <span id="btValue">--</span>
                            <span class="metric-unit">°C</span>
                        </div>
                        <div class="metric-label">Body Temp</div>
                    </div>
                </div>

                <!-- Stress & GSR Section -->
                <h3 class="section-title">Stress & Emotional State</h3>

                <div class="card" style="margin-bottom: var(--space-4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                        <div>
                            <h4 style="font-size: var(--text-base); font-weight: var(--font-semibold); margin-bottom: var(--space-1); color: var(--text-primary);">Stress Level</h4>
                            <span id="stressStatus" class="metric-status success">Low</span>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--text-primary);">
                                <span id="stressValue">0</span>%
                            </div>
                            <div id="stressLabel" style="font-size: var(--text-sm); font-weight: var(--font-semibold); color: var(--success-400);">Rendah</div>
                        </div>
                    </div>
                    <div class="progress-bar" style="height: 10px;">
                        <div id="stressBar" class="progress-fill" style="width: 0%;"></div>
                    </div>
                    <!-- Activity Status -->
                    <div style="margin-top: var(--space-4); display: flex; align-items: center; gap: var(--space-3); padding: var(--space-3); background: var(--bg-tertiary); border-radius: var(--radius-lg);">
                        <div style="width: 40px; height: 40px; background: rgba(99, 102, 241, 0.15); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center;">
                            <i id="actIcon" class="fas fa-person" style="font-size: var(--text-lg); color: var(--primary-400);"></i>
                        </div>
                        <div>
                            <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Activity Status</div>
                            <div id="actValue" style="font-weight: var(--font-semibold); color: var(--text-primary);">Resting</div>
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-bottom: var(--space-6);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                        <div>
                            <h4 style="font-size: var(--text-base); font-weight: var(--font-semibold); margin-bottom: var(--space-1); color: var(--text-primary);">GSR (Sweat Activity)</h4>
                            <span id="gsrStatusBadge" class="metric-status success">Relaxed</span>
                        </div>
                        <div style="font-size: var(--text-3xl); font-weight: var(--font-bold); color: var(--text-primary);">
                            <span id="gsrValue">0</span>%
                        </div>
                    </div>
                    <div class="progress-bar" style="height: 10px;">
                        <div id="gsrBar" class="progress-fill" style="width: 0%;"></div>
                    </div>
                </div>

                <!-- Auto Recording Status -->
                <div id="autoRecordStatus" class="card" style="margin-bottom: var(--space-4); display: none;">
                    <div style="display: flex; align-items: center; gap: var(--space-3);">
                        <div style="width: 12px; height: 12px; background: var(--danger-500); border-radius: 50%; animation: blink 1s ease-in-out infinite;"></div>
                        <div style="flex: 1;">
                            <div style="font-weight: var(--font-semibold); color: var(--text-primary); font-size: var(--text-sm);">Auto Recording</div>
                            <div style="font-size: var(--text-xs); color: var(--text-tertiary);">Data disimpan otomatis ke cloud</div>
                        </div>
                        <div style="text-align: right;">
                            <div id="recordingTimer" style="font-size: var(--text-lg); font-weight: var(--font-bold); color: var(--primary-400);">00:00</div>
                            <div id="recordingCount" style="font-size: var(--text-xs); color: var(--text-tertiary);">0 readings</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Analytics View
     */
    analytics() {
        return `
            <div class="view-container">
                <!-- Period Filter -->
                <div class="filter-tabs" style="margin-bottom: var(--space-4);">
                    <button class="filter-tab active" onclick="changeChartPeriod('day', this)">Today</button>
                    <button class="filter-tab" onclick="changeChartPeriod('week', this)">This Week</button>
                    <button class="filter-tab" onclick="changeChartPeriod('month', this)">This Month</button>
                </div>

                <!-- Heart Rate Chart -->
                <div class="chart-container">
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-heart-pulse" style="color: var(--danger-500);"></i>
                            Heart Rate Trends
                        </span>
                        <span id="hrAvgStat" class="stat-badge">Avg: -- BPM</span>
                    </div>
                    <div class="chart-canvas" style="height: 200px;">
                        <canvas id="hrTrendChart"></canvas>
                    </div>
                </div>

                <!-- Stress Chart -->
                <div class="chart-container">
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-brain" style="color: var(--warning-500);"></i>
                            Stress Level Pattern
                        </span>
                        <span id="stressAvgStat" class="stat-badge">Avg: --%</span>
                    </div>
                    <div class="chart-canvas" style="height: 200px;">
                        <canvas id="stressTrendChart"></canvas>
                    </div>
                </div>

                <!-- GSR Chart -->
                <div class="chart-container">
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-hand" style="color: var(--primary-500);"></i>
                            GSR Activity Pattern
                        </span>
                        <span id="gsrAvgStat" class="stat-badge">Avg: --%</span>
                    </div>
                    <div class="chart-canvas" style="height: 200px;">
                        <canvas id="gsrTrendChart"></canvas>
                    </div>
                </div>

                <!-- SpO2 Chart -->
                <div class="chart-container">
                    <div class="chart-header">
                        <span class="chart-title">
                            <i class="fas fa-lungs" style="color: var(--info-500);"></i>
                            SpO2 Trends
                        </span>
                        <span id="spo2AvgStat" class="stat-badge">Avg: --%</span>
                    </div>
                    <div class="chart-canvas" style="height: 200px;">
                        <canvas id="spo2TrendChart"></canvas>
                    </div>
                </div>

                <!-- Daily Summary -->
                <h3 class="section-title">Daily Summary</h3>
                <div class="card-grid">
                    <div class="card metric-card">
                        <div class="metric-icon danger">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="metric-value" id="avgHr">--</div>
                        <div class="metric-label">Avg Heart Rate</div>
                    </div>
                    <div class="card metric-card">
                        <div class="metric-icon warning">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="metric-value" id="avgStress">--</div>
                        <div class="metric-label">Avg Stress</div>
                    </div>
                    <div class="card metric-card">
                        <div class="metric-icon info">
                            <i class="fas fa-lungs"></i>
                        </div>
                        <div class="metric-value" id="avgSpo2">--</div>
                        <div class="metric-label">Avg SpO2</div>
                    </div>
                    <div class="card metric-card">
                        <div class="metric-icon primary">
                            <i class="fas fa-hand"></i>
                        </div>
                        <div class="metric-value" id="avgGsr">--</div>
                        <div class="metric-label">Avg GSR</div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Profile View
     */
    profile() {
        return `
            <div class="view-container">
                <!-- Profile Header -->
                <div class="featured-card" style="text-align: center; margin: calc(var(--space-5) * -1) calc(var(--space-5) * -1) var(--space-6); border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);">
                    <div class="content">
                        <div id="avatarContainer" style="width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4); font-size: 2.5rem; color: white; border: 4px solid rgba(255,255,255,0.3);">
                            <i class="fas fa-user"></i>
                        </div>
                        <div id="profileName" style="font-size: var(--text-2xl); font-weight: var(--font-bold); color: white; margin-bottom: var(--space-1);">Loading...</div>
                        <div id="profileEmail" style="font-size: var(--text-sm); color: rgba(255,255,255,0.8);">...</div>
                        <div id="profileJoined" style="font-size: var(--text-xs); color: rgba(255,255,255,0.6); margin-top: var(--space-2);"></div>
                    </div>
                </div>

                <!-- Statistics -->
                <h3 class="section-title">Your Statistics</h3>
                <div class="card-grid">
                    <div class="card metric-card">
                        <div class="metric-icon primary">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div id="daysActive" class="metric-value">0</div>
                        <div class="metric-label">Days Active</div>
                    </div>
                    <div class="card metric-card">
                        <div class="metric-icon success">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <div id="totalSessions" class="metric-value">0</div>
                        <div class="metric-label">Total Sessions</div>
                    </div>
                    <div class="card metric-card">
                        <div class="metric-icon danger">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div id="healthScore" class="metric-value">--</div>
                        <div class="metric-label">Health Score</div>
                    </div>
                    <div class="card metric-card">
                        <div class="metric-icon info">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div id="totalTime" class="metric-value">0h</div>
                        <div class="metric-label">Total Time</div>
                    </div>
                </div>

                <!-- Weekly Chart -->
                <div class="card" style="margin-bottom: var(--space-6);">
                    <h3 style="font-size: var(--text-base); font-weight: var(--font-semibold); margin-bottom: var(--space-4); display: flex; align-items: center; gap: var(--space-2); color: var(--text-primary);">
                        <i class="fas fa-chart-line" style="color: var(--primary-400);"></i>
                        Weekly Health Score
                    </h3>
                    <div style="height: 160px;">
                        <canvas id="weeklyChart"></canvas>
                    </div>
                </div>

                <!-- Menu -->
                <div class="card" style="padding: 0; overflow: hidden; margin-bottom: var(--space-6);">
                    <div class="list-item" onclick="openEditProfile()">
                        <div class="list-item-icon" style="background: rgba(99, 102, 241, 0.15); color: var(--primary-400);">
                            <i class="fas fa-user-edit"></i>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-title">Edit Profile</div>
                            <div class="list-item-subtitle">Update your name and photo</div>
                        </div>
                        <i class="fas fa-chevron-right list-item-action"></i>
                    </div>
                    <div class="list-item" onclick="openChangePassword()">
                        <div class="list-item-icon" style="background: rgba(251, 191, 36, 0.15); color: var(--accent-400);">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-title">Change Password</div>
                            <div class="list-item-subtitle">Update your security credentials</div>
                        </div>
                        <i class="fas fa-chevron-right list-item-action"></i>
                    </div>
                    <div class="list-item" data-route="synachat">
                        <div class="list-item-icon" style="background: rgba(34, 197, 94, 0.15); color: var(--success-400);">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-title">Health Assistant</div>
                            <div class="list-item-subtitle">Chat with Dr. Synachat</div>
                        </div>
                        <i class="fas fa-chevron-right list-item-action"></i>
                    </div>
                </div>

                <div class="card" style="padding: 0; overflow: hidden; margin-bottom: var(--space-6);">
                    <div class="list-item" onclick="confirmLogout()" style="border-bottom: none;">
                        <div class="list-item-icon" style="background: rgba(239, 68, 68, 0.15); color: var(--danger-400);">
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-title" style="color: var(--danger-400);">Logout</div>
                            <div class="list-item-subtitle">Sign out of your account</div>
                        </div>
                    </div>
                </div>

                <!-- Version -->
                <div style="text-align: center; padding: var(--space-5); color: var(--text-muted); font-size: var(--text-xs);">
                    <p>SYNAWATCH v1.0.0</p>
                    <p>Made with <i class="fas fa-heart" style="color: var(--danger-400);"></i> for better health</p>
                </div>
            </div>
        `;
    },

    /**
     * Synachat View - Modern AI Assistant Interface
     */
    synachat() {
        return `
            <div class="synachat-container">
                <!-- 3D Avatar Section with Premium Gradient -->
                <div class="synachat-avatar-section">
                    <!-- Premium Background Effects -->
                    <div class="synachat-bg-effects">
                        <div class="bg-gradient"></div>
                        <div class="floating-icon icon-1"><i class="fas fa-heart-pulse"></i></div>
                        <div class="floating-icon icon-2"><i class="fas fa-shield-heart"></i></div>
                        <div class="floating-icon icon-3"><i class="fas fa-brain"></i></div>
                        <div class="floating-icon icon-4"><i class="fas fa-sparkles"></i></div>
                    </div>

                    <!-- 3D Canvas Container -->
                    <div id="avatarCanvas" class="avatar-canvas">
                        <div class="avatar-loading">
                            <div class="loading-spinner"></div>
                            <p>Initializing AI Assistant...</p>
                        </div>
                    </div>

                    <!-- Avatar Info Card - Glass Style -->
                    <div class="avatar-info">
                        <div class="avatar-name">
                            <i class="fas fa-sparkles"></i>
                            <span>Dr. Synachat</span>
                        </div>
                        <div class="avatar-status">
                            <span class="status-dot"></span>
                            <span id="avatarStatusText">Ready to help</span>
                        </div>
                    </div>

                    <!-- Voice Toggle - Glass Style -->
                    <button id="ttsToggle" class="tts-toggle active" onclick="toggleTTS()" aria-label="Toggle voice">
                        <i class="fas fa-volume-high"></i>
                    </button>
                </div>

                <!-- Chat Section - Clean White -->
                <div class="synachat-chat-section">
                    <!-- Health Context Bar - Minimal -->
                    <div id="healthContext" class="health-context-bar">
                        <div class="health-context-label">
                            <i class="fas fa-activity"></i>
                            Live Health
                        </div>
                        <div class="health-context-items">
                            <span><i class="fas fa-heart"></i> <span id="contextHr">--</span> bpm</span>
                            <span><i class="fas fa-droplet"></i> <span id="contextSpo2">--</span>%</span>
                            <span><i class="fas fa-wave-square"></i> <span id="contextStress">--</span>%</span>
                        </div>
                    </div>

                    <!-- Messages Container -->
                    <div id="messagesContainer" class="synachat-messages">
                        <!-- Welcome Message - Premium Design -->
                        <div id="welcomeMessage" class="welcome-message">
                            <div class="welcome-icon">
                                <i class="fas fa-robot"></i>
                            </div>
                            <h3>Hello, I'm Dr. Synachat</h3>
                            <p>Your personal AI health companion. I can analyze your vitals, offer wellness advice, and support your health journey.</p>
                            <div class="quick-actions">
                                <button class="quick-action" onclick="sendQuickMessage('Analyze my current heart rate')">
                                    <i class="fas fa-heart-pulse"></i>
                                    Heart Analysis
                                </button>
                                <button class="quick-action" onclick="sendQuickMessage('Help me manage my stress levels')">
                                    <i class="fas fa-spa"></i>
                                    Stress Relief
                                </button>
                                <button class="quick-action" onclick="sendQuickMessage('Give me personalized health tips')">
                                    <i class="fas fa-wand-magic-sparkles"></i>
                                    Health Tips
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Input Container - Floating Style -->
                    <div class="synachat-input-container">
                        <div class="input-wrapper">
                            <textarea
                                id="messageInput"
                                class="message-input"
                                placeholder="Ask me anything about your health..."
                                rows="1"
                                onkeydown="handleKeyDown(event)"
                                oninput="autoResize(this)"
                                aria-label="Type your message"
                            ></textarea>
                            <button id="sendBtn" class="send-btn" onclick="sendMessage()" aria-label="Send message">
                                <i class="fas fa-arrow-up"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Make it globally available
window.Views = Views;
