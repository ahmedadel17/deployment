// Simple Slider Implementation for React Integration
document.addEventListener("DOMContentLoaded", function() {
    console.log('Slider script loaded');
    
    // Wait a bit for React to render
    setTimeout(initializeSlider, 200);
});

function initializeSlider() {
    console.log('Initializing slider...');
    
    const slider = document.getElementById('site-slider');
    const slidesContainer = document.getElementById('slides-container');
    const slideItems = document.querySelectorAll('.slide-item');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const paginationDots = document.getElementById('pagination-dots');
    
    if (!slider || !slidesContainer || slideItems.length === 0) {
        console.error('Slider elements not found:', {
            slider: !!slider,
            slidesContainer: !!slidesContainer,
            slideItems: slideItems.length
        });
        return;
    }
    
    console.log('Found slider elements:', {
        slides: slideItems.length,
        prevButton: !!prevButton,
        nextButton: !!nextButton,
        pagination: !!paginationDots
    });
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoplayInterval;
    
    const autoplay = slider.dataset.autoplay === 'true';
    const autoplaySpeed = parseInt(slider.dataset.autoplaySpeed) || 7000;
    
    // Set up container width for all slides
    slidesContainer.style.width = `${slideItems.length * 100}%`;
    
    // Set up individual slide widths
    slideItems.forEach((slide, index) => {
        slide.style.width = `${100 / slideItems.length}%`;
        slide.style.flexShrink = '0';
        console.log(`Slide ${index} width set to ${100 / slideItems.length}%`);
    });
    
    function updateSlider() {
        if (isTransitioning) return;
        
        const translateX = -currentSlide * (100 / slideItems.length);
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        console.log(`Moving to slide ${currentSlide}, translateX: ${translateX}%`);
        
        updatePagination();
    }
    
    function updatePagination() {
        if (!paginationDots) return;
        
        paginationDots.innerHTML = '';
        
        slideItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `h-4 w-4 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-25'
            }`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                currentSlide = index;
                updateSlider();
                restartAutoplay();
            });
            
            paginationDots.appendChild(dot);
        });
    }
    
    function goToNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentSlide = (currentSlide + 1) % slideItems.length;
        updateSlider();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 700);
        
        restartAutoplay();
    }
    
    function goToPrevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentSlide = currentSlide === 0 ? slideItems.length - 1 : currentSlide - 1;
        updateSlider();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 700);
        
        restartAutoplay();
    }
    
    function startAutoplay() {
        if (autoplay && slideItems.length > 1) {
            autoplayInterval = setInterval(goToNextSlide, autoplaySpeed);
            console.log('Autoplay started');
        }
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
            console.log('Autoplay stopped');
        }
    }
    
    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Event listeners
    if (prevButton) {
        prevButton.addEventListener('click', goToPrevSlide);
        console.log('Previous button listener added');
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', goToNextSlide);
        console.log('Next button listener added');
    }
    
    // Pause autoplay on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Initialize
    updateSlider();
    startAutoplay();
    
    console.log('Slider initialized successfully');
    
    // Make functions globally available for debugging
    window.sliderDebug = {
        goToNextSlide,
        goToPrevSlide,
        currentSlide: () => currentSlide,
        updateSlider
    };
}
