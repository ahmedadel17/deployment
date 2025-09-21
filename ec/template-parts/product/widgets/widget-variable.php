<?php
$sizes = array('XS', 'S', 'M', 'L', 'XL', 'XXL');
$shoe_sizes = array('38', '39', '40', '41', '42', '43', '44', '45');
$colors = array('black', 'white', 'gray', 'red', 'blue', 'yellow', 'green');
?>

<!-- Size/Color Filter Widget -->
<div class="variable-widget w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">

    <!-- Widget Header -->
    <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Size & Color</h3>
        <button id="clearSizeColor" class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors" aria-label="Clear all size and color filters">
            Clear
        </button>
    </div>

    <!-- Size Filter -->
    <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h4>
        <div class="grid grid-cols-4 gap-2">
            <?php foreach ($sizes as $size) : ?>
                <button class="size-option" data-size="<?php echo $size; ?>" aria-label="Select size <?php echo $size; ?>">
                    <?php echo $size; ?>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- Shoe Sizes -->
        <div class="mt-4">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Shoe Sizes</div>
            <div class="grid grid-cols-4 gap-2">
                <?php foreach ($shoe_sizes as $s_size) : ?>
                    <button class="size-option" data-size="<?php echo $s_size; ?>" aria-label="Select shoe size <?php echo $s_size; ?>">
                        <?php echo $s_size; ?>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- Color Filter -->
    <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h4>
        <div class="flex flex-wrap gap-3">
            <?php foreach ($colors as $color) : ?>
                <button class="color-option" style="background-color: <?php echo $color; ?>;" data-color="<?php echo $color; ?>" title="<?php echo $color; ?>" aria-label="Select color <?php echo $color; ?>"><span class="sr-only"><?php echo $color; ?></span></button>
            <?php endforeach; ?>
        </div>
    </div>

    <!-- Selected Filters Display -->
    <div id="selectedFilters" class="mb-6 hidden">
        <div class="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected:</div>
        <div class="space-y-2">
            <div id="selectedSizes" class="hidden">
                <span class="text-xs text-gray-500 dark:text-gray-400">Sizes:</span>
                <div class="flex flex-wrap gap-1 mt-1" id="sizeTagsContainer"></div>
            </div>
            <div id="selectedColors" class="hidden">
                <span class="text-xs text-gray-500 dark:text-gray-400">Colors:</span>
                <div class="flex flex-wrap gap-1 mt-1" id="colorTagsContainer"></div>
            </div>
        </div>
    </div>

    <!-- Apply Button -->
    <button id="applySizeColorFilter" class="w-full te-btn te-btn-default" aria-label="Apply size and color filters">
        Apply Filter
    </button>

    <!-- Results Count -->
    <div class="mt-4 text-center">
        <span class="text-xs text-gray-500 dark:text-gray-400" id="sizeColorResults">
            Showing 124 products
        </span>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const widget = document.querySelector('.variable-widget');
        if (!widget) return;

        const sizeOptions = widget.querySelectorAll('.size-option');
        const colorOptions = widget.querySelectorAll('.color-option');
        const clearBtn = widget.querySelector('#clearSizeColor');
        const applyBtn = widget.querySelector('#applySizeColorFilter');
        const selectedFilters = widget.querySelector('#selectedFilters');
        const selectedSizes = widget.querySelector('#selectedSizes');
        const selectedColors = widget.querySelector('#selectedColors');
        const sizeTagsContainer = widget.querySelector('#sizeTagsContainer');
        const colorTagsContainer = widget.querySelector('#colorTagsContainer');
        const resultsCount = widget.querySelector('#sizeColorResults');

        let selectedSizesList = [];
        let selectedColorsList = [];

        function toggleButton(btn, list, value) {
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                const index = list.indexOf(value);
                if (index > -1) list.splice(index, 1);
            } else {
                btn.classList.add('active');
                list.push(value);
            }
            updateSelectedDisplay();
        }

        function updateSelectedDisplay() {
            // Update sizes display
            if (selectedSizesList.length > 0) {
                selectedSizes.classList.remove('hidden');
                sizeTagsContainer.innerHTML = '';
                selectedSizesList.forEach(size => {
                    const tag = document.createElement('span');
                    tag.className = 'inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100';
                    tag.innerHTML = `
                            ${size}
                            <button class="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700" onclick="removeSize('${size}')" aria-label="Remove size ${size}">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        `;
                    sizeTagsContainer.appendChild(tag);
                });
            } else {
                selectedSizes.classList.add('hidden');
            }

            // Update colors display
            if (selectedColorsList.length > 0) {
                selectedColors.classList.remove('hidden');
                colorTagsContainer.innerHTML = '';
                selectedColorsList.forEach(color => {
                    const tag = document.createElement('span');
                    tag.className = 'inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100';
                    tag.innerHTML = `
                            ${color.charAt(0).toUpperCase() + color.slice(1)}
                            <button class="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700" onclick="removeColor('${color}')" aria-label="Remove color ${color}">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        `;
                    colorTagsContainer.appendChild(tag);
                });
            } else {
                selectedColors.classList.add('hidden');
            }

            // Show/hide selected filters section
            if (selectedSizesList.length > 0 || selectedColorsList.length > 0) {
                selectedFilters.classList.remove('hidden');
            } else {
                selectedFilters.classList.add('hidden');
            }

            // Update results count
            const baseCount = 124;
            const sizeMultiplier = selectedSizesList.length > 0 ? 0.3 + (selectedSizesList.length * 0.1) : 1;
            const colorMultiplier = selectedColorsList.length > 0 ? 0.4 + (selectedColorsList.length * 0.1) : 1;
            const filteredCount = Math.max(5, Math.floor(baseCount * sizeMultiplier * colorMultiplier));
            resultsCount.textContent = `Showing ${filteredCount} products`;
        }

        // Since both size and shoe size buttons have the same class,
        // you can loop through them together.
        sizeOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleButton(this, selectedSizesList, this.dataset.size);
            });
        });

        // Color button events
        colorOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleButton(this, selectedColorsList, this.dataset.color);
            });
        });

        // Clear button
        clearBtn.addEventListener('click', function() {
            sizeOptions.forEach(btn => btn.classList.remove('active'));
            colorOptions.forEach(btn => btn.classList.remove('active'));
            selectedSizesList = [];
            selectedColorsList = [];
            updateSelectedDisplay();
        });

        // Apply button
        applyBtn.addEventListener('click', function() {
            console.log('Filter applied - Sizes:', selectedSizesList, 'Colors:', selectedColorsList);
        });

        // Make sure global removal functions work with the new structure
        window.removeSize = function(size) {
            const btn = widget.querySelector(`.size-option[data-size="${size}"]`);
            if (btn) btn.classList.remove('active');
            const index = selectedSizesList.indexOf(size);
            if (index > -1) selectedSizesList.splice(index, 1);
            updateSelectedDisplay();
        };

        window.removeColor = function(color) {
            const btn = widget.querySelector(`.color-option[data-color="${color}"]`);
            if (btn) btn.classList.remove('active');
            const index = selectedColorsList.indexOf(color);
            if (index > -1) selectedColorsList.splice(index, 1);
            updateSelectedDisplay();
        };

        // Initialize
        updateSelectedDisplay();
    });
</script>