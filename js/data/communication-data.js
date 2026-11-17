// 26 Weekly Communication Themes and Daily 3-Part Speaking Structure
const initialCommunicationThemes = [
  {
    "week": 1,
    "theme": "Self-Introduction & Engineering Journey Baseline",
    "focus": "Speaking clearly about background, B.Tech AI/ML, and career goals without hesitation."
  },
  {
    "week": 2,
    "theme": "Articulating Algorithmic Complexity in English",
    "focus": "Explaining Big-O time and space trade-offs aloud as if talking to a technical interviewer."
  },
  {
    "week": 3,
    "theme": "Technical Explanation: How Hash Maps Work Under the Hood",
    "focus": "Explaining hashing, buckets, collisions, and load factors in clean, simple English."
  },
  {
    "week": 4,
    "theme": "Two-Pointer and Sliding Window Problem Narration",
    "focus": "Narrating problem-solving steps out loud while writing or walking through code."
  },
  {
    "week": 5,
    "theme": "Binary Search & Search Space Reduction Explanation",
    "focus": "Explaining why binary search works on monotonic functions to a junior peer."
  },
  {
    "week": 6,
    "theme": "Recursion, Call Stacks & Backtracking Narration",
    "focus": "Verbally explaining the recursive call tree and base conditions without getting tangled."
  },
  {
    "week": 7,
    "theme": "Linked Lists vs Arrays: Memory & Pointer Trade-Offs",
    "focus": "Contrasting contiguous vs pointer-based memory allocation clearly."
  },
  {
    "week": 8,
    "theme": "Explaining SQL Queries, Joins, and Normalization",
    "focus": "Describing why database normalization prevents update anomalies."
  },
  {
    "week": 9,
    "theme": "Operating System Fundamentals: Processes vs Threads",
    "focus": "Articulating context switching, memory sharing, and concurrency bottlenecks."
  },
  {
    "week": 10,
    "theme": "Binary Trees & Level Order Traversal Narration",
    "focus": "Explaining BFS queue mechanics and recursion depth bounds clearly."
  },
  {
    "week": 11,
    "theme": "Explaining REST APIs, HTTP Methods, and Status Codes",
    "focus": "Describing client-server contract, idempotency, and error handling."
  },
  {
    "week": 12,
    "theme": "Authentication, Passwords & JWT Security Explanation",
    "focus": "Explaining how stateless tokens work and why passwords must never be stored raw."
  },
  {
    "week": 13,
    "theme": "Full-Stack Project Architecture Walkthrough",
    "focus": "Delivering a confident 2-minute architectural elevator pitch of the Placement Portal."
  },
  {
    "week": 14,
    "theme": "Explaining Machine Learning Algorithms (Random Forest vs XGBoost)",
    "focus": "Explaining bagging vs boosting to an interviewer without using confusing jargon."
  },
  {
    "week": 15,
    "theme": "Model Evaluation Metrics: Precision, Recall & F1 Explanation",
    "focus": "Explaining why 99% accuracy can be disastrous on an imbalanced dataset."
  },
  {
    "week": 16,
    "theme": "Deep Learning: The Vanishing Gradient Problem Explained",
    "focus": "Explaining activation functions, derivatives, and gradient flow through neural layers."
  },
  {
    "week": 17,
    "theme": "Explaining RAG (Retrieval-Augmented Generation) & Vector Embeddings",
    "focus": "Explaining how semantic search and context injection stop LLM hallucinations."
  },
  {
    "week": 18,
    "theme": "FastAPI Deployment & Production Microservice Architecture",
    "focus": "Explaining how your ML model serves live predictions with Pydantic validation."
  },
  {
    "week": 19,
    "theme": "HR Interview Drill: 'Tell Me About Yourself'",
    "focus": "Polishing the 90-second professional self-pitch tailored to SDE and AI/ML roles."
  },
  {
    "week": 20,
    "theme": "HR Interview Drill: 'Why Do You Want This Internship?'",
    "focus": "Showing genuine research into company products, culture, and growth opportunities."
  },
  {
    "week": 21,
    "theme": "Technical Storytelling: 'What Was the Toughest Bug You Solved?'",
    "focus": "Using the STAR method (Situation, Task, Action, Result) to narrate a real debugging victory."
  },
  {
    "week": 22,
    "theme": "Behavioral Drill: 'Describe a Time You Failed or Disagreed'",
    "focus": "Showing maturity, accountability, learning ability, and positive teamwork."
  },
  {
    "week": 23,
    "theme": "Live Whiteboard Problem-Solving Narration",
    "focus": "Speaking continuously while thinking through unseen algorithmic challenges."
  },
  {
    "week": 24,
    "theme": "Handling Difficult Questions When You Don't Know the Answer",
    "focus": "Gracefully acknowledging knowledge boundaries while demonstrating structured problem-solving."
  },
  {
    "week": 25,
    "theme": "Executive Project Defense: Placement Portal & ML System",
    "focus": "Answering tough grilling questions about database constraints and data leakage."
  },
  {
    "week": 26,
    "theme": "Final Comprehensive Internship Interview Simulation",
    "focus": "Full 30-minute mock communication recording with self-critique."
  }
];
