import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "../lib/mongodb";
import {
  checkRateLimit,
  validateEmail,
  validatePhone,
  validateName,
  sanitizeString,
} from "../lib/validation";

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      childName,
      childAge,
      ageBand,
      message,
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

    // Validate child age
    if (!childAge || parseInt(childAge) < 6 || parseInt(childAge) > 16) {
      return res
        .status(400)
        .json({ error: "Child age must be between 6 and 16" });
    }

    // Validate age band
    if (!ageBand) {
      return res.status(400).json({ error: "Age band is required" });
    }

    // Connect to database
    const db = await getDatabase();
    const waitingList = db.collection("waiting-list");

    // Check for duplicate email
    const existingEntry = await waitingList.findOne({
      email: email.toLowerCase(),
    });
    if (existingEntry) {
      return res
        .status(409)
        .json({ error: "This email is already on the waiting list" });
    }

    // Prepare waiting list data
    const waitingListData = {
      firstName: sanitizeString(firstName),
      lastName: sanitizeString(lastName),
      email: email.toLowerCase().trim(),
      phone: sanitizeString(phone),
      childName: sanitizeString(childName),
      childAge: parseInt(childAge),
      ageBand: sanitizeString(ageBand),
      message: message ? sanitizeString(message) : null,
      submittedAt: new Date(),
      ipAddress: identifier,
      status: "pending",
    };

    // Insert into database
    const result = await waitingList.insertOne(waitingListData);

    return res.status(201).json({
      success: true,
      message: "Successfully added to waiting list",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Waiting list submission error:", error);
    return res.status(500).json({
      error: "Failed to join waiting list. Please try again later.",
    });
  }
}
