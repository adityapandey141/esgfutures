const express = require('express');
const { body, validationResult } = require('express-validator');
const { Page } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/pages/:pageName
// @desc    Get all sections for a specific page
// @access  Public
router.get('/:pageName', async (req, res) => {
  try {
    const { pageName } = req.params;
    
    const pages = await Page.findAll({
      where: { page_name: pageName },
      order: [['order_index', 'ASC']]
    });

    // Convert to object format for easier frontend consumption
    const pageContent = {};
    pages.forEach(page => {
      pageContent[page.section_key] = {
        title: page.title,
        content: page.content,
        type: page.type,
        order_index: page.order_index
      };
    });

    res.json({ pageName, content: pageContent });
  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/pages/:pageName/:sectionKey
// @desc    Get specific section
// @access  Public
router.get('/:pageName/:sectionKey', async (req, res) => {
  try {
    const { pageName, sectionKey } = req.params;
    
    const page = await Page.findOne({
      where: { 
        page_name: pageName,
        section_key: sectionKey
      }
    });

    if (!page) {
      return res.status(404).json({ error: 'Page section not found' });
    }

    res.json({ page });
  } catch (error) {
    console.error('Get page section error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/pages/:pageName/:sectionKey
// @desc    Update page section
// @access  Private
router.put('/:pageName/:sectionKey', [
  authMiddleware,
  body('title').optional().trim(),
  body('content').optional().trim(),
  body('type').optional().isIn(['text', 'html', 'json']),
  body('order_index').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pageName, sectionKey } = req.params;
    const updateData = req.body;

    // Find or create the page section
    const [page, created] = await Page.findOrCreate({
      where: { 
        page_name: pageName,
        section_key: sectionKey
      },
      defaults: {
        title: updateData.title || '',
        content: updateData.content || '',
        type: updateData.type || 'text',
        order_index: updateData.order_index || 0
      }
    });

    if (!created) {
      await page.update(updateData);
    }

    res.json({
      message: `Page section ${created ? 'created' : 'updated'} successfully`,
      page
    });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/pages/bulk
// @desc    Bulk update multiple page sections
// @access  Private
router.post('/bulk', [
  authMiddleware,
  body('page_name').isIn(['home', 'impact', 'team', 'about']),
  body('sections').isArray(),
  body('sections.*.section_key').notEmpty(),
  body('sections.*.title').optional().trim(),
  body('sections.*.content').optional().trim(),
  body('sections.*.type').optional().isIn(['text', 'html', 'json']),
  body('sections.*.order_index').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { page_name, sections } = req.body;

    // Use transaction for bulk updates
    const transaction = await Page.sequelize.transaction();

    try {
      for (const section of sections) {
        const { section_key, title, content, type, order_index } = section;

        await Page.upsert({
          page_name,
          section_key,
          title: title || '',
          content: content || '',
          type: type || 'text',
          order_index: order_index || 0
        }, { transaction });
      }

      await transaction.commit();

      res.json({
        message: 'Page sections updated successfully',
        updated: sections.length
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Bulk update pages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/pages/:pageName/:sectionKey
// @desc    Delete page section
// @access  Private
router.delete('/:pageName/:sectionKey', authMiddleware, async (req, res) => {
  try {
    const { pageName, sectionKey } = req.params;
    
    const page = await Page.findOne({
      where: { 
        page_name: pageName,
        section_key: sectionKey
      }
    });

    if (!page) {
      return res.status(404).json({ error: 'Page section not found' });
    }

    await page.destroy();

    res.json({ message: 'Page section deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
