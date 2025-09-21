<?php
// Define your footer menus with 5 links each
$footer_menus = [
    [
        'title' => 'Company',
        'links' => [
            ['name' => 'About Us', 'url' => '#about'],
            ['name' => 'Careers', 'url' => '#careers'],
            ['name' => 'Press', 'url' => '#press'],
            ['name' => 'Blog', 'url' => '#blog'],
            ['name' => 'Partners', 'url' => '#partners'],
        ],
    ],
    [
        'title' => 'Support',
        'links' => [
            ['name' => 'Help Center', 'url' => '#help'],
            ['name' => 'Contact', 'url' => '#contact'],
            ['name' => 'FAQs', 'url' => '#faqs'],
            ['name' => 'Live Chat', 'url' => '#chat'],
            ['name' => 'Guides', 'url' => '#guides'],
        ],
    ],
    [
        'title' => 'Legal',
        'links' => [
            ['name' => 'Privacy Policy', 'url' => 'privacy-page.php'],
            ['name' => 'Terms of Service', 'url' => 'terms-page.php'],
            ['name' => 'Cookies', 'url' => 'cookies-page.php'],
            ['name' => 'Disclaimer', 'url' => '#disclaimer'],
            ['name' => 'Accessibility', 'url' => '#accessibility'],
        ],
    ],
    [
        'title' => 'Social',
        'links' => [
            ['name' => 'Facebook', 'url' => '#facebook'],
            ['name' => 'Twitter', 'url' => '#twitter'],
            ['name' => 'Instagram', 'url' => '#instagram'],
            ['name' => 'LinkedIn', 'url' => '#linkedin'],
            ['name' => 'YouTube', 'url' => '#youtube'],
        ],
    ],
];

// Render the menus
foreach ($footer_menus as $menu) {
    echo '<div class="te-footer-widget footer-widget-1">';
    echo '  <div class="footer-widget">';
    echo '      <div class="te-footer-title">' . $menu['title'] . '</div>';
    echo '      <div class="menu-footer-container">';
    echo '          <ul class="menu">';
    
    foreach ($menu['links'] as $link) {
        echo '<li><a href="' . $link['url'] . '" class="te-footer-link">' . $link['name'] . '</a></li>';
    }
    
    echo '          </ul>';
    echo '      </div>';
    echo '  </div>';
    echo '</div>';
}
?>
