const express = require("express");
const { body, validationResult } = require("express-validator");
const { Team } = require("../models");
const { authMiddleware } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// @route   GET /api/team
// @desc    Get all active team members
// @access  Public
router.get("/", async (req, res) => {
  try {
    const teamMembers = await Team.findAll({
      where: { is_active: true },
      order: [["order_index", "ASC"]],
    });

    res.json({ teamMembers });
  } catch (error) {
    console.error("Get team error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/team/:id
// @desc    Get single team member
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const teamMember = await Team.findByPk(req.params.id);

    if (!teamMember || !teamMember.is_active) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ teamMember });
  } catch (error) {
    console.error("Get team member error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/team
// @desc    Create new team member
// @access  Private
router.post(
  "/",
  [
    authMiddleware,
    upload.single("profile_image"),
    body("name").trim().isLength({ min: 2, max: 100 }),
    body("role").trim().isLength({ min: 2, max: 100 }),
    body("bio").optional().trim(),
    body("linkedin").optional({ checkFalsy: true }).isURL(),
    body("twitter").optional({ checkFalsy: true }).isURL(),
    body("email").optional({ checkFalsy: true }).isEmail(),
    body("order_index").optional().isInt({ min: 0 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        name,
        role,
        bio,
        linkedin,
        twitter,
        email,
        order_index = 0,
      } = req.body;

      const teamData = {
        name,
        role,
        bio,
        linkedin,
        twitter,
        email,
        order_index,
      };

      // Add profile image path if uploaded
      if (req.file) {
        teamData.profile_image = `/uploads/${req.file.filename}`;
      }

      const teamMember = await Team.create(teamData);

      res.status(201).json({
        message: "Team member created successfully",
        teamMember,
      });
    } catch (error) {
      console.error("Create team member error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
);

// @route   PUT /api/team/:id
// @desc    Update team member
// @access  Private
router.put(
  "/:id",
  [
    authMiddleware,
    upload.single("profile_image"),
    body("name").optional().trim().isLength({ min: 2, max: 100 }),
    body("role").optional().trim().isLength({ min: 2, max: 100 }),
    body("bio").optional().trim(),
    body("linkedin").optional({ checkFalsy: true }).isURL(),
    body("twitter").optional({ checkFalsy: true }).isURL(),
    body("email").optional({ checkFalsy: true }).isEmail(),
    body("order_index").optional().isInt({ min: 0 }),
    body("is_active").optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const teamMember = await Team.findByPk(req.params.id);
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }

      const updateData = req.body;

      // Update profile image if new one uploaded
      if (req.file) {
        updateData.profile_image = `/uploads/${req.file.filename}`;
      }

      await teamMember.update(updateData);

      res.json({
        message: "Team member updated successfully",
        teamMember,
      });
    } catch (error) {
      console.error("Update team member error:", error);
      res.status(500).json({ error: "Server error" });
    }
  },
);

// @route   DELETE /api/team/:id
// @desc    Delete team member (soft delete by setting is_active to false)
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const teamMember = await Team.findByPk(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    // Soft delete
    await teamMember.update({ is_active: false });

    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Delete team member error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/team/admin/all
// @desc    Get all team members (including inactive) for admin
// @access  Private
router.get("/admin/all", authMiddleware, async (req, res) => {
  try {
    const teamMembers = await Team.findAll({
      order: [["order_index", "ASC"]],
    });

    res.json({ teamMembers });
  } catch (error) {
    console.error("Get all team members error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
