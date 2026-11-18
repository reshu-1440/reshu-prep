"""
Topic content templates for 180-day SDE + AI/ML internship preparation dashboard.
Maps focus_title or focus_topic keywords to specific, actionable task details, whyLearn, and definitionOfDone.
"""

TOPIC_CONTENT = {
    # -------------------------------------------------------------
    # WEEK 1
    # -------------------------------------------------------------
    "Time Complexity": {
        "t1_details": "1. Analyze nested loop bounds and write exact Big-O summations on paper.\n2. Identify amortized cost differences between vector push_back and node insertion.\n3. Verify loop invariants for pointer termination in linear array scans.\n4. Solve 2 LeetCode problems and state formal asymptotic bounds independently.",
        "t1_why": "Interviewers reject unoptimized solutions immediately without rigorous Big-O and loop invariant proofs.",
        "t1_dod": "Can derive and defend tight time and space bounds for nested algorithms without hints.",
        "t2_details": "1. Build a C++ chrono benchmarking harness for linear and logarithmic loops.\n2. Measure execution time across array inputs from 1,000 to 1,000,000 items.\n3. Plot runtime graphs and verify alignment with theoretical asymptotic curves.",
        "t2_why": "Connecting Big-O theory to empirical CPU cycles is vital for backend systems optimization.",
        "t2_dod": "C++ harness produces verified execution time logs matching theoretical asymptotic growth curves."
    },
    "Space Complexity": {
        "t1_details": "1. Trace recursion stack frames and calculate maximum depth auxiliary memory.\n2. Contrast heap object allocation overhead against stack frame primitive storage.\n3. Profile memory consumption of iterative versus recursive traversal on paper.\n4. Rewrite recursive array processing into O(1) auxiliary space iteration.",
        "t1_why": "Memory limits and stack overflow crashes are primary elimination criteria in technical screenings.",
        "t1_dod": "Accurately traces stack frame memory and refactors recursive routines into O(1) space.",
        "t2_details": "1. Write a C++ program inspecting pointer addresses on stack and heap.\n2. Profile process memory usage with valgrind or OS memory diagnostic tools.\n3. Log peak memory consumption across varying recursive recursion tree depths.",
        "t2_why": "Understanding OS stack limits prevents memory leaks and stack overflow in production servers.",
        "t2_dod": "Memory profiling script logs exact stack frame overhead across multiple recursion depths."
    },
    "Array Reversal": {
        "t1_details": "1. Implement two-pointer in-place swap using left and right index markers.\n2. Execute array rotation by reversing prefix, suffix, and full array segments.\n3. Test odd, even, single-element, and empty array edge cases locally.\n4. Prove O(1) auxiliary memory usage and exactly N/2 swap operations.",
        "t1_why": "In-place array manipulations test pointer discipline and edge-case handling without allocating extra memory.",
        "t1_dod": "Executes in-place reversal and multi-step rotation without off-by-one errors or extra buffers.",
        "t2_details": "1. Implement cache-friendly circular ring buffer in C++ using a fixed array.\n2. Write unit tests verifying enqueue, dequeue, and wrap-around index arithmetic.\n3. Measure L1 data cache misses during sequential versus strided array traversal.",
        "t2_why": "Contiguous array memory layout maximizes CPU cache hit rates in high-throughput data processing.",
        "t2_dod": "Tested circular buffer passes all wrap-around unit tests with zero dynamic allocations."
    },
    "Vector Internals": {
        "t1_details": "1. Implement dynamic resize array tracking size, capacity, and geometric expansion factor.\n2. Calculate amortized O(1) insertion proof using the accounting aggregate method.\n3. Trace pointer invalidation mechanics during vector reallocations and buffer moves.\n4. Benchmark push_back overhead when pre-allocating reserve capacity versus dynamic doubling.",
        "t1_why": "Vector growth internals and amortized analysis are staple C++ systems interview questions.",
        "t1_dod": "Explains geometric reallocation factor and pointer invalidation risks with working code examples.",
        "t2_details": "1. Write a custom vector class in C++ with size, capacity, and reserve.\n2. Implement explicit move constructors to avoid redundant deep copy allocations.\n3. Benchmark custom vector performance against standard std::vector under heavy insertions.",
        "t2_why": "Mastering custom memory management and move semantics is required for high-performance SDE roles.",
        "t2_dod": "Custom C++ vector class successfully passes stress tests with proper move semantics."
    },
    "Finding Duplicates": {
        "t1_details": "1. Trace in-place index negation marking for numbers in range 1 to N.\n2. Contrast hash set O(N) space approach against O(1) sign-flipping mutation.\n3. Handle read-only array constraints using Floyd's cycle-finding pointer algorithm.\n4. Code and test duplicate detection across negative and boundary inputs.",
        "t1_why": "Optimizing duplicate detection from O(N) space to O(1) tests non-trivial indexing mastery.",
        "t1_dod": "Solves duplicate detection in O(N) time and O(1) auxiliary space without extra storage.",
        "t2_details": "1. Implement a space-efficient BitSet class utilizing 64-bit integer bitmasks.\n2. Test bitwise set, clear, and test operations for one million unique keys.\n3. Benchmark memory footprint of BitSet against standard std::unordered_set.",
        "t2_why": "Bit manipulation delivers radical memory reduction for indexing pipelines and Bloom filters.",
        "t2_dod": "BitSet implementation verifies duplicate detection with 8x less memory than hash tables."
    },
    "Python Revision": {
        "t1_details": "1. Write dict and set comprehensions with nested conditional filtering logic.\n2. Implement __getitem__, __len__, and __repr__ dunder methods on custom classes.\n3. Trace Python GIL behavior and reference counting garbage collection mechanics.\n4. Build generator functions with yield to stream large sequence datasets.",
        "t1_why": "Writing idiomatic, memory-efficient Python is tested heavily in AI/ML and backend interviews.",
        "t1_dod": "Implements custom iterable classes using dunder methods and generators without external packages.",
        "t2_details": "1. Set up an isolated Python virtual environment using venv and pip-tools.\n2. Write a pyproject.toml configuration with strict flake8 and black linting rules.\n3. Package a reusable math utility module with automated pytest unit tests.",
        "t2_why": "Production ML pipelines require reproducible virtual environments and robust automated test suites.",
        "t2_dod": "Virtual environment initialized with pinned dependencies and clean passing pytest test runs."
    },

    # -------------------------------------------------------------
    # WEEK 2
    # -------------------------------------------------------------
    "Optimized Array Traversal": {
        "t1_details": "1. Diagram brute-force nested loop redundant calculations on a whiteboard or paper.\n2. Refactor O(N^2) search patterns into single-pass O(N) linear scans.\n3. Track running min and max variables during traversal without extra arrays.\n4. Validate loop termination invariants and handle empty or single-item lists.",
        "t1_why": "Transforming quadratic scans into linear passes is the most common interview optimization pattern.",
        "t1_dod": "Replaces nested loop scans with single-pass traversal achieving optimal linear runtime.",
        "t2_details": "1. Implement a high-throughput time-series streaming accumulator in C++ or Python.\n2. Calculate moving statistics including min, max, and variance in single passes.\n3. Benchmark memory throughput handling ten million generated time-series data points.",
        "t2_why": "Real-time analytics and monitoring engines depend on single-pass sliding metrics.",
        "t2_dod": "Streaming engine computes real-time statistics with constant memory footprint under stress."
    },
    "Kadane": {
        "t1_details": "1. Derive dynamic programming recurrence relation for maximum subarray ending at index i.\n2. Track current_sum and max_so_far variables across positive and negative integers.\n3. Add start and end index tracking to reconstruct the maximum subarray slice.\n4. Solve edge cases where all array elements are strictly negative numbers.",
        "t1_why": "Kadane's algorithm is foundational for DP optimization and maximum subarray variations.",
        "t1_dod": "Implements Kadane's algorithm with coordinate tracking and handles all-negative edge cases.",
        "t2_details": "1. Implement a stock profit optimizer processing historical daily closing stock prices.\n2. Incorporate transaction fees and volume constraints into maximum profit computations.\n3. Write unit tests with edge cases including flat-line and declining price trends.",
        "t2_why": "Subarray optimization patterns directly solve financial risk modeling and trading signal generation.",
        "t2_dod": "Stock profit optimizer correctly determines optimal buy and sell windows across test datasets."
    },
    "Prefix Sums": {
        "t1_details": "1. Construct prefix sum array enabling O(1) range sum query answering.\n2. Implement running product calculation with prefix and suffix arrays without division.\n3. Eliminate auxiliary space by computing running products directly into output array.\n4. Handle zero-value elements and prefix indexing offsets without boundary errors.",
        "t1_why": "Prefix sums transform expensive range queries from O(N) into instant O(1) operations.",
        "t1_dod": "Constructs in-place product arrays and prefix tables answering range queries in O(1).",
        "t2_details": "1. Implement a 2D range sum query matrix class with precomputed cumulative sums.\n2. Derive the inclusion-exclusion formula for submatrix sum calculation in O(1).\n3. Benchmark submatrix queries against brute-force iterations over large 1000x1000 matrices.",
        "t2_why": "2D prefix sums accelerate computer vision integral images and spatial database analytics.",
        "t2_dod": "Matrix range query class returns instant rectangular region sums passing all boundary tests."
    },
    "Constructors, Deep Copy": {
        "t1_details": "1. Write C++ classes implementing parameterized constructors and explicit destructors.\n2. Implement copy constructors and assignment operators performing deep heap copy allocations.\n3. Apply the Rule of Three and Rule of Five for custom resources.\n4. Test shallow copy pitfalls causing double-free heap corruption under debugger inspection.",
        "t1_why": "Resource management, pointers, and copy semantics are core C++ technical screening topics.",
        "t1_dod": "Demonstrates flawless deep copy implementations that avoid double frees and memory leaks.",
        "t2_details": "1. Implement a dynamic Matrix class in C++ managing contiguous heap memory buffers.\n2. Provide move semantics with noexcept move constructor and move assignment operator.\n3. Verify zero memory leaks using Valgrind or AddressSanitizer during heavy reallocations.",
        "t2_why": "High-performance systems programming requires strict ownership and zero-overhead move semantics.",
        "t2_dod": "Matrix class passes leak-free AddressSanitizer tests with verified move constructor invocations."
    },
    "VTables": {
        "t1_details": "1. Design class hierarchies demonstrating single, multiple, and virtual base inheritance.\n2. Inspect assembly and memory layout of vptr and vtable runtime dispatch tables.\n3. Implement pure virtual functions and abstract interfaces with proper virtual destructors.\n4. Measure performance overhead of virtual function dynamic dispatch versus static binding.",
        "t1_why": "Virtual table mechanics and runtime polymorphism are standard SDE system screening questions.",
        "t1_dod": "Explains vtable memory layout and proves dynamic dispatch mechanics with working code.",
        "t2_details": "1. Build an extensible payment gateway processor using abstract C++ base interfaces.\n2. Implement concrete handlers for CreditCard, PayPal, and Crypto payment processing methods.\n3. Write a polymorphic factory dispatching payment requests based on runtime input tokens.",
        "t2_why": "Interface polymorphism enables extensible software architectures adhering to open-closed design principles.",
        "t2_dod": "Payment engine dispatches diverse payment strategies polymorphically through base pointer references."
    },
    "Vector Spaces": {
        "t1_details": "1. Calculate L1 Manhattan and L2 Euclidean norms for multi-dimensional vectors by hand.\n2. Compute dot products and cosine similarity angles between arbitrary numeric vectors.\n3. Prove orthogonal vector projections and verify triangle inequality properties mathematically.\n4. Write vector arithmetic functions in Python without using third-party numerical libraries.",
        "t1_why": "Vector norms and dot products form the mathematical core of embeddings and neural networks.",
        "t1_dod": "Calculates L1/L2 norms and cosine similarity from scratch and explains geometric significance.",
        "t2_details": "1. Implement a lightweight vector similarity search engine in pure Python.\n2. Index one thousand document embeddings and retrieve top-k nearest neighbors via cosine similarity.\n3. Compare search latency and ranking accuracy against exact Euclidean distance calculations.",
        "t2_why": "Embedding retrieval forms the algorithmic foundation of modern vector search engines and RAG.",
        "t2_dod": "Vector similarity engine accurately retrieves top-k closest vectors using cosine similarity scoring."
    },

    # -------------------------------------------------------------
    # WEEK 3
    # -------------------------------------------------------------
    "Palindrome Check": {
        "t1_details": "1. Implement two-pointer string traversal skipping non-alphanumeric characters in-place.\n2. Convert ASCII characters to lowercase using bitwise operations without extra string copies.\n3. Handle empty strings, single characters, and unicode boundary conditions correctly.\n4. Prove O(N) time complexity and strict O(1) auxiliary space consumption.",
        "t1_why": "In-place string filtering demonstrates memory consciousness and pointer control under interview constraints.",
        "t1_dod": "Validates palindromes in-place with O(1) auxiliary space handling all punctuation edge cases.",
        "t2_details": "1. Write a high-performance string sanitizer library in C++ using pointer arithmetic.\n2. Implement tokenization routines splitting text streams on custom delimiters without allocations.\n3. Benchmark string manipulation speed against standard library regex and string utilities.",
        "t2_why": "Zero-copy string parsing is critical for network packet processing and fast log parsers.",
        "t2_dod": "Sanitizer library parses formatted text streams with zero dynamic heap string allocations."
    },
    "Hash Tables": {
        "t1_details": "1. Implement custom hash function using polynomial rolling hash across string keys.\n2. Handle hash collisions using separate chaining with linked list bucket nodes.\n3. Implement automatic dynamic resizing and rehashing when load factor exceeds threshold 0.75.\n4. Analyze worst-case O(N) lookup degradation and mitigation via balanced trees.",
        "t1_why": "Internal hash table architecture, collision resolution, and rehashing are asked in top-tier interviews.",
        "t1_dod": "Builds a functional hash table with separate chaining and dynamic load-factor rehashing.",
        "t2_details": "1. Implement open addressing hash table with linear probing and lazy deletion markers.\n2. Benchmark lookup speeds between separate chaining and open addressing under cache stress.\n3. Measure clustering degradation as table occupancy increases above sixty percent load.",
        "t2_why": "Open addressing hash tables maximize CPU cache performance in high-speed network routers.",
        "t2_dod": "Open-addressing hash table correctly handles insertion, collision probing, and tombstone deletions."
    },
    "Group Anagrams": {
        "t1_details": "1. Derive anagram equivalence condition using sorted character tuples and frequency counts.\n2. Build fixed 26-element character frequency array keys to achieve O(N * K) runtime.\n3. Group strings into hash map values keyed by serialized frequency counts.\n4. Handle empty strings and large duplicate string inputs without memory exhaustion.",
        "t1_why": "Group anagrams tests optimal hash key design and multidimensional grouping patterns.",
        "t1_dod": "Groups anagrams in O(N * K) time using character frequency arrays as hash keys.",
        "t2_details": "1. Build an inverted index search dictionary mapping normalized tokens to document IDs.\n2. Implement fast lookup methods retrieving all anagrams or fuzzy matches for queries.\n3. Measure memory footprint and query response time across a 50,000-word English vocabulary.",
        "t2_why": "Inverted indexes and token frequency grouping form the cornerstone of search engine architectures.",
        "t2_dod": "Inverted dictionary accurately indexes vocabulary and executes sub-millisecond query lookups."
    },
    "Longest Common Prefix": {
        "t1_details": "1. Implement horizontal scanning comparing running prefix against successive array strings.\n2. Implement vertical scanning comparing character by character across all strings simultaneously.\n3. Analyze divide-and-conquer and binary search approaches on prefix length space.\n4. Guard against empty lists, mismatched prefix lengths, and divergent character lengths.",
        "t1_why": "Tests multiple algorithmic strategies (horizontal, vertical, binary search) on simple string data.",
        "t1_dod": "Implements both horizontal and vertical scanning returning correct prefix across edge cases.",
        "t2_details": "1. Implement a prefix Trie data structure supporting insert, search, and startsWith methods.\n2. Traverse Trie root node to extract longest common prefix in linear time.\n3. Benchmark Trie prefix lookup latency against standard nested string scanning algorithms.",
        "t2_why": "Tries provide scalable prefix matching for autocomplete search boxes and routing tables.",
        "t2_dod": "Trie data structure passes all prefix match test cases with clean memory deallocation."
    },
    "Git CLI": {
        "t1_details": "1. Create git feature branches and commit incremental code changes with conventional commits.\n2. Perform interactive rebasing squashing multiple commits into clean atomic history entries.\n3. Simulate merge conflict between branches and resolve conflict markers systematically by hand.\n4. Use git reflog and cherry-pick to recover lost commits and detached HEADs.",
        "t1_why": "Git proficiency and clean commit hygiene are mandatory baseline expectations for any SDE.",
        "t1_dod": "Demonstrates interactive rebase, conflict resolution, and commit recovery using Git CLI.",
        "t2_details": "1. Configure Git pre-commit hooks running automated code formatters and static linters.\n2. Set up GitHub Actions CI workflow verifying build compilation and test suites.\n3. Enforce branch protection rules requiring passing CI checks and PR approvals.",
        "t2_why": "Automated CI/CD pipelines and commit linting prevent broken code from reaching production.",
        "t2_dod": "GitHub repository configured with automated pre-commit hooks and passing Actions workflow."
    },
    "NumPy Vectorization": {
        "t1_details": "1. Create multidimensional NumPy arrays inspecting shape, dtype, strides, and memory layout.\n2. Apply vector arithmetic and boolean masking replacing slow explicit Python for-loops.\n3. Demonstrate NumPy broadcasting rules across arrays with mismatched but compatible dimensions.\n4. Measure performance speedup of vectorized array operations versus native Python lists.",
        "t1_why": "Vectorized array execution is required for high-speed feature processing and numerical modeling.",
        "t1_dod": "Replaces Python loops with vectorized NumPy expressions achieving 50x measured speedup.",
        "t2_details": "1. Implement a vectorized batch gradient calculation script for linear regression in NumPy.\n2. Compute mean squared error and parameter gradients using matrix multiplication operations.\n3. Verify numerical equivalence against iterative loop implementations across synthetic datasets.",
        "t2_why": "Batch vector operations form the operational foundation of deep learning tensor frameworks.",
        "t2_dod": "Vectorized gradient script matches iterative outputs while executing 30x faster."
    },

    # -------------------------------------------------------------
    # WEEK 4
    # -------------------------------------------------------------
    "Two Sum II": {
        "t1_details": "1. Initialize left pointer at start and right pointer at end of sorted array.\n2. Adjust pointers inward based on comparison of current sum against target value.\n3. Prove monotonicity invariant ensuring no valid pairs are skipped during movement.\n4. Handle 1-based indexing output requirements and duplicate target numbers gracefully.",
        "t1_why": "Two Sum II introduces opposite-end pointer mechanics on sorted data with O(1) space.",
        "t1_dod": "Solves Two Sum II in O(N) time and O(1) auxiliary space without hashing.",
        "t2_details": "1. Implement a latency-sensitive pair-matching order book engine for financial bid-ask matching.\n2. Process sorted streams of incoming price quotes to match counterparties in real-time.\n3. Benchmark matching throughput handling 100,000 price ticks per second with zero allocations.",
        "t2_why": "Two-pointer sorted stream matching powers high-frequency electronic financial exchange order matching.",
        "t2_dod": "Order matching module matches bid-ask orders with sub-microsecond latency per tick."
    },
    "3Sum": {
        "t1_details": "1. Sort input array in ascending order to enable two-pointer opposite-end scanning.\n2. Iterate index i from 0 to N-3, skipping duplicate values of nums[i].\n3. Run two-pointer scan for target -nums[i], skipping duplicate left and right elements.\n4. Verify strict O(N^2) time complexity and eliminate all duplicate triplet outputs.",
        "t1_why": "3Sum is one of the most frequently asked medium interview questions worldwide.",
        "t1_dod": "Produces all unique zero-sum triplets in O(N^2) time with complete deduplication.",
        "t2_details": "1. Implement a multi-attribute recommendation filter finding triplet combinations matching budget limits.\n2. Add price tolerance bounds and product category constraints to candidate triplet generation.\n3. Write comprehensive unit tests validating triplet uniqueness and edge-case empty scenarios.",
        "t2_why": "Constrained combinatorial filtering is widely used in retail bundle recommendations and portfolio construction.",
        "t2_dod": "Recommendation filter extracts compliant triplets within budget constraints without duplicate recommendations."
    },
    "Container With Most Water": {
        "t1_details": "1. Position left pointer at index 0 and right pointer at array end.\n2. Compute area using formula (right - left) multiplied by min(height[left], height[right]).\n3. Shift pointer at shorter height inward, proving greedy choice property mathematically.\n4. Validate behavior on uniform heights, strictly decreasing heights, and two-element arrays.",
        "t1_why": "Proving why moving the shorter wall preserves the optimal solution tests greedy intuition.",
        "t1_dod": "Calculates maximum water container capacity in O(N) single pass and O(1) space.",
        "t2_details": "1. Build a 2D topographic terrain water catchment volume simulator in Python.\n2. Calculate trapped rainwater capacity across discrete elevation profile maps.\n3. Visualize reservoir profiles and drainage basin boundaries using Matplotlib plots.",
        "t2_why": "Geometric catchment modeling applies directly to civil engineering, hydrology, and geospatial mapping.",
        "t2_dod": "Catchment simulator correctly computes reservoir capacity across varied synthetic elevation profiles."
    },
    "Maximum Average Subarray": {
        "t1_details": "1. Calculate sum of initial window containing first k elements as baseline.\n2. Slide window forward adding incoming element nums[i] and subtracting outgoing nums[i-k].\n3. Track maximum cumulative window sum using double precision floating point arithmetic.\n4. Ensure O(N) time complexity and O(1) auxiliary memory throughout window traversal.",
        "t1_why": "Fixed-size sliding window is the gateway pattern to streaming analytics and moving averages.",
        "t1_dod": "Computes maximum average subarray of size k in O(N) time and O(1) space.",
        "t2_details": "1. Implement a real-time sliding window moving average rate limiter for API endpoints.\n2. Track incoming timestamped requests within fixed time windows using a ring buffer.\n3. Reject requests exceeding rate thresholds and verify behavior with concurrent client threads.",
        "t2_why": "Fixed sliding windows form the core algorithmic foundation of network rate limiters.",
        "t2_dod": "Rate limiter throttles excess API requests cleanly across concurrent load testing threads."
    },
    "Longest Substring Without Repeating": {
        "t1_details": "1. Maintain sliding window [left, right] with hash map recording last seen character indices.\n2. Advance right pointer; if duplicate found, jump left pointer to max(left, last_idx + 1).\n3. Update maximum length at each step and refresh character's latest index position.\n4. Handle single characters, all-identical characters, and whitespace edge case strings.",
        "t1_why": "Dynamic sliding window with index jumping is asked universally across top tech screenings.",
        "t1_dod": "Finds length of longest non-repeating substring in O(N) single pass with index jumping.",
        "t2_details": "1. Build an active network session stream parser detecting unique non-repeated token sequences.\n2. Implement sliding window token extraction across continuous buffered network socket input.\n3. Benchmark window tracking memory and CPU latency against high-throughput mock network streams.",
        "t2_why": "Sliding window token analysis enables real-time intrusion detection and network packet inspection.",
        "t2_dod": "Session parser processes continuous token streams tracking unique sequences without memory leaks."
    },
    "Pandas & Seaborn": {
        "t1_details": "1. Load Titanic or Real Estate dataset into Pandas DataFrame inspecting info and describe.\n2. Handle missing null values using median imputation and categorical mode substitution.\n3. Generate correlation heatmap matrices using Seaborn to identify collinear input features.\n4. Create boxplots and histograms detecting numerical outliers and skewness across variables.",
        "t1_why": "Exploratory data analysis demonstrates ability to clean messy real-world data for ML.",
        "t1_dod": "Produces comprehensive Jupyter notebook showing distribution plots, correlation heatmaps, and clean data.",
        "t2_details": "1. Build an automated data quality validation pipeline using Pandas assertion checks.\n2. Export structured data profiling reports summarizing column types, missingness, and cardinality.\n3. Package EDA scripts into a reusable command-line data audit utility module.",
        "t2_why": "Automating data profiling catches schema drift and data corruption before models train.",
        "t2_dod": "Command-line data audit tool generates validation reports flagging anomalies in input CSVs."
    },

    # -------------------------------------------------------------
    # WEEK 5
    # -------------------------------------------------------------
    "Binary Search Template": {
        "t1_details": "1. Define search range using inclusive bounds low=0 and high=N-1.\n2. Calculate midpoint using low + (high - low) // 2 preventing integer arithmetic overflow.\n3. Establish strict boundary update conditions maintaining monotonic search invariants.\n4. Test termination when target does not exist, verifying loop halts with low > high.",
        "t1_why": "Mastering the overflow-safe binary search template eliminates infinite loops and boundary bugs.",
        "t1_dod": "Implements bug-free binary search with overflow prevention and terminates cleanly on missing keys.",
        "t2_details": "1. Implement an in-memory sorted array database index supporting logarithmic key lookups.\n2. Add binary search range scanning returning all keys within specified [min, max] bounds.\n3. Benchmark binary search lookups against hash map lookups under heavy read concurrency.",
        "t2_why": "Sorted array indexes deliver cache-efficient lookups for static read-heavy database partitions.",
        "t2_dod": "Sorted array index retrieves exact keys and range slices in verified O(log N) time."
    },
    "Search Insert Position": {
        "t1_details": "1. Implement binary search identifying exact index or insertion position for target.\n2. Trace lower_bound invariant where low points to smallest index with value >= target.\n3. Trace upper_bound invariant where low points to smallest index with value > target.\n4. Validate edge cases where target is smaller than min or larger than max.",
        "t1_why": "Lower and upper bound invariants are required for complex binary search interview problems.",
        "t1_dod": "Correctly implements lower_bound and upper_bound returning exact insertion indices across edge cases.",
        "t2_details": "1. Build a sorted event scheduler inserting incoming scheduled tasks at proper chronological offsets.\n2. Use lower_bound binary search to locate target timestamp slots in O(log N).\n3. Verify schedule integrity with concurrent task inserts and cancellations across timestamp ranges.",
        "t2_why": "Chronological task scheduling in operating systems relies on lower-bound binary insertion.",
        "t2_dod": "Scheduler inserts tasks into sorted timeline with O(log N) lookup and zero ordering errors."
    },
    "First & Last Occurrence": {
        "t1_details": "1. Write modified binary search continuing leftward search when target element is matched.\n2. Write second binary search continuing rightward search to isolate the final target occurrence.\n3. Combine results to return inclusive [first, last] index range in O(log N) time.\n4. Test arrays with all identical elements and arrays completely missing the target.",
        "t1_why": "Finding duplicate boundaries tests subtle modifications to standard binary search exit criteria.",
        "t1_dod": "Finds first and last target occurrences in O(log N) without linear scanning.",
        "t2_details": "1. Build a log file time-range search utility querying millions of sorted timestamp records.\n2. Locate first and last occurrence of specific error codes within timestamp intervals.\n3. Output exact count and slice of matching log entries with sub-millisecond query latency.",
        "t2_why": "Fast log filtering over massive sorted archives requires binary search boundary extraction.",
        "t2_dod": "Log search CLI returns exact match boundaries and event counts in sub-millisecond execution."
    },
    "Rotated Sorted Array": {
        "t1_details": "1. Determine which half of the array is monotonically sorted by comparing nums[low] and nums[mid].\n2. Check whether target lies inside the sorted half's known boundaries [low, mid].\n3. Discard the opposite half accordingly and continue binary search iteratively.\n4. Trace pivot transitions and single-element rotation boundary edge cases carefully.",
        "t1_why": "Search in rotated arrays tests invariant preservation when global monotonicity is broken.",
        "t1_dod": "Locates targets in rotated sorted arrays in O(log N) time without finding pivot first.",
        "t2_details": "1. Implement a distributed circular consistent hashing ring locator with rotated partition lists.\n2. Use modified binary search to map client request keys to target replica server nodes.\n3. Test node addition and deletion rebalances ensuring proper consistent ring wrap-around.",
        "t2_why": "Consistent hashing in distributed systems like Cassandra maps keys along circular rotated rings.",
        "t2_dod": "Consistent hashing ring maps keys to server nodes in O(log N) time with wrap-around."
    },
    "Linear Algebra for ML": {
        "t1_details": "1. Multiply 3x3 matrices on paper showing dot products of row and column vectors.\n2. Calculate matrix determinant, rank, and inverse using Gaussian elimination steps.\n3. Compute eigenvalues and eigenvectors for 2x2 matrices verifying characteristic polynomial roots.\n4. Code matrix multiplication in Python with nested loops and verify with NumPy dot.",
        "t1_why": "Linear transformations, determinants, and matrix inverses are core AI/ML interview prerequisites.",
        "t1_dod": "Derives matrix inverse and eigenvalues mathematically and verifies with custom code.",
        "t2_details": "1. Implement Principal Component Analysis (PCA) dimensionality reduction from scratch in Python.\n2. Center data matrix, compute covariance matrix, and extract top-k eigenvectors via SVD.\n3. Project high-dimensional dataset onto 2 principal components and plot variance explained ratio.",
        "t2_why": "PCA projection demonstrates practical mastery of covariance, eigenvectors, and dimensionality reduction.",
        "t2_dod": "Scratch PCA implementation reduces dataset dimensionality and matches scikit-learn output."
    },
    "Comprehensive DSA Review": {
        "t1_details": "1. Re-solve 3 struggled problems from Month 1 under strict 20-minute timers.\n2. Audit error log notes identifying recurring pointer off-by-one and boundary bugs.\n3. Write out formal Big-O proofs for all Month 1 data structures without reference.\n4. Complete an assessment round with zero AI assistance or debugger inspection.",
        "t1_why": "Spaced repetition locks algorithmic patterns into long-term memory ahead of high-pressure rounds.",
        "t1_dod": "Solves 3 previously struggled problems independently within 20 minutes each with zero hints.",
        "t2_details": "1. Audit GitHub repository commit history ensuring clean documentation and structured folders.\n2. Write a comprehensive README markdown index linking all completed Month 1 DSA solutions.\n3. Add automated test runners executing unit tests across all implemented algorithms.",
        "t2_why": "A well-organized GitHub portfolio provides tangible evidence of technical rigor to recruiters.",
        "t2_dod": "GitHub repository updated with comprehensive problem index and passing test badges."
    },

    # -------------------------------------------------------------
    # WEEK 6
    # -------------------------------------------------------------
    "Recursion Call Stack": {
        "t1_details": "1. Draw recursion call stack tree diagrams for Fibonacci and factorial on paper.\n2. Trace push and pop operations of stack frames showing local variables and return addresses.\n3. Identify base case omissions triggering recursion depth limit and segmentation faults.\n4. Refactor head recursive algorithms into tail recursive calls to optimize stack overhead.",
        "t1_why": "Visualizing stack frames is essential for mastering tree traversals and backtracking algorithms.",
        "t1_dod": "Traces complete call stack tree and converts head recursion into tail-recursive form.",
        "t2_details": "1. Implement a recursive file directory tree crawler in C++ or Python with depth limits.\n2. Track visited directory inodes preventing circular infinite loops caused by symlinks.\n3. Benchmark memory consumption of recursive crawler against queue-based iterative crawler.",
        "t2_why": "Production file crawlers and graph explorers must guard against infinite recursion and stack exhaustion.",
        "t2_dod": "Directory crawler traverses complex nested file trees safely without stack overflow crashes."
    },
    "Subsets Pattern": {
        "t1_details": "1. Draw complete binary decision tree representing include or exclude choice for each element.\n2. Implement backtracking function pushing element, recurring to next index, and popping element.\n3. Handle duplicate input elements by sorting array and skipping identical adjacent candidates.\n4. Prove 2^N time complexity and O(N) auxiliary recursion stack space bounds.",
        "t1_why": "The pick/don't pick pattern is the foundational template for all combinatorial backtracking.",
        "t1_dod": "Generates all unique power set subsets with correct duplicate skipping in O(2^N).",
        "t2_details": "1. Build a configuration feature flag optimizer evaluating valid software module combinations.\n2. Enforce incompatibility constraints pruning invalid feature branches early during subset exploration.\n3. Output all valid feature deployment configurations satisfying dependency rules.",
        "t2_why": "Combinatorial constraint solving powers software build matrix generators and product bundle engines.",
        "t2_dod": "Feature optimizer outputs all valid configuration combinations while pruning illegal branches."
    },
    "Combination Sum": {
        "t1_details": "1. Formulate backtracking decision tree allowing repeated selection of current element candidate.\n2. Deduct chosen candidate from remaining target value passing remaining balance down recursion.\n3. Prune recursion branches immediately when remaining target drops below zero.\n4. Sort input candidates to terminate loop early when candidate exceeds remaining target.",
        "t1_why": "Combination Sum demonstrates branch pruning optimizations that drastically reduce search state space.",
        "t1_dod": "Solves Combination Sum with candidate repetition and optimal branch pruning.",
        "t2_details": "1. Build an automated cash register change-dispensing calculation module in Python.\n2. Find all unique currency coin combinations that total exact requested dollar amounts.\n3. Benchmark execution latency with and without candidate sorting and early pruning.",
        "t2_why": "Currency breakdown and knapsack resource allocations apply directly to fintech payment engines.",
        "t2_dod": "Change dispenser calculates all unique coin combinations with verified branch pruning efficiency."
    },
    "Permutations": {
        "t1_details": "1. Implement backtracking permutation generator using a boolean visited tracking array.\n2. Implement alternative in-place swapping algorithm eliminating visited array memory overhead.\n3. Handle duplicate elements by sorting and skipping identical items at the same depth.\n4. Prove N! time complexity and trace complete recursion tree for N=3 input.",
        "t1_why": "Permutations test visited state tracking and in-place state swapping backtracking techniques.",
        "t1_dod": "Generates all unique permutations using both visited tracking and in-place swapping.",
        "t2_details": "1. Build an automated Traveling Salesperson Problem (TSP) brute-force route solver.\n2. Generate city traversal permutations and compute total path distances across coordinates.\n3. Prune permutation paths as soon as partial route distance exceeds current minimum.",
        "t2_why": "Route optimization and logistics delivery dispatching build upon permutation state-space search.",
        "t2_dod": "TSP solver identifies optimal minimal distance tour while pruning suboptimal branches."
    },
    "Word Search": {
        "t1_details": "1. Iterate 2D grid cells initiating DFS search when first character matches word.\n2. Move in 4 cardinal directions checking boundary conditions and character equivalence.\n3. Mark current cell visited in-place using character replacement without extra memory matrices.\n4. Backtrack by restoring original character upon returning from recursive branch exploration.",
        "t1_why": "Grid DFS backtracking with in-place board state restoration is asked at top companies.",
        "t1_dod": "Locates words in 2D grid with in-place cell marking and proper backtracking restoration.",
        "t2_details": "1. Implement a 2D maze navigation solver finding paths between start and exit coordinates.\n2. Record path coordinates while marking visited dead ends to prevent circular cycles.\n3. Render maze path solutions visually in terminal ASCII output with step metrics.",
        "t2_why": "Grid search algorithms drive autonomous robot path planning and game board navigation.",
        "t2_dod": "Maze solver navigates arbitrary 2D obstacle grids returning valid path coordinates."
    },
    "Probability Foundations": {
        "t1_details": "1. Calculate conditional probability P(A|B) using Bayes' theorem formula by hand.\n2. Compute prior, likelihood, marginal probability, and posterior probabilities for medical tests.\n3. Prove independence conditions P(A ∩ B) = P(A) * P(B) across sample spaces.\n4. Write Python functions calculating permutations, combinations, and conditional likelihood distributions.",
        "t1_why": "Bayes' theorem and conditional probability are tested heavily in AI/ML engineering interviews.",
        "t1_dod": "Computes posterior probabilities using Bayes' rule and verifies calculations with Python functions.",
        "t2_details": "1. Build a Naive Bayes spam email text classifier from scratch in Python.\n2. Calculate prior class probabilities and word likelihoods with Laplace smoothing applied.\n3. Evaluate classification accuracy and confusion matrix on a test corpus of emails.",
        "t2_why": "Naive Bayes classification is the foundational real-world application of conditional probability.",
        "t2_dod": "Scratch Naive Bayes classifier achieves over 85% accuracy on test spam classification."
    },

    # -------------------------------------------------------------
    # WEEK 7
    # -------------------------------------------------------------
    "Dummy Head": {
        "t1_details": "1. Instantiate dummy sentinel node to simplify head insertion and deletion pointer mechanics.\n2. Traverse linked list using current pointer while maintaining connection to previous nodes.\n3. Merge two sorted linked lists iteratively by attaching smaller node to tail.\n4. Return dummy.next as new list head, properly reclaiming dummy memory if in C++.",
        "t1_why": "Dummy heads eliminate tedious edge-case checks for null heads and single-node modifications.",
        "t1_dod": "Merges sorted linked lists using dummy head pattern without separate empty head checks.",
        "t2_details": "1. Implement an in-memory transactional singly linked list data structure with sentinel nodes.\n2. Write thread-safe append, delete_node, and search methods with mutex synchronization.\n3. Run multi-threaded stress tests verifying zero dangling pointers or segmented memory faults.",
        "t2_why": "Concurrent list structures with sentinels form the basis of kernel scheduling queues.",
        "t2_dod": "Thread-safe linked list operates without race conditions or memory leaks under stress."
    },
    "Linked List Reversal": {
        "t1_details": "1. Initialize prev = nullptr, curr = head, and next_temp pointers before starting iteration.\n2. Reverse pointer direction curr->next = prev, advancing prev and curr one step forward.\n3. Implement recursive reversal base case returning new head and rewiring tail backwards.\n4. Trace reverse operations on empty list, single node, and two-node list inputs.",
        "t1_why": "Linked list reversal is the ultimate baseline test of pointer manipulation proficiency.",
        "t1_dod": "Implements both iterative and recursive list reversal with O(1) auxiliary memory.",
        "t2_details": "1. Implement an undo/redo command history buffer utilizing a reversed linked list.\n2. Support push_action, undo_last, and redo_next operations with strict O(1) pointer updates.\n3. Write unit tests validating state integrity across fifty sequential user editor actions.",
        "t2_why": "Undo-redo state engines in desktop and web editors rely on bidirectional pointer transitions.",
        "t2_dod": "Undo/redo manager restores application state accurately across arbitrary sequence depths."
    },
    "Cycle Detection": {
        "t1_details": "1. Initialize slow pointer advancing 1 node and fast pointer advancing 2 nodes.\n2. Detect cycle presence when fast and slow pointers meet at intersection node.\n3. Reset slow pointer to head and advance both pointers to find cycle entry.\n4. Prove cycle entry formula 2(L1+L2)=L1+L2+nC mathematically on paper.",
        "t1_why": "Floyd's Tortoise and Hare cycle finding is asked universally in pointer screening rounds.",
        "t1_dod": "Detects cycles and locates exact cycle origin node in O(N) time and O(1) space.",
        "t2_details": "1. Build a dependency loop detector for software package managers like npm or pip.\n2. Model package dependencies as pointer references and identify circular dependency cycles.\n3. Print clear diagnostic cycle error messages tracing the exact loop path for developers.",
        "t2_why": "Cycle detection prevents deadlock in build systems, package managers, and task orchestrators.",
        "t2_dod": "Loop detector flags circular dependencies and outputs exact package cycle chain."
    },
    "Remove Nth Node": {
        "t1_details": "1. Position fast pointer N steps ahead of slow pointer starting from dummy node.\n2. Advance both fast and slow pointers simultaneously until fast reaches final node.\n3. Delete target node by updating slow->next = slow->next->next and deallocating memory.\n4. Test edge cases removing the head node, tail node, and single-element lists.",
        "t1_why": "One-pass two-pointer gap navigation demonstrates precise pointer positioning without double traversal.",
        "t1_dod": "Removes Nth node from end in a single pass using two-pointer gap displacement.",
        "t2_details": "1. Build an in-memory LRU eviction buffer using pointer re-linking for node removal.\n2. Implement fast node detachment and splicing to head upon access hits in O(1).\n3. Test eviction order correctness under continuous stream of incoming cache entries.",
        "t2_why": "Direct node splicing is the mechanical foundation of high-performance operating system page replacement.",
        "t2_dod": "Buffer evicts least recently accessed node with constant-time pointer re-linking operations."
    },
    "RDBMS Fundamentals": {
        "t1_details": "1. Design relational schemas with Primary Keys, Foreign Keys, Unique, and Check constraints.\n2. Explain 1NF, 2NF, 3NF, and BCNF normalization rules with concrete schema examples.\n3. Diagram entity relationship cardinality including one-to-one, one-to-many, and many-to-many.\n4. Identify potential anomalies including insertion, update, and deletion anomalies in denormalized tables.",
        "t1_why": "Relational schema design and normalization are fundamental SDE interview requirements.",
        "t1_dod": "Draws 3NF relational schemas with integrity constraints and explains anomaly prevention.",
        "t2_details": "1. Write PostgreSQL DDL scripts creating tables with constraints, indexes, and cascades.\n2. Insert sample test data verifying foreign key cascade deletes and uniqueness violations.\n3. Verify schema structure and constraints using psql meta-commands and information schema.",
        "t2_why": "Writing robust schema DDL scripts ensures data integrity in production database backends.",
        "t2_dod": "PostgreSQL DDL script executes cleanly enforcing primary, foreign, and unique key constraints."
    },
    "SQL DDL": {
        "t1_details": "1. Write CREATE TABLE statements with appropriate column data types and default values.\n2. Execute ALTER TABLE operations adding columns, renaming fields, and dropping constraints.\n3. Write SELECT queries utilizing WHERE filtering, ORDER BY sorting, and LIMIT pagination.\n4. Practice LIKE wildcard patterns and NULL value comparisons with IS NULL operators.",
        "t1_why": "SQL querying is evaluated in almost every data engineering and backend developer interview.",
        "t1_dod": "Writes clean DDL and foundational SELECT queries with filtering, sorting, and pagination.",
        "t2_details": "1. Set up a local PostgreSQL Docker container and initialize database seed tables.\n2. Write Python scripts using psycopg2 or asyncpg executing parameterized query lookups.\n3. Prevent SQL injection vulnerabilities by validating parameterized inputs across queries.",
        "t2_why": "Parameterized queries protect backend database applications against malicious SQL injection attacks.",
        "t2_dod": "Python database module executes parameterized queries safely against local PostgreSQL container."
    },

    # -------------------------------------------------------------
    # WEEK 8
    # -------------------------------------------------------------
    "Valid Parentheses": {
        "t1_details": "1. Use a stack to push expected closing brackets when encountering opening brackets.\n2. Pop stack and assert match when closing brackets are encountered in traversal.\n3. Terminate early with false if stack is empty when closing bracket arrives.\n4. Check that stack is completely empty after traversal to ensure balance.",
        "t1_why": "Valid Parentheses is the quintessential stack problem testing LIFO matching behavior.",
        "t1_dod": "Validates nested bracket strings in O(N) time and O(N) space handling all mismatch edge cases.",
        "t2_details": "1. Implement a lightweight HTML/XML syntax tag validator using an explicit stack.\n2. Parse opening, closing, and self-closing tags flagging mismatched and unclosed tags.\n3. Print exact line and column numbers where syntax nesting errors occur in markup.",
        "t2_why": "Compiler AST tokenizers and markup parsers use stack-based bracket and tag matchers.",
        "t2_dod": "Tag validator accurately detects mismatched markup tags with line-level error reporting."
    },
    "Min Stack": {
        "t1_details": "1. Design stack supporting push, pop, top, and getMin all operating in O(1) time.\n2. Maintain parallel auxiliary stack recording current minimum value at each element depth.\n3. Alternatively store value-difference deltas to achieve O(1) space optimization.\n4. Handle duplicate minimum elements without premature minimum value eviction.",
        "t1_why": "Min Stack tests O(1) state caching strategies alongside standard LIFO stack operations.",
        "t1_dod": "Implements Min Stack with O(1) time complexity across all operations and no regressions.",
        "t2_details": "1. Implement a high-performance metrics aggregation buffer tracking real-time latency minimums.\n2. Expose get_min_latency and push_sample APIs returning instant O(1) metrics.\n3. Write multi-threaded unit tests validating statistical accuracy during continuous telemetry ingestion.",
        "t2_why": "Real-time observability systems require sub-millisecond retrieval of minimum and maximum latency values.",
        "t2_dod": "Metrics buffer tracks rolling minimum values with constant time retrieval under stress."
    },
    "Daily Temperatures": {
        "t1_details": "1. Maintain a monotonic decreasing stack storing indices of unresolved cold temperatures.\n2. When current temperature exceeds stack top, pop index and calculate distance delta.\n3. Record distance into output array at popped index and repeat until monotonic.\n4. Push current index onto stack and verify remaining stack entries get zero distance.",
        "t1_why": "Monotonic stack is a high-value interview pattern solving next greater element problems in O(N).",
        "t1_dod": "Computes days until warmer temperature in O(N) single pass using monotonic decreasing stack.",
        "t2_details": "1. Build a financial market breakout detector identifying days until stock price breaks resistance.\n2. Process historical daily closing prices using monotonic stack logic to find next breakouts.\n3. Generate summary statistics on average days to breakout across various stock sectors.",
        "t2_why": "Breakout analysis in quantitative trading engines relies on next greater element monotonic scans.",
        "t2_dod": "Breakout detector computes holding periods to next price highs across market time series."
    },
    "Next Greater Element": {
        "t1_details": "1. Traverse array from right to left maintaining monotonic decreasing stack of values.\n2. Pop elements from stack that are smaller than or equal to current element.\n3. Assign stack top as next greater element, or -1 if stack is empty.\n4. Implement queue using two stacks by transferring elements between in-stack and out-stack.",
        "t1_why": "Next Greater Element and two-stack queues evaluate core data structure transposition skills.",
        "t1_dod": "Solves Next Greater Element in O(N) and implements two-stack queue with amortized O(1) operations.",
        "t2_details": "1. Build an asynchronous event job queue worker powered by two internal stacks.\n2. Support enqueue and dequeue operations ensuring strict FIFO processing order for jobs.\n3. Measure throughput and verify amortized O(1) performance across 100,000 enqueued tasks.",
        "t2_why": "Queue-from-stack mechanics illustrate amortized analysis in real-world asynchronous job processors.",
        "t2_dod": "Two-stack job queue delivers verified FIFO ordering and amortized constant-time task processing."
    },
    "SQL Joins": {
        "t1_details": "1. Diagram Venn diagrams showing INNER, LEFT, RIGHT, and FULL OUTER join sets.\n2. Write SQL queries joining multiple tables with ON clause equality match conditions.\n3. Contrast LEFT JOIN retaining unmatched left rows with INNER JOIN filtering them.\n4. Handle NULL values produced by outer joins using COALESCE and IFNULL functions.",
        "t1_why": "Multi-table relational joins are tested in every technical interview involving data or backends.",
        "t1_dod": "Writes complex multi-table SQL joins and explains exact row retention across join types.",
        "t2_details": "1. Write analytical SQL queries joining Users, Orders, and Products tables in PostgreSQL.\n2. Analyze query execution plans using EXPLAIN ANALYZE to observe Hash and Nested Loop joins.\n3. Add foreign key indexes to eliminate expensive sequential table scans during join execution.",
        "t2_why": "Optimizing relational join performance prevents database bottlenecks in production web applications.",
        "t2_dod": "EXPLAIN ANALYZE confirms index scan usage and reduced query execution time on joins."
    },
    "SQL Aggregations": {
        "t1_details": "1. Write queries combining COUNT, SUM, AVG, MIN, and MAX aggregation functions.\n2. Group rows using GROUP BY and filter grouped results using HAVING clauses.\n3. Contrast WHERE filtering individual records against HAVING filtering aggregated groups.\n4. Explain database normalization trade-offs between storage efficiency and join query overhead.",
        "t1_why": "Aggregation queries and GROUP BY mechanics are staple questions for data and backend roles.",
        "t1_dod": "Constructs multi-level GROUP BY queries with HAVING filters and aggregates correctly.",
        "t2_details": "1. Build an analytics reporting query generating monthly revenue and customer retention metrics.\n2. Use window functions including ROW_NUMBER, RANK, and DENSE_RANK over partitioned data.\n3. Benchmark window function execution performance against self-join aggregation queries.",
        "t2_why": "Window functions and aggregations power executive dashboards and business intelligence reporting.",
        "t2_dod": "Monthly analytics query computes partitioned revenue metrics passing reconciliation checks."
    },

    # -------------------------------------------------------------
    # WEEK 9
    # -------------------------------------------------------------
    "Koko Eating Bananas": {
        "t1_details": "1. Identify monotonic search space for eating speed k between 1 and max(piles).\n2. Implement helper function calculate_hours(k) summing ceil(pile / k) for all piles.\n3. Binary search on speed k: if valid within H hours, search left; else right.\n4. Prove O(N * log(max(piles))) time complexity and O(1) space consumption.",
        "t1_why": "Binary search on answer space is an advanced, high-yield interview pattern.",
        "t1_dod": "Determines minimum eating speed in O(N log M) using binary search on answer space.",
        "t2_details": "1. Implement a cloud server autoscaler finding minimum worker instances to process queues.\n2. Simulate job processing deadlines using binary search on answer space for worker count.\n3. Output optimal cluster capacity minimizing cloud billing costs while meeting SLA targets.",
        "t2_why": "Capacity planning and cloud cost minimization rely on monotonic binary search optimization.",
        "t2_dod": "Autoscaler calculation determines minimal server instance count meeting SLA processing deadlines."
    },
    "Ship Packages": {
        "t1_details": "1. Establish search space bounds: low = max(weights) and high = sum(weights).\n2. Write feasibility check days_needed(capacity) counting trips needed with running load.\n3. Binary search on capacity: adjust low and high bounds based on feasibility result.\n4. Return minimal feasible ship capacity satisfying maximum delivery days constraint D.",
        "t1_why": "Package shipping is a canonical monotonic predicate problem asked by major tech firms.",
        "t1_dod": "Calculates minimal package ship capacity within D days using binary search predicate.",
        "t2_details": "1. Build a distributed batch data partitioner splitting workloads evenly across N worker nodes.\n2. Use binary search on chunk size to balance memory consumption across worker machines.\n3. Verify partition size balance and benchmark load distribution across mock cluster nodes.",
        "t2_why": "Distributed stream partitioners balance cluster node memory to avoid out-of-memory crashes.",
        "t2_dod": "Batch partitioner divides large datasets across cluster nodes with balanced memory distribution."
    },
    "Process vs Thread": {
        "t1_details": "1. Contrast process memory isolation (text, data, heap, stack) against shared thread memory.\n2. Trace OS context switching mechanics: saving PCB registers, flushing TLB, and cache misses.\n3. Explain IPC mechanisms: pipes, shared memory, message queues, and Unix domain sockets.\n4. Compare context switch overhead of user-level threads versus kernel-level threads.",
        "t1_why": "Concurrency, memory spaces, and OS context switching are mandatory core CS interview topics.",
        "t1_dod": "Articulates memory layout differences, PCB state, and context switch costs with technical precision.",
        "t2_details": "1. Write a C++ program spawning multiple processes with fork() and threads with std::thread.\n2. Benchmark context switching latency and memory footprint between processes and threads.\n3. Demonstrate race conditions on shared memory and resolve them using std::mutex locks.",
        "t2_why": "Multithreaded programming requires precise synchronization to prevent data races and memory corruption.",
        "t2_dod": "C++ benchmarking program demonstrates thread memory sharing and verified mutex synchronization."
    },
    "CPU Scheduling": {
        "t1_details": "1. Diagram Gantt charts for FCFS, SJF, Round Robin, and Priority scheduling algorithms.\n2. Calculate average turnaround time, waiting time, and response time across scheduling policies.\n3. State Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.\n4. Explain deadlock avoidance with Dijkstra's Banker's algorithm and resource allocation graphs.",
        "t1_why": "Operating systems scheduling and deadlock prevention are standard questions in SDE rounds.",
        "t1_dod": "Calculates scheduling metrics on Gantt charts and explains the 4 Coffman deadlock conditions.",
        "t2_details": "1. Implement a priority-based Round Robin task scheduler simulator in Python or C++.\n2. Simulate time quantum preemption and task context switching across priority queues.\n3. Measure and log average latency and throughput under bursty task arrival workloads.",
        "t2_why": "Scheduler simulation provides concrete insight into OS task dispatching and latency management.",
        "t2_dod": "Task scheduler simulator models Round Robin preemption and outputs verified scheduling metrics."
    },
    "Linear & Logistic Regression": {
        "t1_details": "1. Derive Ordinary Least Squares closed-form normal equation (X^T X)^-1 X^T y.\n2. Explain logistic regression sigmoid function mapping linear combinations to probabilities [0, 1].\n3. Derive binary cross-entropy log loss function and compute gradient updates.\n4. Train baseline regression and classification models using scikit-learn on sample datasets.",
        "t1_why": "Linear and logistic regressions are the fundamental building blocks of statistical machine learning.",
        "t1_dod": "Derives regression mathematics and trains scikit-learn models evaluating MSE and log-loss.",
        "t2_details": "1. Build an end-to-end customer churn prediction pipeline using scikit-learn Pipeline and ColumnTransformer.\n2. Implement feature scaling, one-hot encoding, and hyperparameter tuning with GridSearchCV.\n3. Evaluate model generalization on held-out test splits reporting accuracy and ROC-AUC scores.",
        "t2_why": "Scikit-learn pipelines prevent feature leakage and streamline model deployments into production.",
        "t2_dod": "Customer churn prediction pipeline executes cleanly with cross-validated performance metrics."
    },
    "Resume Version 1": {
        "t1_details": "1. Structure resume using clean single-column format prioritizing Education, Skills, and Projects.\n2. Draft 3 technical bullet points per project using Google XYZ formula metrics.\n3. Audit resume for specific technical keywords: C++, Python, PostgreSQL, Data Structures, Algorithms.\n4. Eliminate generic adjectives, fluff, and subjective soft skill claims from bullet points.",
        "t1_why": "A crisp, impact-oriented technical resume is required to pass automated ATS screeners.",
        "t1_dod": "Produces one-page technical resume draft with quantifiable XYZ project bullet points.",
        "t2_details": "1. Audit GitHub profile pins ensuring prominent display of top capstone project repositories.\n2. Verify each pinned repository features an architecture diagram, installation steps, and test instructions.\n3. Clean up commit histories, remove broken links, and update LinkedIn profile headline and skills.",
        "t2_why": "Technical recruiters and hiring managers review GitHub profiles to verify real coding ability.",
        "t2_dod": "GitHub and LinkedIn profiles updated with polished project links and technical descriptions."
    },

    # -------------------------------------------------------------
    # WEEK 10
    # -------------------------------------------------------------
    "Binary Tree Anatomy": {
        "t1_details": "1. Define TreeNode struct with val, left, and right pointers in local IDE.\n2. Implement recursive Pre-Order (NLR), In-Order (LNR), and Post-Order (LRN) traversals.\n3. Implement iterative In-Order traversal using an explicit stack without recursion.\n4. Trace time complexity O(N) and space complexity O(H) where H is tree height.",
        "t1_why": "Tree traversals form the structural foundation of almost all hierarchical algorithmic problems.",
        "t1_dod": "Implements all three recursive traversals plus iterative in-order traversal using an explicit stack.",
        "t2_details": "1. Build a binary expression tree parser in C++ evaluating mathematical arithmetic expressions.\n2. Parse postfix arithmetic strings into binary syntax trees and compute final numeric values.\n3. Print infix, prefix, and postfix representations of expressions by traversing the tree.",
        "t2_why": "Expression trees power SQL query parsing engines, spreadsheet formula evaluators, and compilers.",
        "t2_dod": "Expression tree accurately parses mathematical strings and evaluates arithmetic expressions."
    },
    "Invert Binary Tree": {
        "t1_details": "1. Swap left and right child pointers of current node recursively or iteratively.\n2. Traverse subtrees swapping children down to null leaf pointer base cases.\n3. Calculate maximum depth of binary tree using 1 + max(depth(left), depth(right)).\n4. Test on skewed trees, symmetric trees, single-node trees, and empty tree inputs.",
        "t1_why": "Tree inversion and depth calculation test core post-order tree recursion and pointer swapping.",
        "t1_dod": "Inverts binary trees and calculates maximum tree depth in O(N) time and O(H) space.",
        "t2_details": "1. Build a DOM tree sanitizer parsing and recursively transforming nested document nodes.\n2. Implement mirror reflection transformations on hierarchical document tree layouts.\n3. Benchmark tree transformation latency across deeply nested 10,000-node synthetic trees.",
        "t2_why": "Recursive DOM manipulation is fundamental for UI rendering engines and document layout compilers.",
        "t2_dod": "DOM sanitizer traverses and transforms hierarchical tree structures with zero memory leaks."
    },
    "Diameter of Binary Tree": {
        "t1_details": "1. Define diameter as length of longest path between any two nodes in tree.\n2. Write recursive helper returning height while updating global maximum diameter (left_h + right_h).\n3. Implement balanced tree check verifying height difference abs(left_h - right_h) <= 1.\n4. Optimize balanced check to return -1 immediately upon encountering unbalanced subtrees.",
        "t1_why": "Diameter calculation tests bottom-up post-order recursion combining multiple subtree metrics.",
        "t1_dod": "Calculates binary tree diameter and checks balance in O(N) single-pass recursion.",
        "t2_details": "1. Build a network latency router computing critical path delay through hierarchical networks.\n2. Model network routers as tree nodes and calculate maximum transit latency between endpoints.\n3. Write unit tests validating critical path calculations across balanced and asymmetric networks.",
        "t2_why": "Critical path analysis in hierarchical networks determines maximum packet propagation latency.",
        "t2_dod": "Network latency router correctly computes maximum propagation path through tree hierarchies."
    },
    "Level Order Traversal": {
        "t1_details": "1. Initialize std::queue or collections.deque pushing tree root node pointer.\n2. Process tree level by level using queue length loop snapshot at each depth.\n3. Dequeue nodes, record values into level array, and enqueue valid left and right children.\n4. Prove O(N) time complexity and O(W) space complexity where W is maximum tree width.",
        "t1_why": "Level order traversal is the canonical BFS pattern applied to trees, graphs, and search problems.",
        "t1_dod": "Returns 2D level-by-level array using queue-based BFS without mixing tree levels.",
        "t2_details": "1. Implement a hierarchical organizational chart parser exporting reporting tiers into JSON.\n2. Group corporate employees by organizational management level using queue-based BFS.\n3. Render structured ASCII organizational hierarchy diagrams in the terminal output.",
        "t2_why": "Hierarchical level grouping is widely used in organizational modeling and access control trees.",
        "t2_dod": "Org chart parser groups employee hierarchies by tier outputting valid structured JSON."
    },
    "HTTP Basics": {
        "t1_details": "1. Diagram HTTP request and response lifecycles showing headers, verbs, and payload bodies.\n2. Explain HTTP methods: GET, POST, PUT, PATCH, DELETE with idempotency characteristics.\n3. Memorize HTTP status codes: 200, 201, 400, 401, 403, 404, 409, 500, and 503.\n4. Inspect HTTP headers including Content-Type, Authorization, Cache-Control, and CORS headers.",
        "t1_why": "HTTP fundamentals and RESTful status code discipline are required for backend developer interviews.",
        "t1_dod": "Explains RESTful principles, idempotency, and status codes accurately with zero ambiguity.",
        "t2_details": "1. Write raw HTTP requests using curl inspecting verbose network request and response headers.\n2. Configure CORS middleware on a local server permitting cross-origin browser requests.\n3. Test authentication headers and simulate 401 Unauthorized and 403 Forbidden responses.",
        "t2_why": "Diagnosing CORS and HTTP header errors is a daily operational responsibility for web developers.",
        "t2_dod": "Curl commands demonstrate verbose HTTP header inspection and verified CORS configuration."
    },
    "Node.js Architecture": {
        "t1_details": "1. Diagram Node.js event loop phases: Timers, Pending Callbacks, Poll, Check, Close.\n2. Contrast microtask queue (process.nextTick, Promises) against macrotask queue (setTimeout).\n3. Explain V8 JavaScript engine memory management and libuv asynchronous thread pool mechanics.\n4. Trace execution ordering of synchronous code, process.nextTick, Promise.then, and setTimeout.",
        "t1_why": "Node.js event loop ordering and asynchronous non-blocking I/O are staple backend interview questions.",
        "t1_dod": "Correctly predicts asynchronous task execution order across event loop phases without error.",
        "t2_details": "1. Scaffold a Node.js Express server with structured routes, controllers, and error middleware.\n2. Implement asynchronous request handlers with try/catch blocks and centralized error handling.\n3. Benchmark Express server request throughput under load using autocannon or Apache Bench.",
        "t2_why": "Scaffolding modular Express backends with robust error middleware prepares you for SDE capstones.",
        "t2_dod": "Express server scaffolds modular architecture passing automated health-check endpoints."
    },

    # -------------------------------------------------------------
    # WEEK 11
    # -------------------------------------------------------------
    "Lowest Common Ancestor": {
        "t1_details": "1. Exploit BST ordered property: if p and q < root, search left subtree.\n2. If p and q > root, search right; otherwise root is the LCA.\n3. Implement standard Binary Tree LCA without BST properties using post-order bubbling.\n4. Trace time complexity O(H) for BST versus O(N) for general binary trees.",
        "t1_why": "Lowest Common Ancestor tests your ability to exploit search tree ordering versus general recursion.",
        "t1_dod": "Solves LCA on both BST and general binary trees explaining split-point mechanics.",
        "t2_details": "1. Build a corporate access control permission resolver finding lowest shared manager node.\n2. Model company reporting hierarchies as trees and query shared authority endpoints.\n3. Benchmark LCA query latency caching ancestor paths for sub-millisecond lookups.",
        "t2_why": "LCA algorithms resolve hierarchical permissions in enterprise access management systems.",
        "t2_dod": "Access control resolver identifies lowest common authorizing manager across organizational trees."
    },
    "Validate Binary Search Tree": {
        "t1_details": "1. Define valid BST invariant: left subtree < root and right subtree > root.\n2. Pass min_val and max_val constraint bounds down recursive traversal updates.\n3. Guard against 32-bit integer overflow by initializing bounds with 64-bit integer limits.\n4. Alternative check: verify that in-order traversal values are strictly monotonically increasing.",
        "t1_why": "Validating BSTs tests boundary inheritance and prevents the common local-only comparison trap.",
        "t1_dod": "Validates BST using min/max bounding invariants and catches all-subtree violation traps.",
        "t2_details": "1. Build a data validation engine verifying sorted order across partitioned database records.\n2. Write unit tests evaluating trees with locally valid but globally invalid subtrees.\n3. Profile validation speed and memory across 50,000-node synthetic tree topologies.",
        "t2_why": "Database storage engines validate B-tree index invariants to prevent corrupted data retrieval.",
        "t2_dod": "Validation engine flags inverted subtree keys and verifies valid binary search trees."
    },
    "Kth Smallest Element in BST": {
        "t1_details": "1. Utilize in-order traversal (Left, Root, Right) yielding naturally sorted element sequence.\n2. Maintain running count decrementing k as each node is visited in traversal.\n3. Terminate traversal immediately once count reaches k avoiding unnecessary subtree scans.\n4. Implement iterative stack-based in-order traversal to achieve O(H + k) time complexity.",
        "t1_why": "Extracting the Kth element via in-order traversal tests early termination and traversal control.",
        "t1_dod": "Finds Kth smallest element using iterative in-order traversal with early termination.",
        "t2_details": "1. Implement an in-memory leaderboard ranking system backed by an augmented BST.\n2. Store subtree node counts at each node enabling O(log N) percentile rank lookups.\n3. Test ranking queries and player score updates under continuous insertion workloads.",
        "t2_why": "Augmented trees power gaming leaderboards and financial percentile ranking services.",
        "t2_dod": "Leaderboard returns player rank and score percentiles in O(log N) lookup time."
    },
    "PostgreSQL Setup": {
        "t1_details": "1. Install and configure PostgreSQL service setting up dedicated database users and privileges.\n2. Configure connection pool parameters: min connections, max connections, idle timeout limits.\n3. Connect Node.js backend to PostgreSQL using pg library with connection pooling.\n4. Handle database client connection errors and release acquired clients back to pool.",
        "t1_why": "Database connection pooling and connection leak prevention are vital backend competencies.",
        "t1_dod": "Configures PostgreSQL connection pool and demonstrates safe client checkout and release.",
        "t2_details": "1. Write database migration scripts creating Users, Roles, and Permissions tables.\n2. Implement automated migration runners executing up and down schema revision scripts.\n3. Stress test connection pool under concurrent simulated requests verifying zero connection leaks.",
        "t2_why": "Automated schema migrations ensure reproducible database environments across deployment stages.",
        "t2_dod": "Migration runner successfully applies and rolls back database schema revisions."
    },
    "REST API Design": {
        "t1_details": "1. Design resource-oriented URL paths: /api/v1/students, /api/v1/students/:id/applications.\n2. Implement Express Router grouping endpoints by resource domain with clean separation.\n3. Enforce request body validation using middleware and return standardized JSON responses.\n4. Implement consistent HTTP error response formats with timestamps, error codes, and messages.",
        "t1_why": "Clean REST API design, validation, and status code consistency are core backend expectations.",
        "t1_dod": "Builds modular Express router handling CRUD endpoints with standardized JSON responses.",
        "t2_details": "1. Write automated API integration tests using Supertest and Jest testing CRUD operations.\n2. Validate response schemas, HTTP status codes, and error payloads on invalid inputs.\n3. Generate interactive OpenAPI / Swagger API documentation describing endpoints and schemas.",
        "t2_why": "Automated API contract testing and Swagger documentation enable smooth frontend collaboration.",
        "t2_dod": "Supertest test suite verifies all CRUD endpoints with passing status codes and Swagger docs."
    },
    "Placement Portal ER Diagram": {
        "t1_details": "1. Design relational ER diagram for Placement Portal: Students, Companies, Jobs, Applications.\n2. Define primary keys, foreign keys, cardinality relationships, and indexing strategies.\n3. Write complete PostgreSQL DDL schema with check constraints and enum status types.\n4. Review schema against normalization rules to prevent redundant company and student data.",
        "t1_why": "Architecting real-world database schemas demonstrates production software engineering readiness.",
        "t1_dod": "Completes ER diagram and executes PostgreSQL DDL schema for Placement Management Portal.",
        "t2_details": "1. Seed Placement Portal database with realistic mock data using faker libraries.\n2. Write complex SQL test queries verifying student eligibility and application status tracking.\n3. Commit database schema, migrations, and seed scripts to capstone GitHub repository.",
        "t2_why": "Seeding databases with representative test data exposes relational query bottlenecks early.",
        "t2_dod": "Capstone repository contains verified DDL schema scripts and functional seed data generators."
    },

    # -------------------------------------------------------------
    # WEEK 12
    # -------------------------------------------------------------
    "Heap Structure": {
        "t1_details": "1. Diagram array representation of complete binary heaps: parent(i)=(i-1)/2, left=2i+1, right=2i+2.\n2. Implement sift-up (percolate up) and sift-down (percolate down) heap maintenance functions.\n3. Prove build-heap algorithm operates in linear O(N) time complexity using summation series.\n4. Practice C++ std::priority_queue operations with default max-heap and std::greater min-heap.",
        "t1_why": "Binary heap internals, sift operations, and linear build-heap are top interview favorites.",
        "t1_dod": "Builds a min-heap from scratch with sift-up and sift-down operations in O(N) time.",
        "t2_details": "1. Implement a priority-based background job queue worker in C++ or Python.\n2. Enqueue asynchronous tasks with varied priority weights and execute highest-priority jobs first.\n3. Benchmark job insertion and extraction throughput under continuous 50,000-task workloads.",
        "t2_why": "Priority heaps drive real-world task dispatchers like Celery, Kubernetes schedulers, and network QoS.",
        "t2_dod": "Priority job queue processes tasks in strict priority order with sub-millisecond dispatching."
    },
    "Kth Largest Element": {
        "t1_details": "1. Solve Kth largest element using min-heap of size k in O(N log k) time.\n2. Maintain min-heap size k: when exceeding k, pop smallest element leaving largest intact.\n3. Implement QuickSelect algorithm with Lomuto or Hoare partitioning achieving O(N) average time.\n4. Contrast O(N) average QuickSelect against O(N log k) heap approach regarding worst-case guarantees.",
        "t1_why": "Comparing Min-Heap against QuickSelect tests nuanced algorithmic trade-off analysis.",
        "t1_dod": "Implements both Min-Heap and QuickSelect solutions defending time/space trade-offs.",
        "t2_details": "1. Build a real-time streaming analytics percentile calculator tracking top 100 latency outliers.\n2. Process continuous synthetic latency streams retaining top elements in bounded min-heap.\n3. Benchmark memory consumption and insertion latency against unbounded sorting approaches.",
        "t2_why": "Streaming telemetry systems use bounded heaps to identify high-latency outliers in real-time.",
        "t2_dod": "Streaming percentile calculator isolates top-k latency spikes with constant memory overhead."
    },
    "Top K Frequent Elements": {
        "t1_details": "1. Count element occurrences using hash map frequency counter in O(N) time.\n2. Push pairs into size-k min-heap, popping lowest frequency when size exceeds k.\n3. Implement Bucket Sort alternative grouping numbers into frequency array indices in O(N).\n4. Handle negative values, uniform frequencies, and boundary k = N edge cases.",
        "t1_why": "Top K Frequent Elements evaluates frequency counting, heap management, and bucket sorting.",
        "t1_dod": "Solves Top K Frequent using both Min-Heap O(N log k) and Bucket Sort O(N) time.",
        "t2_details": "1. Build a search engine query autocomplete trending frequency aggregator in Python.\n2. Ingest mock search log streams aggregating top-k trending user search queries.\n3. Expose fast query API returning top trending terms updated within sliding minute windows.",
        "t2_why": "Trending query aggregators power search suggestions and analytics dashboards across major platforms.",
        "t2_dod": "Trending query engine returns top-k searched queries with sub-second sliding window updates."
    },
    "Bcrypt Password Hashing": {
        "t1_details": "1. Explain cryptographic hashing principles: one-way functions, collision resistance, and pre-image resistance.\n2. Explain why fast hashing algorithms like MD5/SHA256 are vulnerable to GPU brute-force attacks.\n3. Describe Bcrypt adaptive cost factor, salt generation, and internal Blowfish-based key derivation.\n4. Implement password registration and verification using bcrypt library in Node.js.",
        "t1_why": "Secure authentication and password storage mechanics are essential for every software engineer.",
        "t1_dod": "Implements secure bcrypt hashing with salt rounds and explains GPU resistance mechanisms.",
        "t2_details": "1. Benchmark bcrypt hash generation latency across varying salt rounds from 8 to 14.\n2. Select optimal salt rounds balancing server authentication latency and brute-force protection.\n3. Write automated unit tests verifying password hashing and invalid password rejection.",
        "t2_why": "Balancing CPU cost factors against brute-force defense is a vital production security decision.",
        "t2_dod": "Benchmark report documents optimal bcrypt salt rounds balancing login latency and security."
    },
    "JWT Architecture": {
        "t1_details": "1. Deconstruct JWT structure: Header (algorithm), Payload (claims), and Signature components.\n2. Contrast symmetric signing (HS256) with secret key versus asymmetric signing (RS256) with keypairs.\n3. Design token lifecycle strategy: short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d).\n4. Trace Refresh Token rotation mechanics and token revocation blacklist strategies.",
        "t1_why": "Stateless JWT authentication architecture is tested in modern backend developer interviews.",
        "t1_dod": "Diagrams JWT structure, verification signature math, and token refresh lifecycle.",
        "t2_details": "1. Build Express authentication middleware verifying JWT Bearer tokens and extracting user context.\n2. Implement protected API endpoints accessible only to authenticated users with valid roles.\n3. Write automated tests simulating expired tokens and unauthorized access attempts.",
        "t2_why": "Secure auth middleware prevents unauthorized access to sensitive application data and endpoints.",
        "t2_dod": "Express auth middleware guards protected routes rejecting expired or forged tokens."
    },
    "User Registration & Login": {
        "t1_details": "1. Implement student registration endpoint hashing passwords with bcrypt before database insertion.\n2. Build login endpoint validating email and password, issuing access and refresh JWT tokens.\n3. Implement refresh token rotation endpoint issuing new access token upon presenting valid refresh token.\n4. Write input validation middleware checking email formats, password strength, and duplicate accounts.",
        "t1_why": "Building production authentication endpoints is a must-have milestone for full-stack engineering.",
        "t1_dod": "Implements secure registration and login endpoints with JWT token issuance and validation.",
        "t2_details": "1. Write end-to-end integration tests for auth endpoints using Postman or Supertest.\n2. Test security edge cases including SQL injection attempts, expired tokens, and invalid signatures.\n3. Store refresh tokens in HTTP-only secure cookies protecting against cross-site scripting (XSS).",
        "t2_why": "Storing tokens in HTTP-only cookies safeguards authentication against frontend script theft.",
        "t2_dod": "Auth integration suite tests login flows and confirms HTTP-only cookie security."
    },

    # -------------------------------------------------------------
    # WEEK 13
    # -------------------------------------------------------------
    "Graph Representations": {
        "t1_details": "1. Compare Adjacency Matrix O(V^2) space against Adjacency List O(V + E) space.\n2. Implement graph representation using hash map of adjacency lists in code.\n3. Represent directed, undirected, and weighted graphs with edge weight structures.\n4. Trace neighbor iteration efficiency and edge existence lookup costs across both formats.",
        "t1_why": "Selecting optimal graph representations is the prerequisite for all graph traversal algorithms.",
        "t1_dod": "Constructs adjacency lists for directed/undirected graphs and justifies memory trade-offs.",
        "t2_details": "1. Build a social network connection graph modeling user follower and friend connections.\n2. Implement graph query methods finding mutual friends and degrees of separation.\n3. Benchmark memory footprint and query latency on synthetic 10,000-user graph topologies.",
        "t2_why": "Social graphs and recommendation engines depend on memory-efficient adjacency representations.",
        "t2_dod": "Social graph module correctly identifies mutual connections and shortest degree separations."
    },
    "Number of Islands": {
        "t1_details": "1. Iterate 2D grid cells initiating DFS/BFS when encountering unvisited land cell '1'.\n2. Traverse adjacent horizontal and vertical neighbors marking visited land cells in-place to '0'.\n3. Increment island count each time a new connected component exploration initiates.\n4. Prove O(M * N) time complexity and O(M * N) worst-case recursion stack space.",
        "t1_why": "Number of Islands is the most iconic 2D grid connected component interview problem.",
        "t1_dod": "Counts connected 2D grid components in O(M*N) time with in-place visited marking.",
        "t2_details": "1. Build a satellite imagery landmass segmentation tool identifying contiguous land terrain clusters.\n2. Process binary raster grid images and calculate individual landmass area metrics.\n3. Export segmented island coordinates and bounding boxes into GeoJSON geographic data.",
        "t2_why": "Connected component labeling powers satellite imagery analysis, medical scans, and OCR.",
        "t2_dod": "Image segmentation tool accurately detects terrain clusters and generates valid GeoJSON output."
    },
    "Max Area of Island": {
        "t1_details": "1. Modify grid DFS/BFS helper function to return integer count of connected land cells.\n2. Accumulate area: 1 plus sum of areas from valid cardinal neighbors.\n3. Update global maximum area variable after each connected component traversal finishes.\n4. Handle edge cases with zero islands, full grids of land, and diagonal disjoint cells.",
        "t1_why": "Max Area of Island evaluates component size accumulation during recursive grid traversals.",
        "t1_dod": "Calculates maximum island component size in O(M*N) time without auxiliary matrices.",
        "t2_details": "1. Build a medical scan lesion detector computing the largest contiguous tumor surface area.\n2. Ingest 2D density slice matrices and flag connected abnormal cellular regions.\n3. Output diagnostic metrics summarizing largest lesion area and count of detected clusters.",
        "t2_why": "Contiguous area quantification is critical for clinical imaging diagnostics and anomaly detection.",
        "t2_dod": "Lesion detector calculates largest tumor surface area matching verified ground truth benchmarks."
    },
    "Clone Graph": {
        "t1_details": "1. Use a hash map mapping original node pointers to newly instantiated cloned node copies.\n2. Implement DFS/BFS traversal creating cloned nodes and recursively populating cloned neighbors.\n3. Lookup visited map before cloning to prevent infinite recursion on graph cycles.\n4. Handle single node graphs, empty graph inputs, and self-referencing loop connections.",
        "t1_why": "Clone Graph evaluates deep object copying, pointer preservation, and cyclic graph traversal.",
        "t1_dod": "Deep clones arbitrary graphs preserving cyclic topology using visited node hash maps.",
        "t2_details": "1. Build a deep copy serialization engine for complex state machine workflow configurations.\n2. Clone arbitrary interconnected workflow nodes and transition links without reference corruption.\n3. Write unit tests verifying cloned graphs are completely decoupled from original memory references.",
        "t2_why": "Workflow engines require safe deep cloning of execution graphs for sandboxed task executions.",
        "t2_dod": "Serialization engine clones interconnected state machine graphs with zero shared memory references."
    },
    "Student Profile CRUD": {
        "t1_details": "1. Design PostgreSQL relational tables for Student Profiles with GPA and resume fields.\n2. Implement backend Express endpoints: POST /profile, GET /profile, PUT /profile.\n3. Enforce academic validation rules ensuring valid GPA ranges, graduation dates, and degree types.\n4. Write error handling middleware returning descriptive field-level validation error responses.",
        "t1_why": "Building production CRUD endpoints with strict validation is essential for full-stack engineering.",
        "t1_dod": "Implements validated student profile CRUD endpoints with complete academic constraint checks.",
        "t2_details": "1. Build file upload middleware using Multer supporting PDF student resume uploads.\n2. Store uploaded PDF resumes to local disk or cloud bucket validating file MIME types.\n3. Link stored file URLs to student profile database records and write automated upload tests.",
        "t2_why": "Secure file upload handling and storage integration is a staple requirement in web applications.",
        "t2_dod": "Profile service uploads and links PDF resumes to student profiles passing MIME validations."
    },
    "K-Means Clustering": {
        "t1_details": "1. Initialize k cluster centroids randomly or using K-Means++ distance-weighted sampling.\n2. Assign each data point to closest centroid using Euclidean distance minimization.\n3. Recompute centroid coordinates as mean of all data points assigned to that cluster.\n4. Repeat assignment and update steps until centroid movement falls below convergence epsilon.",
        "t1_why": "K-Means clustering and centroid optimization are core unsupervised machine learning topics.",
        "t1_dod": "Implements K-Means clustering from scratch in Python and verifies convergence behavior.",
        "t2_details": "1. Implement Silhouette Score and Elbow Method inertia calculations evaluating optimal cluster count k.\n2. Cluster customer transaction profiles using scikit-learn K-Means identifying behavioral segments.\n3. Visualize cluster scatter plots and silhouette coefficient plots using Seaborn.",
        "t2_why": "Unsupervised customer segmentation guides targeted marketing strategies and anomaly detection.",
        "t2_dod": "Customer segmentation script identifies optimal k using silhouette analysis with clear visualizations."
    },

    # -------------------------------------------------------------
    # WEEK 14
    # -------------------------------------------------------------
    "Topological Sort": {
        "t1_details": "1. Compute in-degree (number of incoming directed edges) for every vertex in graph.\n2. Initialize queue with all vertices possessing in-degree of 0.\n3. Dequeue vertex, append to topological order, and decrement in-degrees of adjacent neighbors.\n4. Enqueue neighbors whose in-degree reaches 0; verify processed count equals V (no cycle).",
        "t1_why": "Kahn's algorithm for topological sorting is the primary tool for dependency resolution.",
        "t1_dod": "Computes valid topological ordering using Kahn's algorithm or detects directed cycles.",
        "t2_details": "1. Build a software build dependency task runner orchestrating compilation of code modules.\n2. Parse module dependencies, generate build execution order, and flag circular build references.\n3. Execute independent tasks in parallel using thread pools once prerequisite dependencies finish.",
        "t2_why": "Build engines like Make, Bazel, and Webpack resolve dependency graphs via topological sort.",
        "t2_dod": "Task runner compiles interdependent software modules in topologically verified execution order."
    },
    "Course Schedule": {
        "t1_details": "1. Model course prerequisites as directed edges in an adjacency list graph representation.\n2. Apply Kahn's BFS or 3-color DFS (unvisited, visiting, visited) detecting directed cycles.\n3. Identify back-edges during DFS indicating illegal circular prerequisite dependency chains.\n4. Return true if graph is a Directed Acyclic Graph (DAG); otherwise return false.",
        "t1_why": "Course Schedule is one of the most frequently asked graph cycle interview questions.",
        "t1_dod": "Detects directed graph cycles using both Kahn's algorithm and 3-color DFS traversal.",
        "t2_details": "1. Build a microservice dependency graph validator checking service-to-service call topologies.\n2. Ingest service communication schemas and flag circular RPC dependencies causing distributed deadlocks.\n3. Output architectural dependency reports highlighting critical circular dependency bottlenecks.",
        "t2_why": "Preventing circular dependencies between microservices avoids cascading timeouts and system deadlocks.",
        "t2_dod": "Dependency validator flags circular service calls preventing architectural deadlocks."
    },
    "Dynamic Programming Intro": {
        "t1_details": "1. Identify overlapping subproblems and optimal substructure in recursive problems.\n2. Implement top-down memoization using hash map or array caching computed subproblem answers.\n3. Implement bottom-up tabulation constructing DP array iteratively from base cases up.\n4. Optimize space complexity from O(N) array down to O(1) state variables where possible.",
        "t1_why": "Mastering the transition from recursion to memoization and tabulation is essential for DP.",
        "t1_dod": "Converts exponential recursion into both top-down memoization and bottom-up tabulation.",
        "t2_details": "1. Implement a high-performance Fibonacci and factorial calculation microservice in Python or C++.\n2. Benchmark execution times across naive recursive, memoized, and tabulated implementations.\n3. Profile memory allocations and demonstrate linear versus exponential resource scaling.",
        "t2_why": "Demonstrating empirical speedups from DP caching reinforces algorithmic efficiency in systems.",
        "t2_dod": "Benchmarking script demonstrates 10,000x execution speedup of tabulation over naive recursion."
    },
    "House Robber": {
        "t1_details": "1. Formulate DP recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i]) for non-adjacent houses.\n2. Identify base cases: dp[0] = nums[0], dp[1] = max(nums[0], nums[1]).\n3. Reduce space complexity from O(N) array to two variables: prev1 and prev2.\n4. Solve House Robber II running DP twice on ranges [0, N-2] and [1, N-1].",
        "t1_why": "House Robber is the quintessential 1D DP decision problem with state compression.",
        "t1_dod": "Solves House Robber I and II in O(N) time and strict O(1) auxiliary space.",
        "t2_details": "1. Build an ad placement revenue optimization engine selecting non-adjacent banner ad slots.\n2. Maximize expected click-through revenue while respecting layout spacing constraints.\n3. Test ad placement schedules across varied website page layouts and impression values.",
        "t2_why": "Ad slot optimization in marketing tech uses non-adjacent dynamic programming selection.",
        "t2_dod": "Ad engine calculates optimal revenue-maximizing ad schedules adhering to spacing rules."
    },
    "Decision Trees": {
        "t1_details": "1. Calculate entropy and Gini impurity for multi-class dataset splits by hand.\n2. Compute information gain choosing optimal feature and threshold for decision tree nodes.\n3. Explain bagging principles: bootstrap aggregation, out-of-bag error, and random forest ensembles.\n4. Train Decision Tree and Random Forest classifiers using scikit-learn evaluating feature importances.",
        "t1_why": "Tree-based algorithms and ensemble mechanics are fundamental machine learning interview topics.",
        "t1_dod": "Calculates Gini impurity by hand and trains Random Forest extracting feature importances.",
        "t2_details": "1. Build a loan default risk predictor using Random Forest with tuned max_depth and n_estimators.\n2. Extract and visualize feature importance bar charts communicating key risk drivers.\n3. Mitigate model overfitting by tuning min_samples_split and cost-complexity pruning parameters.",
        "t2_why": "Tree ensembles provide interpretable feature rankings essential for regulated financial models.",
        "t2_dod": "Loan risk predictor trains with tuned hyperparameters outputting clear feature importance plots."
    },
    "Model Evaluation": {
        "t1_details": "1. Compute Confusion Matrix entries: True Positive, False Positive, True Negative, False Negative.\n2. Calculate Precision, Recall, F1-Score, and Specificity explaining trade-offs between metrics.\n3. Plot ROC curve and calculate AUC score interpreting discriminatory capability across thresholds.\n4. Explain why accuracy is dangerously misleading for highly imbalanced class distributions.",
        "t1_why": "Metric selection and evaluation nuance are primary differentiators in AI/ML interviews.",
        "t1_dod": "Computes precision, recall, and ROC-AUC from scratch and justifies metric trade-offs.",
        "t2_details": "1. Implement a comprehensive classification model evaluation reporting script in Python.\n2. Generate precision-recall curves and ROC-AUC curves comparing multiple model checkpoints.\n3. Write automated assertions failing model deployment if test recall drops below required SLA.",
        "t2_why": "Automated model evaluation gates prevent degraded or biased ML models reaching production.",
        "t2_dod": "Model evaluation script outputs confusion matrix, ROC-AUC curves, and threshold validation logs."
    },

    # -------------------------------------------------------------
    # WEEK 15
    # -------------------------------------------------------------
    "Rotting Oranges": {
        "t1_details": "1. Enqueue all initially rotten oranges into queue while counting initial fresh oranges.\n2. Execute multi-source BFS level by level decrementing fresh orange count upon contamination.\n3. Advance time minute counter after processing each complete queue level snapshot.\n4. Return elapsed minutes if fresh count reaches 0; otherwise return -1 for unreachable oranges.",
        "t1_why": "Multi-source BFS is an essential pattern for simultaneous wave propagation problems.",
        "t1_dod": "Solves multi-source BFS in O(M*N) time returning minimal elapsed contamination minutes.",
        "t2_details": "1. Build a network virus propagation simulator modeling malware infection spreading across server nodes.\n2. Ingest server cluster network topology and simulate infection spread from multiple compromised nodes.\n3. Compute time steps until full cluster compromise and evaluate firewall isolation strategies.",
        "t2_why": "Multi-source propagation models epidemiological outbreaks and cybersecurity breach containment.",
        "t2_dod": "Virus propagation simulator determines time to cluster compromise across network topologies."
    },
    "Pacific Atlantic": {
        "t1_details": "1. Reverse search direction: start BFS/DFS from ocean boundary cells flowing uphill to interior.\n2. Maintain two boolean matrices tracking reachable cells for Pacific and Atlantic oceans.\n3. Traverse adjacent neighbors only if neighbor height >= current cell height.\n4. Find intersection of both reachable matrices identifying cells flowing to both oceans.",
        "t1_why": "Reverse reachability from boundaries transforms complex multi-destination problems into simple BFS.",
        "t1_dod": "Finds cells reaching both oceans in O(M*N) time using reverse boundary reachability.",
        "t2_details": "1. Build an environmental flood risk analysis tool modeling continental drainage divide boundaries.\n2. Ingest digital elevation model (DEM) terrain grids and compute watershed flow directions.\n3. Export high-risk flood drainage zones into geographic visualization maps.",
        "t2_why": "Watershed drainage modeling drives flood mitigation planning and environmental engineering.",
        "t2_dod": "Flood analysis tool identifies continental drainage divides across digital elevation grids."
    },
    "Dijkstra": {
        "t1_details": "1. Initialize distance array with infinity and source distance with 0.\n2. Use min-heap priority queue storing (distance, node) pairs for greedy shortest exploration.\n3. Relax edges: if dist[u] + weight < dist[v], update dist[v] and push to heap.\n4. Prove O((V + E) log V) complexity and explain why negative weights fail.",
        "t1_why": "Dijkstra's shortest path algorithm is a premier technical interview benchmark for graphs.",
        "t1_dod": "Implements Dijkstra's algorithm with min-heap priority queue in O((V + E) log V).",
        "t2_details": "1. Implement a network packet routing pathfinder computing lowest-latency network routes.\n2. Construct weighted graph topology representing router links with measured millisecond latencies.\n3. Output optimal packet forwarding paths and dynamically recalculate paths upon link failure.",
        "t2_why": "Shortest-path algorithms power internet routing protocols like OSPF and navigation GPS engines.",
        "t2_dod": "Packet pathfinder calculates optimal low-latency network routes across weighted router topologies."
    },
    "Eligibility Checking Engine": {
        "t1_details": "1. Design rules engine evaluating student eligibility for job postings based on GPA and backlogs.\n2. Implement backend endpoint POST /jobs/:id/verify-eligibility returning eligibility breakdown.\n3. Structure rule definitions using composable predicate functions for easy extensibility.\n4. Write unit tests evaluating edge cases with border GPA values and differing degree branches.",
        "t1_why": "Building rule engines with composable predicate functions demonstrates clean architecture.",
        "t1_dod": "Builds modular eligibility checking engine evaluating student job criteria with unit tests.",
        "t2_details": "1. Integrate eligibility checking engine into Placement Portal application submission workflow.\n2. Reject non-compliant student job applications automatically with clear diagnostic error reasons.\n3. Benchmark verification engine execution speed across 1,000 batch applicant profiles.",
        "t2_why": "Automated business rule enforcement protects backend application workflows from illegal state transitions.",
        "t2_dod": "Eligibility engine blocks unqualified student applications with detailed compliance reports."
    },
    "Data Preprocessing": {
        "t1_details": "1. Handle missing values using SimpleImputer with median strategy for continuous numerical columns.\n2. Encode categorical variables using OneHotEncoder for nominal and OrdinalEncoder for ordered values.\n3. Prevent data leakage by fitting transformers strictly on training splits before transforming test splits.\n4. Detect and cap numerical outliers using interquartile range (IQR) and Z-score thresholding.",
        "t1_why": "Preventing data leakage and handling messy features are primary AI/ML screening tests.",
        "t1_dod": "Preprocesses raw tabular data with clean imputation and zero train-test data leakage.",
        "t2_details": "1. Build a reusable scikit-learn preprocessing pipeline chaining transformers and encoders.\n2. Serialize fitted preprocessing pipeline artifact to disk using joblib for production reuse.\n3. Write automated assertions verifying transformed features have zero nulls and expected dimensions.",
        "t2_why": "Serialized preprocessing pipelines guarantee identical data transformations during production inference.",
        "t2_dod": "Fitted preprocessing pipeline serializes to disk and transforms test batches cleanly."
    },
    "Job Application Lifecycle": {
        "t1_details": "1. Model job application status transitions: Applied, Shortlisted, Interviewing, Offered, Rejected.\n2. Implement state machine logic preventing invalid transitions (e.g., Rejected to Offered).\n3. Create PostgreSQL audit log table recording all status transitions with actor timestamps.\n4. Implement Express endpoints updating application status with role-based access control.",
        "t1_why": "State machines and audit logging are required patterns for enterprise transactional systems.",
        "t1_dod": "Implements state machine guarding job application status transitions with audit logging.",
        "t2_details": "1. Write database triggers or service middleware recording transition timestamp history records.\n2. Build an analytics endpoint calculating average time spent by applicants in each stage.\n3. Test concurrent status update requests ensuring database row locking prevents race conditions.",
        "t2_why": "Audit trails and concurrency control prevent data corruption in enterprise workflow systems.",
        "t2_dod": "Application lifecycle engine enforces legal state transitions with immutable audit logs."
    },

    # -------------------------------------------------------------
    # WEEK 16
    # -------------------------------------------------------------
    "Coin Change": {
        "t1_details": "1. Define DP array dp[i] representing minimum coins needed to make amount i.\n2. Initialize dp array with infinity sentinel and set base case dp[0] = 0.\n3. Iterate amounts up to target updating dp[i] = min(dp[i], dp[i - coin] + 1).\n4. Return dp[amount] if <= amount; otherwise return -1 for impossible target amounts.",
        "t1_why": "Coin Change is the quintessential unbounded knapsack problem asked across all tech companies.",
        "t1_dod": "Solves Coin Change in O(amount * len(coins)) time and O(amount) space.",
        "t2_details": "1. Build an ATM cash dispenser calculation engine minimizing physical bills dispensed to users.\n2. Support custom bill denomination sets and detect unpayable requested withdrawal amounts.\n3. Benchmark dynamic programming dispenser against greedy dispenser across currency denomination sets.",
        "t2_why": "Cash dispensing and currency change optimization apply directly to financial kiosk software.",
        "t2_dod": "Cash dispenser engine computes minimal bill distributions handling arbitrary denominations."
    },
    "Longest Increasing Subsequence": {
        "t1_details": "1. Implement O(N^2) DP solution using recurrence dp[i] = 1 + max(dp[j]).\n2. Implement optimized O(N log N) patience sorting algorithm with tails array and binary search.\n3. Use lower_bound to find replacement slot in tails array for incoming numbers.\n4. Prove why tails length equals LIS length although elements differ from LIS.",
        "t1_why": "Optimizing LIS from O(N^2) to O(N log N) via binary search is a premier interview showcase.",
        "t1_dod": "Implements both O(N^2) DP and O(N log N) binary search solutions for LIS.",
        "t2_details": "1. Build a warehouse parcel stacking optimizer arranging boxes by increasing dimensions.\n2. Ingest sequential package arrival streams and compute maximum stackable box sequence.\n3. Benchmark O(N log N) LIS execution against O(N^2) on large 100,000-package arrival streams.",
        "t2_why": "Box stacking and sequence alignment in logistics software rely on LIS algorithms.",
        "t2_dod": "Warehouse stacking optimizer computes maximum nestable parcel sequence in verified O(N log N)."
    },
    "Unique Paths": {
        "t1_details": "1. Formulate 2D grid DP recurrence: dp[r][c] = dp[r-1][c] + dp[r][c-1].\n2. Initialize top row and leftmost column with 1 as base case boundary values.\n3. Optimize 2D matrix down to 1D array of size N in-place.\n4. Solve Unique Paths II with obstacles by zeroing paths for obstacle grid cells.",
        "t1_why": "Grid path DP teaches space optimization from 2D matrices down to 1D sliding rows.",
        "t1_dod": "Solves Unique Paths I and II in O(M*N) time and O(N) space.",
        "t2_details": "1. Build a robot automated warehouse navigation path counting engine across obstacle grids.\n2. Calculate total valid routes and identify congested bottleneck intersections in the grid.\n3. Visualize heatmaps of most frequently traversed grid cells using Seaborn or Matplotlib.",
        "t2_why": "Route density analysis powers fleet coordination in automated robotic fulfillment centers.",
        "t2_dod": "Path counting engine identifies valid routes and outputs navigational congestion heatmaps."
    },
    "React Frontend": {
        "t1_details": "1. Scaffold React application with Vite, React Router, and Tailwind CSS styling.\n2. Build Student Dashboard component displaying active job listings and application status badges.\n3. Implement custom hooks managing API data fetching, loading spinners, and error alerts.\n4. Build responsive job listing cards with search filters for job role, salary, and company.",
        "t1_why": "Frontend UI proficiency and clean component architecture are expected for full-stack SDE roles.",
        "t1_dod": "Builds functional React student dashboard with filtering, loading states, and error handling.",
        "t2_details": "1. Connect React frontend to Express backend endpoints using Axios with auth interceptors.\n2. Automatically inject JWT token into request headers and handle 401 redirect to login.\n3. Write React component tests using React Testing Library verifying render and filter behavior.",
        "t2_why": "Axios interceptors manage seamless token refreshing and authentication across client apps.",
        "t2_dod": "React frontend communicates with backend API handling authentication interceptors cleanly."
    },
    "Deep Learning Foundations": {
        "t1_details": "1. Diagram artificial neuron architecture: inputs, weights, bias, summation, and activation.\n2. Compare activation functions: Sigmoid, Tanh, ReLU, Leaky ReLU, and Softmax with gradients.\n3. Explain vanishing and exploding gradient problems and their relationship to activation choices.\n4. Formulate loss functions: Mean Squared Error (regression) and Categorical Cross-Entropy (classification).",
        "t1_why": "Neural network mechanics, activation behaviors, and loss formulation are core DL questions.",
        "t1_dod": "Explains neuron forward pass, activation gradients, and vanishing gradient mitigations.",
        "t2_details": "1. Implement activation functions and their mathematical derivatives from scratch in Python.\n2. Plot activation curves and their gradients across input range [-5, 5] using Matplotlib.\n3. Demonstrate ReLU dead neuron traps and compare against Leaky ReLU behavior.",
        "t2_why": "Visualizing activation gradients builds deep intuition for deep network convergence behavior.",
        "t2_dod": "Python script plots activation functions and verifies mathematical derivatives numerically."
    },
    "NumPy MLP": {
        "t1_details": "1. Initialize 2-layer Multi-Layer Perceptron weights with He/Xavier normal initialization.\n2. Implement forward pass computing layer activations Z1, A1, Z2, and predictions.\n3. Compute analytical backpropagation gradients dZ2, dW2, db2, dZ1, and dW1.\n4. Update weights with Gradient Descent and verify loss decreases per training epoch.",
        "t1_why": "Implementing forward and backward propagation from scratch in pure NumPy proves DL mastery.",
        "t1_dod": "Implements complete 2-layer MLP in NumPy with verified decreasing training loss.",
        "t2_details": "1. Train scratch NumPy MLP on synthetic non-linear classification dataset (make_moons or circles).\n2. Track and plot loss and classification accuracy curves over 1,000 training iterations.\n3. Plot 2D decision boundary showing non-linear separation achieved by hidden layer representations.",
        "t2_why": "Plotting decision boundaries confirms your network learned non-linear feature representations.",
        "t2_dod": "NumPy MLP achieves over 90% accuracy on non-linear dataset with plotted decision boundary."
    },

    # -------------------------------------------------------------
    # WEEK 17
    # -------------------------------------------------------------
    "Jump Game": {
        "t1_details": "1. Track farthest reachable index variable while iterating through array elements.\n2. If current index exceeds farthest reach boundary, return false immediately (stuck).\n3. Update farthest = max(farthest, i + nums[i]); verify reachability to array end.\n4. Solve Jump Game II tracking jumps, current_end, and farthest in O(N) single pass.",
        "t1_why": "Jump Game is the classic greedy reachability problem testing boundary tracking.",
        "t1_dod": "Solves Jump Game I and II in O(N) single pass and O(1) space.",
        "t2_details": "1. Build a network packet forwarding hop optimizer finding minimum relay nodes needed.\n2. Model relay antennas with variable transmission ranges using Jump Game greedy boundary logic.\n3. Output minimal relay hop sequence to transmit signals across long physical distances.",
        "t2_why": "Greedy boundary reachability minimizes relay hops in wireless ad-hoc and mesh networks.",
        "t2_dod": "Hop optimizer determines minimum relay antennas needed for end-to-end signal transmission."
    },
    "Merge Intervals": {
        "t1_details": "1. Sort intervals based on starting timestamp in ascending order in O(N log N) time.\n2. Initialize merged array with first interval as initial comparison anchor.\n3. If current start <= previous end, merge by updating end = max(end1, end2).\n4. Otherwise append current interval as new non-overlapping interval into output array.",
        "t1_why": "Interval consolidation is asked universally across calendar, booking, and resource problems.",
        "t1_dod": "Merges overlapping intervals in O(N log N) time handling arbitrary orderings.",
        "t2_details": "1. Build a conference room meeting scheduler merging overlapping meeting booking requests.\n2. Detect room schedule conflicts and compute total occupied meeting hours per day.\n3. Write unit tests evaluating fully overlapping, partially overlapping, and disjoint bookings.",
        "t2_why": "Calendar booking systems and resource allocators rely on interval consolidation algorithms.",
        "t2_dod": "Meeting scheduler resolves overlapping bookings and outputs unified room occupancy timelines."
    },
    "Non-overlapping Intervals": {
        "t1_details": "1. Sort intervals by ending timestamp in ascending order (greedy optimal finishing time).\n2. Track end boundary of last included interval; initialize removal count to 0.\n3. If current interval start < last_end, increment removals (conflict detected).\n4. Otherwise update last_end to current interval's end; prove greedy choice optimality.",
        "t1_why": "Interval scheduling greedy optimization by finish time is a classic interview proof topic.",
        "t1_dod": "Finds minimum interval removals to eliminate overlaps in O(N log N) time.",
        "t2_details": "1. Build a CPU task execution scheduler maximizing non-overlapping task completions.\n2. Ingest batch jobs with start and end times, scheduling maximum number of compatible jobs.\n3. Benchmark greedy finish-time scheduling against greedy start-time and greedy duration heuristics.",
        "t2_why": "Activity selection by finish time maximizes job throughput in shared computing clusters.",
        "t2_dod": "CPU scheduler maximizes completed jobs proving superior throughput over alternative heuristics."
    },
    "PyTorch Fundamentals": {
        "t1_details": "1. Create PyTorch tensors inspecting shape, dtype, device (cpu/cuda), and requires_grad flags.\n2. Execute tensor operations: matrix multiplications, reshaping, slicing, and broadcasting.\n3. Track gradients with autograd: perform forward pass, call loss.backward(), and inspect grad.\n4. Build a custom neural network module subclassing nn.Module with forward() implementation.",
        "t1_why": "PyTorch tensor operations, autograd, and nn.Module are mandatory for modern AI/ML roles.",
        "t1_dod": "Builds custom nn.Module and verifies backward pass gradient computation with autograd.",
        "t2_details": "1. Build a linear regression model in PyTorch using nn.Linear and nn.MSELoss.\n2. Optimize weights using torch.optim.SGD verifying gradient zeroing with optimizer.zero_grad().\n3. Train model on synthetic data and compare learned weights against true generating parameters.",
        "t2_why": "Mastering the standard PyTorch training loop pattern is required for all deep learning tasks.",
        "t2_dod": "PyTorch regression script trains with SGD and recovers ground truth parameters."
    },
    "PyTorch Dataset": {
        "t1_details": "1. Subclass torch.utils.data.Dataset implementing __init__, __len__, and __getitem__ methods.\n2. Wrap Dataset with DataLoader configuring batch_size, shuffle, num_workers, and pin_memory.\n3. Implement training loop iterating batches, running forward pass, loss calculation, and optimizer step.\n4. Implement validation loop under torch.no_grad() evaluating validation loss and metrics.",
        "t1_why": "PyTorch data pipelining and structured training loops are evaluated in every ML engineering interview.",
        "t1_dod": "Implements custom Dataset and DataLoader running multi-epoch training and validation loops.",
        "t2_details": "1. Build a PyTorch image classification pipeline on CIFAR-10 or Fashion-MNIST dataset.\n2. Add torchvision data augmentations including RandomHorizontalFlip and ColorJitter transforms.\n3. Save best model weights checkpoint based on validation loss using torch.save.",
        "t2_why": "Data augmentation and checkpointing prevent overfitting and enable reliable model recovery.",
        "t2_dod": "Training pipeline trains CNN on image dataset saving best model checkpoints based on validation loss."
    },
    "ML Capstone Kickoff": {
        "t1_details": "1. Select real-world ML Capstone dataset: e.g. Customer Churn, Fraud Detection, or Housing Prices.\n2. Ingest raw dataset performing initial exploration of feature distributions and target imbalance.\n3. Split dataset into train, validation, and test sets using stratified sampling strategies.\n4. Establish baseline model performance using simple linear or dummy heuristic classifiers.",
        "t1_why": "Scaffolding machine learning projects with proper baselines is essential for ML portfolio defense.",
        "t1_dod": "Establishes structured ML capstone repository with data ingestion and baseline metrics.",
        "t2_details": "1. Set up Git repository with DVC (Data Version Control) tracking dataset files and artifacts.\n2. Write reproducible Python data ingestion scripts logging dataset hashes and summary statistics.\n3. Commit baseline model training code and evaluation metrics to capstone repository.",
        "t2_why": "Data version control ensures experimental reproducibility across team development environments.",
        "t2_dod": "Capstone repository initialized with DVC data tracking and documented baseline scores."
    },

    # -------------------------------------------------------------
    # WEEK 18
    # -------------------------------------------------------------
    "Word Break": {
        "t1_details": "1. Initialize boolean DP array where dp[i] indicates prefix s[0..i-1] reachability.\n2. Set base case dp[0] = true representing empty prefix validity.\n3. For each index i, check substring match in dictionary for reachable j.\n4. Optimize dictionary lookups by converting word list to hash set and bounding substring lengths.",
        "t1_why": "Word Break is the premier 1D DP string segmentation problem asked across tech giants.",
        "t1_dod": "Solves Word Break in O(N^2) time and O(N) space using prefix reachability DP.",
        "t2_details": "1. Build a text query tokenizer segmenting continuous unspaced search strings into valid words.\n2. Ingest domain vocabulary dictionaries and reconstruct tokenized search sentences in real-time.\n3. Benchmark tokenizer performance across lengthy synthetic unspaced text queries.",
        "t2_why": "Domain-specific token segmentation powers search query understanding and Asian language NLP.",
        "t2_dod": "Tokenizer successfully segments unspaced input strings into valid dictionary words."
    },
    "Task Scheduler": {
        "t1_details": "1. Count task frequencies and identify maximum task frequency max_freq and max_count tasks.\n2. Calculate idle slots: empty_slots = (max_freq - 1) * (n - max_count + 1).\n3. Fill empty slots with remaining tasks, computing available idle slots: max(0, empty_slots - rest).\n4. Return total intervals: max(len(tasks), len(tasks) + idle_slots) in O(N) time.",
        "t1_why": "Task Scheduler evaluates greedy slot calculation and priority queue scheduling trade-offs.",
        "t1_dod": "Calculates minimum intervals to execute cooldown tasks in O(N) time and O(1) space.",
        "t2_details": "1. Build a distributed background job rate limiter enforcing mandatory cooldown intervals.\n2. Schedule simulated cloud tasks with CPU cooldown constraints minimizing idle worker cycles.\n3. Benchmark job execution timelines against naive un-optimized scheduling strategies.",
        "t2_why": "Cooldown scheduling prevents API rate limit exhaustion and hardware thermal throttling.",
        "t2_dod": "Job rate limiter schedules tasks respecting cooldowns while minimizing idle server time."
    },
    "Generative AI & Embeddings": {
        "t1_details": "1. Explain Self-Attention intuition: Query, Key, and Value vector matrices and dot product scoring.\n2. Formulate Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V.\n3. Describe multi-head attention benefits: allowing model to attend to information from different subspaces.\n4. Explain token embeddings, positional encodings, and Transformer encoder-decoder architectures.",
        "t1_why": "Transformer architecture, self-attention math, and embeddings are universally tested in GenAI roles.",
        "t1_dod": "Derives scaled dot-product attention formula and explains Q, K, V matrix projections.",
        "t2_details": "1. Implement scaled dot-product attention from scratch in PyTorch using tensor operations.\n2. Verify attention weights sum to 1 across sequence dimensions using softmax verification.\n3. Generate text embeddings using Hugging Face transformers model (e.g., all-MiniLM-L6-v2).",
        "t2_why": "Building attention from scratch demystifies transformer internals used across all modern LLMs.",
        "t2_dod": "Scratch attention module computes verified output tensors matching PyTorch MultiheadAttention."
    },
    "RAG Architecture": {
        "t1_details": "1. Diagram end-to-end RAG architecture: Ingestion, Chunking, Embedding, Vector DB, Retrieval, LLM Generation.\n2. Compare document chunking strategies: fixed character size, recursive character splitting, semantic chunking.\n3. Explain chunk overlap purposes: preserving semantic context across arbitrary chunk boundaries.\n4. Contrast dense vector retrieval against sparse keyword retrieval (BM25) and hybrid search.",
        "t1_why": "Retrieval-Augmented Generation (RAG) is the most sought-after practical AI skill today.",
        "t1_dod": "Diagrams RAG pipeline and explains chunking strategies, embedding models, and vector retrieval.",
        "t2_details": "1. Build a local RAG document Q&A pipeline using ChromaDB and LangChain or LlamaIndex.\n2. Ingest PDF documents, chunk text into overlapping segments, and store embeddings in ChromaDB.\n3. Query vector store for top-3 relevant context chunks and generate synthesized LLM responses.",
        "t2_why": "Building production RAG systems grounds LLM outputs in verified proprietary document context.",
        "t2_dod": "RAG pipeline retrieves relevant document chunks and returns accurate grounded answers."
    },
    "FastAPI ML Serving": {
        "t1_details": "1. Define request and response schemas using Pydantic BaseModel with strict type annotations.\n2. Implement FastAPI application with lifespan context managers loading ML models on startup.\n3. Implement prediction endpoint POST /predict validating input features and returning predictions.\n4. Handle model inference exceptions and return structured HTTP 422 and 500 error responses.",
        "t1_why": "High-performance asynchronous API serving with FastAPI is standard for ML engineering.",
        "t1_dod": "Builds FastAPI inference service with Pydantic validation and lifespan model loading.",
        "t2_details": "1. Write automated API test suite using pytest and FastAPI TestClient verifying inference endpoints.\n2. Benchmark API latency and throughput under concurrent load using locust or wrk.\n3. Containerize FastAPI service with Dockerfile optimizing multi-stage image build layers.",
        "t2_why": "Packaging ML APIs into lightweight Docker containers prepares them for cloud deployment.",
        "t2_dod": "FastAPI inference service passes automated unit tests and builds inside Docker container."
    },
    "ML Capstone Deployment": {
        "t1_details": "1. Package trained ML model weights and preprocessing pipelines into serialized artifact bundle.\n2. Write production FastAPI inference endpoints loading model bundle and serving real-time predictions.\n3. Implement health check endpoint GET /health returning model status and latency telemetry.\n4. Generate comprehensive model evaluation report summarizing precision, recall, and ROC-AUC metrics.",
        "t1_why": "Deploying end-to-end ML pipelines with monitoring completes the AI engineering portfolio.",
        "t1_dod": "Deploys ML Capstone API with health monitoring and documented model evaluation report.",
        "t2_details": "1. Deploy FastAPI model service to cloud hosting provider (e.g. Render, Railway, or AWS EC2).\n2. Verify live public endpoint responding to inference requests with under 100ms latency.\n3. Document public API endpoint, sample curl requests, and architecture diagram in GitHub README.",
        "t2_why": "Live deployed capstones provide concrete proof of end-to-end engineering competence to employers.",
        "t2_dod": "Capstone API is live on public cloud with documented curl requests in GitHub README."
    },

    # -------------------------------------------------------------
    # WEEKS 19-26 SPECIFIC ADVANCED TOPICS
    # -------------------------------------------------------------
    "Virtual Memory": {
        "t1_details": "1. Diagram virtual-to-physical address translation via page tables and hardware MMU.\n2. Explain Translation Lookaside Buffer (TLB) hit and miss mechanics and context switch flushes.\n3. Trace page fault handler sequence from disk interrupt to page replacement and resume.\n4. Compare page replacement algorithms: FIFO, LRU, Clock, and Optimal Belady anomaly.",
        "t1_why": "Virtual memory, TLB mechanics, and page faults are universal system engineering questions.",
        "t1_dod": "Accurately diagrams address translation and calculates effective memory access times with TLB.",
        "t2_details": "1. Implement a virtual memory page table simulator with configurable page and frame sizes.\n2. Simulate FIFO and LRU page replacement policies across synthetic page reference strings.\n3. Measure page fault rates and demonstrate Belady's anomaly on FIFO replacement.",
        "t2_why": "Simulating memory paging demystifies kernel memory management and cache eviction.",
        "t2_dod": "Page table simulator measures hit/miss ratios across LRU and FIFO replacement policies."
    },
    "Synchronization, Mutex": {
        "t1_details": "1. Define critical sections and state race condition failure modes on shared memory.\n2. Contrast Mutex (locking ownership) against Semaphore (signaling counter) mechanisms.\n3. Explain condition variables and solve Producer-Consumer problem using bounded circular buffers.\n4. Identify deadlock hazards and explain lock ordering hierarchy to prevent circular wait.",
        "t1_why": "Thread synchronization and deadlock prevention are non-negotiable for systems SDE interviews.",
        "t1_dod": "Implements Producer-Consumer with mutex and condition variables with zero deadlocks.",
        "t2_details": "1. Implement a thread-safe bounded blocking queue in C++ using std::mutex and std::condition_variable.\n2. Spawn multiple concurrent producer and consumer threads pushing and popping data items.\n3. Run thread stress tests using ThreadSanitizer verifying zero data race conditions.",
        "t2_why": "Thread-safe blocking queues form the communication backbone of thread pool executors.",
        "t2_dod": "Blocking queue passes ThreadSanitizer race detection under heavy concurrent load."
    },
    "LRU Cache": {
        "t1_details": "1. Combine hash map for O(1) lookup with doubly linked list for eviction.\n2. Implement get(key): lookup hash map, splice accessed node to list head, return value.\n3. Implement put(key, val): insert at head and evict tail if over capacity.\n4. Use dummy head and tail sentinel nodes to eliminate tedious null pointer checks.",
        "t1_why": "LRU Cache is perhaps the single most famous hybrid data structure interview problem.",
        "t1_dod": "Implements LRU Cache with strict O(1) get and put operations and dummy sentinels.",
        "t2_details": "1. Build an in-memory HTTP response caching proxy utilizing custom LRU Cache engine.\n2. Cache incoming GET endpoint responses and evict oldest responses when memory limit reaches max.\n3. Benchmark proxy response latency for cached versus uncached backend database queries.",
        "t2_why": "In-memory caching proxies dramatically reduce backend database load in web architectures.",
        "t2_dod": "Caching proxy serves cached responses with sub-millisecond response latency."
    },
    "ACID": {
        "t1_details": "1. Explain Atomicity, Consistency, Isolation, and Durability guarantees in relational databases.\n2. Detail transaction isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.\n3. Explain read phenomena: Dirty Read, Non-Repeatable Read, Phantom Read across isolation levels.\n4. Describe Write-Ahead Logging (WAL) and two-phase locking (2PL) ensuring durability and serializability.",
        "t1_why": "ACID properties and isolation levels are evaluated in every senior SDE and systems interview.",
        "t1_dod": "Explains the 4 isolation levels and illustrates dirty, non-repeatable, and phantom reads.",
        "t2_details": "1. Execute concurrent PostgreSQL transactions demonstrating non-repeatable reads and phantom reads.\n2. Alter session isolation levels to REPEATABLE READ and SERIALIZABLE to verify prevention.\n3. Test optimistic locking using version numbers against pessimistic row-level SELECT FOR UPDATE.",
        "t2_why": "Mastering database isolation prevents costly data corruption in concurrent financial transactions.",
        "t2_dod": "PostgreSQL test scripts demonstrate concurrency phenomena and verified isolation level fixes."
    },
    "B-Tree Indexing": {
        "t1_details": "1. Diagram B-Tree and B+ Tree node structures: branching factor, internal keys, leaf linked lists.\n2. Explain why B+ Trees outperform BSTs and B-Trees for disk block access.\n3. Analyze disk I/O costs: tree height O(log_B N) where B is page block capacity.\n4. Contrast clustered indexes (table data sorted on disk) against non-clustered secondary indexes.",
        "t1_why": "Database index internals and disk I/O minimization are premier backend interview topics.",
        "t1_dod": "Explains B+ Tree leaf node chaining, branching factor math, and clustered index trade-offs.",
        "t2_details": "1. Analyze complex query execution plans using EXPLAIN (ANALYZE, BUFFERS) in PostgreSQL.\n2. Compare disk buffer reads between Seq Scan, Bitmap Index Scan, and Index Only Scan.\n3. Construct multi-column composite indexes optimizing queries according to leftmost prefix rules.",
        "t2_why": "Analyzing query execution buffers allows developers to eliminate crippling database I/O bottlenecks.",
        "t2_dod": "EXPLAIN BUFFERS report confirms 90% reduction in shared buffer reads using optimal indexing."
    },
    "Binary Tree Maximum Path Sum": {
        "t1_details": "1. Define recursive post-order helper computing maximum branch contribution from left and right.\n2. Ignore negative branch contributions by clamping subtree returns to max(0, branch_sum).\n3. Compute potential path through current node: node->val + left_gain + right_gain.\n4. Update global maximum path sum while returning node->val + max(left_gain, right_gain) upward.",
        "t1_why": "Max Path Sum is a classic Hard tree problem testing post-order state aggregation.",
        "t1_dod": "Solves Binary Tree Maximum Path Sum in O(N) time and O(H) space.",
        "t2_details": "1. Build a network reliability analyzer calculating maximum bandwidth path through router trees.\n2. Model network bandwidths as node capacities and compute maximum end-to-end throughput paths.\n3. Write unit tests validating negative edge weights and single-node network topologies.",
        "t2_why": "Hierarchical path capacity analysis is fundamental to network routing and supply chain flows.",
        "t2_dod": "Reliability analyzer determines maximum end-to-end bandwidth path across router hierarchies."
    },
    "OSI 7-Layer": {
        "t1_details": "1. Detail 7 OSI layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.\n2. Compare TCP vs UDP: connection-oriented vs connectionless, reliability, ordering, flow/congestion control.\n3. Trace TCP 3-way handshake (SYN, SYN-ACK, ACK) and 4-way termination (FIN, ACK, FIN, ACK).\n4. Explain TCP sliding window, slow start, congestion avoidance, fast retransmit, and fast recovery.",
        "t1_why": "Transport layer mechanics, TCP handshake, and socket connections are core backend interview requirements.",
        "t1_dod": "Articulates TCP handshake, flow control, and UDP trade-offs with complete technical accuracy.",
        "t2_details": "1. Capture live TCP 3-way handshake packets using Wireshark or tcpdump on local network traffic.\n2. Inspect sequence numbers, acknowledgment numbers, window sizes, and TCP flags in packets.\n3. Build a TCP echo client and server in Python using socket APIs.",
        "t2_why": "Inspecting raw network packets with Wireshark provides concrete intuition for network protocols.",
        "t2_dod": "Packet capture log clearly highlights SYN, SYN-ACK, and ACK flags from local TCP connection."
    },
    "DNS Resolution": {
        "t1_details": "1. Trace complete journey of URL request: browser cache, OS resolver, recursive DNS, root/TLD/authoritative servers.\n2. Explain DNS records: A, AAAA, CNAME, MX, TXT, and TTL caching mechanics.\n3. Contrast HTTP/1.1 (pipelining, head-of-line blocking), HTTP/2 (multiplexing, HPACK), and HTTP/3 (QUIC/UDP).\n4. Trace TLS 1.3 handshake: key exchange, digital certificates, cipher suites, and session resumption.",
        "t1_why": "'What happens when you type a URL into a browser?' is the most famous interview question.",
        "t1_dod": "Delivers end-to-end technical explanation of DNS, TCP, TLS handshake, and HTTP/3 multiplexing.",
        "t2_details": "1. Query DNS records using dig and nslookup inspecting root and authoritative server delegations.\n2. Measure latency differences between DNS cold lookups and cached DNS resolver responses.\n3. Inspect HTTPS TLS certificates and cipher suites of top websites using openssl s_client.",
        "t2_why": "Command-line DNS diagnostics and SSL certificate verification are essential daily SDE skills.",
        "t2_dod": "Dig and openssl commands document DNS resolution path and TLS certificate validation chain."
    },
    "SOLID Principles": {
        "t1_details": "1. Deconstruct SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.\n2. Identify code violations for each principle and write refactored designs on paper.\n3. Explain Liskov Substitution Principle with classic Rectangle-Square inheritance failure example.\n4. Explain Dependency Inversion: depending on abstractions rather than concrete implementation details.",
        "t1_why": "SOLID design principles are rigorously evaluated in object-oriented software engineering interviews.",
        "t1_dod": "Explains all 5 SOLID principles with concrete violation examples and refactored solutions.",
        "t2_details": "1. Refactor a monolithic notification module violating SOLID into decoupled, extensible interfaces.\n2. Implement Email, SMS, and Push notification services implementing a common NotificationChannel interface.\n3. Inject notification channels into notification dispatcher demonstrating clean Dependency Inversion.",
        "t2_why": "Applying SOLID principles produces maintainable enterprise codebases that scale cleanly over time.",
        "t2_dod": "Refactored notification module passes unit tests and demonstrates clean Dependency Inversion."
    },
    "Software Design Patterns": {
        "t1_details": "1. Explain Creational patterns: Singleton (thread-safe double-checked locking) and Factory Method.\n2. Explain Structural patterns: Adapter (wrapper) and Decorator (runtime dynamic behavior expansion).\n3. Explain Behavioral patterns: Strategy (interchangeable algorithms) and Observer (event subscription).\n4. Diagram UML class relationships for Observer and Strategy design patterns.",
        "t1_why": "Design patterns evaluate your ability to architect scalable, reusable software systems.",
        "t1_dod": "Explains Singleton, Factory, Strategy, and Observer patterns with UML class relationships.",
        "t2_details": "1. Implement a thread-safe Singleton configuration loader in C++ or Python with lazy initialization.\n2. Implement an Observer pattern event bus publishing telemetry events to multiple subscriber listeners.\n3. Write unit tests verifying dynamic subscriber registration, event delivery, and unsubscription.",
        "t2_why": "Event buses and configuration loaders are foundational architectural components in large apps.",
        "t2_dod": "Event bus implementation correctly dispatches events to registered observers without leaks."
    },
    "In-Memory Key-Value Store": {
        "t1_details": "1. Design architecture for an in-memory key-value store supporting SET, GET, and DELETE commands.\n2. Design append-only Write-Ahead Log (WAL) recording every mutation before memory application.\n3. Implement crash recovery replaying WAL log entries from disk to rebuild in-memory state.\n4. Implement log compaction and snapshotting to prevent unbounded WAL file growth over time.",
        "t1_why": "Building a storage engine with WAL demonstrates senior-level systems programming capability.",
        "t1_dod": "Architects thread-safe in-memory key-value store with append-only WAL persistence and replay.",
        "t2_details": "1. Implement WAL file writer in C++ or Python using append-only log records.\n2. Write crash simulation test: terminate process abruptly, restart, and assert state recovery.\n3. Benchmark key-value store throughput under 100,000 mixed read and write operations per second.",
        "t2_why": "WAL persistence is the core durability mechanism behind Redis, SQLite, and Apache Kafka.",
        "t2_dod": "Crash simulation tests verify 100% data recovery from WAL file replay upon restart."
    },
    "Crash Recovery": {
        "t1_details": "1. Define crash recovery mechanics: log sequence numbers (LSN), dirty page tracking, and checkpoints.\n2. Trace ARIES recovery algorithm phases: Analysis, Redo committed updates, and Undo uncommitted transactions.\n3. Implement WAL log record structure with transaction ID, operation type, key, value, and checksum.\n4. Verify CRC32 checksums during replay to detect and truncate torn or corrupted disk writes.",
        "t1_why": "Crash recovery and write-ahead log mechanics demonstrate deep understanding of storage reliability.",
        "t1_dod": "Explains ARIES recovery algorithm phases and validates checksum-verified WAL replay.",
        "t2_details": "1. Implement torn-write corruption detector checking CRC32 checksums on WAL records during replay.\n2. Truncate corrupted partial writes and recover state to last valid log record.\n3. Write automated unit tests simulating disk write failures and partial record recovery.",
        "t2_why": "Handling torn writes and corrupt log files is essential for production database reliability.",
        "t2_dod": "Torn-write recovery module successfully recovers clean state up to point of corruption."
    },
    "Trapping Rain Water": {
        "t1_details": "1. Solve Trapping Rain Water using two-pointer approach tracking left_max and right_max bounds.\n2. Move pointer pointing to smaller maximum wall inward, accumulating water: max - height[i].\n3. Contrast two-pointer O(1) space solution against O(N) auxiliary space prefix/suffix array solution.\n4. Prove trapped water at index i equals min(left_max, right_max) - height[i].",
        "t1_why": "Trapping Rain Water is the gold-standard Hard two-pointer question asked at FAANG companies.",
        "t1_dod": "Solves Trapping Rain Water in O(N) time and O(1) space using two-pointer bounded maximums.",
        "t2_details": "1. Build an elevation water runoff simulation engine modeling liquid accumulation across terrains.\n2. Process 1D and 2D elevation profiles computing trapped fluid volumes and overflow spillways.\n3. Visualize elevation profiles and trapped water columns using terminal ASCII graphics.",
        "t2_why": "Fluid accumulation algorithms power geospatial modeling and game development physics engines.",
        "t2_dod": "Simulation engine accurately computes trapped water volumes across complex elevation profiles."
    },
    "Median of Two Sorted Arrays": {
        "t1_details": "1. Partition both sorted arrays into left and right halves containing equal total elements.\n2. Binary search on partition cut of smaller array ensuring O(log(min(M, N))) runtime.\n3. Verify partition condition: maxLeftA <= minRightB and maxLeftB <= minRightA.\n4. Handle edge cases with INT_MIN and INT_MAX when partition cuts hit array boundaries.",
        "t1_why": "Median of Two Sorted Arrays is the ultimate test of advanced binary search partition logic.",
        "t1_dod": "Finds median of two sorted arrays in optimal O(log(min(M, N))) time without merging.",
        "t2_details": "1. Implement a distributed streaming percentile aggregator finding median across two sorted streams.\n2. Connect mock data streams feeding sorted real-time metrics from two independent cluster nodes.\n3. Benchmark binary search partition calculation against full stream merge and sort.",
        "t2_why": "Distributed percentile calculation enables low-latency telemetry aggregation across cluster nodes.",
        "t2_dod": "Stream aggregator computes exact median across partitioned data streams in sub-millisecond time."
    },
    "STAR Method": {
        "t1_details": "1. Deconstruct STAR framework: Situation (context), Task (objective), Action (what YOU did), Result (metrics).\n2. Draft 3 compelling stories: a challenging bug, a team conflict, and an architectural trade-off.\n3. Quantify every result with concrete numbers: latency reduced by 40%, throughput increased by 3x.\n4. Rehearse delivering each response aloud keeping duration strictly between 90 and 120 seconds.",
        "t1_why": "Structured STAR responses turn behavioral questions into concrete demonstrations of engineering competence.",
        "t1_dod": "Drafts and rehearses 3 STAR responses with quantified results within 2-minute speaking limits.",
        "t2_details": "1. Record video answering 'Tell me about a time you made a technical mistake'.\n2. Analyze recording for filler words, technical depth, clarity, and confident body language.\n3. Refine answers into bullet-point cheat sheets for quick review before technical interview rounds.",
        "t2_why": "Video rehearsal exposes vocal mannerisms and builds poised, professional interview communication.",
        "t2_dod": "Recorded behavioral video reviewed with documented adjustments to pacing and technical clarity."
    },
    "Live Cloud Deployment": {
        "t1_details": "1. Configure Dockerfile and docker-compose definitions for backend Node and PostgreSQL services.\n2. Set up environment variables and database connection strings on Render or Vercel.\n3. Execute automated schema migrations against cloud managed database during deployment pipeline.\n4. Verify health check and public endpoints respond with HTTP 200 status.",
        "t1_why": "Deploying full-stack applications to public cloud providers is the ultimate demonstration of practical SDE readiness.",
        "t1_dod": "Placement portal backend and database are deployed live to cloud with working public URLs.",
        "t2_details": "1. Configure SSL/TLS certificates and custom domain DNS routing records on hosting dashboard.\n2. Run automated smoke tests querying live cloud API endpoints with sample payloads.\n3. Document live deployment architecture, public demo URLs, and test credentials in README.",
        "t2_why": "Cloud deployment verification guarantees production availability and provides live demo links for recruiters.",
        "t2_dod": "Public API responds to live requests and documentation includes verified deployment links."
    },
    "Vector Databases": {
        "t1_details": "1. Diagram vector indexing structures: HNSW graphs, Inverted File (IVF), and Product Quantization.\n2. Contrast exact k-NN search against Approximate Nearest Neighbor (ANN) recall and latency.\n3. Evaluate vector distance metrics: Cosine Distance, Euclidean L2, and Dot Product angles.\n4. Prepare defensible explanations for embedding drift, re-indexing costs, and chunk size trade-offs.",
        "t1_why": "Defending vector database trade-offs and ANN index mechanics is required for GenAI engineering interviews.",
        "t1_dod": "Explains HNSW graph construction and defends distance metric choices with mathematical rigor.",
        "t2_details": "1. Benchmark query latency and recall between flat index and HNSW index in ChromaDB.\n2. Profile memory consumption scaling across 100,000 high-dimensional vector embeddings on disk.\n3. Write technical defense notes answering top 5 vector retrieval architecture interview questions.",
        "t2_why": "Empirical benchmarking of ANN algorithms equips you to justify vector database selections in interviews.",
        "t2_dod": "Benchmarking script outputs latency-recall trade-off curves for flat versus HNSW indexing."
    },
    "Tell Me About Yourself": {
        "t1_details": "1. Draft 90-second elevator pitch connecting academic foundation, core projects, and technical drive.\n2. Emphasize transition from theoretical problem solving to building scalable full-stack and ML systems.\n3. Rehearse pitch aloud timing delivery to remain strictly between 75 and 90 seconds.\n4. Eliminate filler phrases, academic jargon, and chronological life stories from the script.",
        "t1_why": "The first 90 seconds set the psychological tone and baseline perception for the entire interview.",
        "t1_dod": "Delivers polished 90-second professional narrative with clear technical highlights and zero hesitation.",
        "t2_details": "1. Record video delivering 'Tell Me About Yourself' and 'Why This Role?' aloud.\n2. Score video against communication rubric: eye contact, pacing, vocal energy, and structure.\n3. Refine delivery and write bullet-point cue cards for pre-interview mental warmup.",
        "t2_why": "Video review eliminates unconscious nervous ticks and builds confident executive communication presence.",
        "t2_dod": "Recorded video meets 90-second target with strong delivery and documented self-critique notes."
    },
    "Capstone Defense": {
        "t1_details": "1. Prepare 3-minute architectural walkthrough for Placement Portal, ML Microservice, and KV Store.\n2. State key design trade-offs made: relational normalization, async processing, and WAL crash recovery.\n3. Formulate answers to challenging follow-ups: concurrency bottlenecks, schema evolution, and failure modes.\n4. Rehearse technical defense aloud answering 'What would you do differently if rebuilding today?'.",
        "t1_why": "Defending project architecture under adversarial questioning separates real engineers from tutorial copycats.",
        "t1_dod": "Delivers comprehensive architectural defense for all 3 capstones answering technical trade-offs with poise.",
        "t2_details": "1. Record a mock architectural defense session explaining system diagrams and code modules.\n2. Review recording identifying vague answers or hand-waving explanations around system bottlenecks.\n3. Create one-page architecture summary sheets with system diagrams for each capstone project.",
        "t2_why": "Clear architectural defense diagrams and crisp trade-off explanations impress senior interview panels.",
        "t2_dod": "One-page architecture defense sheets created with documented system diagrams and trade-offs."
    },

    # -------------------------------------------------------------
    # DEFAULT / FALLBACK TEMPLATES FOR WEEKS 19-26
    # -------------------------------------------------------------
    "_default_revision": {
        "t1_details": "1. Pick 3 previously solved problems from this pattern in your revision queue.\n2. Re-solve the first problem under a strict 20-minute countdown timer.\n3. Solve the second and third problems without looking at notes or hints.\n4. Write down time/space complexity and update error log with any mistakes.",
        "t1_why": "Timed revision under realistic constraints builds speed, accuracy, and pattern recall for interviews.",
        "t1_dod": "Solves 3 pattern problems independently under timer constraints with zero reference materials.",
        "t2_details": "1. Review systems or core CS topics linked to this day's technical focus.\n2. Write out concise answers to 5 top technical interview questions from memory.\n3. Implement a mini-benchmark or unit test verifying the core concept locally.",
        "t2_why": "Pairing algorithmic drills with CS fundamentals keeps systems knowledge sharp for technical interviews.",
        "t2_dod": "Completes self-viva on 5 core CS questions and commits code notes to GitHub repository."
    },
    "Online Assessment": {
        "t1_details": "1. Set a 60-minute countdown timer on HackerRank or Codeforces contest problems.\n2. Read all problem statements first and triage by difficulty and pattern type.\n3. Implement optimal solutions under time pressure and test all custom edge cases.\n4. Analyze failure points and write post-mortem notes for any unpassed hidden tests.",
        "t1_why": "Online Assessments (OAs) filter over 80% of internship applicants before human interview rounds.",
        "t1_dod": "Completes 60-minute OA contest simulation and writes post-mortem notes on edge cases.",
        "t2_details": "1. Review common OA trick questions including modulo arithmetic and large input constraints.\n2. Write reusable code templates for fast I/O and standard utility functions.\n3. Benchmark time limit compliance against inputs sized at 100,000 to 1,000,000 elements.",
        "t2_why": "OA rounds enforce strict runtime limits where standard I/O overhead causes avoidable timeouts.",
        "t2_dod": "Fast I/O template verified passing benchmark tests on large input sizes."
    },
    "_default_mock": {
        "t1_details": "1. Select 2 unseen medium problems representing target company interview pools.\n2. Set a 45-minute countdown timer on a blank text editor with no autocomplete.\n3. Speak thoughts aloud continuously while deriving the approach on paper.\n4. Code and dry-run test cases before running any compiler or test suite.",
        "t1_why": "Simulating high-pressure interview conditions eliminates blank-page panic and sharpens communication.",
        "t1_dod": "Completes 45-minute timed mock coding round explaining thought process aloud throughout.",
        "t2_details": "1. Record a 15-minute video answering architectural or systems design questions.\n2. Review recording identifying verbal pauses, clarity gaps, or technical inaccuracies.\n3. Refine answers into crisp 2-minute STAR format responses highlighting engineering rigor.",
        "t2_why": "Self-recording exposes communication blind spots and builds executive interview presence.",
        "t2_dod": "Records and reviews mock interview video logging actionable communication improvements."
    },
    "_default_career": {
        "t1_details": "1. Tailor your resume bullet points for 5 specific internship job descriptions.\n2. Draft personalized cold outreach messages for hiring managers and technical recruiters.\n3. Submit 5 high-quality job applications tracking details in an applications spreadsheet.\n4. Follow up on previous applications submitted over 7 business days ago.",
        "t1_why": "Consistent, targeted outreach and application momentum are required to secure interview callbacks.",
        "t1_dod": "Submits 5 tailored internship applications and logs recruiter outreach in tracking sheet.",
        "t2_details": "1. Polish GitHub repositories by adding architecture diagrams and clean README documentation.\n2. Verify all live deployment links and interactive demo URLs are fully operational.\n3. Update LinkedIn profile with latest project accomplishments, technical skills, and demo links.",
        "t2_why": "A spotless public developer profile converts recruiter profile views into interview invitations.",
        "t2_dod": "GitHub project READMEs polished and LinkedIn profile updated with live project links."
    },
    "_default_evaluation": {
        "t1_details": "1. Complete the weekly timed assessment under strict exam conditions with no hints.\n2. Score your solutions against the rubric without giving partial credit leniency.\n3. Add all failed or hinted questions to the spaced repetition revision queue.\n4. Review core pattern takeaways and write a 1-page weekly progress retrospective.",
        "t1_why": "Objective self-evaluation reveals genuine knowledge gaps before real company interviewers find them.",
        "t1_dod": "Completes weekly evaluation, logs weak areas into revision queue, and writes review summary.",
        "t2_details": "1. Audit weekly codebase commits and organize solutions into clear topic folders.\n2. Review code cleanliness, comments, and time complexity documentation across solved problems.\n3. Push clean weekly progress updates to your public portfolio repository on GitHub.",
        "t2_why": "Consistent repository maintenance builds a compelling public record of long-term discipline.",
        "t2_dod": "Weekly code pushed to GitHub with clean folder organization and updated summary log."
    }
}
