'use client';
import React,{useState} from "react";

import Image from "next/image";

import { RiMedalLine } from "react-icons/ri";
import { PiIdentificationCard } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";

interface LeaderBoardTable {
  list:any[],
}


const WEEK = "Last 7 days"
const MONTH = 'Last 30 days'

const valueMap = {
  [WEEK]:7,
  [MONTH]:30
}


const LeaderBoardTable:React.FC<LeaderBoardTable> = ({list}) => {


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="flex  justify-between items-start items-center w-[100%]">
      <div className="relative">
          <button
          onClick={toggleDropdown}
            id="dropdownDefaultButton"
            data-dropdown-toggle="range-dropdown"
            className="text-[#4682BB] z-[100] bg-[#F7FAFF] text-center inline-flex items-center px-[12px] py-[4px] rounded-lg border-[#4682BB] border-solid border-[1px]"
            type="button"
          >
            {MONTH}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div id="range-dropdown" className={`${
              dropdownOpen ? "block" : "hidden"
            } absolute mt-2 rounded-lg bg-[#F7FAFF] z-[100] w-[100%]`} >
            <ul
              className="py-2 text-sm text-[#4682BB]"
              aria-labelledby="dropdownDefaultButton"
            >
              <li   className="block px-4 py-2 pointer ">
                  {WEEK}
              </li>
              <li  className="block px-4 py-2 pointer">
                  {MONTH}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left ">
          <thead className="uppercase ">
            <tr className="rounded-xl border-[#E5E5E5] border-solid bg-[#FAFAFA] border-[1px] t font-medium text-[#4682BB]">
              <th scope="col" className="px-6 py-5">
                <div className="flex items-center">
                  <RiMedalLine /> <p className="ml-2">Rank</p>
                </div>
              </th>
              <th scope="col" className="px-6 py-5">
                <div className="flex items-center">
                  <PiIdentificationCard /> <p className="ml-2">Name</p>
                </div>
              </th>
              <th scope="col" className="px-6 py-5">
                <div className="flex items-center">
                  <CiStar /> <p className="ml-2">Points</p>
                </div>
              </th>
              <th scope="col" className="px-6 py-5">
                <div className="flex items-center">
                  <MdOutlineSignalCellularAlt />
                  <p className="ml-2">Contribution stats</p>
                </div>
              </th>
              <th scope="col" className="px-6 py-5">
                <div className="flex items-center">
                  <FaGithub /> <p className="ml-2">Github</p>
                </div>
              </th>
            </tr>
          </thead>
          {list.map((singleItem,index)=>{

          const {user:{name,social,slug},highlights:{points,pr_opened,pr_reviewed,pr_merged}} = singleItem
            return  <tbody>
            <tr className="bg-white border-b text-[14px] cursor-pointer">
              <td className="px-6 py-4">#{index+4}</td>
              <td className="px-6 py-4">
                <div className="flex items-center ">
                 
                            <Image
        src={`https://avatars.githubusercontent.com/${slug}`} 
        alt={slug}
        className="rounded-[50%] object-cover"
        height={31}
        width={31}
      />
                  <p  onClick={() =>
                    (window.location.href = `/contributors/${slug}`)
                  } className="ml-2">{name}</p>
                </div>
              </td>
              <td className="px-6 py-4">{points}</td>
              <td className="px-6 py-4">{pr_merged}PR merged; {pr_opened} Open</td>
              <td className="px-6 py-4">
                <div onClick={()=>{
                  if(typeof window !== 'undefined') window.open(`https://github.com/${slug}`, '_blank').focus();
                }} className="flex items-center">
                  <p className="mr-2">Visit Profile</p>
                  <HiOutlineArrowUturnRight />
                </div>
              </td>
            </tr>
          </tbody>
          })}
          
          
        </table>
      </div>
    </>
  );
};

export default LeaderBoardTable;
