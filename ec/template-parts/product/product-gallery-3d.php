<div class="space-y-4">
    <!-- View Mode Switcher -->
    <div class="flex justify-center gap-4 mb-6">
        <button id="normalView" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
            Normal View
        </button>
        <button id="view360" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
            360° View
        </button>
    </div>

    <!-- Main Image Carousel -->
    <div class="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <!-- Normal Gallery View -->
        <div id="normalGallery" class="embla overflow-hidden">
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
            </div>
        </div>

        <!-- 360 View Container -->
        <div id="view360Container" class="product-view360 hidden aspect-square relative bg-gray-100">
            <canvas id="canvas360" class="w-full h-full cursor-grab"></canvas>
            <div id="rotationIndicator" class="rotation-indicator">
                <svg class="rotating-icon w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Drag to rotate 360°
            </div>
            <div class="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                <span id="angleDisplay">0°</span>
            </div>
        </div>

        <!-- Navigation Arrows (for normal view) -->
        <button id="prevBtn" class="embla__prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>

        <button id="nextBtn" class="embla__next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
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
    <div id="thumbnailContainer" class="product-thumbnail embla-thumbs overflow-hidden">
        <div class="embla-thumbs__container flex gap-3">
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="thumb-btn block" data-index="0">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-primary-300 dark:border-primary-100 opacity-100 transition-all duration-200"
                        src="assets/images/product-6.jpg"
                        alt="Thumbnail 1">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="thumb-btn block" data-index="1">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-1.jpg"
                        alt="Thumbnail 2">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="thumb-btn block" data-index="2">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-2.jpg"
                        alt="Thumbnail 3">
                </button>
            </div>
            <div class="embla-thumbs__slide flex-none">
                <button type="button" class="thumb-btn block" data-index="3">
                    <img class="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 border-transparent hover:border-primary-300 opacity-60 hover:opacity-80 transition-all duration-200"
                        src="assets/images/product-6-3.jpg"
                        alt="Thumbnail 4">
                </button>
            </div>
        </div>
    </div>
</div>


<script>
    let emblaApi = null;
    let currentView = 'normal';
    let canvas360 = null;
    let ctx = null;
    let rotation360Images = [];
    let current360Angle = 0;
    let isDragging = false;
    let lastMouseX = 0;

    // Initialize the gallery
    document.addEventListener('DOMContentLoaded', function() {
        initializeEmbla();
        initializeZoom();
        initialize360View();
        setupViewSwitchers();
    });

    // Initialize Embla Carousel
    function initializeEmbla() {
        const emblaNode = document.querySelector('.embla');
        const options = {
            loop: false
        };

        emblaApi = EmblaCarousel(emblaNode, options);

        // Setup navigation buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', () => emblaApi.scrollPrev());
        nextBtn.addEventListener('click', () => emblaApi.scrollNext());

        // Setup thumbnail navigation
        setupThumbnailNavigation();
    }

    // Setup thumbnail navigation
    function setupThumbnailNavigation() {
        const thumbBtns = document.querySelectorAll('.thumb-btn');

        thumbBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                emblaApi.scrollTo(index);
                updateThumbnailsActive(index);
            });
        });

        // Update thumbnails when slide changes
        emblaApi.on('select', () => {
            updateThumbnailsActive(emblaApi.selectedScrollSnap());
        });
    }

    // Update active thumbnail
    function updateThumbnailsActive(activeIndex) {
        const thumbBtns = document.querySelectorAll('.thumb-btn');
        thumbBtns.forEach((btn, index) => {
            const img = btn.querySelector('img');
            if (index === activeIndex) {
                img.classList.remove('opacity-60', 'border-transparent');
                img.classList.add('opacity-100', 'border-primary-300');
            } else {
                img.classList.remove('opacity-100', 'border-primary-300');
                img.classList.add('opacity-60', 'border-transparent');
            }
        });
    }

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

    // Initialize 360 view
    function initialize360View() {
        canvas360 = document.getElementById('canvas360');
        ctx = canvas360.getContext('2d');

        // Generate 360 rotation images (simulated with different rotations)
        const baseImages = [
            'assets/images/product-6.jpg',
            'assets/images/product-6-1.jpg',
            'assets/images/product-6-2.jpg',
            'assets/images/product-6-3.jpg',
        ];

        // For demo purposes, we'll cycle through the images as "rotation frames"
        rotation360Images = [...baseImages, ...baseImages.reverse()];

        setupCanvas360Events();
    }

    // Setup 360 canvas events
    function setupCanvas360Events() {
        canvas360.addEventListener('mousedown', start360Drag);
        canvas360.addEventListener('mousemove', handle360Drag);
        canvas360.addEventListener('mouseup', end360Drag);
        canvas360.addEventListener('mouseleave', end360Drag);

        // Touch events for mobile
        canvas360.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas360.dispatchEvent(mouseEvent);
        });

        canvas360.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas360.dispatchEvent(mouseEvent);
        });

        canvas360.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas360.dispatchEvent(mouseEvent);
        });
    }

    function start360Drag(e) {
        isDragging = true;
        lastMouseX = e.clientX;
        canvas360.style.cursor = 'grabbing';

        const indicator = document.getElementById('rotationIndicator');
        indicator.classList.remove('show');
    }

    function handle360Drag(e) {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMouseX;
        current360Angle += deltaX * 0.5; // Sensitivity adjustment

        if (current360Angle < 0) current360Angle += 360;
        if (current360Angle >= 360) current360Angle -= 360;

        lastMouseX = e.clientX;
        render360View();
        updateAngleDisplay();
    }

    function end360Drag() {
        isDragging = false;
        canvas360.style.cursor = 'grab';
    }

    function render360View() {
        const imageIndex = Math.floor((current360Angle / 360) * rotation360Images.length) % rotation360Images.length;
        const img = new Image();
        img.onload = () => {
            canvas360.width = canvas360.offsetWidth;
            canvas360.height = canvas360.offsetHeight;
            ctx.drawImage(img, 0, 0, canvas360.width, canvas360.height);
        };
        img.src = rotation360Images[imageIndex];
    }

    function updateAngleDisplay() {
        const angleDisplay = document.getElementById('angleDisplay');
        angleDisplay.textContent = Math.round(current360Angle) + '°';
    }

    // Setup view switchers
    function setupViewSwitchers() {
        const normalViewBtn = document.getElementById('normalView');
        const view360Btn = document.getElementById('view360');
        const normalGallery = document.getElementById('normalGallery');
        const view360Container = document.getElementById('view360Container');
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        const navButtons = document.querySelectorAll('.embla__prev, .embla__next');

        normalViewBtn.addEventListener('click', () => {
            currentView = 'normal';
            normalGallery.classList.remove('hidden');
            view360Container.classList.add('hidden');
            thumbnailContainer.classList.remove('hidden');
            navButtons.forEach(btn => btn.classList.remove('hidden'));

        });

        view360Btn.addEventListener('click', () => {
            currentView = '360';
            normalGallery.classList.add('hidden');
            view360Container.classList.remove('hidden');
            thumbnailContainer.classList.add('hidden');
            navButtons.forEach(btn => btn.classList.add('hidden'));

            // Show rotation indicator initially
            const indicator = document.getElementById('rotationIndicator');
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 3000);

            // Render initial 360 view
            render360View();
        });
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

    .view-360 {
        background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    }

    .view-360:hover {
        background: linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%);
    }

    .rotation-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .rotation-indicator.show {
        opacity: 1;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .rotating-icon {
        animation: rotate 2s linear infinite;
    }
</style>