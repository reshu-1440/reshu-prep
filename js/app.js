/**
 * Master Application Controller for 180-Day SDE + AI/ML Internship Preparation Dashboard
 * Manages view routing, interactive UI components, modals, filters, and event binding.
 */

const App = {
  currentView: "dashboard",
  searchQuery: "",
  activeDayNumber: null, // Dynamic: null indicates default to today's calendar day
  audioRecorder: null,
  audioChunks: [],
  recordingInterval: null,
  recordSeconds: 0,
  isSimulatedRecording: false,
  verifyingTaskId: null,

  init() {
    this.bindGlobalEvents();
    this.initSidebarControls();
    this.applyTheme(StorageManager.getState().theme || "light");

    // Check URL hash on load for deep linking (e.g. #dsa, #today, #communication)
    const initialHash = window.location.hash ? window.location.hash.slice(1).toLowerCase() : "";
    const validViews = ["dashboard", "today", "roadmap", "dsa", "sde", "aiml", "projects", "ailog", "communication", "applications", "assessments", "resources", "settings"];
    const startView = validViews.includes(initialHash) ? initialHash : "dashboard";

    this.updateHeaderBadges();
    this.navigate(startView);

    // Listen to custom state update events
    window.addEventListener("app-state-updated", () => {
      this.updateHeaderBadges();
      this.renderCurrentView();
    });

    // Listen to hash changes
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1).toLowerCase();
      if (validViews.includes(hash) && this.currentView !== hash) {
        this.navigate(hash);
      }
    });
  },

  // Initialize Sidebar Controls & Mode Selection
  initSidebarControls() {
    const collapseBtn = document.getElementById("sidebar-collapse-btn");
    const expandBtn = document.getElementById("sidebar-expand-btn");

    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => this.toggleSidebar(false));
    }
    if (expandBtn) {
      expandBtn.addEventListener("click", () => this.toggleSidebar(true));
    }

    // Keyboard shortcut (Ctrl+B / Cmd+B) to toggle sidebar
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
        e.preventDefault();
        const isCollapsed = document.body.classList.contains("sidebar-collapsed");
        this.toggleSidebar(isCollapsed);
      }
    });

    // Restore saved sidebar collapsed state
    const savedCollapsed = localStorage.getItem("prep_sidebar_collapsed") === "true";
    if (savedCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    }

    // Restore saved cadence mode (daily vs all)
    const savedMode = localStorage.getItem("prep_sidebar_mode") || "daily";
    this.setSidebarMode(savedMode, false);
  },

  toggleSidebar(expand) {
    if (expand) {
      document.body.classList.remove("sidebar-collapsed");
      localStorage.setItem("prep_sidebar_collapsed", "false");
    } else {
      document.body.classList.add("sidebar-collapsed");
      localStorage.setItem("prep_sidebar_collapsed", "true");
    }
  },

  setSidebarMode(mode, showFeedback = true) {
    const sidebar = document.querySelector(".app-sidebar");
    const pillDaily = document.getElementById("mode-pill-daily");
    const pillAll = document.getElementById("mode-pill-all");

    if (mode === "daily") {
      if (sidebar) sidebar.classList.add("daily-focus-mode");
      if (pillDaily) pillDaily.classList.add("active");
      if (pillAll) pillAll.classList.remove("active");
      localStorage.setItem("prep_sidebar_mode", "daily");
      if (showFeedback) this.showToast("⚡ Daily Focus: Displaying today's core routine.", "info");
    } else {
      if (sidebar) sidebar.classList.remove("daily-focus-mode");
      if (pillDaily) pillDaily.classList.remove("active");
      if (pillAll) pillAll.classList.add("active");
      localStorage.setItem("prep_sidebar_mode", "all");
      if (showFeedback) this.showToast("🌐 All Sections: Full curriculum tracks and tools unlocked.", "info");
    }
  },

  // Active day number getter
  getActiveDayNumber() {
    if (this.activeDayNumber !== null && this.activeDayNumber >= 1 && this.activeDayNumber <= 182) {
      return this.activeDayNumber;
    }
    const stats = StorageManager.getOverallStats();
    this.activeDayNumber = stats.dayNumber || 1;
    return this.activeDayNumber;
  },

  prevDay() {
    const cur = this.getActiveDayNumber();
    if (cur > 1) {
      this.activeDayNumber = cur - 1;
      this.updateHeaderBadges();
      if (this.currentView === "today") {
        this.renderCurrentView();
      } else {
        this.navigate("today");
      }
    }
  },

  nextDay() {
    const cur = this.getActiveDayNumber();
    if (cur < 182) {
      this.activeDayNumber = cur + 1;
      this.updateHeaderBadges();
      if (this.currentView === "today") {
        this.renderCurrentView();
      } else {
        this.navigate("today");
      }
    }
  },

  jumpToToday() {
    const stats = StorageManager.getOverallStats();
    this.activeDayNumber = stats.dayNumber || 1;
    this.updateHeaderBadges();
    if (this.currentView === "today") {
      this.renderCurrentView();
    } else {
      this.navigate("today");
    }
    this.showToast(`Active Day set to Today (Day ${this.activeDayNumber})`, "info");
  },

  setDay(dayNum) {
    const clamped = Math.min(182, Math.max(1, parseInt(dayNum, 10) || 1));
    this.activeDayNumber = clamped;
    this.updateHeaderBadges();
    if (this.currentView === "today") {
      this.renderCurrentView();
    } else {
      this.navigate("today");
    }
  },

  // Navigation router
  navigate(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.view === viewName);
    });

    // Close mobile sidebar if open
    const sidebar = document.querySelector(".app-sidebar");
    if (sidebar) sidebar.classList.remove("mobile-open");

    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  // Render active view
  renderCurrentView() {
    const container = document.getElementById("main-view-container");
    if (!container) return;

    switch (this.currentView) {
      case "dashboard":
        this.renderDashboardView(container);
        break;
      case "today":
        this.renderTodayView(container);
        break;
      case "roadmap":
        this.renderRoadmapView(container);
        break;
      case "dsa":
        this.renderDsaView(container);
        break;
      case "sde":
        this.renderSdeView(container);
        break;
      case "aiml":
        this.renderAimlView(container);
        break;
      case "projects":
        this.renderProjectsView(container);
        break;
      case "ailog":
        this.renderAiLogView(container);
        break;
      case "communication":
        this.renderCommunicationView(container);
        break;
      case "applications":
        this.renderApplicationsView(container);
        break;
      case "assessments":
        this.renderAssessmentsView(container);
        break;
      case "resources":
        this.renderResourcesView(container);
        break;
      case "settings":
        this.renderSettingsView(container);
        break;
      default:
        this.renderDashboardView(container);
    }
  },

  // Bind Global UI Listeners
  bindGlobalEvents() {
    // Navigation clicks
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        const view = item.dataset.view;
        if (view) this.navigate(view);
      });
    });

    // Mobile nav toggle
    const mobileToggle = document.getElementById("mobile-nav-toggle");
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        document.querySelector(".app-sidebar").classList.toggle("mobile-open");
      });
    }

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const state = StorageManager.getState();
        const nextTheme = state.theme === "dark" ? "light" : "dark";
        state.theme = nextTheme;
        StorageManager.saveState();
        this.applyTheme(nextTheme);
      });
    }

    // Exam Mode header button
    const examBtn = document.getElementById("header-exam-btn");
    if (examBtn) {
      examBtn.addEventListener("click", () => {
        const state = StorageManager.getState();
        const nowEnabled = !state.examMode.isEnabled;
        StorageManager.toggleExamMode(nowEnabled);
        this.showToast(nowEnabled ? "Examination Mode Activated (Maintenance Schedule)" : "Examination Mode Deactivated (Normal Schedule)", "info");
      });
    }

    // Global Search
    const searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        if (!this.searchQuery) {
          this.renderCurrentView();
          return;
        }
        if (["dsa", "resources", "roadmap"].includes(this.currentView)) {
          this.renderCurrentView();
        } else {
          this.navigate("dsa");
        }
      });
    }

    // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for search, Escape to close modals)
    document.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        const searchInput = document.getElementById("global-search-input");
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      if (e.key === "Escape") {
        this.closeAllModals();
      }
    });

    // Modal Close buttons
    document.querySelectorAll(".modal-close-btn, .modal-cancel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.closeAllModals();
      });
    });

    // Close on overlay click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", e => {
        if (e.target === overlay) this.closeAllModals();
      });
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.innerHTML = theme === "dark" 
        ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
        : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
    }
  },

  updateHeaderBadges() {
    const stats = StorageManager.getOverallStats();
    const state = StorageManager.getState();

    // Progress pill
    const progressEl = document.getElementById("header-progress-pct");
    if (progressEl) progressEl.textContent = `${stats.percentComplete}%`;
    const progressFill = document.getElementById("header-progress-fill");
    if (progressFill) progressFill.style.width = `${stats.percentComplete}%`;

    // Active Day & Week calculations
    const activeDay = this.getActiveDayNumber();
    const activeWeek = Math.min(26, Math.floor((activeDay - 1) / 7) + 1);

    // Compute active date string (Nov 17 2026 + activeDay - 1)
    const startDate = new Date(2026, 10, 17);
    const activeDateObj = new Date(startDate);
    activeDateObj.setDate(startDate.getDate() + (activeDay - 1));
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${dayNames[activeDateObj.getDay()]}, ${activeDateObj.getDate()} ${monthNames[activeDateObj.getMonth()]} ${activeDateObj.getFullYear()}`;

    // Week & Day pill
    const weekPill = document.getElementById("header-week-pill");
    if (weekPill) weekPill.textContent = `Week ${activeWeek} • Day ${activeDay}`;

    // Header Date Text
    const dateText = document.getElementById("header-date-text");
    if (dateText) dateText.textContent = formattedDate;

    // Sidebar Day Badge
    const sidebarDayBadge = document.getElementById("sidebar-day-badge");
    if (sidebarDayBadge) sidebarDayBadge.textContent = `Day ${activeDay}`;

    // Exam Mode status
    const examBtn = document.getElementById("header-exam-btn");
    const examBanner = document.getElementById("exam-mode-banner");
    const isExam = state.examMode && state.examMode.isEnabled;

    if (examBtn) {
      examBtn.classList.toggle("active", isExam);
      const textSpan = examBtn.querySelector(".exam-btn-text");
      if (textSpan) textSpan.textContent = isExam ? "EXAM MODE: ON" : "EXAM MODE: OFF";
    }

    if (examBanner) {
      examBanner.style.display = isExam ? "flex" : "none";
    }

    // Sidebar revision badge
    const revBadge = document.getElementById("nav-badge-dsa-rev");
    if (revBadge) {
      revBadge.textContent = stats.revisionDueCount;
      revBadge.style.display = stats.revisionDueCount > 0 ? "inline-flex" : "none";
    }
  },

  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ')}</span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  },

  closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  },

  // -------------------------------------------------------------
  // VIEW 1: OVERVIEW / DASHBOARD
  // -------------------------------------------------------------
  renderDashboardView(container) {
    const stats = StorageManager.getOverallStats();
    const state = StorageManager.getState();
    const revisionQueue = StorageManager.getSpacedRevisionQueue();

    const activeDayNum = this.getActiveDayNumber();
    const activeWeekNum = Math.min(26, Math.floor((activeDayNum - 1) / 7) + 1);
    const dayIdx = (activeDayNum - 1) % 7;
    const activeWeek = state.roadmap ? state.roadmap.find(w => w.weekNumber === activeWeekNum) || state.roadmap[0] : null;
    const activeDay = activeWeek && activeWeek.days ? activeWeek.days[dayIdx] : null;

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Preparation Command Center</h1>
            <p class="view-subtitle">180-Day SDE + AI/ML Internship Preparation • Asia/Kolkata Timezone</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-primary" onclick="App.navigate('today')">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
              View Today's Tasks
            </button>
            <button class="btn-secondary" onclick="App.navigate('dsa')">DSA Revision Queue (${stats.revisionDueCount})</button>
          </div>
        </div>
      </div>

      <!-- Quick-Start Onboarding Guide Banner -->
      <div class="card-panel" style="background: linear-gradient(135deg, rgba(79, 91, 255, 0.08), rgba(6, 182, 212, 0.08)); border: 1px solid rgba(79, 91, 255, 0.25); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="font-size: 14px; font-weight: 700; color: var(--accent-primary); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
              <span>🧭</span> Quick-Start Guide: Your 3-Step Daily Routine
            </h3>
            <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
              1. <strong>Solve Assigned DSA Problems:</strong> Dedicate 60–90 mins using the 25-minute struggle rule before checking hints.<br/>
              2. <strong>Clear Spaced Revisions:</strong> Re-solve problems flagged at Day 1, 3, 7, 14, 30 to lock algorithms into memory.<br/>
              3. <strong>Record 1 Technical Explanation:</strong> Use the voice recorder in the English Hub to master interview articulation.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-secondary" onclick="App.navigate('today')">Open Action Studio</button>
            <button class="btn-secondary" onclick="App.navigate('settings')">Configure Profile</button>
          </div>
        </div>
      </div>

      <!-- KPI Metrics Grid -->
      <div class="kpi-cards-grid">
        <div class="kpi-card">
          <div class="kpi-label">Overall Completion</div>
          <div class="kpi-value-row">
            <span class="kpi-value" style="color: var(--accent-cyan);">${stats.percentComplete}%</span>
            <span class="badge badge-dsa">${stats.completedTasks} / ${stats.totalTasks} Tasks</span>
          </div>
          <div class="kpi-subtext">${stats.daysRemaining} days remaining until May 17, 2027</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">DSA Mastery Status</div>
          <div class="kpi-value-row">
            <span class="kpi-value" style="color: var(--accent-success);">${stats.dsaMastered}</span>
            <span class="badge badge-comm">Target: 110+</span>
          </div>
          <div class="kpi-subtext">${stats.dsaIndependent} independent • ${stats.dsaOptimized} optimized</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Capstone Projects Audit</div>
          <div class="kpi-value-row">
            <span class="kpi-value" style="color: var(--accent-primary);">3</span>
            <span class="badge badge-project">Production Portfolio</span>
          </div>
          <div class="kpi-subtext">Enterprise SDE • ML Microservice • Systems Store</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">Internship Application CRM</div>
          <div class="kpi-value-row">
            <span class="kpi-value" style="color: var(--accent-warning);">${stats.appStats.total}</span>
            <span class="badge badge-project">${stats.appStats.interview} Interviews</span>
          </div>
          <div class="kpi-subtext">${stats.appStats.applied} submitted • ${stats.appStats.assessment} assessments</div>
        </div>
      </div>

      ${revisionQueue.length > 0 ? `
        <div class="card-panel" style="border-left: 4px solid var(--accent-danger); background-color: rgba(244, 63, 94, 0.04);">
          <div class="card-panel-header">
            <span class="card-panel-title" style="color: var(--accent-danger);">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Spaced Revision Alert: ${revisionQueue.length} DSA Problems Due Today
            </span>
            <button class="btn-sm-action" onclick="App.navigate('dsa')">Review Queue Now →</button>
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 10px;">
            To consolidate long-term algorithmic recall, solve these problems independently without hints:
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${revisionQueue.slice(0, 4).map(p => `
              <span class="status-pill status-attempted" style="cursor: pointer;" onclick="App.navigate('dsa')">
                ${p.name} (${p.topic})
              </span>
            `).join('')}
            ${revisionQueue.length > 4 ? `<span class="badge badge-priority-med">+${revisionQueue.length - 4} more</span>` : ''}
          </div>
        </div>
      ` : ''}

      <!-- 2-Column Grid: Charts & Today's Plan -->
      <div class="dashboard-grid-2col">
        <div>
          <!-- Weekly Progress Chart Panel -->
          <div class="card-panel">
            <div class="card-panel-header">
              <span class="card-panel-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                26-Week Roadmap Execution Progress
              </span>
              <span style="font-size: 11px; color: var(--text-muted);">Current: Week ${stats.currentWeekNumber}</span>
            </div>
            <div id="chart-weekly-progress"></div>
          </div>

          <!-- 5-Track Progress Comparison Panel -->
          <div class="card-panel">
            <div class="card-panel-header">
              <span class="card-panel-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                5-Track Learning Allocation vs Execution
              </span>
            </div>
            <div id="chart-track-bars"></div>
          </div>
        </div>

        <div>
          <!-- DSA Mastery Donut Chart Panel -->
          <div class="card-panel">
            <div class="card-panel-header">
              <span class="card-panel-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path></svg>
                DSA Problem Mastery Breakdown
              </span>
              <button class="btn-sm-action" onclick="App.navigate('dsa')">View All (${stats.dsaTotal})</button>
            </div>
            <div id="chart-dsa-donut"></div>
          </div>

          <!-- Internship Application Funnel Panel -->
          <div class="card-panel">
            <div class="card-panel-header">
              <span class="card-panel-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Internship Funnel Pipeline
              </span>
              <button class="btn-sm-action" onclick="App.navigate('applications')">Open CRM</button>
            </div>
            <div id="chart-app-funnel"></div>
          </div>
        </div>
      </div>

      <!-- Today's Action Plan Quick Card -->
      <div class="card-panel">
        <div class="card-panel-header">
          <div>
            <span class="card-panel-title">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Today's Execution Schedule: ${activeDay ? activeDay.dayName + ', ' + activeDay.date : 'Day ' + activeDayNum} (Day ${activeDayNum})
            </span>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              Theme: ${activeDay ? activeDay.focusArea : 'Engineering Preparation'} • Target: ${activeDay ? activeDay.hoursPlanned : 3.5} Productive Study Hours
            </div>
          </div>
          <button class="btn-primary" onclick="App.navigate('today')">Open Action Studio →</button>
        </div>

        <div class="task-list">
          ${activeDay && activeDay.tasks ? activeDay.tasks.map(t => this.renderTaskCardHtml(t)).join('') : '<p class="text-muted">No tasks loaded.</p>'}
        </div>
      </div>
    `;

    // Render charts asynchronously
    setTimeout(() => {
      Charts.renderWeeklyProgress("chart-weekly-progress", state.roadmap, stats.currentWeekNumber);
      Charts.renderDsaDonut("chart-dsa-donut", stats);
      Charts.renderTrackBars("chart-track-bars", stats.trackStats);
      Charts.renderApplicationFunnel("chart-app-funnel", stats.appStats);
    }, 50);
  },

  // -------------------------------------------------------------
  // VIEW 2: TODAY'S TASKS
  // -------------------------------------------------------------
  renderTodayView(container) {
    const state = StorageManager.getState();
    const stats = StorageManager.getOverallStats();
    const isExam = state.examMode && state.examMode.isEnabled;

    const activeDayNum = this.getActiveDayNumber();
    const activeWeekNum = Math.min(26, Math.floor((activeDayNum - 1) / 7) + 1);
    const dayIdx = (activeDayNum - 1) % 7;

    const week = state.roadmap ? state.roadmap.find(w => w.weekNumber === activeWeekNum) || state.roadmap[0] : null;
    const day = week && week.days ? week.days[dayIdx] : null;

    // Check if all actionable tasks for this day are verified
    const actionableTasks = day && day.tasks ? day.tasks.filter(t => !isExam || t.isExamMaintenance) : [];
    const allDone = actionableTasks.length > 0 && actionableTasks.every(t => t.isCompleted);
    const completedCount = actionableTasks.filter(t => t.isCompleted).length;

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Today's Action Studio</h1>
            <p class="view-subtitle">${day ? day.dayName : 'Tuesday'}, ${day ? day.date : '2026-11-17'} • Week ${activeWeekNum} • Day ${activeDayNum} of 182</p>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <button class="btn-secondary" onclick="App.prevDay()" ${activeDayNum <= 1 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''} title="Previous Day">
              ◀ Prev Day
            </button>
            <select class="form-select" id="today-day-select" onchange="App.setDay(this.value)" style="padding: 6px 10px; font-size: 12px; font-weight: 600; background: var(--bg-card); color: var(--text-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); cursor: pointer;">
              ${Array.from({ length: 182 }, (_, i) => {
                const dNum = i + 1;
                const wNum = Math.min(26, Math.floor(i / 7) + 1);
                return `<option value="${dNum}" ${dNum === activeDayNum ? 'selected' : ''}>Day ${dNum} (W${wNum})${dNum === stats.dayNumber ? ' - Today' : ''}</option>`;
              }).join('')}
            </select>
            <button class="btn-secondary" onclick="App.jumpToToday()" title="Jump to actual calendar date (Day ${stats.dayNumber})">
              Today (Day ${stats.dayNumber})
            </button>
            <button class="btn-secondary" onclick="App.nextDay()" ${activeDayNum >= 182 ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''} title="Next Day">
              Next Day ▶
            </button>
            <button class="btn-primary" onclick="App.navigate('roadmap')" title="View 26-Week Schedule">
              Full Roadmap
            </button>
          </div>
        </div>
      </div>

      <!-- Day Completion & Advancement Banner -->
      ${allDone ? `
        <div class="card-panel" style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.35); margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="color: var(--accent-success); font-size: 14px; font-weight: 700; margin-bottom: 3px; display: flex; align-items: center; gap: 6px;">
              <span>🎉</span> Day ${activeDayNum} Tasks Completed & Verified!
            </h3>
            <p style="font-size: 12px; color: var(--text-secondary);">
              All ${actionableTasks.length} tasks satisfied the Definition of Done. Ready to advance to the next day's schedule?
            </p>
          </div>
          ${activeDayNum < 182 ? `
            <button class="btn-primary" onclick="App.nextDay()" style="font-weight: 700; background: var(--accent-success); border-color: var(--accent-success); color: #fff;">
              Advance to Day ${activeDayNum + 1} ▶
            </button>
          ` : `
            <span class="badge badge-success">Roadmap Completed! 🏆</span>
          `}
        </div>
      ` : (completedCount > 0 ? `
        <div class="card-panel" style="background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.2); margin-bottom: 16px; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: var(--text-secondary);">
            Progress for Day ${activeDayNum}: <strong style="color: var(--accent-cyan);">${completedCount} of ${actionableTasks.length}</strong> tasks completed
          </span>
          <span style="font-size: 12px; font-weight: 600; color: var(--accent-cyan);">${Math.round((completedCount / actionableTasks.length) * 100)}%</span>
        </div>
      ` : '')}

      ${isExam ? `
        <div class="card-panel" style="border-left: 4px solid var(--accent-warning); background-color: rgba(245, 158, 11, 0.05); margin-bottom: 20px;">
          <h3 style="color: var(--accent-warning); font-size: 14px; margin-bottom: 4px;">Examination Maintenance Mode Active</h3>
          <p style="font-size: 12px; color: var(--text-secondary);">
            Daily task target is reduced to 1.5 hours: 1 essential DSA problem + 15 min English speaking + 1 critical spaced revision.
            Heavy project milestones and application quotas are paused to prioritize your university examinations.
          </p>
        </div>
      ` : ''}

      <div class="dashboard-grid-2col">
        <div>
          <!-- Focus & Hours Header -->
          <div class="card-panel" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="badge badge-dsa" style="margin-bottom: 6px;">Daily Objective</span>
                <h2 style="font-size: 16px; font-weight: 700;">${day ? day.focusArea : 'Foundations & Complexity Analysis'}</h2>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 20px; font-weight: 700; color: var(--accent-cyan);">${isExam ? '1.5' : day.hoursPlanned} hrs</span>
                <div style="font-size: 11px; color: var(--text-muted);">Allocated Duration</div>
              </div>
            </div>
          </div>

          <!-- Task Cards List -->
          <div class="task-list">
            ${day && day.tasks ? day.tasks.map(t => {
              if (isExam && !t.isExamMaintenance) {
                return `
                  <div class="task-card" style="opacity: 0.5; border-style: dashed;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; color: var(--text-muted);">${t.title}</span>
                      <span class="badge badge-priority-low">Paused for Exam</span>
                    </div>
                  </div>
                `;
              }
              return this.renderTaskCardHtml(t, true);
            }).join('') : '<p class="text-muted">No tasks available for today.</p>'}
          </div>
        </div>

        <div>
          <!-- Daily 30-Minute English Routine Card -->
          <div class="card-panel">
            <div class="card-panel-header">
              <span class="card-panel-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z"></path></svg>
                Daily 30-Minute English Communication Routine
              </span>
              <span class="badge badge-comm">Mandatory</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
              <div style="padding: 10px; background-color: var(--bg-sidebar); border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan);">
                <strong style="color: var(--text-primary); display: block; margin-bottom: 2px;">Part 1 (10 mins) - Everyday Speaking:</strong>
                <span style="color: var(--text-secondary);">${day && day.dailyCommunication ? day.dailyCommunication.everydayTopic : 'Speak aloud about your daily study discipline and personal goals.'}</span>
              </div>

              <div style="padding: 10px; background-color: var(--bg-sidebar); border-radius: var(--radius-sm); border-left: 3px solid var(--accent-primary);">
                <strong style="color: var(--text-primary); display: block; margin-bottom: 2px;">Part 2 (10 mins) - Technical Explanation:</strong>
                <span style="color: var(--text-secondary);">${day && day.dailyCommunication ? day.dailyCommunication.technicalConcept : 'Explain how nested loops determine Big-O polynomial complexity.'}</span>
              </div>

              <div style="padding: 10px; background-color: var(--bg-sidebar); border-radius: var(--radius-sm); border-left: 3px solid var(--accent-success);">
                <strong style="color: var(--text-primary); display: block; margin-bottom: 2px;">Part 3 (10 mins) - Interview Answer Recording:</strong>
                <span style="color: var(--text-secondary);">${day && day.dailyCommunication ? day.dailyCommunication.interviewAnswer : 'Deliver a 90-second response to "Tell me about yourself".'}</span>
              </div>
            </div>

            <!-- Built-in Voice Recorder & Practice Timer -->
            <div class="audio-recorder-box" id="daily-audio-box">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: 600; color: var(--text-muted);">Interactive Practice Recorder</span>
                <div class="rec-status-indicator">
                  <span class="rec-pulse-dot"></span>
                  <span id="rec-status-text">Ready</span>
                </div>
              </div>

              <div class="recorder-controls-row">
                <span class="rec-timer-display" id="rec-timer-display">00:00</span>
                <button class="btn-primary" id="btn-start-record" onclick="App.toggleAudioRecording()">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg>
                  Record Answer
                </button>
                <button class="btn-secondary" id="btn-save-speak-log" onclick="App.openAddSpeakingLogModal()">
                  Log Practice Entry
                </button>
              </div>

              <audio id="audio-playback" controls style="width: 100%; display: none; margin-top: 8px;"></audio>
            </div>
          </div>

          <!-- Daily Engineering Practice Protocol -->
          <div class="card-panel">
            <div class="card-panel-header">
              <span class="card-panel-title">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Deliberate Practice Protocol
              </span>
              <button class="btn-sm-action" onclick="App.navigate('ailog')">Activity Log</button>
            </div>
            <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
              Solve problems from first principles. Always benchmark brute force before optimizing, verify edge cases, and trace memory layout in your local IDE.
            </p>
            <div style="margin-top: 10px;">
              <button class="btn-secondary" style="width: 100%; justify-content: center;" onclick="App.openAddAiLogModal()">
                + Log Implementation Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Helper: Render individual Task Card HTML
  renderTaskCardHtml(task, showDoD = true) {
    const isDone = !!task.isCompleted;
    return `
      <div class="task-card ${isDone ? 'completed' : ''}" id="task-${task.id}">
        <div class="task-main-row">
          <div class="task-checkbox-wrap">
            <div class="task-checkbox ${isDone ? 'checked' : ''}" onclick="App.toggleTaskComplete('${task.id}')">
              ${isDone ? '✓' : ''}
            </div>
          </div>
          <div class="task-content-box">
            <div class="task-title-line">
              <span>${task.title}</span>
              <span style="font-size: 11px; font-weight: 500; color: var(--text-muted);">${task.estimatedMinutes} mins</span>
            </div>

            <div class="task-badges-line">
              <span class="badge badge-${task.track || 'dsa'}">${task.track || 'DSA'}</span>
              <span class="badge badge-priority-${(task.priority || 'med').toLowerCase().slice(0, 3)}">${task.priority || 'Medium'}</span>
              ${task.resourceTitle ? (
                task.resourceUrl && task.resourceUrl.startsWith('#') ? `
                  <a href="javascript:void(0)" onclick="App.navigate('${task.resourceUrl.slice(1)}')" class="badge" style="background: var(--bg-tertiary); color: var(--accent-cyan); cursor: pointer;" title="Navigate directly to ${task.resourceTitle}">
                    ↗ ${task.resourceTitle}
                  </a>
                ` : `
                  <a href="${task.resourceUrl || '#'}" target="_blank" rel="noopener noreferrer" class="badge" style="background: var(--bg-tertiary); color: var(--accent-cyan);" title="Open official documentation/problem">
                    ↗ ${task.resourceTitle}
                  </a>
                `
              ) : ''}
            </div>

            ${showDoD ? `
              <details class="task-details-collapsible" ${isDone ? '' : 'open'}>
                <summary style="cursor:pointer; font-size:11.5px; font-weight:600; color:var(--accent-primary); list-style:none; display:flex; align-items:center; gap:5px; margin-bottom:6px;">
                  <span class="details-toggle-icon">▶</span> Why & How to execute
                </summary>
                <div style="margin-bottom: 6px;"><strong>Why you are studying this:</strong> ${task.whyLearn || 'Foundational topic for internship technical rounds.'}</div>
                <div><strong>Actionable steps:</strong><br/>${(task.taskDetails || 'Study concept → brute force → optimize → test edge cases.').replace(/\n/g, '<br/>')}</div>

                <div class="task-dod-box" style="margin-top:8px;">
                  <strong>Definition of Done:</strong> ${task.definitionOfDone || 'Can reproduce solution independently and explain Big-O complexity.'}
                </div>
              </details>
            ` : ''}

            <div class="task-actions-row">
              <button class="btn-sm-action" onclick="App.openTaskEditModal('${task.id}')">
                ✏ Add Notes / Evidence
              </button>
              ${task.notes ? `<span style="font-size: 11px; color: var(--text-muted);">Note: "${task.notes.slice(0, 30)}..."</span>` : ''}
              ${task.confidence ? `<span class="badge badge-comm">Confidence: ${task.confidence}/5</span>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Toggle Task Completion (Opens DoD Verification Modal when completing)
  toggleTaskComplete(taskId) {
    const state = StorageManager.getState();
    let currentTask = null;

    for (const w of state.roadmap) {
      for (const d of w.days) {
        const found = d.tasks.find(t => t.id === taskId);
        if (found) { currentTask = found; break; }
      }
      if (currentTask) break;
    }

    if (!currentTask) return;

    if (!currentTask.isCompleted) {
      this.openDoDVerificationModal(taskId);
      return;
    }

    // Already completed: confirm if student wants to uncheck
    if (confirm(`Mark "${currentTask.title}" as incomplete?`)) {
      StorageManager.updateTask(taskId, { isCompleted: false, completedAt: null });
      this.showToast("Task marked incomplete.", "info");
      this.updateHeaderBadges();
      this.renderCurrentView();
    }
  },

  // Open Definition of Done (DoD) Verification Modal
  openDoDVerificationModal(taskId) {
    const state = StorageManager.getState();
    let task = null;

    for (const w of state.roadmap) {
      for (const d of w.days) {
        const found = d.tasks.find(t => t.id === taskId);
        if (found) { task = found; break; }
      }
      if (task) break;
    }

    if (!task) return;
    this.verifyingTaskId = taskId;

    const modal = document.getElementById("dod-verification-modal");
    if (!modal) return;

    const confirmCard = modal.querySelector(".dod-confirmation-card");
    if (confirmCard) confirmCard.classList.remove("dod-highlight-error");
    const chk = document.getElementById("dod-confirm-checkbox");
    if (chk) chk.checked = false;

    const titleEl = document.getElementById("dod-modal-title");
    if (titleEl) titleEl.textContent = task.title;

    const whyEl = document.getElementById("dod-modal-why");
    if (whyEl) whyEl.textContent = task.whyLearn || "Essential for building deep, independent competence in technical rounds.";

    const detailsEl = document.getElementById("dod-modal-details");
    if (detailsEl) {
      const rawDetails = task.taskDetails || "1. Study concept from first principles.\n2. Attempt brute-force solution.\n3. Optimize and code locally.\n4. Test edge cases.";
      detailsEl.innerHTML = rawDetails.replace(/\n/g, "<br/>");
    }

    const dodEl = document.getElementById("dod-modal-dod");
    if (dodEl) dodEl.textContent = task.definitionOfDone || "Code passes all edge cases without AI assistance; time & space complexity analyzed.";

    const durEl = document.getElementById("dod-modal-duration");
    if (durEl) durEl.value = task.timeSpent || task.estimatedMinutes || 60;

    const confEl = document.getElementById("dod-modal-confidence");
    if (confEl) confEl.value = String(task.confidence || "4");

    const githubEl = document.getElementById("dod-modal-github");
    if (githubEl) githubEl.value = task.githubUrl || "";

    const refEl = document.getElementById("dod-modal-reflection");
    if (refEl) refEl.value = task.notes || "";

    modal.classList.add("active");
  },

  // Confirm and Mark Complete from DoD Verification Modal
  confirmDoDVerification() {
    if (!this.verifyingTaskId) return;

    const chk = document.getElementById("dod-confirm-checkbox");
    const modal = document.getElementById("dod-verification-modal");
    const confirmCard = modal ? modal.querySelector(".dod-confirmation-card") : null;

    if (!chk || !chk.checked) {
      if (confirmCard) {
        confirmCard.classList.remove("dod-highlight-error");
        void confirmCard.offsetWidth; // trigger reflow
        confirmCard.classList.add("dod-highlight-error");
      }
      this.showToast("Please independently confirm the Definition of Done before completing!", "error");
      return;
    }

    const durInput = document.getElementById("dod-modal-duration");
    const confInput = document.getElementById("dod-modal-confidence");
    const ghInput = document.getElementById("dod-modal-github");
    const refInput = document.getElementById("dod-modal-reflection");

    const timeSpent = durInput ? (parseInt(durInput.value, 10) || 60) : 60;
    const confidence = confInput ? (parseInt(confInput.value, 10) || 4) : 4;
    const githubUrl = ghInput ? ghInput.value.trim() : "";
    const notes = refInput ? refInput.value.trim() : "";

    const taskId = this.verifyingTaskId;
    StorageManager.updateTask(taskId, {
      isCompleted: true,
      timeSpent,
      confidence,
      githubUrl,
      notes
    });

    // Check if this task links to a DSA problem in the state to sync spaced repetition
    const state = StorageManager.getState();
    if (state.dsaProblems && state.dsaProblems.length) {
      const taskObj = this.findTaskById(taskId);
      const cleanTaskTitle = (taskObj && taskObj.title) ? taskObj.title.toLowerCase() : "";
      const matchedProb = state.dsaProblems.find(p => p.id === taskId || (p.name && cleanTaskTitle.includes(p.name.toLowerCase())));
      if (matchedProb) {
        const confLabel = confidence >= 4 ? "high" : (confidence === 3 ? "medium" : "low");
        StorageManager.updateDsaProblem(matchedProb.id, {
          status: "solved",
          confidence: confLabel
        });
      }
    }

    this.closeAllModals();
    this.verifyingTaskId = null;
    this.showToast("Task verified & marked complete! Solid work! 🎉", "success");
    this.updateHeaderBadges();
    this.renderCurrentView();
  },

  findTaskById(taskId) {
    const state = StorageManager.getState();
    if (!state || !state.roadmap) return null;
    for (const w of state.roadmap) {
      for (const d of w.days) {
        const found = d.tasks.find(t => t.id === taskId);
        if (found) return found;
      }
    }
    return null;
  },

  // Open Task Notes & Evidence Modal
  openTaskEditModal(taskId) {
    const state = StorageManager.getState();
    let task = null;

    for (const w of state.roadmap) {
      for (const d of w.days) {
        const found = d.tasks.find(t => t.id === taskId);
        if (found) { task = found; break; }
      }
      if (task) break;
    }
    if (!task) return;

    const modal = document.getElementById("task-edit-modal");
    if (!modal) return;

    document.getElementById("edit-task-id").value = task.id;
    document.getElementById("edit-task-title").textContent = task.title;
    document.getElementById("edit-task-notes").value = task.notes || "";
    document.getElementById("edit-task-github").value = task.githubUrl || "";
    document.getElementById("edit-task-confidence").value = task.confidence || "4";
    document.getElementById("edit-task-timespent").value = task.timeSpent || task.estimatedMinutes || 60;

    modal.classList.add("active");
  },

  saveTaskEditFromModal() {
    const taskId = document.getElementById("edit-task-id").value;
    const notes = document.getElementById("edit-task-notes").value;
    const githubUrl = document.getElementById("edit-task-github").value;
    const confidence = parseInt(document.getElementById("edit-task-confidence").value, 10);
    const timeSpent = parseInt(document.getElementById("edit-task-timespent").value, 10);

    StorageManager.updateTask(taskId, {
      notes,
      githubUrl,
      confidence,
      timeSpent
    });

    this.closeAllModals();
    this.showToast("Task notes and verification saved!", "success");
  },

  // -------------------------------------------------------------
  // VIEW 3: 26-WEEK ROADMAP
  // -------------------------------------------------------------
  renderRoadmapView(container) {
    const state = StorageManager.getState();
    const weeks = state.roadmap || [];

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">26-Week Master Roadmap</h1>
            <p class="view-subtitle">Nov 17, 2026 – May 17, 2027 • 182 Structured Days with Definitions of Done</p>
          </div>
          <div class="filter-group">
            <select class="form-select" id="roadmap-month-filter" onchange="App.filterRoadmapByMonth(this.value)">
              <option value="all">All 6 Months</option>
              <option value="1">Month 1: Programming Foundations & DSA</option>
              <option value="2">Month 2: Intermediate DSA & CS Fundamentals</option>
              <option value="3">Month 3: Advanced DSA & Full-Stack SDE</option>
              <option value="4">Month 4: Advanced AI/ML & Engineering</option>
              <option value="5">Month 5: Interview Prep & Applications</option>
              <option value="6">Month 6: Final Readiness & Simulation</option>
            </select>
          </div>
        </div>
      </div>

      <div class="week-accordion-list" id="roadmap-accordion-container">
        ${weeks.map(w => this.renderWeekCardHtml(w)).join('')}
      </div>
    `;
  },

  renderWeekCardHtml(week) {
    const isCurrent = week.weekNumber === 1;
    let completedCount = 0;
    let totalCount = 0;

    week.days.forEach(d => {
      d.tasks.forEach(t => {
        totalCount++;
        if (t.isCompleted) completedCount++;
      });
    });

    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return `
      <div class="week-card ${isCurrent ? 'current-week open' : ''}" id="week-card-${week.weekNumber}">
        <div class="week-card-header" onclick="App.toggleWeekAccordion(${week.weekNumber})">
          <div class="week-header-info">
            <span class="week-num-badge">W${week.weekNumber}</span>
            <div>
              <div class="week-title-text">${week.title}</div>
              <div class="week-dates-sub">${week.startDate} to ${week.endDate} • ${week.theme}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="text-align: right;">
              <span style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">${completedCount}/${totalCount} Tasks (${pct}%)</span>
              <div class="progress-micro-bar" style="width: 80px; margin-top: 3px;">
                <div class="progress-micro-fill" style="width: ${pct}%;"></div>
              </div>
            </div>
            <span class="accordion-arrow" style="color: var(--text-muted); font-size: 14px;">▼</span>
          </div>
        </div>

        <div class="week-card-body">
          <!-- Weekly Objectives -->
          <div style="margin-bottom: 16px; padding: 12px 14px; background-color: var(--bg-sidebar); border-radius: var(--radius-sm);">
            <strong style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">Weekly Objectives:</strong>
            <ul style="padding-left: 18px; font-size: 12px; color: var(--text-secondary); line-height: 1.6;">
              ${week.weeklyObjectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>

          <!-- Daily Tabs -->
          <div class="days-tab-nav" id="days-nav-w${week.weekNumber}">
            ${week.days.map((d, idx) => `
              <button class="day-tab-btn ${idx === 0 ? 'active' : ''}" onclick="App.switchDayTab(${week.weekNumber}, ${idx})">
                ${d.dayName.slice(0, 3)} (${d.date.slice(5)})
              </button>
            `).join('')}
          </div>

          <!-- Day Content Container -->
          <div id="day-content-w${week.weekNumber}">
            ${this.renderDayTasksInsideWeek(week.days[0])}
          </div>

          <!-- Weekly Evaluation Card -->
          <div style="margin-top: 20px; padding: 14px 16px; background-color: var(--bg-sidebar); border: 1px solid var(--border-default); border-radius: var(--radius-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Weekly Evaluation & 100-Point Assessment
              </strong>
              <button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="App.openWeeklyAssessmentModal(${week.weekNumber})">
                ${week.weeklyEvaluation && week.weeklyEvaluation.score !== null ? `Score: ${week.weeklyEvaluation.score}/100` : 'Grade Week ' + week.weekNumber}
              </button>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px;">
              <strong>Assessment Prompt:</strong> ${week.weeklyEvaluation.assessmentPrompt}
            </p>
            <p style="font-size: 11px; color: var(--text-muted);">
              <strong>Interview Question:</strong> "${week.weeklyEvaluation.interviewQuestion}"
            </p>
          </div>
        </div>
      </div>
    `;
  },

  renderDayTasksInsideWeek(day) {
    if (!day) return '<p class="text-muted">No day data.</p>';
    return `
      <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${day.dayName}, ${day.date} • Focus: ${day.focusArea}</span>
        <span class="badge badge-dsa">${day.hoursPlanned} Hours Allocated</span>
      </div>
      <div class="task-list">
        ${day.tasks.map(t => this.renderTaskCardHtml(t, true)).join('')}
      </div>
    `;
  },

  toggleWeekAccordion(weekNumber) {
    const card = document.getElementById(`week-card-${weekNumber}`);
    if (card) {
      card.classList.toggle("open");
    }
  },

  switchDayTab(weekNumber, dayIdx) {
    const state = StorageManager.getState();
    const week = state.roadmap.find(w => w.weekNumber === weekNumber);
    if (!week) return;

    // Update active button
    const nav = document.getElementById(`days-nav-w${weekNumber}`);
    if (nav) {
      nav.querySelectorAll(".day-tab-btn").forEach((btn, idx) => {
        btn.classList.toggle("active", idx === dayIdx);
      });
    }

    // Update day content
    const container = document.getElementById(`day-content-w${weekNumber}`);
    if (container && week.days[dayIdx]) {
      container.innerHTML = this.renderDayTasksInsideWeek(week.days[dayIdx]);
    }
  },

  filterRoadmapByMonth(monthVal) {
    const cards = document.querySelectorAll(".week-card");
    cards.forEach(card => {
      if (monthVal === "all") {
        card.style.display = "block";
      } else {
        const id = card.id.replace("week-card-", "");
        const weekNum = parseInt(id, 10);
        const state = StorageManager.getState();
        const w = state.roadmap.find(x => x.weekNumber === weekNum);
        card.style.display = (w && w.month === parseInt(monthVal, 10)) ? "block" : "none";
      }
    });
  },

  // -------------------------------------------------------------
  // VIEW 4: DSA TRACKER & REVISION QUEUE
  // -------------------------------------------------------------
  renderDsaView(container) {
    const state = StorageManager.getState();
    const problems = state.dsaProblems || [];
    const stats = StorageManager.getOverallStats();
    const revisionQueue = StorageManager.getSpacedRevisionQueue();

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">DSA Mastery Management System</h1>
            <p class="view-subtitle">Quality Problem Solving with Complexity Justification & Spaced Repetition</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-primary" onclick="App.openAddDsaProblemModal()">+ Add Custom Problem</button>
          </div>
        </div>
      </div>

      <!-- Spaced Revision Queue Notice Banner -->
      <div class="card-panel" style="background-color: var(--bg-sidebar); border-left: 4px solid var(--accent-primary); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 6px;">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Spaced Revision Queue (Day 1, 3, 7, 14, 30 Intervals)
            </h3>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Currently <strong>${revisionQueue.length}</strong> problems scheduled for recall verification today.
            </p>
          </div>
          <button class="btn-secondary" onclick="App.filterDsaToRevisionQueue()">Show Due Revisions (${revisionQueue.length})</button>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="filter-controls-bar">
        <div class="filter-group">
          <input type="text" class="form-input" id="dsa-search-filter" placeholder="Search problem name or pattern..." value="${this.searchQuery}" oninput="App.onDsaFilterChange()" style="width: 220px;" />

          <select class="form-select" id="dsa-topic-filter" onchange="App.onDsaFilterChange()">
            <option value="all">All Topics</option>
            <option value="Arrays & Hashing">Arrays & Hashing</option>
            <option value="Strings">Strings</option>
            <option value="Two Pointers">Two Pointers</option>
            <option value="Sliding Window">Sliding Window</option>
            <option value="Binary Search">Binary Search</option>
            <option value="Linked Lists">Linked Lists</option>
            <option value="Stacks & Queues">Stacks & Queues</option>
            <option value="Trees">Trees</option>
            <option value="Binary Search Trees">Binary Search Trees</option>
            <option value="Heaps & Priority Queues">Heaps & Priority Queues</option>
            <option value="Graphs">Graphs</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Greedy">Greedy</option>
            <option value="Intervals">Intervals</option>
            <option value="Backtracking">Backtracking</option>
          </select>

          <select class="form-select" id="dsa-diff-filter" onchange="App.onDsaFilterChange()">
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select class="form-select" id="dsa-status-filter" onchange="App.onDsaFilterChange()">
            <option value="all">All Mastery Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="attempted">Attempted</option>
            <option value="solved_with_hints">Solved with Hints</option>
            <option value="solved_independently">Solved Independently</option>
            <option value="optimized_explained">Optimized & Explained</option>
            <option value="mastered">Mastered After Revision</option>
          </select>
        </div>

        <div style="font-size: 12px; color: var(--text-muted);" id="dsa-count-display">
          Showing ${problems.length} problems
        </div>
      </div>

      <!-- DSA Table -->
      <div class="data-table-wrapper">
        <table class="data-table" id="dsa-master-table">
          <thead>
            <tr>
              <th>Problem Name</th>
              <th>Platform</th>
              <th>Topic</th>
              <th>Diff</th>
              <th>Target Complexity</th>
              <th>Mastery Status</th>
              <th>Attempts</th>
              <th>Next Revision</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="dsa-table-body">
            ${this.renderDsaTableRows(problems)}
          </tbody>
        </table>
      </div>
    `;
  },

  renderDsaTableRows(problems) {
    if (!problems || problems.length === 0) {
      return `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 24px;">No problems match current filters.</td></tr>`;
    }

    return problems.map(p => `
      <tr id="dsa-row-${p.id}">
        <td>
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 4px;">
            ${p.name}
            <span style="font-size: 10px; color: var(--accent-cyan);">↗</span>
          </a>
          <span style="font-size: 10px; color: var(--text-muted); display: block;">Pattern: ${p.pattern || 'Pattern recognition'}</span>
        </td>
        <td><span class="badge" style="background: var(--bg-tertiary);">${p.platform}</span></td>
        <td><span style="font-size: 11px;">${p.topic}</span></td>
        <td><span class="diff-${p.difficulty.toLowerCase()}">${p.difficulty}</span></td>
        <td>
          <span class="font-mono" style="font-size: 10px; color: var(--accent-cyan); display: block;">T: ${p.targetTimeComplexity}</span>
          <span class="font-mono" style="font-size: 10px; color: var(--text-muted);">S: ${p.targetSpaceComplexity}</span>
        </td>
        <td>
          <span class="status-pill status-${p.status}">
            ${this.formatStatusLabel(p.status)}
          </span>
        </td>
        <td style="text-align: center;">
          <span style="font-weight: 600;">${p.attemptCount || 0}</span>
        </td>
        <td>
          ${p.nextRevisionDate ? `<span class="badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent-cyan);">${p.nextRevisionDate}</span>` : '<span style="color: var(--text-muted); font-size: 10px;">—</span>'}
        </td>
        <td>
          <button class="btn-sm-action" onclick="App.openDsaEditModal('${p.id}')">
            Update / Revise
          </button>
        </td>
      </tr>
    `).join('');
  },

  formatStatusLabel(st) {
    const map = {
      not_started: "Not Started",
      attempted: "Attempted",
      solved_with_hints: "Solved w/ Hints",
      solved_independently: "Solved Independent",
      optimized_explained: "Optimized & Explained",
      mastered: "Mastered ✓"
    };
    return map[st] || st;
  },

  onDsaFilterChange() {
    const search = (document.getElementById("dsa-search-filter")?.value || "").toLowerCase().trim();
    const topic = document.getElementById("dsa-topic-filter")?.value || "all";
    const diff = document.getElementById("dsa-diff-filter")?.value || "all";
    const status = document.getElementById("dsa-status-filter")?.value || "all";

    const state = StorageManager.getState();
    const filtered = (state.dsaProblems || []).filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search) || (p.pattern && p.pattern.toLowerCase().includes(search)) || p.topic.toLowerCase().includes(search);
      const matchTopic = topic === "all" || p.topic === topic;
      const matchDiff = diff === "all" || p.difficulty === diff;
      const matchStatus = status === "all" || p.status === status;
      return matchSearch && matchTopic && matchDiff && matchStatus;
    });

    const tbody = document.getElementById("dsa-table-body");
    if (tbody) tbody.innerHTML = this.renderDsaTableRows(filtered);

    const countDisplay = document.getElementById("dsa-count-display");
    if (countDisplay) countDisplay.textContent = `Showing ${filtered.length} problems`;
  },

  filterDsaToRevisionQueue() {
    const queue = StorageManager.getSpacedRevisionQueue();
    const tbody = document.getElementById("dsa-table-body");
    if (tbody) tbody.innerHTML = this.renderDsaTableRows(queue);
    const countDisplay = document.getElementById("dsa-count-display");
    if (countDisplay) countDisplay.textContent = `Showing ${queue.length} problems due for revision`;
  },

  openDsaEditModal(problemId) {
    const state = StorageManager.getState();
    const problem = state.dsaProblems.find(p => p.id === problemId);
    if (!problem) return;

    const modal = document.getElementById("dsa-edit-modal");
    if (!modal) return;

    document.getElementById("edit-dsa-id").value = problem.id;
    document.getElementById("edit-dsa-name").textContent = `${problem.name} (${problem.difficulty} - ${problem.topic})`;
    document.getElementById("edit-dsa-url").href = problem.url;
    document.getElementById("edit-dsa-independent").checked = !!problem.solvedIndependently;
    document.getElementById("edit-dsa-bruteforce").checked = !!problem.bruteForceSolved;
    document.getElementById("edit-dsa-optimized").checked = !!problem.optimizedSolved;
    document.getElementById("edit-dsa-explained").checked = !!problem.explanationCompleted;
    document.getElementById("edit-dsa-hintused").checked = !!problem.hintUsed;
    document.getElementById("edit-dsa-aiused").checked = !!problem.aiUsed;
    document.getElementById("edit-dsa-timecomp").value = problem.timeComplexity || problem.targetTimeComplexity || "";
    document.getElementById("edit-dsa-spacecomp").value = problem.spaceComplexity || problem.targetSpaceComplexity || "";
    document.getElementById("edit-dsa-confidence").value = problem.confidence || "3";
    document.getElementById("edit-dsa-notes").value = problem.notes || "";

    modal.classList.add("active");
  },

  saveDsaEditFromModal(isMarkRevision = false) {
    const id = document.getElementById("edit-dsa-id").value;
    const solvedIndependently = document.getElementById("edit-dsa-independent").checked;
    const bruteForceSolved = document.getElementById("edit-dsa-bruteforce").checked;
    const optimizedSolved = document.getElementById("edit-dsa-optimized").checked;
    const explanationCompleted = document.getElementById("edit-dsa-explained").checked;
    const hintUsed = document.getElementById("edit-dsa-hintused").checked;
    const aiUsed = document.getElementById("edit-dsa-aiused").checked;
    const timeComplexity = document.getElementById("edit-dsa-timecomp").value;
    const spaceComplexity = document.getElementById("edit-dsa-spacecomp").value;
    const confidence = parseInt(document.getElementById("edit-dsa-confidence").value, 10);
    const notes = document.getElementById("edit-dsa-notes").value;

    const state = StorageManager.getState();
    const existing = state.dsaProblems.find(p => p.id === id);
    const newAttemptCount = (existing ? existing.attemptCount : 0) + 1;

    StorageManager.updateDsaProblem(id, {
      solvedIndependently,
      bruteForceSolved,
      optimizedSolved,
      explanationCompleted,
      hintUsed,
      aiUsed,
      timeComplexity,
      spaceComplexity,
      confidence,
      notes,
      attemptCount: newAttemptCount,
      markRevised: isMarkRevision
    });

    this.closeAllModals();
    this.showToast(isMarkRevision ? "Spaced revision logged! Next interval scheduled." : "DSA problem status updated!", "success");
    this.renderCurrentView();
  },

  openAddDsaProblemModal() {
    const modal = document.getElementById("dsa-add-modal");
    if (modal) modal.classList.add("active");
  },

  saveNewDsaProblem() {
    const name = document.getElementById("add-dsa-name").value.trim();
    if (!name) {
      alert("Please enter a problem name.");
      return;
    }

    const platform = document.getElementById("add-dsa-platform").value;
    const topic = document.getElementById("add-dsa-topic").value;
    const difficulty = document.getElementById("add-dsa-diff").value;
    const url = document.getElementById("add-dsa-url").value.trim() || "https://leetcode.com/";
    const pattern = document.getElementById("add-dsa-pattern").value.trim();
    const targetTimeComplexity = document.getElementById("add-dsa-timecomp").value.trim();
    const targetSpaceComplexity = document.getElementById("add-dsa-spacecomp").value.trim();
    const notes = document.getElementById("add-dsa-notes").value.trim();

    StorageManager.addDsaProblem({
      name,
      platform,
      topic,
      difficulty,
      url,
      pattern,
      targetTimeComplexity,
      targetSpaceComplexity,
      notes
    });

    this.closeAllModals();
    this.showToast("New DSA problem added to tracker!", "success");
    this.renderCurrentView();
  },

  // -------------------------------------------------------------
  // VIEW 5: SDE TRACK & PLACEMENT PORTAL
  // -------------------------------------------------------------
  renderSdeView(container) {
    const state = StorageManager.getState();
    const sde = state.sdeCurriculum || {};
    const portal = state.placementPortalSpec || {};

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Full-Stack SDE Development Track</h1>
            <p class="view-subtitle">Frontend, Backend, PostgreSQL Relational Database & Placement Portal Capstone</p>
          </div>
        </div>
      </div>

      <!-- Placement Management Portal Capstone Deep Dive -->
      <div class="card-panel" style="border-left: 4px solid var(--accent-cyan); background-color: rgba(56, 189, 248, 0.03);">
        <div class="card-panel-header">
          <div>
            <span class="badge badge-sde" style="margin-bottom: 4px;">Primary SDE Capstone Project</span>
            <h2 style="font-size: 18px; font-weight: 700;">${portal.title || 'Placement Management Portal'}</h2>
          </div>
          <span class="badge badge-priority-high">Months 3–5 Core Deliverable</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.5;">
          ${portal.description || ''}
        </p>

        <!-- Tech Stack Pill Group -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
          <span class="badge" style="background: var(--bg-tertiary);">Frontend: ${portal.techStack?.frontend || 'React'}</span>
          <span class="badge" style="background: var(--bg-tertiary);">Backend: ${portal.techStack?.backend || 'Node/Express'}</span>
          <span class="badge" style="background: var(--bg-tertiary);">Database: ${portal.techStack?.database || 'PostgreSQL'}</span>
          <span class="badge" style="background: var(--bg-tertiary);">Auth: ${portal.techStack?.auth || 'JWT & bcrypt'}</span>
        </div>

        <!-- Architecture Breakdown -->
        <div style="background-color: var(--bg-sidebar); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 14px;">
          <strong style="font-size: 12px; color: var(--text-primary); display: block; margin-bottom: 8px;">Multi-Tier System Architecture:</strong>
          <ul style="padding-left: 18px; font-size: 11px; color: var(--text-secondary); line-height: 1.6;">
            ${(portal.architecture || []).map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>

        <!-- Relational Database Schema -->
        <div style="background-color: var(--bg-sidebar); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 14px;">
          <strong style="font-size: 12px; color: var(--text-primary); display: block; margin-bottom: 8px;">PostgreSQL Normalized Schema Tables:</strong>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(portal.databaseSchema || []).map(s => `
              <div class="font-mono" style="font-size: 11px; background: var(--bg-app); padding: 6px 10px; border-radius: 4px; color: var(--accent-cyan); overflow-x: auto;">
                ${s}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 8 Implementation Milestones -->
        <div>
          <strong style="font-size: 12px; color: var(--text-primary); display: block; margin-bottom: 8px;">Development Milestones:</strong>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${(portal.milestones || []).map(m => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-sidebar); padding: 8px 12px; border-radius: var(--radius-sm); font-size: 12px;">
                <span>${m.title}</span>
                <span class="badge badge-sde">Target: Week ${m.week}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- SDE Curriculum Sections -->
      <div class="dashboard-grid-2col">
        <!-- Frontend & Backend -->
        <div>
          <div class="card-panel">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--accent-cyan);">Frontend Core Competencies</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(sde.frontend || []).map(item => `
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                  <span style="color: var(--accent-cyan);">●</span>
                  <span>${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card-panel">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--accent-primary);">Backend & APIs (Node / Express)</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(sde.backend || []).map(item => `
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                  <span style="color: var(--accent-primary);">●</span>
                  <span>${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Database & Dev Tools -->
        <div>
          <div class="card-panel">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--accent-warning);">PostgreSQL & Relational DBMS</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(sde.database || []).map(item => `
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                  <span style="color: var(--accent-warning);">●</span>
                  <span>${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card-panel">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; color: var(--accent-success);">Developer Tools & Git Workflows</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${(sde.tools || []).map(item => `
                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; padding: 6px 0; border-bottom: 1px solid var(--border-subtle);">
                  <span style="color: var(--accent-success);">●</span>
                  <span>${item.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // VIEW 6: AI/ML SPECIALIZATION TRACK
  // -------------------------------------------------------------
  renderAimlView(container) {
    const state = StorageManager.getState();
    const modules = state.aimlModules || [];

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">AI/ML Specialization Track</h1>
            <p class="view-subtitle">18 Structured Modules: Mathematics, Classical ML, PyTorch, GenAI, RAG & FastAPI Serving</p>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${modules.map(mod => `
          <div class="card-panel" id="aiml-card-${mod.id}">
            <div class="card-panel-header">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span class="badge badge-aiml">${mod.level}</span>
                  <span class="badge" style="background: var(--bg-tertiary);">Month ${mod.month} • Week ${mod.week}</span>
                </div>
                <h2 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${mod.title}</h2>
              </div>
              <span class="status-pill status-${mod.status || 'not_started'}">
                ${mod.status === 'completed' ? 'Verified Complete ✓' : 'In Progress'}
              </span>
            </div>

            <!-- Objectives -->
            <div style="margin-bottom: 12px;">
              <strong style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 4px;">Core Learning Objectives:</strong>
              <ul style="padding-left: 18px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
                ${mod.objectives.map(obj => `<li>${obj}</li>`).join('')}
              </ul>
            </div>

            <!-- Practical Mini-Project -->
            <div style="padding: 10px 14px; background-color: rgba(168, 85, 247, 0.08); border-left: 3px solid var(--accent-purple); border-radius: var(--radius-sm); margin-bottom: 12px; font-size: 12px;">
              <strong style="color: var(--accent-purple);">Practical Assignment / Capstone Task:</strong>
              <span style="color: var(--text-secondary); display: block; margin-top: 2px;">${mod.miniProject}</span>
            </div>

            <!-- Knowledge Check Accordion -->
            <div style="background-color: var(--bg-sidebar); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 12px;">
              <strong style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 6px;">Technical Interview Knowledge Checks:</strong>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${mod.knowledgeChecks.map(kc => `
                  <div style="font-size: 12px; color: var(--text-secondary); padding: 4px 0;">
                    <span style="color: var(--accent-cyan); font-weight: 600;">Q:</span> ${kc}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Resources & Output Links -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${mod.resourceLinks.map(res => `
                  <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="badge" style="background: var(--bg-tertiary); color: var(--accent-cyan);">
                    ↗ ${res.title}
                  </a>
                `).join('')}
              </div>
              <button class="btn-sm-action" onclick="App.toggleAimlModuleComplete('${mod.id}')">
                ${mod.status === 'completed' ? 'Mark Incomplete' : 'Verify & Mark Complete ✓'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  toggleAimlModuleComplete(modId) {
    const state = StorageManager.getState();
    const mod = state.aimlModules.find(m => m.id === modId);
    if (!mod) return;

    mod.status = mod.status === "completed" ? "not_started" : "completed";
    StorageManager.saveState();
    this.showToast(mod.status === "completed" ? "AI/ML Module marked verified!" : "Module marked incomplete.", "success");
    this.renderCurrentView();
  },

  // -------------------------------------------------------------
  // VIEW 7: PROJECT AUDIT & CAPSTONES
  // -------------------------------------------------------------
  renderProjectsView(container) {
    const state = StorageManager.getState();
    const audited = state.auditedProjects || [];
    const capstones = state.capstoneProjects || [];

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Project Management & Technical Audit</h1>
            <p class="view-subtitle">Audit of 10–15 Previous Projects & Execution of 3 Core Defensible Capstones</p>
          </div>
        </div>
      </div>

      <!-- 3 Defensible Capstone Projects -->
      <div style="margin-bottom: 28px;">
        <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: var(--accent-cyan);">The 3 Priority Capstone Projects (Must Defend Without AI)</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${capstones.map(cap => `
            <div class="card-panel" style="border-left: 4px solid var(--accent-primary);">
              <div class="card-panel-header">
                <div>
                  <span class="badge badge-project" style="margin-bottom: 4px;">${cap.role}</span>
                  <h3 style="font-size: 16px; font-weight: 700;">${cap.title}</h3>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${cap.focus}</div>
                </div>
                <div style="text-align: right;">
                  <span class="badge badge-comm">Understanding: ${cap.understandingScore}/10</span>
                  <div style="font-size: 11px; color: var(--accent-success); font-weight: 600; margin-top: 4px;">${cap.independentPercent}% Independent</div>
                </div>
              </div>

              <div style="margin-bottom: 12px; font-size: 12px; color: var(--text-secondary);">
                <strong>Architecture:</strong> ${cap.architectureSpec}
              </div>

              <!-- Interview Defense Q&A Box -->
              <div style="background-color: var(--bg-sidebar); border-radius: var(--radius-sm); padding: 14px; font-size: 12px; display: flex; flex-direction: column; gap: 8px;">
                <strong style="color: var(--accent-primary); font-size: 11px; text-transform: uppercase;">Interview Defense Talking Points:</strong>
                <div><strong>1. Problem Solved:</strong> ${cap.interviewDefensePoints.problemSolved}</div>
                <div><strong>2. Technology Trade-offs:</strong> ${cap.interviewDefensePoints.techChoices}</div>
                <div><strong>3. Key Challenge:</strong> ${cap.interviewDefensePoints.challengesFaced}</div>
                <div><strong>4. Toughest Bug / Post-Mortem:</strong> ${cap.interviewDefensePoints.debuggingStory}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Previous Projects Technical Audit Table -->
      <div>
        <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 14px; color: var(--text-primary);">Audit of Existing 10–15 College & AI Projects</h2>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
          Classification guideline: Strong candidates are kept and rebuilt; tutorial/AI-assisted copies are strictly excluded from resume to protect interview credibility.
        </p>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Category</th>
                <th>Code Authenticity</th>
                <th>Code Understanding</th>
                <th>Classification</th>
                <th>Strategic Verdict</th>
              </tr>
            </thead>
            <tbody>
              ${audited.map(p => `
                <tr>
                  <td><strong style="color: var(--text-primary);">${p.title}</strong></td>
                  <td><span class="badge" style="background: var(--bg-tertiary);">${p.category}</span></td>
                  <td><span style="font-size: 11px; color: var(--text-secondary);">${p.codeAuthenticity}</span></td>
                  <td style="text-align: center;"><span style="font-weight: 600;">${p.understandingRating}/10</span></td>
                  <td>
                    <span class="badge ${p.classification === 'strong_candidate' ? 'badge-comm' : (p.classification === 'worth_improving' ? 'badge-sde' : 'badge-priority-high')}">
                      ${p.classification.replace('_', ' ')}
                    </span>
                  </td>
                  <td><span style="font-size: 11px; font-weight: 500;">${p.verdict}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // VIEW 8: AI DEPENDENCY REDUCTION SYSTEM
  // -------------------------------------------------------------
  renderAiLogView(container) {
    const state = StorageManager.getState();
    const logs = state.aiLogs || [];
    const stats = StorageManager.getOverallStats();

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">AI Dependency Reduction System</h1>
            <p class="view-subtitle">The 5-Step Protocol to Eliminate Passive AI Code Generation & Build True Engineering Independence</p>
          </div>
          <button class="btn-primary" onclick="App.openAddAiLogModal()">+ Log AI Assistance Entry</button>
        </div>
      </div>

      <!-- The 5-Step Protocol Visual Flowchart Banner -->
      <div class="card-panel" style="background: linear-gradient(135deg, rgba(94, 106, 210, 0.12), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(94, 106, 210, 0.3); margin-bottom: 24px;">
        <h2 style="font-size: 15px; font-weight: 700; margin-bottom: 12px; color: var(--accent-cyan);">The Mandatory 5-Step Protocol Before Using AI:</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-primary);">
            <strong style="color: var(--accent-primary); font-size: 11px;">STEP 1: UNDERSTAND</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Write down the problem in plain English. Draw input/output diagrams on paper.</p>
          </div>
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-cyan);">
            <strong style="color: var(--accent-cyan); font-size: 11px;">STEP 2: ATTEMPT</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Spend at least 25 minutes writing independent brute-force logic with zero AI tools.</p>
          </div>
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-warning);">
            <strong style="color: var(--accent-warning); font-size: 11px;">STEP 3: SEARCH DOCS</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Check official reference documentation (cppreference, MDN, Python docs) for syntax.</p>
          </div>
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-purple);">
            <strong style="color: var(--accent-purple); font-size: 11px;">STEP 4: DEBUG ALONE</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Use print statements or debugger to trace exact line where hypothesis fails.</p>
          </div>
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm); border-top: 3px solid var(--accent-success);">
            <strong style="color: var(--accent-success); font-size: 11px;">STEP 5: RECORD & LOG</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Ask AI only for hints/concepts. Immediately log the insight in this tracker.</p>
          </div>
        </div>
      </div>

      <!-- KPI Metrics -->
      <div class="kpi-cards-grid" style="margin-bottom: 24px;">
        <div class="kpi-card">
          <div class="kpi-label">Independence Ratio</div>
          <div class="kpi-value" style="color: var(--accent-success);">${stats.aiIndependenceRatio}%</div>
          <div class="kpi-subtext">Tasks solved with &lt;= concept hints</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Total AI Logs Tracked</div>
          <div class="kpi-value" style="color: var(--accent-cyan);">${logs.length}</div>
          <div class="kpi-subtext">All assistance events transparently recorded</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Avg Independent Struggle Time</div>
          <div class="kpi-value" style="color: var(--accent-warning);">42 mins</div>
          <div class="kpi-subtext">Before consulting hints or docs</div>
        </div>
      </div>

      <!-- AI Usage Logs Table -->
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Task Attempted</th>
              <th>Independent Struggle Time</th>
              <th>AI Assistance Level</th>
              <th>Key Learning Takeaway</th>
              <th>Repeatable Alone?</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(log => `
              <tr>
                <td><span style="font-size: 11px;">${log.date}</span></td>
                <td><strong style="color: var(--text-primary);">${log.taskAttempted}</strong></td>
                <td><span class="badge badge-dsa">${log.independentDurationMinutes} mins</span></td>
                <td>
                  <span class="badge ${log.aiAssistanceLevel.includes('Full') ? 'badge-priority-high' : 'badge-aiml'}">
                    ${log.aiAssistanceLevel}
                  </span>
                </td>
                <td style="max-width: 300px; font-size: 12px;">${log.whatLearned}</td>
                <td>
                  <span class="badge ${log.canRepeatIndependently ? 'badge-comm' : 'badge-priority-med'}">
                    ${log.canRepeatIndependently ? 'Yes ✓' : 'Needs Practice'}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  openAddAiLogModal() {
    const modal = document.getElementById("ai-add-modal");
    if (modal) modal.classList.add("active");
  },

  saveNewAiLog() {
    const task = document.getElementById("add-ailog-task").value.trim();
    if (!task) {
      alert("Please enter the task attempted.");
      return;
    }
    const duration = parseInt(document.getElementById("add-ailog-duration").value, 10) || 30;
    const level = document.getElementById("add-ailog-level").value;
    const learned = document.getElementById("add-ailog-learned").value.trim();
    const repeatable = document.getElementById("add-ailog-repeat").checked;

    StorageManager.addAiLog({
      taskAttempted: task,
      independentDurationMinutes: duration,
      aiAssistanceLevel: level,
      whatLearned: learned,
      canRepeatIndependently: repeatable
    });

    this.closeAllModals();
    this.showToast("AI Dependency entry logged!", "success");
    this.renderCurrentView();
  },

  // -------------------------------------------------------------
  // VIEW 9: ENGLISH COMMUNICATION HUB
  // -------------------------------------------------------------
  renderCommunicationView(container) {
    const state = StorageManager.getState();
    const themes = typeof initialCommunicationThemes !== 'undefined' ? initialCommunicationThemes : [];
    const logs = state.speakingLogs || [];

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">English Communication & Articulation Hub</h1>
            <p class="view-subtitle">Daily 30-Minute Routine: Everyday Speaking, Technical Explanations & Interview Simulations</p>
          </div>
          <button class="btn-primary" onclick="App.openAddSpeakingLogModal()">+ Log Speaking Session</button>
        </div>
      </div>

      <!-- Daily 30-Minute Structure Card -->
      <div class="card-panel" style="border-left: 4px solid var(--accent-success); margin-bottom: 24px;">
        <h2 style="font-size: 15px; font-weight: 700; color: var(--accent-success); margin-bottom: 8px;">The Daily 30-Minute Communication Blueprint:</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm);">
            <strong style="color: var(--accent-cyan); font-size: 12px;">FIRST 10 MINUTES</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Speak on an everyday topic aloud. Focus on sentence formation, continuous flow, and eliminating filler pauses ('um', 'like').</p>
          </div>
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm);">
            <strong style="color: var(--accent-primary); font-size: 12px;">MIDDLE 10 MINUTES</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Explain one technical concept (e.g. Hash Map collisions, TCP handshake, or Bias-Variance) as if teaching a junior developer.</p>
          </div>
          <div style="background: var(--bg-sidebar); padding: 12px; border-radius: var(--radius-sm);">
            <strong style="color: var(--accent-success); font-size: 12px;">FINAL 10 MINUTES</strong>
            <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Record a formal interview answer on audio, listen to playback, critique grammatical hesitations, and log self-ratings.</p>
          </div>
        </div>
      </div>

      <!-- Speaking Practice History Table -->
      <div>
        <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">Speaking Practice Log & Confidence Growth</h2>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Theme / Context</th>
                <th>Topic Practiced</th>
                <th>Duration</th>
                <th>Confidence</th>
                <th>Fluency</th>
                <th>Vocabulary Learned</th>
                <th>Improvement Notes</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(l => `
                <tr>
                  <td><span style="font-size: 11px;">${l.date}</span></td>
                  <td><span class="badge badge-comm">${l.theme}</span></td>
                  <td><strong style="color: var(--text-primary);">${l.topic}</strong></td>
                  <td><span class="badge" style="background: var(--bg-tertiary);">${l.durationMinutes}m</span></td>
                  <td style="text-align: center;"><span style="color: var(--accent-success); font-weight: 600;">${l.confidenceScore}/5</span></td>
                  <td style="text-align: center;"><span style="color: var(--accent-cyan); font-weight: 600;">${l.fluencyScore}/5</span></td>
                  <td><span class="font-mono" style="font-size: 11px; color: var(--accent-purple);">${l.vocabularyLearned || '—'}</span></td>
                  <td style="font-size: 11px; max-width: 250px;">${l.improvementNotes || '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // Audio recording handlers
  toggleAudioRecording() {
    const btn = document.getElementById("btn-start-record");
    const statusText = document.getElementById("rec-status-text");
    const timerDisplay = document.getElementById("rec-timer-display");
    const audioBox = document.getElementById("daily-audio-box");
    const audioPlayer = document.getElementById("audio-playback");

    // If simulated timer is active, stop it cleanly
    if (this.isSimulatedRecording) {
      clearInterval(this.recordingInterval);
      this.isSimulatedRecording = false;
      if (audioBox) audioBox.classList.remove("recording");
      if (statusText) statusText.textContent = "Completed";
      if (btn) btn.innerHTML = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg> Record Answer`;
      this.showToast("Speaking practice finished! Log your speaking entry.", "info");
      return;
    }

    if (!this.audioRecorder || this.audioRecorder.state === "inactive") {
      // Start recording
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.audioChunks = [];
        this.audioRecorder = new MediaRecorder(stream);

        this.audioRecorder.ondataavailable = e => {
          if (e.data.size > 0) this.audioChunks.push(e.data);
        };

        this.audioRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          if (audioPlayer) {
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = "block";
          }
          stream.getTracks().forEach(t => t.stop());
        };

        this.audioRecorder.start();
        this.recordSeconds = 0;
        if (audioBox) audioBox.classList.add("recording");
        if (statusText) statusText.textContent = "Recording...";
        if (btn) btn.innerHTML = `<span>■</span> Stop Recording`;

        this.recordingInterval = setInterval(() => {
          this.recordSeconds++;
          const mins = String(Math.floor(this.recordSeconds / 60)).padStart(2, "0");
          const secs = String(this.recordSeconds % 60).padStart(2, "0");
          if (timerDisplay) timerDisplay.textContent = `${mins}:${secs}`;
        }, 1000);
      }).catch(err => {
        console.warn("Audio mic access error:", err);
        // Fallback to simulated practice timer
        alert("Microphone permission was not granted or is not available. Starting simulated 3-minute practice timer instead.");
        this.startSimulatedTimer(timerDisplay, statusText, btn);
      });
    } else {
      // Stop recording
      this.audioRecorder.stop();
      clearInterval(this.recordingInterval);
      if (audioBox) audioBox.classList.remove("recording");
      if (statusText) statusText.textContent = "Completed";
      if (btn) btn.innerHTML = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg> Record Answer`;
      this.showToast("Recording stopped. Listen back to critique your fluency!", "info");
    }
  },

  startSimulatedTimer(timerDisplay, statusText, btn) {
    this.isSimulatedRecording = true;
    let secs = 180;
    const audioBox = document.getElementById("daily-audio-box");
    if (audioBox) audioBox.classList.add("recording");
    if (statusText) statusText.textContent = "Speaking Practice Active";
    if (btn) btn.innerHTML = `<span>■</span> Stop Practice`;
    this.recordingInterval = setInterval(() => {
      secs--;
      const m = String(Math.floor(secs / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      if (timerDisplay) timerDisplay.textContent = `${m}:${s}`;
      if (secs <= 0) {
        clearInterval(this.recordingInterval);
        this.isSimulatedRecording = false;
        if (audioBox) audioBox.classList.remove("recording");
        if (statusText) statusText.textContent = "Practice Done";
        if (btn) btn.innerHTML = `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle></svg> Record Answer`;
      }
    }, 1000);
  },

  openAddSpeakingLogModal() {
    const modal = document.getElementById("speaking-add-modal");
    if (modal) modal.classList.add("active");
  },

  saveNewSpeakingLog() {
    const theme = document.getElementById("add-spk-theme").value.trim();
    const topic = document.getElementById("add-spk-topic").value.trim();
    if (!topic) {
      alert("Please enter the speaking topic.");
      return;
    }
    const duration = parseInt(document.getElementById("add-spk-duration").value, 10) || 15;
    const confidence = parseInt(document.getElementById("add-spk-conf").value, 10) || 3;
    const fluency = parseInt(document.getElementById("add-spk-fluency").value, 10) || 3;
    const grammar = document.getElementById("add-spk-grammar").value.trim();
    const vocab = document.getElementById("add-spk-vocab").value.trim();
    const notes = document.getElementById("add-spk-notes").value.trim();

    StorageManager.addSpeakingLog({
      theme,
      topic,
      durationMinutes: duration,
      confidenceScore: confidence,
      fluencyScore: fluency,
      grammarNotes: grammar,
      vocabularyLearned: vocab,
      improvementNotes: notes
    });

    this.closeAllModals();
    this.showToast("Speaking session logged successfully!", "success");
    this.renderCurrentView();
  },

  // -------------------------------------------------------------
  // VIEW 10: INTERNSHIP APPLICATION TRACKER (CRM)
  // -------------------------------------------------------------
  renderApplicationsView(container) {
    const state = StorageManager.getState();
    const apps = state.internshipApplications || [];
    const stats = StorageManager.getOverallStats();

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Internship Application CRM</h1>
            <p class="view-subtitle">End-to-End Opportunity Pipeline • 5–10 Applications per Week Goal</p>
          </div>
          <button class="btn-primary" onclick="App.openAddApplicationModal()">+ Add New Application</button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-cards-grid" style="margin-bottom: 24px;">
        <div class="kpi-card">
          <div class="kpi-label">Total Tracked</div>
          <div class="kpi-value" style="color: var(--text-primary);">${stats.appStats.total}</div>
          <div class="kpi-subtext">Active pipeline opportunities</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Applied / Submitted</div>
          <div class="kpi-value" style="color: var(--accent-cyan);">${stats.appStats.applied}</div>
          <div class="kpi-subtext">Pending recruiter reviews</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Assessments & OAs</div>
          <div class="kpi-value" style="color: var(--accent-warning);">${stats.appStats.assessment}</div>
          <div class="kpi-subtext">Online coding rounds</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Interviews & Offers</div>
          <div class="kpi-value" style="color: var(--accent-success);">${stats.appStats.interview + stats.appStats.offers}</div>
          <div class="kpi-subtext">${stats.appStats.offers} offers received</div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-controls-bar">
        <div class="filter-group">
          <select class="form-select" id="app-status-filter" onchange="App.onApplicationFilterChange()">
            <option value="all">All Statuses</option>
            <option value="Interested">Interested / Research</option>
            <option value="Ready to Apply">Ready to Apply</option>
            <option value="Applied">Applied</option>
            <option value="Assessment Pending">Assessment Pending</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select class="form-select" id="app-category-filter" onchange="App.onApplicationFilterChange()">
            <option value="all">All Roles</option>
            <option value="SDE">SDE / Backend</option>
            <option value="AI/ML">AI/ML Engineer</option>
            <option value="Python">Python Developer</option>
            <option value="Full-Stack">Full-Stack</option>
          </select>
        </div>
        <div style="font-size: 12px; color: var(--text-muted);" id="app-count-display">
          Showing ${apps.length} applications
        </div>
      </div>

      <!-- Applications Table -->
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>Company & Role</th>
              <th>Category</th>
              <th>Location</th>
              <th>Stipend</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Follow-up</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="app-table-body">
            ${this.renderApplicationTableRows(apps)}
          </tbody>
        </table>
      </div>
    `;
  },

  renderApplicationTableRows(apps) {
    if (!apps || apps.length === 0) {
      return `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 24px;">No applications recorded yet. Click "+ Add New Application" to start your pipeline.</td></tr>`;
    }

    return apps.map(a => `
      <tr>
        <td>
          <a href="${a.url}" target="_blank" rel="noopener noreferrer" style="font-weight: 700; color: var(--text-primary); display: flex; align-items: center; gap: 4px;">
            ${a.companyName}
            <span style="font-size: 10px; color: var(--accent-cyan);">↗</span>
          </a>
          <span style="font-size: 11px; color: var(--text-secondary); display: block;">${a.roleTitle}</span>
        </td>
        <td><span class="badge badge-${(a.category || 'SDE').toLowerCase().replace('/', '')}">${a.category}</span></td>
        <td><span style="font-size: 11px;">${a.location} (${a.workType})</span></td>
        <td><span style="font-size: 11px; color: var(--accent-success); font-weight: 600;">${a.stipend || '—'}</span></td>
        <td>
          <span class="badge ${a.status.includes('Offer') ? 'badge-comm' : (a.status.includes('Interview') ? 'badge-sde' : 'badge-priority-med')}">
            ${a.status}
          </span>
        </td>
        <td><span style="font-size: 11px;">${a.dateApplied}</span></td>
        <td><span style="font-size: 11px; color: var(--accent-warning);">${a.followUpDate || '—'}</span></td>
        <td>
          <button class="btn-sm-action" onclick="App.openEditApplicationModal('${a.id}')">Edit</button>
        </td>
      </tr>
    `).join('');
  },

  onApplicationFilterChange() {
    const status = document.getElementById("app-status-filter")?.value || "all";
    const category = document.getElementById("app-category-filter")?.value || "all";
    const state = StorageManager.getState();

    const filtered = (state.internshipApplications || []).filter(a => {
      const matchStatus = status === "all" || a.status === status;
      const matchCat = category === "all" || a.category === category;
      return matchStatus && matchCat;
    });

    const tbody = document.getElementById("app-table-body");
    if (tbody) tbody.innerHTML = this.renderApplicationTableRows(filtered);

    const countDisplay = document.getElementById("app-count-display");
    if (countDisplay) countDisplay.textContent = `Showing ${filtered.length} applications`;
  },

  openAddApplicationModal() {
    const modal = document.getElementById("application-add-modal");
    if (modal) modal.classList.add("active");
  },

  saveNewApplication() {
    const company = document.getElementById("add-app-company").value.trim();
    const role = document.getElementById("add-app-role").value.trim();
    if (!company || !role) {
      alert("Please provide both Company Name and Role Title.");
      return;
    }

    const category = document.getElementById("add-app-category").value;
    const location = document.getElementById("add-app-location").value.trim();
    const workType = document.getElementById("add-app-worktype").value;
    const stipend = document.getElementById("add-app-stipend").value.trim();
    const url = document.getElementById("add-app-url").value.trim() || "https://www.linkedin.com/jobs/";
    const status = document.getElementById("add-app-status").value;
    const eligibility = document.getElementById("add-app-eligibility").value.trim();
    const followUp = document.getElementById("add-app-followup").value;

    StorageManager.addApplication({
      companyName: company,
      roleTitle: role,
      category,
      location,
      workType,
      stipend,
      url,
      status,
      eligibilityNotes: eligibility,
      followUpDate: followUp
    });

    this.closeAllModals();
    this.showToast("New application added to pipeline!", "success");
    this.renderCurrentView();
  },

  openEditApplicationModal(appId) {
    const state = StorageManager.getState();
    const app = state.internshipApplications.find(a => a.id === appId);
    if (!app) return;

    const modal = document.getElementById("application-edit-modal");
    if (!modal) return;

    document.getElementById("edit-app-id").value = app.id;
    document.getElementById("edit-app-company-title").textContent = `${app.companyName} - ${app.roleTitle}`;
    document.getElementById("edit-app-status").value = app.status;
    document.getElementById("edit-app-assessment-date").value = app.assessmentDate || "";
    document.getElementById("edit-app-interview-notes").value = app.interviewRoundsNotes || "";
    document.getElementById("edit-app-followup-date").value = app.followUpDate || "";
    document.getElementById("edit-app-outcome-notes").value = app.outcomeNotes || "";
    document.getElementById("edit-app-lessons").value = app.lessonsLearned || "";

    modal.classList.add("active");
  },

  saveEditApplication() {
    const appId = document.getElementById("edit-app-id").value;
    const status = document.getElementById("edit-app-status").value;
    const assessmentDate = document.getElementById("edit-app-assessment-date").value;
    const interviewRoundsNotes = document.getElementById("edit-app-interview-notes").value;
    const followUpDate = document.getElementById("edit-app-followup-date").value;
    const outcomeNotes = document.getElementById("edit-app-outcome-notes").value;
    const lessonsLearned = document.getElementById("edit-app-lessons").value;

    StorageManager.updateApplication(appId, {
      status,
      assessmentDate,
      interviewRoundsNotes,
      followUpDate,
      outcomeNotes,
      lessonsLearned
    });

    this.closeAllModals();
    this.showToast("Application CRM record updated!", "success");
    this.renderCurrentView();
  },

  // -------------------------------------------------------------
  // VIEW 11: WEEKLY ASSESSMENTS (100-PT RUBRIC)
  // -------------------------------------------------------------
  renderAssessmentsView(container) {
    const state = StorageManager.getState();
    const weeks = state.roadmap || [];

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Weekly Evaluation & Assessment Studio</h1>
            <p class="view-subtitle">Objective 100-Point Scoring Rubric (DSA 25, Dev 20, AI/ML 20, CS 15, Comm 10, Discipline 10)</p>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${weeks.map(w => {
          const evalData = w.weeklyEvaluation || {};
          const isGraded = evalData.score !== null;
          const passed = evalData.score >= 70;

          return `
            <div class="card-panel">
              <div class="card-panel-header">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span class="week-num-badge">Week ${w.weekNumber}</span>
                    <span style="font-size: 11px; color: var(--text-muted);">${w.startDate} to ${w.endDate}</span>
                  </div>
                  <h3 style="font-size: 15px; font-weight: 700;">${w.title}</h3>
                </div>
                <div>
                  ${isGraded ? `
                    <span class="badge ${passed ? 'badge-comm' : 'badge-priority-high'}" style="font-size: 13px; padding: 4px 10px;">
                      ${evalData.score} / 100 ${passed ? '(PASSED ✓)' : '(REMEDIAL NEEDED)'}
                    </span>
                  ` : `
                    <button class="btn-primary" onclick="App.openWeeklyAssessmentModal(${w.weekNumber})">
                      Grade Week ${w.weekNumber}
                    </button>
                  `}
                </div>
              </div>

              <div style="margin-bottom: 12px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
                <strong>Coding Assessment Task:</strong> ${evalData.assessmentPrompt}
              </div>

              <div style="margin-bottom: 12px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
                <strong>Oral Interview Question:</strong> "${evalData.interviewQuestion}"
              </div>

              ${!passed && isGraded ? `
                <div style="padding: 10px 14px; background-color: rgba(244, 63, 94, 0.08); border-left: 3px solid var(--accent-danger); border-radius: var(--radius-sm); font-size: 12px;">
                  <strong style="color: var(--accent-danger);">Remedial Action Required:</strong>
                  <span style="display: block; margin-top: 2px; color: var(--text-secondary);">${evalData.remedialAction}</span>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  openWeeklyAssessmentModal(weekNumber) {
    const state = StorageManager.getState();
    const week = state.roadmap.find(w => w.weekNumber === parseInt(weekNumber, 10));
    if (!week) return;

    const modal = document.getElementById("assessment-grade-modal");
    if (!modal) return;

    document.getElementById("assess-week-num").value = week.weekNumber;
    document.getElementById("assess-week-title").textContent = `Week ${week.weekNumber}: ${week.title}`;
    document.getElementById("assess-prompt-display").textContent = week.weeklyEvaluation.assessmentPrompt;

    modal.classList.add("active");
  },

  saveWeeklyAssessmentFromModal() {
    const weekNumber = parseInt(document.getElementById("assess-week-num").value, 10);
    const dsa = parseInt(document.getElementById("score-dsa").value, 10) || 0;
    const dev = parseInt(document.getElementById("score-dev").value, 10) || 0;
    const aiml = parseInt(document.getElementById("score-aiml").value, 10) || 0;
    const cs = parseInt(document.getElementById("score-cs").value, 10) || 0;
    const comm = parseInt(document.getElementById("score-comm").value, 10) || 0;
    const cons = parseInt(document.getElementById("score-cons").value, 10) || 0;
    const feedback = document.getElementById("assess-feedback").value.trim();

    const totalScore = dsa + dev + aiml + cs + comm + cons;
    const passed = totalScore >= 70;

    StorageManager.saveWeeklyAssessment(weekNumber, {
      score: totalScore,
      passed,
      feedback,
      rubricScores: { dsa, dev, aiml, cs, comm, cons }
    });

    this.closeAllModals();
    this.showToast(`Week ${weekNumber} graded: ${totalScore}/100 (${passed ? 'Passed ✓' : 'Action Required'})`, passed ? 'success' : 'error');
    this.renderCurrentView();
  },

  // -------------------------------------------------------------
  // VIEW 12: RESOURCES LIBRARY
  // -------------------------------------------------------------
  renderResourcesView(container) {
    const state = StorageManager.getState();
    const resources = state.resources || [];

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Curated Resources Library</h1>
            <p class="view-subtitle">Verified Technical Documentation, LeetCode sheets, and Placement Portals</p>
          </div>
          <input type="text" class="form-input" id="resource-search-input" placeholder="Search resources or tags..." oninput="App.filterResources(this.value)" style="width: 240px;" />
        </div>
      </div>

      <div class="kpi-cards-grid" id="resources-grid-container" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
        ${resources.map(res => `
          <div class="card-panel" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <span class="badge badge-dsa">${res.category}</span>
                <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="btn-sm-action">
                  Open ↗
                </a>
              </div>
              <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">${res.title}</h3>
              <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">${res.description}</p>
            </div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${(res.tags || []).map(t => `<span class="badge" style="background: var(--bg-tertiary);">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  filterResources(query) {
    const state = StorageManager.getState();
    const q = query.toLowerCase().trim();
    const filtered = (state.resources || []).filter(r => {
      return r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q) || (r.tags && r.tags.some(t => t.toLowerCase().includes(q)));
    });

    const grid = document.getElementById("resources-grid-container");
    if (grid) {
      grid.innerHTML = filtered.map(res => `
        <div class="card-panel" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <span class="badge badge-dsa">${res.category}</span>
              <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="btn-sm-action">
                Open ↗
              </a>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">${res.title}</h3>
            <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">${res.description}</p>
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            ${(res.tags || []).map(t => `<span class="badge" style="background: var(--bg-tertiary);">${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }
  },

  // -------------------------------------------------------------
  // VIEW 13: SETTINGS & DATA BACKUP
  // -------------------------------------------------------------
  renderSettingsView(container) {
    const state = StorageManager.getState();
    const prof = state.studentProfile || {};
    const exam = state.examMode || {};
    const storageBytes = JSON.stringify(state).length;
    const storageKb = (storageBytes / 1024).toFixed(1);

    container.innerHTML = `
      <div class="view-header">
        <div class="view-title-row">
          <div>
            <h1 class="view-title">Settings & Data Management</h1>
            <p class="view-subtitle">Student Profile Configuration, Examination Schedules & Offline JSON Backups</p>
          </div>
        </div>
      </div>

      <div class="dashboard-grid-2col">
        <div>
          <!-- Candidate Engineering Profile -->
          <div class="card-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <h2 style="font-size: 16px; font-weight: 700; color: var(--accent-primary);">Candidate Engineering Profile</h2>
              <button class="btn-sm-action" onclick="App.openEditProfileModal()">✏ Edit Profile</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
              <div><strong>Candidate Name:</strong> ${prof.name || 'Candidate Engineer'}</div>
              <div><strong>Program:</strong> ${prof.degree} in ${prof.specialization} (${prof.semester})</div>
              <div><strong>Institution:</strong> ${prof.college} • <strong>Graduation:</strong> ${prof.expectedGraduation}</div>
              <div><strong>Academic Standing:</strong> Cumulative CGPA <span style="color: var(--accent-success); font-weight: 700;">${prof.cgpa}</span></div>
              <div><strong>Core Engineering Stack:</strong> C++ (DSA), Python (AI/ML), JavaScript (Full-Stack), SQL</div>
              <div><strong>Daily Study Targets:</strong> Mon–Fri: ${prof.dailyAvailability?.weekdaysHours || '3.5 hrs/day'} • Sat–Sun: ${prof.dailyAvailability?.weekendsHours || '6.5 hrs/day'}</div>
            </div>
          </div>

          <!-- Examination Mode Settings -->
          <div class="card-panel">
            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 10px; color: var(--accent-warning);">University Examination Configuration</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
              When examination mode is activated, college exams take precedence. The daily schedule automatically switches to maintenance mode.
            </p>

            <div class="form-group">
              <label class="form-label">Examination Title</label>
              <input type="text" class="form-input" id="setting-exam-title" value="${exam.examTitle || '5th Semester University Examinations'}" style="width: 100%;" />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
              <div class="form-group">
                <label class="form-label">Start Date</label>
                <input type="date" class="form-input" id="setting-exam-start" value="${exam.examStartDate || '2027-01-10'}" style="width: 100%;" />
              </div>
              <div class="form-group">
                <label class="form-label">End Date</label>
                <input type="date" class="form-input" id="setting-exam-end" value="${exam.examEndDate || '2027-01-24'}" style="width: 100%;" />
              </div>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn-primary" onclick="App.saveExamSettings()">Save Exam Dates</button>
              <button class="btn-secondary" onclick="App.rescheduleExamTasks()">Reschedule Missed Tasks Realistically</button>
            </div>
          </div>
        </div>

        <div>
          <!-- Supabase Cloud Sync Panel -->
          <div class="card-panel" style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h2 style="font-size: 16px; font-weight: 700; color: var(--accent-success); margin: 0;">
                Supabase Multi-Device Sync
              </h2>
              <span class="sync-badge-code">
                ${typeof SupabaseSync !== 'undefined' && SupabaseSync.isConnected ? '● Connected' : '○ Local Storage'}
              </span>
            </div>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
              Synchronize your preparation progress, task completions, and DSA notes across your laptop and mobile phone.
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="font-size: 12px; background: var(--bg-tertiary); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
                <strong>Active Sync ID:</strong> <code>${(typeof SupabaseSync !== 'undefined' && SupabaseSync.syncId) ? String(SupabaseSync.syncId).replace(/[&<>"']/g, '') : 'Not Configured'}</code>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button class="btn-primary" onclick="SupabaseSync.openModal()" style="font-size: 12px; justify-content: center; background: var(--accent-success); border-color: var(--accent-success);">
                  ⚙ Configure Sync
                </button>
                <button class="btn-secondary" onclick="SupabaseSync.verifyConnectionAndSync(true)" style="font-size: 12px; justify-content: center;">
                  🔄 Sync Now
                </button>
              </div>
            </div>
          </div>

          <!-- Data Backup & Portability -->
          <div class="card-panel">
            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 10px; color: var(--accent-primary);">Data Storage & JSON Backup</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">
              All preparation state, notes, problem solutions, and applications are stored locally in your browser's persistent storage (${storageKb} KB used).
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px;">
              <button class="btn-primary" style="justify-content: center;" onclick="StorageManager.exportJson()">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export Complete JSON Backup
              </button>

              <div>
                <label class="form-label">Import JSON Backup</label>
                <input type="file" id="json-file-input" accept=".json" onchange="App.handleFileImport(event)" class="form-input" style="width: 100%;" />
              </div>

              <div style="margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-subtle);">
                <strong style="color: var(--accent-danger); font-size: 12px; display: block; margin-bottom: 4px;">Danger Zone: Reset All Progress</strong>
                <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">
                  Resets the roadmap, DSA logs, and applications back to factory defaults. Requires confirmation.
                </p>
                <button class="btn-danger" onclick="App.confirmResetProgress()">
                  Reset Dashboard to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveExamSettings() {
    const title = document.getElementById("setting-exam-title").value.trim();
    const startDate = document.getElementById("setting-exam-start").value;
    const endDate = document.getElementById("setting-exam-end").value;

    StorageManager.toggleExamMode(StorageManager.getState().examMode.isEnabled, {
      title,
      startDate,
      endDate
    });

    this.showToast("Examination settings saved!", "success");
  },

  rescheduleExamTasks() {
    const count = StorageManager.reschedulePausedTasks();
    this.showToast(`Rescheduled ${count} paused tasks across your catch-up weeks!`, "info");
    this.renderCurrentView();
  },

  handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const result = StorageManager.importJson(e.target.result);
      if (result.success) {
        this.showToast(result.message, "success");
        this.renderCurrentView();
      } else {
        alert("Import Error: " + result.message);
      }
    };
    reader.readAsText(file);
  },

  openEditProfileModal() {
    const state = StorageManager.getState();
    const prof = state.studentProfile || {};
    const modal = document.getElementById("profile-edit-modal");
    if (!modal) return;

    document.getElementById("edit-prof-name").value = prof.name || "";
    document.getElementById("edit-prof-degree").value = prof.degree || "B.Tech";
    document.getElementById("edit-prof-spec").value = prof.specialization || "Artificial Intelligence and Machine Learning";
    document.getElementById("edit-prof-college").value = prof.college || "";
    document.getElementById("edit-prof-cgpa").value = prof.cgpa || 8.0;
    document.getElementById("edit-prof-grad").value = prof.expectedGraduation || 2028;

    modal.classList.add("active");
  },

  saveEditProfile() {
    const name = document.getElementById("edit-prof-name").value.trim() || "Candidate Engineer";
    const degree = document.getElementById("edit-prof-degree").value.trim() || "B.Tech";
    const specialization = document.getElementById("edit-prof-spec").value.trim() || "Computer Science / AIML";
    const college = document.getElementById("edit-prof-college").value.trim() || "Engineering Institute";
    const cgpa = parseFloat(document.getElementById("edit-prof-cgpa").value) || 8.0;
    const expectedGraduation = parseInt(document.getElementById("edit-prof-grad").value, 10) || 2028;

    StorageManager.updateProfile({
      name,
      degree,
      specialization,
      college,
      cgpa,
      expectedGraduation
    });

    this.closeAllModals();
    this.showToast("Candidate profile updated successfully!", "success");
    this.renderCurrentView();
  },

  confirmResetProgress() {
    const verification = prompt('DANGER ZONE: Type "RESET" in all capitals to permanently reset all dashboard data and start afresh:');
    if (verification === "RESET") {
      StorageManager.resetToDefaults();
      this.showToast("Dashboard reset to initial baseline.", "info");
      this.renderCurrentView();
    } else {
      this.showToast("Reset cancelled.", "info");
    }
  }
};

// Auto-boot on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
