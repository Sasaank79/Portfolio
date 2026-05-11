import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Terminal,
    Database,
    Cpu,
    Server,
    Zap,
    Download,
    ChevronRight,
    Award,
    Cloud,
    ArrowUpRight,
    Layers,
    Menu,
    X
} from 'lucide-react';

// ------------------
// SURYA SASAANK YANAMANDRA - PORTFOLIO
// Computer Science Graduate, 2025
// ------------------

const PROFILE = {
    name: "Surya Sasaank Yanamandra",
    tagline: "Computer Science Graduate · Class of 2025",
    intro: "Computer Science Graduate with experience in backend development and machine learning applications. Skilled in building RESTful APIs using Java and Python, and working with relational databases and caching systems. Strong foundation in SQL, problem-solving, and practical software development.",
    email: "ysuryasasaank@gmail.com",
    github: "https://github.com/Sasaank79",
    linkedin: "https://www.linkedin.com/in/surya-sasaank-yanamandra/",
    resumeUrl: "/resume.pdf"
};

const PROJECTS = [
    {
        id: 1,
        title: "URL Shortener",
        subtitle: "Backend System Design",
        description: "Developed a URL shortening service using Java, PostgreSQL, and Redis. Generates 6-character Base62 short codes supporting 56+ billion unique URLs. Integrated Redis cache-aside caching with 24-hour TTL for sub-millisecond redirect lookups. Implements HTTP 302 redirection with atomic click-tracking and CI/CD via GitHub Actions.",
        tags: ["Java", "PostgreSQL", "Redis", "Docker"],
        metrics: [
            { value: "56B+", unit: "", label: "URL Capacity", highlight: true },
            { value: "<1", unit: "ms", label: "Cache Latency" },
            { value: "24h", unit: "", label: "Cache TTL" }
        ],
        icon: Server,
        color: "blue",
        github: "https://github.com/Sasaank79/URL_Shortener",
        demo: null
    },
    {
        id: 2,
        title: "Inventory Management",
        subtitle: "Full-Stack REST API",
        description: "Built a production-ready RESTful inventory management API with Flask and PostgreSQL, featuring a normalized 3NF schema across 4 relational tables, JWT-based authentication, and 20+ API endpoints. Includes SQL analytics for low-stock alerts, top-selling reports, and category breakdowns with indexed lookups.",
        tags: ["Flask", "PostgreSQL", "JWT", "SQL"],
        metrics: [
            { value: "96%", unit: "", label: "Test Coverage", highlight: true },
            { value: "35+", unit: "", label: "Automated Tests" },
            { value: "Live", unit: "", label: "Demo" }
        ],
        icon: Database,
        color: "amber",
        github: "https://github.com/Sasaank79/Inventory-Management-System",
        demo: "https://inventory-management-ylmu.onrender.com"
    },
    {
        id: 3,
        title: "Phishing Link Detection",
        subtitle: "ML Classification System",
        description: "Engineered URL-based lexical and domain-level features including URL length, special characters, and domain age. Trained a stacking ensemble combining Random Forest, XGBoost, and SVM classifiers, applying SMOTE oversampling to handle class imbalance. Integrated whitelist/blacklist validation with deployment-ready preprocessing pipelines.",
        tags: ["Python", "scikit-learn", "XGBoost", "Random Forest"],
        metrics: [
            { value: "94%", unit: "", label: "Accuracy", highlight: true },
            { value: "91%", unit: "", label: "Precision" },
            { value: "3", unit: "", label: "Model Ensemble" }
        ],
        icon: Zap,
        color: "rose",
        github: "https://github.com/Sasaank79/Phishing-Link-Detection",
        demo: null
    },
    {
        id: 4,
        title: "Student Success Prediction",
        subtitle: "Serverless ML Pipeline",
        description: "Developed a serverless ML inference pipeline using AWS Lambda, Docker, and AWS ECR to predict student academic outcomes on 4,424 records with 44 engineered features. Built a 4-model stacking ensemble (XGBoost, LightGBM, CatBoost → Logistic Regression) achieving 0.77 weighted F1-score on multiclass predictions.",
        tags: ["AWS Lambda", "Docker", "XGBoost", "LightGBM"],
        metrics: [
            { value: "77.5%", unit: "", label: "Accuracy", highlight: true },
            { value: "0.77", unit: "", label: "F1 Score" },
            { value: "0.86", unit: "", label: "ROC-AUC" }
        ],
        icon: Cloud,
        color: "violet",
        github: "https://github.com/Sasaank79/Serverless-Student-Success-Prediction-System",
        demo: "https://sasaank79.github.io/Serverless-Student-Success-Prediction-System/"
    },
    {
        id: 5,
        title: "Driving Narrator",
        subtitle: "Real-Time Edge AI",
        description: "Engineered a CPU-optimized real-time traffic sign detection pipeline achieving 14 FPS on a 2015 MacBook CPU (6× speedup) and 89 FPS on T4 GPU. Migrated from PyTorch to OpenVINO INT8 quantization, reducing model size 38% (5.2→3.2 MB). Multi-threaded producer-consumer architecture decouples video I/O from inference.",
        tags: ["Python", "YOLOv11", "OpenVINO", "OpenCV"],
        metrics: [
            { value: "14", unit: "FPS", label: "On CPU", highlight: true },
            { value: "97%", unit: "", label: "mAP@0.5" },
            { value: "3.2", unit: "MB", label: "Model Size" }
        ],
        icon: Cpu,
        color: "emerald",
        github: "https://github.com/Sasaank79/Driving-Narrator-Legacy-Edge",
        demo: null
    },
    {
        id: 6,
        title: "Facial Emotion Recognition",
        subtitle: "Real-Time Deep Learning",
        description: "Built a real-time facial emotion recognition system using PyTorch and EfficientNetV2-S, trained on FER-2013 with Label Smoothing and EMA weights. Switched from Haar Cascade to MediaPipe for reliable face detection and added a 10-frame rolling average for stable predictions at ~5 FPS on CPU.",
        tags: ["Python", "PyTorch", "OpenCV", "MediaPipe"],
        metrics: [
            { value: "72.7%", unit: "", label: "Accuracy", highlight: true },
            { value: "0.72", unit: "", label: "F1 Macro" },
            { value: "5", unit: "FPS", label: "CPU" }
        ],
        icon: Cpu,
        color: "emerald",
        github: "https://github.com/Sasaank79/Facial-Emotion-Recognition",
        demo: null
    }
];

const SKILLS = {
    programmingFrameworks: ["Java", "Python", "SQL", "Flask", "scikit-learn", "REST APIs"],
    databasesCloud: ["PostgreSQL", "Redis", "AWS Lambda"],
    coreConceptsTools: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Git", "Machine Learning"]
};

const EXPERIENCE = {
    title: "Journey 2 Employment Program",
    company: "Salesforce",
    type: "Professional Training",
    highlight: "Top 15% of 360+ candidates",
    description: "Selected in the top 15% (49/360+) of applicants for training on Data Structures and Code Optimization; applied Agile methodologies to refine algorithms for time and space complexity in peer reviews."
};

const EDUCATION = {
    degree: "B.Tech in Computer Science & Engineering",
    school: "MVGR College of Engineering",
    year: "2021 - 2025",
    gpa: "7.61 / 10",
    courses: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"]
};

const KEY_STRENGTHS = [
    { label: "Backend API Development", detail: "Java, Flask, REST APIs" },
    { label: "Database Design & SQL", detail: "PostgreSQL, Redis" },
    { label: "Machine Learning", detail: "scikit-learn, AWS Lambda" }
];

// ------------------
// COMPONENTS
// ------------------

export default function Portfolio() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
            const scrollPosition = window.scrollY + 150;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0a0a0f] text-gray-100 min-h-screen overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
            </div>

            <Navbar
                activeSection={activeSection}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <main className="relative z-10">
                {/* Animated Background Blobs */}
                <div className="bg-blob bg-blob-1" />
                <div className="bg-blob bg-blob-2" />

                <HeroSection />
                <StrengthsSection />
                <AboutSection />
                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}

// ------------------
// NAVBAR
// ------------------

function Navbar({ activeSection, mobileMenuOpen, setMobileMenuOpen }) {
    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Work' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <a href="#hero" className="group flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-bold text-black text-lg">
                            S
                        </div>
                        <span className="font-semibold text-lg text-white hidden sm:block">
                            Surya<span className="text-emerald-400">.dev</span>
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`relative text-sm font-medium transition-colors ${activeSection === item.id
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {item.label}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full"
                                    />
                                )}
                            </a>
                        ))}
                        <a
                            href={PROFILE.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500 rounded-lg text-sm font-medium text-emerald-400 transition-all flex items-center group"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-400 hover:text-white"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0f] border-t border-white/5"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-gray-300 hover:text-white py-2"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href={PROFILE.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 py-2 font-medium"
                            >
                                Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

// ------------------
// HERO SECTION
// ------------------

function HeroSection() {
    const [displayedText, setDisplayedText] = useState('');
    const taglineWords = PROFILE.tagline.split(' | ');
    const fullText = taglineWords.join(' | ');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center pt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6 text-center"
                    >
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                                <motion.span
                                    className="text-white inline-block"
                                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                                    animate={{
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                        textShadow: [
                                            '0 0 0px rgba(255,255,255,0)',
                                            '0 0 30px rgba(16,185,129,0.5)',
                                            '0 0 15px rgba(6,182,212,0.3)',
                                            '0 0 0px rgba(255,255,255,0)'
                                        ]
                                    }}
                                    transition={{ duration: 1.0, ease: 'easeOut' }}
                                >
                                    Surya Sasaank
                                </motion.span>
                                <br />
                                <span className="inline-flex">
                                    {"Yanamandra".split('').map((char, i) => (
                                        <motion.span
                                            key={i}
                                            className="text-emerald-400"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + i * 0.06, duration: 0.4 }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 font-medium font-mono">
                                {displayedText}<span className="animate-pulse">|</span>
                            </p>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto"
                        >
                            {PROFILE.intro}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center gap-4 pt-4"
                        >
                            <a
                                href="#projects"
                                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-xl font-semibold text-black transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                            >
                                View My Work
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="flex items-center gap-3">
                                <SocialButton href={PROFILE.github} icon={<Github size={20} />} />
                                <SocialButton href={PROFILE.linkedin} icon={<Linkedin size={20} />} />
                                <SocialButton href={`mailto:${PROFILE.email}`} icon={<Mail size={20} />} />
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function SocialButton({ href, icon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-pulse p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
        >
            {icon}
        </a>
    );
}

// ------------------
// KEY STRENGTHS SECTION
// ------------------

function StrengthsSection() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid sm:grid-cols-3 gap-6">
                    {KEY_STRENGTHS.map((strength, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-6 bg-[#12121a] border border-white/5 rounded-xl"
                        >
                            <h3 className="text-white font-semibold text-sm">{strength.label}</h3>
                            <p className="text-gray-500 text-xs mt-1 font-mono">{strength.detail}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ------------------
// PROJECTS SECTION
// ------------------

function ProjectsSection() {
    return (
        <section id="projects" className="py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-emerald-400 font-mono text-sm">// Featured Work</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-white">
                        Featured Projects
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        Projects focused on performance, scalability, and real-world applications.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }) {
    const Icon = project.icon;
    const colorClasses = {
        emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'group-hover:shadow-emerald-500/10' },
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', glow: 'group-hover:shadow-blue-500/10' },
        violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', glow: 'group-hover:shadow-violet-500/10' },
        amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', glow: 'group-hover:shadow-amber-500/10' },
        rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', glow: 'group-hover:shadow-rose-500/10' }
    };
    const colors = colorClasses[project.color];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative bg-[#12121a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-500 ${colors.glow} hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
                    <Icon size={24} className={colors.text} />
                </div>
                <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                    )}
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4 flex-grow">
                <div>
                    <p className={`text-xs font-mono ${colors.text} mb-1`}>{project.subtitle}</p>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <h3 className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer">
                            {project.title}
                        </h3>
                    </a>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
                    {project.metrics.map((metric, i) => (
                        <div key={i} className={`text-center p-2 sm:p-3 rounded-xl ${metric.highlight ? colors.bg : 'bg-white/5'} overflow-hidden`}>
                            <div className={`text-lg sm:text-2xl font-bold ${metric.highlight ? colors.text : 'text-white'} truncate`}>
                                {metric.value}<span className="text-xs sm:text-sm">{metric.unit}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 truncate">{metric.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full font-mono">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ------------------
// SKILLS SECTION
// ------------------

function SkillsSection() {
    const categories = [
        { title: "Programming & Frameworks", items: SKILLS.programmingFrameworks, icon: Code2, color: "emerald" },
        { title: "Databases & Cloud", items: SKILLS.databasesCloud, icon: Database, color: "blue" },
        { title: "Core Concepts & Tools", items: SKILLS.coreConceptsTools, icon: Terminal, color: "violet" }
    ];

    const colorClasses = {
        emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
        blue: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
        cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
        amber: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
        violet: { bg: 'bg-violet-500/10', text: 'text-violet-400' }
    };

    return (
        <section id="skills" className="py-32 bg-[#0d0d12]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-emerald-400 font-mono text-sm">// Technical Stack</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-white">
                        Tools of the Trade
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        const colors = colorClasses[cat.color];
                        return (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#12121a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${colors.bg}`}>
                                        <Icon size={20} className={colors.text} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="skill-shimmer px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-sm rounded-lg transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ------------------
// ABOUT SECTION
// ------------------

function AboutSection() {
    return (
        <section id="about" className="py-32">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-400 font-mono text-sm">// Background</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4 text-white">
                        About Me
                    </h2>
                    <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
                        I am a Computer Science graduate with experience in backend development and machine learning applications.
                        I've built RESTful APIs using Java and Python, worked with relational databases like PostgreSQL, and
                        deployed ML models to cloud environments including AWS Lambda. I enjoy working on SQL optimization,
                        clean API design, and solving real-world problems through software. Currently seeking opportunities
                        where I can apply my skills in backend engineering or software development.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#12121a] border border-white/5 rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <Award size={24} className="text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Education</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-white">{EDUCATION.degree}</p>
                            <p className="text-gray-400">{EDUCATION.school}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                                <span className="text-gray-500">{EDUCATION.year}</span>
                                <span className="text-emerald-400 font-mono">GPA: {EDUCATION.gpa}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4">
                                {EDUCATION.courses.map((course) => (
                                    <span key={course} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Professional Training */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#12121a] border border-white/5 rounded-2xl p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Zap size={24} className="text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white">Professional Training</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-white">{EXPERIENCE.title}</p>
                            <p className="text-gray-400">{EXPERIENCE.company}</p>
                            <div className="mt-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg inline-block">
                                <span className="text-emerald-400 font-medium">{EXPERIENCE.highlight}</span>
                            </div>
                            <p className="text-gray-500 text-sm pt-4">{EXPERIENCE.description}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 bg-[#12121a] border border-white/5 rounded-2xl p-8"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Certifications</h3>
                    <div className="flex flex-wrap gap-4">
                        {["PCAP (Python)", "NPTEL Cloud Computing", "Cisco CyberSecurity Essentials", "Cisco Linux Essentials", "ML Specialization (DeepLearning.AI)"].map((cert) => (
                            <span key={cert} className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-sm">
                                {cert}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ------------------
// CONTACT SECTION
// ------------------

function ContactSection() {
    return (
        <section id="contact" className="py-32 bg-[#0d0d12]">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <span className="text-emerald-400 font-mono text-sm">// Let's Connect</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white">
                        Ready to Build Something?
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        I'm currently looking for full-time opportunities in backend engineering and AI systems.
                        Let's discuss how I can contribute to your team.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        <a
                            href={`mailto:${PROFILE.email}`}
                            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-xl font-semibold text-black transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                        >
                            <Mail size={20} />
                            Get in Touch
                            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <a
                            href={PROFILE.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white transition-all flex items-center gap-2"
                        >
                            <Linkedin size={20} />
                            LinkedIn
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ------------------
// FOOTER
// ------------------

function Footer() {
    return (
        <footer className="py-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">
                    Designed & Built by Surya Sasaank Yanamandra • © 2026
                </p>
                <div className="flex items-center gap-4">
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                        <Github size={18} />
                    </a>
                    <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
                        <Linkedin size={18} />
                    </a>
                    <a href={`mailto:${PROFILE.email}`} className="text-gray-600 hover:text-white transition-colors">
                        <Mail size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
