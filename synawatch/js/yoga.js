/**
 * YOGA FOR MENTAL HEALTH FEATURE
 * Complete implementation with UI and Firebase integration
 */

const Yoga = {
  currentSession: null,
  sessionData: {
    poses: [],
    currentPoseIndex: 0,
    startTime: null,
    preSessionMetrics: null,
    postSessionMetrics: null
  },
  allPoses: [],
  protocols: [],
  recommendations: null,

  /**
   * Initialize yoga feature
   */
  async init() {
    console.log('🧘 Initializing Yoga Feature...');
    try {
      await this.loadPoses();
      await this.loadProtocols();
      await this.loadRecommendations();
      console.log('✅ Yoga Feature initialized');
      return true;
    } catch (error) {
      console.error('❌ Yoga init failed:', error);
      return false;
    }
  },

  /**
   * Load all yoga poses from Firestore
   */
  async loadPoses() {
    try {
      const snapshot = await db.collection('yoga_poses').get();
      this.allPoses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(`✅ Loaded ${this.allPoses.length} yoga poses`);
      return this.allPoses;
    } catch (error) {
      console.error('Error loading poses:', error);
      return [];
    }
  },

  /**
   * Load yoga protocols from Firestore
   */
  async loadProtocols() {
    try {
      const snapshot = await db.collection('yoga_protocols').get();
      this.protocols = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(`✅ Loaded ${this.protocols.length} yoga protocols`);
      return this.protocols;
    } catch (error) {
      console.error('Error loading protocols:', error);
      return [];
    }
  },

  /**
   * Get recommended yoga protocol based on assessment
   */
  async getRecommendation() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return null;

      // Get latest assessment
      const assessmentSnapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('assessments')
        .orderBy('created_at', 'desc')
        .limit(1)
        .get();

      if (assessmentSnapshot.empty) {
        return null;
      }

      const assessment = assessmentSnapshot.docs[0].data();
      let recommendedProtocolId = null;

      // Determine primary condition
      if (assessment.gad7_score >= 10) {
        recommendedProtocolId = 'anxiety_relief';
      } else if (assessment.phq9_score >= 10) {
        recommendedProtocolId = 'depression_recovery';
      } else if (assessment.dass21_stress_score >= 15) {
        recommendedProtocolId = 'stress_management';
      }

      if (!recommendedProtocolId) {
        return this.protocols[0]; // Default to first protocol
      }

      // Return matching protocol
      return this.protocols.find(p => p.id === recommendedProtocolId);

    } catch (error) {
      console.error('Error getting recommendation:', error);
      return null;
    }
  },

  async loadRecommendations() {
    this.recommendations = await this.getRecommendation();
    return this.recommendations;
  },

  /**
   * Main Yoga Dashboard View
   */
  dashboardView() {
    return `
      <div class="yoga-dashboard">
        <!-- Header -->
        <div class="yoga-header">
          <h1>🧘 Yoga for Mental Health</h1>
          <p>Evidence-based yoga programs for anxiety, depression & stress</p>
        </div>

        <!-- Recommended Program -->
        <div class="yoga-section recommended-program">
          <h2>Your Recommended Program</h2>
          <div id="yoga-recommendation" class="program-card">
            <div class="loader">Loading recommendation...</div>
          </div>
        </div>

        <!-- Pose Library -->
        <div class="yoga-section pose-library">
          <h2>Browse Poses</h2>
          <div class="pose-filters">
            <select id="yoga-difficulty-filter" onchange="Yoga.filterPoses()">
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select id="yoga-category-filter" onchange="Yoga.filterPoses()">
              <option value="">All Categories</option>
              <option value="standing">Standing</option>
              <option value="seated">Seated</option>
              <option value="prone">Prone</option>
              <option value="supine">Supine</option>
            </select>
          </div>
          <div id="yoga-poses-grid" class="yoga-poses-grid">
            <!-- Populated by loadPosesUI() -->
          </div>
        </div>

        <!-- Quick Start Buttons -->
        <div class="yoga-section quick-start">
          <h2>Quick Sessions</h2>
          <div class="quick-buttons">
            <button class="quick-btn anxiety" onclick="Yoga.startQuickSession('anxiety_relief')">
              <span class="icon">😌</span>
              <span>Anxiety Relief<br><small>5-10 min</small></span>
            </button>
            <button class="quick-btn depression" onclick="Yoga.startQuickSession('depression_recovery')">
              <span class="icon">🌅</span>
              <span>Energy Boost<br><small>10-15 min</small></span>
            </button>
            <button class="quick-btn stress" onclick="Yoga.startQuickSession('stress_management')">
              <span class="icon">🌿</span>
              <span>Stress Relief<br><small>5-10 min</small></span>
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="yoga-section stats">
          <h2>Your Progress</h2>
          <div id="yoga-stats">
            <div class="stat-item">
              <span class="stat-label">Sessions</span>
              <span class="stat-value">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Duration</span>
              <span class="stat-value">0h</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Streak</span>
              <span class="stat-value">0 days</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Load poses UI
   */
  async loadPosesUI() {
    const container = document.getElementById('yoga-poses-grid');
    if (!container) return;

    const poses = this.allPoses.slice(0, 10); // Show first 10
    let html = '';

    poses.forEach(pose => {
      html += `
        <div class="yoga-pose-card" onclick="Yoga.showPoseDetail('${pose.id}')">
          ${pose.images?.svg ?
            `<img src="${pose.images.svg}" alt="${pose.english_name}" onerror="this.style.display='none'">` :
            `<div class="pose-placeholder">🧘</div>`
          }
          <h3>${pose.english_name}</h3>
          <p class="sanskrit">${pose.sanskrit_name}</p>
          <span class="difficulty-badge">${pose.difficulty || 'beginner'}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Filter poses by difficulty and category
   */
  filterPoses() {
    const difficulty = document.getElementById('yoga-difficulty-filter')?.value;
    const category = document.getElementById('yoga-category-filter')?.value;

    let filtered = this.allPoses;

    if (difficulty) {
      filtered = filtered.filter(p => p.difficulty === difficulty);
    }
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    // Re-render
    const container = document.getElementById('yoga-poses-grid');
    if (container) {
      let html = '';
      filtered.slice(0, 20).forEach(pose => {
        html += `
          <div class="yoga-pose-card" onclick="Yoga.showPoseDetail('${pose.id}')">
            ${pose.images?.svg ?
              `<img src="${pose.images.svg}" alt="${pose.english_name}" onerror="this.style.display='none'">` :
              `<div class="pose-placeholder">🧘</div>`
            }
            <h3>${pose.english_name}</h3>
            <span class="difficulty-badge">${pose.difficulty}</span>
          </div>
        `;
      });
      container.innerHTML = html || '<p>No poses found</p>';
    }
  },

  /**
   * Show detailed pose view
   */
  showPoseDetail(poseId) {
    const pose = this.allPoses.find(p => p.id === poseId);
    if (!pose) return;

    const modal = `
      <div class="yoga-modal" onclick="if(event.target===this) this.remove()">
        <div class="yoga-modal-content">
          <button class="close-btn" onclick="this.closest('.yoga-modal').remove()">✕</button>

          ${pose.images?.svg ?
            `<img class="pose-image" src="${pose.images.svg}" alt="${pose.english_name}" onerror="this.style.display='none'">` :
            `<div class="pose-image-placeholder">🧘</div>`
          }

          <h2>${pose.english_name}</h2>
          <p class="sanskrit">${pose.sanskrit_name}</p>

          <div class="pose-meta">
            <span class="badge">${pose.difficulty}</span>
            <span class="badge">${pose.category}</span>
            <span class="badge">${Math.round((pose.duration_seconds || 300) / 60)} min</span>
          </div>

          <div class="pose-description">
            <h3>About</h3>
            <p>${pose.description || 'No description available'}</p>
          </div>

          ${pose.benefits && pose.benefits.length > 0 ? `
            <div class="pose-benefits">
              <h3>Benefits</h3>
              <ul>
                ${pose.benefits.slice(0, 5).map(b => `<li>✓ ${b}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${pose.instructions && pose.instructions.length > 0 ? `
            <div class="pose-instructions">
              <h3>How to do it</h3>
              <ol>
                ${pose.instructions.slice(0, 3).map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modal);
  },

  /**
   * Start quick session
   */
  async startQuickSession(protocolId) {
    const protocol = this.protocols.find(p => p.id === protocolId);
    if (!protocol) return;

    // Select first 5 poses from protocol
    this.currentSession = {
      protocolId: protocol.id,
      protocol: protocol,
      poses: this.allPoses.slice(0, 5),
      currentPoseIndex: 0
    };

    // Navigate to session
    Router.navigate(`yoga-session/${protocolId}`);
  },

  /**
   * Session Player View
   */
  sessionView(protocolId) {
    const protocol = this.protocols.find(p => p.id === protocolId);
    if (!protocol) return '<div>Protocol not found</div>';

    return `
      <div class="yoga-session">
        <!-- Header -->
        <div class="session-header">
          <h2>🧘 ${protocol.name}</h2>
          <p>${protocol.subtitle}</p>
        </div>

        <!-- Progress -->
        <div class="session-progress">
          <div class="progress-bar">
            <div id="yoga-session-progress" class="progress-fill" style="width: 0%"></div>
          </div>
          <p id="yoga-pose-counter">Pose 1 of 5</p>
        </div>

        <!-- Current Pose -->
        <div id="yoga-current-pose" class="yoga-pose-display">
          <div class="loader">Loading pose...</div>
        </div>

        <!-- Session Controls -->
        <div class="session-controls">
          <button id="yoga-start-btn" class="btn btn-primary" onclick="Yoga.startPoseTimer()">
            Start Pose
          </button>
          <button class="btn btn-secondary" onclick="Yoga.skipPose()">Skip</button>
          <button class="btn btn-secondary" onclick="Yoga.finishSession()">Finish</button>
        </div>

        <!-- Session Stats -->
        <div class="session-stats">
          <div class="stat">
            <span class="label">Duration</span>
            <span id="yoga-timer">00:00</span>
          </div>
          <div class="stat">
            <span class="label">Poses Done</span>
            <span id="yoga-poses-done">0/5</span>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Display current pose
   */
  displayCurrentPose(protocolId) {
    if (!this.currentSession) return;

    const pose = this.currentSession.poses[this.currentSession.currentPoseIndex];
    if (!pose) return;

    const container = document.getElementById('yoga-current-pose');
    if (!container) return;

    const html = `
      <div class="pose-content">
        <div class="pose-image">
          ${pose.images?.svg ?
            `<img src="${pose.images.svg}" alt="${pose.english_name}" onerror="this.style.display='none'">` :
            `<div class="pose-placeholder">🧘</div>`
          }
        </div>

        <div class="pose-info">
          <h3>${pose.english_name}</h3>
          <p class="sanskrit">${pose.sanskrit_name}</p>

          <div class="pose-meta">
            <span class="badge">${pose.difficulty}</span>
            <span class="badge">${Math.round((pose.duration_seconds || 300) / 60)} min</span>
          </div>

          ${pose.benefits && pose.benefits.length > 0 ? `
            <div class="pose-benefits">
              <strong>Benefits:</strong>
              <p>${pose.benefits.slice(0, 2).join(', ')}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  /**
   * Start pose timer
   */
  startPoseTimer() {
    if (!this.currentSession) return;

    const pose = this.currentSession.poses[this.currentSession.currentPoseIndex];
    if (!pose) return;

    const duration = pose.duration_seconds || 300;
    let remaining = duration;

    document.getElementById('yoga-start-btn').disabled = true;

    const timerInterval = setInterval(() => {
      remaining--;
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      document.getElementById('yoga-timer').textContent =
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (remaining <= 0) {
        clearInterval(timerInterval);
        this.nextPose();
      }
    }, 1000);
  },

  /**
   * Skip to next pose
   */
  skipPose() {
    this.nextPose();
  },

  /**
   * Next pose
   */
  nextPose() {
    if (!this.currentSession) return;

    this.currentSession.currentPoseIndex++;
    const progress = (this.currentSession.currentPoseIndex / this.currentSession.poses.length) * 100;

    document.getElementById('yoga-session-progress').style.width = progress + '%';
    document.getElementById('yoga-pose-counter').textContent =
      `Pose ${this.currentSession.currentPoseIndex} of ${this.currentSession.poses.length}`;
    document.getElementById('yoga-poses-done').textContent =
      `${this.currentSession.currentPoseIndex}/${this.currentSession.poses.length}`;
    document.getElementById('yoga-start-btn').disabled = false;
    document.getElementById('yoga-timer').textContent = '00:00';

    if (this.currentSession.currentPoseIndex >= this.currentSession.poses.length) {
      this.finishSession();
    } else {
      this.displayCurrentPose(this.currentSession.protocolId);
    }
  },

  /**
   * Finish session and save to Firestore
   */
  async finishSession() {
    try {
      const user = firebase.auth().currentUser;
      if (!user || !this.currentSession) return;

      const sessionRecord = {
        user_id: user.uid,
        protocol_id: this.currentSession.protocolId,
        session_date: new Date(),
        poses_completed: this.currentSession.currentPoseIndex,
        total_poses: this.currentSession.poses.length,
        completed: true,
        created_at: new Date().toISOString()
      };

      // Save to Firestore
      await db.collection('yoga_sessions').add(sessionRecord);

      // Show summary
      this.showSessionSummary();

    } catch (error) {
      console.error('Error saving session:', error);
      alert('Error saving session');
    }
  },

  /**
   * Show session summary
   */
  showSessionSummary() {
    if (!this.currentSession) return;

    const protocol = this.currentSession.protocol;
    const completionRate = (this.currentSession.currentPoseIndex / this.currentSession.poses.length) * 100;

    const html = `
      <div class="yoga-session">
        <div class="session-summary">
          <h2>🎉 Great Job!</h2>

          <div class="summary-stats">
            <div class="stat">
              <span class="icon">✓</span>
              <span class="label">Completion</span>
              <span class="value">${Math.round(completionRate)}%</span>
            </div>
            <div class="stat">
              <span class="icon">⏱️</span>
              <span class="label">Duration</span>
              <span class="value">${Math.round((this.currentSession.currentPoseIndex * 5))} min</span>
            </div>
          </div>

          <div class="summary-message">
            <p>You've completed <strong>${this.currentSession.currentPoseIndex}</strong> poses from <strong>${protocol.name}</strong></p>
            <p style="margin-top: 8px; color: #666;">Keep practicing daily for the best results!</p>
          </div>

          <button class="btn btn-primary" onclick="Router.navigate('yoga')">
            Back to Yoga
          </button>
        </div>
      </div>
    `;

    document.getElementById('app').innerHTML = html;
  },

  /**
   * Load recommendation UI
   */
  async loadRecommendationUI() {
    const container = document.getElementById('yoga-recommendation');
    if (!container) return;

    const recommendation = await this.getRecommendation();

    if (!recommendation) {
      container.innerHTML = `
        <div style="padding: 16px; text-align: center; color: #999;">
          <p>Complete a mental health assessment first to get personalized recommendations</p>
          <button class="btn btn-primary" onclick="Router.navigate('assessment')" style="margin-top: 12px;">
            Go to Assessment
          </button>
        </div>
      `;
      return;
    }

    const html = `
      <div class="program-card-content">
        <div class="program-header">
          <span class="icon">${recommendation.icon}</span>
          <div class="program-title">
            <h3>${recommendation.name}</h3>
            <p>${recommendation.subtitle}</p>
          </div>
        </div>

        <p class="program-description">${recommendation.description}</p>

        <div class="program-details">
          <div class="detail">
            <span class="label">📅 Duration</span>
            <span class="value">${recommendation.duration_days} days</span>
          </div>
          <div class="detail">
            <span class="label">⏰ Frequency</span>
            <span class="value">${recommendation.frequency}</span>
          </div>
          <div class="detail">
            <span class="label">📈 Expected Improvement</span>
            <span class="value">${recommendation.expected_improvement?.score_reduction}</span>
          </div>
        </div>

        <button class="btn btn-primary" onclick="Yoga.startQuickSession('${recommendation.id}')" style="width: 100%; margin-top: 16px;">
          Start Program
        </button>
      </div>
    `;

    container.innerHTML = html;
  },

  /**
   * Load session stats
   */
  async loadStats() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return;

      const sessions = await db.collection('yoga_sessions')
        .where('user_id', '==', user.uid)
        .orderBy('session_date', 'desc')
        .limit(30)
        .get();

      const totalSessions = sessions.size;
      const totalDuration = sessions.docs.reduce((sum, doc) => {
        return sum + (doc.data().poses_completed || 0) * 5; // 5 min per pose
      }, 0);

      const statsContainer = document.getElementById('yoga-stats');
      if (statsContainer) {
        statsContainer.innerHTML = `
          <div class="stat-item">
            <span class="stat-label">Sessions</span>
            <span class="stat-value">${totalSessions}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Duration</span>
            <span class="stat-value">${Math.round(totalDuration / 60)}h</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Streak</span>
            <span class="stat-value">0 days</span>
          </div>
        `;
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }
};

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Yoga !== 'undefined') {
    Yoga.init();
  }
});
