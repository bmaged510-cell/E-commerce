"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaRegHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NavigationMenu className="max-w-full! md:px-20 bg-slate-100 py-3 sticky top-0 z-50">
      <NavigationMenuList className="flex justify-between">
        <h6 className="text-3xl font-bold">
          <Link href="/">Fresh Cart</Link>
        </h6>

        <NavigationMenuItem className="flex md:hidden">
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-2 p-4">
              <li><Link href="/Home" className="block p-2 hover:text-[#16A34A]">Home</Link></li>
              <li><Link href="/Shop" className="block p-2 hover:text-[#16A34A]">Shop</Link></li>
              <li><Link href="/Categories" className="block p-2 hover:text-[#16A34A]">Categories</Link></li>
              <li><Link href="/Brands" className="block p-2 hover:text-[#16A34A]">Brands</Link></li>
              {isLoggedIn && mounted && (
                <li><Link href="/orders" className="block p-2 hover:text-[#16A34A]">My Orders</Link></li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <div className="gap-4 hidden md:flex">
          <NavigationMenuList className="max-w-fit! flex gap-6">
            <NavigationMenuItem>
              <Link href="/Home" className="hover:text-[#16A34A] transition-all">Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Shop" className="hover:text-[#16A34A] transition-all">Shop</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Categories" className="hover:text-[#16A34A] transition-all">Categories</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/Brands" className="hover:text-[#16A34A] transition-all">Brands</Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className="hidden md:flex max-w-fit! gap-6 items-center">
            <NavigationMenuItem>
              <Link href="/Wishlist">
                <FaRegHeart className="text-lg hover:text-[#16A34A] transition-all" />
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/Cart" className="relative">
                <FaCartShopping className="text-lg hover:text-[#16A34A] transition-all" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#16A34A] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
            </NavigationMenuItem>

            {isLoggedIn && mounted && (
              <NavigationMenuItem>
                <Link href="/orders" className="text-sm hover:text-[#16A34A] transition-all font-medium">
                  My Orders
                </Link>
              </NavigationMenuItem>
            )}

            {!mounted ? (
              <Button className="py-2.5 px-5 rounded-full cursor-pointer">
                <FaUser />
                Sign In
              </Button>
            ) : isLoggedIn ? (
              <Button
                onClick={logout}
                className="py-2.5 px-5 rounded-full cursor-pointer bg-red-500 hover:bg-red-600"
              >
                <FaUser />
                Sign Out
              </Button>
            ) : (
              <Link href="/login">
                <Button className="py-2.5 px-5 rounded-full cursor-pointer">
                  <FaUser />
                  Sign In
                </Button>
              </Link>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}