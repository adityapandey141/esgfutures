"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import {
  ArrowUpRight,
  Activity,
  Shield,
  Globe,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Terminal,
  Layers,
  Users,
  Search,
  FileBarChart,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);

  // Section Refs for Animation
  const priorityRef = useRef(null);
  const processRef = useRef(null);
  const darkSectionRef = useRef(null);
  const rolesRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. GLOBAL: Scroll Progress Line at top
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          scrub: 0.3,
          start: "top top",
          end: "bottom bottom",
        },
      });

      // 2. HERO: Staggered Reveal
      const heroTl = gsap.timeline();
      heroTl
        .from(".hero-content > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        })
        .from(
          ".hero-visual",
          {
            opacity: 0,
            x: 40,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.8",
        );

      // 3. PRIORITY AREAS: Sticky Active State Logic
      // This switches the highlight on the left sticky menu as you scroll the right cards
      const sections = gsap.utils.toArray(".priority-card");
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActivePriority(i),
          onEnterBack: () => setActivePriority(i),
        });
      });

      // 4. PROCESS SECTION: Staggered Steps
      gsap.from(".process-step", {
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      // 5. DARK SECTION: Parallax Background
      gsap.to(".dark-bg-layer", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: darkSectionRef.current,
          scrub: true,
        },
      });

      // 6. EDITORIAL IMAGE: Parallax
      gsap.to(".editorial-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".editorial-section",
          scrub: true,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Helper to highlight left menu in sticky section
  const setActivePriority = (index) => {
    const items = document.querySelectorAll(".priority-nav-item");
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add("text-emerald-900", "border-emerald-900", "pl-6");
        item.classList.remove("text-slate-400", "border-transparent", "pl-0");
      } else {
        item.classList.remove("text-emerald-900", "border-emerald-900", "pl-6");
        item.classList.add("text-slate-400", "border-transparent", "pl-0");
      }
    });
  };

  return (
    <div
      ref={mainRef}
      className="bg-slate-50 text-slate-900 font-sans selection:bg-emerald-900 selection:text-white overflow-x-hidden relative"
    >
      {/* GLOBAL GRAIN OVERLAY */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-emerald-600 w-full transform scale-x-0 origin-left z-[110] scroll-progress"></div>

      {/* --- NAV --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-950 flex items-center justify-center">
              <span className="text-white font-serif font-bold italic text-xl">
                E
              </span>
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">
                ESGFuture
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">
                Intelligence Platform
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {["Capabilities", "Process", "Coverage", "Insights"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-950 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <button className="bg-emerald-950 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-emerald-900 transition-colors flex items-center gap-2">
            Portal Login <ArrowUpRight size={14} />
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 border-b border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 hero-content relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 text-emerald-900 text-[10px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Intelligence Stream
            </div>
            <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-8">
              Turning ESG Intelligence into <br />
              <span className="text-emerald-950 border-b-4 border-emerald-950/20">
                Informed Decisions.
              </span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-light mb-10">
              The institutional standard for sustainability advisory. We bridge
              the gap between complex raw data and practical, decision-ready
              strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-3 bg-emerald-950 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all">
                Access Advisory
              </button>
              <button className="flex items-center justify-center gap-3 border border-slate-200 bg-white text-slate-900 px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                Methodology
              </button>
            </div>
          </div>

          {/* Right Visual: Satellite Dashboard */}
          <div className="lg:col-span-5 hero-visual relative h-[500px] w-full bg-slate-900 overflow-hidden border border-slate-800 group">
            {/* Satellite Image Background */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay transition-transform duration-[20s] ease-linear scale-110 group-hover:scale-100"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(100%) contrast(1.2)",
              }}
            ></div>

            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Floating Data Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 p-6">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest">
                  Global Risk Index
                </span>
                <Activity size={12} className="text-emerald-400" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl text-white font-light">94.2</div>
                  <div className="text-[10px] text-slate-400 uppercase mt-1">
                    Percentile Rank
                  </div>
                </div>
                <div className="h-8 w-24 flex items-end gap-1">
                  {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="w-full bg-emerald-500/50"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- STATS BAND --- */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Data Points", value: "2.4M+" },
            { label: "Jurisdictions", value: "85+" },
            { label: "Framework", value: "SASB/GRI" },
            { label: "Update Cycle", value: "Daily" },
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-slate-900 pl-6">
              <div className="text-2xl font-medium text-slate-900">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 1. STICKY SECTION: PRIORITY AREAS (FIXED) --- */}
      <section
        ref={priorityRef}
        id="capabilities"
        className="relative bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row">
          {/* LEFT: Sticky Navigation */}
          <div className="lg:w-1/3 lg:h-screen sticky top-0 pt-32 pb-20 flex flex-col justify-between border-r border-slate-200 pr-12 z-20">
            <div>
              <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest mb-4 block">
                Core Capabilities
              </span>
              <h2 className="text-4xl font-medium text-slate-900 mb-8">
                Priority Areas
              </h2>
              <div className="flex flex-col gap-6 text-sm font-medium">
                {[
                  "ESG Advisory",
                  "Sustainability Insights",
                  "Impact Analysis",
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`priority-nav-item transition-all duration-300 border-l-2 ${i === 0 ? "border-emerald-900 text-emerald-900 pl-6" : "border-transparent text-slate-400"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
              Scroll to Explore ↓
            </div>
          </div>

          {/* RIGHT: Scrolling Content */}
          <div className="lg:w-2/3">
            {[
              {
                title: "ESG Advisory",
                icon: Shield,
                desc: "We work with companies to help them understand what ESG really means for their business. Our advisory support focuses on identifying key risks, improving transparency, and aligning sustainability efforts with practical business goals.",
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
              },
              {
                title: "Sustainability Insights",
                icon: Globe,
                desc: "ESGFuture turns complex sustainability data into insights that are easy to understand. We help institutions look beyond headlines and green claims to make informed, responsible decisions based on factual analysis.",
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
              },
              {
                title: "Impact Analysis",
                icon: BarChart3,
                desc: "Beyond scores and checklists. We combine simplified ESG indicators with real-world context to highlight environmental, social, and governance risks, tracking progress over time to focus on outcomes that truly matter.",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="priority-card min-h-screen flex flex-col justify-center p-12 lg:p-24 border-b border-slate-200 group relative overflow-hidden bg-white"
              >
                {/* Subtle Background Image on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
                  style={{
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                  }}
                ></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-slate-100 border border-slate-200 flex items-center justify-center mb-8 text-emerald-900">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-medium text-slate-900 mb-6">
                    {item.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
                    {item.desc}
                  </p>
                  <button className="text-xs font-bold uppercase tracking-widest text-emerald-900 border-b border-emerald-900 pb-1 hover:opacity-70 transition-opacity">
                    View Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 2. NEW: HOW IT WORKS (Horizontal/Vertical Process) --- */}
      <section
        ref={processRef}
        id="process"
        className="py-32 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest mb-4 block">
                Methodology
              </span>
              <h2 className="text-4xl font-medium text-slate-900">
                From Data to Decision
              </h2>
            </div>
            <p className="text-slate-500 max-w-md text-right text-sm">
              Our proprietary ingestion engine filters noise to extract signal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Layers,
                step: "01",
                title: "Data Ingestion",
                desc: "Aggregating raw data from 50+ institutional sources.",
              },
              {
                icon: Search,
                step: "02",
                title: "Contextual Filter",
                desc: "Removing generic noise to focus on sector-specific risks.",
              },
              {
                icon: FileBarChart,
                step: "03",
                title: "Scoring Model",
                desc: "Hybrid qualitative and quantitative impact assessment.",
              },
              {
                icon: CheckCircle2,
                step: "04",
                title: "Strategic Output",
                desc: "Actionable intelligence ready for board-level review.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="process-step border-t border-slate-200 pt-8 hover:border-emerald-900 transition-colors duration-500 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-1">
                    {item.step}
                  </span>
                  <item.icon
                    className="text-slate-300 group-hover:text-emerald-900 transition-colors"
                    size={20}
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 3. EDITORIAL BREAK (Parallax) --- */}
      <section className="editorial-section relative h-[80vh] overflow-hidden flex items-center justify-center">
        {/* Parallax Image */}
        <div className="editorial-image absolute inset-0 -top-[20%] h-[140%] w-full bg-slate-900 z-0">
          <div
            className="w-full h-full opacity-60 mix-blend-multiply"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "grayscale(100%) contrast(1.1)",
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-8">
            "Impact over Compliance."
          </h2>
          <p className="text-lg text-emerald-100/80 leading-relaxed">
            We prioritize meaningful environmental and social outcomes rather
            than checkbox-driven reporting or superficial scores.
          </p>
        </div>
      </section>

      {/* --- 4. NEW: WHO USES THIS (Target Audience) --- */}
      <section
        ref={rolesRef}
        className="py-32 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-medium text-slate-900">
              Institutional Stakeholders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                role: "Investment Analysts",
                desc: "Integrate granular ESG risk factors into valuation models.",
              },
              {
                role: "Sustainability Directors",
                desc: "Benchmark corporate performance against global peers.",
              },
              {
                role: "Policy Researchers",
                desc: "Track longitudinal trends across emerging markets.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-12 border border-slate-200 hover:border-emerald-900 transition-colors group"
              >
                <Users className="w-8 h-8 text-slate-300 group-hover:text-emerald-900 mb-6 transition-colors" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {item.role}
                </h3>
                <p className="text-sm text-slate-600 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. DARK SECTION: ADVANTAGE (Immersive) --- */}
      <section
        ref={darkSectionRef}
        className="py-32 bg-emerald-950 text-white relative overflow-hidden"
      >
        {/* Animated Noise Background */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay dark-bg-layer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="mb-20 border-b border-emerald-800 pb-8 flex flex-col md:flex-row justify-between items-end">
            <h2 className="text-3xl font-medium">
              Turning Impact into Advantage
            </h2>
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
                Differentiation Matrix
              </div>
              <div className="text-xs text-emerald-200/50">
                Internal Methodology v2.0
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="border-l border-emerald-800 pl-8 py-2">
              <h4 className="text-lg font-medium text-white mb-4">
                Accessible Insights
              </h4>
              <p className="text-sm text-emerald-100/60 leading-7">
                Unlike traditional ESG consultancies, we focus on clarity and
                education—making ESG insights easy to understand for decision
                makers.
              </p>
            </div>
            <div className="border-l border-emerald-800 pl-8 py-2">
              <h4 className="text-lg font-medium text-white mb-4">
                Contextual Analysis
              </h4>
              <p className="text-sm text-emerald-100/60 leading-7">
                Avoiding generic ratings. We tailor analysis to the specific
                sector and regional context of each investment.
              </p>
            </div>
            <div className="border-l border-emerald-800 pl-8 py-2">
              <h4 className="text-lg font-medium text-white mb-4">
                Balanced Scoring
              </h4>
              <p className="text-sm text-emerald-100/60 leading-7">
                A hybrid framework combining quantitative SASB metrics with
                qualitative narrative analysis for a holistic view.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOUNDER CREDIBILITY --- */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-slate-50 border border-slate-200 p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-24 h-24 bg-slate-200 flex items-center justify-center text-slate-400 font-serif text-3xl italic">
              VK
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Ved Siddharth Kedia
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                Founder & Lead Analyst
              </p>
              <p className="text-slate-600 text-sm leading-7 mb-6">
                "ESG Future is a student-driven initiative transforming the way
                businesses and investors approach sustainability. We bridge the
                gap between ESG principles and practical strategies."
              </p>
              <div className="flex gap-4">
                <button className="text-xs font-bold uppercase tracking-widest text-emerald-900 border border-emerald-900 px-4 py-2 hover:bg-emerald-900 hover:text-white transition-colors">
                  Read Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER: DATA FIRST --- */}
      <footer className="bg-white py-20 text-slate-900">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20 border-b border-slate-100 pb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-emerald-950"></div>
                <span className="font-bold text-lg">ESGFuture</span>
              </div>
              <h2 className="text-3xl font-medium tracking-tight mb-8">
                Ready for informed decisions?
              </h2>
              <div className="flex gap-4">
                <a
                  href="mailto:contact@esgfuture.com"
                  className="bg-emerald-950 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-emerald-900 transition-colors"
                >
                  Contact Advisory
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                Intelligence
              </h4>
              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li>
                  <a href="#" className="hover:text-emerald-900">
                    Advisory Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-900">
                    Research Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-900">
                    Impact Data
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li>
                  <a href="#" className="hover:text-emerald-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-900">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-900">
                    Disclosures
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest">
            <p>&copy; 2026 ESGFuture. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1">
                <Terminal size={10} /> System: Operational
              </span>
              <span>Mumbai • New York</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
