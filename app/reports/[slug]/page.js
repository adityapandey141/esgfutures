"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSite } from "../../context/SiteContext";
import { getImageUrl } from "../../config/api";
import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import { formatReportContent } from "../../utils/formatContent";
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  FileText,
  TrendingUp,
} from "lucide-react";

const ReportPage = () => {
  const params = useParams();
  const router = useRouter();
  const { fetchReportBySlug, fetchReports } = useSite();
  const [report, setReport] = useState(null);
  const [relatedReports, setRelatedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const reportData = await fetchReportBySlug(params.slug);
        if (reportData) {
          setReport(reportData);

          // Load related reports (same category, excluding current report)
          const allReports = await fetchReports({ limit: 10 });
          const related = allReports
            .filter(
              (r) =>
                r.category === reportData.category && r.id !== reportData.id,
            )
            .slice(0, 3);
          setRelatedReports(related);
        }
      } catch (error) {
        console.error("Error loading report:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadReport();
    }
  }, [params.slug, fetchReportBySlug, fetchReports]);

  const getCategoryColor = (category) => {
    const colors = {
      climate: "bg-blue-100 text-blue-800",
      governance: "bg-purple-100 text-purple-800",
      sustainability: "bg-green-100 text-green-800",
      finance: "bg-yellow-100 text-yellow-800",
      research: "bg-gray-100 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: report.abstract,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-emerald-800 text-xl">Loading report...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Report Not Found
          </h2>
          <p className="text-neutral-600 mb-6">
            The report you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MainLayout currentPage={`/reports/${params.slug}`}>
      {/* Back Navigation */}
      <section className="pt-32 pb-8">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>
        </div>
      </section>

      {/* Report Header */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-8 lg:px-20">
          <div className="mb-6">
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${getCategoryColor(report.category)}`}
            >
              {report.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-6">
            {report.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              By {report.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(report.published_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <button
              onClick={shareReport}
              className="flex items-center gap-2 hover:text-emerald-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {report.featured_image && (
            <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden mb-8">
              <img
                src={getImageUrl(report.featured_image)}
                alt={report.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {report.abstract && (
            <div className="bg-emerald-50 border-l-4 border-emerald-800 p-6 rounded-r-lg mb-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Abstract
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                {report.abstract}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Report Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-8 lg:px-20">
          <article className="prose prose-lg max-w-none">
            <div
              className="text-neutral-800 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{
                __html: formatReportContent(report.content),
              }}
            />
          </article>
        </div>
      </section>

      {/* Related Reports */}
      {relatedReports.length > 0 && (
        <section className="pb-20 bg-neutral-50">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
                Related Reports
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedReports.map((relatedReport) => (
                  <div
                    key={relatedReport.id}
                    className="bg-white rounded-xl border border-neutral-200/50 hover:border-emerald-800/50 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    {relatedReport.featured_image && (
                      <div className="aspect-video bg-neutral-100 overflow-hidden">
                        <img
                          src={getImageUrl(relatedReport.featured_image)}
                          alt={relatedReport.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${getCategoryColor(relatedReport.category)}`}
                        >
                          {relatedReport.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(
                            relatedReport.published_date,
                          ).toLocaleDateString()}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                        {relatedReport.title}
                      </h3>

                      <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                        {relatedReport.abstract}
                      </p>

                      <Link
                        href={`/reports/${relatedReport.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors group/link"
                      >
                        Read More
                        <TrendingUp className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ReportPage;
