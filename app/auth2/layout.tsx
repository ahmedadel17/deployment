import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div>
         <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-lg w-full space-y-8">
   {/* <!-- Logo/Header --> */}
        <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to your account or create a new one
            </p>
        </div>
      {children}
    </div>
    </div>
    </div>
  )
}

export default layout
