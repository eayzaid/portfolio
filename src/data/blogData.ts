export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'AI & ML' | 'Systems & Architecture' | 'Software Engineering';
  tags: string[];
  featured?: boolean;
  content: string[];
  takeaways: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'building-dokumind-rag-pipeline',
    title: 'Building DokuMind: Multi-Document RAG Pipelines with LangChain & Hybrid Search',
    excerpt: 'Designing an end-to-end Retrieval-Augmented Generation system for complex PDFs using semantic embeddings, recursive chunking, and hybrid re-ranking.',
    date: 'Sep 15, 2026',
    readTime: '6 min read',
    category: 'AI & ML',
    tags: ['RAG', 'LangChain', 'Vector DB', 'Embeddings', 'Python'],
    featured: true,
    takeaways: [
      'Document chunking strategy directly dictates retrieval fidelity more than LLM prompt phrasing.',
      'Hybrid dense-sparse retrieval (BM25 + vector search) prevents hallucination on domain-specific terminology.',
      'Async streaming responses significantly reduce perceived latency for long multi-document syntheses.',
    ],
    content: [
      'When working with multi-hundred-page technical reports, financial filings, and academic papers, standard naive Retrieval-Augmented Generation (RAG) fails in subtle ways. Context fragmentation, lost tabular structures, and semantic drift across chapters lead to either hallucinatory answers or generic non-committal summaries.',
      'In building **DokuMind**, our goal was to eliminate these failures by designing a deterministic document ingestion and hybrid querying pipeline capable of answering needle-in-a-haystack questions across dozens of simultaneous PDF uploads.',
      '### 1. Hierarchical & Recursive Chunking',
      'The naive approach of splitting text into fixed chunks of 500 characters breaks paragraphs mid-sentence and discards headers. We implemented a hierarchical recursive character text splitter with dynamic overlap tuned to sentence boundaries and markdown header levels (#, ##, ###). This preserves semantic unit boundaries while maintaining contextual breadcrumbs.',
      '### 2. Hybrid Retrieval: BM25 Meets Dense Embeddings',
      'Pure vector similarity often falters with precise serial numbers, acronyms, or specific chemical/financial codes that have weak dense representations. By coupling dense cosine similarity embeddings with BM25 lexical ranking via reciprocal rank fusion (RRF), DokuMind accurately captures both thematic intent and exact keyword matches.',
      '### 3. Verification & Citation Generation',
      'To provide rock-solid trust, every synthesized paragraph contains strict footnote citations pointing directly to document IDs and page numbers. The user can jump directly to the verified passage in the built-in PDF viewer.',
    ],
  },
  {
    id: 'post-2',
    slug: 'anomaly-detection-open-banking',
    title: 'Real-Time Anomaly Detection in Open Banking APIs with Isolation Forests',
    excerpt: 'How we tackled high-throughput financial fraud detection at NT SHIELD with sub-10ms inference and zero false-positive tolerance.',
    date: 'Jul 28, 2026',
    readTime: '8 min read',
    category: 'AI & ML',
    tags: ['Anomaly Detection', 'Open Banking', 'FastAPI', 'Scikit-Learn', 'Security'],
    featured: true,
    takeaways: [
      'Feature engineering based on temporal transaction velocity is more predictive than raw transaction amounts.',
      'Model latency must strictly respect SLA budgets under 10ms to avoid blocking live payment gateways.',
      'Adaptive thresholding prevents seasonal spending spikes from triggering false alarms.',
    ],
    content: [
      'In modern Open Banking architectures conforming to PSD2 and open API specifications, financial transactions pass through distributed gateways in hundreds of transactions per second. At **NT SHIELD**, maintaining real-time vigilance against fraud without introducing perceptible checkout latency was our core engineering challenge.',
      '### 1. The Real-Time Scoring Constraint',
      'Banking APIs operate under strict Service Level Agreements (SLAs). If fraud scoring exceeds 15ms, downstream payment processors timeout. Therefore, heavy transformer networks were ruled out in favor of optimized ensemble decision-tree models and Isolation Forests running in compiled C-extensions.',
      '### 2. Feature Extraction at the Edge',
      'Raw transactions only provide amount, recipient, and timestamp. The real signal comes from temporal velocity: *how many transactions occurred in the last 120 seconds?*, *how does this location compare to the last 30-day centroid?*, and *is the merchant category atypical for this account?*. We pre-computed sliding window aggregates in Redis to keep feature hydration under 2ms.',
      '### 3. Isolation Forest Architecture',
      'Isolation Forests exploit the fact that anomalies are few and structurally distinct from normal transactional patterns. By isolating points using random partitions, anomalous instances require significantly fewer splits. Combined with an adaptive quantile scoring threshold, we lowered false positive rejections by 38% compared to traditional rule-based filters.',
    ],
  },
  {
    id: 'post-3',
    slug: 'scaling-egrading-platform',
    title: 'Architecting eGrading: Managing Automated Code Evaluation at Scale',
    excerpt: 'Managing concurrency, distributed worker queues, and isolated sandboxes for grading 1,000+ monthly university exams.',
    date: 'May 10, 2026',
    readTime: '7 min read',
    category: 'Systems & Architecture',
    tags: ['Node.js', 'MongoDB', 'Sandboxing', 'Docker', 'Distributed Systems'],
    takeaways: [
      'Untrusted student code must be executed in ephemeral, resource-constrained isolated containers with strict cgroups.',
      'Decoupling submission ingestion from test execution via Redis queues prevents server lockups during exam deadlines.',
      'Detailed telemetry and audit logs protect students and professors from contentious grading disputes.',
    ],
    content: [
      'University programming exams present a unique traffic pattern: hours of silence followed by an avalanche of 400 simultaneous code submissions in the final 5 minutes of an assessment. Running untrusted C, Python, and Java code concurrently on a shared server without risking memory leaks, fork bombs, or security compromises requires rigorous architectural separation.',
      '### 1. The Sandboxed Runner Environment',
      'Security is paramount when compiling and executing arbitrary user code. We created ephemeral runner containers with dropped Linux capabilities (`CAP_SYS_ADMIN`), strict CPU limits via cgroups, disabled network interfaces, and a read-only root filesystem. Timeouts and memory caps terminate runaway infinite loops within milliseconds.',
      '### 2. Job Queue Decoupling',
      'Rather than executing tests synchronously in the web server process, the API accepts the submission, generates a cryptographically signed receipt, and publishes a message to a background Redis queue. A pool of distributed runner workers consumes from the queue at a sustainable concurrency rate, reporting graded results back via WebSockets.',
      '### 3. Handling 1,000+ Monthly Evaluations',
      'Through automated test-case batching and container reuse strategies with isolated cgroup resets, eGrading scaled to support over 1,000 monthly evaluations with 99.8% on-time grading availability.',
    ],
  },
  {
    id: 'post-4',
    slug: 'edge-vision-emotion-recognition',
    title: 'Optimizing Deep Learning for the Edge: Real-Time Facial Emotion Recognition',
    excerpt: 'From standard VGG architectures to pruned MobileNets: achieving 30+ FPS real-time emotion inference on constrained hardware.',
    date: 'Mar 02, 2026',
    readTime: '5 min read',
    category: 'AI & ML',
    tags: ['Computer Vision', 'CNN', 'TensorFlow', 'Edge AI', 'Optimization'],
    takeaways: [
      'Depthwise separable convolutions reduce parameter counts by ~85% with less than 2% loss in classification accuracy.',
      '8-bit post-training quantization accelerates inference on standard CPU cores without needing expensive GPUs.',
      'Facial landmark alignment prior to classification drastically improves robustness against head tilt and low lighting.',
    ],
    content: [
      'Facial emotion recognition algorithms often achieve stellar accuracy in academic benchmarks using heavyweight architectures like VGG-16 or ResNet-50. However, deploying these models onto commodity laptops or embedded camera devices quickly exposes high memory consumption and unacceptable frame drops below 10 FPS.',
      '### 1. Replacing Heavy Convolutions with Depthwise Separable Layers',
      'By decomposing standard 2D convolutions into separate depthwise and pointwise operations (the MobileNet paradigm), we slashed total model parameters from 130 million to under 4.2 million while preserving the rich spatial feature extraction required for micro-expression nuances.',
      '### 2. Quantization & Graph Optimization',
      'Converting 32-bit floating-point weights to INT8 representation via post-training quantization resulted in a 4x reduction in model size on disk (from ~85MB to ~19MB) and more than doubled CPU inference throughput, easily achieving continuous 30+ FPS video classification.',
      '### 3. Real-World Robustness',
      'A preprocessing pipeline integrating MTCNN face detection with affine geometric landmark alignment ensured that lighting variations and head rotations did not degrade classification confidence.',
    ],
  },
];
