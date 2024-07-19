"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiMedalLine } from "react-icons/ri";
import { PiIdentificationCard } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";

interface LeaderBoardTable {
  list: any[];
}

const LeaderBoardTable: React.FC<LeaderBoardTable> = ({ list }) => {
  const initialRows = 8;
  const [visibleRows, setVisibleRows] = useState(initialRows);
  const [isClient, setIsClient] = useState(false);
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoadMore = () => {
    setVisibleRows((prevVisibleRows) =>
      Math.min(prevVisibleRows + initialRows, list.length)
    );
    loadMoreButtonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex justify-between items-center w-[100%]">
        <div className="relative text-[14px] font-medium text-[#4682BB]">
          <span className="opacity-50"> Last 30 days </span>|{" "}
          <span>Last 7 days</span>
        </div>
      </div>
      <div className="relative overflow-x-auto mt-8">
        <table className="w-full text-sm text-left ">
          <thead className=" ">
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
          <tbody>
            {list.slice(0, visibleRows).map((singleItem, index) => {
              const {
                user: { name, social, slug },
                highlights: { points, pr_opened, pr_reviewed, pr_merged },
              } = singleItem;
              return (
                <tr
                  key={index}
                  className="bg-white border-b text-[14px] cursor-pointer text-center"
                >
                  <td className="px-6 py-4">#{index + 4}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center ">
                      <Image
                        src={`https://avatars.githubusercontent.com/${slug}`}
                        alt={slug}
                        className="rounded-[50%] object-cover"
                        height={31}
                        width={31}
                      />
                      <p
                        onClick={() =>
                          (window.location.href = `/contributors/${slug}`)
                        }
                        className="ml-2"
                      >
                        {name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{points}</td>
                  <td className="px-6 py-4">
                    {pr_merged} PR merged; {pr_opened} Open
                  </td>
                  <td className="px-6 py-4 ">
                    <div
                      onClick={() => {
                        if (typeof window !== "undefined")
                          window
                            .open(`https://github.com/${slug}`, "_blank")
                            .focus();
                      }}
                      className="flex items-center"
                    >
                      <p className="mr-2">Visit Profile</p>
                      <HiOutlineArrowUturnRight />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {visibleRows < list.length && (
            <button
              onClick={handleLoadMore}
              className="px-8 py-[11px] bg-black text-white rounded-xl text-[14px] mt-2"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaderBoardTable;
