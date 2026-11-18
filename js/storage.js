/**
 * Storage and State Management Layer for 180-Day SDE + AI/ML Internship Dashboard
 * Handles persistence, spaced repetition algorithms, export/import validation, and exam mode logic.
 */

const STORAGE_KEY = "INTERNSHIP_PREP_DASHBOARD_V2";

const StorageManager = {
  state: null,

  // Initialize storage with non-destructive migration
  init() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.roadmap) {
          // If state is from v1.0.0, migrate to v1.1.0 to ingest updated resource URLs while keeping student progress
          if (parsed.version === "1.0.0" && typeof initialRoadmapData !== 'undefined') {
            parsed.roadmap = this.migrateRoadmapTasks(parsed.roadmap, initialRoadmapData);
            parsed.version = "1.1.0";
          }
          this.state = parsed;
          this.syncCurrentDate();
          this.saveState();
          console.log("Loaded existing dashboard state (v" + this.state.version + ") from localStorage.");
          return this.state;
        }
      }
    } catch (e) {
      console.warn("Could not read localStorage, initializing fresh default state:", e);
    }

    this.state = this.getDefaultState();
    this.syncCurrentDate();
    this.saveState();
    return this.state;
  },

  // Safe migration helper: merges updated task metadata (links, titles) with user progress
  migrateRoadmapTasks(oldRoadmap, freshRoadmap) {
    const userProgressMap = new Map();
    oldRoadmap.forEach(w => {
      if (w.days) {
        w.days.forEach(d => {
          if (d.tasks) {
            d.tasks.forEach(t => {
              userProgressMap.set(t.id, {
                isCompleted: t.isCompleted,
                completedAt: t.completedAt,
                notes: t.notes,
                confidence: t.confidence,
                githubUrl: t.githubUrl,
                timeSpent: t.timeSpent,
                rescheduled: t.rescheduled,
                rescheduledNote: t.rescheduledNote
              });
            });
          }
        });
      }
    });

    const newRoadmap = JSON.parse(JSON.stringify(freshRoadmap));
    newRoadmap.forEach(w => {
      if (w.days) {
        w.days.forEach(d => {
          if (d.tasks) {
            d.tasks.forEach(t => {
              if (userProgressMap.has(t.id)) {
                const saved = userProgressMap.get(t.id);
                Object.assign(t, saved);
              }
            });
          }
        });
      }
    });
    return newRoadmap;
  },

  // Automatically sync today's date if within calendar range
  syncCurrentDate() {
    if (!this.state || !this.state.settings) return;
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const todayStr = `${y}-${m}-${d}`;
    if (todayStr >= "2026-11-17" && todayStr <= "2027-05-17") {
      this.state.settings.todayDate = todayStr;
      this.state.lastActiveDate = todayStr;
    }
  },

  // Generate complete default state
  getDefaultState() {
    return {
      version: "1.1.0",
      createdAt: new Date().toISOString(),
      lastActiveDate: "2026-11-17",
      studentProfile: {
        name: "Engineer Candidate",
        degree: "B.Tech",
        specialization: "Artificial Intelligence and Machine Learning",
        semester: "5th Semester",
        expectedGraduation: 2028,
        college: "Engineering Institute",
        cgpa: 8.07,
        backlogs: 0,
        primaryLanguages: {
          "C++": "Intermediate to Advanced (Primary DSA)",
          "Python": "Intermediate to Advanced (Primary AI/ML)",
          "JavaScript": "Basic to Intermediate (Full-Stack)",
          "Java": "Basic"
        },
        dailyAvailability: {
          weekdaysHours: "3.5 hrs/day",
          weekendsHours: "6.5 hrs/day",
          examMaintenanceHours: "1.5 hrs/day"
        },
        targetRoles: [
          "Software Development Engineer (SDE) Intern",
          "AI/ML Engineer Intern",
          "Python Developer Intern",
          "Machine Learning Intern",
          "Generative AI & LLM Systems Intern"
        ],
        communicationLevel: "Basic English (Needs Spoken Confidence, Articulation & Technical Explanation)"
      },
      roadmap: JSON.parse(JSON.stringify(typeof initialRoadmapData !== 'undefined' ? initialRoadmapData : [])),
      dsaProblems: JSON.parse(JSON.stringify(typeof initialDsaProblems !== 'undefined' ? initialDsaProblems : [])),
      aimlModules: JSON.parse(JSON.stringify(typeof initialAimlModules !== 'undefined' ? initialAimlModules : [])),
      sdeCurriculum: JSON.parse(JSON.stringify(typeof initialSdeCurriculum !== 'undefined' ? initialSdeCurriculum : {})),
      placementPortalSpec: JSON.parse(JSON.stringify(typeof initialPlacementPortalSpec !== 'undefined' ? initialPlacementPortalSpec : {})),
      auditedProjects: JSON.parse(JSON.stringify(typeof initialAuditedProjects !== 'undefined' ? initialAuditedProjects : [])),
      capstoneProjects: JSON.parse(JSON.stringify(typeof initialCapstoneProjects !== 'undefined' ? initialCapstoneProjects : [])),
      resources: JSON.parse(JSON.stringify(typeof initialResourcesCatalog !== 'undefined' ? initialResourcesCatalog : [])),
      aiLogs: [
        {
          id: "ailog-init-1",
          date: "2026-11-17",
          taskAttempted: "Time complexity derivation for nested loops",
          independentDurationMinutes: 45,
          aiAssistanceLevel: "Conceptual Explanation",
          whatLearned: "Understood why independent inner loops multiply whereas sequential loops add up in Big-O summation.",
          canRepeatIndependently: true,
          verified: true
        }
      ],
      speakingLogs: [
        {
          id: "spklog-init-1",
          date: "2026-11-17",
          theme: "Self-Introduction Baseline",
          topic: "Introducing my B.Tech AI/ML background and 180-day career roadmap",
          durationMinutes: 10,
          confidenceScore: 3,
          fluencyScore: 3,
          grammarNotes: "Noticed hesitation on verb tenses when describing past AI-assisted projects.",
          vocabularyLearned: "Articulate, Algorithmic Invariant, Defensible Architecture",
          improvementNotes: "Speak slower, breathe at commas, avoid 'like' and 'actually' as fillers."
        }
      ],
      internshipApplications: [
        {
          id: "app-demo-1",
          companyName: "Example Tech Systems",
          roleTitle: "Software Development Engineer Intern",
          category: "SDE",
          location: "Bengaluru, Karnataka",
          workType: "Hybrid",
          stipend: "₹35,000 / month",
          eligibilityNotes: "B.Tech 2028 batch, CGPA >= 7.5, no active backlogs. Requires C++ and SQL.",
          graduationYear: 2028,
          url: "https://www.linkedin.com/jobs/",
          dateApplied: "2026-11-17",
          status: "Interested",
          assessmentDate: "",
          interviewRoundsNotes: "Round 1: OA (DSA & CS), Round 2: Technical Live Coding, Round 3: Project & HR",
          followUpDate: "2026-11-24",
          outcomeNotes: "Targeting referral via alumni directory before submitting formal application.",
          lessonsLearned: "Prepare deep explanation of PostgreSQL indexing and Placement Portal architecture."
        }
      ],
      examMode: {
        isEnabled: false,
        examStartDate: "2027-01-10",
        examEndDate: "2027-01-24",
        examTitle: "5th Semester University Examinations",
        reducedTargetDsa: 1,
        reducedTargetEnglishMins: 15,
        pausedTasks: []
      },
      theme: "light",
      settings: {
        targetDsaCount: 115,
        targetApplicationsPerWeek: 7,
        currentWeek: 1,
        todayDate: "2026-11-17"
      }
    };
  },

  getState() {
    if (!this.state) {
      this.init();
    }
    return this.state;
  },

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      window.dispatchEvent(new CustomEvent("app-state-updated", { detail: this.state }));
      return true;
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
      return false;
    }
  },

  // Update a single task in the roadmap
  updateTask(taskId, updates) {
    if (!this.state || !this.state.roadmap) return false;
    let found = false;

    for (const week of this.state.roadmap) {
      for (const day of week.days) {
        for (let i = 0; i < day.tasks.length; i++) {
          if (day.tasks[i].id === taskId) {
            day.tasks[i] = { ...day.tasks[i], ...updates };
            if (updates.isCompleted !== undefined) {
              day.tasks[i].completedAt = updates.isCompleted ? (updates.completedAt || new Date().toISOString()) : null;
            }
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }

    if (found) {
      this.saveState();
    }
    return found;
  },

  // Spaced Repetition Intervals (Day 1, 3, 7, 14, 30) - Timezone-safe
  calculateNextRevisionDate(lastDateStr, revisionCount) {
    const intervals = [1, 3, 7, 14, 30, 45, 60];
    const daysToAdd = intervals[Math.min(revisionCount, intervals.length - 1)];
    const baseStr = lastDateStr || (this.state && this.state.settings ? this.state.settings.todayDate : "2026-11-17");
    const [y, m, d] = baseStr.split("-").map(Number);
    const baseDate = new Date(y, m - 1, d);
    baseDate.setDate(baseDate.getDate() + daysToAdd);
    const resY = baseDate.getFullYear();
    const resM = String(baseDate.getMonth() + 1).padStart(2, "0");
    const resD = String(baseDate.getDate()).padStart(2, "0");
    return `${resY}-${resM}-${resD}`;
  },

  // Update DSA problem status and spaced repetition queue
  updateDsaProblem(problemId, updates) {
    if (!this.state || !this.state.dsaProblems) return false;
    const index = this.state.dsaProblems.findIndex(p => p.id === problemId);
    if (index === -1) return false;

    const prob = this.state.dsaProblems[index];
    const todayStr = this.state.settings.todayDate || "2026-11-17";

    // Auto calculate mastery status if not explicitly overridden
    let newStatus = updates.status || prob.status;

    if (updates.solvedIndependently && updates.optimizedSolved && updates.explanationCompleted) {
      if ((prob.revisionHistory && prob.revisionHistory.length >= 1) || updates.isRevision) {
        newStatus = "mastered";
      } else {
        newStatus = "optimized_explained";
      }
    } else if (updates.solvedIndependently) {
      newStatus = "solved_independently";
    } else if (updates.hintUsed || updates.aiUsed) {
      newStatus = "solved_with_hints";
    } else if (updates.attemptCount > 0 || updates.bruteForceSolved) {
      newStatus = "attempted";
    }

    // Handle revision scheduling
    let nextRevision = prob.nextRevisionDate;
    let revHistory = prob.revisionHistory || [];

    if (updates.markRevised) {
      revHistory.push({
        date: todayStr,
        confidence: updates.confidence || prob.confidence || 4,
        notes: updates.notes || "Revision completed."
      });
      nextRevision = this.calculateNextRevisionDate(todayStr, revHistory.length);
      newStatus = (revHistory.length >= 2 && prob.solvedIndependently && prob.optimizedSolved) ? "mastered" : newStatus;
    } else if (updates.solvedIndependently && !nextRevision) {
      nextRevision = this.calculateNextRevisionDate(todayStr, 0);
    }

    this.state.dsaProblems[index] = {
      ...prob,
      ...updates,
      status: newStatus,
      revisionHistory: revHistory,
      nextRevisionDate: nextRevision,
      lastAttemptDate: updates.attemptCount ? todayStr : prob.lastAttemptDate
    };

    this.saveState();
    return true;
  },

  // Update Student Profile
  updateProfile(updates) {
    if (!this.state.studentProfile) this.state.studentProfile = {};
    this.state.studentProfile = { ...this.state.studentProfile, ...updates };
    this.saveState();
    return this.state.studentProfile;
  },

  // Add custom DSA Problem
  addDsaProblem(newProblem) {
    if (!this.state.dsaProblems) this.state.dsaProblems = [];
    const id = `dsa-custom-${Date.now()}`;
    const entry = {
      id,
      name: newProblem.name || "Untitled Problem",
      platform: newProblem.platform || "LeetCode",
      topic: newProblem.topic || "Arrays & Hashing",
      difficulty: newProblem.difficulty || "Medium",
      url: newProblem.url || "https://leetcode.com/",
      weekAssigned: newProblem.weekAssigned || this.state.settings.currentWeek || 1,
      dateAssigned: this.state.settings.todayDate || "2026-11-17",
      targetTimeComplexity: newProblem.targetTimeComplexity || "O(N)",
      targetSpaceComplexity: newProblem.targetSpaceComplexity || "O(1)",
      pattern: newProblem.pattern || "Two Pointers / Hash Map",
      status: "not_started",
      attemptCount: 0,
      solvedIndependently: false,
      bruteForceSolved: false,
      optimizedSolved: false,
      hintUsed: false,
      aiUsed: false,
      explanationCompleted: false,
      confidence: 0,
      notes: newProblem.notes || "",
      revisionHistory: [],
      nextRevisionDate: null
    };

    this.state.dsaProblems.unshift(entry);
    this.saveState();
    return entry;
  },

  // Add AI Dependency Log entry
  addAiLog(entry) {
    if (!this.state.aiLogs) this.state.aiLogs = [];
    const newLog = {
      id: `ailog-${Date.now()}`,
      date: entry.date || this.state.settings.todayDate || "2026-11-17",
      taskAttempted: entry.taskAttempted || "Problem solving",
      independentDurationMinutes: parseInt(entry.independentDurationMinutes, 10) || 30,
      aiAssistanceLevel: entry.aiAssistanceLevel || "Conceptual Explanation",
      whatLearned: entry.whatLearned || "Understood the algorithmic concept.",
      canRepeatIndependently: entry.canRepeatIndependently !== false,
      verified: !!entry.verified
    };
    this.state.aiLogs.unshift(newLog);
    this.saveState();
    return newLog;
  },

  // Add English Speaking Log entry
  addSpeakingLog(entry) {
    if (!this.state.speakingLogs) this.state.speakingLogs = [];
    const newLog = {
      id: `spklog-${Date.now()}`,
      date: entry.date || this.state.settings.todayDate || "2026-11-17",
      theme: entry.theme || "Daily Technical Practice",
      topic: entry.topic || "Technical Explanation",
      durationMinutes: parseInt(entry.durationMinutes, 10) || 15,
      confidenceScore: parseInt(entry.confidenceScore, 10) || 3,
      fluencyScore: parseInt(entry.fluencyScore, 10) || 3,
      grammarNotes: entry.grammarNotes || "",
      vocabularyLearned: entry.vocabularyLearned || "",
      improvementNotes: entry.improvementNotes || ""
    };
    this.state.speakingLogs.unshift(newLog);
    this.saveState();
    return newLog;
  },

  // Internship Applications CRM CRUD
  addApplication(app) {
    if (!this.state.internshipApplications) this.state.internshipApplications = [];
    const newApp = {
      id: `app-${Date.now()}`,
      companyName: app.companyName || "Target Company",
      roleTitle: app.roleTitle || "Software Engineer Intern",
      category: app.category || "SDE",
      location: app.location || "Remote / Bengaluru",
      workType: app.workType || "Hybrid",
      stipend: app.stipend || "Competitive",
      eligibilityNotes: app.eligibilityNotes || "B.Tech 2028 batch",
      graduationYear: parseInt(app.graduationYear, 10) || 2028,
      url: app.url || "https://www.linkedin.com/jobs/",
      dateApplied: app.dateApplied || this.state.settings.todayDate || "2026-11-17",
      status: app.status || "Interested",
      assessmentDate: app.assessmentDate || "",
      interviewRoundsNotes: app.interviewRoundsNotes || "",
      followUpDate: app.followUpDate || "",
      outcomeNotes: app.outcomeNotes || "",
      lessonsLearned: app.lessonsLearned || ""
    };
    this.state.internshipApplications.unshift(newApp);
    this.saveState();
    return newApp;
  },

  updateApplication(appId, updates) {
    if (!this.state.internshipApplications) return false;
    const idx = this.state.internshipApplications.findIndex(a => a.id === appId);
    if (idx === -1) return false;
    this.state.internshipApplications[idx] = {
      ...this.state.internshipApplications[idx],
      ...updates
    };
    this.saveState();
    return true;
  },

  deleteApplication(appId) {
    if (!this.state.internshipApplications) return false;
    this.state.internshipApplications = this.state.internshipApplications.filter(a => a.id !== appId);
    this.saveState();
    return true;
  },

  // Weekly Assessment Grading
  saveWeeklyAssessment(weekNumber, evaluation) {
    if (!this.state.roadmap) return false;
    const week = this.state.roadmap.find(w => w.weekNumber === parseInt(weekNumber, 10));
    if (!week) return false;

    week.weeklyEvaluation = {
      ...week.weeklyEvaluation,
      ...evaluation,
      evaluatedAt: new Date().toISOString()
    };
    this.saveState();
    return true;
  },

  // Toggle Examination Mode
  toggleExamMode(enable, options = {}) {
    if (!this.state.examMode) {
      this.state.examMode = { isEnabled: false };
    }
    this.state.examMode.isEnabled = !!enable;
    if (options.startDate) this.state.examMode.examStartDate = options.startDate;
    if (options.endDate) this.state.examMode.examEndDate = options.endDate;
    if (options.title) this.state.examMode.examTitle = options.title;

    this.saveState();
    return this.state.examMode;
  },

  // Reschedule tasks that were paused during examination mode
  reschedulePausedTasks() {
    const today = this.state.settings.todayDate || "2026-11-17";
    let rescheduledCount = 0;

    // Scan past weeks for incomplete tasks and flag them for realistic catch-up
    this.state.roadmap.forEach(week => {
      week.days.forEach(day => {
        if (day.date < today) {
          day.tasks.forEach(task => {
            if (!task.isCompleted && !task.rescheduled) {
              task.rescheduled = true;
              task.rescheduledNote = "Rescheduled after University Exam period";
              rescheduledCount++;
            }
          });
        }
      });
    });

    this.saveState();
    return rescheduledCount;
  },

  // Get Spaced Revision Queue (due today or overdue)
  getSpacedRevisionQueue() {
    if (!this.state.dsaProblems) return [];
    const todayStr = this.state.settings.todayDate || "2026-11-17";

    return this.state.dsaProblems.filter(p => {
      if (p.status === "mastered") return false;
      if (!p.nextRevisionDate) return false;
      return p.nextRevisionDate <= todayStr;
    });
  },

  // Real-time Overall Statistics Calculation
  getOverallStats() {
    const state = this.state;
    let totalTasks = 0;
    let completedTasks = 0;
    let highPriorityTasks = 0;
    let highPriorityCompleted = 0;
    let trackStats = {
      dsa: { total: 0, completed: 0 },
      sde: { total: 0, completed: 0 },
      aiml: { total: 0, completed: 0 },
      project: { total: 0, completed: 0 },
      comm: { total: 0, completed: 0 }
    };

    if (state.roadmap) {
      state.roadmap.forEach(week => {
        week.days.forEach(day => {
          day.tasks.forEach(task => {
            totalTasks++;
            if (task.isCompleted) completedTasks++;

            if (task.priority === "High") {
              highPriorityTasks++;
              if (task.isCompleted) highPriorityCompleted++;
            }

            const tr = task.track || "dsa";
            if (trackStats[tr]) {
              trackStats[tr].total++;
              if (task.isCompleted) trackStats[tr].completed++;
            }
          });
        });
      });
    }

    // DSA stats
    const dsaTotal = state.dsaProblems ? state.dsaProblems.length : 0;
    let dsaAttempted = 0;
    let dsaIndependent = 0;
    let dsaOptimized = 0;
    let dsaMastered = 0;
    let dsaAiAssisted = 0;

    if (state.dsaProblems) {
      state.dsaProblems.forEach(p => {
        if (p.status !== "not_started" || p.attemptCount > 0) dsaAttempted++;
        if (p.solvedIndependently) dsaIndependent++;
        if (p.optimizedSolved) dsaOptimized++;
        if (p.status === "mastered") dsaMastered++;
        if (p.aiUsed) dsaAiAssisted++;
      });
    }

    // Application CRM stats
    const apps = state.internshipApplications || [];
    const appStats = {
      total: apps.length,
      interested: apps.filter(a => a.status === "Interested").length,
      applied: apps.filter(a => a.status === "Applied" || a.status === "Ready to Apply").length,
      assessment: apps.filter(a => a.status === "Assessment Pending").length,
      interview: apps.filter(a => a.status === "Interview Scheduled").length,
      offers: apps.filter(a => a.status === "Offer Received" || a.status === "Selected").length,
      rejected: apps.filter(a => a.status === "Rejected").length
    };

    // AI Independence Ratio
    const aiLogs = state.aiLogs || [];
    const independentLogs = aiLogs.filter(l => l.aiAssistanceLevel === "None / 0%" || l.aiAssistanceLevel === "Conceptual Explanation");
    const aiIndependenceRatio = aiLogs.length ? Math.round((independentLogs.length / aiLogs.length) * 100) : 85;

    // Days calculation (timezone-safe using local calendar dates)
    const startDate = new Date(2026, 10, 17); // Nov 17, 2026
    const todayStr = (state.settings && state.settings.todayDate) ? state.settings.todayDate : "2026-11-17";
    const [tY, tM, tD] = todayStr.split("-").map(Number);
    const todayDateObj = new Date(tY, tM - 1, tD);
    const diffTime = Math.max(0, todayDateObj - startDate);
    const dayNumber = Math.min(182, Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1));
    const currentWeekNumber = Math.min(26, Math.floor((dayNumber - 1) / 7) + 1);
    const daysRemaining = Math.max(0, 182 - dayNumber);

    return {
      totalTasks,
      completedTasks,
      percentComplete: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      highPriorityTasks,
      highPriorityCompleted,
      dsaTotal,
      dsaAttempted,
      dsaIndependent,
      dsaOptimized,
      dsaMastered,
      dsaAiAssisted,
      trackStats,
      appStats,
      aiIndependenceRatio,
      dayNumber,
      currentWeekNumber,
      daysRemaining,
      revisionDueCount: this.getSpacedRevisionQueue().length
    };
  },

  // Export complete JSON Backup
  exportJson() {
    const backupData = {
      version: this.state.version,
      exportedAt: new Date().toISOString(),
      state: this.state
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = `internship_prep_dashboard_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  },

  // Import and Validate JSON Backup
  importJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed) throw new Error("Invalid or empty JSON data.");

      const stateToLoad = parsed.state || parsed;

      // Validate core schema
      if (!stateToLoad.roadmap || !Array.isArray(stateToLoad.roadmap)) {
        throw new Error("Invalid backup format: missing 26-week roadmap data.");
      }
      if (!stateToLoad.dsaProblems || !Array.isArray(stateToLoad.dsaProblems)) {
        throw new Error("Invalid backup format: missing DSA problems dataset.");
      }

      this.state = stateToLoad;
      this.saveState();
      return { success: true, message: "Backup successfully imported and restored!" };
    } catch (e) {
      console.error("Backup import failed:", e);
      return { success: false, message: e.message || "Failed to parse backup JSON." };
    }
  },

  // Reset all data to clean initial state (with user confirmation)
  resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.getDefaultState();
    this.saveState();
    return true;
  }
};

// Initialize immediately upon script loading
StorageManager.init();
