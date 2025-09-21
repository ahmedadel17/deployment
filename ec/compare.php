<?php
include 'header.php';
include 'products-data.php';

// Get product IDs from URL parameter
$productIds = isset($_GET['products']) ? explode(',', $_GET['products']) : [];
$compareProducts = [];

// Filter products based on IDs
foreach ($products as $product) {
    if (in_array($product['id'], $productIds)) {
        $compareProducts[] = $product;
    }
}

// Redirect if no products to compare
if (empty($compareProducts)) {
    header('Location: products.php');
    exit;
}
?>

<!-- Page Title -->
<div class="mb-12 text-center">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Compare Products</h1>
    <p class="text-gray-600 dark:text-gray-400 mt-2">Compare up to 4 products side by side</p>
</div>

<!-- Compare Table -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase tracking-wider w-48">
                        Features
                    </th>
                    <?php foreach ($compareProducts as $product): ?>
                        <th class="px-6 py-4 text-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300 uppercase tracking-wider min-w-64">
                            Product <?php echo $product['id']; ?>
                        </th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">

                <!-- Product Images -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                        Product Image
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <div class="flex justify-center">
                                <?php if (!empty($product['image'])): ?>
                                    <img src="<?php echo $product['image']; ?>"
                                        alt="<?php echo htmlspecialchars($product['title']); ?>"
                                        class="w-32 h-32 object-cover rounded-lg">
                                <?php else: ?>
                                    <div class="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Product Names -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                        Product Name
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                                <?php echo htmlspecialchars($product['title']); ?>
                            </h3>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Category -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                        Category
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                            <?php echo !empty($product['category']) ? htmlspecialchars($product['category']) : 'N/A'; ?>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Price -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                        Price
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <div class="space-y-1">
                                <p class="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    $<?php echo $product['price']; ?>
                                </p>
                                <?php if (!empty($product['old_price'])): ?>
                                    <p class="text-sm text-gray-500 line-through">
                                        $<?php echo $product['old_price']; ?>
                                    </p>
                                    <?php
                                    $discount = round((($product['old_price'] - $product['price']) / $product['old_price']) * 100);
                                    ?>
                                    <span class="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                                        <?php echo $discount; ?>% OFF
                                    </span>
                                <?php endif; ?>
                            </div>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Available Colors -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                        Available Colors
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <?php if (!empty($product['colors'])): ?>
                                <div class="flex justify-center gap-1 flex-wrap">
                                    <?php foreach ($product['colors'] as $color): ?>
                                        <div class="w-6 h-6 rounded-full border-2 border-gray-300"
                                            style="background-color: <?php echo $color; ?>;"
                                            title="<?php echo ucfirst($color); ?>">
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <?php echo count($product['colors']); ?> colors
                                </p>
                            <?php else: ?>
                                <span class="text-gray-400">No colors</span>
                            <?php endif; ?>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Available Sizes -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                        Available Sizes
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <?php if (!empty($product['sizes'])): ?>
                                <div class="flex justify-center gap-1 flex-wrap">
                                    <?php foreach ($product['sizes'] as $size): ?>
                                        <span class="px-2 py-1 text-xs border border-gray-300 rounded">
                                            <?php echo $size; ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                                <p class="text-xs text-gray-500 mt-1">
                                    <?php echo count($product['sizes']); ?> sizes
                                </p>
                            <?php else: ?>
                                <span class="text-gray-400">No sizes</span>
                            <?php endif; ?>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Badges -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                        Special Offers
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <?php if (!empty($product['badges'])): ?>
                                <div class="flex justify-center gap-1 flex-wrap">
                                    <?php foreach ($product['badges'] as $badge): ?>
                                        <?php
                                        $badgeClasses = [
                                            'new' => 'bg-green-100 text-green-800',
                                            'sale' => 'bg-red-100 text-red-800',
                                            'bestseller' => 'bg-blue-100 text-blue-800',
                                            'limited' => 'bg-purple-100 text-purple-800',
                                            'hot' => 'bg-orange-100 text-orange-800',
                                        ];
                                        $badgeClass = $badgeClasses[$badge['type']] ?? 'bg-gray-100 text-gray-800';
                                        ?>
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full <?php echo $badgeClass; ?>">
                                            <?php echo htmlspecialchars($badge['text']); ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                            <?php else: ?>
                                <span class="text-gray-400">No special offers</span>
                            <?php endif; ?>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Actions -->
                <tr class="bg-gray-50 dark:bg-gray-700">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600">
                        Actions
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <div class="space-y-2">
                                <button class="product-add-to-cart te-btn te-btn-primary te-btn-sm">
                                    Add to Cart
                                </button>
                                <a href="single.php?id=<?php echo $product['id']; ?>"
                                    class="te-btn te-btn-default te-btn-sm">
                                    View Details
                                </a>
                            </div>
                        </td>
                    <?php endforeach; ?>
                </tr>

                <!-- Remove from Compare -->
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                        Remove
                    </td>
                    <?php foreach ($compareProducts as $product): ?>
                        <td class="px-6 py-4 text-center">
                            <button class="remove-product text-red-600 hover:text-red-800 transition-colors"
                                data-product-id="<?php echo $product['id']; ?>"
                                title="Remove from comparison">
                                <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </td>
                    <?php endforeach; ?>
                </tr>

            </tbody>
        </table>
    </div>
</div>

<!-- Empty State (if no products) -->
<?php if (empty($compareProducts)): ?>
    <div class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No products to compare</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Select products from the catalog to start comparing.</p>
        <a href="products.php" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse Products
        </a>
    </div>
<?php endif; ?>

<!-- Action Buttons -->
<?php if (!empty($compareProducts)): ?>
    <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button id="clearAll" class="te-btn te-btn-default">
            Clear All
        </button>
        <a href="products.php" class="te-btn te-btn-primary">
            Continue Shopping
        </a>
    </div>
<?php endif; ?>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Remove individual product from comparison
        const removeButtons = document.querySelectorAll('.remove-product');

        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                removeProductFromCompare(productId);
            });
        });

        // Clear all products
        const clearAllBtn = document.getElementById('clearAll');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear all products from comparison?')) {
                    clearAllProducts();
                }
            });
        }

        function removeProductFromCompare(productId) {
            // Get current product IDs from URL
            const urlParams = new URLSearchParams(window.location.search);
            let productIds = urlParams.get('products') ? urlParams.get('products').split(',') : [];

            // Remove the product ID
            productIds = productIds.filter(function(id) {
                return id !== productId;
            });

            // Redirect with updated product list
            if (productIds.length > 0) {
                window.location.href = 'compare.php?products=' + productIds.join(',');
            } else {
                window.location.href = 'products.php';
            }
        }

        function clearAllProducts() {
            window.location.href = 'products.php';
        }

        // Add to cart functionality (you can customize this)
        const addToCartButtons = document.querySelectorAll('button[class*="bg-blue-600"]');
        addToCartButtons.forEach(function(button) {
            if (button.textContent.trim() === 'Add to Cart') {
                button.addEventListener('click', function() {
                    // Add your cart functionality here
                    alert('Product added to cart!');
                });
            }
        });
    });
</script>

<?php include 'footer.php'; ?>