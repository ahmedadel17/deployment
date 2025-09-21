<?php
include 'header.php';
include 'products-data.php';

// Get wishlist items from session/cookie (you can modify this to use database)
$wishlistIds = isset($_SESSION['wishlist']) ? $_SESSION['wishlist'] : [];
if (empty($wishlistIds) && isset($_COOKIE['wishlist'])) {
    $wishlistIds = json_decode($_COOKIE['wishlist'], true) ?: [];
}

$wishlistProducts = [];

// Filter products based on wishlist IDs
foreach ($products as $product) {
    if (in_array($product['id'], $wishlistIds)) {
        $wishlistProducts[] = $product;
    }
}
?>

<!-- Page Title -->
<div class="mb-8 text-center">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">
        <?php echo count($wishlistProducts); ?> items saved for later
    </p>
</div>

<?php if (!empty($wishlistProducts)): ?>
    <!-- Wishlist Actions -->
    <div class="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div class="flex gap-2">
            <button id="selectAll" class="te-btn te-btn-default te-btn-sm">
                Select All
            </button>
            <button id="deselectAll" class="te-btn te-btn-default te-btn-sm" style="display: none;">
                Deselect All
            </button>
        </div>
        <div class="flex gap-2">
            <button id="addSelectedToCart" class="te-btn te-btn-primary te-btn-sm" disabled>
                Add Selected to Cart
            </button>
            <button id="removeSelected" class="te-btn te-btn-danger te-btn-sm" disabled>
                Remove Selected
            </button>
            <button id="clearWishlist" class="te-btn te-btn-default te-btn-sm">
                Clear Wishlist
            </button>
        </div>
    </div>

    <!-- Wishlist Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <?php foreach ($wishlistProducts as $product): ?>
            <div class="wishlist-item product-item w-full h-full lg:bg-white dark:lg:bg-gray-800 rounded-md lg:rounded-lg lg:shadow flex flex-col relative"
                data-product-id="<?php echo $product['id']; ?>"
                data-product-title="<?php echo htmlspecialchars($product['title']); ?>"
                data-product-price="<?php echo $product['price']; ?>"
                data-product-image="<?php echo $product['image']; ?>">

                <!-- Selection Checkbox -->
                <div class="absolute top-3 start-3 z-10">
                    <input type="checkbox"
                        class="wishlist-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        data-product-id="<?php echo $product['id']; ?>">
                </div>

                <!-- Remove Button -->
                <button class="remove-from-wishlist absolute top-3 end-3 z-10 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                    data-product-id="<?php echo $product['id']; ?>"
                    title="Remove from wishlist">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <?php if (!empty($product['image'])): ?>
                    <a href="single.php?id=<?php echo $product['id']; ?>" class="product-thumbnail relative block overflow-hidden rounded-lg lg:rounded-t-lg lg:rounded-b-none group">

                        <!-- Product Badges -->
                        <?php if (!empty($product['badges'])): ?>
                            <div class="product-badges absolute bottom-2 start-2 z-10 flex flex-col gap-1">
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

                        <!-- Thumbnail Main Image -->
                        <img src="<?php echo $product['image']; ?>"
                            alt="<?php echo $product['title']; ?>"
                            fetchpriority="high"
                            decoding="async"
                            width="300" height="320"
                            class="w-full h-full object-cover transition-all duration-500 ease-in-out transform">

                        <!-- Thumbnail Flip Image -->
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
                            <a href="single.php?id=<?php echo $product['id']; ?>" class="line-clamp-2">
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

                    <div class="product-footer mt-auto flex">

                        <!-- Add to Cart -->
                        <button
                            class="product-add-to-cart flex-1 te-btn te-btn-primary flex items-center justify-center gap-2 px-0"
                            aria-label="Add to Cart">
                            <!-- Cart Icon -->
                            <svg class="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                                <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                            </svg>

                            <!-- Check Icon (hidden by default) -->
                            <svg class="icon-check w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>

                            <span>Add to Cart</span>
                        </button><!-- .product-add-to-cart -->

                    </div><!-- .product-footer -->

                </div>
            </div><!-- .product-item -->
        <?php endforeach; ?>
    </div>

    <!-- Continue Shopping -->
    <div class="mt-8 text-center">
        <a href="products.php" class="te-btn te-btn-primary">
            Continue Shopping
        </a>
    </div>

<?php else: ?>
    <!-- Empty Wishlist State -->
    <div class="text-center py-16">
        <div class="mb-6">
            <svg class="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
            </svg>
        </div>
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Save items you love by clicking the heart icon on any product. We'll keep them safe here for you.
        </p>
        <a href="products.php" class="te-btn te-btn-primary">
            Start Shopping
        </a>
    </div>
<?php endif; ?>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const checkboxes = document.querySelectorAll('.wishlist-checkbox');
        const selectAllBtn = document.getElementById('selectAll');
        const deselectAllBtn = document.getElementById('deselectAll');
        const addSelectedBtn = document.getElementById('addSelectedToCart');
        const removeSelectedBtn = document.getElementById('removeSelected');
        const clearWishlistBtn = document.getElementById('clearWishlist');

        // Update button states
        function updateButtonStates() {
            const checkedBoxes = document.querySelectorAll('.wishlist-checkbox:checked');
            const hasSelected = checkedBoxes.length > 0;
            const allSelected = checkedBoxes.length === checkboxes.length && checkboxes.length > 0;

            addSelectedBtn.disabled = !hasSelected;
            removeSelectedBtn.disabled = !hasSelected;

            selectAllBtn.style.display = allSelected ? 'none' : 'inline-block';
            deselectAllBtn.style.display = allSelected ? 'inline-block' : 'none';
        }

        // Checkbox change handlers
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', updateButtonStates);
        });

        // Select all
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', function() {
                checkboxes.forEach(function(checkbox) {
                    checkbox.checked = true;
                });
                updateButtonStates();
            });
        }

        // Deselect all
        if (deselectAllBtn) {
            deselectAllBtn.addEventListener('click', function() {
                checkboxes.forEach(function(checkbox) {
                    checkbox.checked = false;
                });
                updateButtonStates();
            });
        }

        // Add selected to cart
        if (addSelectedBtn) {
            addSelectedBtn.addEventListener('click', function() {
                const selectedIds = [];
                document.querySelectorAll('.wishlist-checkbox:checked').forEach(function(checkbox) {
                    selectedIds.push(checkbox.getAttribute('data-product-id'));
                });

                if (selectedIds.length > 0) {
                    // Add your cart functionality here
                    alert(`Added ${selectedIds.length} items to cart!`);

                    // Optionally remove from wishlist after adding to cart
                    if (confirm('Remove these items from your wishlist?')) {
                        removeFromWishlist(selectedIds);
                    }
                }
            });
        }

        // Remove selected
        if (removeSelectedBtn) {
            removeSelectedBtn.addEventListener('click', function() {
                if (confirm('Remove selected items from your wishlist?')) {
                    const selectedIds = [];
                    document.querySelectorAll('.wishlist-checkbox:checked').forEach(function(checkbox) {
                        selectedIds.push(checkbox.getAttribute('data-product-id'));
                    });
                    removeFromWishlist(selectedIds);
                }
            });
        }

        // Clear entire wishlist
        if (clearWishlistBtn) {
            clearWishlistBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your entire wishlist?')) {
                    const allIds = [];
                    checkboxes.forEach(function(checkbox) {
                        allIds.push(checkbox.getAttribute('data-product-id'));
                    });
                    removeFromWishlist(allIds);
                }
            });
        }

        // Individual remove buttons
        document.querySelectorAll('.remove-from-wishlist').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                if (confirm('Remove this item from your wishlist?')) {
                    removeFromWishlist([productId]);
                }
            });
        });

        // Individual add to cart buttons
        document.querySelectorAll('.add-to-cart-from-wishlist').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');

                // Add your cart functionality here
                this.textContent = 'Added!';
                this.disabled = true;
                this.classList.add('te-btn-success');

                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.disabled = false;
                    this.classList.remove('te-btn-success');
                }, 2000);
            });
        });

        // Remove from wishlist function
        function removeFromWishlist(productIds) {
            // Send AJAX request to remove items
            fetch('wishlist-handler.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'remove',
                        product_ids: productIds
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Remove items from DOM
                        productIds.forEach(function(id) {
                            const item = document.querySelector(`[data-product-id="${id}"]`).closest('.wishlist-item');
                            if (item) {
                                item.remove();
                            }
                        });

                        // Reload page if no items left
                        const remainingItems = document.querySelectorAll('.wishlist-item');
                        if (remainingItems.length === 0) {
                            location.reload();
                        }

                        updateButtonStates();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error removing items from wishlist');
                });
        }

        // Initialize button states
        updateButtonStates();
    });
</script>

<?php include 'footer.php'; ?>