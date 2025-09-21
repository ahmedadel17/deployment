<!-- Price Filter Widget -->
<div class="price-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">

    <!-- Widget Header -->
    <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Filter by Price</h3>
        <button id="clearFilters" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors">
            Clear
        </button>
    </div>

    <!-- Price Range Display -->
    <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
            <span class="text-sm text-gray-600 dark:text-gray-400">Price Range</span>
            <div class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                <span id="minDisplay"><span class="icon-riyal-symbol text-xs me-1"></span>0</span>
                <span class="text-gray-400">-</span>
                <span id="maxDisplay"><span class="icon-riyal-symbol text-xs me-1"></span>1000</span>
            </div>
        </div>

        <!-- Range Slider Container -->
        <div class="relative mb-4 py-2">
            <!-- Background Track -->
            <div class="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <!-- Active Track -->
                <div id="rangeTrack" class="absolute h-full bg-primary-500 rounded-full dark:bg-primary-300" style="left: 0%; width: 100%;"></div>
            </div>

            <!-- Range Inputs Container -->
            <div class="slider-container">
                <!-- Min Range Input -->
                <input type="range" id="minRange" min="0" max="1000" value="0" step="10"
                    class="range-input range-input-min absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer">

                <!-- Max Range Input -->
                <input type="range" id="maxRange" min="0" max="1000" value="1000" step="10"
                    class="range-input range-input-max absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer">
            </div>
        </div>

        <!-- Manual Input -->
        <div class="flex items-center gap-3">
            <div class="flex-1">
                <label for="minInput" class="text-xs text-gray-500 dark:text-gray-400 block mb-1">Min</label>
                <input type="number" id="minInput" min="0" max="1000" value="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
            <div class="flex-1">
                <label for="maxInput" class="text-xs text-gray-500 dark:text-gray-400 block mb-1">Max</label>
                <input type="number" id="maxInput" min="0" max="1000" value="1000" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            </div>
        </div>
    </div>

    <!-- Quick Price Ranges -->
    <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Select</h4>
        <div class="grid grid-cols-2 gap-2">
            <button class="price-quick-btn px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white transition-colors" data-min="0" data-max="50">
                Under <span class="icon-riyal-symbol text-xs me-1"></span>50
            </button>
            <button class="price-quick-btn px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white transition-colors" data-min="50" data-max="100">
                <span class="icon-riyal-symbol text-xs me-1"></span>50 - <span class="icon-riyal-symbol text-xs me-1"></span>100
            </button>
            <button class="price-quick-btn px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white transition-colors" data-min="100" data-max="250">
                <span class="icon-riyal-symbol text-xs me-1"></span>100 - <span class="icon-riyal-symbol text-xs me-1"></span>250
            </button>
            <button class="price-quick-btn px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white transition-colors" data-min="250" data-max="500">
                <span class="icon-riyal-symbol text-xs me-1"></span>250 - <span class="icon-riyal-symbol text-xs me-1"></span>500
            </button>
            <button class="price-quick-btn px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white transition-colors" data-min="500" data-max="1000">
                <span class="icon-riyal-symbol text-xs me-1"></span>500+
            </button>
        </div>
    </div>

    <!-- Apply Button -->
    <button id="applyFilter" class="w-full te-btn te-btn-default">
        Apply Filter
    </button>

    <!-- Results Count -->
    <div class="mt-4 text-center">
        <span class="text-xs text-gray-500 dark:text-gray-400" id="resultsCount">
            Showing 124 products
        </span>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const minRange = document.getElementById('minRange');
        const maxRange = document.getElementById('maxRange');
        const minInput = document.getElementById('minInput');
        const maxInput = document.getElementById('maxInput');
        const minDisplay = document.getElementById('minDisplay');
        const maxDisplay = document.getElementById('maxDisplay');
        const rangeTrack = document.getElementById('rangeTrack');
        const quickBtns = document.querySelectorAll('.price-quick-btn');
        const clearBtn = document.getElementById('clearFilters');
        const applyBtn = document.getElementById('applyFilter');
        const resultsCount = document.getElementById('resultsCount');

        function updateZIndex() {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);

            // Adjust z-index based on values to ensure proper interaction
            if (minVal > maxVal - 50) {
                minRange.classList.add('higher');
            } else {
                minRange.classList.remove('higher');
            }
        }

        function updateDisplay() {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);

            // Update displays
            minDisplay.innerHTML = '<span class="icon-riyal-symbol text-xs me-1"></span>' + minVal;
            maxDisplay.innerHTML = '<span class="icon-riyal-symbol text-xs me-1"></span>' + maxVal;

            // Update inputs
            minInput.value = minVal;
            maxInput.value = maxVal;

            // Update track
            const minPercent = (minVal / 1000) * 100;
            const maxPercent = (maxVal / 1000) * 100;

            rangeTrack.style.left = minPercent + '%';
            rangeTrack.style.width = (maxPercent - minPercent) + '%';

            // Update z-index for better interaction
            updateZIndex();

            // Update results count
            const filtered = Math.max(10, Math.floor(200 * ((maxVal - minVal) / 1000) + Math.random() * 20));
            resultsCount.textContent = `Showing ${filtered} products`;
        }

        function setActiveQuickBtn(activeBtn) {
            quickBtns.forEach(btn => {
                btn.classList.remove('bg-primary-500', 'border-primary-500', 'text-white');
                btn.classList.add('border-gray-300', 'text-gray-700');
            });

            if (activeBtn) {
                activeBtn.classList.remove('border-gray-300', 'text-gray-700');
                activeBtn.classList.add('bg-primary-500', 'border-primary-500', 'text-white');
            }
        }

        // Range events
        minRange.addEventListener('input', function() {
            updateDisplay();
        });

        maxRange.addEventListener('input', function() {
            updateDisplay();
        });

        minRange.addEventListener('change', function() {
            if (parseInt(this.value) >= parseInt(maxRange.value)) {
                this.value = parseInt(maxRange.value) - 10;
            }
            updateDisplay();
            setActiveQuickBtn(null);
        });

        maxRange.addEventListener('change', function() {
            if (parseInt(this.value) <= parseInt(minRange.value)) {
                this.value = parseInt(minRange.value) + 10;
            }
            updateDisplay();
            setActiveQuickBtn(null);
        });

        // Input events
        minInput.addEventListener('input', function() {
            const val = Math.max(0, Math.min(990, parseInt(this.value) || 0));
            minRange.value = val;
            updateDisplay();
            setActiveQuickBtn(null);
        });

        maxInput.addEventListener('input', function() {
            const val = Math.max(10, Math.min(1000, parseInt(this.value) || 1000));
            maxRange.value = val;
            updateDisplay();
            setActiveQuickBtn(null);
        });

        // Quick buttons
        quickBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                minRange.value = this.dataset.min;
                maxRange.value = this.dataset.max;
                updateDisplay();
                setActiveQuickBtn(this);
            });
        });

        // Clear button
        clearBtn.addEventListener('click', function() {
            minRange.value = 0;
            maxRange.value = 1000;
            updateDisplay();
            setActiveQuickBtn(null);
        });

        // Apply button
        applyBtn.addEventListener('click', function() {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);
            console.log(`Filtering: $${minVal} - $${maxVal}`);
            alert(`Filter applied: $${minVal} - $${maxVal}`);
        });

        // Initialize
        updateDisplay();
    });
</script>