<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                    <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                        Mark all as read
                    </button>
                </div>
            </div>
            
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
                
                <?php
                $notifications = [
                    [
                        'id' => 1,
                        'type' => 'order',
                        'title' => 'Order Delivered',
                        'message' => 'Your order #ORD-2024-001234 has been delivered successfully.',
                        'time' => '2 hours ago',
                        'unread' => true,
                        'icon' => '📦'
                    ],
                    [
                        'id' => 2,
                        'type' => 'system',
                        'title' => 'Profile Updated',
                        'message' => 'Your profile information has been updated successfully.',
                        'time' => '1 day ago',
                        'unread' => true,
                        'icon' => '👤'
                    ],
                    [
                        'id' => 3,
                        'type' => 'order',
                        'title' => 'Order Shipped',
                        'message' => 'Your order #ORD-2024-001233 is on its way.',
                        'time' => '2 days ago',
                        'unread' => false,
                        'icon' => '🚚'
                    ],
                    [
                        'id' => 4,
                        'type' => 'promotion',
                        'title' => 'Special Offer',
                        'message' => 'Get 20% off on your next order. Limited time offer!',
                        'time' => '3 days ago',
                        'unread' => false,
                        'icon' => '🎉'
                    ],
                    [
                        'id' => 5,
                        'type' => 'system',
                        'title' => 'Password Changed',
                        'message' => 'Your password was changed successfully.',
                        'time' => '5 days ago',
                        'unread' => false,
                        'icon' => '🔒'
                    ],
                    [
                        'id' => 6,
                        'type' => 'order',
                        'title' => 'Order Confirmed',
                        'message' => 'Your order #ORD-2024-001232 has been confirmed and is being processed.',
                        'time' => '1 week ago',
                        'unread' => false,
                        'icon' => '✅'
                    ]
                ];
                ?>

                <?php foreach ($notifications as $notification): ?>
                    <div class="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors <?= $notification['unread'] ? 'bg-blue-50 dark:bg-blue-900/20' : '' ?>">
                        <div class="flex items-start space-x-4 rtl:space-x-reverse">
                            <div class="text-2xl"><?= $notification['icon'] ?></div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-medium text-gray-900 dark:text-white <?= $notification['unread'] ? 'font-semibold' : '' ?>">
                                        <?= $notification['title'] ?>
                                        <?php if ($notification['unread']): ?>
                                            <span class="ms-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                                        <?php endif; ?>
                                    </h3>
                                    <span class="text-xs text-gray-500 dark:text-gray-400"><?= $notification['time'] ?></span>
                                </div>
                                <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                    <?= $notification['message'] ?>
                                </p>
                                <div class="mt-2 flex space-x-2 rtl:space-x-reverse">
                                    <?php if ($notification['unread']): ?>
                                        <button class="text-xs text-primary-600 dark:text-primary-400 hover:underline">
                                            Mark as read
                                        </button>
                                    <?php endif; ?>
                                    <button class="text-xs text-red-600 dark:text-red-400 hover:underline">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>

                <!-- Empty State (when no notifications) -->
                <?php if (empty($notifications)): ?>
                    <div class="p-12 text-center">
                        <div class="text-6xl mb-4">🔔</div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
                        <p class="text-gray-500 dark:text-gray-400">You're all caught up! Check back later for new notifications.</p>
                    </div>
                <?php endif; ?>

            </div>
        </div>

        <!-- Notification Settings -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
            </div>
            <div class="p-6">
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-gray-900 dark:text-white">Order Updates</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Get notified about order status changes</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-gray-900 dark:text-white">Promotions</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Receive special offers and promotions</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-gray-900 dark:text-white">System Updates</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Important system and security notifications</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" checked>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Mark individual notification as read
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.trim() === 'Mark as read') {
            button.addEventListener('click', function() {
                const notification = this.closest('.p-6');
                notification.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
                const title = notification.querySelector('h3');
                title.classList.remove('font-semibold');
                const indicator = title.querySelector('.bg-blue-500');
                if (indicator) indicator.remove();
                this.remove();
            });
        }
    });

    // Mark all as read
    document.querySelector('[class*="Mark all as read"]')?.addEventListener('click', function() {
        document.querySelectorAll('.bg-blue-50, .dark\\:bg-blue-900\\/20').forEach(notification => {
            notification.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
        });
        document.querySelectorAll('h3.font-semibold').forEach(title => {
            title.classList.remove('font-semibold');
        });
        document.querySelectorAll('.bg-blue-500').forEach(indicator => {
            indicator.remove();
        });
        document.querySelectorAll('button').forEach(button => {
            if (button.textContent.trim() === 'Mark as read') {
                button.remove();
            }
        });
    });

    // Delete notifications
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.trim() === 'Delete') {
            button.addEventListener('click', function() {
                const notification = this.closest('.p-6');
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            });
        }
    });
});
</script>

<?php include 'footer.php'; ?>