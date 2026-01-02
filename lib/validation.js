import validator from "validator";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
const rateLimitStore = {};
// Clean up old entries every 30 minutes
setInterval(() => {
    const now = Date.now();
    Object.keys(rateLimitStore).forEach((key) => {
        if (rateLimitStore[key].resetTime < now) {
            delete rateLimitStore[key];
        }
    });
}, 30 * 60 * 1000);
export function checkRateLimit(identifier, maxRequests = 3, windowMs = 60 * 60 * 1000) {
    const now = Date.now();
    const record = rateLimitStore[identifier];
    if (!record || record.resetTime < now) {
        rateLimitStore[identifier] = {
            count: 1,
            resetTime: now + windowMs,
        };
        return true;
    }
    if (record.count >= maxRequests) {
        return false;
    }
    record.count++;
    return true;
}
export function validateEmail(email) {
    if (!email) {
        return { valid: false, error: "Email is required" };
    }
    if (!validator.isEmail(email)) {
        return { valid: false, error: "Invalid email format" };
    }
    if (email.length > 254) {
        return { valid: false, error: "Email is too long" };
    }
    return { valid: true };
}
export function validatePhone(phone) {
    if (!phone) {
        return { valid: false, error: "Phone number is required" };
    }
    try {
        // Validate using libphonenumber-js
        if (!isValidPhoneNumber(phone)) {
            return { valid: false, error: "Invalid phone number" };
        }
        // Additional check to ensure it's not too long
        const parsed = parsePhoneNumber(phone);
        if (parsed && parsed.number.length > 20) {
            return { valid: false, error: "Phone number is too long" };
        }
        return { valid: true };
    }
    catch {
        return {
            valid: false,
            error: "Invalid phone number format. Please include country code (e.g., +234)",
        };
    }
}
export function validateName(name, fieldName) {
    if (!name || !name.trim()) {
        return { valid: false, error: `${fieldName} is required` };
    }
    if (name.trim().length < 2) {
        return {
            valid: false,
            error: `${fieldName} must be at least 2 characters`,
        };
    }
    if (name.length > 100) {
        return { valid: false, error: `${fieldName} is too long` };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        return {
            valid: false,
            error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`,
        };
    }
    return { valid: true };
}
export function sanitizeString(str) {
    return str.trim().substring(0, 1000);
}
