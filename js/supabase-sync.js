/**
 * Supabase Multi-Device Cloud Synchronization Engine
 * Enables seamless cross-device progress tracking between Laptop and Mobile devices.
 */

const SupabaseSync = {
  client: null,
  isConnected: false,
  isSyncing: false,
  isApplyingRemote: false,
  syncId: "",
  autoSync: true,
  lastSyncTime: null,
  realtimeChannel: null,
  debounceTimer: null,
  // Unique random session identifier to distinguish between multiple tabs/devices
  sessionId: "session_" + Math.random().toString(36).substring(2, 9),

  // Storage keys for connection credentials
  STORAGE_KEYS: {
    URL: "PREP_SUPABASE_URL",
    KEY: "PREP_SUPABASE_KEY",
    SYNC_ID: "PREP_SUPABASE_SYNC_ID",
    AUTOSYNC: "PREP_SUPABASE_AUTOSYNC",
    LAST_SYNC: "PREP_SUPABASE_LAST_SYNC_TIME"
  },

  // URL sanitizer to strip trailing /rest/v1 or slashes
  cleanUrl(rawUrl) {
    if (!rawUrl) return "";
    return rawUrl.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
  },

  // Initialize sync client on page load
  async init() {
    try {
      const rawUrl = localStorage.getItem(this.STORAGE_KEYS.URL) || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.url : "");
      const savedUrl = this.cleanUrl(rawUrl);
      const savedKey = (localStorage.getItem(this.STORAGE_KEYS.KEY) || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.anonKey : "") || "").trim();
      const savedSyncId = (localStorage.getItem(this.STORAGE_KEYS.SYNC_ID) || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.defaultSyncId : "") || "").trim();
      const savedAutoSync = localStorage.getItem(this.STORAGE_KEYS.AUTOSYNC);
      this.autoSync = savedAutoSync !== null ? savedAutoSync === "true" : true;
      this.syncId = (savedSyncId || "").trim();

      const lastSavedTime = localStorage.getItem(this.STORAGE_KEYS.LAST_SYNC);
      if (lastSavedTime) {
        this.lastSyncTime = new Date(lastSavedTime);
      }

      this.bindWindowEvents();

      // Check if credentials exist and Supabase library is loaded
      if (savedUrl && savedKey && window.supabase && typeof window.supabase.createClient === 'function') {
        try {
          this.client = window.supabase.createClient(savedUrl, savedKey, {
            auth: { persistSession: false }
          });

          if (this.syncId) {
            await this.verifyConnectionAndSync(false);
          } else {
            this.updateStatusBadge("not_configured", "SYNC: SET ID");
          }
        } catch (clientErr) {
          console.warn("Supabase client creation error:", clientErr);
          this.updateStatusBadge("error", "SYNC: CONFIG ERR");
        }
      } else {
        this.updateStatusBadge("local", "SYNC: LOCAL");
      }
    } catch (err) {
      console.warn("SupabaseSync initialization error:", err);
      this.updateStatusBadge("local", "SYNC: LOCAL");
    }
  },

  // Bind reactive global events
  bindWindowEvents() {
    // Listen for local changes to schedule debounced push
    window.addEventListener("app-state-updated", () => {
      if (this.isApplyingRemote) return;
      if (this.isConnected && this.autoSync && this.syncId) {
        this.scheduleDebouncedPush();
      }
    });

    // Mobile / tab focus detection: auto-pull if remote changes exist
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && this.isConnected && this.syncId) {
        this.checkAndPullIfNewer();
      }
    });

    window.addEventListener("focus", () => {
      if (this.isConnected && this.syncId) {
        this.checkAndPullIfNewer();
      }
    });
  },

  // Device identifier helper
  getDeviceName() {
    const ua = navigator.userAgent;
    let type = "Desktop";
    if (/Android/i.test(ua)) type = "Mobile (Android)";
    else if (/iPhone|iPad|iPod/i.test(ua)) type = "Mobile (iOS)";
    else if (/Windows/i.test(ua)) type = "Laptop (Windows)";
    else if (/Macintosh/i.test(ua)) type = "Mac";
    else if (/Linux/i.test(ua)) type = "Linux";
    return type;
  },

  // Full device tag including unique session ID
  getFullDeviceTag() {
    return `${this.getDeviceName()}#${this.sessionId}`;
  },

  // Verify connection, table existence, and initial synchronization
  async verifyConnectionAndSync(isManual = false) {
    if (!this.client || !this.syncId) return false;

    this.updateStatusBadge("syncing", "SYNCING...");

    try {
      // Query user_progress table for the current sync_id
      const { data, error } = await this.client
        .from("user_progress")
        .select("sync_id, state, updated_at, device_name")
        .eq("sync_id", this.syncId)
        .maybeSingle();

      if (error) {
        console.error("Supabase query error:", error);
        this.isConnected = false;
        this.updateStatusBadge("error", "SYNC: TABLE ERR");
        if (isManual) {
          alert(`Supabase Error: ${error.message}\n\nPlease verify that you created the 'user_progress' table in your Supabase SQL Editor.`);
        }
        return false;
      }

      this.isConnected = true;
      this.setupRealtimeSubscription();

      if (data && data.state) {
        // Cloud record exists! Compare timestamps
        const remoteTime = new Date(data.updated_at).getTime();
        const localTime = this.lastSyncTime ? this.lastSyncTime.getTime() : 0;
        const sourceDevice = (data.device_name || "").split("#")[0] || "Cloud";

        if (remoteTime > localTime) {
          // Cloud has newer progress (e.g. from mobile or other machine)
          console.log("Remote progress is newer. Applying cloud state...");
          await this.applyRemoteState(data.state, data.updated_at, sourceDevice);
          this.updateStatusBadge("connected", "SYNCED");
          if (isManual && typeof App !== 'undefined' && App.showToast) {
            App.showToast(`Synced latest progress from ${sourceDevice}!`, "success");
          }
        } else {
          // Local is newer or equal -> push local to ensure cloud is current
          console.log("Local progress is up to date or newer. Uploading to cloud...");
          await this.pushToCloud(false);
        }
      } else {
        // First time initialization for this Sync ID: upload local state
        console.log(`No remote state for sync_id '${this.syncId}'. Uploading local state...`);
        await this.pushToCloud(false);
        if (isManual && typeof App !== 'undefined' && App.showToast) {
          App.showToast(`Connected! Cloud backup created for Sync ID: ${this.syncId}`, "success");
        }
      }

      return true;
    } catch (err) {
      console.error("verifyConnectionAndSync failed:", err);
      this.isConnected = false;
      this.updateStatusBadge("error", "SYNC: OFFLINE");
      return false;
    }
  },

  // Push current local state to Supabase
  async pushToCloud(showToastNotice = false) {
    if (!this.client || !this.syncId) return false;

    this.isSyncing = true;
    this.updateStatusBadge("syncing", "SAVING...");

    try {
      const nowStr = new Date().toISOString();
      const payload = {
        sync_id: this.syncId,
        state: StorageManager.getState(),
        updated_at: nowStr,
        device_name: this.getFullDeviceTag()
      };

      const { error } = await this.client
        .from("user_progress")
        .upsert(payload, { onConflict: "sync_id" });

      if (error) {
        console.error("Push to Supabase failed:", error);
        this.updateStatusBadge("error", "SYNC ERR");
        this.isSyncing = false;
        return false;
      }

      this.lastSyncTime = new Date(nowStr);
      localStorage.setItem(this.STORAGE_KEYS.LAST_SYNC, nowStr);
      this.isConnected = true;
      this.isSyncing = false;
      this.updateStatusBadge("connected", "SYNCED");

      if (showToastNotice && typeof App !== 'undefined' && App.showToast) {
        App.showToast("Progress successfully synced to Cloud!", "success");
      }
      return true;
    } catch (err) {
      console.error("pushToCloud exception:", err);
      this.updateStatusBadge("error", "SYNC ERR");
      this.isSyncing = false;
      return false;
    }
  },

  // Pull latest cloud state and apply to local storage
  async pullFromCloud(showToastNotice = true) {
    if (!this.client || !this.syncId) return false;

    this.isSyncing = true;
    this.updateStatusBadge("syncing", "PULLING...");

    try {
      const { data, error } = await this.client
        .from("user_progress")
        .select("sync_id, state, updated_at, device_name")
        .eq("sync_id", this.syncId)
        .maybeSingle();

      if (error) {
        console.error("Pull failed with error:", error);
        this.updateStatusBadge("error", "PULL ERR");
        this.isSyncing = false;
        return false;
      }

      if (!data || !data.state) {
        // No remote backup exists yet for this key -> push current local
        this.isSyncing = false;
        if (showToastNotice && typeof App !== 'undefined' && App.showToast) {
          App.showToast(`No cloud data found for Sync ID: ${this.syncId}. Backing up local state now...`, "info");
        }
        await this.pushToCloud(true);
        return true;
      }

      const sourceDevice = (data.device_name || "").split("#")[0] || "Cloud";
      await this.applyRemoteState(data.state, data.updated_at, sourceDevice);
      this.isSyncing = false;
      this.updateStatusBadge("connected", "SYNCED");

      if (showToastNotice && typeof App !== 'undefined' && App.showToast) {
        App.showToast(`Pulled latest progress from ${sourceDevice}!`, "success");
      }
      return true;
    } catch (err) {
      console.error("pullFromCloud exception:", err);
      this.updateStatusBadge("error", "PULL ERR");
      this.isSyncing = false;
      return false;
    }
  },

  // Check if remote is newer and pull silently
  async checkAndPullIfNewer() {
    if (!this.client || !this.syncId || this.isSyncing) return;

    try {
      const { data } = await this.client
        .from("user_progress")
        .select("updated_at, device_name, state")
        .eq("sync_id", this.syncId)
        .maybeSingle();

      if (data && data.updated_at) {
        const remoteTime = new Date(data.updated_at).getTime();
        const localTime = this.lastSyncTime ? this.lastSyncTime.getTime() : 0;

        // If cloud update is at least 2 seconds newer, apply it
        if (remoteTime > (localTime + 2000)) {
          const sourceDevice = (data.device_name || "").split("#")[0] || "another device";
          console.log("Remote changes detected on background tab/window. Updating view...");
          await this.applyRemoteState(data.state, data.updated_at, sourceDevice);
          if (typeof App !== 'undefined' && App.showToast) {
            App.showToast(`Updated with progress from ${sourceDevice}!`, "info");
          }
        }
      }
    } catch (e) {
      // Silent catch on background checks
    }
  },

  // Apply remote state to local storage and refresh the current view safely
  async applyRemoteState(remoteState, updatedAtStr, deviceName) {
    if (!remoteState) return;

    this.isApplyingRemote = true;
    try {
      StorageManager.state = remoteState;
      StorageManager.saveState();

      if (updatedAtStr) {
        this.lastSyncTime = new Date(updatedAtStr);
        localStorage.setItem(this.STORAGE_KEYS.LAST_SYNC, updatedAtStr);
      }

      // Re-render currently active view
      if (typeof App !== 'undefined' && App.renderCurrentView) {
        App.renderCurrentView();
        if (App.updateHeaderBadges) App.updateHeaderBadges();
      }
    } finally {
      setTimeout(() => {
        this.isApplyingRemote = false;
      }, 300);
    }
  },

  // Debounced auto-push
  scheduleDebouncedPush() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.updateStatusBadge("syncing", "PENDING...");

    this.debounceTimer = setTimeout(() => {
      this.pushToCloud(false);
    }, 800);
  },

  // Realtime subscription via Supabase WebSockets
  setupRealtimeSubscription() {
    if (!this.client || !this.syncId) return;

    if (this.realtimeChannel) {
      try { this.client.removeChannel(this.realtimeChannel); } catch (e) {}
    }

    try {
      this.realtimeChannel = this.client
        .channel(`sync-channel-${this.syncId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "user_progress",
            filter: `sync_id=eq.${this.syncId}`
          },
          payload => {
            if (payload && payload.new && payload.new.state) {
              const remoteTag = payload.new.device_name || "";
              // Only apply if the update was made by a different session / device
              if (!remoteTag.endsWith("#" + this.sessionId)) {
                const sourceDevice = remoteTag.split("#")[0] || "another device";
                console.log("Instant Realtime update received from:", sourceDevice);
                this.applyRemoteState(payload.new.state, payload.new.updated_at, sourceDevice);
              }
            }
          }
        )
        .subscribe();
    } catch (e) {
      console.warn("Realtime channel subscription failed:", e);
    }
  },

  // Save new configuration from UI Modal
  async saveConfig(url, key, syncId, autoSync) {
    url = this.cleanUrl(url);
    key = (key || "").trim();
    syncId = (syncId || "").trim();

    if (!url || !key) {
      this.disconnect();
      return { success: true, message: "Cloud sync turned off. Running in local browser storage mode." };
    }

    if (!syncId) {
      return { success: false, message: "Please enter or generate a Personal Sync Key (e.g. ashish-prep-2026) so your devices know which record to sync." };
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      return { success: false, message: "Invalid Supabase Project URL. It should look like: https://yourproject.supabase.co" };
    }

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      return { success: false, message: "Supabase client library not loaded. Check internet connection." };
    }

    localStorage.setItem(this.STORAGE_KEYS.URL, url);
    localStorage.setItem(this.STORAGE_KEYS.KEY, key);
    localStorage.setItem(this.STORAGE_KEYS.SYNC_ID, syncId);
    localStorage.setItem(this.STORAGE_KEYS.AUTOSYNC, autoSync ? "true" : "false");

    this.syncId = syncId;
    this.autoSync = autoSync;

    try {
      this.client = window.supabase.createClient(url, key, {
        auth: { persistSession: false }
      });
    } catch (e) {
      return { success: false, message: "Failed to initialize Supabase client: " + e.message };
    }

    const ok = await this.verifyConnectionAndSync(true);
    return {
      success: ok,
      message: ok ? "Successfully connected to Supabase and synchronized!" : "Could not connect to Supabase. Check your Project URL, Anon Key, and SQL Table."
    };
  },

  // Disconnect from Supabase
  disconnect() {
    localStorage.removeItem(this.STORAGE_KEYS.URL);
    localStorage.removeItem(this.STORAGE_KEYS.KEY);
    localStorage.removeItem(this.STORAGE_KEYS.SYNC_ID);
    this.client = null;
    this.isConnected = false;
    this.syncId = "";
    this.updateStatusBadge("local", "SYNC: LOCAL");
    if (this.realtimeChannel) {
      try { this.client.removeChannel(this.realtimeChannel); } catch (e) {}
    }
  },

  // Generate random human-friendly sync code
  generateSyncId() {
    const chars = "abcdefghjkmnpqrstuvwxyz23456789";
    let code = "prep-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  // Update header status pill UI
  updateStatusBadge(statusClass, text) {
    const btn = document.getElementById("header-sync-btn");
    const label = document.getElementById("header-sync-text");

    if (!btn || !label) return;

    btn.classList.remove("connected", "syncing", "error");
    if (statusClass === "connected") btn.classList.add("connected");
    else if (statusClass === "syncing") btn.classList.add("syncing");
    else if (statusClass === "error") btn.classList.add("error");

    label.textContent = text;
  },

  // Modal UI Controls
  openModal() {
    const modal = document.getElementById("supabase-sync-modal");
    if (!modal) return;

    const savedUrl = localStorage.getItem(this.STORAGE_KEYS.URL) || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.url : "");
    const savedKey = localStorage.getItem(this.STORAGE_KEYS.KEY) || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.anonKey : "");
    const savedSyncId = localStorage.getItem(this.STORAGE_KEYS.SYNC_ID) || (typeof SUPABASE_CONFIG !== 'undefined' ? SUPABASE_CONFIG.defaultSyncId : "");
    const savedAutoSync = localStorage.getItem(this.STORAGE_KEYS.AUTOSYNC);

    const urlInput = document.getElementById("sync-modal-url");
    const keyInput = document.getElementById("sync-modal-key");
    const syncIdInput = document.getElementById("sync-modal-syncid");
    const autoSyncInput = document.getElementById("sync-modal-autosync");
    const statusBanner = document.getElementById("sync-modal-status-banner");

    if (urlInput) urlInput.value = savedUrl || "";
    if (keyInput) keyInput.value = savedKey || "";
    if (syncIdInput) syncIdInput.value = savedSyncId || "";
    if (autoSyncInput) autoSyncInput.checked = savedAutoSync !== null ? savedAutoSync === "true" : true;

    if (statusBanner) {
      if (this.isConnected && this.syncId) {
        const timeStr = this.lastSyncTime ? this.lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now";
        statusBanner.className = "sync-banner-connected";
        statusBanner.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--accent-success); box-shadow:0 0 6px var(--accent-success);"></span>
            <strong>Connected to Supabase</strong>
          </div>
          <div style="font-size:12px; margin-top:4px;">Sync Key: <code>${this.syncId.replace(/[&<>"']/g, '')}</code> • Last Synced: ${timeStr} • Device: ${this.getDeviceName()}</div>
        `;
      } else {
        statusBanner.className = "sync-banner-disconnected";
        statusBanner.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--text-muted);"></span>
            <strong>Running in Local Storage Mode (Offline)</strong>
          </div>
          <div style="font-size:12px; margin-top:4px;">Connect a free Supabase project to track progress on your mobile phone in real-time.</div>
        `;
      }
    }

    modal.classList.add("active");
  },

  closeModal() {
    const modal = document.getElementById("supabase-sync-modal");
    if (modal) modal.classList.remove("active");
  },

  async handleSaveFromModal() {
    const url = document.getElementById("sync-modal-url").value;
    const key = document.getElementById("sync-modal-key").value;
    const syncId = document.getElementById("sync-modal-syncid").value;
    const autoSync = document.getElementById("sync-modal-autosync").checked;

    const saveBtn = document.getElementById("sync-modal-save-btn");
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.textContent = "Connecting & Syncing...";
    }

    const res = await this.saveConfig(url, key, syncId, autoSync);

    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = "Save & Connect";
    }

    if (res.success) {
      if (typeof App !== 'undefined' && App.showToast) {
        App.showToast(res.message, "success");
      }
      this.closeModal();
      if (typeof App !== 'undefined' && App.renderSettingsView) {
        // Refresh settings view if open
        const container = document.getElementById("main-view-container");
        if (container && document.querySelector(".nav-item.active[data-view='settings']")) {
          App.renderSettingsView(container);
        }
      }
    } else {
      alert(res.message);
    }
  },

  handleGenerateCode() {
    const syncIdInput = document.getElementById("sync-modal-syncid");
    if (syncIdInput) {
      syncIdInput.value = this.generateSyncId();
    }
  },

  copySqlSetup() {
    const sqlText = `-- 1. Create the progress tracking table
create table if not exists user_progress (
  sync_id text primary key,
  state jsonb not null,
  updated_at timestamptz default now(),
  device_name text
);

-- 2. Enable Row Level Security and allow anonymous read/write access
alter table user_progress enable row level security;

create policy "Allow all operations with sync_id" 
on user_progress for all 
using (true) 
with check (true);

-- 3. Enable instant Realtime syncing across devices
alter publication supabase_realtime add table user_progress;`;

    navigator.clipboard.writeText(sqlText).then(() => {
      alert("Supabase SQL setup script copied to clipboard! Paste it into your Supabase SQL Editor and click 'Run'.");
    }).catch(err => {
      console.warn("Clipboard copy error:", err);
    });
  }
};

// Auto-boot reliably whether document is still loading or already parsed
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    SupabaseSync.init();
  });
} else {
  SupabaseSync.init();
}
