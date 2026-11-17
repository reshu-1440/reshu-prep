// SDE Track Curriculum & Placement Management Portal Architecture Specifications
const initialSdeCurriculum = {
  "frontend": [
    {
      "id": "fe-01",
      "name": "HTML5 Semantic Structure & Accessibility (ARIA, semantic tags)",
      "status": "not_started"
    },
    {
      "id": "fe-02",
      "name": "CSS3 Flexbox, Grid, Custom Properties & Responsive Media Queries",
      "status": "not_started"
    },
    {
      "id": "fe-03",
      "name": "JavaScript ES6+ (Scope, Closures, Hoisting, Prototypes, Array methods)",
      "status": "not_started"
    },
    {
      "id": "fe-04",
      "name": "Asynchronous JS (Event Loop, Callbacks, Promises, async/await, Fetch API)",
      "status": "not_started"
    },
    {
      "id": "fe-05",
      "name": "React Core (JSX, Components, Props vs State, Reconciliation, Virtual DOM)",
      "status": "not_started"
    },
    {
      "id": "fe-06",
      "name": "React Hooks (useState, useEffect, useRef, useMemo, useCallback, Custom Hooks)",
      "status": "not_started"
    },
    {
      "id": "fe-07",
      "name": "State Management & Client Routing (React Router v6, Context API)",
      "status": "not_started"
    },
    {
      "id": "fe-08",
      "name": "API Integration, Loading states, Error Boundaries & Optimistic UI",
      "status": "not_started"
    }
  ],
  "backend": [
    {
      "id": "be-01",
      "name": "Node.js Architecture (V8 Engine, Event Loop, Libuv, Non-blocking I/O)",
      "status": "not_started"
    },
    {
      "id": "be-02",
      "name": "Express.js REST API Design, Routing, Controllers & MVC Architecture",
      "status": "not_started"
    },
    {
      "id": "be-03",
      "name": "Middleware Pipeline (Built-in, Custom, Morgan Logging, CORS, Error Handlers)",
      "status": "not_started"
    },
    {
      "id": "be-04",
      "name": "Authentication & Authorization (bcrypt password hashing, JWT Access & Refresh Tokens)",
      "status": "not_started"
    },
    {
      "id": "be-05",
      "name": "Input Validation & Sanitization (Joi / Zod schema validation)",
      "status": "not_started"
    },
    {
      "id": "be-06",
      "name": "API Security Best Practices (Helmet headers, Rate limiting, CORS configuration)",
      "status": "not_started"
    },
    {
      "id": "be-07",
      "name": "Automated Testing for APIs (Jest / Supertest integration testing)",
      "status": "not_started"
    }
  ],
  "database": [
    {
      "id": "db-01",
      "name": "Relational Modeling, Primary Keys, Foreign Keys & Referential Integrity",
      "status": "not_started"
    },
    {
      "id": "db-02",
      "name": "SQL DDL & DML (SELECT, WHERE, ORDER BY, GROUP BY, HAVING, Subqueries)",
      "status": "not_started"
    },
    {
      "id": "db-03",
      "name": "SQL Joins (INNER, LEFT, RIGHT, FULL OUTER, CROSS JOINs)",
      "status": "not_started"
    },
    {
      "id": "db-04",
      "name": "Database Normalization (1NF, 2NF, 3NF, BCNF) & Eliminating Redundancy",
      "status": "not_started"
    },
    {
      "id": "db-05",
      "name": "PostgreSQL Setup, Connection Pooling (pg / Prisma / pg-promise)",
      "status": "not_started"
    },
    {
      "id": "db-06",
      "name": "Indexes (B-Tree, Hash), Query Execution Plans (EXPLAIN ANALYZE) & Optimization",
      "status": "not_started"
    },
    {
      "id": "db-07",
      "name": "ACID Properties, Transactions (BEGIN, COMMIT, ROLLBACK) & Isolation Levels",
      "status": "not_started"
    }
  ],
  "tools": [
    {
      "id": "tl-01",
      "name": "Git CLI Mastery (feature branching, rebase, cherry-pick, conflict resolution)",
      "status": "not_started"
    },
    {
      "id": "tl-02",
      "name": "Postman API Testing (Environments, automated test scripts, collection runners)",
      "status": "not_started"
    },
    {
      "id": "tl-03",
      "name": "Environment Variables & Configuration (.env, dotenv, secure secret handling)",
      "status": "not_started"
    },
    {
      "id": "tl-04",
      "name": "Production Deployment (Vercel / Render / Supabase / PostgreSQL cloud hosting)",
      "status": "not_started"
    }
  ]
};
const initialPlacementPortalSpec = {
  "title": "Placement Management Portal (Full-Stack Capstone)",
  "description": "An enterprise-grade campus placement automation portal connecting students, placement coordinators (admins), and visiting companies with automated eligibility screening, interview scheduling, and application lifecycle tracking.",
  "techStack": {
    "frontend": "React, Tailwind CSS / Vanilla CSS, React Router",
    "backend": "Node.js, Express.js",
    "database": "PostgreSQL (Relational)",
    "auth": "JWT (Access + HTTP-only Refresh tokens), bcrypt",
    "tools": "Postman, Git, Render / Supabase"
  },
  "architecture": [
    "Client Layer: Single Page React App communicating via HTTPS REST API with JWT bearer tokens",
    "Application Layer: Stateless Node/Express server with layered architecture: Router -> Controller -> Service -> Repository",
    "Database Layer: PostgreSQL relational database with indexed foreign keys, constraints, and ACID transactions",
    "Security Layer: Role-Based Access Control (RBAC: Student vs Admin vs Recruiter), Helmet security headers, Express-Rate-Limit"
  ],
  "databaseSchema": [
    "users (id UUID PK, email VARCHAR UNIQUE, password_hash VARCHAR, role VARCHAR ['student', 'admin', 'recruiter'], created_at TIMESTAMP)",
    "student_profiles (id UUID PK, user_id UUID FK users, full_name VARCHAR, roll_no VARCHAR UNIQUE, branch VARCHAR, cgpa NUMERIC(4,2), active_backlogs INT, resume_url VARCHAR, github_url VARCHAR, linkedin_url VARCHAR)",
    "companies (id UUID PK, user_id UUID FK users, company_name VARCHAR, website VARCHAR, description TEXT, contact_email VARCHAR)",
    "jobs (id UUID PK, company_id UUID FK companies, title VARCHAR, description TEXT, min_cgpa NUMERIC(4,2), allowed_branches TEXT[], max_backlogs INT, stipend VARCHAR, location VARCHAR, deadline TIMESTAMP, status VARCHAR ['open', 'closed'])",
    "applications (id UUID PK, job_id UUID FK jobs, student_id UUID FK student_profiles, status VARCHAR ['applied', 'shortlisted', 'assessment', 'interview', 'selected', 'rejected'], applied_at TIMESTAMP, feedback TEXT, UNIQUE(job_id, student_id))",
    "interview_rounds (id UUID PK, application_id UUID FK applications, round_number INT, round_type VARCHAR ['OA', 'Technical', 'HR'], scheduled_at TIMESTAMP, meeting_link VARCHAR, notes TEXT, status VARCHAR ['scheduled', 'completed', 'cancelled'])"
  ],
  "apiEndpoints": [
    {
      "method": "POST",
      "path": "/api/v1/auth/register",
      "desc": "Register user (student/recruiter/admin) with email verification"
    },
    {
      "method": "POST",
      "path": "/api/v1/auth/login",
      "desc": "Authenticate user, verify bcrypt hash, return JWT access token & set refresh cookie"
    },
    {
      "method": "GET",
      "path": "/api/v1/students/profile",
      "desc": "Get authenticated student profile and resume details (Student only)"
    },
    {
      "method": "PUT",
      "path": "/api/v1/students/profile",
      "desc": "Update student CGPA, backlogs, branch, skills, and links (Validated)"
    },
    {
      "method": "GET",
      "path": "/api/v1/jobs",
      "desc": "Get all job listings with search, branch filter, and pagination"
    },
    {
      "method": "POST",
      "path": "/api/v1/jobs",
      "desc": "Create a new job posting with eligibility requirements (Admin/Recruiter only)"
    },
    {
      "method": "POST",
      "path": "/api/v1/jobs/:id/apply",
      "desc": "Apply for job; automated backend eligibility engine checks CGPA, branch, backlogs"
    },
    {
      "method": "GET",
      "path": "/api/v1/applications/my",
      "desc": "Get authenticated student's active application statuses"
    },
    {
      "method": "PATCH",
      "path": "/api/v1/applications/:id/status",
      "desc": "Update application status (Admin/Recruiter only)"
    },
    {
      "method": "GET",
      "path": "/api/v1/admin/analytics",
      "desc": "Placement statistics: Total placed %, average package, company counts"
    }
  ],
  "milestones": [
    {
      "id": "m1",
      "title": "Milestone 1: Architecture, ER Diagram & PostgreSQL Schema Setup",
      "week": 11,
      "status": "not_started"
    },
    {
      "id": "m2",
      "title": "Milestone 2: Node/Express Scaffolding & JWT Authentication Pipeline",
      "week": 12,
      "status": "not_started"
    },
    {
      "id": "m3",
      "title": "Milestone 3: Student Profile & Company Management CRUD APIs",
      "week": 13,
      "status": "not_started"
    },
    {
      "id": "m4",
      "title": "Milestone 4: Job Posting & Automated Eligibility Engine",
      "week": 14,
      "status": "not_started"
    },
    {
      "id": "m5",
      "title": "Milestone 5: Application Tracking & Status Transition Workflow",
      "week": 15,
      "status": "not_started"
    },
    {
      "id": "m6",
      "title": "Milestone 6: React Frontend: Auth, Student Portal & Job Listings",
      "week": 16,
      "status": "not_started"
    },
    {
      "id": "m7",
      "title": "Milestone 7: Admin Dashboard, Search/Filters & Analytics View",
      "week": 17,
      "status": "not_started"
    },
    {
      "id": "m8",
      "title": "Milestone 8: API Integration Tests, Error Handling & Production Deployment",
      "week": 20,
      "status": "not_started"
    }
  ]
};
