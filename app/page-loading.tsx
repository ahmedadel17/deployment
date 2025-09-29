export default function HomePageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Slider Loading Skeleton */}
      <div className="relative">
        <div className="h-64 md:h-96 lg:h-[500px] bg-gray-200 dark:bg-gray-700 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading slider...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Slider Loading Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional sections loading */}
        <div className="space-y-8">
          {Array.from({ length: 2 }).map((_, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
