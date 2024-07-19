"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiMedalLine } from "react-icons/ri";
import { PiIdentificationCard } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUturnRight } from "react-icons/hi2";

interface LeaderBoardGrid {
  list: any[];
}

const LeaderBoardGrid: React.FC<LeaderBoardGrid> = ({ list }) => {
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
        <div className="w-full text-sm text-left ">
          <div>
            {list.slice(0, visibleRows).map((singleItem, index) => {
              const {
                user: { name, social, slug },
                highlights: { points, pr_opened, pr_reviewed, pr_merged },
              } = singleItem;
              return (
                <div
                  key={index}
                  className="bg-white border-b text-[14px] cursor-pointer text-center"
                >
                  <div className="flex  items-center font-medium text-[#4682BB]">
                    <div className="px-3 py-4">#{index + 1}</div>
                    <div className="px-3 py-4">
                      <div className="flex items-center  ">
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
                          className="ml-2 text-[16px]"
                        >
                          {name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex  items-center  ml-[30px]">
                    <div>
                      <div className="flex items-center font-medium text-[#4682BB]  px-1 py-2">
                        <CiStar /> <p className="ml-2">XP</p>
                      </div>
                      <div className="px-1 py-2 ">{points}</div>
                    </div>
                    <div>
                      <div className="flex items-center font-medium text-[#4682BB] px-1 py-2">
                        <MdOutlineSignalCellularAlt />
                        <p className="ml-2">Ledger of Deeds</p>
                      </div>
                      <div className="px-1 py-2">
                        {pr_merged} PR merged; {pr_opened} Open
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center font-medium text-[#4682BB] px-1 py-2">
                        <FaGithub /> <p className="ml-2">Github</p>
                      </div>
                      <div className="px-1 py-2 ">
                        <div
                          onClick={() => {
                            if (typeof window !== "undefined")
                              window
                                .open(`https://github.com/${slug}`, "_blank")
                                .focus();
                          }}
                          className="flex items-center "
                        >
                          <div className="mr-2">Visit Profile</div>
                          <HiOutlineArrowUturnRight />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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

export default LeaderBoardGrid;