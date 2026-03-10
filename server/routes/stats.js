const express = require("express");
const { Report, Team, Page } = require("../models");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Get report statistics
    const totalReports = await Report.count();
    const publishedReports = await Report.count({
      where: { status: "published" },
    });
    const draftReports = await Report.count({ where: { status: "draft" } });

    // Get team member count
    const totalTeamMembers = await Team.count();

    // Get page count
    const totalPages = await Page.count();

    // Get recent reports
    const recentReports = await Report.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      attributes: [
        "id",
        "title",
        "slug",
        "status",
        "category",
        "published_date",
        "createdAt",
      ],
    });

    res.json({
      stats: {
        totalReports,
        publishedReports,
        draftReports,
        totalViews: 0, // Views tracking not implemented yet
        totalTeamMembers,
        totalPages,
      },
      recentReports,
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
