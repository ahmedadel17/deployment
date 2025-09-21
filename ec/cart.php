<?php include 'header.php'; ?>

<!-- Page Title -->
<div class="flex justify-between items-center mb-8">
    <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">3 items in your cart</p>
    </div>
    <button class="text-gray-500 hover:text-red-500 transition-colors text-sm">
        Clear Cart
    </button>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

    <!-- Cart Items -->
    <div class="lg:col-span-2 space-y-4">

        <?php
        $cart_items = [
            [
                'title' => 'Tutu Dress with Sparkles',
                'image' => 'assets/images/product-19.jpg',
                'color' => 'Blue',
                'size' => 'M',
                'qty' => 1,
                'price_old' => '300.00',
                'price' => '200.00',
            ],
            [
                'title' => 'Embroidered crew neck T-shirt',
                'image' => 'assets/images/product-1.jpg',
                'color' => 'Black',
                'size' => 'L',
                'qty' => 1,
                'price_old' => '',
                'price' => '720.00',
                'price_each' => '300.00',
            ],
            [
                'title' => 'Embroidered crew neck T-shirt',
                'image' => 'assets/images/product-3.jpg',
                'color' => 'Blue',
                'size' => 'L',
                'qty' => 2,
                'price_old' => '',
                'price' => '300.00',
                'price_each' => '150.00',
            ],
        ];

        foreach ($cart_items as $item):
        ?>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="md:w-32 md:h-32 w-full h-48">
                        <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="w-full h-full object-cover rounded-md">
                    </div>

                    <div class="flex-1">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-semibold text-gray-900 dark:text-white"><?php echo $item['title']; ?></h3>
                            <button class="text-gray-400 hover:text-red-500 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>

                        <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <span>Color: <?php echo $item['color']; ?></span>
                            <span>Size: <?php echo $item['size']; ?></span>
                        </div>

                        <div class="flex items-center justify-between">
                            <!-- Quantity Controls -->
                            <div class="flex items-center space-x-3">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
                                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                                    <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                                        <button class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">-</button>
                                        <input type="number" value="<?php echo $item['qty']; ?>" min="1" max="10" class="w-16 !rounded-none border-0 focus:outline-none">
                                        <button class="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">+</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Price -->
                            <div class="text-right">
                                <div class="flex items-center space-x-2">
                                    <?php if (!empty($item['price_old'])): ?>
                                        <span class="text-gray-500 dark:text-gray-400 line-through text-sm">
                                            <span class="icon-riyal-symbol"></span>
                                            <span><?php echo $item['price_old']; ?></span>
                                        </span>
                                    <?php endif; ?>
                                    <span class="text-lg font-semibold text-gray-900 dark:text-white">
                                        <span class="icon-riyal-symbol"></span>
                                        <?php echo $item['price']; ?>
                                    </span>
                                </div>
                                <?php if (!empty($item['price_each'])): ?>
                                    <p class="text-xs text-gray-500 dark:text-gray-400"><?php echo $item['price_each']; ?> each</p>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>

        <!-- Continue Shopping Button -->
        <div class="pt-4">
            <a href="#" class="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Continue Shopping
            </a>
        </div>

    </div>

    <!-- Cart Summary -->
    <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

            <!-- Promo Code -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Promo Code</label>
                <div class="flex">
                    <input type="text" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" placeholder="Enter code">
                    <button class="px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">
                        Apply
                    </button>
                </div>
            </div>

            <!-- Summary Details -->
            <div class="space-y-3 mb-6">
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Subtotal (3 items)</span>
                    <span class="text-gray-900 dark:text-white">
                        <span class="icon-riyal-symbol text-xs"></span>
                        <span>920.00</span></span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span class="text-green-600 dark:text-green-400">Free</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600 dark:text-gray-400">Estimated Tax</span>
                    <span class="text-gray-900 dark:text-white">
                        <span class="icon-riyal-symbol text-xs"></span>
                        <span>73.00</span></span>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div class="flex justify-between">
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                        <span class="text-lg font-semibold text-gray-900 dark:text-white">
                            <span class="icon-riyal-symbol"></span>
                            <span>993.00</span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Checkout Button -->
            <a href="checkout.php" class="w-full py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors font-medium mb-3 text-center block">
                Proceed to Checkout
            </a>

            <!-- PayPal Button -->
            <a href="paypal.php" class="w-full py-3 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors font-medium mb-4 text-center block">
                PayPal Express Checkout
            </a>

            <!-- Security Notice -->
            <div class="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Secure checkout guaranteed
            </div>

            <!-- Free Shipping Notice -->
            <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm text-green-700 dark:text-green-300">You qualify for free shipping!</span>
                </div>
            </div>
        </div>
    </div>

</div>

<?php include 'footer.php'; ?>