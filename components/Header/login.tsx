'use client'

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { useToken } from "@/context/Token";
import { useRouter } from "next/navigation";

function LoginButton() {
    const { isAuthenticated, setToken } = useToken();
    const router = useRouter();

    const handleLogout = () => {
        setToken(null);
        router.push('/');
    };

    return (
        <div className="te-navbar-dropdown">
            {isAuthenticated ? (
                // Show logout button when authenticated
                <button 
                    onClick={handleLogout}
                    className="header-notification text-capitalize relative flex items-center gap-3 cursor-pointer"
                    title="Logout"
                >
                    <div className="cart-icon">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 dark:text-white flex justify-center items-center rounded-full relative">
                            <LogOut />
                        </div>
                    </div>
                </button>
            ) : (
                // Show login button when not authenticated
                <Link href="/auth2/login" className="header-notification text-capitalize relative flex items-center gap-3 cursor-pointer">
                    <div className="cart-icon">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 dark:text-white flex justify-center items-center rounded-full relative">
                            <LogIn />
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}
  
  export default LoginButton
  