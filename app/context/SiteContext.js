"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SiteContext = createContext();

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
};

export const SiteProvider = ({ children }) => {
  const [pages, setPages] = useState({});
  const [reports, setReports] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Fetch page content
  const fetchPageContent = async (pageName) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pages/${pageName}`);
      return response.data.content;
    } catch (error) {
      console.error(`Error fetching ${pageName} page:`, error);
      return {};
    }
  };

  // Fetch all reports
  const fetchReports = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await axios.get(`${API_BASE_URL}/reports?${params}`);
      return response.data.reports;
    } catch (error) {
      console.error("Error fetching reports:", error);
      return [];
    }
  };

  // Fetch single report by slug
  const fetchReportBySlug = async (slug) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${slug}`);
      return response.data.report;
    } catch (error) {
      console.error("Error fetching report:", error);
      return null;
    }
  };

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/team`);
      return response.data.teamMembers;
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Fetch home page content
        const homeContent = await fetchPageContent("home");
        setPages((prev) => ({ ...prev, home: homeContent }));

        // Fetch initial reports
        const initialReports = await fetchReports({ limit: 6 });
        setReports(initialReports);

        // Fetch team members
        const team = await fetchTeamMembers();
        setTeamMembers(team);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const value = {
    pages,
    reports,
    teamMembers,
    loading,
    error,
    fetchPageContent,
    fetchReports,
    fetchReportBySlug,
    fetchTeamMembers,
    refreshData: async () => {
      const homeContent = await fetchPageContent("home");
      const initialReports = await fetchReports({ limit: 6 });
      const team = await fetchTeamMembers();

      setPages((prev) => ({ ...prev, home: homeContent }));
      setReports(initialReports);
      setTeamMembers(team);
    },
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};
