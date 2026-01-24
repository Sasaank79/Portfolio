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

// ═══════════════════════════════════════════════════════════════════════════
// SURYA SASAANK YANAMANDRA - PORTFOLIO
// Backend Engineer & AI Systems Developer
// ═══════════════════════════════════════════════════════════════════════════

const PROFILE = {
    name: "Surya Sasaank Yanamandra",
    tagline: "Backend Developer | ML Engineer | AI Enthusiast | Software Engineer",
    intro: "Computer Science graduate building efficient, scalable software. From 14 FPS real-time computer vision to REST APIs serving 56 billion entries—I focus on performance and maintainability.",
    email: "ysuryasasaank@gmail.com",
    github: "https://github.com/Sasaank79",
    linkedin: "https://www.linkedin.com/in/surya-sasaank-yanamandra/",
    resumeUrl: "/resume.pdf"
};

const PROJECTS = [
    {
        id: 1,
        title: "Driving Narrator",
        subtitle: "Real-Time Traffic Sign Detection",
        description: "OpenVINO INT8 quantization delivers 6× speedup over PyTorch. Producer-consumer pipeline decouples video decoding from inference, stabilizing latency at 40ms.",
        impact: "Trained YOLOv11 Nano on LISA dataset (15,876 images, 47 classes).",
        tags: ["Python", "YOLOv11", "OpenVINO", "OpenCV"],
        metrics: [
            { value: "14", unit: "FPS", label: "On CPU", highlight: true },
            { value: "97%", unit: "", label: "mAP@0.5" },
            { value: "6×", unit: "", label: "Speedup" }
        ],
        icon: Cpu,
        color: "emerald",
        github: "https://github.com/Sasaank79/Driving-Narrator-Legacy-Edge",
        demo: null
    },
    {
        id: 2,
        title: "URL Shortener",
        subtitle: "High-Scale Backend System",
        description: "Base62 encoding maps DB IDs to 6-char short codes (56 billion unique URLs). Read-through Redis caching with 24h TTL for hot URLs.",
        impact: "Clean architecture: Controller → Service → Repository.",
        tags: ["Java", "Spring Boot", "Redis", "PostgreSQL"],
        metrics: [
            { value: "56B", unit: "", label: "URL Capacity", highlight: true },
            { value: "<1", unit: "ms", label: "Latency" },
            { value: "24h", unit: "", label: "Cache TTL" }
        ],
        icon: Server,
        color: "blue",
        github: "https://github.com/Sasaank79/URL_Shortener",
        demo: null
    },
    {
        id: 3,
        title: "Student Success Prediction",
        subtitle: "Serverless MLOps Pipeline",
        description: "Stacking Ensemble (XGBoost + LightGBM + CatBoost → Logistic Regression) with SMOTE for class imbalance. Deployed to AWS Lambda via Docker.",
        impact: "Frontend on GitHub Pages calls serverless API for real-time predictions.",
        tags: ["FastAPI", "AWS Lambda", "Docker", "XGBoost"],
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
        id: 4,
        title: "Inventory Management",
        subtitle: "Full-Stack Production App",
        description: "3NF schema for products, suppliers, and transactions. JWT auth, raw SQL analytics (low stock alerts, top sellers, stock value by category).",
        impact: "96% test coverage across 35 automated tests. Auto-seeds 100+ SKUs on deploy.",
        tags: ["Flask", "PostgreSQL", "pytest", "Render"],
        metrics: [
            { value: "96%", unit: "", label: "Test Coverage", highlight: true },
            { value: "35", unit: "", label: "Tests" },
            { value: "Live", unit: "", label: "Demo" }
        ],
        icon: Database,
        color: "amber",
        github: "https://github.com/Sasaank79/Inventory-Management-System",
        demo: "https://inventory-management-ylmu.onrender.com"
    },
    {
        id: 5,
        title: "Facial Emotion Recognition",
        subtitle: "Real-Time Deep Learning",
        description: "EfficientNetV2-S trained on FER-2013 with Label Smoothing for class imbalance. MediaPipe replaces Haar Cascade for better face crops.",
        impact: "10-frame rolling average smooths predictions. Runs at ~5 FPS on CPU.",
        tags: ["Python", "PyTorch", "OpenCV", "MediaPipe"],
        metrics: [
            { value: "72.7%", unit: "", label: "Accuracy", highlight: true },
            { value: "0.72", unit: "", label: "F1 Macro" },
            { value: "5", unit: "FPS", label: "CPU" }
        ],
        icon: Cpu,
        color: "rose",
        github: "https://github.com/Sasaank79/Facial-Emotion-Recognition",
        demo: null
    }
];

const SKILLS = {
    languages: ["Python", "Java", "SQL", "C++", "JavaScript", "TypeScript"],
    frameworks: ["FastAPI", "Flask", "Spring Boot", "PyTorch", "OpenVINO", "React"],
    infrastructure: ["AWS Lambda", "AWS EC2", "Docker", "Redis", "PostgreSQL", "Git", "CI/CD"]
};

const EXPERIENCE = {
    title: "Salesforce Journey to Employment",
    company: "Salesforce",
    highlight: "Top 10% of 500+ candidates",
    description: "Selected top 10% (55/500+). Optimized Python/Java algorithms for time/space complexity and applied Agile methodologies in team code reviews."
};

const EDUCATION = {
    degree: "B.Tech in Computer Science & Engineering",
    school: "MVGR College of Engineering",
    year: "2021 - 2025",
    gpa: "7.61 / 10",
    courses: ["Machine Learning", "AI Tools", "Data Structures", "DBMS", "OOP"]
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export default function Portfolio() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
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
                <HeroSection />
                <ProjectsSection />
                <SkillsSection />
                <AboutSection />
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════

function Navbar({ activeSection, mobileMenuOpen, setMobileMenuOpen }) {
    const navItems = [
        { id: 'projects', label: 'Work' },
        { id: 'skills', label: 'Skills' },
        { id: 'about', label: 'About' },
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
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-white text-lg">
                            S
                        </div>
                        <span className="font-semibold text-lg text-white hidden sm:block">
                            Surya<span className="text-violet-400">.dev</span>
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
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                                    />
                                )}
                            </a>
                        ))}
                        <a
                            href={PROFILE.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2 group"
                        >
                            <Download size={16} className="text-violet-400" />
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection() {
    return (
        <section id="hero" className="min-h-screen flex items-center pt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                            <span className="text-violet-400 text-sm font-medium">Open to Opportunities</span>
                        </motion.div>

                        {/* Name */}
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="text-white">{PROFILE.name.split(' ')[0]}</span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                                    {PROFILE.name.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 font-medium">
                                {PROFILE.tagline}
                            </p>
                        </div>

                        {/* Intro */}
                        <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                            {PROFILE.intro}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="#projects"
                                className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-xl font-semibold text-white transition-all shadow-lg shadow-violet-500/25 flex items-center gap-2"
                            >
                                View My Work
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="flex items-center gap-3">
                                <SocialButton href={PROFILE.github} icon={<Github size={20} />} />
                                <SocialButton href={PROFILE.linkedin} icon={<Linkedin size={20} />} />
                                <SocialButton href={`mailto:${PROFILE.email}`} icon={<Mail size={20} />} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Floating Tech Stack Icons */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -left-6 w-14 h-14 bg-[#12121a] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <span className="text-2xl">🐍</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-2 -right-6 w-14 h-14 bg-[#12121a] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <span className="text-2xl">☕</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-4 w-14 h-14 bg-[#12121a] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <span className="text-2xl">☁️</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -right-6 w-14 h-14 bg-[#12121a] border border-white/10 rounded-xl flex items-center justify-center shadow-lg"
                            >
                                <span className="text-2xl">🐳</span>
                            </motion.div>

                            {/* Terminal Window */}
                            <div className="bg-[#12121a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                                <div className="bg-[#1a1a24] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    <span className="ml-3 text-xs text-gray-500 font-mono">engineer.py</span>
                                </div>
                                <div className="p-6 font-mono text-sm space-y-3">
                                    <div>
                                        <span className="text-purple-400">class</span>
                                        <span className="text-yellow-300"> BackendEngineer</span>
                                        <span className="text-gray-500">:</span>
                                    </div>
                                    <div className="pl-4 space-y-2">
                                        <div>
                                            <span className="text-purple-400">def</span>
                                            <span className="text-blue-400"> __init__</span>
                                            <span className="text-gray-500">(self):</span>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-gray-400">self</span>
                                            <span className="text-gray-500">.</span>
                                            <span className="text-white">stack</span>
                                            <span className="text-gray-500"> = </span>
                                            <span className="text-violet-400">["Python", "Java", "AWS"]</span>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-gray-400">self</span>
                                            <span className="text-gray-500">.</span>
                                            <span className="text-white">focus</span>
                                            <span className="text-gray-500"> = </span>
                                            <span className="text-violet-400">"Performance"</span>
                                        </div>
                                        <div className="pt-2">
                                            <span className="text-purple-400">def</span>
                                            <span className="text-blue-400"> build</span>
                                            <span className="text-gray-500">(self, problem):</span>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-purple-400">return</span>
                                            <span className="text-violet-400"> "Scalable Solution"</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-gray-700 flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 bg-gray-600 rounded-full" />
                    </motion.div>
                </motion.div>
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
            className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
        >
            {icon}
        </a>
    );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════════════════

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
                        Production-Ready Systems
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                        Projects focused on performance, scalability, and real-world deployment.
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
            className={`group relative bg-[#12121a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-500 ${colors.glow} hover:shadow-2xl h-full flex flex-col`}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
                    <Icon size={24} className={colors.text} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            <div className="space-y-4">
                <div>
                    <p className={`text-xs font-mono ${colors.text} mb-1`}>{project.subtitle}</p>
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                        {project.title}
                    </h3>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                    {project.metrics.map((metric, i) => (
                        <div key={i} className={`text-center p-3 rounded-xl ${metric.highlight ? colors.bg : 'bg-white/5'}`}>
                            <div className={`text-2xl font-bold ${metric.highlight ? colors.text : 'text-white'}`}>
                                {metric.value}<span className="text-sm">{metric.unit}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
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

// ═══════════════════════════════════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════════════════════════════════

function SkillsSection() {
    const categories = [
        { title: "Languages", items: SKILLS.languages, icon: Terminal, color: "emerald" },
        { title: "Frameworks", items: SKILLS.frameworks, icon: Layers, color: "blue" },
        { title: "Infrastructure", items: SKILLS.infrastructure, icon: Server, color: "violet" }
    ];

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

                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#12121a] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2 rounded-lg bg-${cat.color}-500/10`}>
                                        <Icon size={20} className={`text-${cat.color}-400`} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 text-sm rounded-lg transition-colors cursor-default"
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

// ═══════════════════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════════════════

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

                    {/* Experience */}
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
                            <h3 className="text-lg font-semibold text-white">Experience</h3>
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
                        {["PCAP (Python)", "NPTEL Cloud Computing", "Cisco Cybersecurity", "Cisco Linux Essentials", "IELTS Band 7.5"].map((cert) => (
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

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════════════

function Footer() {
    return (
        <footer className="py-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">
                    Designed & Built by Surya Sasaank Yanamandra • © 2025
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
