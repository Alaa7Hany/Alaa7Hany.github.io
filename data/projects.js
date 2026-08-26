// Verified Projects Database — Source of Truth: master-resume.md, skills.md, and projects/*/full-readme.md

var PROJECTS_DATA = [
  {
    id: "linguaquest",
    title: "LinguaQuest",
    tagline: "AI-Powered Real-World Scavenger Hunt & Language Learning",
    category: "android",
    featured: true,
    badges: ["Native Android", "Gemini AI", "Compose", "Flagship"],
    themeColor: "#EE6C4D",
    githubUrl: "https://github.com/LinguaQuest-AI-Powered/LinguaQuest-Android-App",
    youtubeUrl: "https://youtu.be/SQ8NBcGwBbM",
    coverImage: "assets/projects/linguaquest/title.webp",
    gallery: [
      "assets/projects/linguaquest/title.webp",
      "assets/projects/linguaquest/101shots_so.webp",
      "assets/projects/linguaquest/102shots_so.webp",
      "assets/projects/linguaquest/103shots_so.webp",
      "assets/projects/linguaquest/104shots_so.webp",
      "assets/projects/linguaquest/105shots_so.webp"
    ],
    techStack: [
      "Kotlin", "Jetpack Compose", "Gemini AI SDK", "CameraX",
      "Clean Architecture (MVI)", "Room DB", "Hilt", "FCM", "Navigation 3"
    ],
    summary: "Transformed passive language memorization into an interactive real-world scavenger hunt where users identify objects in their physical surroundings using camera AI vision.",
    highlights: [
      "Integrated Google Gemini Multimodal AI SDK & Android CameraX for real-time object detection and quest validation.",
      "Engineered bidirectional spoken AI roleplay and pronunciation evaluation with circular 250ms audio pre-buffering.",
      "Designed offline-first persistence with Room DB and push notifications via Firebase Cloud Messaging (FCM)."
    ],
    architecture: {
      pattern: "Clean Architecture + MVI (Model-View-Intent)",
      layers: "Presentation (Compose + StateFlow) -> Domain (UseCases) -> Data (Room DB + Gemini API + FCM)",
      keyDecisions: "Type-safe Jetpack Navigation 3 backstack, provider-agnostic AI client interface with automatic failover, and hardware-tuned PCM audio streaming pipeline."
    }
  },
  {
    id: "qafilah",
    title: "Qafilah",
    tagline: "Next-Gen AI Mobile Commerce with Shopify GraphQL & Paymob",
    category: "android",
    featured: true,
    badges: ["Native Android", "Shopify GraphQL", "Paymob", "n8n AI"],
    themeColor: "#98C1D9",
    githubUrl: "https://github.com/Sian1902/Qafilah",
    youtubeUrl: "",
    coverImage: "assets/projects/qafilah/626shots_so.webp",
    gallery: [
      "assets/projects/qafilah/626shots_so.webp",
      "assets/projects/qafilah/849shots_so.webp",
      "assets/projects/qafilah/936shots_so.webp"
    ],
    techStack: [
      "Kotlin", "Jetpack Compose", "Shopify Storefront GraphQL", "n8n Agentic AI",
      "Paymob Payment SDK", "Clean Architecture", "Room DB", "Coroutines"
    ],
    summary: "Production-grade e-commerce Android application connecting directly with Shopify Storefront API, automated Agentic AI recommendation workflows, and secure card/wallet checkout.",
    highlights: [
      "Architected real-time Shopify Storefront GraphQL query & mutation pipeline for dynamic catalog and inventory sync.",
      "Integrated Paymob payment gateway supporting credit cards, mobile wallets, and installment checkouts.",
      "Connected n8n Agentic AI webhook automation for personalized customer product recommendations."
    ],
    architecture: {
      pattern: "Clean Architecture + MVVM",
      layers: "UI (Compose) -> Domain (Cart/Order UseCases) -> Data (Shopify Apollo GraphQL + Paymob API + Room)",
      keyDecisions: "Decoupled payment gateway provider abstraction, cached Apollo GraphQL queries for sub-second offline browsing."
    }
  },
  {
    id: "pip-boy-weather",
    title: "Pip-Boy Weather Station",
    tagline: "Retro-Futuristic Weather Radar & Background Storm Alert System",
    category: "android",
    featured: true,
    badges: ["Native Android", "WorkManager", "Google Maps", "Room"],
    themeColor: "#EE6C4D",
    githubUrl: "https://github.com/Alaa7Hany/MAD46_Pip-Boy",
    youtubeUrl: "",
    coverImage: "assets/projects/pip-boy/title.webp",
    gallery: [
      "assets/projects/pip-boy/title.webp",
      "assets/projects/pip-boy/195shots_so.webp",
      "assets/projects/pip-boy/232shots_so.webp",
      "assets/projects/pip-boy/335shots_so.webp",
      "assets/projects/pip-boy/575shots_so.webp"
    ],
    techStack: [
      "Kotlin", "Jetpack Compose", "WorkManager", "Google Maps SDK",
      "Room DB", "Retrofit", "Coroutines & Flow", "Clean Architecture"
    ],
    summary: "Fallout Pip-Boy inspired retro-futuristic weather application with interactive map coordinate picking, live radar precipitation forecasting, and automated background alerts.",
    highlights: [
      "Configured Android WorkManager background jobs for automated periodic weather alert notifications.",
      "Integrated Google Maps SDK with custom map styling, draggable pin markers, and GPS location tracking.",
      "Implemented comprehensive offline-first caching with Room DB and temperature unit conversions."
    ],
    architecture: {
      pattern: "Clean Architecture + MVI",
      layers: "Presentation (Compose) -> Domain (Weather UseCases) -> Data (OpenWeather API + Room DB)",
      keyDecisions: "Periodic WorkManager battery-optimized constraints, stateful Flow-based reactive cache updates."
    }
  },
  {
    id: "booking-app",
    title: "EventHub — Booking App",
    tagline: "Event Discovery, Real-Time Search & Offline Ticket Reservation",
    category: "flutter",
    featured: true,
    badges: ["Flutter", "BLoC / Cubit", "SQLite", "Secure Storage"],
    themeColor: "#98C1D9",
    githubUrl: "https://github.com/Alaa7Hany/Booking-Flutter-App",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Flutter", "Dart", "flutter_bloc", "Dio REST Client",
      "sqflite (SQLite)", "flutter_secure_storage", "Equatable", "Feature-First Architecture"
    ],
    summary: "Event discovery and ticket booking mobile application in Flutter. Features animated onboarding, curated category feeds, real-time search cubit, and offline SQLite bookmarks.",
    highlights: [
      "Structured Feature-First Clean Architecture with BLoC / Cubit state management.",
      "Engineered offline bookmarking and event persistence via local SQLite database (sqflite).",
      "Implemented encrypted JWT token authentication storage via flutter_secure_storage."
    ],
    architecture: {
      pattern: "Feature-First Clean Architecture + Cubit",
      layers: "Presentation (Views & Widgets) -> State Management (Cubits) -> Data (Dio REST + sqflite DB + Secure Storage)",
      keyDecisions: "Reactive state separation per domain feature with local SQLite cache synchronization."
    }
  },
  {
    id: "taier",
    title: "Taier — Smart Flight Booking",
    tagline: "Intelligent Multi-City Flight Reservation System with Stripe & AI",
    category: "flutter",
    featured: true,
    badges: ["Flutter", "Graduation Project: Excellent", "Stripe", "BLoC"],
    themeColor: "#EE6C4D",
    githubUrl: "https://github.com/MetoIsTheKing/Graduation-Project-2025",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Flutter", "Dart", "BLoC / Cubit", "Stripe SDK",
      "Clean Architecture", "AI Chatbot Assistant", "Dio", "GetIt"
    ],
    summary: "Comprehensive smart flight booking graduation project (*Grade: Excellent*) featuring multi-city route search, dynamic seat selection, Stripe payment, and AI flight concierge.",
    highlights: [
      "Awarded Grade: Excellent for graduation project capstone engineering.",
      "Implemented Clean Architecture with BLoC state management and strict layer decoupling.",
      "Integrated Stripe mobile payment gateway for secure ticket checkout and automated PDF boarding pass generation."
    ],
    architecture: {
      pattern: "Clean Architecture + BLoC",
      layers: "Presentation (BLoC/Cubit Widgets) -> Domain (Flight Entities & UseCases) -> Data (Dio REST + Local Cache)",
      keyDecisions: "Multi-step booking state machine with transactional seat reservation safety."
    }
  },
  {
    id: "league-lens-sports",
    title: "League Lens (Sports)",
    tagline: "Live Football League Analytics, Fixtures & CoreData Favorites",
    category: "ios",
    featured: true,
    badges: ["Native iOS", "Swift", "UIKit", "CoreData", "MVP"],
    themeColor: "#3D5A80",
    githubUrl: "https://github.com/Alaa7Hany/MAD46_Sports",
    youtubeUrl: "",
    coverImage: "assets/projects/league-lens/title.webp",
    gallery: [
      "assets/projects/league-lens/title.webp",
      "assets/projects/league-lens/100shots_so.webp",
      "assets/projects/league-lens/265shots_so.webp",
      "assets/projects/league-lens/628shots_so.webp",
      "assets/projects/league-lens/646shots_so.webp"
    ],
    techStack: [
      "Swift", "UIKit", "MVP Architecture", "CoreData",
      "Alamofire", "Lottie iOS", "XCTest"
    ],
    summary: "Native iOS sports analytics application tracking live match results, upcoming fixtures, team rosters, and offline favorite team persistence via CoreData.",
    highlights: [
      "Implemented MVP architecture in Swift with strict protocol-oriented presenter-view contracts.",
      "Configured CoreData entity relational model for seamless offline persistence of leagues and teams.",
      "Integrated Alamofire networking pipeline with robust JSON decoding and error handling."
    ],
    architecture: {
      pattern: "MVP (Model-View-Presenter)",
      layers: "View (UIKit / Storyboard / AutoLayout) <-> Presenter (Business Logic) <-> Model (CoreData + Network)",
      keyDecisions: "Protocol-driven dependency inversion enabling comprehensive unit testing with XCTest."
    }
  },
  {
    id: "cartio-backend",
    title: "Cartio Backend API",
    tagline: "Transactional E-Commerce Engine with Kotlin, Ktor & PostgreSQL",
    category: "backend",
    featured: true,
    badges: ["Backend", "Kotlin", "Ktor", "PostgreSQL", "Docker"],
    themeColor: "#EE6C4D",
    githubUrl: "https://github.com/Alaa7Hany/cartio-Backend",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Kotlin", "Ktor Server", "PostgreSQL (Supabase)", "Exposed ORM",
      "Koin DI", "JWT Auth & BCrypt", "kotlinx.serialization", "Docker", "MockK"
    ],
    summary: "Transactional e-commerce backend built with Kotlin and Ktor. Handles JWT authentication, paginated catalog discovery, persistent carts, and atomic checkout transactions.",
    highlights: [
      "Engineered atomic checkout flow within a single PostgreSQL suspended transaction with rollback safety.",
      "Designed decoupled Controller-Service-Repository architecture with Koin dependency injection.",
      "Implemented price immutability locking unit costs at checkout to protect financial records."
    ],
    architecture: {
      pattern: "Layered Controller-Service-Repository (Facade)",
      layers: "Ktor Routes -> Domain Facades/Services -> JetBrains Exposed ORM -> PostgreSQL",
      keyDecisions: "Stateless JWT authorization and multi-stage Docker containerization for horizontal cloud scaling."
    }
  },
  {
    id: "mad46-swiftcast",
    title: "SwiftCast — Weather App",
    tagline: "Native iOS Live Weather Radar, Hourly Forecasts & CoreLocation",
    category: "ios",
    featured: false,
    badges: ["Native iOS", "Swift", "CoreLocation", "MVVM"],
    themeColor: "#98C1D9",
    githubUrl: "https://github.com/Alaa7Hany/MAD46_SwiftCast",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Swift", "UIKit", "MVVM Pattern", "CoreLocation GPS",
      "URLSession", "AutoLayout", "REST API"
    ],
    summary: "Native iOS weather forecasting application in Swift and UIKit. Displays current temperatures, hourly radar breakdowns, 5-day outlooks, and multi-city favorites.",
    highlights: [
      "Integrated Apple CoreLocation GPS for automatic real-time location weather detection.",
      "Engineered global city lookup parsing atmospheric metrics (humidity, wind speed, UV index).",
      "Built multi-city saved favorites with offline persistence and dynamic weather icons."
    ],
    architecture: {
      pattern: "MVVM (Model-View-ViewModel) + Repository Pattern",
      layers: "UIKit Views <-> ViewModels (HomeVM, SearchVM) <-> Data Repositories (URLSession + Saved Cities)",
      keyDecisions: "Dynamic condition-based UI rendering and modular location service abstraction."
    }
  },
  {
    id: "food-planner",
    title: "Food Planner (Kersh Keeper)",
    tagline: "Meal Scheduling, Recipe Discovery & Caloric Planning Assistant",
    category: "android",
    featured: false,
    badges: ["Native Android", "Java", "RxJava2", "Room DB"],
    themeColor: "#3E5C76",
    githubUrl: "https://github.com/Alaa7Hany/MAD46_FoodPlanner",
    youtubeUrl: "",
    coverImage: "assets/projects/food-planner/title.webp",
    gallery: [
      "assets/projects/food-planner/title.webp",
      "assets/projects/food-planner/160shots_so.webp",
      "assets/projects/food-planner/249shots_so.webp",
      "assets/projects/food-planner/553shots_so.webp",
      "assets/projects/food-planner/662shots_so.webp"
    ],
    techStack: [
      "Java", "Android SDK", "MVP Pattern", "Room DB",
      "RxJava2 / ReactiveX", "Retrofit2", "Firebase Auth", "Calendar Provider"
    ],
    summary: "Comprehensive meal planning and recipe exploration Android application with weekly dietary scheduling, ingredient checklists, and Google Calendar sync.",
    highlights: [
      "Engineered asynchronous reactive data streams using RxJava2 (Observables, Single, Schedulers).",
      "Built multi-table Room Database schema for favorite meals, offline meal plans, and shopping lists.",
      "Integrated Android Calendar Provider API for syncing meal schedule reminders directly to system calendar."
    ],
    architecture: {
      pattern: "MVP (Model-View-Presenter)",
      layers: "Views <-> Presenters <-> Repositories (Room DB + TheMealDB API)",
      keyDecisions: "Reactive stream chaining for automated cache-first data delivery."
    }
  },
  {
    id: "messageme",
    title: "MessageMe",
    tagline: "Real-Time Cloud Messaging & Social Communication Suite",
    category: "flutter",
    featured: false,
    badges: ["Flutter", "Firebase Suite", "FCM", "Real-Time"],
    themeColor: "#EE6C4D",
    githubUrl: "https://github.com/Alaa7Hany/MessageMe",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Flutter", "Dart", "Cubit", "Firebase Auth",
      "Cloud Firestore", "Firebase Storage", "FCM Push Notifications"
    ],
    summary: "Real-time chat platform with instant 1-on-1 and group messaging, media sharing, live user presence indicators, and background push notifications.",
    highlights: [
      "Engineered real-time Firestore stream listeners for instant sub-100ms message delivery.",
      "Integrated Firebase Cloud Messaging (FCM) payload handlers for foreground/background notification routing.",
      "Implemented secure user authentication with email verification and Cloud Storage media pipelines."
    ],
    architecture: {
      pattern: "Feature-First Architecture + Cubit",
      layers: "UI -> Cubit State Management -> Firebase Cloud Services",
      keyDecisions: "Firestore stream indexing for high concurrency and optimistic UI message sending."
    }
  },
  {
    id: "nti-ecommerce",
    title: "NTI Mobile Storefront",
    tagline: "Cross-Platform E-Commerce App with BLoC & EN/AR Localization",
    category: "flutter",
    featured: false,
    badges: ["Flutter", "BLoC", "Dio REST", "Localization"],
    themeColor: "#98C1D9",
    githubUrl: "https://github.com/Alaa7Hany/NTI_eCommerce",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Flutter", "Dart", "BLoC / Cubit", "Dio REST Client",
      "GetIt DI", "SharedPreferences", "EN/AR Localization"
    ],
    summary: "Production-grade mobile storefront application with catalog search, cart management, and bilingual English/Arabic localization.",
    highlights: [
      "Implemented BLoC state management for predictable UI transitions during cart and catalog updates.",
      "Integrated Dio REST client with custom interceptors for authentication token injection.",
      "Built dual-language interface with dynamic RTL/LTR layout switching."
    ],
    architecture: {
      pattern: "Clean Code + BLoC",
      layers: "Presentation (BLoC/Cubit) -> Data Layer (Dio REST Client + Local Storage)",
      keyDecisions: "Reusable UI components and dependency injection via GetIt."
    }
  },
  {
    id: "depi-devops-pipeline",
    title: "DEPI Cloud CI/CD Pipeline",
    tagline: "Automated Microservices Deployment with Jenkins, Kubernetes & Terraform",
    category: "backend",
    featured: false,
    badges: ["DevOps", "Kubernetes", "Jenkins", "Terraform"],
    themeColor: "#3D5A80",
    githubUrl: "https://github.com/Alaa7Hany/petclinic-complete-pipeline",
    youtubeUrl: "",
    coverImage: null,
    gallery: [],
    techStack: [
      "Jenkins CI/CD", "Docker", "Kubernetes (K8s)", "Terraform (Azure)",
      "Ansible", "Prometheus", "Grafana", "Linux / Bash"
    ],
    summary: "End-to-end automated Continuous Integration and Continuous Deployment infrastructure provisioning and container orchestration on Azure.",
    highlights: [
      "Provisioned cloud infrastructure on Azure declaratively using Terraform and Ansible configuration management.",
      "Configured automated multi-stage Jenkins pipelines with GitHub webhook triggering and automated testing.",
      "Deployed containerized microservices to Kubernetes clusters with Prometheus monitoring and Grafana alerts."
    ],
    architecture: {
      pattern: "Infrastructure as Code (IaC) & GitOps",
      layers: "GitHub Webhook -> Jenkins CI Pipeline -> Docker Image Registry -> Kubernetes Cluster -> Prometheus Monitoring",
      keyDecisions: "Zero-downtime rolling deployment strategies and declarative container scaling."
    }
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS_DATA = PROJECTS_DATA;
}
