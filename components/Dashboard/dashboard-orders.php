<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
            </div>
            <div class="p-6">
                <div class="overflow-x-auto">

                    <?php
                    $orders = [
                        [
                            'id' => 'ORD-2024-001234',
                            'date' => 'September 1, 2025',
                            'status' => ['text' => 'Delivered', 'color' => 'green'],
                            'total' => '65.00',
                        ],
                        [
                            'id' => 'ORD-2024-001233',
                            'date' => 'August 28, 2025',
                            'status' => ['text' => 'Shipped', 'color' => 'blue'],
                            'total' => '55.50',
                        ],
                        [
                            'id' => 'ORD-2024-001232',
                            'date' => 'August 25, 2025',
                            'status' => ['text' => 'Processing', 'color' => 'yellow'],
                            'total' => '72.00',
                        ],
                        [
                            'id' => 'ORD-2024-001231',
                            'date' => 'August 20, 2025',
                            'status' => ['text' => 'Delivered', 'color' => 'green'],
                            'total' => '48.75',
                        ],
                        [
                            'id' => 'ORD-2024-001230',
                            'date' => 'August 18, 2025',
                            'status' => ['text' => 'Shipped', 'color' => 'blue'],
                            'total' => '120.00',
                        ],
                        [
                            'id' => 'ORD-2024-001229',
                            'date' => 'August 15, 2025',
                            'status' => ['text' => 'Cancelled', 'color' => 'red'],
                            'total' => '0.00',
                        ],
                        [
                            'id' => 'ORD-2024-001228',
                            'date' => 'August 12, 2025',
                            'status' => ['text' => 'Processing', 'color' => 'yellow'],
                            'total' => '99.99',
                        ],
                        [
                            'id' => 'ORD-2024-001227',
                            'date' => 'August 10, 2025',
                            'status' => ['text' => 'Delivered', 'color' => 'green'],
                            'total' => '75.00',
                        ],
                        [
                            'id' => 'ORD-2024-001226',
                            'date' => 'August 5, 2025',
                            'status' => ['text' => 'Shipped', 'color' => 'blue'],
                            'total' => '89.50',
                        ],
                        [
                            'id' => 'ORD-2024-001225',
                            'date' => 'August 1, 2025',
                            'status' => ['text' => 'Processing', 'color' => 'yellow'],
                            'total' => '150.00',
                        ],
                    ];
                    ?>

                    <table class="w-full text-sm text-start text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th class="px-6 py-3">
                                    <div class="flex flex-col space-y-2">
                                        <span>Order ID</span>
                                        <input type="text" id="filter-order-id" placeholder="Filter...">
                                    </div>
                                </th>
                                <th class="px-6 py-3">
                                    <div class="flex flex-col space-y-2">
                                        <span>Date</span>
                                        <select id="filter-date">
                                            <option value="">All Dates</option>
                                            <option value="September">September 2025</option>
                                            <option value="August">August 2025</option>
                                        </select>
                                    </div>
                                </th>
                                <th class="px-6 py-3">
                                    <div class="flex flex-col space-y-2">
                                        <span>Status</span>
                                        <select id="filter-status">
                                            <option value="">All Status</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </th>
                                <th class="px-6 py-3">
                                    <div class="flex flex-col space-y-2">
                                        <span>Total</span>
                                        <select id="filter-total">
                                            <option value="">All Amounts</option>
                                            <option value="0-50">0 - 50</option>
                                            <option value="50-100">50 - 100</option>
                                            <option value="100+">100+</option>
                                        </select>
                                    </div>
                                </th>
                                <th class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="orders-tbody">
                            <?php foreach ($orders as $order): ?>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 order-row">
                                    <td class="px-6 py-4 font-medium text-gray-900 dark:text-white order-id"><?= $order['id'] ?></td>
                                    <td class="px-6 py-4 order-date"><?= $order['date'] ?></td>
                                    <td class="px-6 py-4">
                                        <span class="px-3 py-1 bg-<?= $order['status']['color'] ?>-100 dark:bg-<?= $order['status']['color'] ?>-900 text-<?= $order['status']['color'] ?>-800 dark:text-<?= $order['status']['color'] ?>-200 text-xs font-medium rounded-full order-status">
                                            <?= $order['status']['text'] ?>
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 order-total" data-amount="<?= $order['total'] ?>">
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

    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const filterOrderId = document.getElementById('filter-order-id');
        const filterDate = document.getElementById('filter-date');
        const filterStatus = document.getElementById('filter-status');
        const filterTotal = document.getElementById('filter-total');
        const orderRows = document.querySelectorAll('.order-row');

        function filterOrders() {
            const orderIdFilter = filterOrderId.value.toLowerCase();
            const dateFilter = filterDate.value;
            const statusFilter = filterStatus.value;
            const totalFilter = filterTotal.value;

            orderRows.forEach(row => {
                const orderId = row.querySelector('.order-id').textContent.toLowerCase();
                const orderDate = row.querySelector('.order-date').textContent;
                const orderStatus = row.querySelector('.order-status').textContent.trim();
                const orderAmount = parseFloat(row.querySelector('.order-total').dataset.amount);

                let showRow = true;

                // Filter by Order ID
                if (orderIdFilter && !orderId.includes(orderIdFilter)) {
                    showRow = false;
                }

                // Filter by Date
                if (dateFilter && !orderDate.includes(dateFilter)) {
                    showRow = false;
                }

                // Filter by Status
                if (statusFilter && orderStatus !== statusFilter) {
                    showRow = false;
                }

                // Filter by Total Amount
                if (totalFilter) {
                    if (totalFilter === '0-50' && (orderAmount < 0 || orderAmount > 50)) {
                        showRow = false;
                    } else if (totalFilter === '50-100' && (orderAmount < 50 || orderAmount > 100)) {
                        showRow = false;
                    } else if (totalFilter === '100+' && orderAmount <= 100) {
                        showRow = false;
                    }
                }

                row.style.display = showRow ? '' : 'none';
            });
        }

        // Add event listeners
        filterOrderId.addEventListener('input', filterOrders);
        filterDate.addEventListener('change', filterOrders);
        filterStatus.addEventListener('change', filterOrders);
        filterTotal.addEventListener('change', filterOrders);
    });
</script>

<?php include 'footer.php'; ?>