<div class="space-y-4">
    <!-- Main Image Carousel -->
    <div class="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="embla overflow-hidden">
            <div class="embla__container flex">
                <div class="embla__slide flex-none w-full min-w-0">
                    <div class="zoom-container aspect-square">
                        <img src="assets/images/product-6.jpg"
                            alt="Product Image 1"
                            class="zoom-image w-full h-full object-cover">
                        <div class="zoom-lens"></div>
                    </div>
                </div>
                <div class="embla__slide flex-none w-full min-w-0">
                    <div class="zoom-container aspect-square">
                        <img src="assets/images/product-6-1.jpg"
                            alt="Product Image 2"
                            class="zoom-image w-full h-full object-cover">
                        <div class="zoom-lens"></div>
                    </div>
                </div>
                <div class="embla__slide flex-none w-full min-w-0">
                    <div class="zoom-container aspect-square">
                        <img src="assets/images/product-6-2.jpg"
                            alt="Product Image 3"
                            class="zoom-image w-full h-full object-cover">
                        <div class="zoom-lens"></div>
                    </div>
                </div>
                <div class="embla__slide flex-none w-full min-w-0">
                    <div class="zoom-container aspect-square">
                        <img src="assets/images/product-6-3.jpg"
                            alt="Product Image 4"
                            class="zoom-image w-full h-full object-cover">
                        <div class="zoom-lens"></div>
                    </div>
                </div>
                <div class="embla__slide flex-none w-full min-w-0">
                    <div class="zoom-container aspect-square">
                        <img src="assets/images/product-6-4.jpg"
                            alt="Product Image 5"
                            class="zoom-image w-full h-full object-cover">
                        <div class="zoom-lens"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation Arrows -->
        <button class="embla__prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>

        <button class="embla__next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>

        <!-- Sale Badge -->
        <div class="absolute top-4 start-4">
            <span class="product-badge bg-red-500/20 text-red-500 px-2 py-1 text-xs font-semibold rounded-full">20% OFF</span>
        </div>

        <!-- Wishlist Button -->
        <button class="product-add-to-wishlist absolute top-4 end-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
            data-product-id="">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
            </svg>
        </button>

    </div>

    <!-- Thumbnail Carousel -->
    <div class="product-thumbnail embla-thumbs overflow-hidden">
        <div class="embla-thumbs__container flex gap-3">
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="block">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6.jpg"
                        alt="Thumbnail 1">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="block">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-1.jpg"
                        alt="Thumbnail 2">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="block">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-2.jpg"
                        alt="Thumbnail 3">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="block">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-3.jpg"
                        alt="Thumbnail 4">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="block">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-4.jpg"
                        alt="Thumbnail 5">
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    // Initialize zoom functionality when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeZoom();
    });

    // Initialize zoom functionality
    function initializeZoom() {
        const zoomContainers = document.querySelectorAll('.zoom-container');

        zoomContainers.forEach(container => {
            const image = container.querySelector('.zoom-image');
            const lens = container.querySelector('.zoom-lens');
            let isZoomed = false;

            container.addEventListener('click', (e) => {
                if (!isZoomed) {
                    // Zoom in
                    isZoomed = true;
                    container.classList.add('zoomed');
                    image.style.transform = 'scale(2)';
                    updateZoomPosition(e, container, image);
                } else {
                    // Zoom out
                    isZoomed = false;
                    container.classList.remove('zoomed');
                    image.style.transform = 'scale(1)';
                }
            });

            container.addEventListener('mousemove', (e) => {
                if (isZoomed) {
                    updateZoomPosition(e, container, image);
                }
                updateLensPosition(e, container, lens);
            });

            container.addEventListener('mouseleave', () => {
                if (isZoomed) {
                    isZoomed = false;
                    container.classList.remove('zoomed');
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Update zoom position
    function updateZoomPosition(e, container, image) {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const moveX = (x - 0.5) * -100;
        const moveY = (y - 0.5) * -100;

        image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    }

    // Update lens position
    function updateLensPosition(e, container, lens) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - 75; // 75 is half of lens width
        const y = e.clientY - rect.top - 75; // 75 is half of lens height

        lens.style.left = Math.max(0, Math.min(x, rect.width - 150)) + 'px';
        lens.style.top = Math.max(0, Math.min(y, rect.height - 150)) + 'px';
    }
</script>

<style>
    .zoom-container {
        position: relative;
        overflow: hidden;
        cursor: zoom-in;
    }

    .zoom-container.zoomed {
        cursor: zoom-out;
    }

    .zoom-image {
        transition: transform 0.3s ease;
        transform-origin: center center;
    }

    .zoom-lens {
        position: absolute;
        border: 2px solid #fff;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    .zoom-container:hover .zoom-lens {
        opacity: 1;
    }
</style>