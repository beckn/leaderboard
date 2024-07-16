"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";

const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "inset-x-0 max-w-[55rem] w-[100%] mx-auto z-50 mt-10 bg-[#E7F3FF] rounded-xl flex justify-between  items-center",
        className
      )}
    >
      <Link href={"/"}>
        <div className="cursor-pointer">
          <img src={"/assets/images/logo.svg"} alt="" className="pl-[32px]" />
        </div>
      </Link>
      <Menu setActive={setActive}>
        {/* <Link href={"/leaderboard"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Leaderboard"
          ></MenuItem>
        </Link> */}
        <a target="__blank" href={"https://becknprotocol.io/projects/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Projects"
          ></MenuItem>
        </a>
        <a
          target="__blank"
          href={
            "https://discord.com/invite/pbayfsrMR9?utm_source=website&utm_medium=BOCCTAButton&utm_campaign=BecknProtocol"
          }
        >
          <MenuItem
            setActive={setActive}
            active={active}
            item={<BsDiscord fontSize={20} />}
          ></MenuItem>
        </a>
        <a target="__blank" href={"https://github.com/beckn"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item={<FaGithub fontSize={20} />}
          ></MenuItem>
        </a>
        <MenuItem
          setActive={setActive}
          active={active}
          item={
            <button className="text-[14px] font-medium text-[#fff] bg-[#000] p-[10px] px-[16px] rounded-lg  text-center">
              Start with your contribution
            </button>
          }
        ></MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;