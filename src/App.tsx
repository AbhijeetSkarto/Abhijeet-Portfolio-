import React, { useState, useEffect } from "react";
import { 
  Building2, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Compass, 
  Calendar, 
  MessageSquare,
  ChevronDown,
  Linkedin,
  Mail,
  MapPin,
  Globe,
  Award,
  Users,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  Check,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  Phone,
  BookOpen,
  ArrowUpRight,
  Target,
  FileText,
  Play,
  TrendingUp,
  Sliders,
  ChevronRight,
  UserCheck,
  Activity,
  Cpu,
  BarChart3,
  Clock,
  HeartHandshake,
  Sun,
  Moon,
  FileDown
} from "lucide-react";
import DiagnosticTool from "./components/DiagnosticTool";
import AnimateOnReveal from "./components/AnimateOnReveal";
import { ServiceItem, TimelineItem, ContactInputs } from "./types";
import confetti from "canvas-confetti";

// Premium Services dataset rewritten with precise executive scope and metrics
const SERVICES_DATA: ServiceItem[] = [
  {
    id: "bus-consulting",
    num: "01",
    icon: "🎯",
    title: "Business Consulting",
    description: "High-fidelity strategic advisory for founders and executive boards. Designing resilient business models, commercial strategies, and corporate growth architectures.",
    outcomes: ["Comprehensive operational blueprint", "Strategic bottleneck remediation", "Profit margin expansion plan"]
  },
  {
    id: "sales-training",
    num: "02",
    icon: "💼",
    title: "Corporate Sales Training",
    description: "Empower corporate sales teams with advanced negotiation techniques, structural closing methods, and consultative pipeline execution.",
    outcomes: ["On-site team diagnostic audit", "Custom interactive training curriculum", "Long-term performance assessment matrix"]
  },
  {
    id: "ai-consulting",
    num: "03",
    icon: "🤖",
    title: "AI Consulting",
    description: "No hype, pure operational leverage. Auditing business workflows to identify high-leverage areas for custom AI and LLM implementation.",
    outcomes: ["Organizational AI readiness matrix", "Custom automation roadmap", "Upskilling workshops for executive leadership"]
  },
  {
    id: "digi-transform",
    num: "04",
    icon: "🌐",
    title: "Digital Transformation",
    description: "Transition traditional businesses into state-of-the-art digital infrastructure. Modern cloud databases, seamless tooling, and analytical networks.",
    outcomes: ["Legacy systems migration strategy", "Unified enterprise technology stack", "Cross-departmental synchronization framework"]
  },
  {
    id: "automation",
    num: "05",
    icon: "⚡",
    title: "Business Automation",
    description: "Connect isolated applications to form integrated systems. Streamline administrative overhead and capture massive manual-hour savings.",
    outcomes: ["No-code systems architecture (Zapier/Make)", "Fulfillment trigger sequences", "Real-time management dashboards"]
  },
  {
    id: "growth-strategy",
    num: "06",
    icon: "📈",
    title: "Growth Strategy",
    description: "Systematic Go-to-Market blueprints engineered to align client positioning with high-value customer acquisitions.",
    outcomes: ["Market positioning matrices", "Competitive response modeling", "Pricing optimization schemes"]
  },
  {
    id: "perf-market",
    num: "07",
    icon: "📊",
    title: "Performance Marketing Strategy",
    description: "Data-driven client acquisition architectures designed specifically to optimize customer acquisition costs and maximize pipeline value.",
    outcomes: ["Paid acquisition channel configuration", "SEO dominance & local search authority blueprint", "Qualified pipeline tracking dashboard"]
  },
  {
    id: "web-transform",
    num: "08",
    icon: "💎",
    title: "Website Transformation",
    description: "Establish elite digital authority. Structuring premium corporate positioning, visual messaging frameworks, and clean conversion funnel pages.",
    outcomes: ["Brand positioning guidelines", "High-conversion copy & UX architecture", "Corporate communication framework"]
  }
];

// Professional Experience Timeline with robust metrics
const EXPERIENCE_DATA = [
  {
    company: "SKARTO",
    role: "Founder & Director",
    period: "2023 - Present",
    desc: "Built a premier digital transformation and growth consulting agency. Serving corporate accounts, manufacturing giants, and high-growth SMEs.",
    impact: "₹80Cr+ Cumulative Client Revenue Impact",
    skills: ["AI Operations", "Consultative Systems Design", "SME Restructuring", "Enterprise GTM"],
    achievements: [
      "Partnered with top-tier regional manufacturing institutions to implement custom AI automation and CRM pipelines.",
      "Engineered full-funnel sales frameworks that generated 40%+ organic revenue growth for mid-market clients.",
      "Advised enterprise boards on high-value AI integration across administrative and logistics operations."
    ]
  },
  {
    company: "Confidential Growth Consulting Group (NDA)",
    role: "Growth Director & Consultant",
    period: "2020 - 2023",
    desc: "Oversaw GTM, performance marketing systems, and brand transformations for regional corporate SME accounts.",
    impact: "Scaled outreach velocity by 3.2x across traditional sectors",
    skills: ["Funnel Optimization", "Corporate Sales Training", "Strategic Brand Positioning"],
    achievements: [
      "Structured performance marketing budgets and conversion pipelines for traditional manufacturing and retail sectors.",
      "Trained corporate sales teams to execute consultative high-ticket client acquisitions, lowering founder-dependency.",
      "Delivered comprehensive digital readiness audits across real estate, hospitality, and healthcare groups."
    ]
  },
  {
    company: "Confidential Tier-1 EdTech Conglomerate (NDA)",
    role: "Senior Sales & Leadership Lead",
    period: "2017 - 2020",
    desc: "Led complex consultative corporate sales, high-performance team building, and revenue operations.",
    impact: "Managed portfolio targets generating over ₹12Cr annually",
    skills: ["Corporate Client Management", "High-Ticket Closing", "Team Upskilling"],
    achievements: [
      "Achieved multiple corporate sales milestones, directly managing high-value business development divisions.",
      "Designed and executed structured consultative closing programs for over 150+ corporate executives.",
      "Spearheaded regional corporate partnerships, expanding school and college enterprise accounts."
    ]
  },
  {
    company: "Confidential Multi-National EdTech Enterprise (NDA)",
    role: "Business Development Manager & Trainer",
    period: "2015 - 2017",
    desc: "Drove high-velocity client acquisition, sales pipeline operations, and team performance coaching.",
    impact: "Executed 1000+ client negotiations and structured high-value closures",
    skills: ["Consultative Sales Engine", "Negotiation Strategy", "KPI Management"],
    achievements: [
      "Maintained top-decile revenue achievements across territorial sales divisions.",
      "Coached junior BBD team members on consultative selling and pipeline resilience.",
      "Implemented localized strategic sales blueprints that increased lead-to-conversion rates by 18%."
    ]
  }
];

// Luxury Case Studies matching request
const CASE_STUDIES_DATA = [
  {
    industry: "Manufacturing & Heavy Industries",
    client: "Confidential Engineering Corp. (NDA Protected)",
    challenge: "The client suffered from highly manual, offline sales pipelines, relying on fragmented phone calls, leading to inconsistent lead follow-ups and lost margins.",
    solution: "Designed a centralized CRM pipeline architecture, automated email follow-up systems, and structured an outbound B2B lead generation flow using LinkedIn and targeted corporate databases.",
    execution: "Implemented a custom dashboard tracker, automated follow-up sequences using system triggers, and trained their 22-person corporate sales force on structured closing.",
    impact: "Reclaimed 120+ manual sales hours per month, achieved a 2.5x increase in qualified pipelines, and stabilized a predictable monthly revenue growth curve.",
    before: "₹1.2Cr monthly baseline",
    after: "₹3.4Cr monthly velocity",
    metrics: "2.5x Pipeline Boost · 120hrs/mo Reclaimed"
  },
  {
    industry: "AI & SaaS Enterprises",
    client: "Confidential Tech SaaS Organization (NDA Protected)",
    challenge: "Lagging brand trust signals and low organic traffic. Founder was doing 100% of sales and was completely bottlenecked, unable to scale outbound reach.",
    solution: "Crafted a comprehensive positioning and brand strategy, designed a founder-independent sales training program for new sales executives, and formulated automated qualification systems.",
    execution: "Built clean corporate communication templates, set up interactive conversion funnels, and integrated automated discovery calendar scheduling with pre-qualification rules.",
    impact: "Shifted 80% of client acquisition burden off the founder, established clear digital authority, and reduced customer acquisition cost (CAC) by 35%.",
    before: "100% Founder Dependent",
    after: "80% Autonomous Sales",
    metrics: "35% CAC Reduction · 80% Founder Freedom"
  },
  {
    industry: "Logistics & Supply Chain",
    client: "Confidential Logistics SME (NDA Protected)",
    challenge: "Disconnected, high-overhead operations with manual booking sheets and lagging communication channels across regional warehouses.",
    solution: "Overhauled legacy processes into an automated workflow using cloud data networks and automated notification triggers, minimizing operational lag and manual booking errors.",
    execution: "Connected internal enterprise resources through real-time webhook operations and set up instant dispatch alerts via automated SMS and Email gateways.",
    impact: "Reduced dispatch errors to under 1% and automated 90% of order confirmation and tracking dispatches.",
    before: "12% Dispatch Error Rate",
    after: "< 1% Operations Error Rate",
    metrics: "< 1% Dispatch Errors · 90% Automated"
  }
];

// Interactive Roadmap/Methodology steps
const METHODOLOGY_STEPS = [
  {
    phase: "01",
    title: "Discover",
    objective: "Deep-dive diagnostic of structural operations",
    duration: "Week 1",
    deliverable: "Operational Complexity Map",
    details: "Analyze current workflows, audit manual touchpoints, interview key division heads, and map current client acquisition channels."
  },
  {
    phase: "02",
    title: "Diagnose",
    objective: "Isolate root causes of revenue leakage",
    duration: "Week 2",
    deliverable: "Systemic Bottleneck Brief",
    details: "Utilize systems-thinking to isolate why scaling has stagnated. Pinpoint human bottlenecks, operational overheads, or pipeline leakage."
  },
  {
    phase: "03",
    title: "Design",
    objective: "Craft custom CRM & AI blueprints",
    duration: "Week 3",
    deliverable: "High-Fidelity Growth Architecture",
    details: "Draft customized AI automation maps, B2B sales playbooks, CRM pipelines, and pre-qualification funnels designed to scale with your organization."
  },
  {
    phase: "04",
    title: "Deploy",
    objective: "Integrate platforms & automate workflows",
    duration: "Weeks 4-6",
    deliverable: "Live Integrated System Stack",
    details: "Launch active cloud connections, configure automated outreach triggers, initialize CRM routing, and connect custom AI/LLM modules."
  },
  {
    phase: "05",
    title: "Scale",
    objective: "Deploy upskilled personnel & launch outbound funnels",
    duration: "Weeks 7-8",
    deliverable: "Active Client-Acquisition Engine",
    details: "Onboard corporate sales teams onto the new playbooks, activate paid client channels, and launch cold outbound automation funnels."
  },
  {
    phase: "06",
    title: "Optimize",
    objective: "Continuous iterative audit & margin capture",
    duration: "Ongoing",
    deliverable: "Quarterly Performance Matrix",
    details: "Monitor pipeline metrics, fine-tune AI execution limits, optimize conversion margins, and run monthly growth audits."
  }
];

// Industries served
const INDUSTRIES_SERVED = [
  { name: "Traditional Manufacturing", description: "B2B manufacturing plants scaling output and automating complex manual sales cycles." },
  { name: "Tech SaaS & AI Enterprises", description: "High-growth tech teams setting up founder-independent consultative sales engines." },
  { name: "Logistics & Supply Chain", description: "Supply chains automating booking receipts, dispatches, and multi-warehouse alerts." },
  { name: "Retail & Consumer Goods", description: "E-commerce and classic retail chains maximizing customer lifetime value and paid GTM conversion." },
  { name: "Healthcare & Life Sciences", description: "Professional medical and clinical labs seeking secure workflows and optimized patient booking." },
  { name: "Hospitality & Tourism", description: "Premium regional hotel and hospitality operators integrating automatic booking and local search dominance." }
];

// Speaking Events
const SPEAKING_EVENTS = [
  {
    title: "Corporate AI Literacy & Operational Leverage Masterclass",
    audience: "CEOs, Directors & COOs",
    venue: "Corporate Leadership Summit, Mumbai",
    focus: "Upgrading legacy operations with systems-thinking and lightweight AI automation."
  },
  {
    title: "High-Ticket Consultative B2B Sales Systems",
    audience: "Corporate Teams & Business Heads",
    venue: "Enterprise Sales Forum, Bangalore",
    focus: "Structural pipeline management, advanced pricing models, and predictable pipelines."
  },
  {
    title: "The Physics of Growth: Combining Systems & Technology",
    audience: "Startup Founders & Investors",
    venue: "Founder Network Summit, Delhi",
    focus: "Achieving initial market traction, structuring business operations, and removing owner dependency."
  }
];

// Professional Insights Blog
const INSIGHTS_DATA = [
  {
    topic: "Business Systems",
    title: "How to Build an Owner-Independent Sales Engine: The Complete Framework",
    excerpt: "Discover the structural blueprints required to transition your client acquisition process from founder-dependent to fully systematized.",
    readTime: "7 min read",
    date: "June 2026"
  },
  {
    topic: "AI Strategy",
    title: "AI Adoption Beyond the Hype: Where to Reclaim Margin",
    excerpt: "Stop chasing trending consumer chatbots. Learn where actual corporate operations gain raw leverage through structured automation.",
    readTime: "9 min read",
    date: "May 2026"
  },
  {
    topic: "Sales Leadership",
    title: "Consultative Negotiation: The Art of High-Ticket B2B Closes",
    excerpt: "Stop pitching features. Understand how to design value-focused corporate solutions that align perfectly with client financial goals.",
    readTime: "6 min read",
    date: "April 2026"
  }
];

// Testimonials
const TESTIMONIALS_DATA = [
  {
    quote: "Abhijeet completely restructured our sales process. We went from manual, chaotic follow-ups to a beautifully automated, predictable pipeline that runs itself. His engineering background brings rare precision to business consulting.",
    author: "R. Sharma",
    role: "Managing Director",
    company: "Confidential Manufacturing Enterprise (NDA Protected)"
  },
  {
    quote: "Working with SKARTO has been a game changer. Abhijeet's AI Consulting framework saved our operations team over 15 hours a week in redundant manual entries. Highly recommended for enterprise scale.",
    author: "Anjali Gupta",
    role: "Chief Operating Officer",
    company: "Confidential Healthcare Group (NDA Protected)"
  },
  {
    quote: "Most growth advisors give you slide decks and concepts. Abhijeet gives you working systems, custom CRM architectures, and trained staff. An exceptional, elite standard of execution at high speed.",
    author: "Vikram S.",
    role: "Founder",
    company: "Confidential SaaS Organization (NDA Protected)"
  }
];

// FAQs matching executive consulting needs
const FAQS_DATA = [
  {
    question: "Who is your typical client, and what is the qualification criteria?",
    answer: "We typically work with forward-thinking Founders, CEOs, and corporate executive boards. Our sweet spot includes manufacturing firms, high-growth B2B SaaS startups, and established regional SMEs generating between ₹5 Cr and ₹100 Cr+ who are bottlenecked by manual sales processes, lack clear digital systems, or wish to strategically implement cost-saving AI workflows."
  },
  {
    question: "How does the Executive-Grade Growth & AI Diagnostic tool work?",
    answer: "Our diagnostic tool uses deep strategic criteria to model your business's primary bottleneck, classification, and annual revenue stage. In real-time, it evaluates standard systems defects, suggests exact AI automation areas, formulates high-priority GTM quick wins, and charts a custom 30-60-90 day scaling roadmap in Abhijeet's strategic advisory voice."
  },
  {
    question: "Do you only provide consulting slide decks, or do you help implement the systems?",
    answer: "We are built on engineering principles. We don't just leave you with slide decks. Through SKARTO, we design, deploy, and configure the entire technological infrastructure (CRMs, automated workflow channels, no-code integrations) and upskill your internal sales and operations personnel to ensure flawless operational continuity."
  },
  {
    question: "What is your typical engagement model?",
    answer: "Engagements typically run on a 3-month or 6-month strategic transformation retainer. We begin with a comprehensive operational audit, followed by systems design, implementation, and rigorous personnel training. For highly specific requirements, we also host customized executive workshops and on-site corporate training summits."
  },
  {
    question: "How do you guarantee and measure ROI on your services?",
    answer: "We track clear operational KPIs established at the start of our engagement. Common metrics include manual-hours reclaimed per month, outbound client-pipeline velocity boost, reduction in customer acquisition cost (CAC), and operational error reduction rate. Our goal is always to deliver a minimum 5x measurable ROI within the first 12 months."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activeMethodologyIndex, setActiveMethodologyIndex] = useState(0);
  const [activeCaseStudyIndex, setActiveCaseStudyIndex] = useState(0);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [hoveredMetricIdx, setHoveredMetricIdx] = useState<number | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("theme") as "dark" | "light") || "dark"
  );

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const html2pdfModule = await import("html2pdf.js");
      // html2pdf.js sometimes exports as default, sometimes as module directly depending on package bundler context
      const html2pdf = (html2pdfModule.default || html2pdfModule) as any;
      
      const element = document.getElementById("pdf-portfolio-template");
      if (!element) {
        throw new Error("PDF template not found");
      }

      const opt = {
        margin:       [0.4, 0.4, 0.4, 0.4],
        filename:     "Abhijeet_Suman_Consulting_Portfolio.pdf",
        image:        { type: "jpeg", quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          logging: false,
          letterRendering: true,
          windowWidth: 800
        },
        jsPDF:        { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak:    { mode: ["avoid-all", "css", "legacy"] }
      };

      await html2pdf().set(opt).from(element).save();

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Form states
  const [formInputs, setFormInputs] = useState<ContactInputs>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    service: "",
    context: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formFeedback, setFormFeedback] = useState<string>("");

  const handleEnquireService = (serviceTitle: string) => {
    setFormInputs(prev => ({ ...prev, service: serviceTitle }));
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const selectElement = document.getElementById("form-service-select");
      if (selectElement) {
        selectElement.classList.add("ring-2", "ring-[#0F62FE]");
        setTimeout(() => {
          selectElement.classList.remove("ring-2", "ring-[#0F62FE]");
        }, 1500);
      }
    }
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInputs)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormStatus("success");
        setFormFeedback(data.message);
        
        // Trigger blue & purple premium confetti sequence
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#0F62FE", "#8B5CF6", "#0F1115", "#FFFFFF"]
        });

        // Clear form
        setFormInputs({
          name: "",
          organization: "",
          email: "",
          phone: "",
          service: "",
          context: ""
        });
      } else {
        throw new Error(data.error || "An error occurred during submission.");
      }
    } catch (err: any) {
      setFormStatus("error");
      setFormFeedback(err.message || "Failed to submit your inquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 font-sans antialiased selection:bg-[#0F62FE] selection:text-white premium-bg-grid mesh-gradient-1">
      
      {/* ── HEADER / NAVIGATION ── */}
      <header className="sticky top-0 z-50 bg-[#070913]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="#" className="flex flex-col">
            <span className="font-display font-black text-lg tracking-tight text-white flex items-center gap-2">
              ABHIJEET SUMAN
              <span className="text-[10px] bg-[#0F62FE]/20 text-[#0F62FE] border border-[#0F62FE]/30 px-1.5 py-0.5 rounded font-mono font-bold tracking-normal">
                CONSULTING
              </span>
            </span>
            <span className="text-[9px] text-gray-400 font-mono tracking-widest font-extrabold uppercase leading-none mt-1">
              Founder, SKARTO · Systems &amp; AI Advisor
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            <a href="#about" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#services" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Services</a>
            <a href="#methodology" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Methodology</a>
            <a href="#growth-diagnostic" className="text-xs font-bold uppercase tracking-wider text-[#0F62FE] hover:text-[#3b82f6] flex items-center gap-1.5 transition-colors">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Strategic Diagnostic
            </a>
            <a href="#cases" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Case Studies</a>
            <a href="#experience" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Experience</a>
            <a href="#speaking" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Speaking</a>
            <a href="#insights" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Insights</a>
            <a href="#contact" className="text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Book call</a>
          </nav>

          <div className="hidden xl:flex items-center gap-4">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`px-3 py-2 bg-[#0F1115] border ${
                isGeneratingPDF 
                  ? "border-[#FFB800]/40 text-[#FFB800]" 
                  : "border-white/10 text-gray-400 hover:text-[#FFB800] hover:border-[#FFB800]/30"
              } rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs`}
              title="Download Portfolio as PDF"
            >
              <FileDown className={`w-3.5 h-3.5 ${isGeneratingPDF ? "animate-bounce text-[#FFB800]" : ""}`} />
              <span className="text-[10px] uppercase tracking-wider">
                {isGeneratingPDF ? "Generating PDF..." : "PDF Portfolio"}
              </span>
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 bg-[#0F1115] border border-white/10 rounded-lg text-gray-400 hover:text-[#0F62FE] hover:border-[#0F62FE]/30 transition-all cursor-pointer flex items-center justify-center"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500 hover:scale-110 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 hover:scale-110 transition-transform duration-300" />
              )}
            </button>
            <a 
              href="https://www.linkedin.com/in/abhijeet-suman-6b1616144" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-[#0F1115] border border-white/10 rounded-lg text-gray-400 hover:text-[#0F62FE] hover:border-[#0F62FE]/30 transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2.5 bg-[#FFB800] hover:bg-[#FFC526] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 group shadow-lg shadow-[#FFB800]/15"
            >
              Consult Now
              <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-bold text-[10px] group-hover:translate-x-0.5 transition-transform duration-300">
                →
              </span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#070913] border-t border-white/10 px-6 py-6 space-y-4 animate-fade-in">
            <div className="flex flex-col gap-4.5">
              <a onClick={() => setMobileMenuOpen(false)} href="#about" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">About</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#services" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Services</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#methodology" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Methodology</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#growth-diagnostic" className="text-sm font-bold uppercase tracking-wide text-[#0F62FE] block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Strategic Diagnostic
              </a>
              <a onClick={() => setMobileMenuOpen(false)} href="#cases" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Case Studies</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#experience" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Experience</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#speaking" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Speaking</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#insights" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Insights</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="text-sm font-semibold uppercase tracking-wide text-gray-300 hover:text-white block">Book Call</a>
            </div>
             <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
               <div className="flex gap-2">
                 <button
                   onClick={handleDownloadPDF}
                   disabled={isGeneratingPDF}
                   className={`p-2.5 bg-[#0F1115] border ${
                     isGeneratingPDF 
                       ? "border-[#FFB800]/40 text-[#FFB800]" 
                       : "border-white/10 text-gray-400 hover:text-[#FFB800]"
                   } rounded-lg flex items-center justify-center cursor-pointer`}
                   title="Download Portfolio PDF"
                   aria-label="Download Portfolio PDF"
                 >
                   <FileDown className={`w-4 h-4 ${isGeneratingPDF ? "animate-bounce" : ""}`} />
                 </button>
                 <a 
                   href="https://www.linkedin.com/in/abhijeet-suman-6b1616144" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="p-2.5 bg-[#0F1115] border border-white/10 rounded-lg text-gray-400 flex items-center justify-center"
                 >
                   <Linkedin className="w-4 h-4" />
                 </a>
                 <button
                   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                   className="p-2.5 bg-[#0F1115] border border-white/10 rounded-lg text-gray-400 flex items-center justify-center cursor-pointer"
                   aria-label="Toggle Theme"
                 >
                   {theme === "dark" ? (
                     <Sun className="w-4 h-4 text-amber-500" />
                   ) : (
                     <Moon className="w-4 h-4 text-indigo-600" />
                   )}
                 </button>
               </div>
               <a 
                 onClick={() => setMobileMenuOpen(false)}
                 href="#contact" 
                 className="flex-grow flex items-center justify-center gap-2 text-center px-4 py-2.5 bg-[#FFB800] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#FFB800]/10"
               >
                 Consult Now
               </a>
             </div>
          </div>
        )}
      </header>

      {/* ── HOMEPAGE HERO SECTION ── */}
      <section className="relative py-20 lg:py-32 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient-2 opacity-50" />
        
        {/* Floating background shapes */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#0F62FE]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#8B5CF6]/5 rounded-full blur-3xl" />

        <AnimateOnReveal className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Information Left side */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 text-[10px] font-mono tracking-widest uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] animate-pulse" />
                Partner &amp; Lead Growth Architect
              </div>

              <div className="space-y-5">
                <h2 className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#0F62FE] font-mono">
                  GLOBAL BUSINESS RESTRICTION &amp; STRATEGY
                </h2>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-black text-white leading-[1.05] tracking-tight">
                  I Help Companies <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">Scale Revenue</span> Through Systems, Strategy &amp; AI.
                </h1>
                <p className="text-base sm:text-lg font-medium text-gray-400 leading-relaxed max-w-2xl font-sans">
                  Redesigning company architecture to remove owner-dependency, automate redundant operations, and launch high-impact client acquisition engines.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href="#contact" 
                  className="px-6 py-4 bg-[#FFB800] hover:bg-[#FFC526] text-black font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-[#FFB800]/25 flex items-center gap-3.5 group hover:-translate-y-0.5"
                >
                  <span>Book Confidential Consultation</span>
                  <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:translate-x-0.5 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5 text-black font-bold" />
                  </span>
                </a>
                <a 
                  href="#growth-diagnostic" 
                  className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center gap-3.5 group hover:-translate-y-0.5"
                >
                  <span>Launch Free Diagnostic</span>
                  <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="w-2.5 h-2.5 text-white fill-white" />
                  </span>
                </a>
              </div>

              {/* Verified badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-md border border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0F62FE]" /> Systems Engineering Background
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-md border border-white/5">
                  <Award className="w-3.5 h-3.5 text-[#8B5CF6]" /> Enterprise Strategy Methodology
                </span>
                <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-md border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-[#0F62FE]" /> ₹80Cr+ Generated Impact
                </span>
              </div>
            </div>

            {/* Premium Animated KPI Dashboard Portrait Right side */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[430px] aspect-[4/5] bg-[#0F111A]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:20px_20px] opacity-80" />
                
                {/* Visual Glow behind contents */}
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#0F62FE]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-[#8B5CF6]/10 rounded-full blur-3xl" />

                {/* Visual Top Decorative */}
                <div className="z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 font-bold">ABHIJEET SUMAN CONSULTING</span>
                    <h3 className="font-display font-extrabold text-white text-sm mt-0.5 leading-none">EXECUTIVE HEADQUARTERS</h3>
                  </div>
                  <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-bold text-[#0F62FE] text-xs">
                    AS
                  </div>
                </div>

                {/* Central High-end Digital Diagram / Floating Analytics Cards */}
                <div className="z-10 my-6 space-y-4">
                  
                  {/* Floating Card 1: Revenue Velocity */}
                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between shadow-lg relative transform hover:-translate-x-1 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0F62FE]/10 rounded-lg border border-[#0F62FE]/20 text-[#0F62FE]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Client Revenue Velocity</span>
                        <span className="font-display font-bold text-sm text-white">+40% Organic Growth</span>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono font-bold">Scale Realized</span>
                  </div>

                  {/* Floating Card 2: AI Transformation */}
                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between shadow-lg relative transform hover:translate-x-1 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#8B5CF6]/10 rounded-lg border border-[#8B5CF6]/20 text-[#8B5CF6]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">AI Transformation Limit</span>
                        <span className="font-display font-bold text-sm text-white">90% Operational Autonomy</span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded font-mono font-bold uppercase">Active</span>
                  </div>

                  {/* Floating Card 3: Enterprise Systems */}
                  <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between shadow-lg relative transform hover:-translate-x-1 transition-transform duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0F62FE]/10 rounded-lg border border-[#0F62FE]/20 text-[#0F62FE]">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">Sales Pipeline Design</span>
                        <span className="font-display font-bold text-sm text-white">Owner-Independent Engine</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#0F62FE] font-mono font-bold">Stabilized</span>
                  </div>

                </div>

                {/* Interactive Realtime Coordinate tracking footer inside card */}
                <div className="z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F62FE] animate-ping" />
                    <span>SYSTEM CORE LIVE</span>
                  </div>
                  <span>LATENCY: 12ms</span>
                  <span>SECURE ENCRYPTED</span>
                </div>

              </div>
            </div>

          </div>
        </AnimateOnReveal>
      </section>

      {/* ── CLIENT MARQUEE LOGOS SECTION ── */}
      <section className="bg-[#0b0d19] py-8 border-b border-white/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">STABILIZED SYSTEMS AT PREMIER INSTITUTIONS</span>
          <span className="text-[10px] text-amber-500/80 font-mono italic">Due to NDA we can't disclose any brands or Startup names</span>
        </div>
        <div className="flex overflow-x-hidden relative w-full group">
          {/* Linear gradient masks to shade left and right edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0b0d19] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0b0d19] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee py-3 flex items-center gap-16 whitespace-nowrap">
            {/* Set 1 */}
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">CONFIDENTIAL MFG ENTERPRISE (NDA)</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">CONFIDENTIAL TECH SAAS CORP (NDA)</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">NDA-PROTECTED LOGISTICS GIANT</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">SKARTO CLIENT SYSTEMS</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">NDA-COVERED HEALTHCARE GROUP</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">CONFIDENTIAL RETAIL CHAIN (NDA)</span>

            {/* Set 2 (Dup for infinite marquee effect) */}
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">CONFIDENTIAL MFG ENTERPRISE (NDA)</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">CONFIDENTIAL TECH SAAS CORP (NDA)</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">NDA-PROTECTED LOGISTICS GIANT</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">SKARTO CLIENT SYSTEMS</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">NDA-COVERED HEALTHCARE GROUP</span>
            <span className="text-sm font-display font-black text-white/25 hover:text-white/75 transition-colors tracking-widest uppercase">CONFIDENTIAL RETAIL CHAIN (NDA)</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT EXECUTIVE SECTION ── */}
      <section id="about" className="py-20 lg:py-32 border-b border-white/10 relative">
        <div className="absolute right-0 top-1/4 w-80 h-80 bg-[#0F62FE]/5 rounded-full blur-3xl" />
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="editorial-tag-premium">
                <UserCheck className="w-3.5 h-3.5" /> Executive Advisory Overview
              </span>
              <h3 className="font-display text-3xl lg:text-[44px] font-black text-white tracking-tight leading-[1.1]">
                High-fidelity, systems-thinking consulting designed for CEOs.
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                As a Mechanical Engineer turned Growth Advisor and Founder of SKARTO, I translate structural science into organizational performance. No fluff. Just measurable revenue blueprints.
              </p>
              
              {/* Highlight credentials inside a clean box */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-4">
                <h4 className="font-display font-bold text-sm text-white">Advisory Principles:</h4>
                <div className="space-y-3 text-xs">
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-[#0F62FE] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Mechanical Systems Approach</strong>
                      <span className="text-gray-400 leading-relaxed block mt-0.5">Structuring human resources, sales channels, and digital tools like moving parts of an optimized physical machine.</span>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <CheckCircle className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Data-Driven Over Opinions</strong>
                      <span className="text-gray-400 leading-relaxed block mt-0.5">Implementing clear analytic dashboards to monitor revenue velocities and identify conversion margins.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Executive Card 1: SKARTO Legacy */}
                <div className="p-6 bg-[#0F111A] border border-white/10 rounded-xl space-y-3 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#0F62FE]" />
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Agency Leadership</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Founder &amp; Director at SKARTO</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    A multi-discipline consultancy helping companies transition traditional operations to unified modern networks and AI pipelines.
                  </p>
                </div>

                {/* Executive Card 2: Enterprise Scaling */}
                <div className="p-6 bg-[#0F111A] border border-white/10 rounded-xl space-y-3 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Sales Restructuring</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">150+ Corporate Leaders Trained</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Developing modern training modules and outbound Closing systems for commercial divisions across major regional agencies.
                  </p>
                </div>

                {/* Executive Card 3: Systems background */}
                <div className="p-6 bg-[#0F111A] border border-white/10 rounded-xl space-y-3 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Engineering Focus</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">Mechanical Engineer Foundation</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Graduated with a focus on core manufacturing systems, thermal dynamics, and procedural architecture. Direct logic applied to client operations.
                  </p>
                </div>

                {/* Executive Card 4: Community Influence */}
                <div className="p-6 bg-[#0F111A] border border-white/10 rounded-xl space-y-3 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#0F62FE]" />
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">Thought Authority</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white">4.7K+ LinkedIn Executive Tribe</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Routinely writing structural deep-dives and growth strategy essays followed by CEOs, investors, and operations experts.
                  </p>
                </div>

              </div>

              {/* Bottom Quote block */}
              <div className="p-6 bg-[#131622] border-l-4 border-[#0F62FE] rounded-r-2xl font-serif text-sm italic text-gray-300 leading-relaxed">
                "Scaling a business is not about hiring more salespeople to make chaotic phone calls. It is about designing an autonomous pipeline machine that converts cold markets into cashflow with mathematical consistency."
              </div>
            </div>

          </div>
        </AnimateOnReveal>
      </section>

      {/* ── INVENTIVE ACHIEVEMENTS COUNTER SECTION ── */}
      <section className="py-16 bg-[#0b0d19] border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent opacity-40" />
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center text-center">
            
            <div 
              onMouseEnter={() => setHoveredMetricIdx(0)}
              onMouseLeave={() => setHoveredMetricIdx(null)}
              className="space-y-1 group cursor-default"
            >
              <div className="font-display font-black text-3xl sm:text-5xl text-white group-hover:text-[#0F62FE] transition-colors duration-300 tracking-tight">
                10+ <span className="text-[#0F62FE]">Years</span>
              </div>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold block">Advisory Excellence</span>
            </div>

            <div 
              onMouseEnter={() => setHoveredMetricIdx(1)}
              onMouseLeave={() => setHoveredMetricIdx(null)}
              className="space-y-1 group cursor-default"
            >
              <div className="font-display font-black text-3xl sm:text-5xl text-white group-hover:text-[#8B5CF6] transition-colors duration-300 tracking-tight">
                100+ <span className="text-[#8B5CF6]">Brands</span>
              </div>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold block">SMEs &amp; Corporates</span>
            </div>

            <div 
              onMouseEnter={() => setHoveredMetricIdx(2)}
              onMouseLeave={() => setHoveredMetricIdx(null)}
              className="space-y-1 group cursor-default col-span-2 md:col-span-1"
            >
              <div className="font-display font-black text-3xl sm:text-5xl text-white group-hover:text-[#0F62FE] transition-colors duration-300 tracking-tight">
                ₹80Cr+
              </div>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold block text-transparent bg-clip-text bg-gradient-to-r from-[#0F62FE] to-[#8B5CF6]">Revenue Impact Realized</span>
            </div>

            <div 
              onMouseEnter={() => setHoveredMetricIdx(3)}
              onMouseLeave={() => setHoveredMetricIdx(null)}
              className="space-y-1 group cursor-default"
            >
              <div className="font-display font-black text-3xl sm:text-5xl text-white group-hover:text-[#8B5CF6] transition-colors duration-300 tracking-tight">
                12+ <span className="text-[#8B5CF6]">Sectors</span>
              </div>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold block">Industries Served</span>
            </div>

            <div 
              onMouseEnter={() => setHoveredMetricIdx(4)}
              onMouseLeave={() => setHoveredMetricIdx(null)}
              className="space-y-1 group cursor-default"
            >
              <div className="font-display font-black text-3xl sm:text-4xl text-white group-hover:text-[#0F62FE] transition-colors duration-300 tracking-tight">
                4.7K+
              </div>
              <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold block">LinkedIn Community</span>
            </div>

          </div>
        </AnimateOnReveal>
      </section>

      {/* ── CASE STUDIES LUXURY SECTION ── */}
      <section id="cases" className="py-20 lg:py-32 border-b border-white/10 relative">
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl" />
        
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4">
              <span className="editorial-tag-premium">
                <BarChart3 className="w-3.5 h-3.5" /> High-End Client Case Results
              </span>
              <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
                Executive-Grade Results. Real Impact.
              </h3>
              <p className="text-xs text-amber-500/80 font-mono mt-2 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Due to NDA we can't disclose any brands or Startup names
              </p>
            </div>

            {/* Interactive case study selector tabs */}
            <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto shrink-0 scrollbar-none">
              {CASE_STUDIES_DATA.map((study, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseStudyIndex(idx)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeCaseStudyIndex === idx 
                      ? "bg-[#0F62FE] text-white" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Study Details container */}
          <div className="p-6 md:p-10 bg-[#0F111A]/90 border border-white/10 rounded-2xl relative overflow-hidden shadow-2xl">
            {/* Ambient subtle outline glow */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#0F62FE]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Scope and Metrics */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <span className="text-[#0F62FE] font-mono text-[10px] uppercase tracking-widest font-extrabold bg-[#0F62FE]/10 border border-[#0F62FE]/20 px-2.5 py-1 rounded">
                    {CASE_STUDIES_DATA[activeCaseStudyIndex].industry}
                  </span>
                  <h4 className="font-display font-black text-2xl text-white mt-3">
                    {CASE_STUDIES_DATA[activeCaseStudyIndex].client}
                  </h4>
                </div>

                {/* Before/After Revenue Metrics Display */}
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 font-bold block">Verified Revenue Band Change</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 block uppercase font-bold">Baseline:</span>
                      <span className="font-display font-bold text-sm text-gray-300">{CASE_STUDIES_DATA[activeCaseStudyIndex].before}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 block uppercase font-bold">Realized Velocity:</span>
                      <span className="font-display font-bold text-sm text-white">{CASE_STUDIES_DATA[activeCaseStudyIndex].after}</span>
                    </div>
                  </div>
                </div>

                {/* Key takeaway badge */}
                <div className="flex items-center gap-3 text-[#0F62FE] font-mono text-xs font-bold uppercase">
                  <Check className="w-5 h-5 bg-[#0F62FE]/10 border border-[#0F62FE]/20 rounded p-0.5 shrink-0" />
                  <span>{CASE_STUDIES_DATA[activeCaseStudyIndex].metrics}</span>
                </div>
              </div>

              {/* Right Column: Narrative details */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono text-[#0F62FE] uppercase tracking-widest font-bold">01. The Systemic Challenge</h5>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">{CASE_STUDIES_DATA[activeCaseStudyIndex].challenge}</p>
                </div>

                <div className="border-t border-white/10 pt-5 space-y-2">
                  <h5 className="text-[10px] font-mono text-[#8B5CF6] uppercase tracking-widest font-bold">02. Strategic Advisory Solution</h5>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">{CASE_STUDIES_DATA[activeCaseStudyIndex].solution}</p>
                </div>

                <div className="border-t border-white/10 pt-5 space-y-2">
                  <h5 className="text-[10px] font-mono text-[#0F62FE] uppercase tracking-widest font-bold">03. High-Fidelity Execution</h5>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">{CASE_STUDIES_DATA[activeCaseStudyIndex].execution}</p>
                </div>

                <div className="border-t border-white/10 pt-5 space-y-2">
                  <h5 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">04. Documented Business Impact</h5>
                  <p className="text-sm text-white leading-relaxed font-sans font-semibold italic">
                    "{CASE_STUDIES_DATA[activeCaseStudyIndex].impact}"
                  </p>
                </div>

              </div>

            </div>

          </div>
        </AnimateOnReveal>
      </section>

      {/* ── SERVICES BENTO GRID SECTION ── */}
      <section id="services" className="py-20 lg:py-32 border-b border-white/10 relative">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#0F62FE]/5 rounded-full blur-3xl" />
        
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="editorial-tag-premium">
              <Layers className="w-3.5 h-3.5" /> High-Fidelity Practice Areas
            </span>
            <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
              A bespoke suite of revenue scaling systems.
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-2xl font-sans">
              We replace standard, slow manual methods with state-of-the-art outbound systems, custom CRM pipelines, and light-weight AI automation frameworks.
            </p>
          </div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((service, idx) => {
              return (
                <div 
                  key={service.id}
                  className="p-7 bg-[#0E111E]/60 border border-white/10 dark:border-white/5 rounded-2xl flex flex-col justify-between hover:border-[#FFB800]/30 hover:bg-[#0E111E]/90 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFB800]/5 hover:-translate-y-1 relative group"
                >
                  {/* Glowing hover indicator */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFB800]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl">{service.icon}</span>
                      <span className="text-xs font-mono text-gray-500 font-bold">{service.num}</span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-white group-hover:text-[#FFB800] transition-colors">
                      {service.title}
                    </h4>

                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      {service.description}
                    </p>

                    {/* Deliverable/Outcome items */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <span className="text-[9px] font-mono uppercase text-gray-500 block tracking-widest font-bold">Key Deliverables:</span>
                      <ul className="space-y-1.5">
                        {service.outcomes.map((outcome, oIdx) => (
                          <li key={oIdx} className="flex gap-2 items-start text-[11px] text-gray-300">
                            <span className="text-[#FFB800] font-bold mt-0.5 shrink-0">✓</span>
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/5 relative z-10 flex justify-between items-center">
                    <button 
                      onClick={() => handleEnquireService(service.title)}
                      className="text-[10px] font-bold uppercase tracking-wider text-white hover:text-[#FFB800] transition-all flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <span>Enquire Service</span>
                      <span className="w-5 h-5 bg-white/5 border border-white/10 group-hover/btn:bg-[#FFB800] group-hover/btn:border-[#FFB800] group-hover/btn:text-black rounded-lg flex items-center justify-center transition-all duration-300">
                        <ChevronRight className="w-3 h-3 text-current" />
                      </span>
                    </button>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#FFB800] transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── METHODOLOGY ROADMAP SECTION ── */}
      <section id="methodology" className="py-20 lg:py-32 bg-[#0b0d19] border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
        
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="editorial-tag-premium">
              <Compass className="w-3.5 h-3.5" /> Commercial Integration Blueprint
            </span>
            <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
              The 6-Phase Business Growth Framework
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              A precise engineering roadmap designed to implement digital systems, train teams, and scale pipeline velocity efficiently. Click any phase below to audit deliverables:
            </p>
          </div>

          {/* Interactive roadmap tabs */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMethodologyIndex(idx)}
                className={`p-4 rounded-xl border transition-all text-left relative overflow-hidden cursor-pointer ${
                  activeMethodologyIndex === idx 
                    ? "bg-[#0F62FE]/10 border-[#0F62FE] text-white" 
                    : "bg-[#0F111A]/60 border-white/5 hover:border-white/15 text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Phase {step.phase}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeMethodologyIndex === idx ? "bg-[#0F62FE]" : "bg-white/10"}`} />
                </div>
                <h4 className="font-display font-bold text-sm text-white">{step.title}</h4>
                <span className="text-[10px] text-gray-500 font-mono mt-0.5 block">{step.duration}</span>
              </button>
            ))}
          </div>

          {/* Active Methodology details card */}
          <div className="p-6 bg-[#0F111A] border border-white/10 rounded-2xl relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#0F62FE]" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <span className="text-[9px] font-mono text-[#0F62FE] uppercase tracking-widest font-bold">Active Phase Detail</span>
                <h4 className="font-display font-black text-xl text-white">
                  Phase {METHODOLOGY_STEPS[activeMethodologyIndex].phase}: {METHODOLOGY_STEPS[activeMethodologyIndex].title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {METHODOLOGY_STEPS[activeMethodologyIndex].details}
                </p>
              </div>

              <div className="md:col-span-4 p-4 bg-white/5 border border-white/5 rounded-xl space-y-3">
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block font-bold">Objective:</span>
                  <span className="text-xs font-semibold text-white mt-0.5 block">{METHODOLOGY_STEPS[activeMethodologyIndex].objective}</span>
                </div>
                <div className="border-t border-white/5 pt-2">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block font-bold">Key Deliverable:</span>
                  <span className="text-xs font-mono font-bold text-[#0F62FE] mt-0.5 block">{METHODOLOGY_STEPS[activeMethodologyIndex].deliverable}</span>
                </div>
              </div>

            </div>
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── INTERACTIVE MCKINSEY-GRADE DIAGNOSTIC TOOL SECTION ── */}
      <section id="diagnostic" className="py-20 lg:py-32 border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(15,98,254,0.03)_1px,transparent_1px)] [background-size:30px_30px] opacity-70" />
        <div className="absolute left-1/4 right-1/4 bottom-1/4 h-96 bg-[#0F62FE]/5 rounded-full blur-3xl pointer-events-none" />
        
        <AnimateOnReveal className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-12">
            <span className="editorial-tag-premium">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Executive Suite
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-black text-white tracking-tight">
              Test your business against our diagnostic tool.
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xl mx-auto">
              Simulate an instant strategic audit of your company's revenue pipelines and AI leverage points powered by live, secure server-side proxy operations via Gemini.
            </p>
          </div>

          <DiagnosticTool />
        </AnimateOnReveal>
      </section>

      {/* ── INDUSTRIES SERVED SECTION ── */}
      <section className="py-20 lg:py-32 border-b border-white/10 relative">
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl space-y-4 mb-16">
            <span className="editorial-tag-premium">
              <Building2 className="w-3.5 h-3.5" /> Industrial Versatility
            </span>
            <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
              Sectors where we implement authority.
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              We apply our rigorous mechanical systems methodology to both traditional industries and cutting-edge tech groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_SERVED.map((industry, idx) => (
              <div 
                key={idx}
                className="p-6 bg-[#0F111A]/70 border border-white/10 rounded-xl space-y-3 hover:border-[#0F62FE]/30 transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-[#0F62FE] group-hover:scale-125 transition-transform" />
                <h4 className="font-display font-bold text-base text-white">{industry.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{industry.description}</p>
              </div>
            ))}
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── PROFESSIONAL TIMELINE EXPERIENCE ── */}
      <section id="experience" className="py-20 lg:py-32 bg-[#0b0d19] border-b border-white/10 relative">
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl space-y-4 mb-16">
            <span className="editorial-tag-premium">
              <Clock className="w-3.5 h-3.5" /> Career Timeline &amp; Track Record
            </span>
            <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
              10+ Years of Systems Engineering.
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              From corporate sales execution at tier-1 conglomerates, to directing growth programs at premier digital consulting firms, to founding SKARTO, our history is anchored in raw revenue milestones.
            </p>
            <p className="text-xs text-amber-500/80 font-mono mt-2 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Due to NDA we can't disclose any brands or Startup names
            </p>
          </div>

          {/* Apple style vertical timeline with robust cards */}
          <div className="relative pl-6 md:pl-12 border-l-2 border-white/10 space-y-12 max-w-5xl">
            {EXPERIENCE_DATA.map((job, idx) => (
              <div key={idx} className="relative group">
                {/* Visual Circle Indicator */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1 w-5 h-5 rounded-full bg-[#0F62FE] border-4 border-[#070913] group-hover:scale-125 transition-transform duration-300" />
                
                <div className="p-6 md:p-8 bg-[#0F111A] border border-white/10 rounded-2xl space-y-4 relative hover:border-white/20 transition-all shadow-xl">
                  {/* Glowing background */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0F62FE]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#0F62FE] uppercase tracking-widest font-bold">
                        {job.period}
                      </span>
                      <h4 className="font-display font-black text-xl text-white mt-1">
                        {job.role}
                      </h4>
                      <p className="text-sm font-semibold text-gray-300">{job.company}</p>
                    </div>
                    {/* Impact Tag */}
                    <div className="self-start md:self-center px-3 py-1.5 bg-[#0F62FE]/10 border border-[#0F62FE]/20 rounded-lg text-xs font-mono font-bold text-[#0F62FE]">
                      {job.impact}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed max-w-3xl font-sans">
                    {job.desc}
                  </p>

                  {/* Achievements bullet list */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500 block font-bold">Key Milestones:</span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {job.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills tags */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-mono text-gray-400">
                    <span className="text-gray-500">Skills Used:</span>
                    {job.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="bg-white/5 border border-white/5 px-2 py-0.5 rounded text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section id="testimonials" className="py-20 lg:py-32 border-b border-white/10 relative">
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl space-y-4 mb-16">
            <span className="editorial-tag-premium">
              <UserCheck className="w-3.5 h-3.5" /> Client Appraisals &amp; Corporate Recommendations
            </span>
            <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
              Endorsed by Managing Directors.
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Direct recommendations from operational managers, enterprise executives, and corporate client boards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-[#0F111A] border border-white/10 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all relative group"
              >
                {/* Decorative Quote mark */}
                <div className="absolute top-4 right-6 text-7xl font-serif text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">
                  “
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans italic relative z-10 font-medium">
                  "{t.quote}"
                </p>

                <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[#0F62FE]/20 border border-[#0F62FE]/30 flex items-center justify-center font-bold text-white text-xs uppercase">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-none">{t.author}</h5>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">{t.role} · {t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini LinkedIn Recommendation CTA Box */}
          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0F62FE]/10 border border-[#0F62FE]/20 rounded-xl text-[#0F62FE]">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Looking for live, verified recommendations?</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Explore over a dozen corporate references and recommendations directly on LinkedIn.</p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/abhijeet-suman-6b1616144"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#0F62FE] hover:bg-[#3b82f6] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              Verify on LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── SPEAKING SECTION ── */}
      <section id="speaking" className="py-20 lg:py-32 bg-[#0b0d19] border-b border-white/10 relative">
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-4 space-y-6">
              <span className="editorial-tag-premium">
                <Users className="w-3.5 h-3.5" /> Corporate Events &amp; Workshops
              </span>
              <h3 className="font-display text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.1]">
                Keynote Advisory &amp; Leadership Summits.
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Routinely hosting corporate AI-literacy clinics, high-ticket consultative closing bootcamps, and business systems-thinking workshops for director-level audiences.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#0F62FE] transition-colors cursor-pointer"
              >
                Inquire for Keynote Speeches <ArrowRight className="w-4 h-4 text-[#0F62FE]" />
              </a>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SPEAKING_EVENTS.map((event, idx) => (
                  <div key={idx} className="p-5 bg-[#0F111A] border border-white/5 rounded-xl space-y-4 hover:border-white/15 transition-all">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-[#0F62FE] uppercase tracking-widest font-bold">Audience: {event.audience}</span>
                      <h4 className="font-display font-bold text-sm text-white leading-tight">{event.title}</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{event.focus}</p>
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500">
                      <span>{event.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </AnimateOnReveal>
      </section>

      {/* ── PROFESSIONAL INSIGHTS BLOG SECTION ── */}
      <section id="insights" className="py-20 lg:py-32 border-b border-white/10 relative">
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-4 max-w-xl">
              <span className="editorial-tag-premium">
                <FileText className="w-3.5 h-3.5" /> Systems Thinking Essays
              </span>
              <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
                Insights &amp; Revenue Blueprints.
              </h3>
            </div>
            <a 
              href="https://www.linkedin.com/in/abhijeet-suman-6b1616144" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-white transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            >
              Read More on LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INSIGHTS_DATA.map((article, idx) => (
              <article 
                key={idx} 
                className="p-6 bg-[#0F111A] border border-white/10 rounded-2xl flex flex-col justify-between hover:border-[#0F62FE]/30 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span className="text-[#0F62FE] font-bold uppercase tracking-wider">{article.topic}</span>
                    <span>{article.date}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-white group-hover:text-[#0F62FE] transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>{article.readTime}</span>
                  <span className="text-white group-hover:text-[#0F62FE] transition-colors font-bold uppercase flex items-center gap-1">
                    Read Essay <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── FAQ ACCORDION SECTION ── */}
      <section className="py-20 lg:py-32 bg-[#0b0d19] border-b border-white/10 relative">
        <AnimateOnReveal className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="editorial-tag-premium">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Enquired Queries
            </span>
            <h3 className="font-display text-2xl lg:text-4xl font-black text-white tracking-tight">
              Answering key operational questions.
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Transparent parameters on our advisory methodology, diagnostic tool, and implementation scope.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-[#0F111A] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 text-white focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-bold text-sm md:text-base">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#0F62FE] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs text-gray-300 leading-relaxed font-sans border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </AnimateOnReveal>
      </section>

      {/* ── CONTACT & INTEGRATED APPLICATION SUITE ── */}
      <section id="contact" className="py-20 lg:py-32 border-b border-white/10 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0F62FE]/5 rounded-full blur-3xl pointer-events-none" />
        <AnimateOnReveal className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Details Left side */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="editorial-tag-premium">
                  <HeartHandshake className="w-3.5 h-3.5" /> Lock In Strategic Call
                </span>
                <h3 className="font-display text-3xl lg:text-5xl font-black text-white tracking-tight">
                  Initiate Client Briefing.
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  Submit an inquiry to schedule a strict 15-minute diagnostic call. We will discuss current bottleneck coordinates and operational ROI horizons.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4 text-xs font-mono">
                <span className="text-gray-500 uppercase tracking-widest block font-bold text-[9px]">Direct Channels:</span>
                
                <div className="space-y-2">
                  <a 
                    href="mailto:abhijeet@skarto.cloud" 
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl transition-all"
                  >
                    <Mail className="w-4 h-4 text-[#0F62FE]" />
                    <div>
                      <span className="text-gray-500 text-[9px] block uppercase font-bold">Email Communication</span>
                      <span className="text-white font-semibold mt-0.5 block">abhijeet@skarto.cloud</span>
                    </div>
                  </a>

                  <a 
                    href="tel:+917009899914" 
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#0F62FE]" />
                    <div>
                      <span className="text-gray-500 text-[9px] block uppercase font-bold">Direct Call</span>
                      <span className="text-white font-semibold mt-0.5 block">+91 70098 99914</span>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/917009899194" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl transition-all"
                  >
                    <Phone className="w-4 h-4 text-[#8B5CF6]" />
                    <div>
                      <span className="text-gray-500 text-[9px] block uppercase font-bold">Direct WhatsApp</span>
                      <span className="text-white font-semibold mt-0.5 block">+91 70098 99194</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500 text-[9px] block uppercase font-bold">Operational Base</span>
                      <span className="text-white font-semibold mt-0.5 block">India · Available globally</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar reservation placeholder */}
              <div className="p-5 bg-[#0b0d19] border border-white/10 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0F62FE]" />
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Calendar Synchronizer</span>
                </div>
                <h4 className="font-display font-bold text-sm text-white">Live Calendly Integration Enabled</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Upon submitting our validation form, a direct calendar schedule gate unlocks to book immediate time slots.
                </p>
              </div>

            </div>

            {/* Premium Inquiry Validation Form Right side */}
            <div className="lg:col-span-7 bg-[#0F111A] border border-white/10 rounded-2xl p-6 md:p-8 relative shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent opacity-60" />
              
              <h4 className="font-display font-black text-xl text-white mb-6">Commercial Evaluation Registry</h4>

              <form onSubmit={handleFormSubmit} className="space-y-5 text-white">
                
                {formStatus === "success" && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-900/50 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-emerald-300">Registry Confirmed Successfully</h5>
                      <p className="text-[11px] text-emerald-200 mt-1 leading-relaxed opacity-90">{formFeedback}</p>
                    </div>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-red-300">Registration Failure</h5>
                      <p className="text-[11px] text-red-200 mt-0.5 opacity-90">{formFeedback}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Principal Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formInputs.name}
                      onChange={handleFormInputChange}
                      placeholder="e.g. Abhijeet Suman"
                      className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-xs focus:border-[#0F62FE] outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Organization / Enterprise</label>
                    <input 
                      type="text" 
                      name="organization"
                      required
                      value={formInputs.organization}
                      onChange={handleFormInputChange}
                      placeholder="e.g. SKARTO, Acme Corp"
                      className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-xs focus:border-[#0F62FE] outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Secure Business Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formInputs.email}
                      onChange={handleFormInputChange}
                      placeholder="e.g. principal@company.com"
                      className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-xs focus:border-[#0F62FE] outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Direct Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formInputs.phone}
                      onChange={handleFormInputChange}
                      placeholder="e.g. +91 70098 99914"
                      className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-xs focus:border-[#0F62FE] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Requested Strategic Practice Area</label>
                  <select 
                    id="form-service-select"
                    name="service"
                    required
                    value={formInputs.service}
                    onChange={handleFormInputChange}
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-xs focus:border-[#0F62FE] outline-none transition-all"
                  >
                    <option value="">Select practice area...</option>
                    <option value="Business Consulting">Business Consulting</option>
                    <option value="Corporate Sales Training">Corporate Sales Training</option>
                    <option value="AI Consulting">AI Consulting</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                    <option value="Business Automation">Business Automation</option>
                    <option value="Growth Strategy">Growth Strategy</option>
                    <option value="Performance Marketing Strategy">Performance Marketing Strategy</option>
                    <option value="Website Transformation">Website Transformation</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Operational Context &amp; Bottlenecks</label>
                  <textarea 
                    name="context"
                    required
                    value={formInputs.context}
                    onChange={handleFormInputChange}
                    rows={4}
                    placeholder="Briefly state your current operational bottlenecks, annual revenue stages, and 12-month goals..."
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-xs focus:border-[#0F62FE] outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-4 bg-[#0F62FE] hover:bg-[#3b82f6] disabled:bg-[#0f62fe]/40 text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-lg shadow-[#0F62FE]/25"
                >
                  {formStatus === "submitting" ? "Verifying parameters..." : "Register Strategic Briefing Inquiry"}
                </button>

              </form>
            </div>

          </div>
        </AnimateOnReveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#04050a] border-t border-white/10 py-16 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
            
            <div className="md:col-span-5 space-y-4">
              <span className="font-display font-black text-lg text-white tracking-tight flex items-center gap-2">
                ABHIJEET SUMAN
              </span>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Engineering-focused strategic advisor and Founder &amp; Director of SKARTO. Redesigning manual systems into autonomous high-revenue machinery.
              </p>
              <p className="text-[10px] font-mono text-gray-500">
                All client consultations are held under strict non-disclosure terms.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Practice Verticals</span>
              <div className="flex flex-col gap-2">
                <a href="#services" className="hover:text-white transition-colors">Business Consulting</a>
                <a href="#services" className="hover:text-white transition-colors">Corporate Sales Training</a>
                <a href="#services" className="hover:text-white transition-colors">AI &amp; LLM Advising</a>
                <a href="#services" className="hover:text-white transition-colors">Enterprise Automation</a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Direct Gates</span>
              <div className="flex flex-col gap-2">
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#cases" className="hover:text-white transition-colors">Case Studies</a>
                <a href="#diagnostic" className="hover:text-white transition-colors">Growth Diagnostic</a>
                <a href="#speaking" className="hover:text-white transition-colors">Workshops</a>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Digital Presence</span>
              <div className="flex flex-col gap-2">
                <a 
                  href="https://www.linkedin.com/in/abhijeet-suman-6b1616144" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  LinkedIn Profile <ExternalLink className="w-3 h-3" />
                </a>
                <a href="mailto:abhijeet@skarto.cloud" className="hover:text-white transition-colors">Email Channel</a>
                <a href="https://wa.me/917009899194" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Direct</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-[10px] font-mono uppercase tracking-wider">
            <span>© {new Date().getFullYear()} Abhijeet Suman Consulting. All rights reserved.</span>
            <div className="flex gap-4">
              <span>DESIGNED TO PREMIER ENTERPRISE STANDARDS</span>
              <span>•</span>
              <span>POWERED BY SKARTO</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── HIDDEN PRINTABLE PORTFOLIO TEMPLATE FOR PDF GENERATION ── */}
      <div 
        id="pdf-portfolio-template" 
        style={{ 
          position: "absolute", 
          left: "-9999px", 
          top: "-9999px", 
          width: "780px", 
          padding: "45px", 
          backgroundColor: "#ffffff", 
          color: "#111827", 
          fontFamily: "'Inter', sans-serif",
          boxSizing: "border-box",
          // Overriding standard Tailwind v4 CSS variables to prevent html2canvas parsing oklch values
          "--color-white": "#ffffff",
          "--color-black": "#000000",
          "--color-gray-50": "#f9fafb",
          "--color-gray-100": "#f3f4f6",
          "--color-gray-200": "#e5e7eb",
          "--color-gray-300": "#d1d5db",
          "--color-gray-400": "#9ca3af",
          "--color-gray-500": "#6b7280",
          "--color-gray-600": "#4b5563",
          "--color-gray-700": "#374151",
          "--color-gray-800": "#1f2937",
          "--color-gray-900": "#111827",
          "--color-gray-950": "#030712",
          "--color-amber-50": "#fefbeb",
          "--color-amber-100": "#fef3c7",
          "--color-amber-200": "#fde68a",
          "--color-amber-850": "#92400e",
          "--color-amber-800": "#92400e",
        } as React.CSSProperties}
        className="text-black bg-white"
      >
        {/* PDF Header Banner */}
        <div style={{ borderBottom: "4px solid #0F62FE" }} className="pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
                Abhijeet Suman
              </h1>
              <h2 style={{ color: "#0F62FE" }} className="text-sm font-bold tracking-wide mt-1 uppercase">
                Founder, SKARTO · Enterprise Systems &amp; AI Advisor
              </h2>
              <p className="text-xs text-gray-600 mt-2 max-w-lg leading-relaxed">
                MIT, IIBA, and PMI certified Advisor with 10+ years of high-performance delivery. Helping manufacturing institutions, enterprise accounts, and high-growth SMEs automate operations and scale client acquisition.
              </p>
            </div>
            <div className="text-right text-[11px] text-gray-600 space-y-1 font-mono shrink-0">
              <p className="font-bold text-gray-900">CONTACT INFO</p>
              <p>🌐 skarto.cloud</p>
              <p>✉ abhijeet@skarto.cloud</p>
              <p>✉ abhijeetsuman.er@gmail.com</p>
              <p>☎ +91 70098 99194</p>
              <p>📍 Indore, M.P., India</p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-6">
          <h3 style={{ borderColor: "#e5e7eb" }} className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-1 mb-2">
            Executive Growth Focus
          </h3>
          <p className="text-xs text-gray-700 leading-relaxed">
            A seasoned Growth Architect specializing in systems re-engineering. I integrate custom CRM pipelines, high-conversion branding assets, and autonomous outbound sales sequences to unlock predictable growth. Through <strong>SKARTO</strong>, we design, deploy, and maintain robust client-acquisition systems, delivering measurable client impact exceeding <strong>₹80Cr+</strong> in cumulative revenue expansion.
          </p>
        </div>

        {/* Practice Verticals / Services */}
        <div className="mb-6">
          <h3 style={{ borderColor: "#e5e7eb" }} className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-1 mb-3">
            Core Consulting Practice &amp; Offerings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {SERVICES_DATA.map((service, idx) => (
              <div 
                key={idx} 
                style={{ borderColor: "#f3f4f6", backgroundColor: "rgba(249, 250, 251, 0.65)" }} 
                className="p-3 border rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm">{service.icon}</span>
                  <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-tight">
                    {service.title}
                  </h4>
                </div>
                <p className="text-[10px] text-gray-600 leading-normal mb-2">
                  {service.description}
                </p>
                <div className="space-y-1">
                  {service.outcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-1.5 text-[9px] text-gray-700">
                      <span style={{ color: "#0F62FE" }} className="font-bold">✓</span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="mb-6">
          <h3 style={{ borderColor: "#e5e7eb" }} className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-1 mb-3">
            Professional Enterprise Tenure
          </h3>
          <div className="space-y-4">
            {EXPERIENCE_DATA.map((exp, idx) => (
              <div key={idx} style={{ borderLeftColor: "rgba(15, 98, 254, 0.3)" }} className="border-l-2 pl-3 py-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900">
                      {exp.role}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-gray-500 font-bold block">
                      {exp.period}
                    </span>
                    <span 
                      style={{ 
                        backgroundColor: "#fefbeb", 
                        color: "#92400e", 
                        borderColor: "rgba(253, 230, 138, 0.5)" 
                      }} 
                      className="text-[9px] border px-1.5 py-0.2 rounded-full font-bold"
                    >
                      {exp.impact}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 mt-1 mb-2 leading-normal italic">
                  {exp.desc}
                </p>
                
                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      style={{ backgroundColor: "rgba(15, 98, 254, 0.05)", color: "#0F62FE" }} 
                      className="text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements bullets */}
                <ul className="space-y-1">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="text-[9.5px] text-gray-700 leading-normal flex items-start gap-1.5">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Consulting Methodology */}
        <div className="mb-4">
          <h3 style={{ borderColor: "#e5e7eb" }} className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b pb-1 mb-3">
            Consulting Methodology
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            {METHODOLOGY_STEPS.map((step, idx) => (
              <div 
                key={idx} 
                style={{ borderColor: "#f3f4f6", backgroundColor: "rgba(249, 250, 251, 0.4)" }} 
                className="p-2 border rounded"
              >
                <span style={{ color: "#0F62FE" }} className="text-[10px] font-mono font-bold block mb-0.5">
                  PHASE 0{idx + 1}
                </span>
                <span className="text-[9px] font-bold text-gray-900 uppercase block leading-tight mb-1">
                  {step.title}
                </span>
                <p className="text-[8px] text-gray-600 leading-tight">
                  {step.objective}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NDA & Call to Action Footer */}
        <div style={{ borderColor: "#e5e7eb" }} className="mt-8 pt-4 border-t flex justify-between items-center text-[9px] text-gray-500 font-mono">
          <span>ABHIJEET SUMAN CONSULTING · CONFIDENTIAL PORTFOLIO DOCUMENT</span>
          <span>BOOK AT: SKARTO.CLOUD</span>
        </div>
      </div>

    </div>
  );
}
