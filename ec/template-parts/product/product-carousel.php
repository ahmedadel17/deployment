<div class="te-carousel">

    <div class="flex items-center justify-between mb-4">

        <h2 class="product-title text-2xl font-bold text-gray-900 dark:text-white"><?php echo isset($section_heading) ? htmlspecialchars($section_heading) : 'Related Products'; ?></h2>

        <div class="embla-control flex gap-1 rtl:flex-row-reverse">
            <button class="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
            </button>

            <button class="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </div>
    </div>

    <!-- Embla Carousel Wrapper -->
    <div class="embla overflow-hidden relative">
        <div class="embla__container flex gap-6 lg:gap-6 py-1">
            <?php
            $limit = 8; // default for category-specific carousels
            if (!isset($selectedCategory) || $selectedCategory === null) {
                $limit = 10;
            }

            render_products($products, [
                'carousel' => true,
                'category' => isset($selectedCategory) ? $selectedCategory : null,
                'limit' => $limit
            ]);
            ?>
        </div>
    </div>

</div>