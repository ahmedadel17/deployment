export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="container mx-auto px-4 py-8">
        {/* Slider skeleton */}
        <div className="mb-8">
          <div className="h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        {/* Product slider skeleton */}
        <div className="mb-8">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="bg-gray-800 dark:bg-gray-900 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="h-5 bg-gray-700 rounded animate-pulse mb-4"></div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, linkIndex) => (
                    <div key={linkIndex} className="h-3 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
