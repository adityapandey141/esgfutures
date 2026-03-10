"use client";

import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData,
      );

      if (response.data) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.errors?.[0]?.msg ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout currentPage="/contact">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 pt-32 pb-20 border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Have a question about ESG reporting, sustainability strategy, or
              our research? We&apos;re here to help. Reach out to our team and
              we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Contact Information
              </h2>
              <p className="text-neutral-600 mb-8">
                Connect with us through any of these channels. We&apos;re
                committed to responding within 24 hours.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@esgfuture.com"
                      className="text-emerald-800 hover:text-emerald-700 transition-colors"
                    >
                      contact@esgfuture.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="text-emerald-800 hover:text-emerald-700 transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      Location
                    </h3>
                    <p className="text-neutral-600">
                      Mumbai, India
                      <br />
                      Remote & Global
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                <h3 className="font-semibold text-neutral-900 mb-3">
                  Office Hours
                </h3>
                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-neutral-200/50 p-8 lg:p-12 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-neutral-600 mb-8">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">
                        Message sent successfully!
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Thank you for contacting us. We&apos;ll get back to you
                        soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">
                        Failed to send message
                      </p>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                    <p className="text-sm text-neutral-500 mt-2">
                      Minimum 10 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-center mb-12">
              Quick answers to common questions about our services
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  What services does ESGFuture offer?
                </h3>
                <p className="text-neutral-600">
                  We provide comprehensive ESG research, sustainability
                  reporting, climate risk analysis, and strategic advisory
                  services to help organizations navigate their ESG journey.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  How quickly can I expect a response?
                </h3>
                <p className="text-neutral-600">
                  We aim to respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call us directly.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Do you offer custom research services?
                </h3>
                <p className="text-neutral-600">
                  Yes, we provide tailored research and analysis based on your
                  specific ESG needs. Contact us to discuss your requirements.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200/50 p-6">
                <h3 className="font-semibold text-neutral-900 mb-2">
                  Can I schedule a consultation?
                </h3>
                <p className="text-neutral-600">
                  Absolutely! Mention your preferred time in the message above,
                  and we&apos;ll arrange a consultation call or meeting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
