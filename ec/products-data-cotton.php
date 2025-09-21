<?php

$products = [
    [
        'id' => 1,
        'image' => 'assets/images/cotton/cotton-pro-1.jpg',
        'hover' => 'assets/images/cotton/cotton-pro-1-flip.jpg',
        'title' => 'رداء قطني مطرز بالأكمام الطويلة',
        'price' => '720.00',
        'old_price' => '850.00',
        'colors' => ['#285c7c'],
        'sizes'  => ['SX', 'S', 'M', 'L', 'XL'],
        'category' => 'أرواب ومناشف',
        'badges' => [
            ['type' => 'sale', 'text' => 'تخفيض']
        ]
    ],
    [
        'id' => 2,
        'image' => 'assets/images/cotton/cotton-pro-2.jpg',
        'title' => 'منشفة قطنية فاخرة بالشعار',
        'price' => '150.00',
        'old_price' => null,
        'colors' => ['#87abc3', '#5e5f63', '#af9097'],
        'sizes'  => ['M', 'L'],
        'category' => 'أرواب ومناشف',
        'badges' => [
            ['type' => 'bestseller', 'text' => 'الأكثر مبيعًا']
        ]
    ],
    [
        'id' => 3,
        'image' => 'assets/images/cotton/cotton-pro-3.jpg',
        'title' => 'لباد صوف طبيعي عالي الجودة',
        'price' => '450.00',
        'old_price' => null,
        'colors' => ['#4981c4'],
        'sizes'  => ['40', '41', '42', '43'],
        'category' => 'لباد',
        'badges' => [
            ['type' => 'new', 'text' => 'جديد']
        ]
    ],
    [
        'id' => 4,
        'image' => 'assets/images/cotton/cotton-pro-4.jpg',
        'hover' => 'assets/images/cotton/cotton-pro-4-flip.jpg',
        'title' => 'لباد شتوي مقاوم للماء',
        'price' => '1,200.00',
        'colors' => ['#87abc3', '#5e5f63', '#af9097'],
        'sizes'  => ['M', 'L'],
        'category' => 'لباد',
        'badges' => [
            ['type' => 'sale', 'text' => 'تخفيض']
        ]
    ],
    [
        'id' => 5,
        'image' => 'assets/images/cotton/cotton-pro-5.jpg',
        'hover' => 'assets/images/cotton/cotton-pro-5-flip.jpg',
        'title' => 'مخدة طبية للرقبة بالذاكرة الرغوية',
        'price' => '200.00',
        'old_price' => '300.00',
        'colors' => ['#87abc3', '#5e5f63', '#af9097'],
        'sizes'  => ['M', 'L'],
        'category' => 'مخدات',
    ],
    [
        'id' => 6,
        'image' => 'assets/images/cotton/cotton-pro-6.jpg',
        'title' => 'مخدة قطنية ناعمة للنوم',
        'price' => '100.00',
        'colors' => ['white', 'black'],
        'sizes'  => ['SX', 'S', 'M', 'L', 'XL'],
        'category' => 'مخدات'
    ],

    [
        'id' => 7,
        'image' => 'assets/images/cotton/cotton-pro-7.jpg',
        'title' => 'واقي مرتبة مقاوم للماء والبقع',
        'price' => '890.00',
        'old_price' => '1200.00',
        'colors' => ['black', 'white'],
        'sizes'  => ['XS', 'S', 'M', 'L', 'XL'],
        'category' => 'واقي مراتب',
        'badges' => [
            ['type' => 'sale', 'text' => 'تخفيض']
        ]
    ],

    [
        'id' => 8,
        'image' => 'assets/images/cotton/cotton-pro-1.jpg',
        'hover' => 'assets/images/cotton/cotton-pro-1-flip.jpg',
        'title' => 'رداء قطني مطرز بالأكمام الطويلة',
        'price' => '720.00',
        'old_price' => '850.00',
        'colors' => ['#285c7c'],
        'sizes'  => ['SX', 'S', 'M', 'L', 'XL'],
        'category' => 'أرواب ومناشف',
        'badges' => [
            ['type' => 'sale', 'text' => 'تخفيض']
        ]
    ],
    [
        'id' => 9,
        'image' => 'assets/images/cotton/cotton-pro-2.jpg',
        'title' => 'منشفة قطنية فاخرة بالشعار',
        'price' => '150.00',
        'old_price' => null,
        'colors' => ['#87abc3', '#5e5f63', '#af9097'],
        'sizes'  => ['M', 'L'],
        'category' => 'أرواب ومناشف',
        'badges' => [
            ['type' => 'bestseller', 'text' => 'الأكثر مبيعًا']
        ]
    ],
    [
        'id' => 10,
        'image' => 'assets/images/cotton/cotton-pro-3.jpg',
        'title' => 'لباد صوف طبيعي عالي الجودة',
        'price' => '450.00',
        'old_price' => null,
        'colors' => ['#4981c4'],
        'sizes'  => ['40', '41', '42', '43'],
        'category' => 'لباد',
        'badges' => [
            ['type' => 'new', 'text' => 'جديد']
        ]
    ],

];

function render_products($products, $options = [])
{
    $selectedCategory = $options['category'] ?? null;
    $carousel = $options['carousel'] ?? false;
    $limit = $options['limit'] ?? null;

    $count = 0;

    foreach ($products as $product) {
        if ($selectedCategory && $product['category'] !== $selectedCategory) continue;

        if ($limit !== null && $count >= $limit) break;

        if ($carousel) {
            echo '<div class="embla__slide flex-shrink-0 py-1 
                [flex:0_0_calc(50%-0.75rem)] 
                md:[flex:0_0_calc(33.333%-0.75rem)] 
                lg:[flex:0_0_calc(25%-1.2rem)] 
                xl:[flex:0_0_calc(20%-1.5rem)]">';
        }

        include 'template-parts/product/product-content-cotton.php';

        if ($carousel) {
            echo '</div>';
        }

        $count++;
    }
}
