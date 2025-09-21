<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Addresses</h1>
                    <a href="dashboard-edit-address.php" class="te-btn te-btn-primary">
                        Add New Address
                    </a>
                </div>
            </div>
            <div class="p-6 space-y-4">
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-white">Home Address</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">123 Main Street</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Anytown, USA 12345</p>
                    <div class="mt-4 flex space-x-2 rtl:space-x-reverse">
                        <a href="dashboard-edit-address.php?id=1" class="text-sm font-medium text-primary-600 dark:text-primary-100 hover:underline">Edit</a>
                        <span class="text-gray-300 dark:text-gray-600">|</span>
                        <a href="#" class="text-sm font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </div>
                </div>

                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h3 class="font-semibold text-gray-900 dark:text-white">Work Address</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">456 Business Avenue</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Suite 100</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Cityville, USA 67890</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">United States</p>
                    <div class="mt-4 flex space-x-2 rtl:space-x-reverse">
                        <a href="dashboard-edit-address.php?id=2" class="text-sm font-medium text-primary-600 dark:text-primary-100 hover:underline">Edit</a>
                        <span class="text-gray-300 dark:text-gray-600">|</span>
                        <a href="#" class="text-sm font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<?php include 'footer.php'; ?>