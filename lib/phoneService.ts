import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Phone data interface
export interface PhoneData {
  phoneNumber: string;
  countryCode: string;
  fullNumber: string;
}

// API response interfaces
export interface PhoneResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    phoneNumber: string;
    countryCode: string;
    fullNumber: string;
    verified: boolean;
  };
}

export interface PhoneError {
  success: false;
  message: string;
  errors?: {
    phoneNumber?: string[];
    countryCode?: string[];
  };
}

// Phone service functions
export const phoneService = {
  // Send phone number for verification
  async sendPhoneForVerification(phoneData: PhoneData): Promise<PhoneResponse> {
    try {
      const response = await apiClient.post('/phone/verify', phoneData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as PhoneError;
      }
      throw {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      } as PhoneError;
    }
  },

  // Resend verification code
  async resendVerificationCode(phoneData: PhoneData): Promise<PhoneResponse> {
    try {
      const response = await apiClient.post('/phone/resend', phoneData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as PhoneError;
      }
      throw {
        success: false,
        message: 'Failed to resend verification code. Please try again.',
      } as PhoneError;
    }
  },

  // Verify phone number with OTP
  async verifyPhoneWithOTP(phoneData: PhoneData, otp: string): Promise<PhoneResponse> {
    try {
      const response = await apiClient.post('/phone/confirm', {
        ...phoneData,
        otp,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data as PhoneError;
      }
      throw {
        success: false,
        message: 'Verification failed. Please check your code and try again.',
      } as PhoneError;
    }
  },
};

// Utility function to format phone data
export const formatPhoneData = (phoneNumber: string, countryCode: string): PhoneData => {
  // Find the country to get the dial code
  const countries = [
    { code: "SA", dialCode: "+966" },
    { code: "AE", dialCode: "+971" },
    { code: "KW", dialCode: "+965" },
    { code: "QA", dialCode: "+974" },
    { code: "BH", dialCode: "+973" },
    { code: "OM", dialCode: "+968" },
    { code: "JO", dialCode: "+962" },
    { code: "LB", dialCode: "+961" },
    { code: "EG", dialCode: "+20" },
    { code: "US", dialCode: "+1" },
    { code: "GB", dialCode: "+44" },
    { code: "FR", dialCode: "+33" },
    { code: "DE", dialCode: "+49" },
    { code: "IN", dialCode: "+91" },
    { code: "PK", dialCode: "+92" },
    { code: "BD", dialCode: "+880" },
    { code: "TR", dialCode: "+90" },
    { code: "IR", dialCode: "+98" },
    { code: "IQ", dialCode: "+964" },
    { code: "SY", dialCode: "+963" },
  ];

  const country = countries.find(c => c.code === countryCode);
  const dialCode = country?.dialCode || '+966';
  
  // Clean phone number (remove spaces, dashes, etc.)
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  
  return {
    phoneNumber: cleanPhoneNumber,
    countryCode,
    fullNumber: `${dialCode}${cleanPhoneNumber}`,
  };
};

