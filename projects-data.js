// === PROJECT DATA ===
// Single source of truth for every project card on the site (index.html and projects.html).
// To add a project, copy one object below and fill it in. Projects show in this order.
//
//   categories: any of "cv" (AI / Computer Vision), "genai" (GenAI / RAG), "web", "android" — drives the filter chips
//   image:      optional thumbnail; without one, the card shows a placeholder with `icon`
//   icon:       Font Awesome class for the placeholder, e.g. "fas fa-robot"
//   summary:    1–2 sentences shown on the card
//   description: full text shown in the popup (separate paragraphs with \n\n)
//   video:      optional demo video played in the popup (keep under ~10 MB)
//   links:      optional github / linkedin / live URLs

const PROJECT_FILTERS = [
  { id: "all", label: "All" },
  { id: "cv", label: "AI / CV" },
  { id: "genai", label: "GenAI / RAG" },
  { id: "web", label: "Web" },
  { id: "android", label: "Android" },
];

const PROJECTS = [
  {
    title: "Pose Control Challenge",
    categories: ["cv", "web"],
    image: "./assets/PoseControlChallengeThumbnail.webp",
    video: "./assets/PoseControlledGame.mp4",
    summary:
      "A browser arcade game you play with your body — jump, dodge and punch in front of your webcam, tracked live with MediaPipe pose detection.",
    description:
      "Pose Control Challenge is a browser-based arcade game where real-time full-body pose (MediaPipe Pose + webcam) maps directly to gameplay actions — movement, jump, and attack — with smoothing logic to reduce detection noise. A keyboard mode is also available.\n\nA gesture-to-action inference layer converts live pose keypoints into discrete control signals. The game features a retro/neon arcade aesthetic with a local leaderboard, score and level tracking, and responsive UI and animations built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.",
    tags: ["React", "TypeScript", "MediaPipe Pose", "Vite"],
    links: {
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7436830023166308352/",
      github: "https://github.com/MedhaJani9",
    },
  },
  {
    title: "Golu — Agentic CLI Coding Assistant",
    categories: ["genai"],
    icon: "fas fa-terminal",
    summary:
      "A team-built command-line coding agent; I built its hybrid RAG pipeline (BM25 + vector fusion), reaching Hit@5 of 0.96.",
    description:
      "Golu is a team-built command-line coding agent where an LLM autonomously selects and executes tools (shell, file, MCP servers) in a loop until the task is complete. I contributed the RAG pipeline and retrieval evaluation.\n\nI designed and evaluated a hybrid fusion retrieval system combining vector search (nomic-embed-text, Chroma, 995 chunks) with BM25 keyword search using Reciprocal Rank Fusion, achieving Hit@5 of 0.96 vs 0.91 for vector search alone across 46 test questions. Fusion reliably resolved exact-identifier queries that pure semantic search missed.\n\nI also identified vocabulary-gap failure cases — questions where neither BM25 nor embeddings bridge the terminology — and proposed HyDE (Hypothetical Document Embeddings) as the next-step mitigation.",
    tags: ["Python", "LangChain", "Chroma", "Ollama", "BM25"],
    links: {},
  },
  {
    title: "IT Support Multi-Agent System",
    categories: ["genai"],
    icon: "fas fa-headset",
    summary:
      "Two AI agents that file IT support tickets end-to-end — I built the hybrid RAG retrieval and the LLM grading layer that prevents hallucinated answers.",
    description:
      "A two-agent system where a Requester agent files IT support tickets via Playwright browser automation and a Specialist agent retrieves answers from a knowledge base. The agents communicate over an A2A-style task protocol. I built the RAG pipeline.\n\nI implemented hybrid retrieval — BM25 keyword search + MiniLM sentence embeddings (FAISS) combined with Reciprocal Rank Fusion — fixing a critical misclassification where keyword overlap caused Wi-Fi issues to be categorized as Hardware rather than Network.\n\nAn LLM grading layer validates retrieved passages before answering, returning NO_RELEVANT_CONTEXT rather than hallucinating. I also resolved a concurrency bug where parallel requests rebuilt the RAG index simultaneously, fixed with a startup lock and index pre-warming.",
    tags: ["Python", "FAISS", "MiniLM", "BM25", "Playwright"],
    links: {
      github: "https://github.com/pauti04/Group-2",
    },
  },
  {
    title: "Gesture.AI",
    categories: ["cv", "web"],
    icon: "fas fa-hand-sparkles",
    summary:
      "Real-time hand landmark tracking in the browser, powering a Rock-Paper-Scissors game you play with your hand.",
    description:
      "A real-time hand gesture recognition system using MediaPipe Tasks Vision for webcam-based ML inference directly in the browser — no backend required.\n\nA visualization pipeline renders 21-point skeletal landmarks, gesture confidence scores, and real-time inference outputs with optimized React state management. On top of it, a Rock-Paper-Scissors game engine is driven entirely by recognized hand poses, demonstrating practical human-computer interaction via browser-based computer vision.",
    tags: ["React", "TypeScript", "MediaPipe Tasks Vision"],
    links: {},
  },
  {
    title: "DocFraming SDK",
    categories: ["cv", "android"],
    icon: "fas fa-file-image",
    summary:
      "A real-time Android document-scanning SDK with a multi-stage OpenCV pipeline and live capture feedback.",
    description:
      "A real-time Android document scanning SDK implementing contour detection and adaptive aspect-ratio validation for reliable capture under varied lighting conditions.\n\nThe multi-stage CV pipeline runs grayscale preprocessing → Gaussian blur → Canny edge detection → polygon approximation → perspective transformation → OCR-ready output.\n\nLow-latency frame processing uses coroutine-based background analysis and StateFlow-driven UI updates, enabling real-time quality validation and intelligent capture feedback.",
    tags: ["Kotlin", "CameraX", "OpenCV", "Coroutines"],
    links: {},
  },
  {
    title: "Virtual Mouse",
    categories: ["cv"],
    image: "./assets/VirtualMouseThumbnail.webp",
    video: "./assets/VirtualMouseDemo.mp4",
    summary:
      "Control your computer's mouse with hand gestures, using MediaPipe hand landmarks and OpenCV.",
    description:
      "Implemented a computer vision-based human–computer interaction system using MediaPipe landmarks and OpenCV to recognize hand gestures and map them to mouse actions.\n\nIncludes cursor smoothing, cooldown logic to avoid accidental clicks, and gesture-state detection for move, click and scroll.",
    tags: ["Python", "OpenCV", "MediaPipe"],
    links: {
      linkedin:
        "https://www.linkedin.com/posts/medha-jani-a5b889236_computervision-ai-mediapipe-activity-7430272961451945984--PjG",
      github: "https://github.com/MedhaJani9/VirtualMouse",
    },
  },
  {
    title: "Sakhi Link — AI-Powered E-commerce",
    categories: ["web"],
    image: "./assets/logo.ico",
    summary:
      "A full-stack women's e-commerce platform with an AI chatbot and personalized product recommendations.",
    description:
      "Sakhi Link is a scalable full-stack women's e-commerce platform with JWT/OAuth authentication, RESTful APIs, cart, wishlist, and order management, built with React/Next.js, Node.js, Express, and MongoDB.\n\nIt integrates Python-based AI: an intelligent chatbot and a personalized recommendation engine delivering data-driven product suggestions.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "Python"],
    links: {
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7367015877981933568/",
      github: "https://github.com/MedhaJani9",
    },
  },
  {
    title: "Combination App",
    categories: ["android"],
    image: "./assets/CombinationAppThumbnail.webp",
    video: "./assets/CombinationAppVideo1.mp4",
    summary:
      "One Android app combining a forum, a task list and live weather, backed by Firebase.",
    description:
      "Combination App is a Java-based Android application using Firebase Auth, Firestore, OkHttp, and Picasso, combining Forums, Tasks, and Weather features into one app.\n\nIt showcases real-time data sync, REST API consumption, RecyclerViews, fragment navigation, and user authentication in a modular Android architecture.",
    tags: ["Java", "Firebase", "Android Studio"],
    links: {
      github: "https://github.com/MedhaJani9/combination-android-app",
    },
  },
  {
    title: "Forum Application",
    categories: ["android"],
    image: "./assets/ForumApplicationThumbnail.webp",
    video: "./assets/ForumAppVideo.mp4",
    summary:
      "A real-time Android discussion forum — create, like, comment on and delete posts.",
    description:
      "Forum Application is a Java-based Android app built with Firebase Authentication and Cloud Firestore, enabling users to create, like, comment on, and delete forum posts in real time.\n\nIt demonstrates RecyclerViews, fragment-based navigation, snapshot listeners, and role-based UI controls for an interactive discussion platform.",
    tags: ["Java", "Firebase", "Android Studio"],
    links: {
      github: "https://github.com/MedhaJani9",
    },
  },
  {
    title: "Real-Time Multiplayer UNO",
    categories: ["web"],
    image: "./assets/UNO-GameImg.webp",
    video: "./assets/UnoVideo1.mp4",
    summary:
      "Multiplayer UNO in the browser with room-based matchmaking and live WebSocket game state.",
    description:
      "Developed a real-time multiplayer UNO game using Python, HTML, CSS, and JavaScript, leveraging WebSockets for bidirectional communication and turn-based gameplay.\n\nImplemented room-based matchmaking with unique room IDs, server-side turn validation, and full UNO game logic (Wild, Reverse, Skip, Draw Two, Draw Four), including automated card draws and consistent state synchronization across all players.",
    tags: ["Python", "WebSockets", "JavaScript"],
    links: {
      github: "https://github.com/MedhaJani9/UNO-Game",
    },
  },
  {
    title: "Task Manager",
    categories: ["android"],
    image: "./assets/TaskManagerThumbnail.webp",
    video: "./assets/TasksAppVideo.mp4",
    summary:
      "A personal Android task list with per-user data and real-time Firestore sync.",
    description:
      "Tasks Application is a Java-based Android app using Firebase Authentication and Cloud Firestore to manage a personalized task list.\n\nIt features user-based data filtering, real-time updates with snapshot listeners, RecyclerViews, and fragment navigation for efficient task creation and management.",
    tags: ["Java", "Firebase", "Android Studio"],
    links: {
      github: "https://github.com/MedhaJani9",
    },
  },
  {
    title: "Sign Language Interpreter",
    categories: ["cv"],
    image: "./assets/Sign-Lang-Image.webp",
    summary:
      "Translates hand signs into text in real time using an LSTM model on MediaPipe landmarks.",
    description:
      "Developed a Sign Language Interpreter with an intuitive UI, utilizing LSTM, MediaPipe, OpenCV, and scikit-learn for real-time gesture recognition. The system translates hand gestures into text, enhancing accessibility.",
    tags: ["Python", "TensorFlow", "OpenCV"],
    links: {},
  },
  {
    title: "Diabetic Retinopathy Detection",
    categories: ["cv"],
    image: "./assets/Project-2.webp",
    summary:
      "An ensemble of ResNet50, InceptionV3 and InceptionResNetV2 that detects diabetic retinopathy from retinal images.",
    description:
      "Developed an ensemble model combining ResNet50, InceptionV3, and InceptionResNetV2 to detect diabetic retinopathy with improved classification accuracy using deep learning.",
    tags: ["Deep Learning", "ResNet", "TensorFlow"],
    links: {},
  },
];
