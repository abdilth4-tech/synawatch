/**
 * YOGA FOR MENTAL HEALTH FEATURE
 * Complete implementation with UI, Firebase integration, and fallback data
 * Updated: 2026 - Full completion with built-in pose library
 */

// ── Built-in Fallback Data ─────────────────────────────────────────────────
const YOGA_FALLBACK_POSES = [
  { id: 'mountain', english_name: 'Mountain Pose', sanskrit_name: 'Tadasana', difficulty: 'beginner', category: 'standing', duration_seconds: 60, benefits: ['Improves posture', 'Calms the mind', 'Strengthens legs'], instructions: ['Stand with feet together', 'Press feet firmly into ground', 'Breathe deeply and hold'], description: 'A foundational standing pose that improves posture and calms the mind.', images: { svg: 'https://www.yogajournal.com/poses/mountain-pose' } },
  { id: 'child', english_name: "Child's Pose", sanskrit_name: 'Balasana', difficulty: 'beginner', category: 'prone', duration_seconds: 90, benefits: ['Relieves anxiety', 'Releases back tension', 'Calming'], instructions: ['Kneel on the floor', 'Sit back on heels', 'Extend arms forward and rest forehead'], description: 'A resting pose that gently stretches hips and promotes relaxation.', images: {} },
  { id: 'cat_cow', english_name: 'Cat-Cow Stretch', sanskrit_name: 'Marjaryasana-Bitilasana', difficulty: 'beginner', category: 'prone', duration_seconds: 120, benefits: ['Reduces back pain', 'Calms the mind', 'Improves focus'], instructions: ['Start on hands and knees', 'Inhale: arch back (cow)', 'Exhale: round spine (cat)'], description: 'A gentle flow between two poses that warms the body and brings flexibility.', images: {} },
  { id: 'warrior1', english_name: 'Warrior I', sanskrit_name: 'Virabhadrasana I', difficulty: 'beginner', category: 'standing', duration_seconds: 60, benefits: ['Builds confidence', 'Strengthens legs', 'Energizing'], instructions: ['Step one foot back', 'Bend front knee to 90°', 'Raise arms overhead'], description: 'A powerful standing pose that builds strength and confidence.', images: {} },
  { id: 'warrior2', english_name: 'Warrior II', sanskrit_name: 'Virabhadrasana II', difficulty: 'beginner', category: 'standing', duration_seconds: 60, benefits: ['Builds stamina', 'Opens hips', 'Improves concentration'], instructions: ['Extend arms parallel to floor', 'Bend front knee', 'Gaze over front fingers'], description: 'Develops concentration and stamina while opening the hips.', images: {} },
  { id: 'downdog', english_name: 'Downward Dog', sanskrit_name: 'Adho Mukha Svanasana', difficulty: 'beginner', category: 'prone', duration_seconds: 90, benefits: ['Reduces stress', 'Energizes body', 'Stretches hamstrings'], instructions: ['Start on hands and knees', 'Lift hips up and back', 'Form an inverted V shape'], description: 'One of yoga\'s most recognized poses, stretches the entire body and calms the nervous system.', images: {} },
  { id: 'tree', english_name: 'Tree Pose', sanskrit_name: 'Vrksasana', difficulty: 'beginner', category: 'standing', duration_seconds: 60, benefits: ['Improves balance', 'Calms anxiety', 'Focuses mind'], instructions: ['Stand on one foot', 'Place other foot on inner thigh', 'Bring hands to heart'], description: 'Improves balance and concentration while calming an anxious mind.', images: {} },
  { id: 'corpse', english_name: 'Corpse Pose', sanskrit_name: 'Savasana', difficulty: 'beginner', category: 'supine', duration_seconds: 300, benefits: ['Deep relaxation', 'Reduces stress', 'Integration'], instructions: ['Lie flat on your back', 'Arms slightly away from body', 'Close eyes and breathe naturally'], description: 'The ultimate relaxation pose, allowing the body to absorb the benefits of the practice.', images: {} },
  { id: 'legs_up', english_name: 'Legs Up the Wall', sanskrit_name: 'Viparita Karani', difficulty: 'beginner', category: 'supine', duration_seconds: 300, benefits: ['Relieves anxiety', 'Calms nervous system', 'Reduces fatigue'], instructions: ['Sit next to a wall', 'Swing legs up the wall', 'Relax arms by your sides'], description: 'A gentle inversion that relieves anxiety and calms the nervous system.', images: {} },
  { id: 'seated_forward', english_name: 'Seated Forward Bend', sanskrit_name: 'Paschimottanasana', difficulty: 'beginner', category: 'seated', duration_seconds: 90, benefits: ['Calms the mind', 'Relieves depression', 'Stretches spine'], instructions: ['Sit with legs extended', 'Inhale and lengthen spine', 'Exhale and fold forward'], description: 'Therapeutic for depression and anxiety, this pose calms the mind and relieves stress.', images: {} },
  { id: 'bridge', english_name: 'Bridge Pose', sanskrit_name: 'Setu Bandha Sarvangasana', difficulty: 'beginner', category: 'supine', duration_seconds: 60, benefits: ['Reduces anxiety', 'Strengthens back', 'Uplifting'], instructions: ['Lie on back, knees bent', 'Press feet into floor', 'Lift hips toward ceiling'], description: 'Lifts mood, reduces anxiety and opens the chest for deeper breathing.', images: {} },
  { id: 'easy_pose', english_name: 'Easy Pose', sanskrit_name: 'Sukhasana', difficulty: 'beginner', category: 'seated', duration_seconds: 180, benefits: ['Calms brain', 'Reduces anxiety', 'Meditation ready'], instructions: ['Sit cross-legged', 'Rest hands on knees', 'Lengthen your spine'], description: 'A classic meditation seat that calms the mind and reduces anxiety.', images: {} },
  { id: 'pigeon', english_name: 'Pigeon Pose', sanskrit_name: 'Eka Pada Rajakapotasana', difficulty: 'intermediate', category: 'seated', duration_seconds: 120, benefits: ['Releases emotion', 'Opens hips', 'Reduces tension'], instructions: ['From downdog, bring one knee forward', 'Lower hips toward ground', 'Hold and breathe deeply'], description: 'Deeply opens the hips, releasing stored emotional tension.', images: {} },
  { id: 'fish', english_name: 'Fish Pose', sanskrit_name: 'Matsyasana', difficulty: 'intermediate', category: 'supine', duration_seconds: 60, benefits: ['Opens heart', 'Relieves tension', 'Lifts mood'], instructions: ['Lie on back', 'Arch chest up', 'Tilt head back gently'], description: 'Opens the heart and relieves tension in the shoulders and neck.', images: {} },
  { id: 'triangle', english_name: 'Triangle Pose', sanskrit_name: 'Trikonasana', difficulty: 'intermediate', category: 'standing', duration_seconds: 60, benefits: ['Relieves stress', 'Improves digestion', 'Energizing'], instructions: ['Stand with feet wide', 'Extend arms to the sides', 'Reach down toward ankle'], description: 'Relieves stress while energizing and revitalizing the body.', images: {} }
];

const YOGA_FALLBACK_PROTOCOLS = [
  {
    id: 'anxiety_relief',
    name: 'Anxiety Relief Program',
    subtitle: '5-10 min calming practice',
    icon: '😌',
    description: 'Evidence-based yoga sequence specifically designed to activate the parasympathetic nervous system and reduce anxiety symptoms.',
    duration_days: 21,
    frequency: 'Daily, 10-15 minutes',
    difficulty: 'beginner',
    target_condition: 'anxiety',
    expected_improvement: { score_reduction: '30-40% GAD-7 reduction in 3 weeks' },
    pose_ids: ['easy_pose', 'cat_cow', 'child', 'legs_up', 'corpse']
  },
  {
    id: 'depression_recovery',
    name: 'Energy & Mood Boost',
    subtitle: '10-15 min energizing practice',
    icon: '🌅',
    description: 'Uplifting yoga sequence that activates energizing poses to counter depression and lift mood through physical movement.',
    duration_days: 28,
    frequency: 'Daily, 15-20 minutes',
    difficulty: 'beginner',
    target_condition: 'depression',
    expected_improvement: { score_reduction: '25-35% PHQ-9 reduction in 4 weeks' },
    pose_ids: ['mountain', 'warrior1', 'warrior2', 'bridge', 'fish', 'corpse']
  },
  {
    id: 'stress_management',
    name: 'Stress Relief Flow',
    subtitle: '5-10 min stress release',
    icon: '🌿',
    description: 'Gentle restorative yoga sequence designed to reduce cortisol levels and calm the nervous system during high stress periods.',
    duration_days: 14,
    frequency: 'Twice daily, 8-10 minutes',
    difficulty: 'beginner',
    target_condition: 'stress',
    expected_improvement: { score_reduction: '35-50% stress score reduction in 2 weeks' },
    pose_ids: ['child', 'cat_cow', 'seated_forward', 'legs_up', 'corpse']
  }
];

// ── Main Yoga Object ───────────────────────────────────────────────────────
const Yoga = {
  currentSession: null,
  sessionData: {
    poses: [],
    currentPoseIndex: 0,
    startTime: null,
  },
  allPoses: [],
  protocols: [],
  recommendations: null,
  _timerInterval: null,

  /**
   * Initialize yoga feature
   */
  async init() {
    console.log('🧘 Initializing Yoga Feature...');
    try {
      await this.loadPoses();
      await this.loadProtocols();
      await this.loadRecommendations();
      console.log(`✅ Yoga Feature initialized: ${this.allPoses.length} poses, ${this.protocols.length} protocols`);
      return true;
    } catch (error) {
      console.error('❌ Yoga init failed:', error);
      // Load fallback data so UI still works
      this.allPoses = YOGA_FALLBACK_POSES;
      this.protocols = YOGA_FALLBACK_PROTOCOLS;
      return false;
    }
  },

  /**
   * Load all yoga poses from Firestore (with fallback)
   */
  async loadPoses() {
    try {
      const snapshot = await db.collection('yoga_poses').get();
      if (!snapshot.empty) {
        this.allPoses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`✅ Loaded ${this.allPoses.length} yoga poses from Firestore`);
      } else {
        console.log('📦 No poses in Firestore, using built-in library');
        this.allPoses = YOGA_FALLBACK_POSES;
      }
      return this.allPoses;
    } catch (error) {
      console.warn('Using fallback poses:', error.message);
      this.allPoses = YOGA_FALLBACK_POSES;
      return this.allPoses;
    }
  },

  /**
   * Load yoga protocols from Firestore (with fallback)
   */
  async loadProtocols() {
    try {
      const snapshot = await db.collection('yoga_protocols').get();
      if (!snapshot.empty) {
        this.protocols = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`✅ Loaded ${this.protocols.length} yoga protocols from Firestore`);
      } else {
        console.log('📦 No protocols in Firestore, using built-in protocols');
        this.protocols = YOGA_FALLBACK_PROTOCOLS;
      }
      return this.protocols;
    } catch (error) {
      console.warn('Using fallback protocols:', error.message);
      this.protocols = YOGA_FALLBACK_PROTOCOLS;
      return this.protocols;
    }
  },

  /**
   * Get recommended yoga protocol based on latest assessment
   */
  async getRecommendation() {
    try {
      const user = firebase.auth().currentUser;
      if (!user) return this.protocols[0] || YOGA_FALLBACK_PROTOCOLS[0];

      // Get latest assessment from either collection path
      let assessment = null;
      try {
        const snap1 = await db.collection('users').doc(user.uid).collection('assessments')
          .orderBy('created_at', 'desc').limit(1).get();
        if (!snap1.empty) assessment = snap1.docs[0].data();
      } catch (_) {}

      if (!assessment) {
        try {
          const snap2 = await db.collection('assessments')
            .where('userId', '==', user.uid).orderBy('created_at', 'desc').limit(1).get();
          if (!snap2.empty) assessment = snap2.docs[0].data();
        } catch (_) {}
      }

      if (!assessment) {
        return null; // No assessment yet
      }

      let recommendedProtocolId = null;
      const gad7 = assessment.gad7_score || assessment.gad7Score || 0;
      const phq9 = assessment.phq9_score || assessment.phq9Score || 0;
      const stress = assessment.dass21_stress_score || assessment.stressScore || 0;

      if (gad7 >= 10) {
        recommendedProtocolId = 'anxiety_relief';
      } else if (phq9 >= 10) {
        recommendedProtocolId = 'depression_recovery';
      } else if (stress >= 15) {
        recommendedProtocolId = 'stress_management';
      } else if (gad7 > 0 || phq9 > 0) {
        // Mild symptoms – suggest general stress relief
        recommendedProtocolId = 'stress_management';
      }

      if (!recommendedProtocolId) {
        return this.protocols[0];
      }

      return this.protocols.find(p => p.id === recommendedProtocolId) || this.protocols[0];

    } catch (error) {
      console.error('Error getting recommendation:', error);
      return this.protocols[0] || null;
    }
  },

  async loadRecommendations() {
    this.recommendations = await this.getRecommendation();
    return this.recommendations;
  },

  // ── Views ─────────────────────────────────────────────────────────────────

  /**
   * Main Yoga Dashboard View
   */
  dashboardView() {
    return `
      <div class="yoga-dashboard">
        <div class="yoga-header">
          <button class="back-btn" onclick="Router.navigate('dashboard')" style="background:none;border:none;cursor:pointer;font-size:1.5rem;margin-right:12px;">←</button>
          <div>
            <h1 style="margin:0;font-size:1.6rem;font-weight:800;">🧘 Yoga for Mental Health</h1>
            <p style="margin:4px 0 0;color:var(--text-secondary);font-size:0.9rem;">Evidence-based yoga for anxiety, depression & stress</p>
          </div>
        </div>

        <!-- Your Progress Stats -->
        <div id="yoga-stats" class="yoga-stats-bar">
          <div class="yoga-stat-item">
            <span class="yoga-stat-value" id="stat-sessions">0</span>
            <span class="yoga-stat-label">Sessions</span>
          </div>
          <div class="yoga-stat-item">
            <span class="yoga-stat-value" id="stat-duration">0h</span>
            <span class="yoga-stat-label">Duration</span>
          </div>
          <div class="yoga-stat-item">
            <span class="yoga-stat-value" id="stat-streak">0</span>
            <span class="yoga-stat-label">Day Streak</span>
          </div>
        </div>

        <!-- Recommended Program -->
        <div class="yoga-section">
          <h2 class="yoga-section-title">✨ Recommended Program</h2>
          <div id="yoga-recommendation" class="yoga-recommendation-card">
            <div class="yoga-loading">
              <div class="spinner"></div>
              <p>Getting your recommendation...</p>
            </div>
          </div>
        </div>

        <!-- Quick Sessions -->
        <div class="yoga-section">
          <h2 class="yoga-section-title">⚡ Quick Sessions</h2>
          <div class="yoga-quick-grid">
            <button class="yoga-quick-btn yoga-quick-anxiety" onclick="Yoga.startQuickSession('anxiety_relief')">
              <span class="yoga-quick-icon">😌</span>
              <span class="yoga-quick-title">Anxiety Relief</span>
              <span class="yoga-quick-dur">5–10 min</span>
            </button>
            <button class="yoga-quick-btn yoga-quick-depression" onclick="Yoga.startQuickSession('depression_recovery')">
              <span class="yoga-quick-icon">🌅</span>
              <span class="yoga-quick-title">Energy Boost</span>
              <span class="yoga-quick-dur">10–15 min</span>
            </button>
            <button class="yoga-quick-btn yoga-quick-stress" onclick="Yoga.startQuickSession('stress_management')">
              <span class="yoga-quick-icon">🌿</span>
              <span class="yoga-quick-title">Stress Relief</span>
              <span class="yoga-quick-dur">5–10 min</span>
            </button>
          </div>
        </div>

        <!-- Pose Library -->
        <div class="yoga-section">
          <h2 class="yoga-section-title">📚 Pose Library <span style="font-size:0.8rem;color:var(--text-tertiary);font-weight:400;">(${YOGA_FALLBACK_POSES.length} poses)</span></h2>
          <div class="yoga-filters">
            <select id="yoga-difficulty-filter" class="yoga-select" onchange="Yoga.filterPoses()">
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select id="yoga-category-filter" class="yoga-select" onchange="Yoga.filterPoses()">
              <option value="">All Categories</option>
              <option value="standing">Standing</option>
              <option value="seated">Seated</option>
              <option value="prone">Prone</option>
              <option value="supine">Supine</option>
            </select>
          </div>
          <div id="yoga-poses-grid" class="yoga-poses-grid">
            <div class="yoga-loading"><div class="spinner"></div><p>Loading poses...</p></div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Session Player View
   */
  sessionView(protocolId) {
    const protocol = this.protocols.find(p => p.id === protocolId) ||
                     YOGA_FALLBACK_PROTOCOLS.find(p => p.id === protocolId);
    if (!protocol) {
      return `<div style="padding:40px;text-align:center;">
        <p>Protocol not found. <button class="btn btn-primary" onclick="Router.navigate('yoga')">Back to Yoga</button></p>
      </div>`;
    }

    const totalPoses = this.currentSession ? this.currentSession.poses.length : 5;
    return `
      <div class="yoga-session-view">
        <div class="yoga-session-header">
          <button onclick="Yoga.exitSession()" class="yoga-exit-btn">✕ Exit</button>
          <div class="yoga-session-title">
            <h2>${protocol.icon || '🧘'} ${protocol.name}</h2>
            <p>${protocol.subtitle}</p>
          </div>
        </div>

        <div class="yoga-progress-wrap">
          <div class="yoga-progress-bar">
            <div id="yoga-session-progress" class="yoga-progress-fill" style="width: 0%"></div>
          </div>
          <p id="yoga-pose-counter" class="yoga-pose-counter">Pose 1 of ${totalPoses}</p>
        </div>

        <div id="yoga-current-pose" class="yoga-pose-display">
          <div class="yoga-loading"><div class="spinner"></div><p>Preparing your session...</p></div>
        </div>

        <div class="yoga-session-controls">
          <div class="yoga-timer-display">
            <span class="yoga-timer-icon">⏱️</span>
            <span id="yoga-timer" class="yoga-timer-value">00:00</span>
          </div>
          <div class="yoga-ctrl-btns">
            <button id="yoga-start-btn" class="btn btn-primary yoga-start-btn" onclick="Yoga.startPoseTimer()">
              ▶ Start Pose
            </button>
            <button class="btn btn-secondary" onclick="Yoga.skipPose()">Skip →</button>
            <button class="btn btn-outline" onclick="Yoga.finishSession()">Finish</button>
          </div>
          <div class="yoga-poses-done-wrap">
            <span class="yoga-poses-done-label">Completed:</span>
            <span id="yoga-poses-done" class="yoga-poses-done-value">0/${totalPoses}</span>
          </div>
        </div>
      </div>
    `;
  },

  // ── UI Loaders ────────────────────────────────────────────────────────────

  /**
   * Load poses into the grid UI
   */
  async loadPosesUI() {
    const container = document.getElementById('yoga-poses-grid');
    if (!container) return;

    const poses = this.allPoses.length > 0 ? this.allPoses : YOGA_FALLBACK_POSES;
    this._renderPosesGrid(container, poses.slice(0, 12));
  },

  _renderPosesGrid(container, poses) {
    if (poses.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">No poses found.</p>';
      return;
    }

    const diffColors = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };
    container.innerHTML = poses.map(pose => `
      <div class="yoga-pose-card" onclick="Yoga.showPoseDetail('${pose.id}')">
        <div class="yoga-pose-icon">🧘</div>
        <div class="yoga-pose-info">
          <h3 class="yoga-pose-name">${pose.english_name}</h3>
          <p class="yoga-pose-sanskrit">${pose.sanskrit_name}</p>
          <div class="yoga-pose-footer">
            <span class="yoga-difficulty-badge" style="background:${diffColors[pose.difficulty] || '#6b7280'}20;color:${diffColors[pose.difficulty] || '#6b7280'};">${pose.difficulty}</span>
            <span class="yoga-pose-dur">⏱ ${Math.round((pose.duration_seconds || 60) / 60)} min</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  /**
   * Filter poses by difficulty/category
   */
  filterPoses() {
    const difficulty = document.getElementById('yoga-difficulty-filter')?.value;
    const category = document.getElementById('yoga-category-filter')?.value;
    const poses = this.allPoses.length > 0 ? this.allPoses : YOGA_FALLBACK_POSES;

    let filtered = poses;
    if (difficulty) filtered = filtered.filter(p => p.difficulty === difficulty);
    if (category) filtered = filtered.filter(p => p.category === category);

    const container = document.getElementById('yoga-poses-grid');
    if (container) this._renderPosesGrid(container, filtered.slice(0, 20));
  },

  /**
   * Show pose detail modal
   */
  showPoseDetail(poseId) {
    const pose = [...(this.allPoses || []), ...YOGA_FALLBACK_POSES].find(p => p.id === poseId);
    if (!pose) return;

    const existing = document.getElementById('yoga-pose-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'yoga-pose-modal';
    modal.className = 'yoga-modal-overlay';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
      <div class="yoga-modal-box">
        <button class="yoga-modal-close" onclick="document.getElementById('yoga-pose-modal').remove()">✕</button>
        <div class="yoga-modal-icon">🧘</div>
        <h2 class="yoga-modal-title">${pose.english_name}</h2>
        <p class="yoga-modal-sanskrit">${pose.sanskrit_name}</p>
        <div class="yoga-modal-badges">
          <span class="badge">${pose.difficulty}</span>
          <span class="badge">${pose.category || 'general'}</span>
          <span class="badge">⏱ ${Math.round((pose.duration_seconds || 60) / 60)} min</span>
        </div>
        ${pose.description ? `<p class="yoga-modal-desc">${pose.description}</p>` : ''}
        ${pose.benefits?.length ? `
          <div class="yoga-modal-section">
            <h4>Benefits</h4>
            <ul>${pose.benefits.slice(0, 5).map(b => `<li>✓ ${b}</li>`).join('')}</ul>
          </div>
        ` : ''}
        ${pose.instructions?.length ? `
          <div class="yoga-modal-section">
            <h4>How to do it</h4>
            <ol>${pose.instructions.map(s => `<li>${s}</li>`).join('')}</ol>
          </div>
        ` : ''}
      </div>
    `;
    document.body.appendChild(modal);
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
        <div class="yoga-no-recommendation">
          <div class="yoga-no-rec-icon">📋</div>
          <p>Complete a mental health assessment first to get your personalized yoga program.</p>
          <button class="btn btn-primary" onclick="Router.navigate('assessment')" style="margin-top:12px;">
            Take Assessment
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="yoga-rec-content">
        <div class="yoga-rec-header">
          <span class="yoga-rec-icon">${recommendation.icon || '🧘'}</span>
          <div>
            <h3 class="yoga-rec-name">${recommendation.name}</h3>
            <p class="yoga-rec-subtitle">${recommendation.subtitle}</p>
          </div>
        </div>
        <p class="yoga-rec-desc">${recommendation.description}</p>
        <div class="yoga-rec-details">
          <div class="yoga-rec-detail"><span>📅</span><strong>${recommendation.duration_days} days</strong></div>
          <div class="yoga-rec-detail"><span>⏰</span><strong>${recommendation.frequency}</strong></div>
          <div class="yoga-rec-detail"><span>📈</span><strong>${recommendation.expected_improvement?.score_reduction || 'Significant improvement'}</strong></div>
        </div>
        <button class="btn btn-primary" onclick="Yoga.startQuickSession('${recommendation.id}')" style="width:100%;margin-top:16px;padding:14px;">
          🧘 Start Program
        </button>
      </div>
    `;
  },

  /**
   * Load session stats from Firestore
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
      const totalMinutes = sessions.docs.reduce((sum, doc) => {
        return sum + (doc.data().poses_completed || 0) * 5;
      }, 0);

      // Calculate streak
      let streak = 0;
      const today = new Date().toDateString();
      const sessionDates = sessions.docs.map(d => {
        const sd = d.data().session_date;
        return sd?.toDate ? sd.toDate().toDateString() : new Date(sd).toDateString();
      });
      const uniqueDates = [...new Set(sessionDates)].sort((a, b) => new Date(b) - new Date(a));
      if (uniqueDates.length > 0) {
        let check = new Date();
        for (const dateStr of uniqueDates) {
          if (new Date(dateStr).toDateString() === check.toDateString()) {
            streak++;
            check.setDate(check.getDate() - 1);
          } else break;
        }
      }

      const sessEl = document.getElementById('stat-sessions');
      const durEl = document.getElementById('stat-duration');
      const strEl = document.getElementById('stat-streak');
      if (sessEl) sessEl.textContent = totalSessions;
      if (durEl) durEl.textContent = totalMinutes >= 60 ? `${Math.round(totalMinutes / 60)}h` : `${totalMinutes}m`;
      if (strEl) strEl.textContent = streak;

    } catch (error) {
      console.error('Error loading yoga stats:', error);
    }
  },

  // ── Session Logic ─────────────────────────────────────────────────────────

  /**
   * Start a quick session for a given protocol
   */
  async startQuickSession(protocolId) {
    const protocol = this.protocols.find(p => p.id === protocolId) ||
                     YOGA_FALLBACK_PROTOCOLS.find(p => p.id === protocolId);

    if (!protocol) {
      if (typeof Utils !== 'undefined') Utils.showToast('Protocol not found', 'error');
      return;
    }

    // Get protocol-specific poses
    let sessionPoses = [];
    if (protocol.pose_ids && protocol.pose_ids.length > 0) {
      const allAvailable = this.allPoses.length > 0 ? this.allPoses : YOGA_FALLBACK_POSES;
      sessionPoses = protocol.pose_ids
        .map(id => allAvailable.find(p => p.id === id))
        .filter(Boolean);
    }

    // Fallback to first 5 poses if no specific mapping
    if (sessionPoses.length === 0) {
      sessionPoses = (this.allPoses.length > 0 ? this.allPoses : YOGA_FALLBACK_POSES).slice(0, 5);
    }

    this.currentSession = {
      protocolId: protocol.id,
      protocol: protocol,
      poses: sessionPoses,
      currentPoseIndex: 0,
      startTime: new Date()
    };

    Router.navigate(`yoga-session/${protocolId}`);
  },

  /**
   * Display the current pose in session
   */
  displayCurrentPose(protocolId) {
    if (!this.currentSession) return;

    const pose = this.currentSession.poses[this.currentSession.currentPoseIndex];
    if (!pose) { this.finishSession(); return; }

    const container = document.getElementById('yoga-current-pose');
    if (!container) return;

    const diffColors = { beginner: '#10b981', intermediate: '#f59e0b', advanced: '#ef4444' };

    container.innerHTML = `
      <div class="yoga-active-pose">
        <div class="yoga-active-pose-icon">🧘</div>
        <div class="yoga-active-pose-info">
          <h2 class="yoga-active-pose-name">${pose.english_name}</h2>
          <p class="yoga-active-pose-sanskrit">${pose.sanskrit_name}</p>
          <div class="yoga-active-badges">
            <span class="yoga-difficulty-badge" style="background:${diffColors[pose.difficulty] || '#6b7280'}20;color:${diffColors[pose.difficulty] || '#6b7280'};">${pose.difficulty}</span>
            <span class="yoga-duration-badge">Hold: ${Math.round((pose.duration_seconds || 60) / 60)} min</span>
          </div>
          ${pose.description ? `<p class="yoga-active-desc">${pose.description}</p>` : ''}
          ${pose.instructions?.length ? `
            <div class="yoga-active-instructions">
              <strong>Instructions:</strong>
              <ol>${pose.instructions.slice(0, 3).map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
          ` : ''}
          ${pose.benefits?.length ? `
            <div class="yoga-active-benefits">
              <strong>Benefits:</strong> ${pose.benefits.slice(0, 2).join(' • ')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  /**
   * Start the countdown timer for current pose
   */
  startPoseTimer() {
    if (!this.currentSession) return;
    if (this._timerInterval) clearInterval(this._timerInterval);

    const pose = this.currentSession.poses[this.currentSession.currentPoseIndex];
    if (!pose) return;

    const duration = pose.duration_seconds || 60;
    let remaining = duration;

    const startBtn = document.getElementById('yoga-start-btn');
    if (startBtn) { startBtn.disabled = true; startBtn.textContent = '⏸ In Progress...'; }

    this._timerInterval = setInterval(() => {
      remaining--;
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      const timerEl = document.getElementById('yoga-timer');
      if (timerEl) timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (remaining <= 0) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
        this.nextPose();
      }
    }, 1000);
  },

  /**
   * Skip to next pose
   */
  skipPose() {
    if (this._timerInterval) { clearInterval(this._timerInterval); this._timerInterval = null; }
    this.nextPose();
  },

  /**
   * Advance to next pose
   */
  nextPose() {
    if (!this.currentSession) return;

    this.currentSession.currentPoseIndex++;
    const idx = this.currentSession.currentPoseIndex;
    const total = this.currentSession.poses.length;
    const progress = (idx / total) * 100;

    const progEl = document.getElementById('yoga-session-progress');
    const counterEl = document.getElementById('yoga-pose-counter');
    const doneEl = document.getElementById('yoga-poses-done');
    const startBtn = document.getElementById('yoga-start-btn');
    const timerEl = document.getElementById('yoga-timer');

    if (progEl) progEl.style.width = progress + '%';
    if (counterEl) counterEl.textContent = `Pose ${Math.min(idx + 1, total)} of ${total}`;
    if (doneEl) doneEl.textContent = `${idx}/${total}`;
    if (startBtn) { startBtn.disabled = false; startBtn.textContent = '▶ Start Pose'; }
    if (timerEl) timerEl.textContent = '00:00';

    if (idx >= total) {
      this.finishSession();
    } else {
      this.displayCurrentPose(this.currentSession.protocolId);
    }
  },

  /**
   * Exit session early
   */
  exitSession() {
    if (this._timerInterval) { clearInterval(this._timerInterval); this._timerInterval = null; }
    this.currentSession = null;
    Router.navigate('yoga');
  },

  /**
   * Finish session and save to Firestore
   */
  async finishSession() {
    if (this._timerInterval) { clearInterval(this._timerInterval); this._timerInterval = null; }

    try {
      const user = firebase.auth().currentUser;
      if (user && this.currentSession) {
        const sessionRecord = {
          user_id: user.uid,
          protocol_id: this.currentSession.protocolId,
          protocol_name: this.currentSession.protocol?.name || '',
          session_date: firebase.firestore.FieldValue.serverTimestamp(),
          poses_completed: this.currentSession.currentPoseIndex,
          total_poses: this.currentSession.poses.length,
          completed: true,
          created_at: new Date().toISOString()
        };
        await db.collection('yoga_sessions').add(sessionRecord);
        console.log('✅ Yoga session saved to Firestore');
      }
    } catch (error) {
      console.warn('Could not save session to Firestore:', error.message);
    }

    this.showSessionSummary();
  },

  /**
   * Show session completion summary
   */
  showSessionSummary() {
    const session = this.currentSession;
    if (!session) { Router.navigate('yoga'); return; }

    const completionRate = Math.round((session.currentPoseIndex / session.poses.length) * 100);
    const durationMin = Math.round(session.currentPoseIndex * 5);

    const appEl = document.getElementById('app');
    if (!appEl) return;

    appEl.innerHTML = `
      <div class="yoga-summary">
        <div class="yoga-summary-icon">🎉</div>
        <h2 class="yoga-summary-title">Great Practice!</h2>
        <p class="yoga-summary-subtitle">${session.protocol?.name || 'Yoga Session'} Completed</p>

        <div class="yoga-summary-stats">
          <div class="yoga-summary-stat">
            <span class="yoga-summary-stat-value">${completionRate}%</span>
            <span class="yoga-summary-stat-label">Completed</span>
          </div>
          <div class="yoga-summary-stat">
            <span class="yoga-summary-stat-value">${session.currentPoseIndex}</span>
            <span class="yoga-summary-stat-label">Poses</span>
          </div>
          <div class="yoga-summary-stat">
            <span class="yoga-summary-stat-value">${durationMin}m</span>
            <span class="yoga-summary-stat-label">Duration</span>
          </div>
        </div>

        <p class="yoga-summary-msg">Keep practicing daily for the best mental health benefits. Consistency is key! 💪</p>

        <div style="display:flex;gap:12px;margin-top:24px;">
          <button class="btn btn-primary" onclick="Router.navigate('yoga')" style="flex:1;padding:14px;">
            🧘 Practice Again
          </button>
          <button class="btn btn-secondary" onclick="Router.navigate('dashboard')" style="flex:1;padding:14px;">
            🏠 Home
          </button>
        </div>
      </div>
    `;

    this.currentSession = null;
  }
};

// Make globally available
window.Yoga = Yoga;
