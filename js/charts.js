/**
 * Lightweight, zero-dependency SVG & Canvas Chart Visualization Engine
 * Renders beautiful, accessible Linear-style charts offline without CDN dependencies.
 */

const Charts = {
  // Render Weekly Roadmap Progress Bar Chart (26 Weeks)
  renderWeeklyProgress(containerId, roadmapData, currentWeek) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const weeks = roadmapData || [];
    const width = container.clientWidth || 700;
    const height = 180;
    const padding = { top: 20, right: 20, bottom: 35, left: 35 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const barWidth = Math.max(8, Math.floor(chartW / 26) - 6);

    let barsSvg = "";
    weeks.forEach((w, i) => {
      let totalTasks = 0;
      let completedTasks = 0;
      (w.days || []).forEach(d => {
        (d.tasks || []).forEach(t => {
          totalTasks++;
          if (t.isCompleted) completedTasks++;
        });
      });

      const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const barH = Math.max(4, (percent / 100) * chartH);
      const x = padding.left + i * (chartW / 26) + (chartW / 26 - barWidth) / 2;
      const y = padding.top + (chartH - barH);

      const isCurrent = w.weekNumber === currentWeek;
      const barColor = isCurrent ? "var(--accent-primary)" : (percent > 0 ? "var(--accent-success)" : "var(--bg-tertiary)");
      const strokeColor = isCurrent ? "var(--accent-cyan)" : "none";

      barsSvg += `
        <g class="chart-bar-group" data-tooltip="Week ${w.weekNumber}: ${Math.round(percent)}% complete (${completedTasks}/${totalTasks} tasks)">
          <rect x="${x}" y="${padding.top}" width="${barWidth}" height="${chartH}" rx="3" fill="var(--bg-secondary)" opacity="0.4" />
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="3" fill="${barColor}" stroke="${strokeColor}" stroke-width="${isCurrent ? '2' : '0'}" />
          ${(i + 1) % 4 === 1 || i === 25 ? `
            <text x="${x + barWidth / 2}" y="${height - 10}" fill="var(--text-muted)" font-size="10" text-anchor="middle">W${w.weekNumber}</text>
          ` : ''}
        </g>
      `;
    });

    container.innerHTML = `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="interactive-svg-chart">
        <!-- Grid lines -->
        <line x1="${padding.left}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top}" stroke="var(--border-subtle)" stroke-dasharray="3 3" />
        <line x1="${padding.left}" y1="${padding.top + chartH / 2}" x2="${width - padding.right}" y2="${padding.top + chartH / 2}" stroke="var(--border-subtle)" stroke-dasharray="3 3" />
        <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="var(--border-subtle)" />
        
        <!-- Y-Axis labels -->
        <text x="${padding.left - 8}" y="${padding.top + 4}" fill="var(--text-muted)" font-size="10" text-anchor="end">100%</text>
        <text x="${padding.left - 8}" y="${padding.top + chartH / 2 + 4}" fill="var(--text-muted)" font-size="10" text-anchor="end">50%</text>
        <text x="${padding.left - 8}" y="${padding.top + chartH + 4}" fill="var(--text-muted)" font-size="10" text-anchor="end">0%</text>

        <!-- Bars -->
        ${barsSvg}
      </svg>
    `;
  },

  // Render DSA Topic Mastery Donut Chart
  renderDsaDonut(containerId, stats) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const total = stats.dsaTotal || 1;
    const mastered = stats.dsaMastered || 0;
    const optimized = stats.dsaOptimized || 0;
    const independent = stats.dsaIndependent || 0;
    const attempted = stats.dsaAttempted || 0;
    const notStarted = Math.max(0, total - (attempted + independent + optimized + mastered));

    const segments = [
      { label: "Mastered", count: mastered, color: "var(--accent-success)" },
      { label: "Optimized & Explained", count: optimized, color: "var(--accent-cyan)" },
      { label: "Solved Independently", count: independent, color: "var(--accent-primary)" },
      { label: "Attempted / In Progress", count: attempted, color: "var(--accent-warning)" },
      { label: "Not Started", count: notStarted, color: "var(--bg-tertiary)" }
    ];

    const size = 180;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = 0;
    let pathsSvg = "";

    segments.forEach(seg => {
      const fraction = seg.count / total;
      const strokeDashoffset = circumference * (1 - fraction);
      const rotation = (accumulatedAngle / total) * 360;

      pathsSvg += `
        <circle 
          cx="${size / 2}" 
          cy="${size / 2}" 
          r="${radius}" 
          fill="transparent" 
          stroke="${seg.color}" 
          stroke-width="${strokeWidth}" 
          stroke-dasharray="${circumference}" 
          stroke-dashoffset="${strokeDashoffset}" 
          transform="rotate(${rotation - 90} ${size / 2} ${size / 2})"
          class="donut-segment"
        />
      `;
      accumulatedAngle += seg.count;
    });

    const percentMastered = Math.round((mastered / total) * 100);

    let legendHtml = `
      <div class="donut-legend-grid">
        ${segments.map(s => `
          <div class="legend-item">
            <span class="legend-color-dot" style="background-color: ${s.color};"></span>
            <span class="legend-label">${s.label}</span>
            <span class="legend-count">${s.count}</span>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = `
      <div class="donut-chart-wrapper">
        <div class="donut-svg-box">
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            ${pathsSvg}
          </svg>
          <div class="donut-center-label">
            <span class="center-value">${percentMastered}%</span>
            <span class="center-sub">Mastery</span>
          </div>
        </div>
        ${legendHtml}
      </div>
    `;
  },

  // Render 5-Track Progress Comparison Horizontal Bars
  renderTrackBars(containerId, trackStats) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tracks = [
      { key: "dsa", name: "1. DSA & Problem Solving (30%)", color: "var(--accent-primary)", icon: "code" },
      { key: "sde", name: "2. Full-Stack SDE & CS Fundamentals (25%)", color: "var(--accent-cyan)", icon: "database" },
      { key: "project", name: "3. Independent Projects (20%)", color: "var(--accent-warning)", icon: "folder-git" },
      { key: "aiml", name: "4. AI/ML Specialization (15%)", color: "var(--accent-purple)", icon: "brain" },
      { key: "comm", name: "5. Communication & Applications (10%)", color: "var(--accent-success)", icon: "mic" }
    ];

    let html = `<div class="track-bars-container">`;

    tracks.forEach(tr => {
      const data = (trackStats && trackStats[tr.key]) || { total: 10, completed: 0 };
      const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;

      html += `
        <div class="track-bar-row">
          <div class="track-bar-header">
            <span class="track-bar-name">${tr.name}</span>
            <span class="track-bar-metrics">${data.completed} / ${data.total} tasks (${pct}%)</span>
          </div>
          <div class="track-progress-track">
            <div class="track-progress-fill" style="width: ${pct}%; background-color: ${tr.color};"></div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  },

  // Render Internship Pipeline Stage Distribution Funnel
  renderApplicationFunnel(containerId, appStats) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stages = [
      { label: "Saved / Interested", count: appStats.interested || 0, color: "var(--text-muted)" },
      { label: "Applied", count: appStats.applied || 0, color: "var(--accent-primary)" },
      { label: "OA / Assessment", count: appStats.assessment || 0, color: "var(--accent-cyan)" },
      { label: "Interview Round", count: appStats.interview || 0, color: "var(--accent-warning)" },
      { label: "Offers Received", count: appStats.offers || 0, color: "var(--accent-success)" }
    ];

    const maxCount = Math.max(1, ...stages.map(s => s.count));

    let html = `<div class="pipeline-funnel-grid">`;
    stages.forEach(st => {
      const widthPct = Math.max(12, Math.round((st.count / maxCount) * 100));
      html += `
        <div class="pipeline-stage-card">
          <div class="stage-metric-box">
            <span class="stage-count" style="color: ${st.color};">${st.count}</span>
            <span class="stage-label">${st.label}</span>
          </div>
          <div class="stage-bar-visual">
            <div class="stage-bar-fill" style="width: ${widthPct}%; background-color: ${st.color};"></div>
          </div>
        </div>
      `;
    });
    html += `</div>`;

    container.innerHTML = html;
  }
};
