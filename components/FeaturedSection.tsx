

function FeaturedSection() {
  return (
      <section className="te-section-small bg-white dark:bg-[#111827]">
    <div className="container"> 
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">

            <div className="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg className="w-8 h-8 text-blue-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Fast Shipping</h3>
                <p className="text-priamry-800 dark:text-gray-400 text-sm">Fast Delivery to Your Doorstep</p>
            </div>

            <div className="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg className="w-8 h-8 text-blue-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Soft Natural Cotton</h3>
                <p className="text-priamry-800 dark:text-gray-400 text-sm">High Quality & Lasting Comfort</p>
            </div>

            <div className="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg className="w-8 h-8 text-blue-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Transparent Prices</h3>
                <p className="text-priamry-800 dark:text-gray-400 text-sm">Best Value for Money</p>
            </div>

            <div className="bg-primary-50/10 dark:bg-gray-800 rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <svg className="w-8 h-8 text-blue-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">Secure & Fast Payment</h3>
                <p className="text-priamry-800 dark:text-gray-400 text-sm">Pay Online or Cash on Delivery</p>
            </div>


        </div>
    </div>
</section>
  )
}

export default FeaturedSection
