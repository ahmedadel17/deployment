'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: string;
}

interface ReturnRequest {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'completed' | 'cancelled' | 'pending';
  items: {
    name: string;
    image: string;
    reason: string;
    type: 'refund' | 'exchange' | 'store_credit';
    amount: string;
  }[];
}

interface ReturnFormData {
  orderId: string;
  selectedItems: string[];
  returnReason: string;
  returnType: 'refund' | 'exchange' | 'store_credit';
  comments: string;
  photos: File[];
}

interface DashboardReturnsProps {
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  initialOrders?: Order[];
  initialReturnRequests?: ReturnRequest[];
}

function DashboardReturns({ 
  user = { name: 'Ahmed Al-Rashid', email: 'ahmed@example.com', initials: 'AR' },
  initialOrders,
  initialReturnRequests
}: DashboardReturnsProps) {
  
  // Default orders data
  const defaultOrders: Order[] = [
    {
      id: 'ORD-2024-001234',
      orderNumber: 'ORD-2024-001234',
      date: 'September 1, 2025',
      status: 'Delivered',
      items: [
        {
          id: 'item1',
          name: 'Straight-leg jeans',
          image: '/assets/images/product-1.jpg',
          size: 'M',
          color: 'Blue',
          quantity: 1,
          price: '65.00'
        },
        {
          id: 'item2',
          name: 'Cotton T-shirt',
          image: '/assets/images/product-2.jpg',
          size: 'L',
          color: 'White',
          quantity: 2,
          price: '130.00'
        }
      ]
    },
    {
      id: 'ORD-2024-001233',
      orderNumber: 'ORD-2024-001233',
      date: 'August 28, 2025',
      status: 'Delivered',
      items: [
        {
          id: 'item3',
          name: 'Designer Handbag',
          image: '/assets/images/product-3.jpg',
          size: 'One Size',
          color: 'Black',
          quantity: 1,
          price: '299.00'
        }
      ]
    }
  ];

  // Default return requests data
  const defaultReturnRequests: ReturnRequest[] = [
    {
      id: 'RET-2024-001',
      orderNumber: 'ORD-2024-001230',
      date: 'August 20, 2025',
      status: 'processing',
      items: [
        {
          name: 'Denim Jacket',
          image: '/assets/images/product-3.jpg',
          reason: 'Wrong size received',
          type: 'exchange',
          amount: '89.00'
        }
      ]
    },
    {
      id: 'RET-2024-002',
      orderNumber: 'ORD-2024-001229',
      date: 'August 15, 2025',
      status: 'completed',
      items: [
        {
          name: 'Sneakers',
          image: '/assets/images/product-4.jpg',
          reason: 'Defective item',
          type: 'refund',
          amount: '120.00'
        }
      ]
    }
  ];

  const [orders] = useState<Order[]>(initialOrders || defaultOrders);
  const [returnRequests] = useState<ReturnRequest[]>(initialReturnRequests || defaultReturnRequests);
  const [formData, setFormData] = useState<ReturnFormData>({
    orderId: '',
    selectedItems: [],
    returnReason: '',
    returnType: 'refund',
    comments: '',
    photos: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const selectedOrder = orders.find(order => order.id === formData.orderId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const itemId = checkbox.value;
      
      setFormData(prev => ({
        ...prev,
        selectedItems: checkbox.checked
          ? [...prev.selectedItems, itemId]
          : prev.selectedItems.filter(id => id !== itemId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.orderId) newErrors.orderId = 'Please select an order';
    if (formData.selectedItems.length === 0) newErrors.selectedItems = 'Please select at least one item to return';
    if (!formData.returnReason) newErrors.returnReason = 'Please select a return reason';
    if (!formData.returnType) newErrors.returnType = 'Please select a return type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Submitting return request:', formData);
      
      // Here you would typically call your API to submit the return request
      // const response = await axios.post('/api/returns', formData);
      
      setSuccessMessage('Return request submitted successfully! You will receive a confirmation email shortly.');
      
      // Reset form
      setFormData({
        orderId: '',
        selectedItems: [],
        returnReason: '',
        returnType: 'refund',
        comments: '',
        photos: []
      });
      setUploadedFiles([]);
      
    } catch (error) {
      console.error('Failed to submit return request:', error);
      setErrors({ general: 'Failed to submit return request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'pending':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const returnReasons = [
    { value: 'defective', label: 'Item is defective/damaged' },
    { value: 'wrong_item', label: 'Wrong item received' },
    { value: 'wrong_size', label: 'Wrong size/color' },
    { value: 'not_as_described', label: 'Item not as described' },
    { value: 'quality_issues', label: 'Quality not as expected' },
    { value: 'changed_mind', label: 'Changed my mind' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <>
      <div className="lg:col-span-3 space-y-8">
        
        {/* Return Request Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Return Item</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Request a return for your purchased items</p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Selection */}
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Order
                </label>
                <select
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                    errors.orderId ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Choose an order to return items from</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.orderNumber} - {order.date} ({order.status})
                    </option>
                  ))}
                </select>
                {errors.orderId && <p className="mt-1 text-sm text-red-600">{errors.orderId}</p>}
              </div>

              {/* Order Items (shown when order is selected) */}
              {selectedOrder && (
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select Items to Return</h3>

                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg mb-4">
                        <input
                          type="checkbox"
                          id={item.id}
                          name="selectedItems"
                          value={item.id}
                          checked={formData.selectedItems.includes(item.id)}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor={item.id} className="block font-medium text-gray-900 dark:text-white cursor-pointer">
                            {item.name}
                          </label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Size: {item.size}, Color: {item.color}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                            <span className="icon-riyal-symbol text-xs"></span>
                            {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                    {errors.selectedItems && <p className="mt-1 text-sm text-red-600">{errors.selectedItems}</p>}
                  </div>
                </div>
              )}

              {/* Return Details (shown when items are selected) */}
              {formData.selectedItems.length > 0 && (
                <div className="space-y-6">
                  {/* Return Reason */}
                  <div>
                    <label htmlFor="returnReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason for Return <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="returnReason"
                      name="returnReason"
                      value={formData.returnReason}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                        errors.returnReason ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select a reason</option>
                      {returnReasons.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                    {errors.returnReason && <p className="mt-1 text-sm text-red-600">{errors.returnReason}</p>}
                  </div>

                  {/* Return Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Return Type <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="returnType"
                          value="refund"
                          checked={formData.returnType === 'refund'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Refund</span> - Get your money back
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="returnType"
                          value="exchange"
                          checked={formData.returnType === 'exchange'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Exchange</span> - Replace with different size/color
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="returnType"
                          value="store_credit"
                          checked={formData.returnType === 'store_credit'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Store Credit</span> - Credit to use on future purchases
                        </span>
                      </label>
                    </div>
                    {errors.returnType && <p className="mt-1 text-sm text-red-600">{errors.returnType}</p>}
                  </div>

                  {/* Additional Comments */}
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={4}
                      value={formData.comments}
                      onChange={handleInputChange}
                      placeholder="Please provide any additional details about your return..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="mt-4">
                        <label htmlFor="photos" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Click to upload photos
                          </span>
                          <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG up to 10MB each
                          </span>
                        </label>
                        <input
                          id="photos"
                          name="photos"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </div>
                    </div>
                    
                    {/* Display uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Return Request'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Return Policy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Return Policy</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Return Window</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 me-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    30 days from delivery date
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 me-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Items must be in original condition
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 me-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Tags and packaging included
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Return Process</h3>
                <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">1</span>
                    Submit return request
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">2</span>
                    Receive return label via email
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">3</span>
                    Package and ship items back
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">4</span>
                    Refund processed within 5-7 days
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Active Returns */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Return Requests</h2>
          </div>
          <div className="p-6">
            {returnRequests.length > 0 ? (
              <div className="space-y-4">
                {returnRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Return Request #{request.id}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Order #{request.orderNumber} - Requested on {request.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full mt-2 sm:mt-0 ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    {request.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Reason: {item.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            <span className="icon-riyal-symbol text-xs"></span>
                            {item.amount}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{item.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No return requests yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your return requests will appear here once submitted
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default DashboardReturns;

