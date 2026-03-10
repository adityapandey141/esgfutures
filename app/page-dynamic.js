"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useSite } from "./context/SiteContext";
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

const DynamicESGPlatform = () => {
  const heroRef = useRef(null);
  const priorityContainerRef = useRef(null);
  const [activePriority, setActivePriority] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  const { pages, reports, loading } = useSite();

  // Default content that will be overridden by CMS data
  const defaultContent = {
    hero_title: "ESGFuture",
    hero_subtitle: "Turning ESG Intelligence into Strategic Advantage",
    hero_description:
      "Making sustainability simple, transparent, and actionable.",
    hero_detailed_desc:
      "ESGFuture is a sustainability advisory and research platform that transforms complex environmental, social, and governance (ESG) information into clear, structured insight for better decision-making.",
    problem_title: "ESG information is everywhere. Clarity is not.",
    what_we_do_title: "What We Do",
    cta_text:
      "Start with clarity. Act with confidence. Begin your ESG journey with ESGFuture.",
  };

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

    // Priority Areas scroll animations
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-emerald-800 text-xl">Loading...</div>
      </div>
    );
  }

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
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-900 tracking-tight">
                ESGFuture
              </span>
            </div>
            <nav className="flex items-center gap-6 md:gap-10 text-[13px] md:text-[15px] font-medium">
              <Link
                href="/reports"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Reports
              </Link>
              <Link
                href="/impact"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Impact
              </Link>
              <Link
                href="/team"
                className="text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                Team
              </Link>
              <Link
                href="/admin/login"
                className="px-6 py-2.5 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 transition-all"
              >
                Admin
              </Link>
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
                {pages.home?.hero_title || defaultContent.hero_title}
              </h1>

              <p className="hero-desc text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl opacity-0">
                {pages.home?.hero_detailed_desc ||
                  defaultContent.hero_detailed_desc}
              </p>

              <div className="hero-cta flex flex-col sm:flex-row gap-4 opacity-0">
                <Link
                  href="/reports"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 text-white text-[15px] font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5"
                >
                  {pages.home?.cta_text || "Explore Reports"}
                  <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Hero Visualization */}
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

                {/* Featured Reports Preview */}
                {reports.slice(0, 3).map((report, index) => (
                  <div
                    key={report.id}
                    className="absolute bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-neutral-200/50 animate-float"
                    style={{
                      top: `${20 + index * 25}%`,
                      left: index % 2 === 0 ? "10%" : "55%",
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        {report.category}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-neutral-900 mb-1 line-clamp-2">
                      {report.title}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {new Date(report.published_date).toLocaleDateString()}
                    </div>
                  </div>
                ))}

                {/* Animated dots */}
                {[...Array(15)].map((_, i) => (
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Priority Areas */}
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
            className="relative grid lg:grid-cols-[42%_58%] gap-16 lg:gap-24 items-start"
          >
            {/* STICKY LEFT COLUMN */}
            <div className="relative">
              <div className="sticky top-32 space-y-8 transition-all duration-700">
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
            <div className="relative space-y-0">
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

      {/* Featured Reports Section */}
      <section className="stats-container bg-white py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-[2px] bg-emerald-800"></div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Latest Reports
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 tracking-tight">
                ESG Research & Insights
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-12">
                Access our latest research reports covering climate, governance,
                sustainability, and financial topics.
              </p>

              <div className="grid grid-cols-3 gap-10 mb-12">
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-800 mb-3">
                    {counter1}+
                  </div>
                  <div className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">
                    Reports
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

              <Link
                href="/reports"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 text-white text-[15px] font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5"
              >
                View All Reports
                <TrendingUp className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6">
              {reports.slice(0, 3).map((report) => (
                <div
                  key={report.id}
                  className="bg-neutral-50 rounded-xl p-6 border border-neutral-200/50 hover:border-emerald-800/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-emerald-800" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-1 rounded">
                          {report.category}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(report.published_date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">
                        {report.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-3 line-clamp-2">
                        {report.abstract}
                      </p>
                      <Link
                        href={`/reports/${report.slug}`}
                        className="text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicESGPlatform;
