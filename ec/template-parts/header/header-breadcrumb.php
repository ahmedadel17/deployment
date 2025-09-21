<nav class="mb-8">
    <div class="flex flex-wrap items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
        <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Home</a>
        <svg class="w-4 h-4 rtl:scale-x-[-1]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
        </svg>
        <span class="text-gray-900 dark:text-white font-medium"><?php echo ucwords(str_replace(['-', '.'], ' ', basename($_SERVER['PHP_SELF'], '.php'))); ?></span>
    </div>
</nav>