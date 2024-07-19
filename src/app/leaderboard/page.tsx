import React from "react";
import { LeaderboardAPIResponse, LeaderboardSortKey } from "@/lib/types";
import { isMobile, isTablet } from "react-device-detect";
import LeaderboardCard from "@/components/contributors/LeaderboardCard";
import { Spotlight } from "@/components/ui/Spotlight";
import { getLeaderboardData } from "../api/functions";
import {
  sortByReviewedPrs,
  sortByCommentsCreated,
  sortByOpenedIssues,
  sortByOpenedPrs,
  sortByPoints,
} from "./utils";
import { parseDateRangeSearchParam } from "@/lib/utils";
import LeaderBoardCard from "@/components/leaderBoard-card/index";
import LeaderBoardTable from "@/components/leaderBoard-table/index";
import LeaderBoardGrid from "@/components/leaderboard-grid";
import LeaderBoardUI from "@/components/leaderboard";
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
      <div className="max-w-[1360px]  mx-auto">
        <div className="px-0 pb-10  2xl:gap-5 relative">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          <LeaderBoardUI list={data1} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
