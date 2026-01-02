import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "../lib/mongodb.js";
import {
  checkRateLimit,
  validateEmail,
  validatePhone,
  validateName,
  sanitizeString,
} from "../lib/validation.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get client IP for rate limiting
    const clientIp =
      req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
    const identifier = Array.isArray(clientIp) ? clientIp[0] : clientIp;

    // Check rate limit (3 submissions per hour)
    if (!checkRateLimit(identifier, 3, 60 * 60 * 1000)) {
      return res.status(429).json({
        error: "Too many requests. Please try again later.",
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      timezone,
      howHeard,
      howHeardOther,
      childName,
      childAge,
      schoolingStructure,
      ageBand,
      promptInterest,
      formationAreas,
      childTemperament,
      childAt25,
      parentInvolvement,
      structuredEnvironment,
      faithValues,
      investmentReady,
      additionalInfo,
    } = req.body;

    // Validate required fields
    const validations = [
      validateName(firstName, "First name"),
      validateName(lastName, "Last name"),
      validateEmail(email),
      validatePhone(phone),
      validateName(childName, "Child name"),
    ];

    for (const validation of validations) {
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }
    }

    // Validate other required fields
    if (!country || !timezone || !howHeard || !schoolingStructure || !ageBand) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    if (!childAge || parseInt(childAge) < 6 || parseInt(childAge) > 16) {
      return res
        .status(400)
        .json({ error: "Child age must be between 6 and 16" });
    }

    if (!promptInterest || promptInterest.length < 20) {
      return res
        .status(400)
        .json({ error: "Please provide more details about your interest" });
    }

    if (!Array.isArray(formationAreas) || formationAreas.length === 0) {
      return res
        .status(400)
        .json({ error: "Please select at least one formation area" });
    }

    if (!childTemperament || childTemperament.length < 20) {
      return res
        .status(400)
        .json({ error: "Please provide more details about child temperament" });
    }

    if (!childAt25 || childAt25.length < 20) {
      return res.status(400).json({
        error: "Please provide more details about your vision for your child",
      });
    }

    if (
      !parentInvolvement ||
      !structuredEnvironment ||
      !faithValues ||
      !investmentReady
    ) {
      return res
        .status(400)
        .json({ error: "Please answer all commitment questions" });
    }

    // Connect to database
    const db = await getDatabase();
    const enrollments = db.collection("enrollments");

    // Check for duplicate email
    const existingEnrollment = await enrollments.findOne({
      email: email.toLowerCase(),
    });
    if (existingEnrollment) {
      return res
        .status(409)
        .json({ error: "An enrollment with this email already exists" });
    }

    // Prepare enrollment data
    const enrollmentData = {
      firstName: sanitizeString(firstName),
      lastName: sanitizeString(lastName),
      email: email.toLowerCase().trim(),
      phone: sanitizeString(phone),
      country: sanitizeString(country),
      timezone: sanitizeString(timezone),
      howHeard: sanitizeString(howHeard),
      howHeardOther: howHeardOther ? sanitizeString(howHeardOther) : null,
      childName: sanitizeString(childName),
      childAge: parseInt(childAge),
      schoolingStructure: sanitizeString(schoolingStructure),
      ageBand: sanitizeString(ageBand),
      promptInterest: sanitizeString(promptInterest),
      formationAreas: formationAreas.map((area: string) =>
        sanitizeString(area)
      ),
      childTemperament: sanitizeString(childTemperament),
      childAt25: sanitizeString(childAt25),
      parentInvolvement: sanitizeString(parentInvolvement),
      structuredEnvironment: sanitizeString(structuredEnvironment),
      faithValues: sanitizeString(faithValues),
      investmentReady: sanitizeString(investmentReady),
      additionalInfo: additionalInfo ? sanitizeString(additionalInfo) : null,
      submittedAt: new Date(),
      ipAddress: identifier,
      status: "pending",
    };

    // Insert into database
    const result = await enrollments.insertOne(enrollmentData);

    return res.status(201).json({
      success: true,
      message: "Enrollment form submitted successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Enrollment submission error:", error);

    // Ensure we always return JSON
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error details:", errorMessage);

    return res.status(500).json({
      error: "Failed to submit enrollment form. Please try again later.",
      details:
        process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
}
