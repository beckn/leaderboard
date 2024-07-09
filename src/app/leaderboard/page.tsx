import { TbZoomQuestion } from "react-icons/tb";
import { LeaderboardAPIResponse, LeaderboardSortKey,  } from "@/lib/types";
import LeaderboardCard from "@/components/contributors/LeaderboardCard";
import { Spotlight } from "@/components/ui/Spotlight";
import { getLeaderboardData } from "../api/functions";
import { parseDateRangeSearchParam } from "@/lib/utils";



export default async function Leaderboard({} ) {

  type SortOrder = "desc" | "asc";
  const searchParams = {
    between: "14", 
    sortBy: "points" as LeaderboardSortKey,
    ordering: "desc" as SortOrder,
    // role: "core,intern,contributor" 
  };
  
  const data1 = await getLeaderboardData(
    parseDateRangeSearchParam(searchParams.between), 
    searchParams.sortBy ?? "points", 
    searchParams.ordering ?? "desc",
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
  
  console.log(data1)

  const ordering ="desc";
  return (
    <div className="px-0 pb-10  2xl:gap-5 relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="w-[80%] flex justify-center items-center " style={{margin:"0 auto", marginTop:"8rem"}}>
        <div className="sticky top-0 pt-6 "> 
          <div className="terminal-container-bg rounded-lg border border-primary-500">
            <div className="flex space-x-2 border-b border-primary-500 px-6 py-3 ">
            <span>
                  Beckn Leaderboard 
              </span>
            </div>
            {data1.length ? (
              <ul className="space-y-6 overflow-x-auto p-6 lg:space-y-8">
                {data1
                  .map((contributor) => {
                    return (
                      <li key={contributor.user.social.github}>
                        <LeaderboardCard
                          position={
                            ordering === "desc"
                              ? data1.indexOf(contributor)
                              : data1.length - data1.indexOf(contributor) - 1
                          }
                          contributor={contributor}
                        />
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <div className="my-4 overflow-x-auto">
                <div className="flex flex-row justify-center">
                  <TbZoomQuestion size={25} />{" "}
                  <span className="ml-4">No results found</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
