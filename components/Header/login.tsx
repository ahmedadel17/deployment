'use client'

import Link from "next/link";
import {LogIn} from "lucide-react";
import { useToken } from "@/context/Token";

function LoginButton() {
    const { isAuthenticated } = useToken();

    // Don't show login button if user is already authenticated
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="te-navbar-dropdown">
            <Link href="/auth2/login" className="header-notification text-capitalize relative flex items-center gap-3 cursor-pointer">
                <div className="cart-icon">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 dark:text-white flex justify-center items-center rounded-full relative">
                        <LogIn />
                    </div>
                </div>
            </Link>
        </div>
    )
}
  
  export default LoginButton
  