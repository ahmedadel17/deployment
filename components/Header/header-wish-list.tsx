import tokenGetter from "@/lib/tokenGetter"

function HeaderWishList() {
  return (
      <>
      {tokenGetter() &&
      
      <div className="te-navbar-dropdown">
    <a href="wishlist.php" className="header-wishlist relative flex items-center gap-3 cursor-pointer">
        <div className="cart-icon">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
                <svg className="w-5 h-5 text-gray-600 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
                {/* <!-- Badge --> */}
                <span className="header-wishlist-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    3
                </span>
            </div>
        </div>
    </a>
</div>
      }
      </>
  )
}

export default HeaderWishList
