<?php include 'header.php'; ?>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- Sidebar -->
    <?php include 'dashboard-sidebar.php'; ?>

    <div class="lg:col-span-3 space-y-8">

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
            </div>
            <div class="p-6">
                <form class="space-y-6">
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label for="first-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" value="John">
                            </div>
                            <div>
                                <label for="last-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                <input type="text" name="last-name" id="last-name" autocomplete="family-name" value="Doe">
                            </div>
                            <div class="md:col-span-2">
                                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email address</label>
                                <input id="email" name="email" type="email" autocomplete="email" value="john.doe@example.com">
                            </div>
                        </div>
                    </div>

                    <hr class="border-t border-gray-200 dark:border-gray-600">

                    <div>
                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h2>
                        <div class="space-y-4">
                            <div>
                                <label for="current-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                                <input type="password" name="current-password" id="current-password" autocomplete="current-password">
                            </div>
                            <div>
                                <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                <input type="password" name="new-password" id="new-password" autocomplete="new-password">
                            </div>
                            <div>
                                <label for="confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                                <input type="password" name="confirm-password" id="confirm-password" autocomplete="new-password">
                            </div>
                        </div>
                    </div>

                    <div class="pt-5">
                        <button type="submit" class="te-btn te-btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>

<?php include 'footer.php'; ?>