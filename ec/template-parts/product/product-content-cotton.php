<div
    class="product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col"
    data-product-id="<?php echo $product['id']; ?>"
    data-product-title="<?php echo htmlspecialchars($product['title']); ?>"
    data-product-price="<?php echo $product['price']; ?>"
    data-product-image="<?php echo $product['image']; ?>">

    <?php if (!empty($product['image'])): ?>
        <a href="single.php?id=<?php echo $product['id']; ?>" class="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">

            <!-- Product Badges -->
            <?php if (!empty($product['badges'])): ?>
                <div class="product-badges absolute top-2 start-2 z-10 flex flex-col gap-1">
                    <?php foreach ($product['badges'] as $badge): ?>
                        <?php
                        $badgeClasses = [
                            'new' => 'bg-green-500/20 text-green-500',
                            'sale' => 'bg-red-500/20 text-red-500',
                            'bestseller' => 'bg-blue-500/20 text-blue-500',
                            'limited' => 'bg-purple-500/20 text-purple-500',
                            'hot' => 'bg-orange-500/20 text-orange-500',
                        ];
                        $badgeClass = $badgeClasses[$badge['type']] ?? 'bg-gray-500 text-white';
                        ?>
                        <span class="product-badge px-2 py-1 text-xs font-semibold rounded-full <?php echo $badgeClass; ?>">
                            <?php echo htmlspecialchars($badge['text']); ?>
                        </span>
                    <?php endforeach; ?>
                </div><!-- .product-badges -->
            <?php endif; ?>

            <!-- Hover Buttons - Center of Image -->
            <div class="product-hover-btns absolute inset-0 pointer-events-auto flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-30 z-20 flex gap-1">

                <!-- Compare Button -->
                <button class="compare-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-all duration-200 flex items-center justify-center [&.active]:bg-primary-300 [&.active]:text-white"
                    data-product-id="<?php echo $product['id']; ?>"
                    title="Add to Compare">
                    <svg class="w-4 h-4 lg:w-5 lg:h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                        <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                    </svg>
                </button><!-- .compare-btn -->

                <!-- Quick View Button -->
                <button class="quick-view-btn w-8 h-8 lg:w-10 lg:h-10 bg-white text-gray-700 rounded-full shadow-lg hover:bg-primary-300 hover:text-white transition-colors duration-200 flex items-center justify-center"
                    title="Quick View">
                    <svg class="w-4 h-4 lg:w-5 lg:h-5" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                </button><!-- .quick-view-btn -->

            </div><!-- .product-hover-btns -->

            <!-- Thumbanil Main Image -->
            <img src="<?php echo $product['image']; ?>"
                alt="<?php echo $product['title']; ?>"
                fetchpriority="high"
                decoding="async"
                width="300" height="320"
                class="w-full h-full object-cover transition-all duration-500 ease-in-out transform">

            <!-- Thumbanil Flip Image -->
            <?php if (!empty($product['hover'])): ?>
                <img src="<?php echo $product['hover']; ?>"
                    alt="<?php echo $product['title']; ?> hover image"
                    class="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            <?php endif; ?>

        </a>
    <?php else: ?>
        <div class="product-thumbnail-placeholder bg-gray-200 dark:bg-gray-700 h-full object-cover rounded-lg lg:rounded-t-lg lg:rounded-b-none flex items-center justify-center text-gray-400 dark:text-gray-400 text-xs text-center">
            <div class="text-center">
                <svg class="w-8 h-8 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                    strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M16 5h6"></path>
                    <path d="M19 2v6"></path>
                    <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"></path>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    <circle cx="9" cy="9" r="2"></circle>
                </svg>
                <div class="mt-2">Image Not Set</div>
            </div>
        </div><!-- .product-thumbnail-placeholder -->
    <?php endif; ?>

    <div class="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">

        <div class="product-body space-y-2 mb-5">

            <!-- Category -->
            <?php if (!empty($product['category'])): ?>
                <p class="product-category text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    <?php echo htmlspecialchars($product['category']); ?>
                </p>
            <?php endif; ?>

            <h3 class="product-title font-semibold text-sm lg:text-base">
                <a href="single.php" class="line-clamp-2">
                    <?php echo $product['title']; ?>
                </a>
            </h3><!-- .product-title -->

            <div class="product-price flex items-center gap-1">
                <?php if (!empty($product['old_price'])): ?>
                    <p class="text-gray-500 dark:text-gray-300 line-through text-sm flex items-center gap-1">
                        <span class="icon-riyal-symbol"></span>
                        <?php echo $product['old_price']; ?>
                    </p>
                <?php endif; ?>
                <p class="text-sm lg:text-base font-semibold text-secondary-600 flex items-center gap-1">
                    <span class="icon-riyal-symbol"></span>
                    <?php echo $product['price']; ?>
                </p>
            </div><!-- .product-price -->

            <!-- Colors & Sizes -->
            <?php if (!empty($product['colors']) || !empty($product['sizes'])): ?>
                <div class="product-options space-y-4 !mt-4">

                    <!-- Colors -->
                    <?php if (!empty($product['colors'])): ?>
                        <div class="product-colors">
                            <div class="flex flex-wrap gap-1">
                                <?php foreach (array_slice($product['colors'], 0, 4) as $color): ?>
                                    <button class="color-option"
                                        style="background-color: <?php echo $color; ?>;"
                                        data-color="<?php echo $color; ?>"
                                        title="<?php echo ucfirst($color); ?>"
                                        aria-label="Select color <?php echo $color; ?>">
                                        <span class="sr-only"><?php echo ucfirst($color); ?></span>
                                    </button>
                                <?php endforeach; ?>
                                <?php if (count($product['colors']) > 4): ?>
                                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">+<?php echo count($product['colors']) - 4; ?></span>
                                <?php endif; ?>
                            </div>
                        </div><!-- .product-colors -->
                    <?php endif; ?>

                    <!-- Sizes -->
                    <?php if (!empty($product['sizes'])): ?>
                        <div class="product-sizes">
                            <div class="flex flex-wrap gap-1 items-end">
                                <?php foreach (array_slice($product['sizes'], 0, 4) as $size): ?>
                                    <button class="size-option" data-size="<?php echo $size; ?>" aria-label="Select size <?php echo $size; ?>">
                                        <?php echo $size; ?>
                                    </button>
                                <?php endforeach; ?>
                                <?php if (count($product['sizes']) > 4): ?>
                                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-1">+<?php echo count($product['sizes']) - 4; ?></span>
                                <?php endif; ?>
                            </div>
                        </div><!-- .product-sizes -->
                    <?php endif; ?>

                </div>
            <?php endif; ?>

        </div><!-- .product-body -->

        <div class="product-footer mt-auto flex gap-1 lg:gap-2 items-stretch justify-between">

            <!-- Add to Cart -->
            <button
                class="product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0"
                aria-label="Add to Cart">
                <!-- Cart Icon -->
                <svg class="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                    <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                </svg>
                <span class="hidden lg:block">أضف إلى السلة</span>
            </button><!-- .product-add-to-cart -->

            <!-- Add to Wishlist -->
            <button
                class="product-add-to-wishlist flex items-center justify-center p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out w-10"
                aria-label="Add to Wishlist">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
            </button><!-- .product-add-to-wishlist -->

        </div><!-- .product-footer -->

    </div>
</div><!-- .product-item -->