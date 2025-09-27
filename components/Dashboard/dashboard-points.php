<?php
include 'header.php';

// Enhanced data with more realistic values
$current_points = 1250;
$wallet_balance = 50.00;
$total_earned_lifetime = 3250;
$total_converted_lifetime = 2000;
$points_to_next_tier = 750; // Points needed for Gold
$current_tier = 'Silver';
$next_tier = 'Gold';

// Conversion tiers with bonuses
$conversion_tiers = [
    ['points' => 100, 'bonus' => 0, 'value' => 10.00, 'label' => 'Basic'],
    ['points' => 500, 'bonus' => 5, 'value' => 52.50, 'label' => 'Popular', 'highlight' => true],
    ['points' => 1000, 'bonus' => 10, 'value' => 110.00, 'label' => 'Best Value']
];

// Recent transactions with more detail
$recent_transactions = [
    ['type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001234', 'amount' => 250, 'date' => 'Sep 1, 2025', 'balance_after' => 1250],
    ['type' => 'converted', 'description' => 'Converted to wallet balance', 'amount' => -500, 'date' => 'Aug 28, 2025', 'balance_after' => 1000],
    ['type' => 'earned', 'description' => 'Welcome Bonus', 'amount' => 100, 'date' => 'Aug 25, 2025', 'balance_after' => 1500],
    ['type' => 'earned', 'description' => 'Purchase Reward - Order #ORD-001230', 'amount' => 180, 'date' => 'Aug 20, 2025', 'balance_after' => 1400],
];
?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Rewards & Wallet Center</h1>
            <p class="text-gray-600 dark:text-gray-400">Manage your points, track your progress, and maximize your rewards.</p>
        </div>


        <!-- Loyalty Progress -->
        <div class="bg-white dark:bg-gray-800">
            <div class="bg-secondary-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm border border-secondary-200 dark:border-gray-700">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loyalty Progress</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            You are currently a <span class="font-bold text-gray-500 dark:text-gray-300"><?= $current_tier ?></span> member.
                            Only <span class="font-bold text-yellow-500"><?= $points_to_next_tier ?> points</span> away from <span class="font-bold text-yellow-500"><?= $next_tier ?></span>!
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-gray-900 dark:text-white"><?= round(($current_points / ($current_points + $points_to_next_tier)) * 100) ?>%</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Complete</div>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="w-full bg-white rounded-full h-3 dark:bg-gray-600 mb-4">
                    <div class="bg-gradient-to-r from-primary-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
                        style="width: <?= round(($current_points / ($current_points + $points_to_next_tier)) * 100) ?>%"></div>
                </div>

                <!-- Tier Benefits Preview -->
                <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span><?= $current_tier ?> (Current)</span>
                    <span><?= $next_tier ?> (+<?= $points_to_next_tier ?> points)</span>
                </div>
            </div>
        </div>

        <!-- Current Balances -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Wallet Balance -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 flex justify-center items-center bg-purple-100 dark:bg-purple-800 rounded-full">
                        <svg class="w-6 h-6 text-purple-600 dark:text-purple-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                        </svg>
                    </div>
                    <span class="text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded-full">Available</span>
                </div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Wallet Balance</h2>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    <span class="icon-riyal-symbol text-lg mr-1"></span><?= number_format($wallet_balance, 2) ?>
                </p>
                <p class="text-sm text-purple-600 dark:text-purple-300">Ready to spend</p>
            </div>

            <!-- Reward Points -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg shadow-sm border border-green-200 dark:border-green-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 flex justify-center items-center bg-green-100 dark:bg-green-800 rounded-full">
                        <svg class="w-6 h-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </div>
                    <span class="text-xs font-medium text-green-600 dark:text-green-300 bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full">Active</span>
                </div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reward Points</h2>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1"><?= number_format($current_points) ?></p>
                <p class="text-sm text-green-600 dark:text-green-300">
                    Worth <span class="icon-riyal-symbol text-xs"></span><?= number_format($current_points / 10, 2) ?>
                </p>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="#conversion-section" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group">
                <div class="flex items-center">
                    <div class="w-10 h-10 flex justify-center items-center bg-primary-100 rounded-full group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                    </div>
                    <div class="ms-4">
                        <h3 class="font-medium text-gray-900 dark:text-white">Convert Points</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Turn points into cash</p>
                    </div>
                </div>
            </a>

            <a href="dashboard-points-history.php" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group">
                <div class="flex items-center">
                    <div class="w-10 h-10 flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                    </div>
                    <div class="ms-4">
                        <h3 class="font-medium text-gray-900 dark:text-white">View History</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Track all transactions</p>
                    </div>
                </div>
            </a>

            <div class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-700 p-6">
                <div class="flex items-center">
                    <div class="w-10 h-10 flex justify-center items-center bg-yellow-100 dark:bg-yellow-800 rounded-full">
                        <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="ms-4">
                        <h3 class="font-medium text-gray-900 dark:text-white">Earn More</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Shop & earn points</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Conversion Options -->
        <div id="conversion-section" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Convert Points to Wallet Balance</h2>

            <!-- Conversion Tiers -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <?php foreach ($conversion_tiers as $tier): ?>
                    <div class="conversion-option border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md <?= isset($tier['highlight']) ? 'border-primary-500 bg-primary-50/20 dark:bg-primary-500 dark:border-primary-400' : 'border-gray-200 dark:border-gray-600 hover:border-primary-300' ?>"
                        data-points="<?= $tier['points'] ?>" data-value="<?= $tier['value'] ?>">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-medium text-gray-900 dark:text-white"><?= $tier['points'] ?> Points</h3>
                            <?php if (isset($tier['highlight'])): ?>
                                <span class="text-xs bg-primary-100 text-white dark:bg-primary-200 px-2 py-1 rounded-full"><?= $tier['label'] ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            <span class="icon-riyal-symbol text-sm"></span><?= number_format($tier['value'], 2) ?>
                        </div>
                        <?php if ($tier['bonus'] > 0): ?>
                            <div class="text-sm text-green-600 dark:text-green-400 font-medium">
                                +<?= $tier['bonus'] ?>% Bonus!
                            </div>
                        <?php endif; ?>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <?= $tier['points'] <= $current_points ? 'Available' : 'Need ' . ($tier['points'] - $current_points) . ' more points' ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Custom Conversion -->
            <div class="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                <h3 class="font-medium text-gray-900 dark:text-white mb-4">Custom Amount</h3>
                <form action="process-conversion.php" method="POST" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="points-to-convert" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Points to Convert</label>
                            <input type="number"
                                id="points-to-convert"
                                name="points_to_convert"
                                min="100"
                                max="<?= $current_points ?>"
                                step="10"
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                placeholder="Enter points">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">You'll Receive</label>
                            <div id="conversion-result" class="block w-full rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white">
                                <span class="icon-riyal-symbol text-sm mr-2"></span><span id="result-amount">0.00</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            Conversion Rate: 100 points = <span class="icon-riyal-symbol text-xs"></span>10.00
                        </p>
                        <button type="submit" class="te-btn te-btn-primary" disabled id="convert-btn">
                            Convert Points
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-gray-900 dark:text-white"><?= number_format($total_earned_lifetime) ?></div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Points Earned</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-gray-900 dark:text-white"><?= number_format($total_converted_lifetime) ?></div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Points Converted</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    <span class="icon-riyal-symbol text-lg mr-1"></span><?= number_format($total_converted_lifetime / 10, 2) ?>
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Total Value Earned</div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                <a href="dashboard-points-history.php" class="text-sm font-medium text-primary-600 hover:text-primary-700">View All</a>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <?php foreach ($recent_transactions as $transaction): ?>
                        <div class="flex items-center justify-between p-4 border rounded-lg border-gray-100 dark:border-gray-700">
                            <div class="flex items-center">
                                <div class="p-2 rounded-full <?= $transaction['type'] == 'earned' ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' ?>">
                                    <?php if ($transaction['type'] == 'earned'): ?>
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                        </svg>
                                    <?php else: ?>
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                        </svg>
                                    <?php endif; ?>
                                </div>
                                <div class="ms-4">
                                    <p class="font-medium text-gray-900 dark:text-white"><?= $transaction['description'] ?></p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400"><?= $transaction['date'] ?></p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-semibold <?= $transaction['type'] == 'earned' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' ?>">
                                    <?= $transaction['type'] == 'earned' ? '+' : '' ?><?= number_format($transaction['amount']) ?> points
                                </div>
                                <div class="text-xs text-gray-500 dark:text-gray-400">
                                    Balance: <?= number_format($transaction['balance_after']) ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const pointsInput = document.getElementById('points-to-convert');
        const resultAmount = document.getElementById('result-amount');
        const convertBtn = document.getElementById('convert-btn');
        const conversionOptions = document.querySelectorAll('.conversion-option');

        // Handle conversion options selection
        conversionOptions.forEach(option => {
            option.addEventListener('click', function() {
                if (this.querySelector('.text-xs').textContent.includes('Need')) return;

                const points = this.dataset.points;
                const value = this.dataset.value;

                pointsInput.value = points;
                resultAmount.textContent = parseFloat(value).toFixed(2);
                convertBtn.disabled = false;

                // Highlight selected option
                conversionOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-primary-500'));
                this.classList.add('ring-2', 'ring-primary-500');
            });
        });

        // Handle custom input
        pointsInput.addEventListener('input', function() {
            const points = parseInt(this.value) || 0;
            const value = (points / 100) * 10;

            resultAmount.textContent = value.toFixed(2);
            convertBtn.disabled = points < 100 || points > <?= $current_points ?>;

            // Remove highlighting from preset options
            conversionOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-primary-500'));
        });
    });
</script>

<?php include 'footer.php'; ?>