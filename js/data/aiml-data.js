// 18 Structured AI/ML Specialization Modules with Objectives, Resources, Exercises & Knowledge Checks
const initialAimlModules = [
  {
    "id": "aiml-01",
    "title": "Python Foundations for AI/ML",
    "level": "Foundational",
    "month": 1,
    "week": 1,
    "objectives": [
      "Master Python list comprehensions, generator expressions, and lambda functions",
      "Understand deep vs shallow copy, mutable default arguments, and memory management",
      "Write clean object-oriented Python with classes, dunder methods (__init__, __repr__, __call__), and inheritance",
      "Manage virtual environments (venv, uv, poetry) and requirements.txt isolation"
    ],
    "resourceLinks": [
      {
        "title": "Python Official Documentation - Tutorial",
        "url": "https://docs.python.org/3/tutorial/"
      },
      {
        "title": "Real Python - OOP in Python 3",
        "url": "https://realpython.com/python3-object-oriented-programming/"
      }
    ],
    "practicalExercises": [
      "Implement a custom Vector class supporting addition, dot product, and scalar multiplication using dunder methods",
      "Build an in-memory CSV parser with exception handling without using third-party libraries",
      "Write memory-efficient generator functions to process streaming simulated sensor logs"
    ],
    "miniProject": "Custom In-Memory Data Structure & Stream Processor with Unit Tests",
    "knowledgeChecks": [
      "What is the difference between shallow copy and deep copy in Python lists and dictionaries?",
      "Why should you never use mutable data structures (like [] or {}) as default arguments in functions?",
      "How does Python's Global Interpreter Lock (GIL) affect multi-threaded CPU-bound programs vs I/O-bound tasks?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-02",
    "title": "Mathematics for Machine Learning",
    "level": "Foundational",
    "month": 1,
    "week": 2,
    "objectives": [
      "Understand vector spaces, dot products, vector norms (L1, L2, L-infinity), and cosine similarity",
      "Master matrix multiplication, transposes, determinants, inverses, and rank",
      "Learn calculus derivatives, partial derivatives, directional gradients, and the gradient vector intuition",
      "Understand why optimization involves following the negative gradient vector"
    ],
    "resourceLinks": [
      {
        "title": "Khan Academy - Linear Algebra",
        "url": "https://www.khanacademy.org/math/linear-algebra"
      },
      {
        "title": "Khan Academy - Multivariable Calculus",
        "url": "https://www.khanacademy.org/math/multivariable-calculus"
      }
    ],
    "practicalExercises": [
      "Compute dot products, matrix inverses, and eigenvalues manually on paper for 2x2 and 3x3 matrices",
      "Derive the partial derivatives of Mean Squared Error loss with respect to weight and bias",
      "Write a pure Python gradient descent loop from scratch to find the minimum of f(x, y) = x^2 + 2y^2"
    ],
    "miniProject": "Pure Python & NumPy Vector Math Library with Gradient Descent Solver",
    "knowledgeChecks": [
      "What is the geometric meaning of the dot product between two normalized vectors?",
      "What condition must be met for a square matrix to have an inverse?",
      "Why is the gradient vector perpendicular to the contour level curves of a function?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-03",
    "title": "Statistics & Probability",
    "level": "Foundational",
    "month": 2,
    "week": 6,
    "objectives": [
      "Understand measures of central tendency (mean, median, mode) and dispersion (variance, standard deviation, IQR)",
      "Master probability distributions: Uniform, Normal (Gaussian), Binomial, and Poisson",
      "Understand conditional probability, Bayes' Theorem, and Maximum Likelihood Estimation (MLE)",
      "Learn covariance, Pearson correlation, Spearman rank correlation, and p-values"
    ],
    "resourceLinks": [
      {
        "title": "Khan Academy - Statistics and Probability",
        "url": "https://www.khanacademy.org/math/statistics-probability"
      },
      {
        "title": "Seeing Theory - Visual Introduction to Probability",
        "url": "https://seeing-theory.brown.edu/"
      }
    ],
    "practicalExercises": [
      "Verify the Central Limit Theorem by sampling uniform random variables in Python and plotting distribution convergence",
      "Implement Bayes' Theorem calculator for medical diagnostic test probabilities",
      "Compute covariance and correlation matrices manually and compare with NumPy outputs"
    ],
    "miniProject": "Statistical Hypothesis Testing & Distribution Visualizer Script",
    "knowledgeChecks": [
      "Why is the median more robust than the mean when a dataset contains severe outliers?",
      "State Bayes' Theorem and define prior probability, likelihood, and posterior probability.",
      "What does a Pearson correlation coefficient of 0 imply regarding linear vs non-linear relationships?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-04",
    "title": "NumPy & Pandas for Data Engineering",
    "level": "Foundational",
    "month": 1,
    "week": 3,
    "objectives": [
      "Master NumPy ndarray vectorization, broadcasting rules, and memory strides",
      "Learn Pandas Series, DataFrames, loc vs iloc, boolean masking, and index manipulation",
      "Execute groupby aggregations, pivot tables, merges, joins, and rolling windows efficiently",
      "Profile and eliminate Python loops by vectorizing Pandas operations"
    ],
    "resourceLinks": [
      {
        "title": "NumPy User Guide",
        "url": "https://numpy.org/doc/stable/user/"
      },
      {
        "title": "Pandas User Guide - 10 Minutes to Pandas",
        "url": "https://pandas.pydata.org/docs/user_guide/10min.html"
      }
    ],
    "practicalExercises": [
      "Load a 100,000-row real estate dataset and perform conditional filtering, group aggregations, and percentiles",
      "Demonstrate NumPy broadcasting between a 3x3 matrix and a 1x3 row vector without loops",
      "Clean messy dates, currency strings, and missing values using Pandas vector methods"
    ],
    "miniProject": "High-Throughput E-commerce Transaction Data Cleaning & Analytics Pipeline",
    "knowledgeChecks": [
      "Explain how NumPy broadcasting works when dimensions of two arrays do not match.",
      "What is the difference between df.loc[] and df.iloc[]?",
      "Why is iterating over DataFrame rows with for loop (or iterrows) considered an anti-pattern in Pandas?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-05",
    "title": "Data Visualization & Exploratory Data Analysis (EDA)",
    "level": "Core",
    "month": 1,
    "week": 4,
    "objectives": [
      "Create informative histograms, boxplots, scatterplots, heatmaps, and pairplots with Matplotlib and Seaborn",
      "Identify distributions, skews, outliers, multi-collinearity, and class imbalance visually",
      "Structure a professional Jupyter Notebook with business context, hypotheses, and clear visual deductions",
      "Avoid misleading visual charts (e.g. truncated axes, inappropriate color scales)"
    ],
    "resourceLinks": [
      {
        "title": "Seaborn Official Gallery & Tutorials",
        "url": "https://seaborn.pydata.org/tutorial.html"
      },
      {
        "title": "Matplotlib Visualization Guide",
        "url": "https://matplotlib.org/stable/tutorials/index.html"
      }
    ],
    "practicalExercises": [
      "Perform comprehensive EDA on the Titanic or Housing dataset with 8 distinct figure visualizations",
      "Plot correlation heatmaps and identify features with correlation coefficient |r| > 0.85",
      "Create boxplots to identify anomalies and compare category medians across different target classes"
    ],
    "miniProject": "End-to-End EDA Report on Student Placement Dataset with Actionable Insights",
    "knowledgeChecks": [
      "What does a boxplot show (interquartile range, whiskers, outliers)?",
      "Why should you inspect the distribution of target variables before choosing a regression evaluation metric?",
      "How do you visually detect multi-collinearity between continuous features?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-06",
    "title": "Data Preprocessing & Feature Engineering",
    "level": "Core",
    "month": 4,
    "week": 15,
    "objectives": [
      "Handle missing values systematically (Mean, Median, Mode, KNN Imputer, Indicator flags)",
      "Encode categorical variables properly (One-Hot, Target Encoding, Ordinal Encoding) without target leakage",
      "Apply feature scaling (StandardScaler vs MinMaxScaler vs RobustScaler) and understand when algorithms require it",
      "Detect and rigorously prevent data leakage during train-test splitting and cross-validation"
    ],
    "resourceLinks": [
      {
        "title": "Scikit-Learn Preprocessing Guide",
        "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
      },
      {
        "title": "Preventing Data Leakage in ML (Scikit-Learn)",
        "url": "https://scikit-learn.org/stable/common_pitfalls.html"
      }
    ],
    "practicalExercises": [
      "Construct a reproducible Scikit-Learn ColumnTransformer that handles mixed numerical and categorical features",
      "Demonstrate a deliberate data leakage error and show how using Pipeline fixes the problem",
      "Build polynomial and interaction features and assess model variance changes"
    ],
    "miniProject": "Leak-Free Modular Preprocessing Pipeline with Scikit-Learn ColumnTransformer",
    "knowledgeChecks": [
      "Why must you fit the StandardScaler ONLY on the training set and transform the test set?",
      "What is data leakage and describe two distinct ways it accidentally happens in production projects?",
      "When should you choose RobustScaler instead of StandardScaler?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-07",
    "title": "Supervised Learning - Linear & Logistic Models",
    "level": "Core",
    "month": 2,
    "week": 9,
    "objectives": [
      "Understand Ordinary Least Squares (OLS) regression assumptions, loss function, and analytical solution",
      "Master Regularization: Ridge (L2 penalty) vs Lasso (L1 penalty feature selection) vs ElasticNet",
      "Understand Logistic Regression, Sigmoid activation, Log-Loss (Binary Cross-Entropy), and decision boundaries",
      "Implement both models using Scikit-Learn with calibrated probability outputs"
    ],
    "resourceLinks": [
      {
        "title": "Scikit-Learn Generalized Linear Models",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html"
      },
      {
        "title": "StatQuest - Logistic Regression Video Series",
        "url": "https://statquest.org/"
      }
    ],
    "practicalExercises": [
      "Train Ridge and Lasso regression on a multi-collinear dataset and plot coefficient shrinkage curves",
      "Tune regularization hyperparameter C on Logistic Regression using Stratified K-Fold cross-validation",
      "Extract feature weights and write a plain English explanation of model coefficients"
    ],
    "miniProject": "Employee Churn Predictor using Calibrated Logistic Regression with Odds Ratio Interpretation",
    "knowledgeChecks": [
      "Why does L1 regularization (Lasso) drive coefficients exactly to zero, while L2 (Ridge) only shrinks them?",
      "What is the mathematical output of the sigmoid function and why does it represent a probability?",
      "How do outliers influence Ordinary Least Squares vs Ridge regression?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-08",
    "title": "Tree-Based Models & Ensemble Learning",
    "level": "Core",
    "month": 3,
    "week": 14,
    "objectives": [
      "Understand Decision Tree splitting criteria: Gini Impurity, Information Gain (Entropy), and MSE reduction",
      "Master Bagging and Random Forests (Bootstrap sampling, feature sub-sampling, out-of-bag error)",
      "Understand Boosting intuition: sequential error correction, AdaBoost, and Gradient Boosting (GBM)",
      "Train and interpret Random Forest and XGBoost/LightGBM models on tabular datasets"
    ],
    "resourceLinks": [
      {
        "title": "Scikit-Learn Ensemble Methods Guide",
        "url": "https://scikit-learn.org/stable/modules/ensemble.html"
      },
      {
        "title": "XGBoost Documentation",
        "url": "https://xgboost.readthedocs.io/en/stable/"
      }
    ],
    "practicalExercises": [
      "Train a Random Forest Classifier and plot feature importances alongside SHAP summary values",
      "Compare training time, memory footprint, and test accuracy between Random Forest, Gradient Boosting, and XGBoost",
      "Tune max_depth, n_estimators, and min_samples_split using GridSearchCV and RandomizedSearchCV"
    ],
    "miniProject": "Loan Default Prediction Engine with Random Forest & Hyperparameter Search",
    "knowledgeChecks": [
      "Explain the difference between Bagging (Random Forest) and Boosting (Gradient Boosting).",
      "Why are Decision Trees prone to severe overfitting if no stopping criteria (like max_depth) are set?",
      "What are the advantages of tree-based models over linear models regarding feature scaling and missing values?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-09",
    "title": "Unsupervised Learning - Clustering & PCA",
    "level": "Core",
    "month": 3,
    "week": 13,
    "objectives": [
      "Understand K-Means clustering algorithm, Lloyd's optimization, centroid initialization (K-Means++), and inertia",
      "Determine optimal number of clusters using Elbow Method and Silhouette Analysis",
      "Master Principal Component Analysis (PCA): variance maximization, orthogonal projections, and scree plots",
      "Apply PCA for dimensionality reduction, visualization, and noise filtering before modeling"
    ],
    "resourceLinks": [
      {
        "title": "Scikit-Learn Clustering Guide",
        "url": "https://scikit-learn.org/stable/modules/clustering.html"
      },
      {
        "title": "Scikit-Learn Decompositions (PCA)",
        "url": "https://scikit-learn.org/stable/modules/decomposition.html"
      }
    ],
    "practicalExercises": [
      "Cluster customer purchase records into behavioral cohorts using K-Means with Silhouette score validation",
      "Reduce 50-dimensional gene or sensor data down to 2 principal components and plot a 2D cluster projection",
      "Calculate cumulative explained variance ratio to determine the minimum number of PCA components needed to retain 95% variance"
    ],
    "miniProject": "Customer Segmentation & Behavioral Clustering System with Interactive PCA Visualizer",
    "knowledgeChecks": [
      "Why is K-Means clustering sensitive to feature scaling and non-spherical cluster geometries?",
      "What does a Silhouette score close to -1 indicate about a data point's assignment?",
      "What are Principal Components mathematically in terms of the covariance matrix eigenvectors?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-10",
    "title": "Model Evaluation, Metrics & Validation Strategies",
    "level": "Core",
    "month": 3,
    "week": 14,
    "objectives": [
      "Deconstruct Confusion Matrix: True Positive, False Positive, True Negative, False Negative",
      "Master Precision, Recall, F1-Score, PR-AUC, and ROC-AUC curves",
      "Understand when accuracy is dangerously misleading on imbalanced datasets",
      "Master regression metrics: MAE, MSE, RMSE, R-Squared, and Adjusted R-Squared",
      "Implement Stratified K-Fold and Time-Series split validation strategies"
    ],
    "resourceLinks": [
      {
        "title": "Scikit-Learn Model Evaluation Metrics Guide",
        "url": "https://scikit-learn.org/stable/modules/model_evaluation.html"
      },
      {
        "title": "Google ML Crash Course - Classification Metrics",
        "url": "https://developers.google.com/machine-learning/crash-course/classification"
      }
    ],
    "practicalExercises": [
      "Evaluate a fraud detection model with 99.5% class imbalance using Precision-Recall curve instead of ROC-AUC",
      "Tune the decision probability threshold from 0.5 to an optimal cutoff maximizing F2-score (prioritizing recall)",
      "Run 5-Fold Stratified Cross-Validation and report mean score +/- standard deviation across folds"
    ],
    "miniProject": "Comprehensive ML Model Evaluation & Benchmarking Suite with Automated Metric Reports",
    "knowledgeChecks": [
      "In cancer detection or fraud monitoring, why is Recall typically far more critical than Precision?",
      "Why is ROC-AUC overly optimistic on heavily imbalanced datasets compared to the Precision-Recall curve?",
      "Explain the bias-variance tradeoff and how high training error vs high validation error diagnoses underfitting vs overfitting."
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-11",
    "title": "Deep Learning Fundamentals & Neural Networks",
    "level": "Advanced",
    "month": 4,
    "week": 16,
    "objectives": [
      "Understand the Artificial Neuron (Perceptron), weights, biases, and linear combinations",
      "Master non-linear activation functions: Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax, and their derivative behaviors",
      "Understand Forward Propagation, Loss functions (Cross-Entropy, MSE), and the Chain Rule of Calculus",
      "Master Backpropagation and optimization algorithms (SGD, Momentum, RMSprop, Adam)",
      "Learn regularization techniques in neural nets: Dropout, L2 weight decay, and Early Stopping"
    ],
    "resourceLinks": [
      {
        "title": "3Blue1Brown - Neural Networks Deep Dive",
        "url": "https://www.3blue1brown.com/topics/neural-networks"
      },
      {
        "title": "Deep Learning Book - Ian Goodfellow (Free Online)",
        "url": "https://www.deeplearningbook.org/"
      }
    ],
    "practicalExercises": [
      "Write a 2-layer Neural Network with backpropagation from scratch in pure NumPy without frameworks",
      "Train the network to solve the non-linear XOR classification problem and visualize decision boundary evolution",
      "Implement mini-batch gradient descent with momentum and observe convergence rate differences"
    ],
    "miniProject": "NumPy-Only Multi-Layer Perceptron (MLP) Framework with Configurable Activations & Optimizers",
    "knowledgeChecks": [
      "Why does a multi-layer neural network with only linear activation functions collapse into a single linear regression model?",
      "What is the vanishing gradient problem and how does the ReLU activation function mitigate it?",
      "How does Dropout during training prevent co-adaptation of neurons and reduce overfitting?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-12",
    "title": "PyTorch Foundations & Architecture",
    "level": "Advanced",
    "month": 4,
    "week": 17,
    "objectives": [
      "Master PyTorch Tensors, device placement (CPU vs GPU cuda), indexing, and reshaping",
      "Understand PyTorch Computational Graphs, torch.autograd, and gradient computation (loss.backward())",
      "Build modular neural network architectures using torch.nn.Module, layers, and activations",
      "Implement idiomatic Dataset and DataLoader abstractions with custom batching and shuffling",
      "Write robust, reusable training and validation loops with loss tracking and checkpoint saving"
    ],
    "resourceLinks": [
      {
        "title": "PyTorch Official Tutorials - Deep Learning with PyTorch: A 60 Minute Blitz",
        "url": "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html"
      },
      {
        "title": "PyTorch Official Documentation",
        "url": "https://pytorch.org/docs/stable/index.html"
      }
    ],
    "practicalExercises": [
      "Construct a custom PyTorch Dataset class that reads raw CSV data, normalizes tensors, and yields mini-batches",
      "Write a clean PyTorch training loop that tracks train_loss, val_loss, calculates validation accuracy, and saves the best model weights",
      "Inspect gradients with tensorboard or logging to verify backpropagation stability"
    ],
    "miniProject": "PyTorch Image / Tabular Classifier with Checkpointing, Early Stopping & TensorBoard Logging",
    "knowledgeChecks": [
      "What does optimizer.zero_grad() do and why is it necessary before calling loss.backward() in PyTorch?",
      "What is the purpose of model.eval() and with torch.no_grad(): during inference?",
      "What is the difference between model(inputs) and model.forward(inputs) in PyTorch?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-13",
    "title": "Natural Language Processing (NLP) Fundamentals",
    "level": "Advanced",
    "month": 4,
    "week": 17,
    "objectives": [
      "Learn text normalization, tokenization, stemming, lemmatization, stop-word removal, and regular expressions",
      "Master traditional vector representations: Bag of Words (BoW) and Term Frequency-Inverse Document Frequency (TF-IDF)",
      "Understand dense word embeddings (Word2Vec, GloVe) and vector semantic arithmetic (King - Man + Woman = Queen)",
      "Train classical NLP classifiers (Naive Bayes, Logistic Regression) on sentiment analysis benchmarks"
    ],
    "resourceLinks": [
      {
        "title": "Hugging Face - NLP Course: Introduction",
        "url": "https://huggingface.co/learn/nlp-course/chapter1/1"
      },
      {
        "title": "Stanford CS224N: Natural Language Processing with Deep Learning",
        "url": "https://web.stanford.edu/class/cs224n/"
      }
    ],
    "practicalExercises": [
      "Build an end-to-end spam SMS classification pipeline using TF-IDF vectorizer and Multinomial Naive Bayes",
      "Compute cosine similarity between pre-trained Word2Vec embeddings for semantic analogy verification",
      "Extract entities and keywords from real customer support tickets using regex and spaCy"
    ],
    "miniProject": "Customer Support Ticket Sentiment & Urgency Classifier using TF-IDF & Linear Models",
    "knowledgeChecks": [
      "What does the IDF (Inverse Document Frequency) formula calculate and why are common words penalized?",
      "What is the primary limitation of Bag of Words representations compared to dense word embeddings?",
      "Why is lemmatization generally preferred over stemming in modern NLP workflows?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-14",
    "title": "Embeddings & Transformer Architecture",
    "level": "Advanced",
    "month": 4,
    "week": 18,
    "objectives": [
      "Understand why RNNs and LSTMs were replaced by Transformers (sequential bottleneck vs parallel attention)",
      "Deconstruct the Self-Attention mechanism: Query (Q), Key (K), and Value (V) dot-product matrix operations",
      "Understand Multi-Head Attention, Positional Encodings, Feedforward Networks, and Layer Normalization",
      "Learn BERT (Encoder-only for classification) vs GPT (Decoder-only for autoregressive generation) architectures",
      "Use Hugging Face Transformers pipeline for inference and feature extraction"
    ],
    "resourceLinks": [
      {
        "title": "The Illustrated Transformer - Jay Alammar",
        "url": "https://jalammar.github.io/illustrated-transformer/"
      },
      {
        "title": "Hugging Face Transformers Documentation",
        "url": "https://huggingface.co/docs/transformers/index"
      }
    ],
    "practicalExercises": [
      "Compute scaled dot-product attention manually on small 4x4 toy matrices using NumPy",
      "Load a Hugging Face pre-trained model (e.g. distilbert-base-uncased) and extract 768-dimensional sentence embeddings",
      "Perform semantic document clustering on news headlines using sentence-transformers"
    ],
    "miniProject": "Semantic Document Search Engine using Hugging Face Sentence Transformers & Cosine Index",
    "knowledgeChecks": [
      "Why is the dot product of Q and K divided by sqrt(d_k) in the scaled dot-product attention equation?",
      "What role do Positional Encodings play in Transformer models?",
      "Contrast the training objectives of BERT (Masked Language Modeling) and GPT (Causal Next-Token Prediction)."
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-15",
    "title": "Generative AI & LLM Engineering",
    "level": "Advanced",
    "month": 4,
    "week": 18,
    "objectives": [
      "Understand LLM tokenization (Byte-Pair Encoding, tiktoken) and token-to-cost conversions",
      "Master systematic prompt engineering: System prompts, Few-Shot prompting, Chain-of-Thought, and structured JSON outputs",
      "Understand sampling hyperparameters: Temperature, Top-P, Top-K, and Frequency/Presence penalties",
      "Identify and engineer defenses against hallucinations, prompt injections, and API rate limits"
    ],
    "resourceLinks": [
      {
        "title": "Prompt Engineering Guide (DAIR.AI)",
        "url": "https://www.promptingguide.ai/"
      },
      {
        "title": "OpenAI / Anthropic API Cookbook & Best Practices",
        "url": "https://github.com/openai/openai-cookbook"
      }
    ],
    "practicalExercises": [
      "Write a resilient LLM wrapper that enforces strict Pydantic JSON schema output validation and handles retries",
      "Build an automated interview response evaluator that grades student answers against a structured rubric",
      "Implement Chain-of-Thought prompting to solve multi-step mathematical reasoning queries reliably"
    ],
    "miniProject": "Automated Technical Resume & Job Description Compatibility Analyzer with Structured JSON Output",
    "knowledgeChecks": [
      "How does setting Temperature to 0.0 differ from setting it to 1.0 when generating code or JSON?",
      "What is a Prompt Injection attack and how can you isolate untrusted user inputs from system instructions?",
      "What is Byte-Pair Encoding (BPE) and why do LLMs sometimes struggle with character-level counting tasks?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-16",
    "title": "Retrieval-Augmented Generation (RAG) Architecture",
    "level": "Advanced",
    "month": 4,
    "week": 18,
    "objectives": [
      "Understand RAG components: Document Ingestion, Chunking strategies (fixed vs recursive character), Embedding, Vector Store, Retrieval, Prompt Augmentation, Generation",
      "Work with Vector Databases: ChromaDB / FAISS / Qdrant for Approximate Nearest Neighbor (ANN) index search",
      "Implement metadata filtering, top-k retrieval, and re-ranking (cross-encoders)",
      "Evaluate RAG retrieval quality: Context Precision, Context Recall, and Faithfulness"
    ],
    "resourceLinks": [
      {
        "title": "ChromaDB Documentation & Getting Started",
        "url": "https://docs.trychroma.com/"
      },
      {
        "title": "Pinecone - RAG Architecture Masterclass",
        "url": "https://www.pinecone.io/learn/retrieval-augmented-generation/"
      }
    ],
    "practicalExercises": [
      "Ingest a 20-page technical PDF, chunk it into 500-character segments with 100-character overlap, and store in ChromaDB",
      "Query the vector store with semantic questions and inject the retrieved top-3 contexts into an LLM prompt",
      "Demonstrate how RAG completely prevents hallucination when asking questions about proprietary documents"
    ],
    "miniProject": "Private Documentation Q&A Bot with ChromaDB, Recursive Chunking & Source Citation",
    "knowledgeChecks": [
      "Why is naive large-chunk indexing problematic for vector search relevance?",
      "What is the difference between dense vector retrieval (bi-encoders) and re-ranking (cross-encoders)?",
      "What happens if irrelevant context is retrieved and injected into the LLM prompt (Context Poisoning)?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-17",
    "title": "FastAPI & Microservice Development for ML",
    "level": "Production",
    "month": 4,
    "week": 18,
    "objectives": [
      "Understand why FastAPI is standard for ML serving (high performance, async ASGI, Pydantic type validation, automatic Swagger/OpenAPI docs)",
      "Build RESTful prediction endpoints accepting JSON payloads and returning validated schemas",
      "Manage model lifecycle: Load serialized model (Joblib/ONNX) once on application startup using lifespan handlers",
      "Implement input validation, HTTP exception handling, health checks, and request logging"
    ],
    "resourceLinks": [
      {
        "title": "FastAPI Official Documentation",
        "url": "https://fastapi.tiangolo.com/"
      },
      {
        "title": "Pydantic Documentation",
        "url": "https://docs.pydantic.dev/"
      }
    ],
    "practicalExercises": [
      "Serialize a trained Scikit-Learn pipeline to disk using joblib.dump() and load it in FastAPI",
      "Create a POST /predict endpoint with Pydantic request body validation, handling missing or invalid data types with HTTP 422",
      "Add a GET /health endpoint returning API status, model version, and uptime metadata"
    ],
    "miniProject": "Production-Ready FastAPI ML Model Serving API with Swagger Docs & Pydantic Validation",
    "knowledgeChecks": [
      "Why must ML model artifacts be loaded into memory during startup rather than inside each request function?",
      "What is the role of Pydantic in FastAPI route handlers?",
      "How do ASGI async handlers improve throughput for I/O-bound microservices compared to WSGI Flask servers?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  },
  {
    "id": "aiml-18",
    "title": "Model Deployment, Testing & Production Monitoring",
    "level": "Production",
    "month": 4,
    "week": 18,
    "objectives": [
      "Containerize Python & FastAPI applications using Docker (Dockerfile, requirements, non-root user)",
      "Deploy microservices to cloud hosting (Render, Railway, Hugging Face Spaces)",
      "Understand Model Drift vs Data Drift and monitoring concepts",
      "Write automated unit tests using pytest for model prediction outputs and API endpoints"
    ],
    "resourceLinks": [
      {
        "title": "Docker Documentation - Get Started",
        "url": "https://docs.docker.com/get-started/"
      },
      {
        "title": "Render - Deploy FastAPI Service Guide",
        "url": "https://render.com/docs/deploy-fastapi"
      }
    ],
    "practicalExercises": [
      "Write a clean Dockerfile for your FastAPI ML microservice and run the container locally",
      "Write 5 automated tests with pytest and TestClient verifying valid predictions and error handling",
      "Deploy the containerized model API to a free cloud host and test with curl or Postman"
    ],
    "miniProject": "Fully Deployed Containerized ML Microservice with Automated Pytest CI Suite",
    "knowledgeChecks": [
      "What is the difference between Data Drift (Covariate Shift) and Concept Drift?",
      "Why should Docker containers run under a non-root user in production environments?",
      "How does containerization solve the 'works on my machine' dependency problem in ML deployments?"
    ],
    "status": "not_started",
    "outputEvidence": "",
    "notes": ""
  }
];
