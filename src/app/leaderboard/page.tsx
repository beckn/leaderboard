import React from "react";
import { LeaderboardAPIResponse, LeaderboardSortKey } from "@/lib/types";

import LeaderboardCard from "@/components/contributors/LeaderboardCard";
import { Spotlight } from "@/components/ui/Spotlight";
import { getLeaderboardData } from "../api/functions";
import {
  sortByReviewedPrs,
  sortByCommentsCreated,
  sortByOpenedIssues,
  sortByOpenedPrs,
} from "./utils";
import { parseDateRangeSearchParam } from "@/lib/utils";
import LeaderBoardCard from "@/components/leaderBoard-card/index";
import LeaderBoardTable from "@/components/leaderBoard-table/index";
import { CiSquareInfo } from "react-icons/ci";
import ContributorsCard from "@/components/contributors-card/index";
import Footer from "@/components/footer/index";

export default async function Leaderboard({}) {
  type SortOrder = "desc" | "asc";

  const searchParams = {
    between: "28",
    sortBy: "points" as LeaderboardSortKey,
    ordering: "desc" as SortOrder,
    relativeDaysBefore: 30,
    // role: "core,intern,contributor"
  };

  const data1 = await getLeaderboardData(
    parseDateRangeSearchParam(
      searchParams.between,
      searchParams.relativeDaysBefore
    ),
    searchParams.sortBy ?? "points",
    searchParams.ordering ?? "desc"
    // @ts-ignore
    // (searchParams.role?.split(",") as (
    //   | "core"
    //   | "intern"
    //   | "operations"
    //   | "contributor"
    // )[]) ??
    //   (process.env.NEXT_PUBLIC_LEADERBOARD_DEFAULT_ROLES as string).split(",") ??
    //   [],
  );

  const ordering = "desc";
  return (
    <div>
      <div className="max-w-[1364px] min-w-[1364px] mx-auto">
        <div className="px-0 pb-10  2xl:gap-5 relative">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <div
            className="w-[90%] flex justify-center items-center flex-col "
            style={{ margin: "0 auto", marginTop: "40px" }}
          >
            <div className="bg-[#F7FAFF] px-[180px]  py-[33px] rounded-lg">
              <div className="text-[24px] font-medium text-center w-[80%] leading-[30px] mb-[18px] text-end">
                Meet{" "}
                <span className=" text-[#4682BB] text-end">
                  the contributors
                </span>{" "}
                who are shaping the beckn
              </div>
              <div className="text-[18px] text-center">
                Celebrating the Champions of Our Community. A dynamic
                leaderboard showcasing top contributors and their achievements.
                Celebrating the Champions of Our Community. A dynamic
                leaderboard showcasing top contributors and their achievements.
              </div>
            </div>
            <div className="flex  justify-between flex-start  mt-12 w-[100%]">
              <div>
                <LeaderBoardCard list={data1.slice(0, 3)} />
                <LeaderBoardTable list={data1.slice(3, data1.length)} />
              </div>

              <div>
                <div className="bg-[#F7FAFF] text-[#4682BB] text-[20px] font-medium p-[16px] w-[100%] text-center rounded-lg  flex items-center mb-10">
                  <p className="mr-2">Top Contributors of the week</p>{" "}
                  <CiSquareInfo />
                </div>
                <ContributorsCard
                  title="Pull Requests Opened"
                  users={sortByOpenedPrs(data1).slice(0, 2)}
                />
                <ContributorsCard
                  title="Pull Requests Reviewed"
                  users={sortByReviewedPrs(data1).slice(0, 2)}
                />
                <ContributorsCard
                  title="Comments Created"
                  users={sortByCommentsCreated(data1).slice(0, 2)}
                />
                <ContributorsCard
                  title="Issues Opened"
                  users={sortByOpenedIssues(data1).slice(0, 2)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}