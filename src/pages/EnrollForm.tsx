import React, { useState } from "react";
import { Button } from "../components/Button";
import { isValidPhoneNumber } from "libphonenumber-js";
import toast, { Toaster } from "react-hot-toast";

export const EnrollForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    timezone: "",
    howHeard: "",
    howHeardOther: "",
    childName: "",
    childAge: "",
    schoolingStructure: "",
    ageBand: "",
    promptInterest: "",
    formationAreas: [] as string[],
    childTemperament: "",
    childAt25: "",
    parentInvolvement: "",
    structuredEnvironment: "",
    faithValues: "",
    investmentReady: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string | string[]): string => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "childName":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "Name must be at least 2 characters";
        }
        if (typeof value === "string" && !/^[a-zA-Z\s'-]+$/.test(value)) {
          return "Name can only contain letters, spaces, hyphens, and apostrophes";
        }
        break;

      case "email":
        if (!value || typeof value !== "string") {
          return "Email is required";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value || typeof value !== "string") {
          return "Phone number is required";
        }
        try {
          if (!isValidPhoneNumber(value)) {
            return "Please enter a valid phone number";
          }
        } catch {
          return "Please enter a valid phone number with country code (e.g., +234)";
        }
        break;

      case "country":
      case "timezone":
        if (!value || (typeof value === "string" && value.trim().length < 2)) {
          return "This field is required";
        }
        break;

      case "childAge": {
        if (typeof value !== "string") return "";
        const age = parseInt(value);
        if (!value || isNaN(age)) {
          return "Child's age is required";
        }
        if (age < 6 || age > 16) {
          return "Age must be between 6 and 16";
        }
        break;
      }

      case "promptInterest":
      case "childTemperament":
      case "childAt25":
        if (!value || (typeof value === "string" && value.trim().length < 20)) {
          return "Please provide at least 20 characters";
        }
        break;

      case "formationAreas":
        if (Array.isArray(value) && value.length === 0) {
          return "Please select at least one area";
        }
        break;

      case "howHeard":
      case "schoolingStructure":
      case "ageBand":
      case "parentInvolvement":
      case "structuredEnvironment":
      case "faithValues":
      case "investmentReady":
        if (!value) {
          return "Please select an option";
        }
        break;

      default:
        break;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (value: string) => {
    const current = formData.formationAreas;
    let updated: string[];

    if (current.includes(value)) {
      updated = current.filter((item) => item !== value);
    } else if (current.length < 3) {
      updated = [...current, value];
    } else {
      return; // Don't allow more than 3
    }

    setFormData({
      ...formData,
      formationAreas: updated,
    });

    // Validate formation areas
    if (touched.formationAreas) {
      const error = validateField("formationAreas", updated);
      setErrors((prev) => ({ ...prev, formationAreas: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "timezone",
      "howHeard",
      "childName",
      "childAge",
      "schoolingStructure",
      "ageBand",
      "promptInterest",
      "formationAreas",
      "childTemperament",
      "childAt25",
      "parentInvolvement",
      "structuredEnvironment",
      "faithValues",
      "investmentReady",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Mark all fields as touched
    const allTouched = requiredFields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    );
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    // Submit to API
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your enrollment form...");

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      // 🚨 Guard against HTML / non-JSON responses (Vercel rewrite errors)
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned an invalid response");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      toast.success(
        "Thank you for your submission. We will review your intention form and be in touch soon.",
        { id: toastId, duration: 4000 }
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        timezone: "",
        howHeard: "",
        howHeardOther: "",
        childName: "",
        childAge: "",
        schoolingStructure: "",
        ageBand: "",
        promptInterest: "",
        formationAreas: [],
        childTemperament: "",
        childAt25: "",
        parentInvolvement: "",
        structuredEnvironment: "",
        faithValues: "",
        investmentReady: "",
        additionalInfo: "",
      });

      setErrors({});
      setTouched({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Form submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.",
        { id: toastId, duration: 5000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 6000,
            style: {
              background: "#10b981",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
          loading: {
            style: {
              background: "#3b82f6",
              color: "#fff",
            },
          },
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-3 sm:mb-4 px-4">
            Intention to Enroll
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto px-4">
            This intention form is not an application—it is an expression of
            interest and alignment. Only families who appear to be a strong fit
            will be invited to a private virtual conversation with the Founder.
          </p>
        </div>

        <div className="bg-[#EFE6D8] p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="font-bold text-[#1f3d2b] mb-2 text-base sm:text-lg">
            Before You Proceed
          </h2>
          <p className="text-sm sm:text-sm text-slate-700">
            The Mastery House operates as a Mentorship & Mastery Academy, not a
            conventional online school. By continuing, you acknowledge that
            enrollment is by alignment and invitation, the program emphasizes
            discipline and intentional formation, and faith-informed values
            quietly underpin our culture.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
          noValidate
        >
          {/* Section A: Parent Information */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-amber-600 pb-2">
              Section A: Parent Information
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.firstName && touched.firstName
                        ? "border-red-500 focus:ring-red-600"
                        : "border-slate-300 focus:ring-[#b59a5b]"
                    }`}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.lastName && touched.lastName
                        ? "border-red-500 focus:ring-red-600"
                        : "border-slate-300 focus:ring-[#b59a5b]"
                    }`}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-600"
                      : "border-slate-300 focus:ring-[#b59a5b]"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number (WhatsApp preferred) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+234 123 456 7890"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.phone && touched.phone
                      ? "border-red-500 focus:ring-red-600"
                      : "border-slate-300 focus:ring-[#b59a5b]"
                  }`}
                />
                {errors.phone && touched.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.country && touched.country
                        ? "border-red-500 focus:ring-red-600"
                        : "border-slate-300 focus:ring-[#b59a5b]"
                    }`}
                  />
                  {errors.country && touched.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Time Zone *
                  </label>
                  <input
                    type="text"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., GMT+1"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.timezone && touched.timezone
                        ? "border-red-500 focus:ring-red-600"
                        : "border-slate-300 focus:ring-[#b59a5b]"
                    }`}
                  />
                  {errors.timezone && touched.timezone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.timezone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How did you hear about The Mastery House? *
                </label>
                <select
                  name="howHeard"
                  value={formData.howHeard}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.howHeard && touched.howHeard
                      ? "border-red-500 focus:ring-red-600"
                      : "border-slate-300 focus:ring-[#b59a5b]"
                  }`}
                >
                  <option value="">Select an option</option>
                  <option value="referral">Personal referral</option>
                  <option value="search">Online search</option>
                  <option value="social">Social media</option>
                  <option value="event">Event / Talk</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {formData.howHeard === "other" && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Please specify
                  </label>
                  <input
                    type="text"
                    name="howHeardOther"
                    value={formData.howHeardOther}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section B: Child Profile */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-amber-600 pb-2">
              Section B: Child Profile
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Child's Full Name *
                </label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Child's Age *
                </label>
                <input
                  type="number"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  required
                  min="6"
                  max="16"
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Schooling Structure *
                </label>
                <select
                  name="schoolingStructure"
                  value={formData.schoolingStructure}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                >
                  <option value="">Select an option</option>
                  <option value="british">British</option>
                  <option value="american">American</option>
                  <option value="ib">IB</option>
                  <option value="nigerian">Nigerian Curriculum</option>
                  <option value="homeschool">Homeschool</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Which age band are you interested in? *
                </label>
                <select
                  name="ageBand"
                  value={formData.ageBand}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                >
                  <option value="">Select an option</option>
                  <option value="6-8">Foundations (6–8)</option>
                  <option value="9-12">Skill Builders (9–12)</option>
                  <option value="13-16">Mastery (13–16)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section C: Alignment & Intent */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-amber-600 pb-2">
              Section C: Alignment & Intent
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What prompted your interest in The Mastery House at this stage
                  of your child's life? *
                </label>
                <textarea
                  name="promptInterest"
                  value={formData.promptInterest}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                  placeholder="Share your reflections..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Which areas matter most to you for your child's formation?
                  (Select up to 3) *
                </label>
                <div className="space-y-2">
                  {[
                    "Academic excellence",
                    "Character & values",
                    "Emotional intelligence",
                    "Technical / future-ready skills",
                    "Confidence & leadership",
                    "Focus, discipline, and work ethic",
                  ].map((area) => (
                    <label key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.formationAreas.includes(area)}
                        onChange={() => handleCheckboxChange(area)}
                        disabled={
                          !formData.formationAreas.includes(area) &&
                          formData.formationAreas.length >= 3
                        }
                        className="mr-2"
                      />
                      <span className="text-slate-700">{area}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Selected: {formData.formationAreas.length}/3
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How would you describe your child's temperament and learning
                  style? *
                </label>
                <textarea
                  name="childTemperament"
                  value={formData.childTemperament}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                  placeholder="e.g., Calm, curious, intense, sensitive, driven..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What kind of adult do you hope your child becomes at 25? *
                </label>
                <textarea
                  name="childAt25"
                  value={formData.childAt25}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                  placeholder="This helps us understand long-term alignment..."
                />
              </div>
            </div>
          </div>

          {/* Section D: Partnership & Commitment */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-amber-600 pb-2">
              Section D: Partnership & Commitment
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  How involved are you willing to be in supporting your child's
                  growth alongside mentors? *
                </label>
                <select
                  name="parentInvolvement"
                  value={formData.parentInvolvement}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                >
                  <option value="">Select an option</option>
                  <option value="highly">Highly involved</option>
                  <option value="moderately">Moderately involved</option>
                  <option value="minimal">Prefer minimal involvement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Are you comfortable with a structured, high-expectation
                  learning environment? *
                </label>
                <select
                  name="structuredEnvironment"
                  value={formData.structuredEnvironment}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="unsure">Unsure (open to discussion)</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Are you open to faith-informed values guiding the culture and
                  formation of the Academy? *
                </label>
                <select
                  name="faithValues"
                  value={formData.faithValues}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="more">I'd like to understand more</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section E: Practical Readiness */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-amber-600 pb-2">
              Section E: Practical Readiness
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  If invited, are you prepared to invest in a premium, boutique
                  mentorship experience? *
                </label>
                <select
                  name="investmentReady"
                  value={formData.investmentReady}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="structure">
                    I'd like to understand the structure and investment
                  </option>
                  <option value="not-now">Not at this time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Is there anything else you would like us to know about your
                  child or your family?
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <p className="text-sm text-slate-700 mb-4">
              Thank you for your thoughtful responses. Each submission is
              reviewed personally. Families who are aligned will receive an
              invitation to a private virtual conversation with the Founder.
            </p>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Intention Form"}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-amber-700 hover:text-amber-800 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};
