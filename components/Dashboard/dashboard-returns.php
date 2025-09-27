<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <!-- Return Request Form -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Return Item</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">Request a return for your purchased items</p>
            </div>
            <div class="p-6">
                <form class="space-y-6">
                    <!-- Order Selection -->
                    <div>
                        <label for="orderSelect" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Select Order
                        </label>
                        <select id="orderSelect" name="order_id" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                            <option value="">Choose an order to return items from</option>
                            <option value="ORD-2024-001234">ORD-2024-001234 - September 1, 2025 (Delivered)</option>
                            <option value="ORD-2024-001233">ORD-2024-001233 - August 28, 2025 (Delivered)</option>
                            <option value="ORD-2024-001231">ORD-2024-001231 - August 20, 2025 (Delivered)</option>
                        </select>
                    </div>

                    <!-- Order Items (shown when order is selected) -->
                    <div id="orderItems" class="hidden space-y-4">
                        <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Select Items to Return</h3>

                            <!-- Item 1 -->
                            <div class="flex items-start space-x-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg mb-4">
                                <input type="checkbox" id="item1" name="items[]" value="item1" class="mt-1 h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src="assets/images/product-1.jpg" alt="Product" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <label for="item1" class="block font-medium text-gray-900 dark:text-white cursor-pointer">
                                        Straight-leg jeans
                                    </label>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Size: M, Color: Blue</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 1</p>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                        <span class="icon-riyal-symbol text-xs"></span>
                                        65.00
                                    </p>
                                </div>
                            </div>

                            <!-- Item 2 -->
                            <div class="flex items-start space-x-4 p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                                <input type="checkbox" id="item2" name="items[]" value="item2" class="mt-1 h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src="assets/images/product-2.jpg" alt="Product" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1">
                                    <label for="item2" class="block font-medium text-gray-900 dark:text-white cursor-pointer">
                                        Cotton T-shirt
                                    </label>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Size: L, Color: White</p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Quantity: 2</p>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                        <span class="icon-riyal-symbol text-xs"></span>
                                        130.00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Return Reason -->
                    <div id="returnDetails" class="hidden space-y-6">
                        <div>
                            <label for="returnReason" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Reason for Return <span class="text-red-500">*</span>
                            </label>
                            <select id="returnReason" name="return_reason" required class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                                <option value="">Select a reason</option>
                                <option value="defective">Item is defective/damaged</option>
                                <option value="wrong_item">Wrong item received</option>
                                <option value="wrong_size">Wrong size/color</option>
                                <option value="not_as_described">Item not as described</option>
                                <option value="quality_issues">Quality not as expected</option>
                                <option value="changed_mind">Changed my mind</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <!-- Return Type -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Return Type <span class="text-red-500">*</span>
                            </label>
                            <div class="space-y-3">
                                <label class="flex items-center">
                                    <input type="radio" name="return_type" value="refund" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300">
                                    <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                        <span class="font-medium">Refund</span> - Get your money back
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="return_type" value="exchange" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300">
                                    <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                        <span class="font-medium">Exchange</span> - Replace with different size/color
                                    </span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="return_type" value="store_credit" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300">
                                    <span class="ml-3 text-sm text-gray-700 dark:text-gray-300">
                                        <span class="font-medium">Store Credit</span> - Credit to use on future purchases
                                    </span>
                                </label>
                            </div>
                        </div>

                        <!-- Additional Comments -->
                        <div>
                            <label for="comments" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Additional Comments
                            </label>
                            <textarea id="comments" name="comments" rows="4"
                                placeholder="Please provide any additional details about your return..."
                                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white resize-none"></textarea>
                        </div>

                        <!-- Photo Upload -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Upload Photos (Optional)
                            </label>
                            <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div class="mt-4">
                                    <label for="photos" class="cursor-pointer">
                                        <span class="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                                            Click to upload photos
                                        </span>
                                        <span class="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG up to 10MB each
                                        </span>
                                    </label>
                                    <input id="photos" name="photos[]" type="file" multiple accept="image/*" class="sr-only">
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="flex justify-end">
                            <button type="submit" class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                                Submit Return Request
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- Return Policy -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Return Policy</h2>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Return Window</h3>
                        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-green-500 me-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                30 days from delivery date
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-green-500 me-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                Items must be in original condition
                            </li>
                            <li class="flex items-start">
                                <svg class="w-5 h-5 text-green-500 me-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                Tags and packaging included
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Return Process</h3>
                        <ol class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li class="flex items-start">
                                <span class="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">1</span>
                                Submit return request
                            </li>
                            <li class="flex items-start">
                                <span class="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">2</span>
                                Receive return label via email
                            </li>
                            <li class="flex items-start">
                                <span class="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">3</span>
                                Package and ship items back
                            </li>
                            <li class="flex items-start">
                                <span class="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center me-2 mt-0.5 flex-shrink-0">4</span>
                                Refund processed within 5-7 days
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Active Returns -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">My Return Requests</h2>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <!-- Return Request 1 -->
                    <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div>
                                <h3 class="font-medium text-gray-900 dark:text-white">Return Request #RET-2024-001</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Order #ORD-2024-001230 - Requested on August 20, 2025</p>
                            </div>
                            <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-medium rounded-full mt-2 sm:mt-0">
                                Processing
                            </span>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                <img src="assets/images/product-3.jpg" alt="Product" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1">
                                <p class="font-medium text-gray-900 dark:text-white">Denim Jacket</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Reason: Wrong size received</p>
                            </div>
                            <div class="text-right">
                                <p class="font-medium text-gray-900 dark:text-white">
                                    <span class="icon-riyal-symbol text-xs"></span>
                                    89.00
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Exchange</p>
                            </div>
                        </div>
                    </div>

                    <!-- Return Request 2 -->
                    <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                            <div>
                                <h3 class="font-medium text-gray-900 dark:text-white">Return Request #RET-2024-002</h3>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Order #ORD-2024-001229 - Requested on August 15, 2025</p>
                            </div>
                            <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full mt-2 sm:mt-0">
                                Completed
                            </span>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                                <img src="assets/images/product-4.jpg" alt="Product" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1">
                                <p class="font-medium text-gray-900 dark:text-white">Sneakers</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Reason: Defective item</p>
                            </div>
                            <div class="text-right">
                                <p class="font-medium text-gray-900 dark:text-white">
                                    <span class="icon-riyal-symbol text-xs"></span>
                                    120.00
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">Refund</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const orderSelect = document.getElementById('orderSelect');
        const orderItems = document.getElementById('orderItems');
        const returnDetails = document.getElementById('returnDetails');
        const itemCheckboxes = document.querySelectorAll('input[name="items[]"]');

        // Show order items when order is selected
        orderSelect.addEventListener('change', function() {
            if (this.value) {
                orderItems.classList.remove('hidden');
            } else {
                orderItems.classList.add('hidden');
                returnDetails.classList.add('hidden');
                itemCheckboxes.forEach(cb => cb.checked = false);
            }
        });

        // Show return details when items are selected
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const anyChecked = Array.from(itemCheckboxes).some(cb => cb.checked);
                if (anyChecked) {
                    returnDetails.classList.remove('hidden');
                } else {
                    returnDetails.classList.add('hidden');
                }
            });
        });

        // Handle form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();

            const selectedOrder = orderSelect.value;
            const selectedItems = Array.from(itemCheckboxes).filter(cb => cb.checked);
            const returnReason = document.getElementById('returnReason').value;
            const returnType = document.querySelector('input[name="return_type"]:checked');

            if (!selectedOrder) {
                alert('Please select an order');
                return;
            }

            if (selectedItems.length === 0) {
                alert('Please select at least one item to return');
                return;
            }

            if (!returnReason) {
                alert('Please select a return reason');
                return;
            }

            if (!returnType) {
                alert('Please select a return type');
                return;
            }

            // Here you would normally submit the form data to your backend
            alert('Return request submitted successfully! You will receive a confirmation email shortly.');
        });

        // Handle file upload display
        document.getElementById('photos').addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            const uploadArea = e.target.closest('.border-dashed');

            if (files.length > 0) {
                const fileNames = files.map(f => f.name).join(', ');
                const fileInfo = document.createElement('div');
                fileInfo.className = 'mt-2 text-sm text-primary-600 dark:text-primary-400';
                fileInfo.textContent = `${files.length} file(s) selected: ${fileNames}`;

                // Remove any existing file info
                const existingInfo = uploadArea.querySelector('.mt-2.text-sm.text-primary-600, .mt-2.text-sm.text-primary-400');
                if (existingInfo) {
                    existingInfo.remove();
                }

                uploadArea.appendChild(fileInfo);
                uploadArea.classList.add('border-primary-500', 'bg-primary-50', 'dark:bg-primary-900/20');
            }
        });
    });
</script>

<?php include 'footer.php'; ?>