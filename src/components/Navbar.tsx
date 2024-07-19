"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("inset-x-0 max-w-[1360px]  mx-auto relative", className)}
    >
      <div className="w-[94%] flex justify-between  items-center  mx-auto z-50 mt-8  bg-[#E7F3FF]rounded-xl ">
        <Menu setActive={setActive}>
          <Link href={"/"}>
            <div className="cursor-pointer">
              <img src={"/assets/images/logo.svg"} alt="" />
            </div>
          </Link>

          <div className="text-[24px] font-semibold text-center leading-[30px]  text-[#000000] navbar_heading">
            Meet <span className=" text-[#4682BB] ">the contributors</span> who
            are shaping the beckn
          </div>

          <MenuItem
            setActive={setActive}
            active={active}
            item={
              <button className="text-[14px] font-medium text-[#fff] bg-[#000] p-[10px] px-[60px] rounded-lg  text-center">
                Get Started
              </button>
            }
          ></MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
