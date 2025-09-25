import * as yup from "yup";

// Phone validation schema
export const phoneValidationSchema = yup.object({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9\s\-\(\)]+$/, "Phone number can only contain numbers, spaces, dashes, and parentheses")
    .test("min-length", "Phone number must be at least 7 digits", (value) => {
      if (!value) return false;
      const cleanNumber = value.replace(/\D/g, "");
      return cleanNumber.length >= 7;
    })
    .test("max-length", "Phone number cannot exceed 15 digits", (value) => {
      if (!value) return true;
      const cleanNumber = value.replace(/\D/g, "");
      return cleanNumber.length <= 15;
    })
    .test("valid-format", "Please enter a valid phone number", (value) => {
      if (!value) return false;
      const cleanNumber = value.replace(/\D/g, "");
      // Basic validation - at least 7 digits, not all same digits
      return cleanNumber.length >= 7 && !/^(\d)\1+$/.test(cleanNumber);
    }),
  countryCode: yup
    .string()
    .required("Country code is required")
    .oneOf([
      "SA", "AE", "KW", "QA", "BH", "OM", "JO", "LB", "EG", 
      "US", "GB", "FR", "DE", "IN", "PK", "BD", "TR", "IR", "IQ", "SY"
    ], "Invalid country code"),
});

// OTP validation schema
export const otpValidationSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "OTP must contain only numbers")
    .length(6, "OTP must be exactly 6 digits"),
});

// Email validation schema
export const emailValidationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email cannot exceed 255 characters"),
});

// Password validation schema
export const passwordValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

// User registration schema
export const userRegistrationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9\s\-\(\)]+$/, "Phone number can only contain numbers, spaces, dashes, and parentheses")
    .test("min-length", "Phone number must be at least 7 digits", (value) => {
      if (!value) return false;
      const cleanNumber = value.replace(/\D/g, "");
      return cleanNumber.length >= 7;
    }),
  countryCode: yup
    .string()
    .required("Country code is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

// Login schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required"),
});

// Forgot password schema
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

// Reset password schema
export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  token: yup
    .string()
    .required("Reset token is required"),
});

