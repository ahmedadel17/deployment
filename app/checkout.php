<?php include 'header.php'; ?>

<!-- Page Title -->
<div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Complete your purchase</p>
</div>

<!-- Checkout Content -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

    <!-- Left Column - Forms -->
    <div class="lg:col-span-2 space-y-8">

        <!-- Contact Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name" placeholder="John" autocomplete="given-name" class="w-full border rounded px-3 py-2">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="last_name">Last Name</label>
                    <input type="text" id="last_name" name="last_name" placeholder="Doe" autocomplete="family-name" class="w-full border rounded px-3 py-2">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john.doe@example.com" autocomplete="email" class="w-full border rounded px-3 py-2">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567" autocomplete="tel" class="w-full border rounded px-3 py-2">
                </div>
            </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h2>

            <!-- Address Selection Options -->
            <div class="mb-6">
                <div class="flex space-x-4 rtl:space-x-reverse mb-4">
                    <label class="flex items-center">
                        <input type="radio" name="address_option" value="existing" class="text-primary-600" checked onchange="toggleAddressOptions()">
                        <span class="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300">Use Existing Address</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" name="address_option" value="new" class="text-primary-600" onchange="toggleAddressOptions()">
                        <span class="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300">Add New Address</span>
                    </label>
                </div>
            </div>

            <!-- Existing Addresses Section -->
            <div id="existing-addresses" class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Saved Address</label>
                <div class="space-y-3">
                    <?php
                    // Sample existing addresses - replace with actual data from database
                    $existing_addresses = [
                        [
                            'id' => 1,
                            'label' => 'Home',
                            'address' => '123 Main Street',
                            'city' => 'New York',
                            'state' => 'NY',
                            'postal_code' => '10001',
                            'country' => 'United States'
                        ],
                        [
                            'id' => 2,
                            'label' => 'Office',
                            'address' => '456 Business Ave, Suite 200',
                            'city' => 'New York',
                            'state' => 'NY',
                            'postal_code' => '10002',
                            'country' => 'United States'
                        ]
                    ];
                    ?>

                    <?php foreach ($existing_addresses as $addr): ?>
                        <label class="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <input type="radio" name="selected_address" value="<?php echo $addr['id']; ?>" class="text-primary-600 mt-1" onchange="selectExistingAddress(this)">
                            <div class="ms-3">
                                <div class="font-medium text-gray-900 dark:text-white"><?php echo $addr['label']; ?></div>
                                <div class="text-sm text-gray-600 dark:text-gray-400">
                                    <?php echo $addr['address']; ?><br>
                                    <?php echo $addr['city']; ?>, <?php echo $addr['state']; ?> <?php echo $addr['postal_code']; ?><br>
                                    <?php echo $addr['country']; ?>
                                </div>
                            </div>
                        </label>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- New Address Form -->
            <div id="new-address-form" class="hidden">
                <!-- Map for new address -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Location on Map</label>
                    <div id="checkout-map" class="h-64 w-full rounded-lg border border-gray-300"></div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Click on the map or drag the marker to select your address</p>
                </div>

                <!-- Address Form Fields -->
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                        <input type="text" id="new_address" name="new_address" placeholder="123 Main Street" class="w-full border rounded px-3 py-2">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Apartment, suite, etc. (optional)</label>
                        <input type="text" id="new_apartment" name="new_apartment" placeholder="Apt 4B" class="w-full border rounded px-3 py-2">
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                            <input type="text" id="new_city" name="new_city" placeholder="New York" class="w-full border rounded px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                            <input type="text" id="new_state" name="new_state" placeholder="NY" class="w-full border rounded px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                            <input type="text" id="new_postal_code" name="new_postal_code" placeholder="10001" class="w-full border rounded px-3 py-2">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                        <select id="new_country" name="new_country" class="w-full border rounded px-3 py-2">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                        </select>
                    </div>

                    <!-- Hidden lat/lng fields -->
                    <input type="hidden" id="new_lat" name="new_lat">
                    <input type="hidden" id="new_lng" name="new_lng">

                    <!-- Save address option -->
                    <div class="flex items-center">
                        <input type="checkbox" id="save_address" name="save_address" class="text-primary-600">
                        <label for="save_address" class="ms-2 text-sm text-gray-700 dark:text-gray-300">Save this address for future use</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shipping Method -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Method</h2>
            <div class="space-y-3">
                <label class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="shipping" class="text-primary-600" checked>
                    <div class="ms-3 flex-1">
                        <div class="flex justify-between">
                            <span class="font-medium text-gray-900 dark:text-white">Standard Shipping</span>
                            <span class="font-medium text-gray-900 dark:text-white">Free</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">5-7 business days</p>
                    </div>
                </label>

                <label class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="shipping" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex justify-between">
                            <span class="font-medium text-gray-900 dark:text-white">Express Shipping</span>
                            <span class="font-medium text-gray-900 dark:text-white"><span class="icon-riyal-symbol ms-1"></span>12.99</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
                    </div>
                </label>

                <label class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="shipping" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex justify-between">
                            <span class="font-medium text-gray-900 dark:text-white">Overnight Shipping</span>
                            <span class="font-medium text-gray-900 dark:text-white"><span class="icon-riyal-symbol ms-1"></span>24.00</span>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Next business day</p>
                    </div>
                </label>
            </div>
        </div>

        <!-- Payment Information -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h2>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" class="w-full border rounded px-3 py-2">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" class="w-full border rounded px-3 py-2">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                        <input type="text" placeholder="123" class="w-full border rounded px-3 py-2">
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" class="w-full border rounded px-3 py-2">
                </div>
            </div>
        </div>


        <!-- Payment Method -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>

            <div class="space-y-3">
                <!-- Wallet Balance Option -->
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="payment_method" value="wallet" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center me-3">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <span class="font-medium text-gray-900 dark:text-white">Use Wallet Balance</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Available: <span class="font-semibold text-green-600">1,250 SAR</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>

                <!-- Visa -->
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="payment_method" value="visa" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
                                    <img class="rounded-lg" src="assets/images/payment/visa.jpg" alt="">
                                </div>
                                <div>
                                    <span class="font-medium text-gray-900 dark:text-white">Visa</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Credit or Debit Card</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>

                <!-- Mastercard -->
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="payment_method" value="mastercard" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
                                    <img class="rounded-lg" src="assets/images/payment/mastercard.jpg" alt="">
                                </div>
                                <div>
                                    <span class="font-medium text-gray-900 dark:text-white">Mastercard</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Credit or Debit Card</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>

                <!-- MADA -->
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="payment_method" value="mada" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
                                    <img class="rounded-lg" src="assets/images/payment/mada.jpg" alt="">
                                </div>
                                <div>
                                    <span class="font-medium text-gray-900 dark:text-white">MADA</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Saudi Payments Network</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>

                <!-- Tabby -->
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="payment_method" value="tabby" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
                                    <img class="rounded-lg" src="assets/images/payment/tabby.jpg" alt="">
                                </div>
                                <div>
                                    <span class="font-medium text-gray-900 dark:text-white">Tabby</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Pay in 4 installments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>

                <!-- Tamara -->
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    <input type="radio" name="payment_method" value="tamara" class="text-primary-600">
                    <div class="ms-3 flex-1">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 rounded-lg flex items-center justify-center me-3 shadow-md">
                                    <img class="rounded-lg" src="assets/images/payment/tamara.jpg" alt="">
                                </div>
                                <div>
                                    <span class="font-medium text-gray-900 dark:text-white">Tamara</span>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">Buy now, pay later</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </div>

            <!-- Card Details Form (shown when card payment is selected) -->
            <div id="card-details-form" class="hidden mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <h3 class="font-medium text-gray-900 dark:text-white mb-4">Card Details</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" class="w-full border rounded px-3 py-2">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" class="w-full border rounded px-3 py-2">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                            <input type="text" placeholder="123" class="w-full border rounded px-3 py-2">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cardholder Name</label>
                        <input type="text" placeholder="John Doe" class="w-full border rounded px-3 py-2">
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Right Column - Order Summary -->
    <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            <?php
            $order_items = [
                [
                    'title' => 'Mercer 7 Inch Chino Shorts',
                    'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=80&h=80&fit=crop&crop=center',
                    'color' => 'Blue',
                    'size'  => 'M',
                    'qty'   => 1,
                    'price' => '200.00'
                ],
                [
                    'title' => 'Tutu Dress with Sparkles',
                    'image' => 'assets/images/product-19.jpg',
                    'color' => 'Pink',
                    'size'  => 'S',
                    'qty'   => 2,
                    'price' => '150.00'
                ],
                [
                    'title' => 'Embroidered crew neck T-shirt',
                    'image' => 'assets/images/product-1.jpg',
                    'color' => 'Black',
                    'size'  => 'L',
                    'qty'   => 1,
                    'price' => '120.00'
                ],
            ];
            ?>

            <!-- Order Items -->
            <div class="space-y-4 mb-6">
                <?php foreach ($order_items as $item): ?>
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="w-16 h-16 object-cover rounded-md">
                        <div class="flex-1">
                            <h3 class="font-medium text-gray-900 dark:text-white"><?php echo $item['title']; ?></h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400"><?php echo $item['color']; ?>, Size <?php echo $item['size']; ?></p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Qty: <?php echo $item['qty']; ?></p>
                        </div>
                        <div class="text-right">
                            <p class="font-medium text-gray-900 dark:text-white">
                                <span class="icon-riyal-symbol text-xs"></span>
                                <span><?php echo $item['price']; ?></span>
                            </p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Order Totals -->
            <div class="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span class="text-gray-900 dark:text-white">
                        <span class="icon-riyal-symbol text-xs"></span>
                        <span>470.00</span>
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
                            <span>486.00</span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Place Order Button -->
            <a href="confirmation.php" class="w-full mt-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium text-center block">
                Place Order
            </a>

            <!-- Security Notice -->
            <div class="mt-4 flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Secure SSL encrypted checkout
            </div>
        </div>
    </div>
</div>

<!-- Google Maps Script -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJfohIso1D_UllVzMFdpckDQVC5SkuEjk&libraries=places&callback=initCheckoutMap" async defer></script>

<script>
    let checkoutMap;
    let checkoutGeocoder;
    let checkoutMarker;

    // Initialize map for checkout
    function initCheckoutMap() {
        checkoutMap = new google.maps.Map(document.getElementById("checkout-map"), {
            center: {
                lat: 34.052235,
                lng: -118.243683
            }, // Default center
            zoom: 12,
        });

        checkoutGeocoder = new google.maps.Geocoder();

        checkoutMarker = new google.maps.Marker({
            map: checkoutMap,
            position: checkoutMap.getCenter(),
            draggable: true
        });

        // Listen for map clicks
        checkoutMap.addListener("click", (e) => {
            geocodeLatLngCheckout(e.latLng);
            updateCheckoutLatLng(e.latLng);
        });

        // Listen for marker drag
        checkoutMarker.addListener("dragend", () => {
            geocodeLatLngCheckout(checkoutMarker.getPosition());
            updateCheckoutLatLng(checkoutMarker.getPosition());
        });
    }

    function geocodeLatLngCheckout(latLng) {
        checkoutGeocoder.geocode({
            location: latLng
        }, (results, status) => {
            if (status === "OK" && results[0]) {
                checkoutMap.setZoom(16);
                checkoutMarker.setPosition(latLng);
                fillCheckoutFormWithAddress(results[0].address_components);
            }
        });
    }

    function updateCheckoutLatLng(latLng) {
        document.getElementById('new_lat').value = latLng.lat();
        document.getElementById('new_lng').value = latLng.lng();
    }

    function fillCheckoutFormWithAddress(components) {
        // Clear previous form data
        document.getElementById('new_address').value = '';
        document.getElementById('new_city').value = '';
        document.getElementById('new_state').value = '';
        document.getElementById('new_postal_code').value = '';

        let streetNumber = '';
        let route = '';

        for (const component of components) {
            const type = component.types[0];
            switch (type) {
                case 'street_number':
                    streetNumber = component.long_name;
                    break;
                case 'route':
                    route = component.long_name;
                    break;
                case 'locality':
                    document.getElementById('new_city').value = component.long_name;
                    break;
                case 'administrative_area_level_1':
                    document.getElementById('new_state').value = component.short_name;
                    break;
                case 'postal_code':
                    document.getElementById('new_postal_code').value = component.long_name;
                    break;
            }
        }
        document.getElementById('new_address').value = `${streetNumber} ${route}`.trim();
    }

    // Toggle between existing and new address options
    function toggleAddressOptions() {
        const addressOption = document.querySelector('input[name="address_option"]:checked').value;
        const existingAddresses = document.getElementById('existing-addresses');
        const newAddressForm = document.getElementById('new-address-form');

        if (addressOption === 'existing') {
            existingAddresses.classList.remove('hidden');
            newAddressForm.classList.add('hidden');
        } else {
            existingAddresses.classList.add('hidden');
            newAddressForm.classList.remove('hidden');

            // Initialize map when new address form is shown
            setTimeout(() => {
                if (checkoutMap) {
                    google.maps.event.trigger(checkoutMap, 'resize');
                    checkoutMap.setCenter({
                        lat: 34.052235,
                        lng: -118.243683
                    });
                }
            }, 100);
        }
    }

    // Handle existing address selection
    function selectExistingAddress(radio) {
        // You can add logic here to populate shipping details based on selected address
        console.log('Selected address ID:', radio.value);

        // Get the selected address data
        if (existingAddressesData[radio.value]) {
            const selectedAddr = existingAddressesData[radio.value];
            console.log('Selected address data:', selectedAddr);
            // You can populate other form fields or do additional processing here
        }
    }

    // Show/hide card details form based on payment method selection
    document.addEventListener('DOMContentLoaded', function() {
        const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
        const cardDetailsForm = document.getElementById('card-details-form');

        if (paymentMethods.length > 0 && cardDetailsForm) {
            paymentMethods.forEach(method => {
                method.addEventListener('change', function() {
                    const cardMethods = ['visa', 'mastercard', 'mada'];

                    if (cardMethods.includes(this.value)) {
                        cardDetailsForm.classList.remove('hidden');
                    } else {
                        cardDetailsForm.classList.add('hidden');
                    }
                });
            });
        }
    });
</script>

<!-- Separate script block for PHP data -->
<script>
    // Store existing addresses data for form population
    const existingAddressesData = {
        <?php if (isset($existing_addresses) && !empty($existing_addresses)): ?>
            <?php foreach ($existing_addresses as $index => $addr): ?> '<?php echo htmlspecialchars($addr['id']); ?>': {
                    address: '<?php echo htmlspecialchars($addr['address']); ?>',
                    city: '<?php echo htmlspecialchars($addr['city']); ?>',
                    state: '<?php echo htmlspecialchars($addr['state']); ?>',
                    postal_code: '<?php echo htmlspecialchars($addr['postal_code']); ?>',
                    country: '<?php echo htmlspecialchars($addr['country']); ?>'
                }
                <?php echo ($index < count($existing_addresses) - 1) ? ',' : ''; ?>
            <?php endforeach; ?>
        <?php endif; ?>
    };
</script>

<script>
    // Show/hide card details form based on payment method selection
    document.addEventListener('DOMContentLoaded', function() {
        const paymentMethods = document.querySelectorAll('input[name="payment_method"]');
        const cardDetailsForm = document.getElementById('card-details-form');

        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                const cardMethods = ['visa', 'mastercard', 'mada'];

                if (cardMethods.includes(this.value)) {
                    cardDetailsForm.classList.remove('hidden');
                } else {
                    cardDetailsForm.classList.add('hidden');
                }
            });
        });
    });
</script>

<?php include 'footer.php'; ?>