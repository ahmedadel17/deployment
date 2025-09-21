<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <?php include 'dashboard-sidebar.php'; ?>

    <!-- Main Content -->
    <div class="lg:col-span-3 space-y-8">

        <!-- Welcome Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Ahmed!</h1>
            <p class="text-gray-600 dark:text-gray-400">Here's what's happening with your account</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">


            <!-- Wallet Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                        </svg>
                    </div>
                    <div class="ms-4">
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white"><span>$</span><span>50.00</span></p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Wallet Balance</p>
                    </div>
                </div>
            </div>

            <!-- Points Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </div>
                    <div class="ms-4">
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">1,250</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Reward Points</p>
                    </div>
                </div>
            </div>

            <!-- Total Spent Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" width="13" height="15" viewBox="0 0 13 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.37833 14.7315L12.153 13.917L12.7727 12.3003L7.99858 13.1148L7.37833 14.7315Z"></path>
                            <path d="M9.09164 8.45597L12.3802 7.89488L13 6.27819L9.14046 6.9369L9.31351 1.58047L7.7836 2.80667L7.6416 7.19279L6.19205 7.4403L6.40998 0.731445L4.88006 1.95765L4.69468 7.6952L1.52292 8.23656L0.903169 9.85325L4.64587 9.21476L4.58522 11.0933L0.664042 11.7623L0.0437927 13.3785L4.3244 12.6478C4.51817 12.6148 4.6932 12.5132 4.81794 12.3619L5.90559 11.0435C6.02097 10.9039 6.08654 10.7299 6.09246 10.5489L6.14373 8.95838L7.59328 8.71087L7.49714 11.6879L12.3142 10.866L12.9339 9.24927L9.04431 9.91291L9.09164 8.45498V8.45597Z"></path>
                        </svg>
                    </div>
                    <div class="ms-4">
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">
                            <span class="icon-riyal-symbol"></span>
                            <span>65.00</span>
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                    </div>
                </div>
            </div>

            <!-- Wallet Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                        <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <div class="ms-4">
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Wishlist Items</p>
                    </div>
                </div>
            </div>

            <!-- Total Orders -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center">
                    <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                    <div class="ms-4">
                        <p class="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                    </div>
                </div>
            </div>



        </div>

        <!-- Loyalty Level Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Loyalty Status</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400">You are currently a <span class="font-bold text-primary-600">Silver</span> member.
                        You're only <span class="font-bold">750 points</span> away from reaching <span class="font-bold text-yellow-500">Gold</span>!
                    </p>
                </div>
                <a href="dashboard-points.php" class="text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-400 text-sm font-medium">See Benefits</a>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-primary-600 h-2.5 rounded-full" style="width: 50%"></div>
            </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                <a href="dashboard-orders.php" class="text-sm font-medium text-primary-600 hover:text-primary-700">View All</a>
            </div>
            <div class="p-6">
                <div class="overflow-x-auto">
                    <?php
                    // Dummy data for recent orders
                    $orders = [
                        ['id' => 'ORD-2024-001234', 'date' => 'September 1, 2025', 'status' => ['text' => 'Delivered', 'color' => 'green'], 'total' => '65.00'],
                        ['id' => 'ORD-2024-001233', 'date' => 'August 28, 2025', 'status' => ['text' => 'Shipped', 'color' => 'blue'], 'total' => '85.00'],
                        ['id' => 'ORD-2024-001232', 'date' => 'August 20, 2025', 'status' => ['text' => 'Processing', 'color' => 'yellow'], 'total' => '45.00'],
                    ];
                    ?>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Order ID</th>
                                <th scope="col" class="px-6 py-3">Date</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                                <th scope="col" class="px-6 py-3">Total</th>
                                <th scope="col" class="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($orders as $order) : ?>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td class="px-6 py-4 font-medium text-gray-900 dark:text-white"><?= $order['id'] ?></td>
                                    <td class="px-6 py-4"><?= $order['date'] ?></td>
                                    <td class="px-6 py-4">
                                        <span class="px-3 py-1 bg-<?= $order['status']['color'] ?>-100 dark:bg-<?= $order['status']['color'] ?>-900 text-<?= $order['status']['color'] ?>-800 dark:text-<?= $order['status']['color'] ?>-200 text-xs font-medium rounded-full">
                                            <?= $order['status']['text'] ?>
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="icon-riyal-symbol text-xs"></span>
                                        <span><?= $order['total'] ?></span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-primary-600 dark:text-primary-100 hover:underline">View</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Wishlist -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">My Wishlist</h2>
                <a href="dashboard-wishlist.php" class="text-sm font-medium text-primary-600 hover:text-primary-700">View All</a>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <?php
                    // Dummy data for wishlist
                    $wishlist_items = [
                        ['title' => 'Straight-leg jeans', 'image' => 'assets/images/product-1.jpg', 'price' => '65.00'],
                        ['title' => 'Cotton T-shirt', 'image' => 'assets/images/product-2.jpg', 'price' => '65.00'],
                        ['title' => 'Straight-leg jeans', 'image' => 'assets/images/product-3.jpg', 'price' => '65.00'],
                        ['title' => 'Striped T-shirt', 'image' => 'assets/images/product-4.jpg', 'price' => '65.00'],
                    ];
                    ?>
                    <?php foreach ($wishlist_items as $item) : ?>
                        <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden group">
                            <div class="relative w-full aspect-square">
                                <img src="<?= $item['image'] ?>" alt="<?= $item['title'] ?>" class="w-full h-full object-cover">
                            </div>
                            <div class="p-4">
                                <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1"><?= $item['title'] ?></h3>
                                <p class="text-base text-gray-900 dark:text-white font-semibold mt-1">
                                    <span class="icon-riyal-symbol text-xs"></span>
                                    <span><?= $item['price'] ?></span>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include 'footer.php'; ?>