import React from "react";
import { SlSocialLinkedin } from "react-icons/sl";
import { IoLogoFacebook } from "react-icons/io5";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" bg-[#000000] w-[99%] rounded-xl flex flex-col  justify-center items-center pt-16 pb-10 mb-2 mx-auto">
      <div>
        <img src="assets/images/transparent-logo.svg" alt="" />
      </div>
      <div className="flex justify-center items-center text-[#fff] mt-6 text-[16px]">
        <p className="m-2">Home</p>
        <p className="m-2">Community</p>
        <p className="m-2">Support</p>
        <p className="m-2">Forums</p>
        <p className="m-2">Get Started</p>
      </div>
      <div className="flex justify-center items-center text-[#fff] mt-4 text-[#5C5C5C] ">
        <div className="m-1 w-[20px] h-[20px]">
          <SlSocialLinkedin />
        </div>
        <div className="m-1 w-[20px] h-[20px]">
          <FaXTwitter />
        </div>
        <div className="m-1 w-[20px] h-[20px]">
          <IoLogoFacebook />
        </div>
      </div>
      <div className="mt-20 text-[16px] text-[#5C5C5C]">
        © 2024, All Rights Reserved
      </div>
      <div className="mt-2 text-[16px] text-[#5C5C5C]">Beckn Protocol</div>
    </div>
  );
};

export default Footer;
