import React from 'react'
import Image from 'next/image'
function SmallBanner() {
  return (
    // <!-- Kids Bannner -->
    <div className="relative flex items-center rounded-[1rem] bg-gradient-to-l from-[#0A4B63] to-[#0F6D90] overflow-hidden">
        {/* <!-- Content --> */}
        <div className="relative z-10 flex-1 text-white">
            <div className="ps-4">
                <h2 className="text-xl lg:text-2xl font-bold mb-2">Kids Section</h2>
                <p className="text-sm mb-8">Discover your style now</p>
                <a href="#"
                    className="inline-flex items-center justify-start text-sm font-semibold transition hover:text-[#12323D]">
                    <svg className="icon-cart w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                        <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                    </svg>
                    <span className="ms-2">Shop Now</span>
                </a>

            </div>
        </div>
        {/* <!-- Man image --> */}
        <div className="relative z-10 w-40 lg:me-2 ms-2 pr-4">
            <Image src="/assets/images/kids.png" alt="Men's Fashion" className="w-full object-contain" width={200} height={200} />
        </div>
    </div>
  )
}

export default SmallBanner
