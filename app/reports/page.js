"use client";
import React, { useState, useEffect } from "react";
import { useSite } from "../context/SiteContext";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import {
  FileText,
  Calendar,
  Filter,
  ChevronDown,
  Search,
  TrendingUp,
} from "lucide-react";

const ReportsPage = () => {
  const { reports } = useSite();
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: "", label: "All Categories" },
    { value: "climate", label: "Climate" },
    { value: "governance", label: "Governance" },
    { value: "sustainability", label: "Sustainability" },
    { value: "finance", label: "Finance" },
    { value: "research", label: "Research" },
  ];

  useEffect(() => {
    setFilteredReports(reports);
  }, [reports]);

  useEffect(() => {
    const filtered = reports.filter((report) => {
      const matchesCategory =
        !filters.category || report.category === filters.category;
      const matchesSearch =
        !filters.search ||
        report.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.abstract?.toLowerCase().includes(filters.search.toLowerCase()) ||
        report.author.toLowerCase().includes(filters.search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredReports(filtered);
  }, [filters, reports]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      search: "",
    });
  };

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

  return (
    <MainLayout currentPage="/reports">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-emerald-800"></div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Research & Insights
              </span>
              <div className="w-12 h-[2px] bg-emerald-800"></div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
              ESG Reports & Analysis
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-12">
              Access our comprehensive research covering climate, governance,
              sustainability, and financial topics. Stay informed with the
              latest ESG insights and analysis.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search reports by title, author, or content..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent text-neutral-800 placeholder-neutral-400"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200 rounded-lg hover:border-emerald-800 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      {showFilters && (
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-700">
                  Category:
                </span>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent text-neutral-800"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {(filters.category || filters.search) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}

              <div className="ml-auto text-sm text-neutral-500">
                {filteredReports.length}{" "}
                {filteredReports.length === 1 ? "report" : "reports"} found
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reports Grid */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          {filteredReports.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No reports found
              </h3>
              <p className="text-neutral-600 mb-6">
                Try adjusting your filters or search terms to find what you're
                looking for.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl border border-neutral-200/50 hover:border-emerald-800/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  {report.featured_image && (
                    <div className="aspect-video bg-neutral-100 overflow-hidden">
                      <img
                        src={`http://localhost:5000${report.featured_image}`}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${getCategoryColor(report.category)}`}
                      >
                        {report.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(report.published_date).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-emerald-800 transition-colors">
                      {report.title}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                      {report.abstract}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-neutral-500">
                        By {report.author}
                      </div>

                      <Link
                        href={`/reports/${report.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition-colors group/link"
                      >
                        Read More
                        <TrendingUp className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ReportsPage;
