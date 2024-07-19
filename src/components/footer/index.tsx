import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" bg-[#000000] w-[99%] rounded-xl flex flex-col  justify-center items-center pt-16 pb-10 mb-2 mx-auto">
      <div>
        <img src="assets/images/transparent-logo.svg" alt="" />
      </div>
      <div className="flex justify-center items-center text-[#fff] mt-6 text-[16px]">
        <Link href={"/"}>
          <p className="m-2">Home</p>
        </Link>
        <p className="m-2">Get Started</p>
        <Link href={"https://bit.ly/bocWebInvite"} target="_blank">
          <p className="m-2">Join us on Discord</p>
        </Link>
        <Link href={"https://github.com/beckn"} target="_blank">
          <p className="m-2">Join us on GitHub</p>
        </Link>
      </div>
      <div className="flex justify-center items-center text-[#fff] mt-4 text-[#5C5C5C] ">
        <Link
          href={"https://www.linkedin.com/company/becknprotocol/"}
          target="_blank"
        >
          <div className="m-[6px] w-[20px] h-[20px] text-[#5C5C5C]">
            <FaLinkedin />
          </div>
        </Link>
        <Link href={"https://x.com/becknprotocol?lang=en"} target="_blank">
          <div className="m-[6px] w-[20px] h-[20px] text-[#5C5C5C]">
            <FaXTwitter />
          </div>
        </Link>
        <Link href={"https://www.youtube.com/@becknprotocol"} target="_blank">
          <div className="m-[6px] w-[20px] h-[20px] text-[#5C5C5C]">
            <FaYoutube />
          </div>
        </Link>
      </div>
      <div className="mt-20 text-[16px] text-[#5C5C5C]">
        © 2024, All Rights Reserved
      </div>
      <div className="mt-2 text-[16px] text-[#5C5C5C]">Beckn Protocol</div>
    </div>
  );
};

export default Footer;
