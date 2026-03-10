"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { API_ENDPOINTS } from "../../config/api";
import { useSite } from "../../context/SiteContext";
import Link from "next/link";
import axios from "axios";
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
  Search,
  Filter,
} from "lucide-react";

const AdminReportsPage = () => {
  const router = useRouter();
  const { admin, logout, token } = useAuth();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
    } else {
      fetchReports();
    }
  }, [admin, router]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.REPORTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data.reports || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      showNotification("Failed to load reports", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
      await axios.delete(`${API_ENDPOINTS.REPORTS}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification("Report deleted successfully", "success");
      fetchReports(); // Refresh the list
    } catch (error) {
      console.error("Error deleting report:", error);
      showNotification("Failed to delete report", "error");
    }
  };

  if (!admin) {
    return null;
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-8 z-50 animate-slide-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

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
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                  Reports
                </h1>
                <p className="text-neutral-600">Manage your ESG reports</p>
              </div>
              <Link
                href="/admin/reports/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                New Report
              </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-neutral-200/50 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-xl border border-neutral-200/50 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-12 text-center text-neutral-500"
                      >
                        No reports found. Create your first report to get
                        started.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr
                        key={report.id}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-neutral-900">
                            {report.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {report.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              report.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {report.status || "draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/reports/${report.slug}`}
                              className="p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/reports/${report.id}/edit`}
                              className="p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(report.id)}
                              className="p-2 text-neutral-600 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReportsPage;
