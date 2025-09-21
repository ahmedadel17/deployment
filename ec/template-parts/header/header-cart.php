<div class="te-navbar-dropdown">
    <div class="header-cart relative flex items-center gap-3 cursor-pointer" data-dropdown="cart">
        <div class="cart-icon">
            <div class="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">

                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                    <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                </svg>

                <!-- Badge -->
                <span class="header-cart-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    0
                </span>

            </div>

        </div>

        <div class="grid">
            <span class="text-gray-600 dark:text-gray-400 text-sm">My Cart</span>
            <span class="text-gray-900 dark:text-gray-100 text-sm font-medium">0</span>
        </div>

    </div>

    <div class="cart-drop-down te-navbar-dropdown-content px-4 py-4 bg-white dark:bg-gray-800 max-w-[200px]">

        <div class="text-sm font-medium text-gray-900 dark:text-white mb-3">Shopping Cart</div>

        <?php
        $cart_items = [
            [
                'title' => 'Cute short-sleeved T-shirt with brand logo',
                'qty' => 1,
                'price' => '99.00',
                'image' => 'assets/images/product-1.jpg',
            ],
            [
                'title' => 'Embroidered crew neck T-shirt',
                'qty' => 2,
                'price' => '120.00',
                'image' => 'assets/images/product-2.jpg',
            ],
            [
                'title' => 'Straight-leg jeans',
                'qty' => 1,
                'price' => '150.00',
                'image' => 'assets/images/product-3.jpg',
            ],
        ];

        foreach ($cart_items as $item):
        ?>
            <div class="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
                <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
                    <?php if (!empty($item['image'])): ?>
                        <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="w-full h-full object-cover rounded-md">
                    <?php endif; ?>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
                        <a href="#" class="hover:text-primary-400"><?php echo $item['title']; ?></a>
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Qty: <?php echo $item['qty']; ?> ×
                        <span class="icon-riyal-symbol text-xs"></span>
                        <span><?php echo $item['price']; ?></span>
                    </div>
                </div>
                <button class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        <?php endforeach; ?>

        <!-- Cart Total -->
        <div class="mt-6">
            <div class="flex justify-between items-center font-medium mb-3 text-gray-900 dark:text-white">
                <span>Total:</span>
                <span><span class="icon-riyal-symbol mr-1"></span>219.00</span>
            </div>

            <div class="grid gap-2">
                <a href="cart.php" class="w-full te-btn te-btn-default text-center block">
                    View Cart
                </a>
                <a href="checkout.php" class="w-full te-btn te-btn-primary text-center block">
                    Checkout
                </a>
            </div>

        </div>
    </div>


</div>