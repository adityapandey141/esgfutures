const sequelize = require("../config/database");
const { Report, Team } = require("../models");

async function seedDummyData() {
  try {
    console.log("Starting to seed dummy data...");

    // Sync database
    await sequelize.sync();

    // Check if data already exists
    const existingReports = await Report.count();
    const existingTeam = await Team.count();

    if (existingReports > 0 || existingTeam > 0) {
      console.log("Data already exists. Skipping seed...");
      console.log(
        `Found ${existingReports} reports and ${existingTeam} team members`,
      );
      process.exit(0);
    }

    // Add Double Materiality Report
    const doubleMaterialityReport = await Report.create({
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

The concept was formally articulated by the European Commission in its 2019 guidelines on non-financial reporting, and is now embedded in the European Sustainability Reporting Standards (ESRS) under the Corporate Sustainability Reporting Directive (CSRD). Under CSRD, large companies operating in the EU are required to conduct a double materiality assessment and disclose on both dimensions.

By contrast, frameworks like IFRS S1 and S2 – developed by the ISSB and adopted in a number of non-EU jurisdictions – focus primarily on financial materiality. They are designed to inform investors about sustainability risks that affect enterprise value. Impact materiality is outside their scope.

This divergence is not incidental. It reflects a genuine disagreement about what corporate reporting is for: informing capital markets, or informing the public about corporate impacts on society.

The Tension in Practice

Double materiality is more analytically demanding than it first appears. Several tensions arise in practice:

Aggregation problems

A company may have material financial risks in one area and material social impacts in an entirely different area. Combining these into a single disclosure framework risks obscuring more than it reveals. A mining company, for instance, may face limited financial risk from community displacement in a permissive jurisdiction while generating significant social impact – an impact that is material in the 'inside-out' sense but may not register on investor-focused risk assessments.

Measurement asymmetry

Financial materiality can, at least in principle, be linked to quantitative metrics – cash flows, stranded asset values, insurance costs, litigation exposure. Impact materiality is harder to measure consistently. Biodiversity loss, community harm, and human rights risks do not resolve to a single number, and attempts to force them into quantitative frameworks often produce misleading precision.

Scope creep risk

Requiring companies to assess and disclose everything potentially impactful creates reporting burdens without necessarily improving the quality of information. Critics of double materiality argue that it conflates the function of corporate disclosure – communicating financially relevant risk – with a broader accountability function that may be better served by regulation, litigation, or public policy rather than voluntary or mandatory reporting.

Why It Matters for ESG Analysis

The materiality framework underlying any ESG analysis significantly shapes what gets measured and what gets missed. An analyst using only ISSB-aligned, financially material data will reach different conclusions than one using CSRD-aligned double materiality assessments – even when analysing the same company.

This is not a flaw to be corrected so much as a structural feature of the landscape. Investors operating under fiduciary duties may legitimately focus on financial materiality. Stakeholders – employees, communities, civil society – have legitimate interests in impact materiality. These are different questions with different answers.

For ESGFuture, this distinction matters because it shapes how we interpret and contextualise external ESG scores. A low MSCI rating may reflect financial risk factors. A CSRD-aligned assessment may capture impact dimensions the MSCI methodology does not reach. Neither is complete on its own.

Open Questions

• Should companies be legally required to disclose impacts that are socially significant but not financially material?
• Is there a coherent methodology for comparing impact materiality across firms in different sectors and geographies?
• Does the divergence between EU (CSRD) and global (ISSB) frameworks create arbitrage opportunities for companies choosing where to report?
• Can double materiality assessment produce decision-useful information, or does it generate disclosure volume without analytical substance?

ESGFuture is a student-led research and publishing initiative. Knowledge articles are analytical and educational in nature.`,
      category: "governance",
      author: "ESGFuture Research Team",
      meta_title:
        "Double Materiality: Understanding Inside-Out and Outside-In ESG Impact",
      meta_description:
        "Exploring the concept of double materiality in ESG reporting and why it matters for sustainability analysis.",
      status: "published",
      published_date: new Date("2024-01-15"),
    });

    console.log("✓ Created report: Double Materiality");

    // Add Ved Kedia to team
    const vedKedia = await Team.create({
      name: "Ved Siddharth Kedia",
      role: "Founder, ESGFuture",
      bio: "ESGFuture is led by Ved Siddharth Kedia and represents a new generation of sustainability intelligence – research-driven, context-aware, and focused on practical application. As a student-led initiative, ESGFuture bridges academic research with real-world sustainability challenges. The objective is to rethink how ESG data is interpreted and applied – making sustainability analysis more accessible, credible, and relevant for companies, investors, and the wider ecosystem.",
      order_index: 0,
      is_active: true,
    });

    console.log("✓ Created team member: Ved Siddharth Kedia");

    // Add some page content
    const { Page } = require("../models");

    // Impact page content
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

    await Page.findOrCreate({
      where: { page_name: "impact", section_key: "description" },
      defaults: {
        title: "How We Measure Impact",
        content: `Performance Benchmarking – Comparing sustainability performance against industry practices and recognised ESG frameworks.

Risk Identification – Highlighting material environmental, social, and governance exposures that may affect long-term resilience.

Progress Tracking – Observing how organisations improve sustainability practices over time.

Implementation of Recommendations – The strongest measure of impact occurs when insights translate into:
• Strategic adjustments
• Operational improvements
• Stronger governance structures
• More informed investment decisions

Looking Forward

ESGFuture aims to continue expanding its research coverage, deepen its ESG analysis frameworks, and strengthen educational resources on sustainable finance. Our long-term objective is to build a trusted, independent platform for clear, structured ESG intelligence.`,
        type: "text",
        order_index: 2,
      },
    });

    console.log("✓ Created Impact page content");

    console.log("\n✅ Dummy data seeded successfully!");
    console.log("\nSummary:");
    console.log("- 1 Report: Double Materiality");
    console.log("- 1 Team Member: Ved Siddharth Kedia");
    console.log("- Impact page content updated");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding dummy data:", error);
    process.exit(1);
  }
}

seedDummyData();
