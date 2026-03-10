const sequelize = require("../config/database");
const { Report, Team, Page } = require("../models");

async function seedCompleteDummyData() {
  try {
    console.log("Starting to seed complete dummy data...");

    // Sync database
    await sequelize.sync();

    // Check if data already exists
    const existingReports = await Report.count();
    const existingTeam = await Team.count();

    if (existingReports > 0 || existingTeam > 0) {
      console.log("Data already exists. Clearing and reseeding...");
      await Report.destroy({ where: {}, truncate: true });
      await Team.destroy({ where: {}, truncate: true });
    }

    // ===== ADD REPORTS =====
    console.log("\n📄 Adding Reports...");

    const reports = [
      {
        title: "Double Materiality",
        slug: "double-materiality",
        abstract:
          "Why what a company does to the world is not the same as what the world does to the company – and why that distinction matters.",
        content: `The Core Concept

Materiality, in financial reporting, refers to whether a piece of information is significant enough to affect how an investor values a company. Traditionally, something is material if a reasonable investor would consider it important to their decision. That framing is investor-facing: it asks what affects financial performance.

Double materiality extends this in a specific direction. It holds that companies should also account for their impact on the world – not just how external factors affect the business, but how the business affects society and the environment. The two directions are:

• Financial materiality (also called 'outside-in'): How do sustainability-related risks and opportunities affect the company's financial position, cash flows, and long-term value?
• Impact materiality (also called 'inside-out'): How does the company's activity affect people, ecosystems, and communities – regardless of whether that impact feeds back into its financials?

In Short

Single materiality asks: what does the world do to the company? Double materiality also asks: what does the company do to the world? Both questions are considered material disclosures under certain regulatory frameworks.

Where It Comes From

The concept was formally articulated by the European Commission in its 2019 guidelines on non-financial reporting, and is now embedded in the European Sustainability Reporting Standards (ESRS) under the Corporate Sustainability Reporting Directive (CSRD).

Why It Matters for ESG Analysis

The materiality framework underlying any ESG analysis significantly shapes what gets measured and what gets missed. An analyst using only ISSB-aligned, financially material data will reach different conclusions than one using CSRD-aligned double materiality assessments.`,
        category: "governance",
        author: "ESGFuture Research Team",
        meta_title: "Double Materiality in ESG Reporting",
        meta_description:
          "Understanding the concept of double materiality and its impact on ESG analysis.",
        status: "published",
        published_date: new Date("2024-01-15"),
      },
      {
        title: "Climate Risk Disclosure Standards",
        slug: "climate-risk-disclosure-standards",
        abstract:
          "An overview of emerging climate risk disclosure frameworks and their implications for corporate reporting.",
        content: `Introduction

Climate risk disclosure has become a critical component of corporate transparency. As investors and stakeholders demand greater clarity on climate-related risks, new frameworks are emerging to standardize reporting.

Key Frameworks

TCFD (Task Force on Climate-related Financial Disclosures)

The TCFD framework provides recommendations for climate-related financial disclosures across four pillars:
• Governance
• Strategy
• Risk Management
• Metrics and Targets

ISSB Climate Standards

The International Sustainability Standards Board has developed comprehensive climate disclosure standards that build on TCFD recommendations while adding more detailed requirements.

Implementation Challenges

Organizations face several challenges when implementing climate risk disclosures:
• Data collection and quality
• Scenario analysis complexity
• Scope 3 emissions measurement
• Forward-looking statements

Best Practices

Leading companies are adopting best practices including:
• Integrated climate governance
• Science-based targets
• Third-party verification
• Transparent methodology disclosure`,
        category: "climate",
        author: "ESGFuture Research Team",
        meta_title: "Climate Risk Disclosure Standards Guide",
        meta_description:
          "Comprehensive guide to climate risk disclosure frameworks including TCFD and ISSB standards.",
        status: "published",
        published_date: new Date("2024-02-01"),
      },
      {
        title: "ESG Data Quality and Verification",
        slug: "esg-data-quality-verification",
        abstract:
          "Examining the challenges of ESG data quality and the role of third-party verification in ensuring credibility.",
        content: `The Data Quality Challenge

ESG reporting faces significant data quality challenges that can undermine the credibility of sustainability claims.

Common Issues

Data Inconsistency
• Different methodologies across providers
• Lack of standardized metrics
• Varying reporting boundaries

Verification Gap
• Limited third-party assurance
• Self-reported data dominance
• Inconsistent audit standards

Solutions and Best Practices

Enhanced Verification
Organizations should consider:
• Third-party assurance engagements
• Internal audit procedures
• Technology-enabled data collection

Standardization Efforts
• Adoption of common frameworks
• Industry-specific metrics
• Regulatory alignment

The Path Forward

Improving ESG data quality requires:
• Stronger governance
• Better technology infrastructure
• Enhanced verification processes
• Regulatory support`,
        category: "governance",
        author: "ESGFuture Research Team",
        meta_title: "ESG Data Quality and Verification",
        meta_description:
          "Understanding ESG data quality challenges and verification best practices.",
        status: "published",
        published_date: new Date("2024-02-15"),
      },
      {
        title: "Sustainable Finance Trends 2024",
        slug: "sustainable-finance-trends-2024",
        abstract:
          "Key trends shaping sustainable finance in 2024, from green bonds to impact investing.",
        content: `Market Overview

The sustainable finance market continues to grow, with new instruments and approaches emerging to channel capital toward sustainable outcomes.

Green Bonds

Green bond issuance has reached record levels:
• Corporate green bonds
• Sovereign green bonds
• Municipal green bonds

Impact Investing

Impact investing is evolving beyond traditional approaches:
• Measurable social and environmental impact
• Financial returns alongside impact
• Diverse asset classes

ESG Integration

Mainstream investors are integrating ESG factors:
• Risk management
• Long-term value creation
• Stakeholder alignment

Regulatory Developments

New regulations are shaping the market:
• EU Taxonomy
• Sustainable Finance Disclosure Regulation
• SEC climate disclosure rules

Future Outlook

The sustainable finance market is expected to continue growing as:
• Investor demand increases
• Regulatory frameworks mature
• Data quality improves`,
        category: "finance",
        author: "ESGFuture Research Team",
        meta_title: "Sustainable Finance Trends 2024",
        meta_description:
          "Key trends and developments in sustainable finance for 2024.",
        status: "published",
        published_date: new Date("2024-03-01"),
      },
      {
        title: "Biodiversity and Nature-Related Risks",
        slug: "biodiversity-nature-related-risks",
        abstract:
          "Understanding the emerging focus on biodiversity and nature-related financial risks in corporate reporting.",
        content: `The Nature Crisis

Biodiversity loss represents a significant and growing risk to businesses and the global economy.

TNFD Framework

The Taskforce on Nature-related Financial Disclosures (TNFD) provides a framework for organizations to report on nature-related risks:
• Dependencies on nature
• Impacts on ecosystems
• Nature-related risks and opportunities

Key Concepts

Natural Capital
• Ecosystem services
• Biodiversity value
• Resource dependencies

Nature-Positive Approaches
• Restoration initiatives
• Conservation efforts
• Sustainable sourcing

Business Implications

Companies face several nature-related considerations:
• Supply chain risks
• Regulatory compliance
• Stakeholder expectations
• Long-term resilience

Getting Started

Organizations should:
• Assess nature dependencies
• Identify material risks
• Develop mitigation strategies
• Report transparently`,
        category: "sustainability",
        author: "ESGFuture Research Team",
        meta_title: "Biodiversity and Nature-Related Financial Risks",
        meta_description:
          "Guide to understanding and reporting on nature-related risks using TNFD framework.",
        status: "published",
        published_date: new Date("2024-03-10"),
      },
    ];

    for (const reportData of reports) {
      await Report.create(reportData);
      console.log(`✓ Created report: ${reportData.title}`);
    }

    // ===== ADD TEAM MEMBERS =====
    console.log("\n👥 Adding Team Members...");

    const teamMembers = [
      {
        name: "Ved Siddharth Kedia",
        role: "Founder, ESGFuture",
        bio: "ESGFuture is led by Ved Siddharth Kedia and represents a new generation of sustainability intelligence – research-driven, context-aware, and focused on practical application. As a student-led initiative, ESGFuture bridges academic research with real-world sustainability challenges. The objective is to rethink how ESG data is interpreted and applied – making sustainability analysis more accessible, credible, and relevant for companies, investors, and the wider ecosystem.",
        order_index: 0,
        is_active: true,
      },
      {
        name: "Sarah Chen",
        role: "Head of Research",
        bio: "Sarah leads ESGFuture's research initiatives, focusing on climate risk analysis and sustainable finance frameworks. With a background in environmental economics and data science, she develops methodologies for assessing corporate sustainability performance.",
        order_index: 1,
        is_active: true,
      },
      {
        name: "Michael Rodriguez",
        role: "ESG Data Analyst",
        bio: "Michael specializes in ESG data analysis and verification, working to ensure the accuracy and reliability of sustainability metrics. His expertise includes statistical analysis, data visualization, and ESG rating methodologies.",
        order_index: 2,
        is_active: true,
      },
      {
        name: "Emily Thompson",
        role: "Sustainability Consultant",
        bio: "Emily works with organizations to improve their ESG reporting and sustainability practices. She brings experience in corporate sustainability strategy, stakeholder engagement, and regulatory compliance.",
        order_index: 3,
        is_active: true,
      },
    ];

    for (const memberData of teamMembers) {
      await Team.create(memberData);
      console.log(`✓ Created team member: ${memberData.name}`);
    }

    // ===== ADD PAGE CONTENT =====
    console.log("\n📄 Adding Page Content...");

    await Page.findOrCreate({
      where: { page_name: "impact", section_key: "hero_title" },
      defaults: {
        title: "Impact",
        content: "Turning Insight into Meaningful Progress",
        type: "text",
        order_index: 0,
      },
    });

    await Page.findOrCreate({
      where: { page_name: "impact", section_key: "hero_subtitle" },
      defaults: {
        title: "Impact Subtitle",
        content:
          "At ESGFuture, impact is reflected not in the volume of analysis produced, but in how effectively insights support better decisions and improved sustainability practices.",
        type: "text",
        order_index: 1,
      },
    });

    console.log("✓ Created Impact page content");

    console.log("\n✅ Complete dummy data seeded successfully!");
    console.log("\nSummary:");
    console.log(`- ${reports.length} Reports added`);
    console.log(`- ${teamMembers.length} Team Members added`);
    console.log("- Impact page content updated");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding dummy data:", error);
    process.exit(1);
  }
}

seedCompleteDummyData();
