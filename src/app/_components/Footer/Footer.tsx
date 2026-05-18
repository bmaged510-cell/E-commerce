import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { BsShieldCheck, BsArrowRepeat } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div style={{ backgroundColor: "#DCFCE7" }} className="py-6 border-t border-green-100">
        <div className="w-[90%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <MdLocalShipping className="text-2xl text-[#16A34A]" />, title: "Free Shipping", desc: "On orders over 500 EGP" },
            { icon: <BsArrowRepeat className="text-2xl text-[#16A34A]" />, title: "Easy Returns", desc: "14-day return policy" },
            { icon: <BsShieldCheck className="text-2xl text-[#16A34A]" />, title: "Secure Payment", desc: "100% secure checkout" },
            { icon: <FaHeadset className="text-2xl text-[#16A34A]" />, title: "24/7 Support", desc: "Contact us anytime" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#1D2025" }} className="text-gray-300 py-12">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded px-2 py-1 flex items-center gap-1">
                <span className="text-lg">🛒</span>
                <span className="text-[#1D2025] text-sm font-bold">FreshCart</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at competitive
              prices with a seamless shopping experience.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaPhone className="text-[#16A34A] shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaEnvelope className="text-[#16A34A] shrink-0" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaMapMarkerAlt className="text-[#16A34A] shrink-0" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaYoutube />, href: "#" },
              ].map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 hover:bg-[#16A34A] hover:text-white transition-all text-sm"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {[
                { label: "All Products", href: "/Shop" },
                { label: "Categories", href: "/Categories" },
                { label: "Brands", href: "/Brands" },
                { label: "Electronics", href: "/Shop" },
                { label: "Men's Fashion", href: "/Shop" },
                { label: "Women's Fashion", href: "/Shop" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#16A34A] transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              {[
                { label: "My Account", href: "/account" },
                { label: "Order History", href: "/orders" },
                { label: "Wishlist", href: "/Wishlist" },
                { label: "Shopping Cart", href: "/Cart" },
                { label: "Sign In", href: "/login" },
                { label: "Create Account", href: "/register" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#16A34A] transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 mb-6">
              {[
                { label: "Contact Us", href: "#" },
                { label: "Help Center", href: "#" },
                { label: "Shipping Info", href: "#" },
                { label: "Returns & Refunds", href: "#" },
                { label: "Track Order", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#16A34A] transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#16A34A] transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#13171f" }} className="py-4 border-t border-gray-700">
        <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            © 2026 FreshCart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-xs font-medium">Visa</span>
            <span className="text-gray-400 text-xs font-medium">Mastercard</span>
            <span className="text-gray-400 text-xs font-medium">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}