import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Compass, 
  Calendar, 
  MessageSquare,
  RefreshCw,
  TrendingUp,
  FileText
} from "lucide-react";
import { DiagnosticInputs, DiagnosticResult } from "../types";

const ROTATING_LOADING_MESSAGES = [
  "Structuring strategic business parameters...",
  "Analyzing vertical market dynamics & competitive landscape...",
  "Running systems-thinking bottleneck simulations...",
  "Identifying highest-leverage AI & business automation points...",
  "Formulating Go-to-Market quick wins...",
  "Drafting a customized 30-60-90 day scaling roadmap...",
  "Structuring personalized guidance in Abhijeet Suman's strategic voice..."
];

const INDUSTRIES_LIST = [
  "AI & Technology / B2B SaaS",
  "Manufacturing & Industrial",
  "E-commerce / D2C Brands",
  "Education / EdTech / Academic Institutions",
  "Healthcare & Life Sciences",
  "Professional Services / Agency / Consulting",
  "Retail & Consumer Goods",
  "Real Estate & Property Development",
  "Logistics & Supply Chain",
  "Financial Services & FinTech",
  "Hospitality & Tourism",
  "NGO & Social Impact"
];

const COMMON_BOTTLENECK_TEMPLATES = [
  { label: "Inconsistent lead generation & sales pipeline", value: "Inconsistent lead generation and lack of qualified pipeline stability" },
  { label: "Highly manual, slow back-office operations", value: "Highly manual workflows, operations rely heavily on human interventions, slow delivery" },
  { label: "Stagnant brand trust, search traffic & lead velocity", value: "Stagnant organic traffic, low search presence, and poor digital trust signals" },
  { label: "Sales process depends entirely on the founder", value: "Owner-dependent sales engine, business stops growing when the founder isn't active" },
  { label: "No clear AI adoption strategy or automation roadmap", value: "Unsure where to implement AI/LLMs to save cost or drive margins, lagging in technology adoption" },
  { label: "Struggling to scale beyond regional boundaries", value: "Geographical ceiling, looking to expand from regional limits to national or global audiences" }
];

export default function DiagnosticTool() {
  const [inputs, setInputs] = useState<DiagnosticInputs>({
    businessName: "",
    businessSize: "SME",
    industry: INDUSTRIES_LIST[0],
    revenueStage: "₹50 Lakhs - ₹5 Crores",
    bottleneck: COMMON_BOTTLENECK_TEMPLATES[0].value,
    goals: "Build a predictable lead engine and integrate AI to automate daily client operations"
  });

  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "root-cause" | "ai" | "gtm" | "roadmap">("summary");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [customBottleneckActive, setCustomBottleneckActive] = useState(false);

  // Rotate loading messages
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % ROTATING_LOADING_MESSAGES.length);
      }, 3000);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const startNewDiagnostic = () => {
    setResult(null);
    setErrorMsg(null);
  };

  const triggerDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/gemini/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === "API Key Required" || data.error?.includes("GEMINI_API_KEY")) {
          throw new Error("api_key_missing");
        }
        throw new Error(data.error || "Failed to generate audit. Please check server logs.");
      }
      
      setResult(data);
      setActiveTab("summary");
    } catch (err: any) {
      console.error(err);
      if (err.message === "api_key_missing") {
        setErrorMsg("API_KEY_MISSING");
      } else {
        setErrorMsg(err.message || "Something went wrong while simulating your audit. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="growth-diagnostic" className="bg-[#0F111A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* Decorative ambient top glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#0F62FE] to-transparent opacity-60" />
      
      {/* Header Banner */}
      <div className="p-6 md:p-8 bg-[#131622] border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-[#0F62FE]/20 border border-[#0F62FE]/30 rounded text-[#0F62FE]">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-[9px] text-[#0F62FE] uppercase tracking-widest font-bold">Executive-Grade Strategic Simulator</span>
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">Interactive Growth &amp; AI Diagnostic</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Input your organizational criteria to run an instant strategic assessment, identifying root systemic bottlenecks and key AI automation leverage points.
          </p>
        </div>
        {result && (
          <button 
            onClick={startNewDiagnostic}
            className="self-start md:self-center flex items-center gap-2 px-3 py-1.5 bg-[#1B2030] hover:bg-[#252C44] border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-white rounded-lg transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            Restart Assessment
          </button>
        )}
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* STATE 1: FORM INPUTS */}
          {!loading && !result && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={triggerDiagnostic}
              className="space-y-6 text-white"
            >
              {errorMsg && (
                <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    {errorMsg === "API_KEY_MISSING" ? (
                      <>
                        <h5 className="text-xs font-bold text-red-300">Gemini API Key Required</h5>
                        <p className="text-[11px] text-red-200 mt-1 leading-relaxed opacity-90">
                          This strategic simulator is powered by live server-side AI via <strong>Gemini 3.5 Flash</strong>. 
                          To activate, please configure a valid <strong>GEMINI_API_KEY</strong> inside the <strong>Settings &gt; Secrets</strong> panel.
                          This ensures secure server-side proxy handling.
                        </p>
                      </>
                    ) : (
                      <>
                        <h5 className="text-xs font-bold text-red-300">Diagnostic Simulation Interrupted</h5>
                        <p className="text-[11px] text-red-200 mt-0.5 opacity-90">{errorMsg}</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Business Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                    Company Name <span className="text-gray-500 lowercase italic">(optional)</span>
                  </label>
                  <input 
                    type="text" 
                    name="businessName"
                    value={inputs.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Industrial, InnovaCare"
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] focus:ring-1 focus:ring-[#0F62FE] outline-none transition-all placeholder:text-gray-600"
                  />
                </div>

                {/* Business Size */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Company Classification</label>
                  <select 
                    name="businessSize"
                    value={inputs.businessSize}
                    onChange={handleInputChange}
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] outline-none transition-all"
                  >
                    <option value="Pre-Revenue Startup">Pre-Revenue Startup (PMF Phase)</option>
                    <option value="Early Growth Startup">Early Growth Startup (Market Traction)</option>
                    <option value="SME">SME (Established Traditional Business)</option>
                    <option value="Mid-Market Corporate">Mid-Market Corporate (Optimization & Scale)</option>
                    <option value="Enterprise Company">Enterprise Organization (Transformation Focus)</option>
                  </select>
                </div>

                {/* Industry */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Industry Vertical</label>
                  <select 
                    name="industry"
                    value={inputs.industry}
                    onChange={handleInputChange}
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] outline-none transition-all"
                  >
                    {INDUSTRIES_LIST.map((ind, idx) => (
                      <option key={idx} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Revenue Stage */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Annual Revenue Band</label>
                  <select 
                    name="revenueStage"
                    value={inputs.revenueStage}
                    onChange={handleInputChange}
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] outline-none transition-all"
                  >
                    <option value="Under ₹50 Lakhs (< $60K)">Under ₹50 Lakhs (&lt; $60K)</option>
                    <option value="₹50 Lakhs - ₹5 Crores ($60K - $600K)">₹50 Lakhs - ₹5 Crores ($60K - $600K)</option>
                    <option value="₹5 Crores - ₹25 Crores ($600K - $3M)">₹5 Crores - ₹25 Crores ($600K - $3M)</option>
                    <option value="₹25 Crores - ₹100 Crores ($3M - $12M)">₹25 Crores - ₹100 Crores ($3M - $12M)</option>
                    <option value="Over ₹100 Crores+ (>$12M)">Over ₹100 Crores+ (&gt;$12M)</option>
                  </select>
                </div>
              </div>

              {/* Core Bottleneck selection */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">Primary Systemic Bottleneck</label>
                  <button 
                    type="button"
                    onClick={() => {
                      setCustomBottleneckActive(!customBottleneckActive);
                      setInputs(prev => ({ ...prev, bottleneck: "" }));
                    }}
                    className="text-xs font-semibold text-[#0F62FE] hover:text-[#3b82f6] transition-all"
                  >
                    {customBottleneckActive ? "Choose Template" : "Write Custom Description"}
                  </button>
                </div>

                {customBottleneckActive ? (
                  <textarea 
                    name="bottleneck"
                    value={inputs.bottleneck}
                    onChange={handleInputChange}
                    placeholder="Write down the exact bottleneck, struggle, or stagnation pattern holding you back..."
                    required
                    rows={2}
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] outline-none transition-all resize-none placeholder:text-gray-600"
                  />
                ) : (
                  <select 
                    name="bottleneck"
                    value={inputs.bottleneck}
                    onChange={handleInputChange}
                    className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] outline-none transition-all"
                  >
                    {COMMON_BOTTLENECK_TEMPLATES.map((bt, idx) => (
                      <option key={idx} value={bt.value}>{bt.label}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Business Goals */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold">12-Month Commercial Objectives</label>
                <textarea 
                  name="goals"
                  value={inputs.goals}
                  onChange={handleInputChange}
                  placeholder="What does success look like over the next 12 months? (e.g. Expand outbound sales operations, integrate AI agents, stabilize operational delivery structure)"
                  required
                  rows={3}
                  className="w-full bg-[#131622] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0F62FE] outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0F62FE] hover:bg-[#3b82f6] text-white font-bold uppercase tracking-wider text-xs rounded-lg shadow-lg shadow-[#0F62FE]/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Executive Growth &amp; AI Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STATE 2: LOADING SCREEN */}
          {loading && (
            <motion.div 
              key="loading-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 flex flex-col items-center text-center space-y-6"
            >
              <div className="relative">
                <div className="w-16 h-16 border-2 border-white/10 border-t-[#0F62FE] rounded-full animate-spin" />
                <Sparkles className="w-6 h-6 text-[#0F62FE] absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-3 max-w-md">
                <h4 className="font-display font-bold text-lg text-white">Simulating Executive-Grade Audit</h4>
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="popLayout">
                    <motion.p 
                      key={loadingMsgIdx}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-gray-400 font-mono italic"
                    >
                      {ROTATING_LOADING_MESSAGES[loadingMsgIdx]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* STATE 3: RESULTS PLATFORM */}
          {result && (
            <motion.div
              key="results-panel"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 text-white"
            >
              {/* Executive Top-Level Diagnosis Brief */}
              <div className="p-6 bg-[#131622] border border-white/10 rounded-xl space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0F62FE]/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0F62FE] animate-pulse" />
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Executive Appraisal</span>
                </div>
                <h4 className="font-display text-lg font-bold text-white">
                  Growth Diagnosis for {inputs.businessName || "Your Organization"}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed italic opacity-90 font-serif">
                  "{result.executiveSummary}"
                </p>
              </div>

              {/* Navigation Tabs (Strategic Sections) */}
              <div className="flex border-b border-white/10 overflow-x-auto gap-2 pb-1 scrollbar-none">
                {[
                  { id: "summary", label: "Executive Summary", icon: FileText },
                  { id: "root-cause", label: "Systemic Root Cause", icon: AlertCircle },
                  { id: "ai", label: "AI & Automation", icon: Sparkles },
                  { id: "gtm", label: "GTM Quick Wins", icon: TrendingUp },
                  { id: "roadmap", label: "30-60-90 Day Plan", icon: Compass }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive 
                          ? "border-[#0F62FE] text-[#0F62FE] font-bold bg-[#0F62FE]/5" 
                          : "border-transparent text-gray-400 hover:text-white hover:border-white/10"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Outputs Content */}
              <div className="min-h-[220px]">
                {/* 1. Summary & Expert Commentary */}
                {activeTab === "summary" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-[#131622] border border-white/5 rounded-lg">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Target Segment</span>
                        <p className="text-sm font-semibold text-white mt-1">{inputs.businessSize}</p>
                      </div>
                      <div className="p-4 bg-[#131622] border border-white/5 rounded-lg">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Vertical Market</span>
                        <p className="text-sm font-semibold text-white mt-1">{inputs.industry}</p>
                      </div>
                      <div className="p-4 bg-[#131622] border border-white/5 rounded-lg">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">Annual Band</span>
                        <p className="text-sm font-semibold text-white mt-1">{inputs.revenueStage}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-display font-semibold text-xs text-[#0F62FE] uppercase tracking-wider">Expert Strategic Takeaway</h5>
                      <div className="p-5 bg-[#131622] border-l-4 border-[#0F62FE] rounded-r-lg">
                        <p className="text-xs text-gray-300 leading-relaxed font-serif italic">
                          "{result.customQuoteFromAbhijeet}"
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono tracking-wider mt-3 uppercase font-semibold">
                          — Abhijeet Suman · Founder &amp; Director, SKARTO
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Systemic Root Cause */}
                {activeTab === "root-cause" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-5"
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-red-400 font-bold bg-red-950/40 border border-red-900/30 px-2.5 py-1 rounded">Core Root Cause</span>
                        <p className="text-xs text-gray-300 leading-relaxed mt-2 font-medium">{result.bottleneckAnalysis.coreRootCause}</p>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 font-bold bg-amber-950/40 border border-amber-900/30 px-2.5 py-1 rounded">Underlying Symptom</span>
                        <p className="text-xs text-gray-300 leading-relaxed mt-2">{result.bottleneckAnalysis.underlyingSymptom}</p>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400 font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded">Systemic Design Defect</span>
                        <p className="text-xs text-red-300 leading-relaxed mt-2 font-mono italic">{result.bottleneckAnalysis.architecturalMistake}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. AI & Automation Leverage */}
                {activeTab === "ai" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-4"
                  >
                    <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-gray-400 mb-2">High-Leverage Automation Opportunities</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.aiLeverageOpportunities.map((opportunity, idx) => (
                        <div key={idx} className="p-4 bg-[#131622] border border-white/5 rounded-lg flex flex-col justify-between hover:border-[#0F62FE]/30 transition-all">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h6 className="font-display font-bold text-xs text-white">{opportunity.title}</h6>
                              <span className={`text-[8px] font-mono px-2 py-0.5 uppercase tracking-widest font-extrabold rounded ${
                                opportunity.leverageLevel === "High" 
                                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/50" 
                                  : "bg-blue-950/60 text-blue-300 border border-blue-800/50"
                              }`}>
                                {opportunity.leverageLevel} Leverage
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{opportunity.description}</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-500">
                            <span>Implementation: <strong className="text-gray-300">{opportunity.timeToImplement}</strong></span>
                            <span>Impact: <strong className="text-[#0F62FE]">{opportunity.estimatedImpact}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 4. GTM Quick Wins */}
                {activeTab === "gtm" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="space-y-4"
                  >
                    <h5 className="font-display font-semibold text-xs uppercase tracking-wider text-gray-400 mb-2">High-Probability Revenue Multipliers</h5>
                    <div className="space-y-3">
                      {result.gtmQuickWins.map((win, idx) => (
                        <div key={idx} className="p-4 bg-[#131622] border border-white/5 rounded-lg flex items-start gap-4 hover:border-[#0F62FE]/20 transition-all">
                          <div className="w-7 h-7 rounded bg-[#0F62FE]/10 border border-[#0F62FE]/20 flex items-center justify-center text-[#0F62FE] font-bold text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <div>
                            <h6 className="font-display font-bold text-xs text-white">{win.tactic}</h6>
                            <p className="text-[11px] text-gray-300 mt-1 leading-relaxed"><strong className="text-gray-400">Methodology:</strong> {win.action}</p>
                            <p className="text-[11px] text-emerald-400 mt-0.5 font-medium"><strong className="text-gray-400">Outcomes:</strong> {win.expectedOutcome}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 5. 30-60-90 Day Roadmap */}
                {activeTab === "roadmap" && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="pl-8 relative border-l border-white/10 space-y-6 py-2"
                  >
                    {/* Month 1 */}
                    <div className="relative group">
                      <div className="absolute -left-[37px] top-0.5 w-4 h-4 rounded-full bg-[#0F62FE] border-4 border-[#070913] transition-transform group-hover:scale-110" />
                      <h6 className="font-mono text-[9px] uppercase tracking-widest text-[#0F62FE] font-bold">Days 1 - 30 (Foundation)</h6>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">{result.roadmap.day1_30}</p>
                    </div>

                    {/* Month 2 */}
                    <div className="relative group">
                      <div className="absolute -left-[37px] top-0.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#070913] transition-transform group-hover:scale-110" />
                      <h6 className="font-mono text-[9px] uppercase tracking-widest text-blue-500 font-bold">Days 31 - 60 (Integration)</h6>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">{result.roadmap.day31_60}</p>
                    </div>

                    {/* Month 3 */}
                    <div className="relative group">
                      <div className="absolute -left-[37px] top-0.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-[#070913] transition-transform group-hover:scale-110" />
                      <h6 className="font-mono text-[9px] uppercase tracking-widest text-cyan-500 font-bold">Days 61 - 90 (Scale)</h6>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">{result.roadmap.day61_90}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bottom Conversion Action Hook */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-gray-400 text-center sm:text-left leading-relaxed">
                  Ready to deploy these systems directly inside your organization? Submit an inquiry to lock in a face-to-face discovery call.
                </p>
                <a
                  href="#contact"
                  className="px-5 py-2.5 bg-[#0F62FE] hover:bg-[#3b82f6] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all text-center whitespace-nowrap shadow-md shadow-[#0F62FE]/10"
                >
                  Confirm Strategic Briefing
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
