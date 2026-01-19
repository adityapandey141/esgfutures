"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  TrendingUp,
  Target,
  Users,
  Award,
  BarChart3,
  FileText,
  CheckCircle2,
  Building2,
  Lightbulb,
  Shield,
  LineChart,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ESGPlatform = () => {
  const heroRef = useRef(null);
  const priorityContainerRef = useRef(null);
  const [activePriority, setActivePriority] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  useEffect(() => {
    // Hero animation sequence
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 },
      )
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4",
      )
      .fromTo(
        ".hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.6",
      )
      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4",
      )
      .fromTo(
        ".hero-viz",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2 },
        "-=0.8",
      );

    // Parallax hero visualization
    gsap.to(".hero-viz", {
      y: -80,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // FIXED STICKY PRIORITY SECTION
    const priorityItems = gsap.utils.toArray(".priority-scroll-item");

    priorityItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActivePriority(index),
        onEnterBack: () => setActivePriority(index),
      });

      gsap.fromTo(
        item,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Methodology timeline animation
    gsap.fromTo(
      ".timeline-line-fill",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".methodology-container",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      },
    );

    // Methodology steps
    gsap.utils.toArray(".method-step").forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Advantage cards
    gsap.utils.toArray(".advantage-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Section fade-ins
    gsap.utils.toArray(".fade-in-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    // Counter animations
    ScrollTrigger.create({
      trigger: ".stats-container",
      start: "top 75%",
      onEnter: () => {
        animateValue(0, 892, 2000, setCounter1);
        animateValue(0, 33, 2000, setCounter2);
        animateValue(0, 5, 2000, setCounter3);
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const animateValue = (start, end, duration, setter) => {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * easeOutQuart(progress));
      setter(value);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

  const priorityData = [
    {
      number: "01",
      title: "ESG Advisory",
      icon: Target,
      description:
        "We work with companies and early-stage initiatives to help them understand what ESG really means for their business. Our advisory support focuses on identifying key risks, improving transparency, and aligning sustainability efforts with practical business goals, without unnecessary complexity.",
    },
    {
      number: "02",
      title: "Sustainability Insights",
      icon: Lightbulb,
      description:
        "ESG future turns complex sustainability and ESG data into insights that are easy to understand and useful in real life. Whether you're a company or a retail investor, our research helps you look beyond headlines and green claims to make informed, responsible decisions.",
    },
    {
      number: "03",
      title: "Impact Analysis",
      icon: BarChart3,
      description:
        "Our impact analysis goes beyond scores and checklists. We combine simplified ESG indicators with real-world context to highlight environmental, social, and governance risks, track progress over time, and focus on outcomes that truly matter.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-white text-neutral-800 overflow-x-hidden"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Premium grain texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 z-50 transition-all">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-md flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900 tracking-tight">
                ESGFuture
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium">
              <a
                href="#priority"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Priority Areas
              </a>
              <a
                href="#methodology"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Methodology
              </a>
              <a
                href="#coverage"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Coverage
              </a>
              <a
                href="#team"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Team
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 transition-all"
              >
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 lg:pt-40 pb-20 lg:pb-32 min-h-screen flex items-center"
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 w-full">
          <div className="grid lg:grid-cols-[58%_42%] gap-16 lg:gap-20 items-center">
            <div className="space-y-8 lg:pr-12">
              <div className="hero-label flex items-center gap-3 opacity-0">
                <div className="w-12 h-[2px] bg-emerald-800"></div>
                <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                  Intelligence Platform
                </span>
              </div>

              <h1 className="hero-title text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] text-neutral-900 tracking-[-0.02em] opacity-0">
                Turning ESG Intelligence into Informed Decisions
              </h1>

              <p className="hero-desc text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl opacity-0">
                A sustainability advisory and research platform enabling
                transparent, responsible, and future-ready ESG decisions.
              </p>

              <div className="hero-cta flex flex-col sm:flex-row gap-4 opacity-0">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 text-white text-[15px] font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5"
                >
                  Start with clear, actionable insights
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Hero Visualization - Enhanced */}
            <div className="hero-viz relative h-[500px] lg:h-[650px] opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-50 rounded-2xl overflow-hidden border border-neutral-200/50 shadow-2xl">
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#1a4d3e 1.5px, transparent 1.5px), linear-gradient(90deg, #1a4d3e 1.5px, transparent 1.5px)",
                    backgroundSize: "48px 48px",
                  }}
                />

                {/* Floating data cards */}
                <div className="absolute top-12 left-12 bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-neutral-200/50 animate-float">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      ESG Score
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-800">
                    87.5
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    +12.3% improvement
                  </div>
                </div>

                <div className="absolute top-32 right-16 bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-neutral-200/50 animate-float-delayed">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                      <Globe className="w-4 h-4 text-slate-700" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Coverage
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-800">33+</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Countries analyzed
                  </div>
                </div>

                <div className="absolute bottom-20 left-20 bg-white/90 backdrop-blur-sm p-5 rounded-lg shadow-lg border border-neutral-200/50 animate-float">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-emerald-700" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      Impact
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-800">94%</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Data accuracy
                  </div>
                </div>

                {/* Animated dots */}
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-emerald-800/30 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 90 + 5}%`,
                      top: `${Math.random() * 90 + 5}%`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  <line
                    x1="20%"
                    y1="20%"
                    x2="80%"
                    y2="40%"
                    stroke="#1a4d3e"
                    strokeWidth="1"
                  />
                  <line
                    x1="80%"
                    y1="40%"
                    x2="30%"
                    y2="70%"
                    stroke="#1a4d3e"
                    strokeWidth="1"
                  />
                  <line
                    x1="30%"
                    y1="70%"
                    x2="70%"
                    y2="85%"
                    stroke="#1a4d3e"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Areas - FIXED STICKY SECTION */}
      <section id="priority" className="relative bg-neutral-50 py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-emerald-800"></div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                ESG Priority Areas
              </span>
            </div>
          </div>

          <div
            ref={priorityContainerRef}
            className="grid lg:grid-cols-[42%_58%] gap-16 lg:gap-24"
          >
            {/* STICKY LEFT COLUMN */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <div className="space-y-8 transition-all duration-700">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    {React.createElement(priorityData[activePriority].icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </div>
                  <div className="text-8xl font-bold text-neutral-200 leading-none">
                    {priorityData[activePriority].number}
                  </div>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
                  {priorityData[activePriority].title}
                </h2>

                <div className="w-20 h-1 bg-emerald-800 rounded-full"></div>

                <p className="text-lg text-neutral-600 leading-relaxed">
                  {priorityData[activePriority].description}
                </p>
              </div>
            </div>

            {/* SCROLLING RIGHT COLUMN */}
            <div className="space-y-0">
              {priorityData.map((item, index) => (
                <div
                  key={index}
                  className="priority-scroll-item min-h-[85vh] flex flex-col justify-center py-20"
                >
                  <div className="bg-white rounded-2xl p-10 lg:p-12 shadow-xl border border-neutral-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {React.createElement(item.icon, {
                          className: "w-7 h-7 text-emerald-800",
                        })}
                      </div>
                      <div className="text-7xl font-bold text-neutral-100 leading-none">
                        {item.number}
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-neutral-900 mb-4">
                      {item.title}
                    </h3>
                    <div className="w-16 h-1 bg-emerald-800 rounded-full mb-6"></div>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Break */}
      <section className="fade-in-section relative py-32 lg:py-48 overflow-hidden bg-neutral-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

        <div className="max-w-5xl mx-auto px-8 lg:px-20 text-center relative z-10">
          <Globe className="w-16 h-16 text-emerald-500 mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-8">
            Making sustainability simple, transparent, and actionable for all.
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-neutral-400 font-medium tracking-wide">
            Our Vision Statement
          </p>
        </div>
      </section>

      {/* Methodology Section */}
      <section
        id="methodology"
        className="methodology-container bg-white py-24 lg:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-[2px] bg-emerald-800"></div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Our Methodology
            </span>
          </div>

          <div className="grid lg:grid-cols-[45%_55%] gap-16 lg:gap-24 items-start">
            <div className="space-y-6 lg:sticky lg:top-32">
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
                What We Excel At
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                A structured approach to ESG evaluation and impact analysis that
                delivers measurable results.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                <span className="text-neutral-700 font-medium">
                  Research-driven insights
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                <span className="text-neutral-700 font-medium">
                  Actionable recommendations
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                <span className="text-neutral-700 font-medium">
                  Continuous monitoring
                </span>
              </div>
            </div>

            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-0 top-0 w-0.5 h-full bg-neutral-200 overflow-hidden">
                <div className="timeline-line-fill absolute top-0 left-0 w-full h-full bg-emerald-800 origin-top"></div>
              </div>

              <div className="space-y-16 pl-12">
                {[
                  {
                    icon: FileText,
                    title: "Impact Analysis & ESG Evaluation",
                    points: [
                      "Structured impact analysis combining simplified ESG scoring with qualitative assessment",
                      "Identification of key environmental, social, and governance risks",
                      "Focus on real-world outcomes rather than generic ESG ratings",
                    ],
                  },
                  {
                    icon: BarChart3,
                    title: "Performance Benchmarking",
                    points: [
                      "Benchmarking ESG performance across projects and organizations",
                      "Comparison against industry standards and best practices",
                      "Clear visibility into strengths, gaps, and improvement areas",
                    ],
                  },
                  {
                    icon: LineChart,
                    title: "Progress Tracking & Insights",
                    points: [
                      "Ongoing tracking of ESG performance over time",
                      "Measurement of meaningful and measurable improvements",
                      "Actionable insights to support informed decision-making",
                    ],
                  },
                ].map((step, index) => (
                  <div key={index} className="method-step relative">
                    <div className="absolute -left-[3.25rem] top-3 w-5 h-5 rounded-full bg-emerald-800 border-4 border-white shadow-lg"></div>

                    <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-200/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-5">
                        {React.createElement(step.icon, {
                          className: "w-7 h-7 text-emerald-800",
                        })}
                        <h3 className="text-2xl font-bold text-neutral-900">
                          {step.title}
                        </h3>
                      </div>

                      <ul className="space-y-3">
                        {step.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-[15px] text-neutral-600 leading-relaxed"
                          >
                            <div className="w-1.5 h-1.5 bg-emerald-700 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turning Impact Into Advantage */}
      <section className="bg-neutral-50 py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-[2px] bg-emerald-800"></div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Competitive Edge
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-20 tracking-tight max-w-3xl">
            Turning Impact into Advantage
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Accessible ESG Insights",
                description:
                  "Unlike traditional ESG consultancies or complex data platforms, we focus on clarity and education—making ESG insights easy to understand and apply for small businesses, startups, and individual investors.",
              },
              {
                icon: Target,
                title: "Practical, Not One-Size-Fits-All",
                description:
                  "Our approach avoids generic ESG ratings. Instead, we tailor analysis to the context of each project or investment, ensuring relevance and real-world applicability.",
              },
              {
                icon: Shield,
                title: "Balanced Evaluation Methodology",
                description:
                  "We use a simplified ESG scoring framework combined with narrative-based qualitative analysis, blending measurable indicators with deeper impact insights.",
              },
              {
                icon: Award,
                title: "Impact Over Compliance",
                description:
                  "We prioritize meaningful environmental and social outcomes rather than checkbox-driven reporting or superficial scores.",
              },
              {
                icon: Lightbulb,
                title: "Designed for Informed Decision-Making",
                description:
                  "Our insights support smarter business and investment decisions by highlighting risks, opportunities, and pathways for sustainable improvement.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="advantage-card group bg-white rounded-xl p-8 border border-neutral-200/50 hover:border-emerald-800/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-800 transition-colors duration-300">
                  {React.createElement(item.icon, {
                    className:
                      "w-7 h-7 text-emerald-800 group-hover:text-white transition-colors duration-300",
                  })}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  {item.title}
                </h3>
                <div className="w-12 h-0.5 bg-emerald-800 rounded-full mb-4"></div>
                <p className="text-[15px] text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage & Frameworks */}
      <section
        id="coverage"
        className="stats-container fade-in-section bg-white py-24 lg:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-[2px] bg-emerald-800"></div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Global Coverage
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 tracking-tight">
                Coverage & Frameworks
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-12">
                Comprehensive ESG intelligence aligned with global standards and
                frameworks.
              </p>

              <div className="grid grid-cols-3 gap-10 mb-12">
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-800 mb-3">
                    {counter1}+
                  </div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">
                    Companies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-800 mb-3">
                    {counter2}+
                  </div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">
                    Countries
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-800 mb-3">
                    {counter3}+
                  </div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">
                    Frameworks
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {["SASB", "GRI", "TCFD", "UN SDGs", "CDP", "ISSB"].map((fw) => (
                  <div
                    key={fw}
                    className="px-5 py-2.5 border-2 border-neutral-200 text-sm font-semibold text-neutral-700 rounded-lg hover:border-emerald-800 hover:text-emerald-800 transition-all cursor-default"
                  >
                    {fw}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl border border-neutral-200/50 shadow-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Globe className="w-64 h-64 text-emerald-800/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-emerald-800 mb-2">
                        Global
                      </div>
                      <div className="text-lg text-neutral-600 font-medium">
                        Intelligence Network
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated dots on map */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-emerald-600 rounded-full shadow-lg animate-pulse"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="fade-in-section bg-neutral-50 py-24 lg:py-40"
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-[2px] bg-emerald-800"></div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Leadership
            </span>
          </div>

          <div className="grid lg:grid-cols-[55%_45%] gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 tracking-tight leading-tight">
                The Founder Driving ESGFuture
              </h2>
              <div className="w-24 h-1.5 bg-emerald-800 rounded-full mb-10"></div>

              <p className="text-xl text-neutral-700 leading-relaxed mb-6 font-medium">
                Led by{" "}
                <span className="text-emerald-800 font-bold">
                  Ved Siddharth Kedia
                </span>
                , ESG Future is a student-driven initiative transforming the way
                businesses and investors approach sustainability.
              </p>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                We bridge the gap between ESG principles and practical
                strategies, providing insights, research, and solutions that
                help create lasting impact.
              </p>

              <div className="bg-white rounded-xl p-8 border border-neutral-200/50 shadow-lg">
                <p className="text-base text-neutral-700 leading-relaxed italic">
                  "Our mission is to make sustainable growth not just a goal,
                  but a reality."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-emerald-800"></div>
                  <span className="text-sm font-semibold text-emerald-800">
                    Mission Statement
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-2xl p-12 text-center shadow-2xl">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-xl">
                  <span className="text-6xl font-bold text-white">VK</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Ved Siddharth Kedia
                </h3>
                <div className="w-16 h-0.5 bg-white/50 mx-auto mb-4"></div>
                <p className="text-emerald-100 font-medium text-lg mb-6">
                  Founder & Lead Analyst
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Building2 className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-xs text-emerald-100">Student-Led</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Target className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-xs text-emerald-100">
                      Impact-Focused
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contact"
        className="fade-in-section relative py-24 lg:py-40 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-5xl mx-auto px-8 lg:px-20 text-center relative z-10">
          <Target className="w-16 h-16 mx-auto mb-8 opacity-90" />

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Take your first step today with ESGFuture
          </h2>

          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Choose your path: ESG Advisory, Sustainability Insights, or Impact
            Analysis
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#"
              className="group px-8 py-4 bg-white text-emerald-900 font-bold text-[15px] rounded-lg hover:bg-neutral-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2"
            >
              ESG Advisory
              <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-[15px] rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              Sustainability Insights
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-[15px] rounded-lg hover:bg-white/10 transition-all inline-flex items-center gap-2"
            >
              Impact Analysis
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-700 to-emerald-600 rounded-md flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ESGFuture</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Intelligence platform for sustainable decisions
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-5">
                Methodology
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-neutral-300">Version 2.1</div>
                <div>Updated Q1 2025</div>
                <div>Research-Driven</div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-5">
                Coverage
              </div>
              <div className="space-y-2 text-sm">
                <div className="text-neutral-300">Global Reach</div>
                <div>33+ Countries</div>
                <div>892+ Companies</div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-5">
                Frameworks
              </div>
              <div className="space-y-2 text-sm">
                <div>SASB, GRI, TCFD</div>
                <div>UN SDGs Aligned</div>
                <div>CDP, ISSB Ready</div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-neutral-500">
              © 2025 ESGFuture. Institutional ESG Intelligence Platform.
            </div>
            <div className="flex gap-8 text-xs">
              <a href="#" className="hover:text-emerald-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-emerald-500 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default ESGPlatform;
