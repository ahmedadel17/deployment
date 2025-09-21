<?php include 'header.php'; ?>

<!-- Success Header -->
<div class="text-center mb-8">
    <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
    </div>
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400">Thank you for your purchase</p>
</div>

<!-- Order Details -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
    <div class="p-6 border-b border-gray-200 dark:border-gray-600">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Order Number</h3>
                <p class="text-gray-600 dark:text-gray-400">#ORD-2024-001234</p>
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Order Date</h3>
                <p class="text-gray-600 dark:text-gray-400">September 1, 2025</p>
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Estimated Delivery</h3>
                <p class="text-gray-600 dark:text-gray-400">September 8-10, 2025</p>
            </div>
        </div>
    </div>

    <!-- Order Items -->
    <div class="p-6">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Items Ordered</h3>
        <div class="space-y-4">
            <div class="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <img src="assets/images/product-1.jpg" alt="Product" class="w-16 h-16 object-cover rounded-md">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900 dark:text-white">Mercer 7 Inch Chino Shorts</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Color: Blue | Size: M</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 1</p>
                </div>
                <div class="text-right">
                    <p class="font-medium text-gray-900 dark:text-white">
                        <span class="icon-riyal-symbol"></span>
                        <span>200.00</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Order Summary -->
        <div class="mt-6 border-t border-gray-200 dark:border-gray-600 pt-4">
            <div class="flex justify-end">
                <div class="w-64 space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span class="text-gray-900 dark:text-white">
                            <span class="icon-riyal-symbol text-xs"></span>
                            <span>200.00</span>
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                        <span class="text-gray-900 dark:text-white">Free</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600 dark:text-gray-400">Tax</span>
                        <span class="text-gray-900 dark:text-white">
                            <span class="icon-riyal-symbol text-xs"></span>
                            <span>16.00</span>
                        </span>
                    </div>
                    <div class="border-t border-gray-200 dark:border-gray-600 pt-2">
                        <div class="flex justify-between">
                            <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                            <span class="text-lg font-semibold text-gray-900 dark:text-white">
                                <span class="icon-riyal-symbol"></span>
                                <span>216.00</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Shipping & Contact Info -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
        <div class="text-gray-600 dark:text-gray-400 space-y-2">
            <p class="font-medium text-gray-900 dark:text-white">John Doe</p>
            <p>123 Main Street</p>
            <p>Apt 4B</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
        </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
        <div class="text-gray-600 dark:text-gray-400 space-y-2">
            <p>john.doe@example.com</p>
            <p>+1 (555) 123-4567</p>
        </div>

        <h4 class="font-semibold text-gray-900 dark:text-white mt-4 mb-2">Shipping Method</h4>
        <p class="text-gray-600 dark:text-gray-400">Standard Shipping (5-7 business days)</p>
    </div>
</div>

<!-- Next Steps -->
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
    <h3 class="font-semibold text-gray-900 dark:text-white mb-4">What happens next?</h3>
    <div class="space-y-6">
        <div class="flex items-start space-x-3 rtl:space-x-reverse">
            <div class="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-semibold text-blue-600 dark:text-blue-300">1</span>
            </div>
            <div>
                <p class="font-medium text-gray-900 dark:text-white">Order Processing</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">We'll prepare your order within 1-2 business days</p>
            </div>
        </div>
        <div class="flex items-start space-x-3 rtl:space-x-reverse">
            <div class="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-semibold text-blue-600 dark:text-blue-300">2</span>
            </div>
            <div>
                <p class="font-medium text-gray-900 dark:text-white">Shipping Notification</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">You'll receive tracking information once your order ships</p>
            </div>
        </div>
        <div class="flex items-start space-x-3 rtl:space-x-reverse">
            <div class="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-xs font-semibold text-blue-600 dark:text-blue-300">3</span>
            </div>
            <div>
                <p class="font-medium text-gray-900 dark:text-white">Delivery</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Your order will arrive within 5-7 business days</p>
            </div>
        </div>
    </div>
</div>

<!-- Action Buttons -->
<div class="flex flex-col sm:flex-row gap-4 justify-center">
    <a href="dashboard-track.php" class="te-btn te-btn-primary">
        Track Your Order
    </a>
    <a href="index.php" class="te-btn te-btn-default">
        Continue Shopping
    </a>
</div>

<!-- Email Confirmation Notice -->
<div class="mt-8 text-center">
    <p class="text-gray-600 dark:text-gray-400">
        A confirmation email has been sent to <a href="mailto:john.doe@example.com" class="text-primary-600 hover:text-primary-300 underline">john.doe@example.com</a>
    </p>
</div>


<?php include 'footer.php'; ?>