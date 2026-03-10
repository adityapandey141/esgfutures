"use client";
import React, { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import {
  Target,
  BarChart3,
  LineChart,
  TrendingUp,
  Shield,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

const ImpactPage = () => {
  const { pages } = useSite();

  const pageContent = useMemo(() => {
    return Array.isArray(pages)
      ? pages.find((p) => p.slug === "impact") || {}
      : {};
  }, [pages]);

  // Default impact metrics (can be overridden by CMS)
  const defaultMetrics = [
    {
      icon: BarChart3,
      title: "Performance Benchmarking",
      description:
        "Comprehensive analysis of ESG performance against industry standards and best practices, providing clear visibility into strengths, gaps, and improvement areas.",
    },
    {
      icon: Shield,
      title: "Risk Identification",
      description:
        "Systematic identification of environmental, social, and governance risks that could impact business operations and long-term sustainability.",
    },
    {
      icon: LineChart,
      title: "Progress Tracking",
      description:
        "Ongoing monitoring and measurement of ESG initiatives, tracking meaningful improvements over time with data-driven insights.",
    },
    {
      icon: Target,
      title: "Implementation of Recommendations",
      description:
        "Actionable guidance and support for implementing ESG recommendations that align with business goals and sustainable practices.",
    },
  ];

  const metrics = pageContent.metrics
    ? JSON.parse(pageContent.metrics.content || "[]")
    : defaultMetrics;

  return (
    <MainLayout currentPage="/impact">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-emerald-800"></div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Our Impact
              </span>
              <div className="w-12 h-[2px] bg-emerald-800"></div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
              {pageContent.hero_title?.content ||
                "Turning Insight into Meaningful Progress"}
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              {pageContent.hero_description?.content ||
                "Our impact analysis goes beyond scores and checklists. We combine simplified ESG indicators with real-world context to highlight environmental, social, and governance risks, track progress over time, and focus on outcomes that truly matter."}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-emerald-800"></div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Impact Metrics
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
              {pageContent.metrics_title?.content || "How We Drive Impact"}
            </h2>

            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
              {pageContent.metrics_description?.content ||
                "Our structured approach to impact measurement and analysis delivers actionable insights that drive real change and sustainable outcomes."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-xl p-8 border border-neutral-200/50 hover:border-emerald-800/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {React.createElement(metric.icon || BarChart3, {
                      className: "w-7 h-7 text-emerald-800",
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      {metric.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-emerald-800 rounded-full mb-4"></div>
                  </div>
                </div>

                <p className="text-neutral-600 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 lg:py-40 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-emerald-800"></div>
                <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                  Our Process
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
                Comprehensive Impact Analysis
              </h2>

              <p className="text-lg text-neutral-600 leading-relaxed mb-12">
                {pageContent.process_description?.content ||
                  "Our methodology combines quantitative analysis with qualitative insights to provide a holistic view of ESG impact and performance."}
              </p>

              <div className="space-y-6">
                {[
                  "Research-driven insights and data analysis",
                  "Actionable recommendations tailored to your context",
                  "Continuous monitoring and progress tracking",
                  "Stakeholder engagement and collaboration",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                    <span className="text-neutral-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-slate-100 rounded-2xl border border-neutral-200/50 shadow-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-neutral-900 mb-2">
                      Measurable Impact
                    </div>
                    <div className="text-neutral-600">Data-driven results</div>
                  </div>
                </div>

                {/* Animated elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-emerald-800/20 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-3 h-3 bg-emerald-800/30 rounded-full animate-pulse delay-75"></div>
                <div className="absolute bottom-20 left-16 w-5 h-5 bg-emerald-800/25 rounded-full animate-pulse delay-150"></div>
                <div className="absolute bottom-12 right-8 w-3 h-3 bg-emerald-800/35 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-40">
        <div className="max-w-4xl mx-auto px-8 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
            {pageContent.cta_title?.content || "Ready to Measure Your Impact?"}
          </h2>

          <p className="text-xl text-neutral-600 leading-relaxed mb-12">
            {pageContent.cta_description?.content ||
              "Let us help you understand and improve your ESG performance with our comprehensive impact analysis and reporting solutions."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reports"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 text-white text-[15px] font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5"
            >
              Explore Our Research
              <TrendingUp className="w-4 h-4" />
            </Link>

            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-emerald-800 text-emerald-800 text-[15px] font-semibold rounded-lg hover:bg-emerald-50 transition-all"
            >
              Meet Our Team
              <Users className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ImpactPage;
