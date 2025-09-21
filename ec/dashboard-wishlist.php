<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
            </div>
            <div class="p-6">

                <?php
                $wishlist_items = [
                    [
                        'title' => 'Straight-leg jeans',
                        'image' => 'assets/images/product-1.jpg',
                        'price' => '65.00'
                    ],
                    [
                        'title' => 'Cotton T-shirt',
                        'image' => 'assets/images/product-2.jpg',
                        'price' => '65.00'
                    ],

                    [
                        'title' => 'Straight-leg jeans',
                        'image' => 'assets/images/product-3.jpg',
                        'price' => '65.00'
                    ],
                    [
                        'title' => 'Cotton T-shirt',
                        'image' => 'assets/images/product-4.jpg',
                        'price' => '65.00'
                    ],

                    [
                        'title' => 'Straight-leg jeans',
                        'image' => 'assets/images/product-5.jpg',
                        'price' => '65.00'
                    ],
                    [
                        'title' => 'Cotton T-shirt',
                        'image' => 'assets/images/product-6.jpg',
                        'price' => '65.00'
                    ],

                ];
                ?>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <?php foreach ($wishlist_items as $item): ?>
                        <div class="product-wished group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <!-- Remove button -->
                            <button class="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>

                            <!-- Product image -->
                            <div class="aspect-square bg-gray-100 dark:bg-gray-600 rounded-lg mb-4 overflow-hidden">
                                <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="w-full h-full object-cover">
                            </div>

                            <!-- Product info -->
                            <p class="text-md font-medium text-gray-900 dark:text-white"><?php echo $item['title']; ?></p>

                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                <span class="icon-riyal-symbol text-xs"></span>
                                <span><?php echo $item['price']; ?></span>
                            </p>

                            <!-- Add to cart -->
                            <button class="product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 w-full mt-4">
                                <svg class="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                                    <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                                </svg>
                                <svg class="icon-check w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                                <span class="hidden lg:block">Add to Cart</span>
                            </button>
                        </div>
                    <?php endforeach; ?>
                </div>

            </div>
        </div>

    </div>
</div>

<?php include 'footer.php'; ?>