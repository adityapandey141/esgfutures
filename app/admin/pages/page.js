"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useSite } from "../../context/SiteContext";
import Link from "next/link";
import axios from "axios";
import {
  FileText,
  Users,
  Settings,
  BarChart3,
  Edit,
  LogOut,
  Save,
} from "lucide-react";

const AdminPagesPage = () => {
  const router = useRouter();
  const { admin, logout } = useAuth();
  const { pages } = useSite();
  const [loading, setLoading] = useState(false);
  const [pagesList, setPagesList] = useState([
    { name: 'home', title: 'Home Page' },
    { name: 'impact', title: 'Impact Page' },
  ]);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
    }
  }, [admin, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!admin) {
    return null;
  }

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
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Page Management</h1>
              <p className="text-neutral-600">Edit content for your website pages</p>
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pagesList.map((page) => (
                <div key={page.name} className="bg-white rounded-xl border border-neutral-200/50 p-6 hover:border-emerald-800/50 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{page.title}</h3>
                      <p className="text-sm text-neutral-600">/{page.name}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-800" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/pages/${page.name}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-800 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Content
                    </Link>
                    <Link
                      href={`/${page.name === 'home' ? '' : page.name}`}
                      target="_blank"
                      className="px-4 py-2 border border-neutral-200 text-neutral-600 font-medium rounded-lg hover:border-emerald-800 hover:text-emerald-800 transition-all"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Page Content Management</h3>
              <p className="text-blue-800 text-sm">
                Edit the content for each page including hero sections, descriptions, and other dynamic content. 
                Changes will be reflected on the live website immediately after saving.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPagesPage;
