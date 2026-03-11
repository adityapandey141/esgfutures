"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { API_ENDPOINTS, getImageUrl } from "../../config/api";
import axios from "axios";
import { useSite } from "../../context/SiteContext";
import Link from "next/link";
import {
  FileText,
  Users,
  Settings,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";

const AdminTeamPage = () => {
  const router = useRouter();
  const { admin, logout, token } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login");
    } else {
      fetchTeamMembers();
    }
  }, [admin, router]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.TEAM, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamMembers(response.data.teamMembers || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      showNotification("Failed to load team members", "error");
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
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      await axios.delete(API_ENDPOINTS.TEAM_BY_ID(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification("Team member deleted successfully", "success");
      fetchTeamMembers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting team member:", error);
      showNotification("Failed to delete team member", "error");
    }
  };

  if (!admin) {
    return null;
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
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <FileText className="w-5 h-5" />
              Reports
            </Link>
            {/* Page Management - Hidden */}
            {/* <Link
              href="/admin/pages"
              className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg font-medium transition-all"
            >
              <Settings className="w-5 h-5" />
              Pages
            </Link> */}
            <Link
              href="/admin/team"
              className="flex items-center gap-3 px-4 py-3 text-emerald-800 bg-emerald-50 rounded-lg font-medium"
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
                  Team Members
                </h1>
                <p className="text-neutral-600">Manage your team members</p>
              </div>
              <Link
                href="/admin/team/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Team Member
              </Link>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.length === 0 ? (
                <div className="col-span-full bg-white rounded-xl border border-neutral-200/50 p-12 text-center">
                  <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    No Team Members
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Add your first team member to get started.
                  </p>
                  <Link
                    href="/admin/team/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Team Member
                  </Link>
                </div>
              ) : (
                teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl border border-neutral-200/50 p-6 hover:shadow-lg transition-all"
                  >
                    {/* Profile Image */}
                    <div className="mb-4">
                      {member.profile_image ? (
                        <img
                          src={getImageUrl(member.profile_image)}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mx-auto bg-emerald-100 flex items-center justify-center">
                          <Users className="w-12 h-12 text-emerald-800" />
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-emerald-800 font-medium mb-2">
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="text-sm text-neutral-600 line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {/* Social Links */}
                    {(member.linkedin || member.twitter || member.email) && (
                      <div className="flex items-center justify-center gap-3 mb-4 pb-4 border-b border-neutral-200">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/team/${member.id}/edit`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-800 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTeamPage;
