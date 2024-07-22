"use client";
import React, { useEffect, useState } from "react";
import ContributorsCard from "../contributors-card";
import LeaderBoardCard from "../leaderBoard-card";
import LeaderBoardGrid from "../leaderboard-grid";
import { CiSquareInfo } from "react-icons/ci";
import LeaderBoardTable from "../leaderBoard-table";
import {
  sortByPoints,
  sortByOpenedPrs,
  sortByReviewedPrs,
  sortByCommentsCreated,
  sortByOpenedIssues,
} from "@/app/leaderboard/utils";

interface LeaderboardProps {
  list: any[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ list }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);


  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1300);
    setIsSmallScreen(window.innerWidth <= 680);
  };

  useEffect(() => {
    // Set initial value
    handleResize();
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("Dank", sortByPoints(list), isMobile);
  useEffect(() => {
    console.log("Dank here", isMobile);
  }, [isMobile]);

  return (
    <div
      className="w-[94%] flex justify-center items-center flex-col "
      style={{ margin: "0 auto" }}
    >
			{
				isSmallScreen && <div className="text-[1.6rem] mt-[2rem] font-semibold text-center leading-[2rem]  text-[#000000]">
				Meet <span className=" text-[#4682BB] ">the contributors</span> who
				are shaping  beckn
			</div>
			}
      <div className="flex justify-between flex-start mt-[50px] w-[100%] leaderboard_contributers">

        <div className="leaderboard_tabledata">
          {!isMobile && <LeaderBoardCard list={list.slice(0, 3)} />}
          {isMobile ? (
            <LeaderBoardGrid list={list} />
          ) : (
            <LeaderBoardTable list={list.slice(3, list.length)} />
          )}
        </div>

        <div>
          <div className="bg-[#F7FAFF] text-[#4682BB] text-[20px] font-medium p-[16px] w-[100%] text-center rounded-lg justify-center flex items-center mb-10 contributorsCard_title">
            <p className="mr-2">Top contributors of the week</p>{" "}
            <CiSquareInfo />
          </div>
          <ContributorsCard
            title="Pull Requests Opened"
            users={sortByOpenedPrs(list).slice(0, 2)}
          />
          <ContributorsCard
            title="Pull Requests Reviewed"
            users={sortByReviewedPrs(list).slice(0, 2)}
          />
          <ContributorsCard
            title="Comments Created"
            users={sortByCommentsCreated(list).slice(0, 2)}
          />
          <ContributorsCard
            title="Issues Opened"
            users={sortByOpenedIssues(list).slice(0, 2)}
          />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
