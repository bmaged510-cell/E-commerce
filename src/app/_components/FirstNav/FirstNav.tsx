import React from "react";
import { FaCarSide } from "react-icons/fa6";
import { FaGift } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Link from 'next/link';



                                                                  // #16A34A

export default function FirstNav() {
  return (
    <>
      <div className="w-[90%] mx-auto p-2 hidden xl:flex justify-between">




        <div className="leftside flex gap-3">
          <span className="flex gap-2 items-center">
            <FaCarSide className="text-[#16A34A]" />
            Free Shipping on Orders 500 EGP
          </span>




          <span className="flex gap-2 items-center">
            <FaGift className="text-[#16A34A]"/>

            New Arrivals Daily 
          </span>
        </div>




        <div className="rightside flex gap-3">
          <span className="flex gap-2 items-center">
            <FaPhoneAlt className="text-[#16A34A]" />

            Free Shipping on Orders 500 EGP
          </span>




          <span className="flex gap-2 items-center">
            <FaGift className="text-[#16A34A]"/>

            New Arrivals Daily 
          </span>


       <div className=" flex gap-3">
           <span className="flex gap-2 items-center">
            <FaUserAlt />

           <Link href="/login">Sign In</Link>
          </span>


          <span className="flex gap-2 items-center">
            <FaUserPlus />

           <Link href="/register">Sign Up</Link>
          </span>

       </div>


        </div>


        
        



      </div>
    </>
  );
}
