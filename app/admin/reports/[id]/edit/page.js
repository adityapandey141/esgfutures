"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { API_ENDPOINTS } from "../../../../config/api";
import axios from "axios";
import Link from "next/link";
import {
  FileText,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ArrowLeft,
  Save,
  Upload,
} from "lucide-react";

const EditReportPage = () => {
  const router = useRouter();
  const params = useParams();
  const { admin, logout, token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
    category: "research",
    author: "",
    meta_title: "",
    meta_description: "",
    status: "draft",
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINTS.REPORT_BY_ID(params.id),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data && response.data.report) {
          const report = response.data.report;
          setFormData({
            title: report.title || "",
            abstract: report.abstract || "",
            content: report.content || "",
            category: report.category || "research",
            author: report.author || "",
            meta_title: report.meta_title || "",
            meta_description: report.meta_description || "",
            status: report.status || "draft",
          });
          setCurrentImage(report.featured_image || "");
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [admin, params.id, token, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (featuredImage) {
        data.append("featured_image", featuredImage);
      }

      const response = await axios.put(
        `${API_ENDPOINTS.REPORTS}/${params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data) {
        setSuccess("Report updated successfully!");
        setTimeout(() => {
          router.push("/admin/reports");
        }, 1500);
      }
    } catch (err) {
      console.error("Error updating report:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.errors?.[0]?.msg ||
          "Failed to update report",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!admin) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-emerald-800 text-xl">Loading report...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-neutral-50 text-neutral-800"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-emerald-800">
                  ESGFuture
                </span>
                <span className="text-sm text-neutral-500">Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">
                Welcome, {admin.name}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-4rem)]">
          <nav className="p-6 space-y-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/reports"
              className="flex items-center gap-3 px-4 py-3 text-emerald-800 bg-emerald-50 rounded-lg font-medium"
            >
              <FileText className="w-5 h-5" />
              Reports
            </Link>
            <Link
              href="/admin/pages"
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <Settings className="w-5 h-5" />
              Pages
            </Link>
            <Link
              href="/admin/team"
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <Users className="w-5 h-5" />
              Team
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <Link
                href="/admin/reports"
                className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-700 mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Reports
              </Link>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Edit Report
              </h1>
              <p className="text-neutral-600">Update report information</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl border border-neutral-200/50 p-8"
            >
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                    placeholder="Enter report title"
                  />
                </div>

                {/* Category & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                    >
                      <option value="research">Research</option>
                      <option value="climate">Climate</option>
                      <option value="governance">Governance</option>
                      <option value="sustainability">Sustainability</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Author <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                      placeholder="Author name"
                    />
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Abstract
                  </label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                    placeholder="Brief summary of the report"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="10"
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                    placeholder="Full report content"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Featured Image
                  </label>
                  {currentImage && (
                    <div className="mb-2">
                      <p className="text-sm text-neutral-600 mb-1">
                        Current image:
                      </p>
                      <p className="text-sm text-emerald-800">{currentImage}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg cursor-pointer hover:bg-neutral-200 transition-colors">
                      <Upload className="w-4 h-4" />
                      Choose New File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {featuredImage && (
                      <span className="text-sm text-neutral-600">
                        {featuredImage.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* SEO Fields */}
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    SEO Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        maxLength="60"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                        placeholder="SEO title (max 60 characters)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        maxLength="160"
                        rows="2"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                        placeholder="SEO description (max 160 characters)"
                      />
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-neutral-200">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <Link
                    href="/admin/reports"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-all"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditReportPage;
