import React, { useState } from "react";
import { Button } from "../components/Button";
import { isValidPhoneNumber } from "libphonenumber-js";
import toast, { Toaster } from "react-hot-toast";

export const WaitingList: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    ageBand: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
      case "childName":
        if (!value || value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) {
          return "Name can only contain letters, spaces, hyphens, and apostrophes";
        }
        break;

      case "email":
        if (!value) {
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

      case "childAge": {
        const age = parseInt(value);
        if (!value || isNaN(age)) {
          return "Child's age is required";
        }
        if (age < 6 || age > 16) {
          return "Age must be between 6 and 16";
        }
        break;
      }

      case "ageBand":
        if (!value) {
          return "Please select an age band";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    const toastId = toast.loading("Joining waiting list...");

    try {
      const response = await fetch("/api/waiting-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      // Always read body ONCE
      const responseBody = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const errorMessage =
          typeof responseBody === "string"
            ? "Server returned an invalid response"
            : responseBody?.error || "Submission failed";

        throw new Error(errorMessage);
      }

      toast.success(
        "Thank you for joining our waiting list. You’ll receive priority consideration.",
        { id: toastId }
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        ageBand: "",
        message: "",
      });
    } catch (err) {
      console.error("Submit error:", err);

      toast.error(err instanceof Error ? err.message : "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" min-h-screen bg-linear-to-br from-slate-50 to-amber-50 flex items-center justify-center py-12 sm:py-16 md:py-20">
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f3d2b] mb-4 sm:mb-6 text-center">
            The Mastery House
            <br />
            Waiting List
          </h1>

          <div className="mb-6 sm:mb-8 text-center">
            <p className="text-base sm:text-lg text-slate-700 mb-3 sm:mb-4">
              Thank you for your interest.
            </p>
            <p className="text-sm sm:text-base text-slate-600">
              Our current intake is either under final review or at capacity for
              this year.
            </p>
          </div>

          <div className="bg-[#EFE6D8] p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="font-bold text-[#1f3d2b] mb-3 text-base sm:text-lg">
              Families on the waiting list:
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Receive priority consideration for the next intake</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Are notified if a place becomes available</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">✓</span>
                <span>Are invited to private information sessions</span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
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
                Phone Number *
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
                  Child's Name *
                </label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.childName && touched.childName
                      ? "border-red-500 focus:ring-red-600"
                      : "border-slate-300 focus:ring-[#b59a5b]"
                  }`}
                />
                {errors.childName && touched.childName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.childName}
                  </p>
                )}
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
                  onBlur={handleBlur}
                  min="6"
                  max="16"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.childAge && touched.childAge
                      ? "border-red-500 focus:ring-red-600"
                      : "border-slate-300 focus:ring-[#b59a5b]"
                  }`}
                />
                {errors.childAge && touched.childAge && (
                  <p className="mt-1 text-sm text-red-600">{errors.childAge}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Age Band of Interest *
              </label>
              <select
                name="ageBand"
                value={formData.ageBand}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.ageBand && touched.ageBand
                    ? "border-red-500 focus:ring-red-600"
                    : "border-slate-300 focus:ring-[#b59a5b]"
                }`}
              >
                <option value="">Select an option</option>
                <option value="6-8">Foundations (6–8)</option>
                <option value="9-12">Skill Builders (9–12)</option>
                <option value="13-16">Mastery (13–16)</option>
              </select>
              {errors.ageBand && touched.ageBand && (
                <p className="mt-1 text-sm text-red-600">{errors.ageBand}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b59a5b]"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Join the Waiting List"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-amber-700 hover:text-amber-800 underline"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
