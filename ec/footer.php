</main><!-- #main -->
</div><!-- #primary -->
</div><!-- #content -->

<!-- Footer Style (1) -->
<?php include 'template-parts/footer/styles/footer-style-1.php'; ?>

<?php include 'template-parts/footer/footer-nav.php'; ?>

<!-- Compare Bar (Fixed at bottom when items are selected) -->
<div id="compareBar" class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 transform translate-y-full transition-transform duration-300 z-40 dark:bg-gray-800 dark:border-gray-700">
    <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
            <span class="font-semibold">Compare Products:</span>
            <span id="compareCount" class="text-sm text-gray-600 dark:text-gray-300">0 selected</span>
        </div>
        <div class="flex gap-2">
            <button id="compareBtn" class="bg-primary-500 text-white font-semibold px-4 py-2 rounded hover:bg-primary-600 dark:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Compare Now
            </button>
            <button id="clearCompare" class="border border-gray-300 dark:border-gray-200 text-gray-800 dark:text-gray-100 font-semibold px-4 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:border-gray-500 transition-colors">
                Clear All
            </button>
        </div>
    </div>
</div>

<!-- Back to Top Button -->
<button class="te-footer-back-to-top back-to-top hidden lg:flex" aria-label="Back to top">
    <svg class="te-footer-back-to-top-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-up-from-dot-icon lucide-arrow-up-from-dot">
        <path d="m5 9 7-7 7 7" />
        <path d="M12 16V2" />
        <circle cx="12" cy="21" r="1" />
    </svg>
</button>

<div class="te-navbar-progress fixed top-0 left-0 h-[2px] z-50 transition-[width] ease-out duration-150 bg-gradient-to-r from-primary-500 to-secondary-500" style="width: 0%" id="navbar-progress"></div>

<!-- Site Main Script -->
<script src="assets/js/script.min.js" id="script-js"></script>

<!-- Navigation Script -->
<script src="assets/js/navigation.min.js" id="navigation-js"></script>

<!-- Compare - Quick View - Add to cart - Whishlist -->
<script src="assets/js/product-btns.min.js" id="product-btns-js"></script>

<!-- Marquee Slider Script -->
<script src="assets/js/marquee.min.js" id="marquee-js"></script>

<!-- Darkmode Script -->
<script src="assets/js/darkmode.min.js" id="darkmode-js"></script>

<!-- Gallery Script and Embla Carousel -->
<?php
$filename = basename($_SERVER['PHP_SELF']);

if ($filename === 'single.php' || $filename === 'index.php' || str_starts_with($filename, 'single-') || $filename === 'cotton.php') : ?>
    <!-- Slider -->
    <script src="assets/js/slider.min.js" id="slider-js"></script>

    <!-- Gallery and Carousel -->
    <script src="assets/js/embla-carousel.min.js" id="embla-js"></script>
    <script src="assets/js/embla-carousel-autoplay.min.js" id="embla-autoplay-js"></script>
    <script src="assets/js/embla-init.min.js" id="embla-init-js"></script>
<?php endif; ?>

</body>

</html>