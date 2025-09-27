'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture?: string;
  dateOfBirth: string;
  gender: string;
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
  };
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface DashboardSettingsProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialSettings?: UserSettings;
}

function DashboardSettings({ 
  user = { name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', initials: 'AR' },
  initialSettings
}: DashboardSettingsProps) {
  
  // Default settings data
  const defaultSettings: UserSettings = {
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    profilePicture: '/assets/images/default-avatar.jpg',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    language: 'en',
    timezone: 'Asia/Riyadh',
    notifications: {
      email: true,
      sms: true,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    }
  };

  const [settings, setSettings] = useState<UserSettings>(
    initialSettings || defaultSettings
  );
  
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'privacy'>('profile');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1] as keyof UserSettings['notifications'];
      setSettings(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: (e.target as HTMLInputElement).checked
        }
      }));
    } else if (name.startsWith('privacy.')) {
      const privacyKey = name.split('.')[1] as keyof UserSettings['privacy'];
      if (privacyKey === 'profileVisibility') {
        setSettings(prev => ({
          ...prev,
          privacy: {
            ...prev.privacy,
            [privacyKey]: value
          }
        }));
      } else {
        setSettings(prev => ({
          ...prev,
          privacy: {
            ...prev.privacy,
            [privacyKey]: (e.target as HTMLInputElement).checked
          }
        }));
      }
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!settings.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!settings.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!settings.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(settings.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!settings.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+966[0-9]{9}$/.test(settings.phone)) {
      newErrors.phone = 'Phone number must be in format +966XXXXXXXXX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!passwordForm.currentPassword.trim()) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword.trim()) newErrors.newPassword = 'New password is required';
    else if (passwordForm.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password: string): { strength: string; color: string; percentage: number } => {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    if (score < 50) return { strength: 'Weak', color: 'bg-red-500', percentage: score };
    if (score < 75) return { strength: 'Medium', color: 'bg-yellow-500', percentage: score };
    return { strength: 'Strong', color: 'bg-green-500', percentage: score };
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Updating profile:', settings);
      
      // Here you would typically call your API to update the profile
      // const response = await axios.put('/api/user/profile', settings);
      
      setSuccessMessage('Profile updated successfully!');
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Updating password');
      
      // Here you would typically call your API to update the password
      // const response = await axios.put('/api/user/password', passwordForm);
      
      setSuccessMessage('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
    } catch (error) {
      console.error('Failed to update password:', error);
      setErrors({ general: 'Failed to update password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings(prev => ({
          ...prev,
          profilePicture: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'password', label: 'Password', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' }
  ] as const;

  return (
    <>
      <div className="lg:col-span-3 space-y-8">
        
        {/* Settings Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your account settings and preferences
            </p>
          </div>
          
       
          
          <div className="p-6">
            {successMessage && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
                </div>
              </div>
            )}

            {errors.general && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-sm text-red-800 dark:text-red-200">{errors.general}</p>
                </div>
              </div>
            )}

            {/* Profile Tab */}
           
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                  
              

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={settings.firstName}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.firstName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={settings.lastName}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.lastName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
               
                    
                   
                 
                
                  </div>
                </div>
                <hr className="border-t border-gray-200 dark:border-gray-600"/>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.currentPassword ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password *
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.newPassword ? 'border-red-500' : ''
                        }`}
                      />
                      {passwordForm.newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                            <span className={`font-medium ${
                              getPasswordStrength(passwordForm.newPassword).strength === 'Weak' ? 'text-red-600' :
                              getPasswordStrength(passwordForm.newPassword).strength === 'Medium' ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {getPasswordStrength(passwordForm.newPassword).strength}
                            </span>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(passwordForm.newPassword).color}`}
                              style={{ width: `${getPasswordStrength(passwordForm.newPassword).percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.confirmPassword ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`te-btn te-btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
         

        
          </div>
        </div>

      </div>
    </>
  );
}

export default DashboardSettings;
