<?php 
include 'header.php'; 

// Get filter parameters
$filter_type = $_GET['type'] ?? 'all';
$filter_date = $_GET['date'] ?? 'all';
$search_query = $_GET['search'] ?? '';
$page = max(1, (int)($_GET['page'] ?? 1));
$per_page = 10;

// Mock data for comprehensive transaction history
$all_transactions = [
    ['id' => 'TXN-2025-000089', 'type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001234', 'amount' => 250, 'bonus' => 0, 'date' => '2025-09-01 14:30:00', 'balance_after' => 1250, 'order_id' => 'ORD-001234', 'category' => 'purchase'],
    ['id' => 'TXN-2025-000088', 'type' => 'converted', 'description' => 'Converted 500 points to wallet balance', 'amount' => -500, 'bonus' => 25, 'date' => '2025-08-28 10:15:00', 'balance_after' => 1000, 'conversion_rate' => '100 points = 10.00', 'category' => 'conversion'],
    ['id' => 'TXN-2025-000087', 'type' => 'earned', 'description' => 'Birthday Bonus - Happy Birthday!', 'amount' => 200, 'bonus' => 0, 'date' => '2025-08-26 09:00:00', 'balance_after' => 1500, 'category' => 'bonus'],
    ['id' => 'TXN-2025-000086', 'type' => 'earned', 'description' => 'Welcome Bonus - New Member', 'amount' => 100, 'bonus' => 0, 'date' => '2025-08-25 16:45:00', 'balance_after' => 1300, 'category' => 'bonus'],
    ['id' => 'TXN-2025-000085', 'type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001230', 'amount' => 180, 'bonus' => 20, 'date' => '2025-08-20 11:20:00', 'balance_after' => 1200, 'order_id' => 'ORD-001230', 'category' => 'purchase'],
    ['id' => 'TXN-2025-000084', 'type' => 'earned', 'description' => 'Review Bonus - Product Review', 'amount' => 50, 'bonus' => 0, 'date' => '2025-08-18 13:10:00', 'balance_after' => 1020, 'category' => 'activity'],
    ['id' => 'TXN-2025-000083', 'type' => 'converted', 'description' => 'Converted 300 points to wallet balance', 'amount' => -300, 'bonus' => 0, 'date' => '2025-08-15 08:30:00', 'balance_after' => 970, 'conversion_rate' => '100 points = 10.00', 'category' => 'conversion'],
    ['id' => 'TXN-2025-000082', 'type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001225', 'amount' => 320, 'bonus' => 30, 'date' => '2025-08-10 17:25:00', 'balance_after' => 1270, 'order_id' => 'ORD-001225', 'category' => 'purchase'],
    ['id' => 'TXN-2025-000081', 'type' => 'earned', 'description' => 'Referral Bonus - Friend Signup', 'amount' => 150, 'bonus' => 0, 'date' => '2025-08-05 12:40:00', 'balance_after' => 950, 'category' => 'referral'],
    ['id' => 'TXN-2025-000080', 'type' => 'expired', 'description' => 'Points Expired - 6 months old', 'amount' => -100, 'bonus' => 0, 'date' => '2025-08-01 00:00:00', 'balance_after' => 800, 'category' => 'system'],
    ['id' => 'TXN-2025-000079', 'type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001220', 'amount' => 275, 'bonus' => 25, 'date' => '2025-07-28 15:15:00', 'balance_after' => 900, 'order_id' => 'ORD-001220', 'category' => 'purchase'],
    ['id' => 'TXN-2025-000078', 'type' => 'earned', 'description' => 'Social Media Share Bonus', 'amount' => 25, 'bonus' => 0, 'date' => '2025-07-25 19:30:00', 'balance_after' => 625, 'category' => 'activity'],
    ['id' => 'TXN-2025-000077', 'type' => 'converted', 'description' => 'Converted 1000 points to wallet balance', 'amount' => -1000, 'bonus' => 100, 'date' => '2025-07-20 14:20:00', 'balance_after' => 600, 'conversion_rate' => '100 points = 10.00', 'category' => 'conversion'],
    ['id' => 'TXN-2025-000076', 'type' => 'earned', 'description' => 'Monthly Login Streak Bonus', 'amount' => 75, 'bonus' => 0, 'date' => '2025-07-15 10:00:00', 'balance_after' => 1600, 'category' => 'bonus'],
    ['id' => 'TXN-2025-000075', 'type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001215', 'amount' => 195, 'bonus' => 15, 'date' => '2025-07-10 16:45:00', 'balance_after' => 1525, 'order_id' => 'ORD-001215', 'category' => 'purchase'],
];

// Apply filters
$filtered_transactions = array_filter($all_transactions, function($transaction) use ($filter_type, $filter_date, $search_query) {
    // Type filter
    if ($filter_type !== 'all' && $transaction['type'] !== $filter_type) {
        return false;
    }
    
    // Date filter
    if ($filter_date !== 'all') {
        $transaction_date = strtotime($transaction['date']);
        $now = time();
        
        switch ($filter_date) {
            case 'today':
                if (date('Y-m-d', $transaction_date) !== date('Y-m-d', $now)) return false;
                break;
            case 'week':
                if ($transaction_date < strtotime('-7 days')) return false;
                break;
            case 'month':
                if ($transaction_date < strtotime('-30 days')) return false;
                break;
            case 'quarter':
                if ($transaction_date < strtotime('-90 days')) return false;
                break;
        }
    }
    
    // Search filter
    if (!empty($search_query)) {
        $search_fields = [
            $transaction['id'],
            $transaction['description'],
            $transaction['order_id'] ?? '',
            $transaction['category']
        ];
        
        $found = false;
        foreach ($search_fields as $field) {
            if (stripos($field, $search_query) !== false) {
                $found = true;
                break;
            }
        }
        if (!$found) return false;
    }
    
    return true;
});

// Pagination
$total_transactions = count($filtered_transactions);
$total_pages = ceil($total_transactions / $per_page);
$offset = ($page - 1) * $per_page;
$paginated_transactions = array_slice($filtered_transactions, $offset, $per_page);

// Calculate statistics
$stats = [
    'total_earned' => array_sum(array_column(array_filter($all_transactions, fn($t) => $t['amount'] > 0), 'amount')),
    'total_converted' => abs(array_sum(array_column(array_filter($all_transactions, fn($t) => $t['type'] === 'converted'), 'amount'))),
    'total_bonus' => array_sum(array_column($all_transactions, 'bonus')),
    'total_transactions' => count($all_transactions)
];
?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <?php include 'dashboard-sidebar.php'; ?>
    
    <div class="lg:col-span-3 space-y-8">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Points Transaction History</h1>
                    <p class="text-gray-600 dark:text-gray-400">Complete log of all your points activities and conversions.</p>
                </div>
                <div class="mt-4 md:mt-0">
                    <button onclick="exportHistory()" class="te-btn te-btn-outline flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Export History
                    </button>
                </div>
            </div>
        </div>

        <!-- Statistics Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-green-600 dark:text-green-400"><?= number_format($stats['total_earned']) ?></div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Earned</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-purple-600 dark:text-purple-400"><?= number_format($stats['total_converted']) ?></div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Converted</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400"><?= number_format($stats['total_bonus']) ?></div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Bonus Points</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400"><?= number_format($stats['total_transactions']) ?></div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Transactions</div>
            </div>
        </div>

        <!-- Filters -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <form method="GET" action="" class="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
                <!-- Search -->
                <div class="flex-1">
                    <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                    <div class="relative">
                        <input type="text" 
                               id="search" 
                               name="search" 
                               value="<?= htmlspecialchars($search_query) ?>"
                               placeholder="Search by ID, description, order..."
                               class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <!-- Type Filter -->
                <div>
                    <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                    <select id="type" name="type" class="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option value="all" <?= $filter_type === 'all' ? 'selected' : '' ?>>All Types</option>
                        <option value="earned" <?= $filter_type === 'earned' ? 'selected' : '' ?>>Points Earned</option>
                        <option value="converted" <?= $filter_type === 'converted' ? 'selected' : '' ?>>Points Converted</option>
                        <option value="expired" <?= $filter_type === 'expired' ? 'selected' : '' ?>>Points Expired</option>
                    </select>
                </div>
                
                <!-- Date Filter -->
                <div>
                    <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
                    <select id="date" name="date" class="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option value="all" <?= $filter_date === 'all' ? 'selected' : '' ?>>All Time</option>
                        <option value="today" <?= $filter_date === 'today' ? 'selected' : '' ?>>Today</option>
                        <option value="week" <?= $filter_date === 'week' ? 'selected' : '' ?>>Last 7 Days</option>
                        <option value="month" <?= $filter_date === 'month' ? 'selected' : '' ?>>Last 30 Days</option>
                        <option value="quarter" <?= $filter_date === 'quarter' ? 'selected' : '' ?>>Last 3 Months</option>
                    </select>
                </div>
                
                <!-- Filter Actions -->
                <div class="flex space-x-2">
                    <button type="submit" class="te-btn te-btn-primary">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                        </svg>
                        Filter
                    </button>
                    <a href="dashboard-points-history.php" class="te-btn te-btn-outline">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Clear
                    </a>
                </div>
            </form>
        </div>

        <!-- Results Summary -->
        <?php if (!empty($search_query) || $filter_type !== 'all' || $filter_date !== 'all'): ?>
            <div class="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div class="flex items-center">
                    <svg class="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-sm text-blue-800 dark:text-blue-200">
                        Showing <?= number_format($total_transactions) ?> transactions
                        <?php if (!empty($search_query)): ?>
                            matching "<?= htmlspecialchars($search_query) ?>"
                        <?php endif; ?>
                        <?php if ($filter_type !== 'all'): ?>
                            • Type: <?= ucfirst($filter_type) ?>
                        <?php endif; ?>
                        <?php if ($filter_date !== 'all'): ?>
                            • Period: <?= ucfirst($filter_date) ?>
                        <?php endif; ?>
                    </span>
                </div>
            </div>
        <?php endif; ?>

        <!-- Transaction History -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Transaction History</h2>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Page <?= $page ?> of <?= $total_pages ?> (<?= number_format($total_transactions) ?> transactions)
                </p>
            </div>
            
            <?php if (empty($paginated_transactions)): ?>
                <div class="p-12 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No transactions found</h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search criteria.</p>
                </div>
            <?php else: ?>
                <div class="divide-y divide-gray-200 dark:divide-gray-700">
                    <?php foreach ($paginated_transactions as $transaction): ?>
                        <div class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div class="flex items-start justify-between">
                                <div class="flex items-start space-x-4">
                                    <!-- Transaction Icon -->
                                    <div class="flex-shrink-0">
                                        <?php
                                        $icon_colors = [
                                            'earned' => 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
                                            'converted' => 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
                                            'expired' => 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                                        ];
                                        ?>
                                        <div class="p-2 rounded-full <?= $icon_colors[$transaction['type']] ?? $icon_colors['earned'] ?>">
                                            <?php if ($transaction['type'] === 'earned'): ?>
                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                                </svg>
                                            <?php elseif ($transaction['type'] === 'converted'): ?>
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                                </svg>
                                            <?php else: ?>
                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"></path>
                                                </svg>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    
                                    <!-- Transaction Details -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center space-x-2 mb-1">
                                            <p class="text-sm font-medium text-gray-900 dark:text-white">
                                                <?= htmlspecialchars($transaction['description']) ?>
                                            </p>
                                            <?php if ($transaction['bonus'] > 0): ?>
                                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                    🎁 Bonus
                                                </span>
                                            <?php endif; ?>
                                        </div>
                                        
                                        <div class="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                            <span class="flex items-center">
                                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <?= date('M j, Y g:i A', strtotime($transaction['date'])) ?>
                                            </span>
                                            
                                            <span class="flex items-center">
                                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                                </svg>
                                                ID: <?= $transaction['id'] ?>
                                            </span>
                                            
                                            <?php if (isset($transaction['order_id'])): ?>
                                                <span class="flex items-center">
                                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                                    </svg>
                                                    <a href="dashboard-orders.php?order=<?= $transaction['order_id'] ?>" class="text-primary-600 hover:text-primary-700">
                                                        <?= $transaction['order_id'] ?>
                                                    </a>
                                                </span>
                                            <?php endif; ?>
                                            
                                            <?php if (isset($transaction['conversion_rate'])): ?>
                                                <span class="flex items-center">
                                                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                                    </svg>
                                                    Rate: <?= $transaction['conversion_rate'] ?>
                                                </span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Transaction Amount -->
                                <div class="flex flex-col items-end text-right">
                                    <div class="flex items-center space-x-2">
                                        <span class="text-lg font-semibold <?= $transaction['amount'] > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' ?>">
                                            <?= $transaction['amount'] > 0 ? '+' : '' ?><?= number_format($transaction['amount']) ?> points
                                        </span>
                                    </div>
                                    
                                    <?php if ($transaction['bonus'] > 0): ?>
                                        <div class="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                            +<?= number_format($transaction['bonus']) ?> bonus
                                        </div>
                                    <?php endif; ?>
                                    
                                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Balance: <?= number_format($transaction['balance_after']) ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <!-- Pagination -->
        <?php if ($total_pages > 1): ?>
            <div class="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600 sm:px-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="flex-1 flex justify-between sm:hidden">
                    <?php if ($page > 1): ?>
                        <a href="?<?= http_build_query(array_merge($_GET, ['page' => $page - 1])) ?>" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            Previous
                        </a>
                    <?php endif; ?>
                    <?php if ($page < $total_pages): ?>
                        <a href="?<?= http_build_query(array_merge($_GET, ['page' => $page + 1])) ?>" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            Next
                        </a>
                    <?php endif; ?>
                </div>
                
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700 dark:text-gray-300">
                            Showing <span class="font-medium"><?= number_format($offset + 1) ?></span> to 
                            <span class="font-medium"><?= number_format(min($offset + $per_page, $total_transactions)) ?></span> of 
                            <span class="font-medium"><?= number_format($total_transactions) ?></span> results
                        </p>
                    </div>
                    
                    <div>
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <?php if ($page > 1): ?>
                                <a href="?<?= http_build_query(array_merge($_GET, ['page' => $page - 1])) ?>" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <span class="sr-only">Previous</span>
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            <?php endif; ?>
                            
                            <?php
                            // Calculate page range to show
                            $start_page = max(1, $page - 2);
                            $end_page = min($total_pages, $page + 2);
                            
                            // Show first page if not in range
                            if ($start_page > 1): ?>
                                <a href="?<?= http_build_query(array_merge($_GET, ['page' => 1])) ?>" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">1</a>
                                <?php if ($start_page > 2): ?>
                                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">...</span>
                                <?php endif; ?>
                            <?php endif; ?>
                            
                            <?php for ($i = $start_page; $i <= $end_page; $i++): ?>
                                <?php if ($i === $page): ?>
                                    <span class="relative inline-flex items-center px-4 py-2 border border-primary-500 bg-primary-50 dark:bg-primary-900 text-sm font-medium text-primary-600 dark:text-primary-400"><?= $i ?></span>
                                <?php else: ?>
                                    <a href="?<?= http_build_query(array_merge($_GET, ['page' => $i])) ?>" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"><?= $i ?></a>
                                <?php endif; ?>
                            <?php endfor; ?>
                            
                            <!-- Show last page if not in range -->
                            <?php if ($end_page < $total_pages): ?>
                                <?php if ($end_page < $total_pages - 1): ?>
                                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">...</span>
                                <?php endif; ?>
                                <a href="?<?= http_build_query(array_merge($_GET, ['page' => $total_pages])) ?>" class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"><?= $total_pages ?></a>
                            <?php endif; ?>
                            
                            <?php if ($page < $total_pages): ?>
                                <a href="?<?= http_build_query(array_merge($_GET, ['page' => $page + 1])) ?>" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <span class="sr-only">Next</span>
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            <?php endif; ?>
                        </nav>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="dashboard-points.php" class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white">Convert Points</h4>
                        <p class="text-sm text-gray-500">Turn points into wallet balance</p>
                    </div>
                </a>
                
                <a href="dashboard.php" class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white">Shop & Earn</h4>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Make purchases to earn more points</p>
                    </div>
                </a>
                
                <button onclick="shareProgress()" class="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="ml-4">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white">Share Progress</h4>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Tell friends about your rewards</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
</div>

<script>
// Export history functionality
function exportHistory() {
    // In a real application, this would generate and download a CSV/PDF
    const data = <?= json_encode($all_transactions) ?>;
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Transaction ID,Type,Description,Points,Bonus,Date,Balance After\n";
    
    data.forEach(function(transaction) {
        const row = [
            transaction.id,
            transaction.type,
            transaction.description.replace(/,/g, ';'),
            transaction.amount,
            transaction.bonus,
            transaction.date,
            transaction.balance_after
        ].join(",");
        csvContent += row + "\n";
    });
    
    // Download the file
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "points_history_" + new Date().toISOString().split('T')[0] + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('History exported successfully!', 'success');
}

// Share progress functionality
function shareProgress() {
    const stats = <?= json_encode($stats) ?>;
    const text = `🎉 My Rewards Progress:\n• ${stats.total_earned.toLocaleString()} points earned\n• ${stats.total_converted.toLocaleString()} points converted\n• ${stats.total_bonus.toLocaleString()} bonus points received\n\nJoin me and start earning rewards too!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Rewards Progress',
            text: text
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Progress copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to share. Please try again.', 'error');
        });
    }
}

// Simple notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('transform', 'translate-x-0'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transform', 'translate-x-full');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Auto-submit form on filter change
document.addEventListener('DOMContentLoaded', function() {
    const typeFilter = document.getElementById('type');
    const dateFilter = document.getElementById('date');
    
    typeFilter.addEventListener('change', function() {
        this.form.submit();
    });
    
    dateFilter.addEventListener('change', function() {
        this.form.submit();
    });
    
    // Add loading state to filter form
    const filterForm = document.querySelector('form');
    filterForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Loading...';
    });
});
</script>

<?php include 'footer.php'; ?>