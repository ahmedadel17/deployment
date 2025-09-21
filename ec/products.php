<?php include 'header.php'; ?>

<div class="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-4 gap-8">

    <!-- Sidebar Filters -->
    <div class="lg:col-span-1 hidden xl:block">
        <div class="sticky top-8 space-y-6">

            <!-- Price Widget -->
            <?php include 'template-parts/product/widgets/widget-price.php'; ?>

            <!-- Category Widget -->
            <?php include 'template-parts/product/widgets/widget-category.php'; ?>

            <!-- Variable/Other Filters -->
            <?php include 'template-parts/product/widgets/widget-variable.php'; ?>

        </div>
    </div>

    <!-- Main Content Area -->
    <div class="xl:col-span-3">
        <div class="space-y-6">

            <!-- Product Header -->
            <div class="flex items-end justify-between mb-6 space-x-4 rtl:space-x-reverse">
                <!-- Title -->
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                    Our Products
                </h2>

                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <!-- Order Select -->
                    <form method="GET" class="flex items-center space-x-2 rtl:space-x-reverse">
                        <label for="order" class="sr-only">Sort by:</label>
                        <select id="order" name="order">
                            <option value="default" <?= ($_GET['order'] ?? '') == 'default' ? 'selected' : '' ?>>Default</option>
                            <option value="price_asc" <?= ($_GET['order'] ?? '') == 'price_asc' ? 'selected' : '' ?>>Price: Low to High</option>
                            <option value="price_desc" <?= ($_GET['order'] ?? '') == 'price_desc' ? 'selected' : '' ?>>Price: High to Low</option>
                            <option value="newest" <?= ($_GET['order'] ?? '') == 'newest' ? 'selected' : '' ?>>Newest</option>
                        </select>
                    </form>

                    <!-- Products Per Page / Grid Columns Select -->
                    <form method="GET" class="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
                        <label for="per_page" class="sr-only">Products per page / grid columns:</label>
                        <select id="per_page" name="per_page" class="">
                            <option value="6" <?php if (($_GET['per_page'] ?? '9') == '6') {
                                                    echo 'selected';
                                                } ?>>2 Columns</option>
                            <option value="9" <?php if (($_GET['per_page'] ?? '9') == '9') {
                                                    echo 'selected';
                                                } ?>>3 Columns</option>
                            <option value="12" <?php if (($_GET['per_page'] ?? '9') == '12') {
                                                    echo 'selected';
                                                } ?>>4 Columns</option>
                        </select>
                    </form>

                </div>
            </div>

            <div class="te-products">
                <div id="products-grid" class="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    <?php
                    include 'products-data.php';
                    render_products($products);
                    ?>
                </div>
            </div>

            <!-- Pagination -->
            <?php include 'template-parts/product/product-pagination.php'; ?>

        </div>
    </div>

</div>

<?php include 'footer.php'; ?>

<script>
    const gridSelect = document.getElementById('per_page');
    const gridContainer = document.getElementById('products-grid');

    function updateGridColumns(cols) {
        // Remove old lg:grid-cols-* classes
        gridContainer.classList.remove('lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4');
        gridContainer.classList.remove('lg:gap-4', 'lg:gap-6');

        // Map per_page value to columns
        let lgCols = 3; // default
        let lgGap = 'lg:gap-6'; // default gap
        if (cols == '6') {
            lgCols = 2;
            lgGap = 'lg:gap-6';
        } else if (cols == '9') {
            lgCols = 3;
            lgGap = 'lg:gap-6';
        } else if (cols == '12') {
            lgCols = 4;
            lgGap = 'lg:gap-4';
        }

        // Add new classes
        gridContainer.classList.add('lg:grid-cols-' + lgCols);
        gridContainer.classList.add(lgGap);
    }

    // Initial load
    updateGridColumns(gridSelect.value);

    // On change
    gridSelect.addEventListener('change', function() {
        updateGridColumns(gridSelect.value);
    });
</script>