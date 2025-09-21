<?php include 'header.php'; ?>
<?php include 'products-data.php'; ?>

<?php include 'template-parts/slider.php'; ?>

<section class="te-section-small">
    <div class="container">
        <?php
        $section_heading = 'Best Seller';
        $selectedCategory = null;
        include 'template-parts/product/product-carousel.php';
        ?>
    </div>
</section>

<section>
    <div class="container">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-6">

            <!-- Men Bannner -->
            <div class="relative flex items-center rounded-[1rem] bg-gradient-to-l from-[#0F3490] to-[#0A2463] overflow-hidden">
                <!-- Content -->
                <div class="relative z-10 flex-1 text-white">
                    <div class="ps-4">
                        <h2 class="text-xl lg:text-2xl font-bold mb-2">Mens Section</h2>
                        <p class="text-sm mb-8">Discover your style now</p>
                        <a href="#"
                            class="inline-flex items-center justify-start text-sm font-semibold transition hover:text-primary-100">
                            <svg class="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                                <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                            </svg>
                            <span class="ms-2">Shop Now</span>
                        </a>

                    </div>
                </div>
                <!-- Man image -->
                <div class="relative z-10 w-40 lg:me-2 ms-2 pr-4">
                    <img src="assets/images/men.png" alt="Men's Fashion" class="w-full object-contain">
                </div>
            </div>


            <!-- Women Bannner -->
            <div class="relative flex items-center rounded-[1rem] bg-gradient-to-l from-[#940F77] to-[#610A4E] overflow-hidden">
                <!-- Content -->
                <div class="relative z-10 flex-1 text-white">
                    <div class="ps-4">
                        <h2 class="text-xl lg:text-2xl font-bold mb-2">Womens Section</h2>
                        <p class="text-sm mb-8">Shine with confidence</p>
                        <a href="#"
                            class="inline-flex items-center justify-start text-sm font-semibold transition hover:text-[#C25BAB]">
                            <svg class="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                                <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                            </svg>
                            <span class="ms-2">Shop Now</span>
                        </a>

                    </div>
                </div>
                <!-- Man image -->
                <div class="relative z-10 w-40 lg:me-2 ms-2 pr-4">
                    <img src="assets/images/women.png" alt="Men's Fashion" class="w-full object-contain">
                </div>
            </div>


            <!-- Kids Bannner -->
            <div class="relative flex items-center rounded-[1rem] bg-gradient-to-l from-[#0A4B63] to-[#0F6D90] overflow-hidden">
                <!-- Content -->
                <div class="relative z-10 flex-1 text-white">
                    <div class="ps-4">
                        <h2 class="text-xl lg:text-2xl font-bold mb-2">Kids Section</h2>
                        <p class="text-sm mb-8">Discover your style now</p>
                        <a href="#"
                            class="inline-flex items-center justify-start text-sm font-semibold transition hover:text-[#12323D]">
                            <svg class="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                                <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                            </svg>
                            <span class="ms-2">Shop Now</span>
                        </a>

                    </div>
                </div>
                <!-- Man image -->
                <div class="relative z-10 w-40 lg:me-2 ms-2 pr-4">
                    <img src="assets/images/kids.png" alt="Men's Fashion" class="w-full object-contain">
                </div>
            </div>

        </div>
    </div>
</section>

<section class="te-section-small">
    <div class="container">
        <?php
        $section_heading = 'Men\'s Collection';
        $selectedCategory = 'Mens';
        include 'template-parts/product/product-carousel.php';
        ?>
    </div>
</section>

<section class="te-section-small !pt-0">
    <div class="container">
        <img class="rounded-2xl" src="assets/images/banner-1.jpg" alt="Banner 1" class="w-full object-cover">
    </div>
</section>

<section class="te-section-small bg-white dark:bg-gray-800">
    <div class="container">
        <?php
        $section_heading = 'Women\'s Collection';
        $selectedCategory = 'Womens';
        include 'template-parts/product/product-carousel.php';
        ?>
    </div>
</section>

<section class="bg-white dark:bg-gray-800">
    <div class="container">
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <a href="#"><img class="rounded-xl" src="assets/images/banner-2.jpg" alt="Banner 1" class="w-full object-cover"></a>
            <a href="#"><img class="rounded-xl" src="assets/images/banner-3.jpg" alt="Banner 1" class="w-full object-cover"></a>
        </div>
    </div>
    </div>
</section>

<section class="te-section-small bg-white dark:bg-gray-800">
    <div class="container">
        <?php
        $section_heading = 'Kids Collection';
        $selectedCategory = 'Kids';
        include 'template-parts/product/product-carousel.php';
        ?>
    </div>
</section>

<section class="te-section-small">
    <div class="container">
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">

            <div class="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div class="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Fast Shipping</h3>
                <p class="text-priamry-800 dark:text-gray-400 text-sm">Fast Delivery to Your Doorstep</p>
            </div>

            <div class="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div class="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Soft Natural Cotton</h3>
                <p class="text-priamry-800 dark:text-gray-400 text-sm">High Quality & Lasting Comfort</p>
            </div>

            <div class="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div class="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Transparent Prices</h3>
                <p class="text-priamry-800 dark:text-gray-400 text-sm">Best Value for Money</p>
            </div>

            <div class="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div class="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 class="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Secure & Fast Payment</h3>
                <p class="text-priamry-800 dark:text-gray-400 text-sm">Pay Online or Cash on Delivery</p>
            </div>


        </div>
    </div>
</section>
<?php include 'footer.php'; ?>