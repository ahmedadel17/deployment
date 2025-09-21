<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Track Your Order</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Enter your order ID to track your package</p>
            </div>
            <div class="p-6">
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex-1">
                        <input type="text" id="orderTrackingId"
                            placeholder="Enter Order ID (e.g., ORD-2024-001234)"
                            class="px-4 py-3">
                    </div>
                    <button id="trackOrderBtn"
                        class="te-btn te-btn-primary">
                        Track Order
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Select</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose from your recent orders to quickly view tracking details.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button class="quick-select-btn flex flex-col items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-order-id="ORD-2024-001234">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">#ORD-2024-001234</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Placed Sep 1, 2025</span>
                    </button>
                    <button class="quick-select-btn flex flex-col items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-order-id="ORD-2024-001235">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">#ORD-2024-001235</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Placed Aug 28, 2025</span>
                    </button>
                    <button class="quick-select-btn flex flex-col items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" data-order-id="ORD-2024-001236">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">#ORD-2024-001236</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Placed Aug 25, 2025</span>
                    </button>
                </div>
            </div>
        </div>

        <div id="trackingResults" class="hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 id="orderNumber" class="text-xl font-bold text-gray-900 dark:text-white"></h2>
                        <p id="orderDate" class="text-sm text-gray-600 dark:text-gray-400"></p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span id="orderStatus" class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"></span>
                        <div class="text-right">
                            <p class="text-sm font-medium text-gray-900 dark:text-white">Expected Delivery</p>
                            <p id="expectedDelivery" class="text-sm text-gray-600 dark:text-gray-400"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden">
                            <img src="assets/images/product-1.jpg" alt="Product" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-gray-900 dark:text-white">Straight-leg jeans</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Size: M, Color: Blue</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 1</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-900 dark:text-white">
                                <span class="icon-riyal-symbol text-xs"></span>
                                65.00
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden">
                            <img src="assets/images/product-2.jpg" alt="Product" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-gray-900 dark:text-white">Cotton T-shirt</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Size: L, Color: White</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 2</p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-900 dark:text-white">
                                <span class="icon-riyal-symbol text-xs"></span>
                                130.00
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                        <span>Total:</span>
                        <span>
                            <span class="icon-riyal-symbol"></span>
                            195.00
                        </span>
                    </div>
                </div>
            </div>

            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Tracking Progress</h3>
                <div class="relative">
                    <div id="progressLine" class="absolute left-4 top-0 h-0.5 bg-primary-600 transition-all duration-500"></div>

                    <div id="trackingSteps" class="space-y-8">
                    </div>
                </div>
            </div>

            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h4>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p>John Doe</p>
                            <p>123 Main Street</p>
                            <p>Anytown, USA 12345</p>
                            <p>United States</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Shipping Method</h4>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p>Standard Shipping</p>
                            <p>3-5 Business Days</p>
                            <p class="mt-2">
                                <span class="font-medium">Carrier:</span> FedEx
                            </p>
                            <p>
                                <span class="font-medium">Tracking Number:</span> TRK123456789
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="trackingError" class="hidden bg-red-50 dark:bg-red-900 rounded-lg p-4 text-sm text-red-700 dark:text-red-200">
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.5-1.63 1.768-2.91L13.768 4.31a2 2 0 00-3.536 0L4.31 16.09c-.732 1.28.228 2.91 1.768 2.91z"></path>
                </svg>
                <span>Order not found. Please check the ID and try again.</span>
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Need Help?</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <a href="#" class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-6 h-6 text-primary-600 dark:text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">Contact Support</span>
                    </a>
                    <a href="dashboard-returns.php" class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-6 h-6 text-primary-600 dark:text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">Return Item</span>
                    </a>
                    <a href="dashboard-orders.php" class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <svg class="w-6 h-6 text-primary-600 dark:text-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        <span class="text-sm font-medium text-gray-900 dark:text-white">View All Orders</span>
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const orderInput = document.getElementById('orderTrackingId');
        const trackBtn = document.getElementById('trackOrderBtn');
        const trackingResults = document.getElementById('trackingResults');
        const trackingError = document.getElementById('trackingError');
        const quickSelectBtns = document.querySelectorAll('.quick-select-btn');

        // Dynamic content elements
        const orderNumberEl = document.getElementById('orderNumber');
        const orderDateEl = document.getElementById('orderDate');
        const orderStatusEl = document.getElementById('orderStatus');
        const expectedDeliveryEl = document.getElementById('expectedDelivery');
        const trackingStepsEl = document.getElementById('trackingSteps');

        // Mock data for different orders
        const mockOrderData = {
            'ORD-2024-001234': {
                orderNumber: 'ORD-2024-001234',
                date: 'September 1, 2025',
                status: 'In Transit',
                delivery: 'September 5, 2025',
                steps: [{
                    label: 'Order Confirmed',
                    date: 'Sep 1, 2025 - 10:30 AM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'Order Shipped',
                    date: 'Sep 2, 2025 - 2:15 PM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'In Transit',
                    date: 'Sep 3, 2025 - 8:45 AM',
                    status: 'current',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>'
                }, {
                    label: 'Out for Delivery',
                    date: 'Expected: Sep 5, 2025',
                    status: 'pending',
                    icon: '<svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                }, {
                    label: 'Delivered',
                    date: 'Expected: Sep 5, 2025',
                    status: 'pending',
                    icon: '<svg class="w-4 h-4 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>'
                }]
            },
            'ORD-2024-001235': {
                orderNumber: 'ORD-2024-001235',
                date: 'August 28, 2025',
                status: 'Out for Delivery',
                delivery: 'September 2, 2025',
                steps: [{
                    label: 'Order Confirmed',
                    date: 'Aug 28, 2025 - 9:00 AM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'Order Shipped',
                    date: 'Aug 28, 2025 - 4:00 PM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'In Transit',
                    date: 'Aug 30, 2025 - 11:00 AM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'Out for Delivery',
                    date: 'Sep 1, 2025 - 7:30 AM',
                    status: 'current',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                }, {
                    label: 'Delivered',
                    date: 'Expected: Sep 2, 2025',
                    status: 'pending',
                    icon: '<svg class="w-4 h-4 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>'
                }]
            },
            'ORD-2024-001236': {
                orderNumber: 'ORD-2024-001236',
                date: 'August 25, 2025',
                status: 'Delivered',
                delivery: 'August 29, 2025',
                steps: [{
                    label: 'Order Confirmed',
                    date: 'Aug 25, 2025 - 2:00 PM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'Order Shipped',
                    date: 'Aug 26, 2025 - 11:00 AM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'In Transit',
                    date: 'Aug 27, 2025 - 3:00 PM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>'
                }, {
                    label: 'Out for Delivery',
                    date: 'Aug 29, 2025 - 8:00 AM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                }, {
                    label: 'Delivered',
                    date: 'Aug 29, 2025 - 2:00 PM',
                    status: 'completed',
                    icon: '<svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>'
                }]
            }
        };

        function updateTrackingUI(orderData) {
            orderNumberEl.textContent = `Order #${orderData.orderNumber}`;
            orderDateEl.textContent = `Placed on ${orderData.date}`;
            orderStatusEl.textContent = orderData.status;
            expectedDeliveryEl.textContent = orderData.delivery;

            trackingStepsEl.innerHTML = '';
            orderData.steps.forEach((step, index) => {
                const stepEl = document.createElement('div');
                stepEl.classList.add('relative', 'flex', 'items-start');

                const circleColorClass = step.status === 'completed' || step.status === 'current' ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600';
                const iconColorClass = step.status === 'completed' || step.status === 'current' ? 'text-white' : 'text-gray-600 dark:text-gray-400';
                const textColorClass = step.status === 'completed' || step.status === 'current' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400';
                const secondaryTextColorClass = step.status === 'completed' || step.status === 'current' ? 'text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-500';

                stepEl.innerHTML = `
                    <div class="flex-shrink-0 w-8 h-8 ${circleColorClass} rounded-full flex items-center justify-center">
                        ${step.icon}
                    </div>
                    <div class="ms-4 flex-1">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h4 class="text-sm font-medium ${textColorClass}">${step.label}</h4>
                                <p class="text-sm ${secondaryTextColorClass}">${step.date}</p>
                            </div>
                        </div>
                    </div>
                `;
                trackingStepsEl.appendChild(stepEl);

                // Add progress line styling
                if (step.status === 'current' || step.status === 'completed') {
                    const progressLine = document.getElementById('progressLine');
                    // This is a simple calculation. A more complex UI would use real element heights.
                    const stepHeight = stepEl.offsetHeight + 32; // 32 is the space between elements (8 * 4)
                    progressLine.style.height = `${(index + 1) * stepHeight}px`;
                }
            });
        }

        function showResults(orderId) {
            const orderData = mockOrderData[orderId.toUpperCase()];

            trackingResults.classList.add('hidden');
            trackingError.classList.add('hidden');

            if (orderData) {
                updateTrackingUI(orderData);
                trackingResults.classList.remove('hidden');
                trackingResults.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                trackingError.classList.remove('hidden');
                trackingError.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        trackBtn.addEventListener('click', function() {
            const orderId = orderInput.value.trim();
            if (orderId) {
                showResults(orderId);
            } else {
                alert('Please enter an order ID to track');
            }
        });

        quickSelectBtns.forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-order-id');
                orderInput.value = orderId;
                showResults(orderId);
            });
        });

        orderInput.focus();
    });
</script>

<?php include 'footer.php'; ?>