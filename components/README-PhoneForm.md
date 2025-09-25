# Phone Form with React Hook Form Integration

This document explains how to use the phone form component with React Hook Form and validation.

## 🚀 Features

- ✅ **React Hook Form Integration** - Full form state management
- ✅ **Yup Validation** - Comprehensive validation rules
- ✅ **Real-time Validation** - Instant feedback on user input
- ✅ **API Integration** - Direct API endpoint support
- ✅ **Custom Submit Handlers** - Flexible submission options
- ✅ **Loading States** - Built-in loading indicators
- ✅ **Error Handling** - Comprehensive error management
- ✅ **TypeScript Support** - Full type safety

## 📦 Dependencies

```bash
npm install react-hook-form @hookform/resolvers yup
```

## 🎯 Basic Usage

### 1. Simple Form with API Endpoint

```tsx
import PhoneForm from "./components/PhoneForm";

function MyComponent() {
  const handleSuccess = (response) => {
    console.log("Success:", response);
  };

  const handleError = (error) => {
    console.error("Error:", error);
  };

  return (
    <PhoneForm
      apiEndpoint="/api/phone/verify"
      onSuccess={handleSuccess}
      onError={handleError}
      submitButtonText="Send Verification Code"
    />
  );
}
```

### 2. Custom Submit Handler

```tsx
import PhoneForm from "./components/PhoneForm";
import { PhoneData } from "./lib/phoneService";

function MyComponent() {
  const handleSubmit = async (phoneData: PhoneData) => {
    // Your custom logic here
    const response = await fetch('/api/phone/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phoneData)
    });
    
    const result = await response.json();
    console.log("Result:", result);
  };

  return (
    <PhoneForm
      onSubmit={handleSubmit}
      submitButtonText="Send Code"
    />
  );
}
```

### 3. Pre-filled Form

```tsx
<PhoneForm
  apiEndpoint="/api/phone/verify"
  onSuccess={handleSuccess}
  onError={handleError}
  defaultValues={{
    countryCode: "US",
    phoneNumber: "5551234567"
  }}
  submitButtonText="Update Phone"
/>
```

## 🔧 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | `(phoneData: PhoneData) => Promise<void>` | No | Custom submit handler function |
| `apiEndpoint` | `string` | No | Direct API endpoint for phone verification |
| `onSuccess` | `(response: unknown) => void` | No | Success callback |
| `onError` | `(error: unknown) => void` | No | Error callback |
| `defaultValues` | `Partial<PhoneFormData>` | No | Default form values |
| `submitButtonText` | `string` | No | Submit button text (default: "Send Verification Code") |
| `className` | `string` | No | Additional CSS classes |

## ✅ Validation Rules

The form includes comprehensive validation:

### Phone Number Validation
- ✅ **Required** - Phone number is mandatory
- ✅ **Format** - Only numbers, spaces, dashes, and parentheses allowed
- ✅ **Length** - Minimum 7 digits, maximum 15 digits
- ✅ **Pattern** - Cannot be all the same digits

### Country Code Validation
- ✅ **Required** - Country code is mandatory
- ✅ **Valid Codes** - Must be one of the supported country codes

## 🎨 Styling

The component uses Tailwind CSS classes and supports dark mode:

```tsx
// Light mode
<PhoneForm className="bg-white" />

// Dark mode
<PhoneForm className="bg-gray-800" />
```

## 🔄 Form State

The form provides access to React Hook Form's state:

```tsx
import { useForm } from "react-hook-form";

function MyComponent() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  return (
    <PhoneForm
      // The component handles all form state internally
      onSubmit={handleSubmit}
    />
  );
}
```

## 📡 API Integration

### Expected API Response Format

```json
{
  "success": true,
  "message": "Verification code sent successfully",
  "data": {
    "id": "phone_1234567890",
    "phoneNumber": "501234567",
    "countryCode": "SA",
    "fullNumber": "+966501234567",
    "verified": false,
    "codeSent": true
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Invalid phone number format",
  "errors": {
    "phoneNumber": ["Phone number must be at least 7 digits"]
  }
}
```

## 🛠️ Customization

### Custom Validation

You can extend the validation schema:

```tsx
import { phoneValidationSchema } from "./lib/validationSchemas";
import * as yup from "yup";

const customSchema = phoneValidationSchema.shape({
  phoneNumber: phoneValidationSchema.fields.phoneNumber.test(
    "custom-validation",
    "Custom error message",
    (value) => {
      // Your custom validation logic
      return true;
    }
  )
});
```

### Custom Styling

```tsx
<PhoneForm
  className="max-w-md mx-auto"
  submitButtonText="Custom Button Text"
/>
```

## 🐛 Error Handling

The component handles various error scenarios:

- ✅ **Network errors** - Connection issues
- ✅ **Validation errors** - Form validation failures
- ✅ **API errors** - Server-side errors
- ✅ **User input errors** - Invalid phone formats

## 📱 Mobile Support

The component is fully responsive and mobile-friendly:

- ✅ **Touch-friendly** - Large touch targets
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Mobile keyboard** - Optimized for mobile input

## 🔒 Security

- ✅ **Input sanitization** - Prevents malicious input
- ✅ **XSS protection** - Safe HTML rendering
- ✅ **CSRF protection** - Secure API calls

## 📚 Examples

See `PhoneFormExample.tsx` for comprehensive usage examples including:

- Direct API integration
- Custom submit handlers
- Pre-filled forms
- Error handling
- Success feedback

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install react-hook-form @hookform/resolvers yup
```

2. Import and use the component:
```tsx
import PhoneForm from "./components/PhoneForm";

function App() {
  return (
    <PhoneForm
      apiEndpoint="/api/phone/verify"
      onSuccess={(response) => console.log("Success:", response)}
      onError={(error) => console.error("Error:", error)}
    />
  );
}
```

3. Set up your API endpoint (see `app/api/phone/verify/route.ts` for example)

That's it! Your phone form is ready to use with full React Hook Form integration and validation.

