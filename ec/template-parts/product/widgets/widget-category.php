<?php
$current_category = $_GET['category'] ?? '';

$categories = [
    [
        'name' => 'Men',
        'count' => 45,
        'slug' => 'men',
        'sub' => [
            ['name' => 'T-Shirts', 'slug' => 't-shirts', 'count' => 12],
            ['name' => 'Jeans', 'slug' => 'jeans', 'count' => 18],
            ['name' => 'Shirts', 'slug' => 'shirts', 'count' => 15],
        ],
    ],
    [
        'name' => 'Women',
        'count' => 31,
        'slug' => 'women',
        'sub' => [
            ['name' => 'T-Shirts', 'slug' => 't-shirts', 'count' => 6],
            ['name' => 'Jeans', 'slug' => 'jeans', 'count' => 88],
            ['name' => 'Shirts', 'slug' => 'shirts', 'count' => 120],
        ],
    ],
    [
        'name' => 'Kids',
        'count' => 69,
        'slug' => 'kid',
        'sub' => [
            ['name' => 'T-Shirts', 'slug' => 't-shirts', 'count' => 45],
            ['name' => 'Jeans', 'slug' => 'jeans', 'count' => 21],
            ['name' => 'Shirts', 'slug' => 'shirts', 'count' => 10],
        ],
    ],
    [
        'name' => 'Accessories',
        'count' => 23,
        'slug' => 'accessories',
        'sub' => [
            ['name' => 'Bags', 'slug' => 'bags', 'count' => 8],
            ['name' => 'Belts', 'slug' => 'belts', 'count' => 9],
            ['name' => 'Hats', 'slug' => 'hats', 'count' => 6],
        ],
    ],

    ['name' => 'Sports', 'count' => 22, 'slug' => 'sports'],
];
?>

<div class="category-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
    </div>

    <div class="space-y-1">
        <?php foreach ($categories as $cat):
            $has_sub = isset($cat['sub']) && is_array($cat['sub']);
            $is_active = ($current_category === $cat['slug']) ? 'bg-gray-50 dark:bg-gray-700' : '';
        ?>
            <div class="category-group">
                <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer <?= $is_active ?>" data-toggle="<?= $cat['slug'] ?>">
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"><?= $cat['name'] ?></span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"><?= $cat['count'] ?></span>
                        <?php if ($has_sub): ?>
                            <svg class="w-4 h-4 text-gray-400 transition-transform duration-200 transform rtl:scale-x-[-1] expand-icon"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if ($has_sub): ?>
                    <div class="subcategories pl-6 space-y-1 max-h-0 overflow-hidden transition-all duration-300" id="sub-<?= $cat['slug'] ?>">
                        <?php foreach ($cat['sub'] as $sub):
                            $sub_active = ($current_category === $sub['slug']) ? 'bg-gray-50 dark:bg-gray-700' : '';
                        ?>
                            <div class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md cursor-pointer <?= $sub_active ?>" data-category="<?= $sub['slug'] ?>">
                                <div class="flex items-center gap-3">
                                    <span class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"><?= $sub['name'] ?></span>
                                </div>
                                <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"><?= $sub['count'] ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const toggles = document.querySelectorAll('[data-toggle]');
        const categoryItems = document.querySelectorAll('[data-category]');

        // Toggle subcategories
        toggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const targetId = 'sub-' + this.dataset.toggle;
                const submenu = document.getElementById(targetId);
                const icon = this.querySelector('.expand-icon');

                if (submenu.style.maxHeight === '0px' || submenu.style.maxHeight === '') {
                    submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    icon.style.transform = 'rotate(90deg)';
                } else {
                    submenu.style.maxHeight = '0px';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });

        // Handle category clicks - navigate to category page
        categoryItems.forEach(item => {
            item.addEventListener('click', function() {
                const category = this.dataset.category;
                const categoryName = this.querySelector('span').textContent;

                // You can modify this URL structure to match your routing
                const categoryUrl = `products.php?category=${category}`;

                console.log(`Navigating to category: ${categoryName} (${category})`);

                // Navigate to category page
                window.location.href = categoryUrl;

                // Or if you want to open in new window:
                // window.open(categoryUrl, '_blank');
            });
        });

        // Handle parent category clicks (main categories)
        toggles.forEach(toggle => {
            // Add click handler for the span part (not the expand icon)
            const span = toggle.querySelector('span');
            if (span) {
                span.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent expanding/collapsing

                    const category = toggle.dataset.toggle;
                    const categoryName = this.textContent;
                    const categoryUrl = `products.php?category=${category}`;

                    console.log(`Navigating to main category: ${categoryName} (${category})`);
                    window.location.href = categoryUrl;
                });
            }
        });
    });
</script>