/**
 * SYNAWATCH - SPA Views
 * Contains all view templates for the application
 */

const Views = {
    /**
     * Assessment View (PHQ-9 & UCLA)
     */
    assessment() {
        return `
            <div class="view-container" style="max-width: 600px; margin: 0 auto; padding-top: 40px;">
                <div id="assessmentProgressWrapper" style="margin-bottom: 32px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);">Progres Evaluasi</span>
                    </div>
                    <div class="progress-bar" style="height: 8px; background: rgba(139, 92, 246, 0.1);">
                        <div id="assessmentProgress" class="progress-fill" style="width: 0%; background: var(--primary-500); transition: width 0.4s ease;"></div>
                    </div>
                </div>

                <div id="assessmentContent">
                    <div style="text-align: center; animation: fadeIn 0.5s;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: white; font-size: 2.5rem; box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <h2 style="font-size: var(--text-2xl); color: var(--text-primary); margin-bottom: 12px;">Selamat Datang!</h2>
                        <p style="color: var(--text-secondary); margin-bottom: 32px; line-height: 1.6;">Untuk mempersonalisasi SYNAWATCH sesuai dengan kondisi Anda, kami perlu menanyakan beberapa hal (PHQ-9 & UCLA Loneliness Scale). Data ini dijamin kerahasiaannya.</p>
                        <button class="btn btn-primary" style="width: 100%; justify-content: center; padding: 16px; font-size: 1.1rem;" onclick="Assessment.start()">Mulai Evaluasi</button>
                    </div>
                </div>
            </div>
        `;
    },

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

                <!-- Quick Feature Shortcuts -->
                <h3 class="section-title">Quick Features</h3>
                <div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 24px;">
                    <!-- Admin Panel (if admin) -->
                    <div id="adminCardContainer" style="display: none;">
                        <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('admin')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                            <div style="font-size: 2rem; margin-bottom: 8px;">⚙️</div>
                            <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Admin Panel</div>
                            <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Keys & Users</div>
                        </div>
                    </div>

                    <!-- Assessment -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('assessment')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">📋</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Assessment</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">PHQ-9 & UCLA</div>
                    </div>

                    <!-- AI Chat -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('synachat')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">💬</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">AI Chat</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Talk to Dr. Synachat</div>
                    </div>

                    <!-- Crisis Support -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s; border: 2px solid rgba(239,68,68,0.3);" onclick="Router.navigate('support')" onmouseover="this.style.boxShadow='0 8px 20px rgba(239,68,68,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">🆘</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--danger-500);">Crisis Support</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Get Help Now</div>
                    </div>

                    <!-- Sleep Lab -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('sleep')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">😴</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Sleep Lab</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Track & Improve</div>
                    </div>

                    <!-- Journal -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('journal')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">📝</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Journal</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Daily Thoughts</div>
                    </div>

                    <!-- Mindfulness -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('mindful')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">🧘</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Mindful</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Meditate</div>
                    </div>

                    <!-- Mood Booster -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('moodbooster')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">🎵</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Mood Booster</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Music Therapy</div>
                    </div>

                    <!-- Academy -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('academy')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">🎓</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Academy</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Learn & Grow</div>
                    </div>

                    <!-- Games -->
                    <div class="card" style="padding: 16px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="Router.navigate('games')" onmouseover="this.style.boxShadow='0 8px 20px rgba(139,92,246,0.2); transform: translateY(-2px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 2rem; margin-bottom: 8px;">🎮</div>
                        <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">Games</div>
                        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 4px;">Stress Relief</div>
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
    },

    /**
     * Sleep Lab View
     */
    sleep() {
        return `
            <div class="view-container" style="max-width: 700px; margin: 0 auto; padding-bottom: 80px;">
                <!-- Header -->
                <div class="health-hero" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);">
                    <i class="fas fa-moon" style="font-size: 2.5rem; margin-bottom: 12px; color: #a5b4fc;"></i>
                    <div class="big-value" style="color: white; font-size: 3rem;"><span id="sleepScoreValue">--</span></div>
                    <div class="label" style="color: #c7d2fe;">Est. Sleep Readiness</div>
                </div>

                <!-- Relaxation Audio -->
                <h3 class="section-title">Audio Relaksasi</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
                    <div class="card" style="text-align: center; cursor: pointer; padding: 16px;" onclick="SleepLab.playSound('rain')">
                        <i class="fas fa-cloud-rain" style="font-size: 1.5rem; color: var(--info-500); margin-bottom: 8px;"></i>
                        <div style="font-size: 0.8rem; font-weight: 600;">Hujan</div>
                    </div>
                    <div class="card" style="text-align: center; cursor: pointer; padding: 16px;" onclick="SleepLab.playSound('forest')">
                        <i class="fas fa-tree" style="font-size: 1.5rem; color: var(--success-500); margin-bottom: 8px;"></i>
                        <div style="font-size: 0.8rem; font-weight: 600;">Hutan</div>
                    </div>
                    <div class="card" style="text-align: center; cursor: pointer; padding: 16px;" onclick="SleepLab.playSound('noise')">
                        <i class="fas fa-water" style="font-size: 1.5rem; color: var(--primary-500); margin-bottom: 8px;"></i>
                        <div style="font-size: 0.8rem; font-weight: 600;">Ombak</div>
                    </div>
                </div>

                <!-- Bedtime Checklist -->
                <h3 class="section-title">Rutinitas Malam</h3>
                <div class="card" style="padding: 0; overflow: hidden;">
                    <div class="list-item" style="cursor: pointer;" onclick="SleepLab.toggleChecklist(this)">
                        <div class="list-item-icon" style="background: transparent; color: var(--text-tertiary);"><i class="far fa-circle"></i></div>
                        <div class="list-item-content">
                            <div class="list-item-title">Mandi Air Hangat</div>
                        </div>
                    </div>
                    <div class="list-item" style="cursor: pointer;" onclick="SleepLab.toggleChecklist(this)">
                        <div class="list-item-icon" style="background: transparent; color: var(--text-tertiary);"><i class="far fa-circle"></i></div>
                        <div class="list-item-content">
                            <div class="list-item-title">Matikan Layar (30m sblm tidur)</div>
                        </div>
                    </div>
                    <div class="list-item" style="cursor: pointer; border-bottom: none;" onclick="SleepLab.toggleChecklist(this)">
                        <div class="list-item-icon" style="background: transparent; color: var(--text-tertiary);"><i class="far fa-circle"></i></div>
                        <div class="list-item-content">
                            <div class="list-item-title">Minum Air Susu/Teh Kamomil</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Mood Booster View
     */
    moodbooster() {
        return `
            <div class="view-container" style="max-width: 700px; margin: 0 auto;">
                <div style="text-align: center; padding: 32px 16px;">
                    <i class="fas fa-music" style="font-size: 4rem; color: var(--primary-500); margin-bottom: 16px; animation: pulse 2s infinite;"></i>
                    <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">Mood Booster</h2>
                    <p style="color: var(--text-tertiary); margin-bottom: 32px;">Pilih musik atau frekuensi suara untuk meredakan emosi negatif Anda saat ini.</p>
                </div>

                <h3 class="section-title">Bagaimana Perasaan Anda Saat Ini?</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 32px;">
                    <button class="btn btn-outline mood-btn" style="flex: 1; margin: 0 4px; border-radius: 20px; font-size: 1.5rem;" onclick="MoodBooster.setMood('bad')">😢</button>
                    <button class="btn btn-outline mood-btn" style="flex: 1; margin: 0 4px; border-radius: 20px; font-size: 1.5rem;" onclick="MoodBooster.setMood('neutral')">😐</button>
                    <button class="btn btn-outline mood-btn" style="flex: 1; margin: 0 4px; border-radius: 20px; font-size: 1.5rem;" onclick="MoodBooster.setMood('good')">😃</button>
                </div>

                <div class="card" style="padding: 0; overflow: hidden;">
                    <div class="list-item" onclick="MoodBooster.playTherapy('Binaural Beats (Alpha)')">
                        <div class="list-item-icon" style="background: rgba(139, 92, 246, 0.15); color: var(--primary-500);"><i class="fas fa-headphones"></i></div>
                        <div class="list-item-content">
                            <div class="list-item-title">Binaural Beats (Fokus & Tenang)</div>
                            <div class="list-item-subtitle">15 Menit · Alpha Wave</div>
                        </div>
                        <i class="fas fa-play" style="color: var(--text-tertiary);"></i>
                    </div>
                    <div class="list-item" onclick="MoodBooster.playTherapy('Acoustic Uplift')" style="border-bottom: none;">
                        <div class="list-item-icon" style="background: rgba(251, 191, 36, 0.15); color: var(--warning-500);"><i class="fas fa-guitar"></i></div>
                        <div class="list-item-content">
                            <div class="list-item-title">Acoustic Uplift</div>
                            <div class="list-item-subtitle">10 Menit · Menambah Energi Positif</div>
                        </div>
                        <i class="fas fa-play" style="color: var(--text-tertiary);"></i>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Mindful Moment View
     */
    mindful() {
        return `
            <div class="view-container" style="max-width: 700px; margin: 0 auto; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg-primary);">
                <div style="text-align: center; margin-bottom: 60px;">
                    <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px;">Mindful Moment</h2>
                    <p style="color: var(--text-secondary);">Ikuti ritme pernapasan 4-7-8 untuk rileks total.</p>
                </div>
                
                <div style="position: relative; width: 250px; height: 250px; display: flex; align-items: center; justify-content: center; margin-bottom: 60px;">
                    <div id="breathingCircle" style="position: absolute; width: 100px; height: 100px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; border: 2px solid var(--success-500); box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); z-index: 1;"></div>
                    <div id="breathingText" style="z-index: 2; font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">Mulai Latihan</div>
                </div>

                <button class="btn btn-primary" style="padding: 16px 32px; border-radius: 30px; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);" onclick="Mindful.start()">
                    <i class="fas fa-play"></i> Mulai Pernapasan
                </button>
            </div>
        `;
    },

    /**
     * Journal View
     */
    journal() {
        return `
            <div class="view-container" style="max-width: 700px; margin: 0 auto;">
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;"><i class="fas fa-book-open" style="color: var(--primary-500);"></i> Jurnal Refleksi</h2>
                    <p style="color: var(--text-tertiary);">Tuliskan apa yang membebani pikiranmu hari ini.</p>
                </div>
                
                <div class="card" style="margin-bottom: 24px;">
                    <textarea id="journalInput" rows="5" placeholder="Hari ini saya merasa..." style="width: 100%; border: none; background: #f8fafc; padding: 16px; border-radius: 12px; font-family: 'Poppins', sans-serif; font-size: 1rem; color: var(--text-primary); resize: vertical; margin-bottom: 16px; outline: none;"></textarea>
                    <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="Journal.save()">
                        <i class="fas fa-save"></i> Simpan Jurnal
                    </button>
                </div>

                <h3 class="section-title">Catatan Sebelumnya</h3>
                <div id="journalList">
                    <!-- Loaded dynamically -->
                    <div style="text-align: center; padding: 20px;"><div class="loading-spinner"></div></div>
                </div>
            </div>
        `;
    },

    /**
     * Support Hub View
     */
    support() {
        return `
            <div class="view-container" style="max-width: 700px; margin: 0 auto;">
                <div id="supportContent">
                    <div style="text-align: center; padding: 40px 20px;">
                        <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
                        <p style="color: var(--text-tertiary);">Memuat Support Hub...</p>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Academy View
     */
    academy() {
        return `
            <div class="view-container" style="max-width: 700px; margin: 0 auto;">
                <div id="academyContent">
                    <div style="text-align: center; padding: 40px 20px;">
                        <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
                        <p style="color: var(--text-tertiary);">Memuat Syna Academy...</p>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Research Foundation View
     */
    research() {
        return `
            <div class="view-container" style="max-width: 1400px; margin: 0 auto; padding: 0;">
                <div id="researchContent" style="background: white; border-radius: 0;">
                    <div style="text-align: center; padding: 60px 20px;">
                        <div class="loading-spinner" style="margin: 0 auto 16px;"></div>
                        <p style="color: var(--text-tertiary); font-size: 1.1em;">Memuat Halaman Dasar Penelitian Lengkap...</p>
                        <p style="color: var(--text-secondary); font-size: 0.9em; margin-top: 10px;">50 Papers | 10 Domains | 7 Research Gaps</p>
                    </div>
                </div>
                <iframe id="researchFrame" style="width: 100%; height: 100vh; border: none; display: none;"></iframe>
            </div>
        `;
    },

    /**
     * Games View
     */
    games() {
        return `
            <div class="view-container" style="max-width: 800px; margin: 0 auto; padding-top: 20px;">
                <!-- Games Header -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 2.5rem; font-weight: 700; background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px;">
                        🎮 Wellness Games
                    </h1>
                    <p style="color: var(--text-secondary); font-size: 1.1rem;">Relax, play, and reduce stress with fun games</p>
                </div>

                <!-- Game Selector -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
                    <!-- Game 1: Breathing -->
                    <div class="card" style="padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="GamesModule.displayGame('breathing')" onmouseover="this.style.boxShadow='0 12px 30px rgba(139,92,246,0.3); transform: translateY(-4px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 3rem; margin-bottom: 12px;">🫁</div>
                        <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary); margin-bottom: 8px;">Breathing Exercise</div>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-tertiary);">2 min • Reduce stress instantly</p>
                    </div>

                    <!-- Game 2: Memory -->
                    <div class="card" style="padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="GamesModule.displayGame('memory')" onmouseover="this.style.boxShadow='0 12px 30px rgba(139,92,246,0.3); transform: translateY(-4px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 3rem; margin-bottom: 12px;">🧩</div>
                        <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary); margin-bottom: 8px;">Memory Match Game</div>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-tertiary);">Varies • Improve focus</p>
                    </div>

                    <!-- Game 3: Challenge -->
                    <div class="card" style="padding: 20px; text-align: center; cursor: pointer; transition: all 0.3s;" onclick="GamesModule.displayGame('challenge')" onmouseover="this.style.boxShadow='0 12px 30px rgba(139,92,246,0.3); transform: translateY(-4px)'" onmouseout="this.style.boxShadow=''; this.style.transform=''">
                        <div style="font-size: 3rem; margin-bottom: 12px;">🏆</div>
                        <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-primary); margin-bottom: 8px;">Daily Challenge</div>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-tertiary);">Daily • Earn points</p>
                    </div>
                </div>

                <!-- Game Display Area -->
                <div id="gameDisplay" style="background: white; border-radius: var(--radius-lg); padding: 20px; border: 1px solid var(--border-color);">
                    <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                        <p style="font-size: 1.1rem;">👆 Select a game to get started!</p>
                    </div>
                </div>

                <script>
                GamesModule.displayGame = function(gameType) {
                    const gameDisplay = document.getElementById('gameDisplay');

                    if (gameType === 'breathing') {
                        gameDisplay.innerHTML = GamesModule.breathingExercise();
                    } else if (gameType === 'memory') {
                        gameDisplay.innerHTML = GamesModule.stressRelieveGame();
                    } else if (gameType === 'challenge') {
                        gameDisplay.innerHTML = GamesModule.wellnessChallenge();
                    }
                };
                </script>
            </div>
        `;
    },

    /**
     * Admin Dashboard View
     */
    admin() {
        return `
            <div class="view-container" style="max-width: 1200px; margin: 0 auto; padding-top: 40px;">
                <!-- Admin Header -->
                <div style="margin-bottom: 32px;">
                    <h1 style="font-size: var(--text-3xl); font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
                        <i class="fas fa-shield-alt" style="color: var(--primary-500); margin-right: 12px;"></i>Admin Dashboard
                    </h1>
                    <p style="color: var(--text-secondary);">Manage API Keys, Users, and System Settings</p>
                </div>

                <!-- Tabs Navigation -->
                <div class="admin-tabs" style="display: flex; gap: 12px; margin-bottom: 24px; border-bottom: 2px solid var(--border-color);">
                    <button class="admin-tab-btn active" data-tab="dashboard" onclick="AdminUI.switchTab('dashboard')">
                        <i class="fas fa-chart-line"></i> Dashboard
                    </button>
                    <button class="admin-tab-btn" data-tab="api-keys" onclick="AdminUI.switchTab('api-keys')">
                        <i class="fas fa-key"></i> API Keys
                    </button>
                    <button class="admin-tab-btn" data-tab="users" onclick="AdminUI.switchTab('users')">
                        <i class="fas fa-users"></i> Users
                    </button>
                    <button class="admin-tab-btn" data-tab="settings" onclick="AdminUI.switchTab('settings')">
                        <i class="fas fa-cog"></i> Settings
                    </button>
                </div>

                <!-- Dashboard Tab -->
                <div id="dashboard-tab" class="admin-tab-content" style="display: block;">
                    <div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-bottom: 32px;">
                        <div class="card" style="padding: 24px; border-left: 4px solid var(--primary-500);">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Total Users</p>
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-500);" id="totalUsers">--</div>
                            <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 8px;"><i class="fas fa-arrow-up" style="color: #10b981;"></i> +12% this month</p>
                        </div>
                        <div class="card" style="padding: 24px; border-left: 4px solid var(--info-500);">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">API Calls</p>
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--info-500);" id="totalApiCalls">--</div>
                            <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 8px;"><i class="fas fa-arrow-up" style="color: #10b981;"></i> +24% this month</p>
                        </div>
                        <div class="card" style="padding: 24px; border-left: 4px solid var(--success-500);">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">System Uptime</p>
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--success-500);" id="systemUptime">--</div>
                            <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 8px;">Last 30 days</p>
                        </div>
                        <div class="card" style="padding: 24px; border-left: 4px solid var(--warning-500);">
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 8px;">Active API Keys</p>
                            <div style="font-size: 2.5rem; font-weight: 700; color: var(--warning-500);" id="activeKeys">--</div>
                            <p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 8px;"><i class="fas fa-circle" style="color: #10b981;"></i> All healthy</p>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="card" style="padding: 24px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">Recent Activity</h3>
                        <div id="recentActivity" style="space-y: 12px;">
                            <div style="text-align: center; padding: 20px; color: var(--text-tertiary);">
                                <p>Loading activity...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- API Keys Tab -->
                <div id="api-keys-tab" class="admin-tab-content" style="display: none;">
                    <div style="margin-bottom: 24px;">
                        <button class="btn btn-primary" onclick="AdminUI.showCreateKeyModal()" style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-plus"></i> Create New API Key
                        </button>
                    </div>

                    <div class="card" style="padding: 24px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">API Keys Management</h3>
                        <div id="apiKeysTable" style="overflow-x: auto;">
                            <div style="text-align: center; padding: 20px; color: var(--text-tertiary);">
                                <div class="loading-spinner" style="margin: 0 auto 12px;"></div>
                                <p>Loading API keys...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Users Tab -->
                <div id="users-tab" class="admin-tab-content" style="display: none;">
                    <div class="card" style="padding: 24px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">User Management</h3>
                        <div id="usersTable" style="overflow-x: auto;">
                            <div style="text-align: center; padding: 20px; color: var(--text-tertiary);">
                                <div class="loading-spinner" style="margin: 0 auto 12px;"></div>
                                <p>Loading users...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Settings Tab -->
                <div id="settings-tab" class="admin-tab-content" style="display: none;">
                    <div class="card" style="padding: 24px;">
                        <h3 style="font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin-bottom: 24px;">System Settings</h3>

                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">API Key Rotation Policy</label>
                            <div style="background: var(--bg-secondary); padding: 12px; border-radius: var(--radius-md); margin-bottom: 12px; color: var(--text-secondary);">
                                <select id="rotationPolicy" style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                                    <option value="30">Rotate every 30 days</option>
                                    <option value="60">Rotate every 60 days</option>
                                    <option value="90">Rotate every 90 days</option>
                                    <option value="manual">Manual only</option>
                                </select>
                            </div>
                            <button class="btn btn-primary" onclick="AdminUI.saveSettings()" style="display: flex; align-items: center; gap: 8px;">
                                <i class="fas fa-save"></i> Save Settings
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
