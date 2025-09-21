<?php include 'header.php'; ?>

<div class="grid gap-4 grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">

    <!-- Category Cards -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:-translate-y-1">
        <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop" alt="Electronics" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Electronics</h3>
            <button class="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium">
                Shop Now
            </button>
        </div>
    </div>


    <!-- Promo Banners -->
    <div class="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-white group hover:-translate-y-1">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="mb-4 md:mb-0">
                <h3 class="text-2xl font-bold mb-2">Flash Sale</h3>
                <p class="text-red-100 dark:text-pink-100">Up to 50% off selected items</p>
            </div>
            <button class="bg-white text-red-600 dark:text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-300 group-hover:scale-105 transform">
                Shop Now
            </button>
        </div>
    </div>

    <!-- Feature/Info Cards - Highlight key services and benefits -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center group hover:-translate-y-1">
        <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-300">
            <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Free Shipping</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Free delivery on orders over $50</p>
    </div>


    <!-- Testimonial Cards - Display customer reviews and feedback -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
        <div class="flex items-center mb-4">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Customer" class="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Sarah Johnson</h4>
                <div class="flex items-center">
                    <div class="flex text-yellow-400">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 italic">"Amazing quality and fast delivery. Will definitely shop here again!"</p>
    </div>


    <!-- Stats Cards - Display key business metrics and achievements -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center group hover:-translate-y-1">
        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Happy Customers</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Satisfied with our service</p>
    </div>

    <!-- Pricing Cards - Display subscription or service plans -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 relative group hover:-translate-y-1">
        <div class="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-xl text-xs font-semibold">Popular</div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Pro Plan</h3>
        <div class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">$29<span class="text-lg text-gray-600 dark:text-gray-400">/month</span></div>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-6">Perfect for small businesses</p>
        <ul class="space-y-3 mb-6">
            <li class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                Up to 100 products
            </li>
            <li class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                24/7 Support
            </li>
        </ul>
        <button class="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors duration-300 font-medium">
            Get Started
        </button>
    </div>

    <!-- Contact/Location Cards - Display business contact information -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
        <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors duration-300">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Our Store</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-1">123 Fashion Street</p>
        <p class="text-gray-600 dark:text-gray-400 text-sm">New York, NY 10001</p>
    </div>



    <!-- Category Section - Electronics background with overlay (compact for grid) -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=320&fit=crop" alt="Electronics Category" class="w-full h-full object-cover" />
        </div>

        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>

        <!-- Content Overlay -->
        <div class="relative z-10 h-full flex items-center justify-center text-center p-6">
            <div class="max-w-xs">
                <div class="text-xs font-bold text-blue-400 mb-2 uppercase tracking-widest">Category</div>
                <h2 class="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                    Electronics
                </h2>
                <div class="flex flex-col gap-3">
                    <button class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 transform shadow-xl">
                        Shop Now
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300">
                        View All
                    </button>
                </div>
            </div>
        </div>
    </div>


    <!-- Fashion Category - Clothing background with overlay (compact for grid) -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=320&fit=crop" alt="Fashion Category" class="w-full h-full object-cover" />
        </div>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-pink-900 via-transparent to-purple-900 opacity-70"></div>

        <!-- Content Overlay -->
        <div class="relative z-10 h-full flex items-center justify-center text-center p-6">
            <div class="max-w-xs">
                <div class="text-xs font-bold text-pink-300 mb-2 uppercase tracking-widest">Trending</div>
                <h2 class="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                    Fashion
                </h2>
                <div class="flex flex-col gap-3">
                    <button class="bg-pink-600 text-white hover:bg-pink-700 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 transform shadow-xl">
                        Explore
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-pink-600 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300">
                        See Trends
                    </button>
                </div>
            </div>
        </div>
    </div>


    <!-- Home & Garden Category - Interior design background with overlay (compact for grid) -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=320&fit=crop" alt="Home & Garden Category" class="w-full h-full object-cover" />
        </div>

        <!-- Colored Overlay -->
        <div class="absolute inset-0 bg-green-800 bg-opacity-60"></div>

        <!-- Content Overlay -->
        <div class="relative z-10 h-full flex items-center justify-center text-center p-6">
            <div class="max-w-xs">
                <div class="text-xs font-bold text-green-300 mb-2 uppercase tracking-widest">Living</div>
                <h2 class="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
                    Home & Garden
                </h2>
                <div class="flex flex-col gap-3">
                    <button class="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 transform shadow-xl">
                        Browse
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-green-600 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300">
                        Ideas
                    </button>
                </div>
            </div>
        </div>
    </div>



    <!-- Electronics Category - Content bottom left, CTA bottom right -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=320&fit=crop" alt="Electronics Category" class="w-full h-full object-cover" />
        </div>

        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>

        <!-- Content Overlay -->
        <div class="relative z-10 h-full flex items-end justify-between p-6">
            <!-- Left Content -->
            <div class="flex-1">
                <div class="text-xs font-bold text-blue-400 mb-1 uppercase tracking-widest">Category</div>
                <h2 class="text-2xl font-black text-white mb-2 leading-tight">Electronics</h2>
                <p class="text-gray-300 text-sm">Latest tech gadgets and accessories</p>
            </div>
            <!-- Right CTA -->
            <div>
                <button class="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 transform shadow-xl">
                    Shop Now
                </button>
            </div>
        </div>
    </div>

    <!-- Fashion Category - Badge top right, content bottom center -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=320&fit=crop" alt="Fashion Category" class="w-full h-full object-cover" />
        </div>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

        <!-- Top Right Badge -->
        <div class="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            NEW
        </div>

        <!-- Bottom Content -->
        <div class="relative z-10 h-full flex items-end p-6">
            <div class="w-full text-center">
                <h2 class="text-3xl font-black text-white mb-2">Fashion</h2>
                <p class="text-pink-200 text-sm mb-4">Trendy styles for every occasion</p>
                <button class="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2 rounded-lg font-semibold text-sm transition-all duration-300">
                    Explore Collection
                </button>
            </div>
        </div>
    </div>


    <!-- Books Category - Vertical split with content on left side -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=320&fit=crop" alt="Books Category" class="w-full h-full object-cover" />
        </div>

        <!-- Side Overlay -->
        <div class="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-amber-900 to-transparent opacity-95"></div>

        <!-- Left Content -->
        <div class="relative z-10 h-full flex items-center">
            <div class="w-1/2 p-6">
                <div class="text-xs font-bold text-amber-300 mb-2 uppercase tracking-widest">Knowledge</div>
                <h2 class="text-2xl font-black text-white mb-3">Books</h2>
                <p class="text-amber-100 text-sm mb-4">Expand your mind with our collection</p>
                <button class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 w-full">
                    Browse Library
                </button>
            </div>
        </div>
    </div>

    <!-- Tech Category - Floating card over background -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=320&fit=crop" alt="Tech Category" class="w-full h-full object-cover" />
        </div>

        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>

        <!-- Floating Card -->
        <div class="relative z-10 h-full flex items-center justify-center p-6">
            <div class="bg-white dark:bg-gray-800 bg-opacity-95 rounded-lg p-6 max-w-xs text-center transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <div class="text-xs font-bold text-purple-600 dark:text-purple-400 mb-2 uppercase tracking-widest">Innovation</div>
                <h2 class="text-xl font-black text-gray-900 dark:text-white mb-2">Technology</h2>
                <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">Future-ready devices</p>
                <button class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 w-full">
                    Discover Tech
                </button>
            </div>
        </div>
    </div>


    <!-- Electronics Category - Left text content, right PNG image with background -->
    <div class="relative rounded-xl overflow-hidden h-80">
        <!-- Background Image -->
        <div class="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=320&fit=crop" alt="Tech Background" class="w-full h-full object-cover" />
        </div>

        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-blue-900 bg-opacity-70"></div>

        <!-- Content Layout -->
        <div class="relative z-10 h-full flex items-center">
            <!-- Left Content -->
            <div class="w-1/2 p-6">
                <div class="text-xs font-bold text-blue-300 mb-2 uppercase tracking-widest">Category</div>
                <h2 class="text-2xl font-black text-white mb-3 leading-tight">Electronics</h2>
                <p class="text-blue-100 text-sm mb-4 leading-relaxed">Discover cutting-edge gadgets and the latest technology innovations</p>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 transform">
                    Shop Electronics
                </button>
            </div>

            <!-- Right PNG Image -->
            <div class="w-1/2 flex items-center justify-center p-6">
                <div class="relative">
                    <img src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=200&fit=crop&bg-removal=true" alt="Electronics Product" class="w-32 h-32 object-contain drop-shadow-2xl" />
                    <!-- Glow Effect -->
                    <div class="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>



</div>


<!-- Hero/Feature Section - Main promotional content with image -->
<div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        <!-- Content Side -->
        <div class="flex flex-col justify-center p-8 lg:p-12">
            <div class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wide">New Collection</div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Summer Fashion 2024</h2>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">Discover our latest collection of trendy summer outfits. From casual wear to elegant evening dresses, find your perfect style for the season.</p>
            <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform">
                    Shop Collection
                </button>
                <button class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    View Lookbook
                </button>
            </div>
        </div>
        <!-- Image Side -->
        <div class="relative h-64 lg:h-auto">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" alt="Summer Fashion Collection" class="absolute inset-0 w-full h-full object-cover" />
        </div>
    </div>
</div>


<!-- Sale Announcement Section - Limited time offers and promotions -->
<div class="bg-gradient-to-r from-red-500 to-pink-600 dark:from-red-600 dark:to-pink-700 rounded-xl shadow-lg overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        <!-- Content Side -->
        <div class="flex flex-col justify-center p-8 lg:p-12">
            <div class="text-sm font-semibold text-red-100 dark:text-pink-100 mb-3 uppercase tracking-wide">Limited Time</div>
            <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">Flash Sale 50% Off</h2>
            <p class="text-red-100 dark:text-pink-100 text-lg mb-8 leading-relaxed">Don't miss out on our biggest sale of the year! Get up to 50% off on selected items. Hurry, offer ends in 24 hours!</p>
            <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-white text-red-600 dark:text-pink-600 hover:bg-gray-100 dark:hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform">
                    Shop Sale
                </button>
                <button class="border-2 border-white text-white hover:bg-white hover:text-red-600 dark:hover:text-pink-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    View All Deals
                </button>
            </div>
        </div>
        <!-- Image Side -->
        <div class="relative h-64 lg:h-auto">
            <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=400&fit=crop" alt="Flash Sale" class="absolute inset-0 w-full h-full object-cover" />
        </div>
    </div>
</div>


<!-- Sale Announcement Section - Image on left, content on right -->
<div class="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        <!-- Image Side -->
        <div class="relative h-64 lg:h-auto">
            <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=400&fit=crop" alt="Flash Sale" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <!-- Content Side -->
        <div class="flex flex-col justify-center p-8 lg:p-12">
            <div class="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 uppercase tracking-wide">Limited Time</div>
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Flash Sale 50% Off</h2>
            <p class="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">Don't miss out on our biggest sale of the year! Get up to 50% off on selected items. Hurry, offer ends in 24 hours!</p>
            <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform">
                    Shop Sale
                </button>
                <button class="border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-600 dark:hover:bg-red-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    View All Deals
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Membership Program Section - Split diagonal background -->
<div class="relative bg-gradient-to-br from-purple-600 to-indigo-800 dark:from-purple-700 dark:to-indigo-900 rounded-xl shadow-lg overflow-hidden min-h-[400px]">
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-white dark:via-gray-800 dark:to-gray-800 opacity-90 transform skew-x-12 translate-x-1/2"></div>
    <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] relative z-10">
        <!-- Content Side -->
        <div class="flex flex-col justify-center p-8 lg:p-12">
            <div class="text-sm font-semibold text-purple-100 mb-3 uppercase tracking-wide">VIP Access</div>
            <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">Join Premium Club</h2>
            <p class="text-purple-100 text-lg mb-8 leading-relaxed">Unlock exclusive benefits, early access to sales, free shipping, and special member-only discounts.</p>
            <div class="flex flex-col sm:flex-row gap-4">
                <button class="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform">
                    Join Now
                </button>
                <button class="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                    View Benefits
                </button>
            </div>
        </div>
        <!-- Image Side -->
        <div class="relative h-64 lg:h-auto">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" alt="Premium Membership" class="absolute inset-0 w-full h-full object-cover opacity-80" />
        </div>
    </div>
</div>


<!-- Mobile App Section - Centered content over background image -->
<div class="relative rounded-xl overflow-hidden min-h-[400px]">
    <!-- Background Image -->
    <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop" alt="Mobile Shopping App" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900 via-transparent to-blue-900 bg-opacity-80"></div>
    </div>
    <!-- Centered Content -->
    <div class="relative z-10 h-full flex items-center justify-center text-center p-8">
        <div class="max-w-2xl">
            <div class="text-sm font-semibold text-blue-300 mb-3 uppercase tracking-wide">Mobile App</div>
            <h2 class="text-3xl lg:text-5xl font-bold text-white mb-6">Shop On The Go</h2>
            <p class="text-blue-100 text-lg lg:text-xl mb-10 leading-relaxed">Download our mobile app for the best shopping experience. Get exclusive deals and seamless checkout.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform">
                    Download iOS
                </button>
                <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-lg font-semibold transition-all duration-300">
                    Download Android
                </button>
            </div>
        </div>
    </div>
</div>



<!-- Hero Section - Full background image with overlay and centered content -->
<div class="relative rounded-xl overflow-hidden min-h-[500px] lg:min-h-[600px]">
    <!-- Background Image -->
    <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop" alt="Summer Collection" class="w-full h-full object-cover" />
    </div>

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"></div>

    <!-- Content Overlay -->
    <div class="relative z-10 h-full flex items-center justify-center text-center p-8 lg:p-16">
        <div class="max-w-4xl">
            <div class="text-sm font-bold text-yellow-400 mb-4 uppercase tracking-widest">New Arrivals</div>
            <h1 class="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                Summer Collection 2024
            </h1>
            <p class="text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                Discover the hottest trends and styles for the season. Limited edition pieces available now.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <button class="bg-white text-black hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 transform shadow-xl">
                    Shop Collection
                </button>
                <button class="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 transform">
                    Watch Lookbook
                </button>
            </div>
        </div>
    </div>
</div>


<?php include 'footer.php'; ?>