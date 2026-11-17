// Curated & Verified Resources Library Catalog
const initialResourcesCatalog = [
  {
    "id": "res-01",
    "category": "DSA",
    "title": "Striver's A2Z DSA Course Sheet",
    "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    "description": "Comprehensive, beginner-to-advanced roadmap covering every essential algorithmic pattern with C++ code and explanations.",
    "tags": [
      "DSA",
      "C++",
      "Interview Prep",
      "Patterns"
    ]
  },
  {
    "id": "res-02",
    "category": "DSA",
    "title": "LeetCode Practice Platform",
    "url": "https://leetcode.com/",
    "description": "The industry standard platform for algorithmic problem solving, contest assessments, and coding interview practice.",
    "tags": [
      "DSA",
      "Practice",
      "Problems",
      "Coding"
    ]
  },
  {
    "id": "res-03",
    "category": "DSA",
    "title": "NeetCode 150 & Practice Roadmap",
    "url": "https://neetcode.io/practice",
    "description": "Visual breakdown and structured grouping of the top 150 LeetCode problems categorized by fundamental patterns.",
    "tags": [
      "DSA",
      "NeetCode",
      "Patterns",
      "Blind75"
    ]
  },
  {
    "id": "res-04",
    "category": "Language Reference",
    "title": "cppreference.com - C++ Reference Guide",
    "url": "https://en.cppreference.com/",
    "description": "Official, authoritative reference for modern C++, STL containers (vector, map, set), algorithms, and language semantics.",
    "tags": [
      "C++",
      "STL",
      "Reference",
      "Language"
    ]
  },
  {
    "id": "res-05",
    "category": "Language Reference",
    "title": "Python 3 Official Documentation & Tutorial",
    "url": "https://docs.python.org/3/",
    "description": "Complete reference for Python built-ins, standard library modules, data models, and virtual environments.",
    "tags": [
      "Python",
      "Documentation",
      "Core",
      "Language"
    ]
  },
  {
    "id": "res-06",
    "category": "Database",
    "title": "PostgreSQL Documentation",
    "url": "https://www.postgresql.org/docs/",
    "description": "Official documentation for PostgreSQL relational database management system, SQL queries, transactions, and indexing.",
    "tags": [
      "SQL",
      "PostgreSQL",
      "Database",
      "DBMS"
    ]
  },
  {
    "id": "res-07",
    "category": "Version Control",
    "title": "Git Official Reference Documentation",
    "url": "https://git-scm.com/doc",
    "description": "Authoritative guide on Git branching, commits, merging, rebase, cherry-pick, and team repository workflows.",
    "tags": [
      "Git",
      "GitHub",
      "VCS",
      "DevOps"
    ]
  },
  {
    "id": "res-08",
    "category": "Frontend",
    "title": "MDN Web Docs - JavaScript Guide",
    "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "description": "Mozilla Developer Network's gold-standard guide for JavaScript syntax, DOM manipulation, asynchronous programming, and Web APIs.",
    "tags": [
      "JavaScript",
      "MDN",
      "Frontend",
      "Web"
    ]
  },
  {
    "id": "res-09",
    "category": "Frontend",
    "title": "React Official Documentation (react.dev)",
    "url": "https://react.dev/",
    "description": "Modern React documentation emphasizing functional components, hooks, declarative rendering, and state management.",
    "tags": [
      "React",
      "Frontend",
      "UI",
      "JavaScript"
    ]
  },
  {
    "id": "res-10",
    "category": "Backend",
    "title": "Node.js Learning Path & Docs",
    "url": "https://nodejs.org/en/learn",
    "description": "Official educational resources for Node.js event-driven runtime, non-blocking I/O, streams, and module systems.",
    "tags": [
      "Node.js",
      "Backend",
      "JavaScript",
      "Server"
    ]
  },
  {
    "id": "res-11",
    "category": "Machine Learning",
    "title": "Scikit-Learn User Guide",
    "url": "https://scikit-learn.org/stable/user_guide.html",
    "description": "The definitive user guide and API reference for classical machine learning algorithms, preprocessing, pipelines, and evaluation metrics.",
    "tags": [
      "Machine Learning",
      "Scikit-Learn",
      "Python",
      "Data Science"
    ]
  },
  {
    "id": "res-12",
    "category": "Deep Learning",
    "title": "PyTorch Official Tutorials",
    "url": "https://pytorch.org/tutorials/",
    "description": "Hands-on tutorials for building, training, and deploying deep neural networks with PyTorch tensors and autograd.",
    "tags": [
      "Deep Learning",
      "PyTorch",
      "Neural Networks",
      "AI"
    ]
  },
  {
    "id": "res-13",
    "category": "Backend / ML Serving",
    "title": "FastAPI Official Documentation",
    "url": "https://fastapi.tiangolo.com/",
    "description": "Modern, high-performance web framework for building APIs with Python 3.8+ based on standard Python type hints.",
    "tags": [
      "FastAPI",
      "Python",
      "API",
      "MLOps"
    ]
  },
  {
    "id": "res-14",
    "category": "AI / GenAI",
    "title": "Hugging Face Learn Hub",
    "url": "https://huggingface.co/learn",
    "description": "Curated educational courses covering NLP, Computer Vision, Transformers, Diffusion Models, and LLM fine-tuning.",
    "tags": [
      "Hugging Face",
      "Transformers",
      "GenAI",
      "NLP"
    ]
  },
  {
    "id": "res-15",
    "category": "Mathematics",
    "title": "Khan Academy - Statistics & Probability",
    "url": "https://www.khanacademy.org/math/statistics-probability",
    "description": "Intuitive video and interactive lesson series on probability distributions, hypothesis testing, Bayes' Theorem, and variance.",
    "tags": [
      "Math",
      "Statistics",
      "Probability",
      "Foundations"
    ]
  },
  {
    "id": "res-16",
    "category": "Interview Preparation",
    "title": "GeeksforGeeks CS Fundamentals",
    "url": "https://www.geeksforgeeks.org/",
    "description": "Extensive library of CS fundamentals articles covering Operating Systems, DBMS, Computer Networks, and OOP interview questions.",
    "tags": [
      "Interview Prep",
      "CS Fundamentals",
      "OS",
      "DBMS",
      "OOP"
    ]
  },
  {
    "id": "res-17",
    "category": "Internship Search",
    "title": "LinkedIn Jobs Portal",
    "url": "https://www.linkedin.com/jobs/",
    "description": "Primary professional networking and career board for discovering software engineer and AI/ML internship openings.",
    "tags": [
      "Internships",
      "Career",
      "Jobs",
      "Applications"
    ]
  },
  {
    "id": "res-18",
    "category": "Internship Search",
    "title": "Internshala Student Portal",
    "url": "https://internshala.com/",
    "description": "India's largest student internship platform offering startup and mid-size company internships across SDE and Python/ML domains.",
    "tags": [
      "Internships",
      "India",
      "Startups",
      "Applications"
    ]
  },
  {
    "id": "res-19",
    "category": "Internship Search",
    "title": "AICTE Internship Portal",
    "url": "https://internship.aicte-india.org/",
    "description": "Official government internship platform connecting engineering students to verified public and private corporate opportunities.",
    "tags": [
      "Internships",
      "AICTE",
      "Government",
      "Verified"
    ]
  }
];
