require('dotenv').config();
const { Report, Team, Page, Admin } = require('../models');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Create admin if doesn't exist
    const adminCount = await Admin.count();
    if (adminCount === 0) {
      await Admin.create({
        email: 'admin@esgfutures.com',
        password: 'Admin@123',
        name: 'Admin User',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin already exists');
    }

    // Create sample team members
    const teamMembers = [
      {
        name: 'Sarah Johnson',
        role: 'Chief Sustainability Officer',
        bio: 'Leading ESG strategy with over 15 years of experience in sustainable business practices.',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        twitter: 'https://twitter.com/sarahesg',
        order_index: 1
      },
      {
        name: 'Michael Chen',
        role: 'Head of Research',
        bio: 'Expert in climate risk analysis and sustainable finance with a PhD in Environmental Economics.',
        linkedin: 'https://linkedin.com/in/michaelchen',
        order_index: 2
      },
      {
        name: 'Emily Rodriguez',
        role: 'ESG Analyst',
        bio: 'Specializing in corporate governance and social impact measurement.',
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        twitter: 'https://twitter.com/emilyesg',
        order_index: 3
      }
    ];

    for (const member of teamMembers) {
      const exists = await Team.findOne({ where: { name: member.name } });
      if (!exists) {
        await Team.create(member);
        console.log(`✅ Created team member: ${member.name}`);
      }
    }

    // Create sample reports
    const reports = [
      {
        title: 'Global ESG Trends 2024',
        slug: 'global-esg-trends-2024',
        excerpt: 'Comprehensive analysis of emerging ESG trends shaping the future of sustainable business.',
        content: `
# Global ESG Trends 2024

## Executive Summary

The ESG landscape continues to evolve rapidly, with new regulations, investor demands, and stakeholder expectations driving unprecedented change across industries.

## Key Findings

1. **Regulatory Expansion**: New ESG disclosure requirements across major markets
2. **Climate Action**: Accelerated corporate commitments to net-zero targets
3. **Social Impact**: Growing focus on diversity, equity, and inclusion metrics
4. **Governance**: Enhanced board oversight of ESG risks and opportunities

## Recommendations

Organizations must adapt their strategies to address these evolving trends and maintain competitive advantage in the sustainable economy.
        `,
        category: 'research',
        status: 'published',
        published_date: new Date('2024-01-15'),
        author: 'Sarah Johnson',
        reading_time: 12,
        tags: ['ESG', 'Trends', 'Sustainability', 'Climate'],
        is_featured: true
      },
      {
        title: 'Climate Risk Assessment Framework',
        slug: 'climate-risk-assessment-framework',
        excerpt: 'A practical guide to assessing and managing climate-related risks in your organization.',
        content: `
# Climate Risk Assessment Framework

## Introduction

Climate change poses significant risks to businesses across all sectors. This framework provides a structured approach to identifying, assessing, and managing these risks.

## Framework Components

1. **Risk Identification**: Systematic process for identifying climate-related risks
2. **Impact Assessment**: Quantifying potential financial and operational impacts
3. **Mitigation Strategies**: Developing effective response plans
4. **Monitoring**: Ongoing tracking and reporting of climate risks

## Implementation Guide

Step-by-step instructions for implementing this framework in your organization.
        `,
        category: 'guides',
        status: 'published',
        published_date: new Date('2024-02-01'),
        author: 'Michael Chen',
        reading_time: 15,
        tags: ['Climate', 'Risk Management', 'Framework'],
        is_featured: true
      },
      {
        title: 'Social Impact Measurement Best Practices',
        slug: 'social-impact-measurement-best-practices',
        excerpt: 'Learn how to effectively measure and report on your organization\'s social impact.',
        content: `
# Social Impact Measurement Best Practices

## Why Measure Social Impact?

Measuring social impact is essential for demonstrating value, improving programs, and attracting investment.

## Key Metrics

- Community engagement levels
- Employee diversity and inclusion
- Supplier diversity
- Social return on investment (SROI)

## Best Practices

1. Define clear objectives
2. Select appropriate metrics
3. Collect reliable data
4. Report transparently
5. Continuously improve
        `,
        category: 'research',
        status: 'published',
        published_date: new Date('2024-02-20'),
        author: 'Emily Rodriguez',
        reading_time: 10,
        tags: ['Social Impact', 'Measurement', 'Best Practices'],
        is_featured: false
      }
    ];

    for (const report of reports) {
      const exists = await Report.findOne({ where: { slug: report.slug } });
      if (!exists) {
        await Report.create(report);
        console.log(`✅ Created report: ${report.title}`);
      }
    }

    // Create sample pages
    const pages = [
      {
        name: 'about',
        title: 'About ESG Futures',
        content: `
# About ESG Futures

We are a leading research and advisory firm specializing in Environmental, Social, and Governance (ESG) matters.

## Our Mission

To help organizations navigate the complex ESG landscape and create sustainable value for all stakeholders.

## Our Approach

We combine rigorous research, practical experience, and innovative thinking to deliver actionable insights and solutions.
        `,
        meta_description: 'Learn about ESG Futures, a leading research and advisory firm specializing in ESG matters.',
        is_published: true
      },
      {
        name: 'services',
        title: 'Our Services',
        content: `
# Our Services

## ESG Strategy & Advisory
Develop comprehensive ESG strategies aligned with your business objectives.

## Risk Assessment
Identify and assess ESG-related risks and opportunities.

## Reporting & Disclosure
Navigate complex reporting requirements and communicate effectively with stakeholders.

## Training & Capacity Building
Build internal ESG expertise through customized training programs.
        `,
        meta_description: 'Explore our comprehensive ESG services including strategy, risk assessment, and reporting.',
        is_published: true
      }
    ];

    for (const page of pages) {
      const exists = await Page.findOne({ where: { name: page.name } });
      if (!exists) {
        await Page.create(page);
        console.log(`✅ Created page: ${page.title}`);
      }
    }

    console.log('\n🎉 Database seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Admin users: ${await Admin.count()}`);
    console.log(`   - Team members: ${await Team.count()}`);
    console.log(`   - Reports: ${await Report.count()}`);
    console.log(`   - Pages: ${await Page.count()}`);
    console.log('\n🔑 Login credentials:');
    console.log('   Email: admin@esgfutures.com');
    console.log('   Password: Admin@123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seed();
