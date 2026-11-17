# 180-Day SDE + AI/ML Internship Preparation Command Center
> **Start Date:** 17 November 2026 | **End Date:** 17 May 2027  
> **Duration:** 26 Weeks (182 Days) | **Target Batch:** B.Tech AIML (Graduation 2028, Tier 2/3)  
> **Architecture:** Zero-dependency, Offline-first, Modern SaaS Dashboard (Vanilla HTML5 / CSS3 / ES6+ JavaScript / LocalStorage)

---

## 🚀 Quick Start Guide

### 1. Opening the Application
The dashboard is completely self-contained and offline-ready with zero external dependencies.

- **Option A (Direct File Launch):**  
  Double-click `index.html` or right-click and choose **Open with Google Chrome / Microsoft Edge / Brave / Firefox**.
- **Option B (Local Web Server):**  
  If preferred, run any lightweight local server in this directory:
  ```bash
  # Using Python 3:
  python -m http.server 8000
  # Then open in your browser:
  http://localhost:8000/
  ```

---

## 📁 Project Structure

```
d:\Room_Project\prep\
├── index.html                   # Main dashboard application shell and modal dialogs
├── css/
│   └── style.css                # Linear/Notion SaaS design system (Dark & Light themes, Responsive)
├── js/
│   ├── app.js                   # Application coordinator, view controllers, routing & event handlers
│   ├── storage.js               # Reactive LocalStorage manager, Spaced Repetition engine & JSON backup
│   ├── charts.js                # Zero-dependency SVG visualization engine (Progress, Mastery, Tracks, Funnel)
│   └── data/
│       ├── roadmap-data.js      # Complete 26-week / 182-day curriculum with DoD & Rubrics (~1.03 MB)
│       ├── dsa-data.js          # Curated 139 DSA problems with LeetCode links, complexities & patterns
│       ├── aiml-data.js         # 18 structured AI/ML modules with exercises & technical viva questions
│       ├── sde-data.js          # Full-Stack SDE curriculum + Placement Management Portal architecture
│       ├── projects-data.js     # Technical audit of 10-15 existing projects + 3 Capstone blueprints
│       ├── communication-data.js# 26 weekly English communication themes & daily speaking prompts
│       └── resources-data.js    # Curated, verified documentation and internship portal catalog
├── scripts/
│   ├── generate_base_data.py    # Generator for base curriculum and catalog datasets
│   └── generate_roadmap.py      # Generator for the 26-week master calendar and daily tasks
└── README.md                    # Comprehensive documentation and operational guide
```

---

## 🏛️ Application Architecture

```
+--------------------------------------------------------------------------------+
|                                  USER BROWSER                                  |
|                                                                                |
|  +------------------+    +--------------------+    +------------------------+  |
|  |   App Router     |    |   View Controllers |    |   Interactive Modals   |  |
|  |  (js/app.js)     |<-->|   13 Modular Views |<-->|  Task, DSA, AI, CRM,   |  |
|  +------------------+    +--------------------+    |  Speaking, Assessments |  |
|           ^                         ^              +------------------------+  |
|           |                         |                           ^              |
|           v                         v                           |              |
|  +------------------+    +--------------------+                 |              |
|  |  SVG Chart Engine|    |   Storage Manager  |-----------------+              |
|  |  (js/charts.js)  |    |  (js/storage.js)   |                                |
|  +------------------+    +--------------------+                                |
|                                     ^                                          |
|                                     v                                          |
|                     +-------------------------------+                          |
|                     |  Browser Persistent Storage   |                          |
|                     |  Key: INTERNSHIP_PREP_..._V1  |                          |
|                     +-------------------------------+                          |
|                                     ^                                          |
|                                     v                                          |
|                     +-------------------------------+                          |
|                     |  JSON Export / Import Backup  |                          |
|                     +-------------------------------+                          |
+--------------------------------------------------------------------------------+
```

1. **State Management & Persistence (`js/storage.js`):**  
   All task completions, DSA problem attempt histories, confidence scores, notes, AI dependency logs, speaking sessions, and internship applications persist in browser `localStorage`. No backend database is required.
2. **Spaced Repetition Algorithm:**  
   Calculates future revision dates dynamically using standard memory consolidation intervals: **Day 1, Day 3, Day 7, Day 14, and Day 30**. A dedicated **Revision Queue** alerts you whenever problems are due for recall verification.
3. **Zero-Dependency SVG Visualizations (`js/charts.js`):**  
   Custom SVG rendering ensures lightning-fast performance and 100% offline functionality without external CDNs or charting library vulnerabilities.
4. **Data Portability:**  
   Includes a full JSON export/import mechanism so you can back up your progress to your filesystem and restore it on any machine or browser.

---

## 🎯 Master Features & Operational Instructions

### 1. Today's Action Studio
- **What to study today:** View your allocated tasks for the exact calendar day (starting Tuesday, 17 Nov 2026).
- **Definition of Done (DoD):** Checking a task triggers an explicit verification prompt requiring you to confirm that you independently understood and implemented the concept.
- **Evidence & Notes:** Click **"✏ Add Notes / Evidence"** on any task to log personal insights, difficult edge cases, confidence ratings (1–5), and GitHub commit URLs.

### 2. 26-Week Master Roadmap
- Contains all **182 individual days** grouped into 6 logical preparation phases.
- Filter by Month (1 to 6) or browse daily tabs.
- Each week includes comprehensive **Weekly Objectives**, **Daily Focus Areas**, and an objective **100-Point Evaluation Scorecard**.

### 3. DSA Mastery Management System
- Curated catalog of **139 LeetCode problems** across all core topics (Arrays, Strings, Two Pointers, Sliding Window, Binary Search, Linked Lists, Stacks, Trees, BST, Heaps, Graphs, Dynamic Programming, Greedy, Backtracking).
- **Strict Mastery Standard:** A problem is only marked *Mastered* if:
  - It was solved independently without copying code.
  - The optimized Big-O time and space approach is implemented and understood.
  - The solution can be verbally explained and reproduced.
  - At least one spaced revision cycle has been completed.
- Filter by Topic, Difficulty, or Mastery Status. Click **"+ Add Custom Problem"** to track questions from contests or assessments.

### 4. Full-Stack SDE Track & Placement Portal Capstone
- **Primary Capstone Project:** Complete architectural specification, PostgreSQL normalized ER database schema (`users`, `student_profiles`, `companies`, `jobs`, `applications`, `interview_rounds`), REST API endpoints catalog, and 8 development milestones.
- Complete curriculum checklists for Frontend (React), Backend (Node/Express), Database (PostgreSQL), and Developer Tools (Git, Postman).

### 5. AI/ML Specialization Track
- **18 Structured Modules:** Python Foundations, Math, Statistics/Probability, NumPy/Pandas, EDA, Preprocessing, Supervised Models, Ensembles, Unsupervised Learning, Evaluation Metrics, Deep Learning, PyTorch, NLP, Embeddings/Transformers, Generative AI, RAG Architecture, FastAPI Serving, and Production Deployment.
- Each module provides actionable learning objectives, verified documentation links, hands-on mini-projects, and technical interview knowledge checks.

### 6. Project Audit & Capstone Defense
- **Audit of Existing Projects:** Catalogs 10–15 college and AI-assisted projects, classifying them into *Strong Portfolio Candidates*, *Worth Improving*, *Tutorial/AI-Generated (Do Not Highlight)*, and *Exclude from Resume*.
- **The 3 Priority Capstones:**
  1. **Enterprise Placement Management Portal** (Full-Stack SDE)
  2. **End-to-End ML Prediction & Scoring Microservice** (AI/ML)
  3. **In-Memory Key-Value Storage Engine with Write-Ahead Logging (WAL)** (100% Independent, 0% AI Code)
- Includes pre-prepared **Interview Defense Talking Points** covering problem statements, architectural trade-offs, challenges, and debugging post-mortems.

### 7. AI Dependency Reduction System
- **The 5-Step Protocol:** Visual workflow requiring at least 25 minutes of independent effort and documentation review before consulting AI.
- **AI Usage Log:** Log every assistance event, recording independent struggle duration, assistance level, key learning, and whether the task can be repeated alone.
- **Independence KPI:** Tracks your ratio of independent vs AI-assisted problem solving.

### 8. English Communication Hub
- **Daily 30-Minute Routine:**
  - 10 mins: Everyday speaking (fluency and pace).
  - 10 mins: Technical concept explanation in English (as if teaching an interviewer).
  - 10 mins: Interview answer recording and critique.
- **Interactive Practice Recorder & Timer:** Built-in audio recorder using the browser `MediaRecorder` API with live timer and audio playback to critique pauses and filler words.
- **Speaking Log CRM:** Track date, topic, confidence score (1–5), fluency rating, filler word notes, and new vocabulary learned.

### 9. Internship Application CRM Tracker
- Full funnel pipeline tracking: *Interested*, *Ready to Apply*, *Applied*, *Assessment Pending*, *Interview Scheduled*, *Selected*, *Offer Received*, *Rejected*.
- Filter by status and role category (SDE, AI/ML, Python, Full-Stack, Data).
- Log interview rounds, online assessment (OA) dates, follow-up deadlines, and post-mortem lessons learned.

### 10. Weekly Assessments (100-Point Scoring Rubric)
- Objective scoring breakdown:
  - **DSA & Problem Solving:** 25 points
  - **Software Development:** 20 points
  - **AI/ML Competence:** 20 points
  - **CS Fundamentals (OS/DBMS/CN):** 15 points
  - **English Communication & Articulation:** 10 points
  - **Consistency & Discipline:** 10 points
- Pass mark is **70/100**. Scores below 70 automatically generate specific remedial guidance before advanced topics are introduced.

### 11. University Examination Mode
- Toggle in the header or in Settings whenever college exams approach.
- **Maintenance Schedule:** Automatically reduces daily load to 1.5 hours (1 essential DSA problem + 15m English + 1 critical spaced revision).
- Pauses heavy project milestones and application quotas so you can achieve top academic grades without losing your preparation habit.
- When exams conclude, click **"Reschedule Missed Tasks Realistically"** to distribute catch-up tasks across upcoming weeks without overloading any single day.

### 12. Backup, Export & Portability
- **Export Backup:** Downloads a complete timestamped `internship_prep_dashboard_backup_YYYY-MM-DD.json` file.
- **Import Backup:** Restores your entire roadmap progress, notes, and CRM records from any valid JSON backup file.
- **Factory Reset:** Safe reset requiring typing `"RESET"` in capital letters.

---

## 📈 Preparation Allocation Breakdown

| Learning Track | Allocation | Primary Focus Areas |
| :--- | :---: | :--- |
| **DSA & Problem Solving** | **30%** | Independent optimization, Big-O invariants, 139 curated problems, spaced repetition. |
| **Software Dev & CS Fundamentals** | **25%** | OOP, Git, DBMS & SQL, OS, Computer Networks, REST APIs, Security/JWT. |
| **Independent Projects** | **20%** | Full-Stack Placement Portal capstone, 0% AI Key-Value store, defensible architecture. |
| **AI/ML Specialization** | **15%** | Scikit-Learn pipelines, feature engineering, PyTorch, RAG, FastAPI serving. |
| **Communication & Applications** | **10%** | Daily 30m speaking drills, technical articulation, STAR interview framework, active CRM pipeline. |

---

## 🔒 Confidentiality & Privacy
All progress data remains 100% on your local machine within browser `localStorage`. No data is uploaded to remote servers or third-party telemetry services.
