<nav class="te-navbar whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">

    <div class="te-navbar-container container">

        <div class="te-navbar-content flex justify-between items-center min-h-20 relative">

            <!-- Logo/Brand Section -->
            <div class="te-navbar-brand">
                <a href="index.php" class="flex items-center gap-3 no-underline">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div><span class="text-xl font-bold text-gray-600 dark:text-white">Naseem</span>
                </a>
            </div>

            <?php include 'template-parts/header/header-search.php'; ?>

            <!-- Header Actions -->
            <div class="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0">

                <div class="items-center hidden lg:flex gap-2">

                    <!-- Notification -->
                    <?php include 'template-parts/header/header-notification.php'; ?>

                    <!-- Wishlist -->
                    <?php include 'template-parts/header/header-wishlist.php'; ?>

                    <!-- Account -->
                    <?php include 'template-parts/header/header-account.php'; ?>

                    <!-- Cart -->
                    <?php include 'template-parts/header/header-cart.php'; ?>

                </div>

                <!-- Dark Mode Toggle Button -->
                <?php include 'template-parts/header/header-darkmode.php'; ?>

                <!-- Mobile Menu Toggle Button -->
                <?php include 'template-parts/header/header-mobile-menu.php'; ?>

            </div><!-- header-actions -->

        </div><!-- te-navbar-content -->

        <!-- Desktop Navigation Menu -->
        <?php include 'template-parts/header/header-desktop-menu.php'; ?>

    </div>
</nav>