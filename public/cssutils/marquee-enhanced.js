// Enhanced Marquee for React Integration
class MarqueeSlider {
    constructor(container) {
        this.container = container;
        if (!container) {
            console.error('Marquee container not found');
            return;
        }
        
        this.track = container.querySelector('.marquee-track');
        this.content = container.querySelector('.marquee-content');
        
        if (!this.track || !this.content) {
            console.error('Marquee track or content not found');
            return;
        }
        
        this.speed = 1;
        this.position = 0;
        this.isRTL = false;
        this.animationId = null;
        this.isInitialized = false;

        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('Initializing marquee...');
        this.checkDirection();
        this.cloneContent();
        this.setupContent();
        this.start();
        this.isInitialized = true;

        // Listen for direction changes
        new MutationObserver(() => {
            this.checkDirection();
            this.resetPosition();
        }).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });

        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.pause());
        this.container.addEventListener('mouseleave', () => this.start());
        
        console.log('Marquee initialized successfully');
    }

    checkDirection() {
        const htmlDir = document.documentElement.getAttribute('dir');
        this.isRTL = htmlDir === 'rtl';
    }

    cloneContent() {
        // Clear any existing clones
        const existingClones = this.track.querySelectorAll('[aria-hidden="true"]');
        existingClones.forEach(clone => clone.remove());
        
        // Clone the content multiple times to ensure seamless loop
        const originalContent = this.content.cloneNode(true);
        const clone1 = originalContent.cloneNode(true);
        const clone2 = originalContent.cloneNode(true);

        clone1.setAttribute('aria-hidden', 'true');
        clone2.setAttribute('aria-hidden', 'true');

        this.track.appendChild(clone1);
        this.track.appendChild(clone2);
    }

    setupContent() {
        this.contentWidth = this.content.scrollWidth;
        console.log('Content width:', this.contentWidth);
    }

    start() {
        if (this.animationId) return;

        const animate = () => {
            if (this.isRTL) {
                this.position += this.speed;
                // Reset position when we've moved one full content width
                if (this.position >= this.contentWidth) {
                    this.position = 0;
                }
                this.track.style.transform = `translateX(${this.position}px)`;
            } else {
                this.position -= this.speed;
                // Reset position when we've moved one full content width to the left
                if (this.position <= -this.contentWidth) {
                    this.position = 0;
                }
                this.track.style.transform = `translateX(${this.position}px)`;
            }

            this.animationId = requestAnimationFrame(animate);
        };

        this.animationId = requestAnimationFrame(animate);
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resetPosition() {
        this.position = 0;
        this.track.style.transform = 'translateX(0)';
        this.pause();
        this.start();
    }

    destroy() {
        this.pause();
        this.isInitialized = false;
    }
}

// Global marquee instance
let marqueeInstance = null;

// Initialize marquee slider
function initializeMarquee() {
    const marqueeContainer = document.querySelector('.marquee-container');
    
    if (marqueeContainer && !marqueeInstance) {
        console.log('Found marquee container, initializing...');
        marqueeInstance = new MarqueeSlider(marqueeContainer);
    } else if (!marqueeContainer) {
        console.log('Marquee container not found, will retry...');
    }
}

// Try to initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded, attempting to initialize marquee...');
    initializeMarquee();
});

// Also try to initialize after a delay for React components
setTimeout(() => {
    console.log('Delayed marquee initialization...');
    initializeMarquee();
}, 500);

// Listen for React component updates
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
            // Check if marquee container was added
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.classList && node.classList.contains('marquee-container')) {
                        console.log('Marquee container detected in DOM, initializing...');
                        setTimeout(initializeMarquee, 100);
                    } else if (node.querySelector && node.querySelector('.marquee-container')) {
                        console.log('Marquee container found in added node, initializing...');
                        setTimeout(initializeMarquee, 100);
                    }
                }
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Make functions globally available for debugging
window.marqueeDebug = {
    initializeMarquee,
    getInstance: () => marqueeInstance
};
