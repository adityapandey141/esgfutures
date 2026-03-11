"use client";
import React, { useState, useEffect } from "react";
import { useSite } from "../context/SiteContext";
import { getImageUrl } from "../config/api";
import Link from "next/link";
import MainLayout from "../layouts/MainLayout";
import {
  Users,
  Linkedin,
  Twitter,
  Mail,
  ArrowLeft,
  Target,
  Lightbulb,
} from "lucide-react";

const TeamPage = () => {
  const { teamMembers } = useSite();

  // Default founder info (can be overridden by CMS)
  const defaultFounder = {
    name: "Ved Siddharth Kedia",
    role: "Founder, ESGFuture",
    bio: "Ved is passionate about making ESG intelligence accessible and actionable for businesses and investors. With a background in sustainability research and advisory, he founded ESGFuture to bridge the gap between complex ESG data and practical decision-making.",
    profile_image: null,
    linkedin: "https://linkedin.com/in/ved-siddharth-kedia",
    twitter: null,
  };

  const founder =
    teamMembers.find((member) =>
      member.role?.toLowerCase().includes("founder"),
    ) || defaultFounder;
  const otherMembers = teamMembers.filter(
    (member) => !member.role?.toLowerCase().includes("founder"),
  );

  return (
    <MainLayout currentPage="/team">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-emerald-800"></div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Our Team
              </span>
              <div className="w-12 h-[2px] bg-emerald-800"></div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
              Meet the People Behind ESGFuture
            </h1>

            <p className="text-xl text-neutral-600 leading-relaxed mb-12 max-w-3xl mx-auto">
              Our team brings together expertise in sustainability research,
              data analysis, and strategic advisory to deliver actionable ESG
              insights that drive meaningful change.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-emerald-800"></div>
              <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                Leadership
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-6">
                {founder.name}
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-lg font-semibold text-emerald-800">
                  {founder.role}
                </span>
                <div className="w-8 h-0.5 bg-emerald-800 rounded-full"></div>
              </div>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                {founder.bio}
              </p>

              <div className="flex flex-wrap gap-4">
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-emerald-100 hover:text-emerald-800 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}

                {founder.twitter && (
                  <a
                    href={founder.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-emerald-100 hover:text-emerald-800 transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                )}

                <a
                  href="mailto:contact@esgfutures.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-slate-100 rounded-2xl border border-neutral-200/50 shadow-xl overflow-hidden">
                {founder.profile_image ? (
                  <img
                    src={getImageUrl(founder.profile_image)}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-16 h-16 text-emerald-800 mx-auto mb-4" />
                      <div className="text-lg font-semibold text-neutral-900">
                        Founder
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      {otherMembers.length > 0 && (
        <section className="py-24 lg:py-40 bg-neutral-50">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-emerald-800"></div>
                <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
                  Team Members
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
                Our Expert Team
              </h2>

              <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
                Meet the dedicated professionals who bring diverse expertise and
                passion to our mission of making ESG intelligence accessible and
                actionable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl border border-neutral-200/50 hover:border-emerald-800/50 hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="aspect-square bg-neutral-100 overflow-hidden">
                    {member.profile_image ? (
                      <img
                        src={getImageUrl(member.profile_image)}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-neutral-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {member.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-semibold text-emerald-800">
                        {member.role}
                      </span>
                      <div className="flex-1 h-0.5 bg-emerald-800 rounded-full"></div>
                    </div>

                    {member.bio && (
                      <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                        {member.bio}
                      </p>
                    )}

                    <div className="flex gap-2">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-emerald-100 hover:text-emerald-800 transition-all"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}

                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-emerald-100 hover:text-emerald-800 transition-all"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Us Section */}
      <section className="py-24 lg:py-40">
        <div className="max-w-4xl mx-auto px-8 lg:px-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-emerald-800"></div>
            <span className="text-[13px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Join Our Mission
            </span>
            <div className="w-12 h-[2px] bg-emerald-800"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight mb-8">
            Want to Make an Impact?
          </h2>

          <p className="text-xl text-neutral-600 leading-relaxed mb-12">
            We're always looking for passionate individuals who share our vision
            of making ESG intelligence accessible and actionable for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:careers@esgfutures.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-800 text-white text-[15px] font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/30 hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              Explore Opportunities
            </a>

            <Link
              href="/impact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-emerald-800 text-emerald-800 text-[15px] font-semibold rounded-lg hover:bg-emerald-50 transition-all"
            >
              <Target className="w-4 h-4" />
              Learn About Our Impact
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TeamPage;
