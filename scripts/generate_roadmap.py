"""
Generates the complete 26-Week Roadmap (182 Days, Nov 17 2026 - May 17 2027)
with actionable tasks, definition of done, learning resources, rubrics, and communication drills.
"""

import json
import datetime
import os
import sys

# Ensure local scripts dir in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    from generate_base_data import dsa_problems
except Exception:
    dsa_problems = []

try:
    from topic_content import TOPIC_CONTENT
except Exception:
    TOPIC_CONTENT = {}

start_date = datetime.date(2026, 11, 17)

# Metadata definitions for each week
week_blueprints = [
    # MONTH 1
    {
        "week": 1,
        "month": 1,
        "title": "Week 1: Algorithmic Complexity, Memory Layout & Independent Coding Baseline",
        "theme": "Month 1: Programming Foundations & DSA Reconstruction",
        "objectives": [
            "Deconstruct Big-O time and space complexity with formal mathematical justifications",
            "Establish an independent programming baseline without AI code generation assistance",
            "Implement fundamental array operations (reversal, rotation, duplicate search) from scratch",
            "Conduct technical audit of previous projects and set up Git repository structure"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Array Reversal and Binary Search in C++ from memory without AI, and derive the exact time and space complexity on paper.",
        "interviewQuestion": "Explain the difference between time complexity and actual execution time in milliseconds. How does cache locality affect array traversal?",
        "remedialAction": "If score < 70, spend 2 additional days practicing loop invariant analysis and tracing memory pointers before moving to two-pointer patterns.",
        "dayFocus": [
            ("Time Complexity & Big-O Loop Invariants", "DSA & Complexity", "dsa"),
            ("Space Complexity, Call Stacks & Auxiliary Memory", "Memory Analysis", "dsa"),
            ("Array Reversal, Rotation & In-Place Swaps", "Independent Coding", "dsa"),
            ("C++ STL Vector Internals & Memory Growth Factors", "C++ Deep Dive", "sde"),
            ("Finding Duplicates & Frequency Counting Without Extra Libraries", "Hashing Basics", "dsa"),
            ("Python Revision: Comprehensions, Dunder Methods & Virtual Environments", "Python Foundations", "aiml"),
            ("Weekly Evaluation 1 & Technical Portfolio Audit Setup", "Audit & Review", "project")
        ]
    },
    {
        "week": 2,
        "month": 1,
        "title": "Week 2: Array Optimization Patterns, Kadane's Algorithm & C++ OOP",
        "theme": "Month 1: Programming Foundations & DSA Reconstruction",
        "objectives": [
            "Transition from brute-force O(N^2) array algorithms to linear O(N) optimized solutions",
            "Master Kadane's algorithm for maximum subarray and understand its dynamic programming intuition",
            "Learn Prefix and Postfix running product calculation without division",
            "Revise Object-Oriented Programming (Classes, Encapsulation, Constructors, Destructors in C++)"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Maximum Subarray independently. First write the O(N^2) brute force, then optimize to Kadane's O(N) with O(1) space, explaining the decision boundary at each index.",
        "interviewQuestion": "Why does Kadane's algorithm discard negative running sums? How does it handle an array containing solely negative numbers?",
        "remedialAction": "If score < 70, repeat array prefix sum calculation drills and re-derive Kadane's algorithm on paper.",
        "dayFocus": [
            ("Brute-Force vs Optimized Array Traversal", "Array Techniques", "dsa"),
            ("Kadane's Algorithm: Maximum Subarray Optimization", "DSA Optimization", "dsa"),
            ("Prefix Sums & Running Products Without Division", "Prefix Sums", "dsa"),
            ("C++ OOP: Constructors, Deep Copy & Encapsulation", "CS Fundamentals: OOP", "sde"),
            ("C++ Inheritance & Polymorphism: Virtual Functions & VTables", "CS Fundamentals: OOP", "sde"),
            ("Mathematics for ML: Vector Spaces, Norms (L1/L2) & Dot Products", "Math for ML", "aiml"),
            ("Weekly Evaluation 2 & AI Dependency Log Audit", "Assessment & Review", "dsa")
        ]
    },
    {
        "week": 3,
        "month": 1,
        "title": "Week 3: Strings, Hash Maps, Frequency Counting & Git Workflow",
        "theme": "Month 1: Programming Foundations & DSA Reconstruction",
        "objectives": [
            "Master string manipulation, immutability, ASCII encoding, and two-pointer palindrome verification",
            "Understand Hash Map internals: hashing functions, collision resolution (Chaining vs Open Addressing), and load factors",
            "Solve Valid Anagram and Longest Common Prefix without AI assistance",
            "Master Git branching, commits, pull requests, and merge conflict resolution"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement a 26-element integer frequency array in C++ to verify if two strings are anagrams in O(N) time and O(1) auxiliary space.",
        "interviewQuestion": "How does a hash map achieve O(1) average lookup time? What causes worst-case O(N) lookup time, and how does modern C++ std::unordered_map or Java HashMap mitigate this?",
        "remedialAction": "If score < 70, write custom hash functions for strings and practice manual character arithmetic.",
        "dayFocus": [
            ("String Manipulation & In-Place Palindrome Check", "Strings", "dsa"),
            ("Hash Tables: Buckets, Collisions & Load Factors", "Hashing Internals", "dsa"),
            ("Valid Anagram & Group Anagrams Frequency Maps", "DSA Practice", "dsa"),
            ("Longest Common Prefix & Horizontal Scanning", "String Patterns", "dsa"),
            ("Git CLI Mastery: Branching, Rebasing & Resolving Merge Conflicts", "Developer Tools", "sde"),
            ("NumPy Vectorization: Array Operations, Broadcasting & Strides", "NumPy & Data", "aiml"),
            ("Weekly Evaluation 3 & Spaced Revision Check", "Evaluation", "dsa")
        ]
    },
    {
        "week": 4,
        "month": 1,
        "title": "Week 4: Two Pointers, Sliding Window & Exploratory Data Analysis",
        "theme": "Month 1: Programming Foundations & DSA Reconstruction",
        "objectives": [
            "Master Two-Pointer patterns (opposite ends vs slow-fast pointers) on sorted arrays",
            "Solve Two Sum II, 3Sum, and Container With Most Water independently",
            "Master Fixed-size and Variable-size Sliding Window patterns",
            "Build an Exploratory Data Analysis (EDA) notebook with Pandas and Seaborn"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Longest Substring Without Repeating Characters using the sliding window pattern with an index hash map in O(N) time.",
        "interviewQuestion": "Why does the two-pointer approach work for Container With Most Water? Why is it mathematically safe to move the shorter pointer inwards?",
        "remedialAction": "If score < 70, visualize the window boundaries (left and right) on paper with 3 distinct test cases.",
        "dayFocus": [
            ("Opposite-End Two Pointers: Two Sum II", "Two Pointers", "dsa"),
            ("3Sum: Sorting + Two Pointers with Deduplication", "Two Pointers", "dsa"),
            ("Container With Most Water: Greedy Shrinking Bounds", "Two Pointers", "dsa"),
            ("Fixed-Size Sliding Window: Maximum Average Subarray", "Sliding Window", "dsa"),
            ("Variable-Size Sliding Window: Longest Substring Without Repeating", "Sliding Window", "dsa"),
            ("Pandas & Seaborn: Real Estate / Titanic EDA Notebook", "Data Preprocessing", "aiml"),
            ("Weekly Evaluation 4 & Mock Interview Communication Check", "Evaluation", "comm")
        ]
    },
    {
        "week": 5,
        "month": 1,
        "title": "Week 5: Binary Search Foundations, Rotated Arrays & Month 1 Review",
        "theme": "Month 1: Programming Foundations & DSA Reconstruction",
        "objectives": [
            "Master Binary Search boundary invariants (low <= high vs low < high) to eliminate off-by-one errors",
            "Solve Search Insert Position and Find First/Last Position in Sorted Array",
            "Crack Search in Rotated Sorted Array by identifying the sorted half",
            "Complete Month 1 technical audit: 25+ independent DSA problems solved, 1 project shortlisted for rebuild"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Search in Rotated Sorted Array in C++ without helper functions. Identify which half is monotonically sorted at each step.",
        "interviewQuestion": "How do you calculate mid = low + (high - low) / 2 and why does this prevent integer overflow in C++ and Java?",
        "remedialAction": "If score < 70, trace binary search on arrays of length 1, 2, and 3 manually to verify loop termination conditions.",
        "dayFocus": [
            ("Binary Search Template & Boundary Invariants", "Binary Search", "dsa"),
            ("Lower Bound & Upper Bound: Search Insert Position", "Binary Search", "dsa"),
            ("First & Last Occurrence in Sorted Array", "Binary Search", "dsa"),
            ("Search in Rotated Sorted Array: Monotonic Half Logic", "Binary Search", "dsa"),
            ("Linear Algebra for ML: Matrix Multiplication & Inverses", "Math for ML", "aiml"),
            ("Month 1 Comprehensive DSA Review & Spaced Repetition Queue", "Revision", "dsa"),
            ("Weekly Evaluation 5 & Technical Project Shortlist Milestone", "Milestone", "project")
        ]
    },

    # MONTH 2
    {
        "week": 6,
        "month": 2,
        "title": "Week 6: Recursion Trees, Call Stacks & Backtracking Patterns",
        "theme": "Month 2: Intermediate DSA & Computer Science Foundations",
        "objectives": [
            "Visualize recursion call stacks, base cases, and return values without confusion",
            "Master Backtracking: Pick vs Don't Pick state-space tree traversal",
            "Solve Subsets, Combination Sum, and Permutations independently",
            "Learn Probability distributions and Bayes' Theorem for Machine Learning"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Write the complete recursion tree for Combination Sum on paper and implement the backtracking solution in C++.",
        "interviewQuestion": "What is the difference between subsets (combinations) and permutations in terms of search-space size and visited tracking?",
        "remedialAction": "If score < 70, draw the recursion tree by hand showing exact parameter values on each stack frame before writing code.",
        "dayFocus": [
            ("Recursion Call Stack & Memory Overhead", "Recursion", "dsa"),
            ("Subsets Pattern: Pick / Don't Pick Decision Tree", "Backtracking", "dsa"),
            ("Combination Sum: Unbounded Element Selection", "Backtracking", "dsa"),
            ("Permutations: In-Place Swapping & Visited Arrays", "Backtracking", "dsa"),
            ("Word Search: 2D Grid DFS Backtracking", "Backtracking", "dsa"),
            ("Probability Foundations: Conditional Probability & Bayes' Theorem", "Math for ML", "aiml"),
            ("Weekly Evaluation 6 & Technical Communication Drill", "Evaluation", "comm")
        ]
    },
    {
        "week": 7,
        "month": 2,
        "title": "Week 7: Linked Lists (Pointers, Cycles, Reversals) & Relational DBMS",
        "theme": "Month 2: Intermediate DSA & Computer Science Foundations",
        "objectives": [
            "Master pointer manipulation in Singly and Doubly Linked Lists",
            "Implement iterative Reverse Linked List with 3 pointers (prev, curr, next)",
            "Master Floyd's Cycle Detection Algorithm (Tortoise and Hare) and mathematical proof",
            "Learn Relational Database Management Systems (RDBMS), Primary/Foreign Keys, and SQL DDL"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Floyd's Tortoise and Hare algorithm to detect a cycle in a linked list, and mathematically explain why they meet at distance 2k.",
        "interviewQuestion": "Why does reversing a linked list in-place take O(1) space, and what is the common dangling pointer pitfall?",
        "remedialAction": "If score < 70, use physical cards or pencil diagrams to trace node pointer reassignment step-by-step.",
        "dayFocus": [
            ("Linked List Nodes, Pointers & Dummy Head Technique", "Linked Lists", "dsa"),
            ("In-Place Linked List Reversal (Iterative & Recursive)", "Linked Lists", "dsa"),
            ("Floyd's Cycle Detection & Cycle Start Point", "Linked Lists", "dsa"),
            ("Remove Nth Node From End of List & Middle Node", "Linked Lists", "dsa"),
            ("RDBMS Fundamentals: Schema, Keys, Integrity Constraints", "CS Fundamentals: DBMS", "sde"),
            ("SQL DDL & Basic Queries: SELECT, WHERE, ORDER BY", "SQL Practice", "sde"),
            ("Weekly Evaluation 7 & Linked List Revision", "Evaluation", "dsa")
        ]
    },
    {
        "week": 8,
        "month": 2,
        "title": "Week 8: Stacks, Monotonic Stacks, Queues & Advanced SQL",
        "theme": "Month 2: Intermediate DSA & Computer Science Foundations",
        "objectives": [
            "Understand LIFO Stack and FIFO Queue data structures and their memory implementations",
            "Master the Monotonic Stack pattern for Next Greater Element and Daily Temperatures",
            "Implement Min Stack with O(1) time complexity for push, pop, top, and getMin",
            "Master SQL Joins (INNER, LEFT, RIGHT, FULL), GROUP BY, HAVING, and Normalization (1NF to 3NF)"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Daily Temperatures using a monotonic decreasing stack in O(N) time and explain why elements are popped.",
        "interviewQuestion": "Explain the difference between WHERE and HAVING in SQL. Can aggregate functions be used inside a WHERE clause?",
        "remedialAction": "If score < 70, write out the stack state at each index for array [73, 74, 75, 71, 69, 72, 76, 73].",
        "dayFocus": [
            ("Stack Basics & Valid Parentheses", "Stacks", "dsa"),
            ("Min Stack Implementation with O(1) Retrieval", "Stacks", "dsa"),
            ("Monotonic Decreasing Stack: Daily Temperatures", "Monotonic Stacks", "dsa"),
            ("Next Greater Element I & Implement Queue Using Stacks", "Stacks & Queues", "dsa"),
            ("SQL Joins Mastery: INNER, LEFT, RIGHT & FULL OUTER", "DBMS & SQL", "sde"),
            ("SQL Aggregations: GROUP BY, HAVING & Normalization", "DBMS & SQL", "sde"),
            ("Weekly Evaluation 8 & SQL Assessment", "Evaluation", "sde")
        ]
    },
    {
        "week": 9,
        "month": 2,
        "title": "Week 9: Binary Search on Answer, Operating Systems & Supervised ML",
        "theme": "Month 2: Intermediate DSA & Computer Science Foundations",
        "objectives": [
            "Master Binary Search on Answer Space with monotonicity predicate (Koko Eating Bananas)",
            "Learn Core Operating Systems: Process vs Thread, Context Switching, CPU Scheduling & Deadlocks",
            "Learn Supervised Machine Learning: Linear Regression, Logistic Regression, Loss Functions",
            "Draft Resume Version 1 and initiate internship market research"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Koko Eating Bananas by defining the feasible speed range [1, max(piles)] and writing the helper predicate function.",
        "interviewQuestion": "What is the difference between a process and a thread? Explain virtual memory and page faults.",
        "remedialAction": "If score < 70, re-examine the monotonic property of the check() function in binary search on answer problems.",
        "dayFocus": [
            ("Binary Search on Answer Space: Koko Eating Bananas", "Binary Search", "dsa"),
            ("Capacity to Ship Packages Within D Days", "Binary Search", "dsa"),
            ("Operating Systems: Process vs Thread, Context Switching", "CS Fundamentals: OS", "sde"),
            ("OS: CPU Scheduling Algorithms & Deadlock Necessary Conditions", "CS Fundamentals: OS", "sde"),
            ("Machine Learning: Linear & Logistic Regression with Scikit-Learn", "Supervised ML", "aiml"),
            ("Resume Version 1 Drafting & Technical Profile Audit", "Career Strategy", "project"),
            ("Weekly Evaluation 9 & Month 2 Milestone Review", "Milestone", "dsa")
        ]
    },

    # MONTH 3
    {
        "week": 10,
        "month": 3,
        "title": "Week 10: Binary Trees, Tree Traversals & Client-Server Architecture",
        "theme": "Month 3: Advanced DSA & Full-Stack SDE Development",
        "objectives": [
            "Master Binary Tree structures, recursive traversals (Inorder, Preorder, Postorder), and Breadth-First Search (BFS)",
            "Solve Maximum Depth, Invert Tree, Diameter of Binary Tree, and Level Order Traversal",
            "Understand Client-Server Architecture, HTTP protocol, REST API conventions, and Node.js setup",
            "Train and evaluate your first supervised ML classification model with Scikit-Learn"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Level Order Traversal using a BFS queue, keeping track of nodes level-by-level in O(N) time.",
        "interviewQuestion": "Why does tree diameter calculation require returning the height from each subtree while updating a global max diameter variable?",
        "remedialAction": "If score < 70, practice dry-running recursive post-order tree traversals on small trees of 4-5 nodes.",
        "dayFocus": [
            ("Binary Tree Anatomy & Recursive Traversals", "Binary Trees", "dsa"),
            ("Maximum Depth & Invert Binary Tree", "Binary Trees", "dsa"),
            ("Diameter of Binary Tree & Balanced Tree Check", "Binary Trees", "dsa"),
            ("Level Order Traversal: BFS Queue Pattern", "Binary Trees", "dsa"),
            ("HTTP Basics, RESTful Architecture & Status Codes", "SDE Foundations", "sde"),
            ("Node.js Architecture: Event Loop & Express Scaffolding", "Backend SDE", "sde"),
            ("Weekly Evaluation 10 & Tree Traversal Viva", "Evaluation", "dsa")
        ]
    },
    {
        "week": 11,
        "month": 3,
        "title": "Week 11: Binary Search Trees (BST), PostgreSQL Integration & CRUD APIs",
        "theme": "Month 3: Advanced DSA & Full-Stack SDE Development",
        "objectives": [
            "Master Binary Search Tree (BST) invariant: left < root < right",
            "Solve Validate BST, Lowest Common Ancestor (LCA), and Kth Smallest Element in BST",
            "Set up PostgreSQL relational database and connect to Express.js backend",
            "Implement RESTful CRUD APIs with input validation and error handling"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Validate Binary Search Tree using bounded ranges (-infinity, +infinity) to verify BST correctness.",
        "interviewQuestion": "Why is an in-order traversal of a valid BST always sorted in ascending order? How does LCA in a BST differ from a standard binary tree?",
        "remedialAction": "If score < 70, practice inserting nodes into a BST on paper and observing range narrowing.",
        "dayFocus": [
            ("BST Properties & Lowest Common Ancestor", "BST", "dsa"),
            ("Validate Binary Search Tree with Min/Max Bounds", "BST", "dsa"),
            ("Kth Smallest Element in BST via In-Order Traversal", "BST", "dsa"),
            ("PostgreSQL Setup & Connection Pooling in Node.js", "Backend & DB", "sde"),
            ("REST API Design: CRUD Endpoints with Express Router", "Backend SDE", "sde"),
            ("Capstone 1 Kickoff: Placement Portal ER Diagram & Schema DDL", "SDE Project", "project"),
            ("Weekly Evaluation 11 & API Postman Testing", "Evaluation", "sde")
        ]
    },
    {
        "week": 12,
        "month": 3,
        "title": "Week 12: Heaps, Priority Queues, Authentication & JWT Security",
        "theme": "Month 3: Advanced DSA & Full-Stack SDE Development",
        "objectives": [
            "Master Heap data structures (Min-Heap, Max-Heap, heapify, insert, extract)",
            "Solve Kth Largest Element and Top K Frequent Elements using Priority Queues",
            "Master Web Security & Authentication: Password hashing with bcrypt, JSON Web Tokens (JWT)",
            "Implement Role-Based Access Control (RBAC) middleware for Student vs Admin"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Top K Frequent Elements using a Min-Heap of size K in O(N log K) time.",
        "interviewQuestion": "Why should passwords never be stored raw in a database? Explain the purpose of a salt and how bcrypt defends against rainbow tables.",
        "remedialAction": "If score < 70, review heap array representations (parent = (i-1)/2, children = 2i+1, 2i+2).",
        "dayFocus": [
            ("Heap Structure & Priority Queue STL Operations", "Heaps", "dsa"),
            ("Kth Largest Element in an Array (Heap vs QuickSelect)", "Heaps", "dsa"),
            ("Top K Frequent Elements (Min-Heap & Bucket Sort)", "Heaps", "dsa"),
            ("Authentication: Bcrypt Password Hashing & Salt Rounds", "SDE Security", "sde"),
            ("JWT Architecture: Access & Refresh Tokens, Verification Middleware", "SDE Auth", "sde"),
            ("Placement Portal: User Registration & Login Endpoints", "SDE Project", "project"),
            ("Weekly Evaluation 12 & Auth Security Testing", "Evaluation", "sde")
        ]
    },
    {
        "week": 13,
        "month": 3,
        "title": "Week 13: Graph Fundamentals (BFS, DFS, Islands) & Portal Core APIs",
        "theme": "Month 3: Advanced DSA & Full-Stack SDE Development",
        "objectives": [
            "Master Graph representations: Adjacency List vs Adjacency Matrix",
            "Implement Breadth-First Search (BFS) and Depth-First Search (DFS) for graphs",
            "Solve Number of Islands, Max Area of Island, and Clone Graph",
            "Build Placement Portal student profile and company management endpoints"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Number of Islands using 2D grid DFS flood-fill in O(M*N) time, correctly marking visited land cells.",
        "interviewQuestion": "Compare BFS and DFS in terms of memory requirements, shortest-path guarantees, and recursive stack risk.",
        "remedialAction": "If score < 70, draw a 4x5 grid and manually trace the visited matrix during DFS execution.",
        "dayFocus": [
            ("Graph Representations & Adjacency Lists", "Graphs", "dsa"),
            ("Number of Islands: 2D Grid DFS Flood-Fill", "Graphs", "dsa"),
            ("Max Area of Island: Component Size Accumulation", "Graphs", "dsa"),
            ("Clone Graph: Node Copying with Visited Hash Map", "Graphs", "dsa"),
            ("Placement Portal: Student Profile CRUD & Academic Validation", "SDE Project", "project"),
            ("Unsupervised ML: K-Means Clustering & Silhouette Score", "Unsupervised ML", "aiml"),
            ("Weekly Evaluation 13 & Graph Traversal Viva", "Evaluation", "dsa")
        ]
    },
    {
        "week": 14,
        "month": 3,
        "title": "Week 14: Topological Sort, Dynamic Programming Intro & Tree Ensembles",
        "theme": "Month 3: Advanced DSA & Full-Stack SDE Development",
        "objectives": [
            "Master Topological Sorting (Kahn's BFS with indegrees & DFS with visited states)",
            "Solve Course Schedule (Cycle detection in directed graphs)",
            "Understand Dynamic Programming fundamentals: Overlapping subproblems & optimal substructure (Climbing Stairs, House Robber)",
            "Master Decision Trees, Random Forests, and ML Evaluation Metrics (Precision, Recall, F1, ROC-AUC)"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Course Schedule using Kahn's algorithm by tracking in-degrees and queueing nodes with zero incoming edges.",
        "interviewQuestion": "Why can topological sort only be performed on a Directed Acyclic Graph (DAG)? What does an incomplete topological ordering prove?",
        "remedialAction": "If score < 70, write the in-degree array explicitly for each vertex before pushing onto the queue.",
        "dayFocus": [
            ("Topological Sort: Kahn's Algorithm & Indegree Queue", "Graphs", "dsa"),
            ("Course Schedule: Cycle Detection in Directed Graphs", "Graphs", "dsa"),
            ("Dynamic Programming Intro: Memoization vs Tabulation", "Dynamic Programming", "dsa"),
            ("Climbing Stairs & House Robber 1D DP", "Dynamic Programming", "dsa"),
            ("Machine Learning: Decision Trees, Random Forests & Ensembles", "Ensemble ML", "aiml"),
            ("Model Evaluation: Precision, Recall, F1-Score & ROC-AUC", "Model Evaluation", "aiml"),
            ("Weekly Evaluation 14 & Month 3 Review (Start Applying!)", "Milestone", "career")
        ]
    },

    # MONTH 4
    {
        "week": 15,
        "month": 4,
        "title": "Week 15: Advanced Graphs (Dijkstra, BFS), Eligibility Engine & Preprocessing",
        "theme": "Month 4: Advanced AI/ML & Production Software Engineering",
        "objectives": [
            "Master Multi-Source BFS (Rotting Oranges) and reverse flood-fill (Pacific Atlantic Water Flow)",
            "Learn Dijkstra's Algorithm for Single Source Shortest Path with Priority Queue",
            "Build Placement Portal automated eligibility verification engine (CGPA, branch, backlog filters)",
            "Master Data Preprocessing: Handling missing values, scaling, encoding, and preventing data leakage"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Rotting Oranges using multi-source BFS to compute minimum minutes to rotten all fresh oranges.",
        "interviewQuestion": "Why does Dijkstra's algorithm fail on graphs with negative edge weights? What algorithm should be used instead?",
        "remedialAction": "If score < 70, trace multi-source BFS level-by-level using a queue initialized with all starting sources.",
        "dayFocus": [
            ("Multi-Source BFS: Rotting Oranges", "Graphs", "dsa"),
            ("Pacific Atlantic Water Flow: Reverse Reachability", "Graphs", "dsa"),
            ("Dijkstra's Algorithm: Shortest Path with Min-Heap", "Graphs", "dsa"),
            ("Placement Portal: Automated Eligibility Checking Engine", "SDE Project", "project"),
            ("Data Preprocessing: Imputation, Encoding & Leakage Prevention", "Data Engineering", "aiml"),
            ("Placement Portal: Job Application Lifecycle State Machine", "SDE Project", "project"),
            ("Weekly Evaluation 15 & System Architecture Review", "Evaluation", "sde")
        ]
    },
    {
        "week": 16,
        "month": 4,
        "title": "Week 16: Dynamic Programming (Coin Change, LIS) & Deep Learning Foundations",
        "theme": "Month 4: Advanced AI/ML & Production Software Engineering",
        "objectives": [
            "Master 1D and 2D Dynamic Programming patterns: Unbounded knapsack (Coin Change), Longest Increasing Subsequence, Unique Paths",
            "Connect React Frontend to Express Backend for Placement Portal",
            "Learn Deep Learning fundamentals: Artificial Neurons, Activations (ReLU, Sigmoid), Backpropagation",
            "Build a pure NumPy Multi-Layer Perceptron (MLP) from scratch"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement Coin Change in C++ using 1D DP array of size (amount + 1), initialized with infinity.",
        "interviewQuestion": "Why does Longest Increasing Subsequence have both an O(N^2) DP solution and an O(N log N) patience sorting solution?",
        "remedialAction": "If score < 70, write the DP state recurrence relation explicitly: dp[i] = min(dp[i], dp[i - coin] + 1).",
        "dayFocus": [
            ("Coin Change: Unbounded Knapsack DP", "Dynamic Programming", "dsa"),
            ("Longest Increasing Subsequence (DP & Binary Search)", "Dynamic Programming", "dsa"),
            ("Unique Paths & Partition Equal Subset Sum", "Dynamic Programming", "dsa"),
            ("React Frontend: Student Dashboard & Job Listings UI", "SDE Frontend", "sde"),
            ("Deep Learning Foundations: Perceptrons, Activations & Loss Functions", "Deep Learning", "aiml"),
            ("NumPy MLP From Scratch: Forward & Backward Propagation", "Deep Learning", "aiml"),
            ("Weekly Evaluation 16 & Deep Learning Code Review", "Evaluation", "aiml")
        ]
    },
    {
        "week": 17,
        "month": 4,
        "title": "Week 17: Greedy Intervals, PyTorch Essentials & ML Capstone Baseline",
        "theme": "Month 4: Advanced AI/ML & Production Software Engineering",
        "objectives": [
            "Master Greedy interval scheduling: Merge Intervals, Non-overlapping Intervals, Jump Game",
            "Learn PyTorch fundamentals: Tensors, autograd, torch.nn.Module, and Dataset/DataLoader",
            "Select and initiate Capstone Project 2: End-to-End ML Prediction System",
            "Conduct thorough exploratory data analysis and establish baseline model performance"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Merge Intervals in O(N log N) time by sorting intervals by start time and merging overlapping spans.",
        "interviewQuestion": "Why do interval problems typically require sorting by start time or end time? When does sorting by end time produce an optimal greedy choice?",
        "remedialAction": "If score < 70, draw intervals as lines on a number line to visualize overlapping condition: cur.start <= prev.end.",
        "dayFocus": [
            ("Jump Game: Greedy Farthest Reach Boundary", "Greedy", "dsa"),
            ("Merge Intervals: In-Place Sorted Interval Consolidation", "Intervals", "dsa"),
            ("Non-overlapping Intervals: Optimal End-Time Greedy Elimination", "Intervals", "dsa"),
            ("PyTorch Fundamentals: Tensors, Autograd & nn.Module", "PyTorch", "aiml"),
            ("PyTorch Dataset, DataLoader & Custom Training Loop", "PyTorch", "aiml"),
            ("ML Capstone Kickoff: Real Dataset Ingestion & Baseline Model", "AI/ML Project", "project"),
            ("Weekly Evaluation 17 & Interval Code Walkthrough", "Evaluation", "dsa")
        ]
    },
    {
        "week": 18,
        "month": 4,
        "title": "Week 18: Generative AI, RAG, FastAPI Deployment & Month 4 Review",
        "theme": "Month 4: Advanced AI/ML & Production Software Engineering",
        "objectives": [
            "Solve Word Break and Task Scheduler independently",
            "Understand Generative AI, Embeddings, Vector Databases (ChromaDB), and RAG Architecture",
            "Deploy ML Capstone model as a production microservice with FastAPI and Pydantic validation",
            "Complete Month 4 audit: Placement Portal functional, ML microservice deployed, 75+ DSA solved"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Build a FastAPI POST /predict endpoint with Pydantic validation that loads a trained ML model on startup and returns predictions.",
        "interviewQuestion": "Explain how Retrieval-Augmented Generation (RAG) works. How do vector embeddings and cosine similarity enable semantic document search?",
        "remedialAction": "If score < 70, test your FastAPI endpoints using interactive Swagger docs (/docs) and inspect Pydantic schema errors.",
        "dayFocus": [
            ("Word Break: Prefix Reachability Dynamic Programming", "Dynamic Programming", "dsa"),
            ("Task Scheduler: Max-Heap & Idle Slot Calculation", "Heaps", "dsa"),
            ("Generative AI & Embeddings: Self-Attention & Transformers Intuition", "GenAI Foundations", "aiml"),
            ("RAG Architecture: Document Chunking, ChromaDB & Retrieval", "GenAI & RAG", "aiml"),
            ("FastAPI ML Serving: Pydantic Validation & Lifespan Handlers", "MLOps & APIs", "aiml"),
            ("ML Capstone Deployment & Model Evaluation Report Generation", "AI/ML Project", "project"),
            ("Weekly Evaluation 18 & Technical Interview Simulation 1", "Milestone", "career")
        ]
    },

    # MONTH 5
    {
        "week": 19,
        "month": 5,
        "title": "Week 19: Full DSA Revision 1 (Arrays, Window), OS Deep Dive & Active Applications",
        "theme": "Month 5: Interview Preparation & Internship Applications",
        "objectives": [
            "Execute timed revision of Arrays, Strings, Two Pointers, and Sliding Window patterns",
            "Deep revision of Operating Systems: Virtual Memory, Paging, Thrashing, Page Replacement",
            "Kick off active internship applications: 5-10 tailored applications per week via LinkedIn & Internshala",
            "Finalize Resume Version 2 with completed Capstone project bullets"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Timed 45-minute coding test: Solve 3Sum and Minimum Size Subarray Sum without hints or AI assistance.",
        "interviewQuestion": "Explain virtual memory, page tables, and Translation Lookaside Buffers (TLB). What causes thrashing in an operating system?",
        "remedialAction": "If score < 70, review timed mistake logs and practice writing clean code without an IDE autocomplete.",
        "dayFocus": [
            ("Timed Revision: Two Sum, Kadane, Product Except Self", "DSA Revision", "dsa"),
            ("Timed Revision: Longest Substring, 3Sum, Container Most Water", "DSA Revision", "dsa"),
            ("OS Interview Deep Dive: Virtual Memory, Paging & Segmentation", "CS Fundamentals: OS", "sde"),
            ("OS Interview Deep Dive: Synchronization, Mutex, Semaphores & Deadlocks", "CS Fundamentals: OS", "sde"),
            ("Resume Version 2 Polish & LinkedIn Profile Technical Optimization", "Career Strategy", "project"),
            ("Active Internship Applications: Submit 5-8 Curated Applications", "Applications", "career"),
            ("Weekly Evaluation 19 & Timed Coding Assessment", "Evaluation", "dsa")
        ]
    },
    {
        "week": 20,
        "month": 5,
        "title": "Week 20: Full DSA Revision 2 (Lists, Stacks), DBMS & Placement Portal Deployment",
        "theme": "Month 5: Interview Preparation & Internship Applications",
        "objectives": [
            "Execute timed revision of Linked Lists, Stacks, Queues, and Binary Search",
            "Solve LRU Cache implementation with Doubly Linked List and Hash Map",
            "Deep revision of DBMS: ACID Properties, Transaction Isolation Levels, B-Tree Indexes",
            "Deploy Placement Management Portal to Render/Vercel with Supabase PostgreSQL"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement LRU Cache with get() and put() in O(1) time using a doubly linked list and hash map.",
        "interviewQuestion": "Explain the 4 ACID properties in databases. What is a dirty read, non-repeatable read, and phantom read?",
        "remedialAction": "If score < 70, trace LRU cache node removals and head insertions on paper with capacity 2.",
        "dayFocus": [
            ("Timed Revision: Reorder List, Cycle Detection, Remove Nth Node", "DSA Revision", "dsa"),
            ("Timed Revision: Daily Temperatures, Min Stack, Koko Bananas", "DSA Revision", "dsa"),
            ("LRU Cache Implementation: Doubly Linked List + Hash Map", "DSA Mastery", "dsa"),
            ("DBMS Interview Deep Dive: ACID, Transactions & Isolation Levels", "CS Fundamentals: DBMS", "sde"),
            ("DBMS Interview Deep Dive: B-Tree Indexing & Query Execution Plans", "CS Fundamentals: DBMS", "sde"),
            ("Placement Portal Live Cloud Deployment & End-to-End Verification", "SDE Project", "project"),
            ("Weekly Evaluation 20 & Applications Pipeline Check", "Evaluation", "career")
        ]
    },
    {
        "week": 21,
        "month": 5,
        "title": "Week 21: Full DSA Revision 3 (Trees, BST, Heaps), Computer Networks & Mock 1",
        "theme": "Month 5: Interview Preparation & Internship Applications",
        "objectives": [
            "Execute timed revision of Binary Trees, BSTs, and Heaps (including Binary Tree Max Path Sum)",
            "Deep revision of Computer Networks: OSI model, TCP vs UDP, Three-way handshake, DNS, HTTPS",
            "Conduct Technical Mock Interview 1 (DSA + SDE Architecture)",
            "Maintain active internship application rhythm (8-10 applications/week)"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Binary Tree Maximum Path Sum in C++ with post-order traversal and global max tracking.",
        "interviewQuestion": "Explain what happens when you type https://google.com into your browser and press Enter (DNS, TCP, TLS, HTTP).",
        "remedialAction": "If score < 70, conduct remedial review of network protocol layers and tree post-order logic.",
        "dayFocus": [
            ("Timed Revision: Level Order, Diameter, Lowest Common Ancestor", "DSA Revision", "dsa"),
            ("Binary Tree Maximum Path Sum: Hard Tree Recursion", "DSA Mastery", "dsa"),
            ("Timed Revision: Kth Largest, Top K Frequent, Task Scheduler", "DSA Revision", "dsa"),
            ("Computer Networks: OSI 7-Layer Model, TCP vs UDP, Handshake", "CS Fundamentals: CN", "sde"),
            ("Computer Networks: DNS Resolution, HTTP 1.1 vs 2 vs 3, TLS Handshake", "CS Fundamentals: CN", "sde"),
            ("Technical Mock Interview 1: DSA + Systems Architecture Round", "Mock Interview", "career"),
            ("Weekly Evaluation 21 & Application Follow-Ups", "Evaluation", "career")
        ]
    },
    {
        "week": 22,
        "month": 5,
        "title": "Week 22: Full DSA Revision 4 (Graphs, DP), OOP Design & Capstone 3 (0% AI)",
        "theme": "Month 5: Interview Preparation & Internship Applications",
        "objectives": [
            "Execute timed revision of Graphs (Number of Islands, Course Schedule) and Dynamic Programming",
            "Deep revision of Object-Oriented Design: SOLID Principles and Design Patterns (Singleton, Factory, Observer)",
            "Kick off Capstone Project 3: 100% Independent In-Memory Key-Value Store with WAL (Zero AI code)",
            "Conduct Technical Mock Interview 2 (AI/ML & Python Foundations)"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Implement a thread-safe in-memory hash store in C++ or Python with append-only write-ahead log persistence from scratch.",
        "interviewQuestion": "Explain the SOLID principles with concrete code examples. What is the difference between composition and inheritance?",
        "remedialAction": "If score < 70, refactor a messy class into single-responsibility components and re-test.",
        "dayFocus": [
            ("Timed Revision: Rotting Oranges, Pacific Atlantic, Course Schedule", "DSA Revision", "dsa"),
            ("Timed Revision: Coin Change, LIS, Unique Paths, Word Break", "DSA Revision", "dsa"),
            ("Object-Oriented Design: SOLID Principles Deep Dive", "CS Fundamentals: OOP", "sde"),
            ("Software Design Patterns: Singleton, Factory, Strategy, Observer", "Design Patterns", "sde"),
            ("Capstone 3: In-Memory Key-Value Store Architecture & WAL Design", "Independent Project", "project"),
            ("Technical Mock Interview 2: Machine Learning & Python Deep Dive", "Mock Interview", "career"),
            ("Weekly Evaluation 22 & Month 5 Deliverables Audit", "Milestone", "career")
        ]
    },

    # MONTH 6
    {
        "week": 23,
        "month": 6,
        "title": "Week 23: High-Frequency Benchmark Problems & SDE Mock Interview Round 1",
        "theme": "Month 6: Final Internship Readiness & Interview Simulation",
        "objectives": [
            "Solve high-frequency interview benchmark problems under strict 40-minute timers",
            "Practice blank-page problem solving without IDE autocomplete or debugger support",
            "Simulate SDE Technical Interview Round 1: DSA + Live Coding + OOP / CS fundamentals",
            "Track active application interview callbacks, online assessments (OAs), and follow-ups"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve Median of Two Sorted Arrays or Trapping Rain Water in a blank text editor within 40 minutes.",
        "interviewQuestion": "Walk me through the end-to-end architecture of your Placement Management Portal. How does your backend handle concurrent job applications?",
        "remedialAction": "If score < 70, record your explanation on video, critique filler words and pauses, and redo the technical walkthrough.",
        "dayFocus": [
            ("High-Frequency Drill 1: Trapping Rain Water & 3Sum", "Timed DSA", "dsa"),
            ("High-Frequency Drill 2: Course Schedule II & Rotting Oranges", "Timed DSA", "dsa"),
            ("High-Frequency Drill 3: Median of Two Sorted Arrays", "Timed DSA", "dsa"),
            ("Capstone 3: WAL File Replay & Crash Recovery Verification", "Independent Project", "project"),
            ("SDE Simulated Mock Round 1: Live Coding & Time Complexity Defense", "Interview Sim", "career"),
            ("Online Assessment (OA) Practice: Hackerrank / Codeforces Contests", "OA Drills", "dsa"),
            ("Weekly Evaluation 23 & Application Pipeline Review", "Evaluation", "career")
        ]
    },
    {
        "week": 24,
        "month": 6,
        "title": "Week 24: AI/ML Mock Interview Round 1 & Behavioral (STAR) Rehearsal",
        "theme": "Month 6: Final Internship Readiness & Interview Simulation",
        "objectives": [
            "Simulate full AI/ML Technical Interview Round: Python, Math, Scikit-Learn, PyTorch, RAG",
            "Master Behavioral and HR interview questions using the STAR framework",
            "Prepare defensible answers for failure, conflict, technical challenges, and career motivation",
            "Continue active internship applications and recruiter outreach on LinkedIn"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Deliver a 5-minute technical defense of your ML Capstone project: dataset nuances, feature leakage prevention, metric selection, and FastAPI latency.",
        "interviewQuestion": "Tell me about a time when an algorithm or model failed to perform as expected. How did you diagnose the root cause and resolve it?",
        "remedialAction": "If score < 70, rewrite your STAR behavioral responses with specific metrics and demonstrable personal accountability.",
        "dayFocus": [
            ("Timed DSA Drill: Dynamic Programming Mix (House Robber II, Target Sum)", "Timed DSA", "dsa"),
            ("AI/ML Simulated Mock Round 1: Math, Scikit-Learn & PyTorch Defense", "Interview Sim", "career"),
            ("AI/ML Architecture Defense: RAG, Embeddings & Vector Databases", "AI/ML Defense", "aiml"),
            ("Behavioral Rehearsal: 'Tell Me About Yourself' & 'Why This Role?'", "Communication", "comm"),
            ("Behavioral Rehearsal: STAR Method for Difficult Bugs & Failures", "Communication", "comm"),
            ("Targeted Recruiter Outreach & College Placement Cell Follow-Ups", "Applications", "career"),
            ("Weekly Evaluation 24 & Behavioral Video Review", "Evaluation", "comm")
        ]
    },
    {
        "week": 25,
        "month": 6,
        "title": "Week 25: Error Log Elimination, Combined SDE+ML Mock & GitHub Audit",
        "theme": "Month 6: Final Internship Readiness & Interview Simulation",
        "objectives": [
            "Re-solve all previously failed, hinted, or low-confidence DSA problems in the revision queue",
            "Simulate comprehensive combined SDE + AI/ML engineering interview round",
            "Conduct full GitHub portfolio hygiene audit: READMEs, architecture diagrams, installation instructions",
            "Finalize one-page PDF resume ready for immediate recruiter distribution"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Solve 3 randomly selected problems from your previously struggled list without any hints within 60 minutes.",
        "interviewQuestion": "Given a machine learning model deployed behind a REST API, how do you handle incoming traffic spikes, asynchronous batching, and database logging?",
        "remedialAction": "If score < 70, focus exclusively on the specific algorithmic patterns where recurring failures occurred.",
        "dayFocus": [
            ("Error Log Elimination 1: Revisiting Stacks, Queues & Lists", "Error Revision", "dsa"),
            ("Error Log Elimination 2: Revisiting Trees, BST & Heaps", "Error Revision", "dsa"),
            ("Error Log Elimination 3: Revisiting Graphs & Dynamic Programming", "Error Revision", "dsa"),
            ("Combined SDE + AI/ML Comprehensive Mock Interview", "Interview Sim", "career"),
            ("GitHub Portfolio Hygiene: Polish READMEs, Diagrams & Live Demos", "Portfolio", "project"),
            ("Final One-Page Resume Lock & Recruiter Email Follow-Ups", "Career Strategy", "career"),
            ("Weekly Evaluation 25 & Pre-Graduation Readiness Check", "Evaluation", "career")
        ]
    },
    {
        "week": 26,
        "month": 6,
        "title": "Week 26: 180-Day Final Internship Readiness Verification & Retrospective",
        "theme": "Month 6: Final Internship Readiness & Interview Simulation",
        "objectives": [
            "Execute comprehensive 180-day retrospective and technical readiness audit",
            "Verify all deliverables: 100+ mastered DSA problems, 3 defensible capstones, CS fundamentals fluency",
            "Conduct final executive mock interview round with recording and self-scoring",
            "Establish sustainable continuous learning plan for lifelong software & AI engineering excellence"
        ],
        "rubric": {"dsa": 25, "dev": 20, "aiml": 20, "cs": 15, "comm": 10, "consistency": 10},
        "assessmentPrompt": "Deliver the final 30-minute end-to-end internship interview simulation (1 DSA live coding problem + 1 CS fundamental question + 1 Project architectural defense).",
        "interviewQuestion": "Looking back over 180 days of intense preparation, what was the most transformative technical concept you mastered, and how has your approach to problem solving evolved?",
        "remedialAction": "Consolidate your personalized cheat sheets and error logs for ongoing interview review throughout the placement season.",
        "dayFocus": [
            ("Final DSA Mastery Circuit: 5 Mixed High-Frequency Classics", "Mastery Drills", "dsa"),
            ("Final CS Fundamentals Flashcard Drill (OS, DBMS, CN, OOP)", "Core CS Mastery", "sde"),
            ("Final Capstone Defense: Placement Portal, ML Microservice & KV Store", "Project Mastery", "project"),
            ("Final Comprehensive Interview Simulation (Recorded)", "Final Viva", "career"),
            ("Internship Application Pipeline Transition & Ongoing Outreach Strategy", "Career Transition", "career"),
            ("180-Day Retrospective: Growth Analysis, Mastery Metrics & Continuous Habits", "Retrospective", "career"),
            ("Final Dashboard Graduation & Achievement Certificate Milestone", "Graduation", "career")
        ]
    }
]

# Build the complete 26-week roadmap structure with 182 days
roadmap = []

current_date = start_date
global_day = 1

for bp in week_blueprints:
    w_num = bp["week"]
    m_num = bp["month"]
    w_title = bp["title"]
    w_theme = bp["theme"]
    w_obj = bp["objectives"]
    w_rubric = bp["rubric"]
    w_prompt = bp["assessmentPrompt"]
    w_interview = bp["interviewQuestion"]
    w_remedial = bp["remedialAction"]
    
    week_start_date = current_date
    week_end_date = current_date + datetime.timedelta(days=6)
    
    days_data = []
    
    for d_idx in range(7):
        day_date = current_date
        day_date_str = day_date.strftime("%Y-%m-%d")
        day_name = day_date.strftime("%A")
        is_weekend = day_name in ["Saturday", "Sunday"]
        hours_planned = 6.5 if is_weekend else 3.5
        
        focus_title, focus_topic, focus_track = bp["dayFocus"][d_idx]
        
        # 3-4 structured tasks per day
        tasks = []

        # Resolve Intelligent Task 1 Resource (DSA Problem Mapping)
        matched_dsa = None
        for p in dsa_problems:
            if p.get("dateAssigned") == day_date_str:
                matched_dsa = p
                break
        if not matched_dsa:
            for p in dsa_problems:
                if p.get("weekAssigned") == w_num and (focus_track == "dsa" or p.get("topic", "").lower() in focus_topic.lower()):
                    matched_dsa = p
                    break

        if matched_dsa:
            task1_res_title = f"LeetCode: {matched_dsa['name']} ({matched_dsa['difficulty']})"
            task1_res_url = matched_dsa['url']
        elif "Binary Search" in focus_title or "Binary Search" in focus_topic:
            task1_res_title = "LeetCode: Binary Search Practice"
            task1_res_url = "https://leetcode.com/studyplan/binary-search/"
        elif "Tree" in focus_title or "BST" in focus_title:
            task1_res_title = "LeetCode: Binary Tree Traversal"
            task1_res_url = "https://leetcode.com/explore/learn/card/data-structures-binary-tree/"
        elif "Graph" in focus_title:
            task1_res_title = "LeetCode: Graph Exploration"
            task1_res_url = "https://leetcode.com/explore/featured/card/graph/"
        elif "Dynamic Programming" in focus_title or "DP" in focus_title:
            task1_res_title = "LeetCode: Dynamic Programming"
            task1_res_url = "https://leetcode.com/explore/featured/card/dynamic-programming/"
        elif any(k in focus_title.lower() for k in ["c++", "vector", "stl"]):
            task1_res_title = "cppreference: std::vector & Memory"
            task1_res_url = "https://en.cppreference.com/w/cpp/container/vector"
        else:
            task1_res_title = "DSA Tracker & Curated Problems"
            task1_res_url = "#dsa"

        # ── Topic-specific content lookup (Intelligent Content Injection) ──────
        matched_content = None
        full_topic_str = f"{focus_title} {focus_topic}".lower()
        for key, item in TOPIC_CONTENT.items():
            if key.startswith("_"):
                continue
            if key.lower() in full_topic_str:
                matched_content = item
                break

        if not matched_content:
            if any(k in full_topic_str for k in ["timed revision", "error log", "dsa revision", "revision", "mastery"]):
                matched_content = TOPIC_CONTENT.get("_default_revision")
            elif any(k in full_topic_str for k in ["mock", "simulated", "behavioral", "viva", "interview sim"]):
                matched_content = TOPIC_CONTENT.get("_default_mock")
            elif any(k in full_topic_str for k in ["resume", "portfolio", "application", "outreach", "career"]):
                matched_content = TOPIC_CONTENT.get("_default_career")
            elif any(k in full_topic_str for k in ["evaluation", "audit", "milestone", "retrospective", "graduation"]):
                matched_content = TOPIC_CONTENT.get("_default_evaluation")
            else:
                matched_content = TOPIC_CONTENT.get("_default_revision")

        # Build Task 1 content
        t1_why = matched_content["t1_why"] if matched_content else f"Essential for building deep, independent competence in {focus_topic}. Mastering this topic from first principles is critical for SDE and AI/ML internship technical rounds."
        t1_details = matched_content["t1_details"] if matched_content else f"1. Study the underlying mechanics and edge cases of {focus_title} from first principles.\n2. Attempt the brute-force approach on paper; identify exact bottlenecks.\n3. Derive the optimized approach and verify correctness with 2 examples.\n4. Code and test independently in your local IDE without AI assistance."
        t1_dod = matched_content["t1_dod"] if matched_content else f"Can independently implement and explain {focus_title} with correct complexity analysis and zero reference materials."

        # Build Task 2 content
        t2_why = matched_content["t2_why"] if matched_content else "Bridges theoretical problem solving with real-world software engineering and data pipelines required for SDE and AI/ML internships."
        t2_details = matched_content["t2_details"] if matched_content else "1. Implement hands-on code modules, write unit tests, or run database queries.\n2. Ensure modularity, error handling, and clean code formatting.\n3. Verify locally and push to your personal GitHub repository."
        t2_dod = matched_content["t2_dod"] if matched_content else "Working code verified locally with clean commits to your personal GitHub repository."

        # Task 1: Primary Technical Topic / DSA
        tasks.append({
            "id": f"w{w_num:02d}-d{d_idx+1}-t1",
            "title": f"{focus_title} - Core Practice & Implementation",
            "track": focus_track,
            "priority": "High",
            "estimatedMinutes": 90 if is_weekend else 60,
            "whyLearn": t1_why,
            "taskDetails": t1_details,
            "definitionOfDone": t1_dod,
            "resourceTitle": task1_res_title,
            "resourceUrl": task1_res_url,
            "isCompleted": False,
            "completedAt": None,
            "notes": "",
            "confidence": None,
            "githubUrl": "",
            "timeSpent": 0,
            "isExamMaintenance": True if d_idx in [0, 2, 4] else False
        })
        
        # Resolve Intelligent Task 2 Resource (SDE / AIML / CS Fundamentals)
        title_lower = (focus_title + " " + focus_topic).lower()
        if any(k in title_lower for k in ["c++", "vector", "stl", "pointer", "memory", "raii", "valgrind"]):
            task2_res_title = "cppreference: C++ Standard Library & Containers"
            task2_res_url = "https://en.cppreference.com/w/cpp"
        elif any(k in title_lower for k in ["postgres", "postgresql", "sql", "database", "schema", "acid", "index", "b-tree"]):
            task2_res_title = "PostgreSQL Official Documentation"
            task2_res_url = "https://www.postgresql.org/docs/current/"
        elif any(k in title_lower for k in ["git", "github", "commit", "branch", "merge"]):
            task2_res_title = "Pro Git Official Documentation"
            task2_res_url = "https://git-scm.com/doc"
        elif any(k in title_lower for k in ["pytorch", "tensor", "backprop", "cnn", "neural", "grad"]):
            task2_res_title = "PyTorch Documentation & Tutorials"
            task2_res_url = "https://pytorch.org/docs/stable/"
        elif any(k in title_lower for k in ["sklearn", "scikit", "regression", "classification", "random forest", "clustering", "pca"]):
            task2_res_title = "Scikit-Learn Machine Learning Guide"
            task2_res_url = "https://scikit-learn.org/stable/user_guide.html"
        elif any(k in title_lower for k in ["transformer", "hugging face", "bert", "gpt", "rag", "embedding", "llm"]):
            task2_res_title = "Hugging Face Transformers Docs"
            task2_res_url = "https://huggingface.co/docs/transformers/index"
        elif any(k in title_lower for k in ["fastapi", "rest api", "endpoint", "pydantic"]):
            task2_res_title = "FastAPI Framework Documentation"
            task2_res_url = "https://fastapi.tiangolo.com/"
        elif any(k in title_lower for k in ["react", "frontend", "hooks", "jsx", "state"]):
            task2_res_title = "React.dev Official Documentation"
            task2_res_url = "https://react.dev/reference/react"
        elif any(k in title_lower for k in ["node", "express", "backend"]):
            task2_res_title = "Node.js & Express Architecture"
            task2_res_url = "https://nodejs.org/en/docs"
        elif any(k in title_lower for k in ["python", "virtualenv", "dunder", "comprehension", "generator"]):
            task2_res_title = "Python 3 Official Documentation"
            task2_res_url = "https://docs.python.org/3/"
        elif any(k in title_lower for k in ["placement portal", "er diagram", "crud", "auth"]):
            task2_res_title = "Placement Portal Architecture Blueprint"
            task2_res_url = "#sde"
        elif any(k in title_lower for k in ["key-value", "wal", "storage engine"]):
            task2_res_title = "In-Memory KV Store Capstone Blueprint"
            task2_res_url = "#projects"
        elif any(k in title_lower for k in ["capstone", "project"]):
            task2_res_title = "Capstone Projects & Defense Guide"
            task2_res_url = "#projects"
        elif any(k in title_lower for k in ["os", "operating system", "process", "thread", "virtual memory", "deadlock"]):
            task2_res_title = "Operating Systems Concepts (OSTEP)"
            task2_res_url = "https://pages.cs.wisc.edu/~remzi/OSTEP/"
        elif any(k in title_lower for k in ["network", "tcp", "http", "dns", "socket"]):
            task2_res_title = "MDN Web Docs: Networking & HTTP"
            task2_res_url = "https://developer.mozilla.org/en-US/docs/Web/HTTP"
        else:
            task2_res_title = "MDN Web & Systems Reference"
            task2_res_url = "https://developer.mozilla.org/en-US/docs/Web"

        # Task 2: Secondary Focus (SDE, AI/ML, or CS Fundamentals)
        sec_track = "sde" if focus_track == "dsa" else ("aiml" if focus_track == "sde" else "dsa")
        sec_title = f"{focus_topic} - Practical Application & Systems Integration"
        tasks.append({
            "id": f"w{w_num:02d}-d{d_idx+1}-t2",
            "title": sec_title,
            "track": sec_track,
            "priority": "Medium",
            "estimatedMinutes": 90 if is_weekend else 60,
            "whyLearn": t2_why,
            "taskDetails": t2_details,
            "definitionOfDone": t2_dod,
            "resourceTitle": task2_res_title,
            "resourceUrl": task2_res_url,
            "isCompleted": False,
            "completedAt": None,
            "notes": "",
            "confidence": None,
            "githubUrl": "",
            "timeSpent": 0,
            "isExamMaintenance": False
        })
        
        # Task 3: Spaced Revision & AI Dependency Audit
        tasks.append({
            "id": f"w{w_num:02d}-d{d_idx+1}-t3",
            "title": "Spaced Repetition Review & AI Usage Protocol Check",
            "track": "project",
            "priority": "Medium",
            "estimatedMinutes": 45,
            "whyLearn": "Without spaced repetition (Days 1, 3, 7, 14, 30), retention degrades rapidly. Consistent active recall ensures lasting mastery.",
            "taskDetails": "1. Check the Spaced Revision Queue for problems due today.\n2. Re-solve one previously completed problem without looking at the past solution.\n3. Log today's AI assistance in the AI Dependency Tracker.",
            "definitionOfDone": "Revision queue cleared for the day; AI dependency entry logged with independent struggle duration and key learning.",
            "resourceTitle": "Dashboard Revision Queue & AI Dependency Log",
            "resourceUrl": "#dsa",
            "isCompleted": False,
            "completedAt": None,
            "notes": "",
            "confidence": None,
            "githubUrl": "",
            "timeSpent": 0,
            "isExamMaintenance": True
        })
        
        # Task 4: Daily 30-Minute English Communication Routine
        comm_entry = {
            "everydayTopic": f"Speak 10 mins about: {['Campus life and daily study discipline', 'Balancing college exams with career preparation', 'Why continuous learning beats cramming', 'How technology is shaping modern software jobs', 'Favorite engineering tools and why they help', 'Handling academic setbacks and maintaining motivation', 'My personal goals for the upcoming placement season'][d_idx]}",
            "technicalConcept": f"Explain 10 mins in English: {focus_title}",
            "interviewAnswer": f"Record & review 10 mins: {['Tell me about yourself', 'What is your greatest technical strength?', 'Describe a challenging project bug you fixed', 'Why do you want a software engineering internship?', 'How do you handle working with legacy or unfamiliar code?', 'Explain an algorithm you recently learned to a non-technical peer', 'Where do you see yourself in two years?'][d_idx]}"
        }
        
        tasks.append({
            "id": f"w{w_num:02d}-d{d_idx+1}-t4",
            "title": "Daily 30-Minute English Communication & Technical Articulation",
            "track": "comm",
            "priority": "High",
            "estimatedMinutes": 30,
            "whyLearn": "Clear verbal articulation of engineering architecture, algorithmic trade-offs, and design invariants is essential for succeeding in technical and hiring manager interviews.",
            "taskDetails": f"1. [10 mins] Speak aloud about the everyday topic.\n2. [10 mins] Explain {focus_title} in clear technical English.\n3. [10 mins] Record and review your interview answer on the speaking recorder.",
            "definitionOfDone": "Recorded and listened to a 3-minute answer; identified grammatical hesitations and logged confidence and fluency scores in the Speaking Log.",
            "resourceTitle": "Dashboard English Communication Hub",
            "resourceUrl": "#communication",
            "isCompleted": False,
            "completedAt": None,
            "notes": "",
            "confidence": None,
            "githubUrl": "",
            "timeSpent": 0,
            "isExamMaintenance": True
        })
        
        days_data.append({
            "dayNumber": d_idx + 1,
            "globalDay": global_day,
            "date": day_date_str,
            "dayName": day_name,
            "hoursPlanned": hours_planned,
            "focusArea": focus_title,
            "isExamMaintenance": any(t.get("isExamMaintenance", False) for t in tasks),
            "tasks": tasks,
            "dailyCommunication": comm_entry
        })
        
        current_date += datetime.timedelta(days=1)
        global_day += 1
        
    roadmap.append({
        "id": w_num,
        "weekNumber": w_num,
        "month": m_num,
        "title": w_title,
        "theme": w_theme,
        "startDate": week_start_date.strftime("%Y-%m-%d"),
        "endDate": week_end_date.strftime("%Y-%m-%d"),
        "weeklyObjectives": w_obj,
        "estimatedHours": 24 if w_num % 2 == 0 else 28,
        "days": days_data,
        "weeklyEvaluation": {
            "rubric": w_rubric,
            "assessmentPrompt": w_prompt,
            "interviewQuestion": w_interview,
            "remedialAction": w_remedial,
            "score": None,
            "passed": None,
            "feedback": "",
            "evaluatedAt": None
        }
    })

with open("js/data/roadmap-data.js", "w", encoding="utf-8") as f:
    f.write("// Complete 26-Week Roadmap (182 Days, Nov 17 2026 - May 17 2027)\n")
    f.write("// Each week contains actionable tasks, definitions of done, resources, and rubrics\n")
    f.write("const initialRoadmapData = " + json.dumps(roadmap, indent=2) + ";\n")

print(f"Roadmap generated: {len(roadmap)} weeks, {global_day - 1} total days.")
