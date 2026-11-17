// Audited Portfolio Projects and 3 Prioritized Capstone Blueprints
const initialAuditedProjects = [
  {
    "id": "proj-audit-01",
    "title": "Placement Management Portal",
    "category": "Full-Stack Web (SDE)",
    "originalSource": "Proposed Major Rebuild",
    "codeAuthenticity": "Planned 100% independent implementation",
    "understandingRating": 9,
    "classification": "strong_candidate",
    "verdict": "Keep & Rebuild as Primary SDE Capstone",
    "architectureDefensible": true,
    "githubRepo": "",
    "notes": "Directly matches enterprise SDE internship hiring criteria. Rebuild cleanly with PostgreSQL, Node/Express, and React."
  },
  {
    "id": "proj-audit-02",
    "title": "End-to-End Customer Churn / Credit Risk ML System",
    "category": "Machine Learning (AI/ML)",
    "originalSource": "Previous Kaggle/AI assisted project",
    "codeAuthenticity": "Needs technical audit and rigorous refactoring",
    "understandingRating": 6,
    "classification": "worth_improving",
    "verdict": "Refactor & Deploy as Primary AI/ML Capstone",
    "architectureDefensible": true,
    "githubRepo": "",
    "notes": "Rewrite data preprocessing to prevent leakage, add Scikit-Learn Pipelines, tune models, deploy with FastAPI."
  },
  {
    "id": "proj-audit-03",
    "title": "Minimal In-Memory Key-Value Store with Write-Ahead Logging (WAL)",
    "category": "Systems / C++ / Python",
    "originalSource": "New Independent Project",
    "codeAuthenticity": "Strictly 0% AI code generation",
    "understandingRating": 9,
    "classification": "strong_candidate",
    "verdict": "Build as Proof of Independent Engineering Ability",
    "architectureDefensible": true,
    "githubRepo": "",
    "notes": "Demonstrates pure computer science fundamentals, file I/O persistence, concurrency, and zero AI reliance."
  },
  {
    "id": "proj-audit-04",
    "title": "Facial Recognition Attendance System",
    "category": "Computer Vision",
    "originalSource": "Tutorial / OpenCV script copy",
    "codeAuthenticity": "Heavy AI/tutorial boilerplate",
    "understandingRating": 4,
    "classification": "tutorial_ai",
    "verdict": "Do Not Highlight on Resume",
    "architectureDefensible": false,
    "githubRepo": "",
    "notes": "Very generic tutorial project without production considerations. Keep on GitHub as archive but do not claim as major engineering achievement."
  },
  {
    "id": "proj-audit-05",
    "title": "Basic Weather App with React",
    "category": "Frontend",
    "originalSource": "Weekend tutorial",
    "codeAuthenticity": "Copied from YouTube tutorial",
    "understandingRating": 5,
    "classification": "exclude",
    "verdict": "Exclude from Resume",
    "architectureDefensible": false,
    "githubRepo": "",
    "notes": "Too basic for 3rd year engineering internships. Does not prove backend or database competencies."
  },
  {
    "id": "proj-audit-06",
    "title": "Document RAG Q&A Bot with LangChain & OpenAI",
    "category": "Generative AI",
    "originalSource": "AI-generated wrapper script",
    "codeAuthenticity": "High AI dependence, basic API calls",
    "understandingRating": 5,
    "classification": "worth_improving",
    "verdict": "Improve: Strip high-level wrappers, use pure ChromaDB + Pydantic",
    "architectureDefensible": true,
    "githubRepo": "",
    "notes": "Interviewer will grill on chunking trade-offs, vector math, and context precision. Refactor without boilerplate wrappers."
  },
  {
    "id": "proj-audit-07",
    "title": "Simple E-commerce Frontend with Cart",
    "category": "Frontend",
    "originalSource": "College semester mini-project",
    "codeAuthenticity": "Template-based",
    "understandingRating": 5,
    "classification": "exclude",
    "verdict": "Exclude from Resume",
    "architectureDefensible": false,
    "githubRepo": "",
    "notes": "Subsumed by Placement Management Portal, which contains much richer enterprise workflows."
  },
  {
    "id": "proj-audit-08",
    "title": "Twitter / Reddit Sentiment Analyzer",
    "category": "NLP",
    "originalSource": "AI-assisted sentiment pipeline",
    "codeAuthenticity": "AI generated code",
    "understandingRating": 4,
    "classification": "tutorial_ai",
    "verdict": "Do Not Highlight on Resume",
    "architectureDefensible": false,
    "githubRepo": "",
    "notes": "Standard tutorial dataset. Lacks production engineering or defensible error analysis."
  }
];
const initialCapstoneProjects = [
  {
    "id": "capstone-1",
    "title": "Project 1: Enterprise Placement Management Portal (Full-Stack SDE)",
    "role": "Lead Full-Stack Engineer",
    "focus": "SDE Core (React, Node.js, Express, PostgreSQL, JWT RBAC)",
    "status": "in_planning",
    "understandingScore": 8,
    "independentPercent": 85,
    "githubUrl": "",
    "liveUrl": "",
    "architectureSpec": "Client-Server layered architecture with RESTful API, PostgreSQL database with relational normalization, and JWT auth",
    "keyFeatures": [
      "Student Profile & verified academic metrics management",
      "Job Posting with strict automated criteria engine (CGPA, Branch, Backlogs)",
      "Application lifecycle state machine (Applied -> Shortlisted -> OA -> Interview -> Selected)",
      "Admin placement metrics and company performance dashboard"
    ],
    "interviewDefensePoints": {
      "problemSolved": "Replaces error-prone manual Google Forms campus placement workflows with automated eligibility enforcement.",
      "techChoices": "PostgreSQL chosen over MongoDB because placement records require strict relational integrity and transactional consistency.",
      "challengesFaced": "Handling race conditions in interview scheduling and designing a flexible eligibility rule evaluation engine.",
      "debuggingStory": "Resolved JWT refresh token replay vulnerabilities by implementing rotating refresh tokens stored in HTTP-only cookies."
    }
  },
  {
    "id": "capstone-2",
    "title": "Project 2: End-to-End ML Prediction & Scoring Microservice (AI/ML Capstone)",
    "role": "Machine Learning Engineer",
    "focus": "AI/ML Production (Scikit-Learn, Pandas, FastAPI, Docker, Pytest)",
    "status": "in_planning",
    "understandingScore": 7,
    "independentPercent": 90,
    "githubUrl": "",
    "liveUrl": "",
    "architectureSpec": "Modular Scikit-learn preprocessing and model pipeline served via async FastAPI endpoints with Pydantic validation",
    "keyFeatures": [
      "Reproducible leak-free data pipeline using ColumnTransformer",
      "Comparative evaluation of Logistic Regression, Random Forest, and LightGBM",
      "Probability calibration and threshold optimization for domain-specific cost matrix",
      "Containerized deployment on Render with automated pytest health checks"
    ],
    "interviewDefensePoints": {
      "problemSolved": "Accurately predicts credit default / customer churn with transparent confidence scores and feature attributions.",
      "techChoices": "Selected LightGBM for superior handling of tabular non-linearities and fast inference latency under 15ms.",
      "challengesFaced": "Severe 9:1 class imbalance required tuning the classification threshold and evaluating with Precision-Recall AUC rather than ROC-AUC.",
      "debuggingStory": "Identified subtle target leakage caused by scaling before train-test split; refactored entire flow into Scikit-Learn Pipelines."
    }
  },
  {
    "id": "capstone-3",
    "title": "Project 3: In-Memory Key-Value Storage Engine with WAL (0% AI Independent Project)",
    "role": "Systems Programmer",
    "focus": "Independent Engineering (C++ / Python, Systems, File I/O, Concurrency)",
    "status": "in_planning",
    "understandingScore": 9,
    "independentPercent": 100,
    "githubUrl": "",
    "liveUrl": "",
    "architectureSpec": "In-memory hash table with append-only Write-Ahead Log (WAL) for crash recovery and background compaction",
    "keyFeatures": [
      "Zero AI-generated code written; 100% independently designed and debugged",
      "Fast O(1) in-memory lookups with thread-safe read/write locking",
      "Persistent durability via append-only binary/text log replay on startup",
      "Benchmarking suite measuring operations per second under concurrent loads"
    ],
    "interviewDefensePoints": {
      "problemSolved": "Provides an ultra-lightweight, embeddable key-value store with crash-resilient durability guarantees.",
      "techChoices": "Implemented without external database dependencies to demonstrate deep understanding of file pointers, buffers, and memory.",
      "challengesFaced": "Managing log file bloat required implementing an atomic log compaction routine without blocking active reads.",
      "debuggingStory": "Tracked down a silent data corruption bug caused by partial writes during simulated abrupt process termination."
    }
  }
];
