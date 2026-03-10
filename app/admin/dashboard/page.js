"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useSite } from "../../context/SiteContext";
import { API_ENDPOINTS } from "../../config/api";
import Link from "next/link";
import {
  FileText,
  Users,
  Settings,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  TrendingUp,
  Calendar,
} from "lucide-react";

const AdminDashboard = () => {
  const router = useRouter();
  const { admin, logout, token } = useAuth();
  const [stats, setStats] = useState({
    totalReports: 0,
    publishedReports: 0,
    draftReports: 0,
    totalViews: 0,
  });
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated
    if (!admin) {
      router.push("/admin/login");
      return;
    }

    // Fetch real statistics from backend
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.STATS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setRecentReports(data.recentReports || []);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [admin, token, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-emerald-800 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect
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
              className="flex items-center gap-3 px-4 py-3 text-emerald-800 bg-emerald-50 rounded-lg font-medium"
            >
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </Link>

            <Link
              href="/admin/reports"
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <FileText className="w-5 h-5" />
              Reports
            </Link>

            {/* Page Management - Hidden for now */}
            {/* <Link
              href="/admin/pages"
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <Settings className="w-5 h-5" />
              Pages
            </Link> */}

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
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Dashboard
              </h1>
              <p className="text-neutral-600">
                Manage your ESG content and monitor performance
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-emerald-800" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  {stats.totalReports}
                </div>
                <div className="text-sm text-neutral-600">Total Reports</div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-800" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  {stats.publishedReports}
                </div>
                <div className="text-sm text-neutral-600">Published</div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Edit className="w-6 h-6 text-yellow-800" />
                  </div>
                  <div className="w-5 h-5 text-yellow-600">→</div>
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  {stats.draftReports}
                </div>
                <div className="text-sm text-neutral-600">Drafts</div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-800" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  {stats.totalViews.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-600">Total Views</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin/reports/new"
                  className="bg-white rounded-xl border border-neutral-200/50 p-6 hover:border-emerald-800/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-800 transition-colors">
                      <Plus className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        New Report
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Create a new ESG report
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Edit Pages - Hidden for now */}
                {/* <Link
                  href="/admin/pages"
                  className="bg-white rounded-xl border border-neutral-200/50 p-6 hover:border-emerald-800/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-800 transition-colors">
                      <Settings className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        Edit Pages
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Update website content
                      </p>
                    </div>
                  </div>
                </Link> */}

                <Link
                  href="/admin/team"
                  className="bg-white rounded-xl border border-neutral-200/50 p-6 hover:border-emerald-800/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-800 transition-colors">
                      <Users className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        Manage Team
                      </h3>
                      <p className="text-sm text-neutral-600">
                        Update team members
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-neutral-900">
                  Recent Reports
                </h2>
                <Link
                  href="/admin/reports"
                  className="text-sm text-emerald-800 hover:text-emerald-700 transition-colors"
                >
                  View All →
                </Link>
              </div>

              {recentReports.length === 0 ? (
                <div className="bg-white rounded-xl border border-neutral-200/50 p-12 text-center">
                  <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No reports yet
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Create your first ESG report to get started
                  </p>
                  <Link
                    href="/admin/reports/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Create Report
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-neutral-200/50 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Author
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {recentReports.map((report) => (
                          <tr key={report.id} className="hover:bg-neutral-50">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-neutral-900 line-clamp-1">
                                {report.title}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {report.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-600">
                              {report.author}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(
                                  report.published_date,
                                ).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  report.status === "published"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/reports/${report.slug}`}
                                  target="_blank"
                                  className="text-neutral-400 hover:text-emerald-800 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <Link
                                  href={`/admin/reports/${report.id}/edit`}
                                  className="text-neutral-400 hover:text-emerald-800 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
