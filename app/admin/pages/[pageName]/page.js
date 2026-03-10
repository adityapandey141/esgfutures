"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";
import axios from "axios";
import {
  FileText,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ArrowLeft,
  Save,
} from "lucide-react";

const PageEditorPage = () => {
  const router = useRouter();
  const params = useParams();
  const { admin, logout, token } = useAuth();
  const [sections, setSections] = useState({
    hero_title: { title: "", content: "", type: "text" },
    hero_subtitle: { title: "", content: "", type: "text" },
    description: { title: "", content: "", type: "text" },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    const fetchPageContent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pages/${params.pageName}`);
        
        if (response.data && response.data.content) {
          setSections(response.data.content);
        }
      } catch (err) {
        console.error("Error fetching page content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [admin, params.pageName, router]);

  const handleSectionChange = (sectionKey, field, value) => {
    setSections({
      ...sections,
      [sectionKey]: {
        ...sections[sectionKey],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const sectionsArray = Object.keys(sections).map((key) => ({
        section_key: key,
        title: sections[key].title || "",
        content: sections[key].content || "",
        type: sections[key].type || "text",
        order_index: sections[key].order_index || 0,
      }));

      await axios.post(
        "http://localhost:5000/api/pages/bulk",
        {
          page_name: params.pageName,
          sections: sectionsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Page content updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error updating page:", err);
      setError(err.response?.data?.error || "Failed to update page");
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
        <div className="text-emerald-800 text-xl">Loading page content...</div>
      </div>
    );
  }

  const pageTitle = params.pageName.charAt(0).toUpperCase() + params.pageName.slice(1);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <span className="text-xl font-bold text-emerald-800">ESGFuture</span>
                <span className="text-sm text-neutral-500">Admin</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-600">Welcome, {admin.name}</span>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors">
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
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all">
              <FileText className="w-5 h-5" />
              Reports
            </Link>
            <Link href="/admin/pages" className="flex items-center gap-3 px-4 py-3 text-emerald-800 bg-emerald-50 rounded-lg font-medium">
              <Settings className="w-5 h-5" />
              Pages
            </Link>
            <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all">
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
              <Link href="/admin/pages" className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-700 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Pages
              </Link>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Edit {pageTitle} Page</h1>
              <p className="text-neutral-600">Update content for the {pageTitle.toLowerCase()} page</p>
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
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200/50 p-8">
              <div className="space-y-8">
                {Object.keys(sections).map((sectionKey) => (
                  <div key={sectionKey} className="border-b border-neutral-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4 capitalize">
                      {sectionKey.replace(/_/g, " ")}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-900 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={sections[sectionKey].title || ""}
                          onChange={(e) => handleSectionChange(sectionKey, "title", e.target.value)}
                          className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                          placeholder="Section title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-neutral-900 mb-2">
                          Content
                        </label>
                        <textarea
                          value={sections[sectionKey].content || ""}
                          onChange={(e) => handleSectionChange(sectionKey, "content", e.target.value)}
                          rows="4"
                          className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                          placeholder="Section content"
                        />
                      </div>
                    </div>
                  </div>
                ))}

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
                    href="/admin/pages"
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

export default PageEditorPage;
