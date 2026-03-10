const express = require('express');
const { body, validationResult } = require('express-validator');
const { Contact } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').trim().isEmail().withMessage('Please provide a valid email address'),
  body('phone').optional().trim().isLength({ max: 20 }),
  body('company').optional().trim().isLength({ max: 100 }),
  body('subject').trim().isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
  body('message').trim().isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, subject, message } = req.body;

    // Get IP address
    const ip_address = req.ip || req.connection.remoteAddress;

    const contactData = {
      name,
      email,
      phone,
      company,
      subject,
      message,
      ip_address,
      status: 'new'
    };

    const contact = await Contact.create(contactData);

    // TODO: Send email notification to admin
    // You can integrate nodemailer here to send email notifications

    res.status(201).json({
      message: 'Thank you for contacting us! We will get back to you soon.',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form. Please try again.' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (status && ['new', 'read', 'replied', 'archived'].includes(status)) {
      whereClause.status = status;
    }

    const contacts = await Contact.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      contacts: contacts.rows,
      pagination: {
        total: contacts.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(contacts.count / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission (admin only)
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    // Mark as read if status is new
    if (contact.status === 'new') {
      await contact.update({ status: 'read' });
    }

    res.json({ contact });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact status (admin only)
// @access  Private
router.put('/:id', [
  authMiddleware,
  body('status').isIn(['new', 'read', 'replied', 'archived'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    await contact.update({ status: req.body.status });

    res.json({
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact submission (admin only)
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    await contact.destroy();

    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
