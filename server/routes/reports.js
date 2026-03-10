const express = require("express");
const { body, validationResult, query } = require("express-validator");
const { Report } = require("../models");
const { authMiddleware } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// @route   GET /api/reports
// @desc    Get all reports with optional filtering
// @access  Public
router.get(
  "/",
  [
    query("category")
      .optional()
      .isIn(["climate", "governance", "sustainability", "finance", "research"]),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("page").optional().isInt({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        category,
        limit = 10,
        page = 1,
        status = "published",
      } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = { status };
      if (category) {
        whereClause.category = category;
      }

      const reports = await Report.findAndCountAll({
        where: whereClause,
        order: [["published_date", "DESC"]],
        limit: parseInt(limit),
        offset: parseInt(offset),
        attributes: { exclude: ["content"] }, // Exclude content for list view
      });

      res.json({
        reports: reports.rows,
        pagination: {
          total: reports.count,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(reports.count / limit),
        },
      });
    } catch (error) {
      console.error("Get reports error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
);

// @route   GET /api/reports/id/:id
// @desc    Get single report by ID (for admin)
// @access  Private
router.get("/id/:id", authMiddleware, async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ report });
  } catch (error) {
    console.error("Get report by ID error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/reports/:slug
// @desc    Get single report by slug
// @access  Public
router.get("/:slug", async (req, res) => {
  try {
    const report = await Report.findOne({
      where: {
        slug: req.params.slug,
        status: "published",
      },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json({ report });
  } catch (error) {
    console.error("Get report error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/reports
// @desc    Create new report
// @access  Private
router.post(
  "/",
  [
    authMiddleware,
    upload.single("featured_image"),
    body("title").trim().isLength({ min: 3, max: 255 }),
    body("abstract").optional().trim(),
    body("content").optional().trim(),
    body("category").isIn([
      "climate",
      "governance",
      "sustainability",
      "finance",
      "research",
    ]),
    body("author").trim().isLength({ min: 2, max: 100 }),
    body("meta_title").optional().trim().isLength({ max: 60 }),
    body("meta_description").optional().trim().isLength({ max: 160 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        abstract,
        content,
        category,
        author,
        meta_title,
        meta_description,
        status = "draft",
      } = req.body;

      // Generate unique slug
      let slug = generateSlug(title);
      const existingReport = await Report.findOne({ where: { slug } });
      if (existingReport) {
        slug = `${slug}-${Date.now()}`;
      }

      const reportData = {
        title,
        slug,
        abstract,
        content,
        category,
        author,
        meta_title,
        meta_description,
        status,
      };

      // Add featured image path if uploaded
      if (req.file) {
        reportData.featured_image = `/uploads/${req.file.filename}`;
      }

      const report = await Report.create(reportData);

      res.status(201).json({
        message: "Report created successfully",
        report,
      });
    } catch (error) {
      console.error("Create report error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
);

// @route   PUT /api/reports/:id
// @desc    Update report
// @access  Private
router.put(
  "/:id",
  [
    authMiddleware,
    upload.single("featured_image"),
    body("title").optional().trim().isLength({ min: 3, max: 255 }),
    body("abstract").optional().trim(),
    body("content").optional().trim(),
    body("category")
      .optional()
      .isIn(["climate", "governance", "sustainability", "finance", "research"]),
    body("author").optional().trim().isLength({ min: 2, max: 100 }),
    body("status").optional().isIn(["draft", "published"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const report = await Report.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }

      const updateData = req.body;

      // Update slug if title changed
      if (req.body.title && req.body.title !== report.title) {
        let slug = generateSlug(req.body.title);
        const existingReport = await Report.findOne({
          where: { slug, id: { [require("sequelize").Op.ne]: req.params.id } },
        });
        if (existingReport) {
          slug = `${slug}-${Date.now()}`;
        }
        updateData.slug = slug;
      }

      // Update featured image if new one uploaded
      if (req.file) {
        updateData.featured_image = `/uploads/${req.file.filename}`;
      }

      await report.update(updateData);

      res.json({
        message: "Report updated successfully",
        report,
      });
    } catch (error) {
      console.error("Update report error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
);

// @route   DELETE /api/reports/:id
// @desc    Delete report
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    await report.destroy();

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Delete report error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
