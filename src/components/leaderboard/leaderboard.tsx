'use client'
import React, { useEffect } from 'react'
import ContributorsCard from '../contributors-card'
import LeaderBoardCard from '../leaderBoard-card'
import LeaderBoardGrid from '../leaderboard-grid'
import { CiSquareInfo } from "react-icons/ci";
import LeaderBoardTable from '../leaderBoard-table'
import { isMobile } from 'react-device-detect'
import { sortByPoints,sortByOpenedPrs, sortByReviewedPrs, sortByCommentsCreated, sortByOpenedIssues } from '@/app/leaderboard/utils'

interface LeaderboardProps {
	list:any[]
}

const Leaderboard:React.FC<LeaderboardProps> = ({
	list
})=> {
	console.log("Dank",sortByPoints(list),isMobile)

	useEffect(()=>{
		console.log("Dank here",isMobile)
	},[isMobile])
	return (
		
          <div
            className="w-[94%] flex justify-center items-center flex-col "
            style={{ margin: "0 auto" }}
          >
            <div className="flex  justify-between flex-start  mt-[50px] w-[100%]">
              <div>
                {!isMobile && <LeaderBoardCard list={list.slice(0, 3)} /> }
                                {isMobile ? <LeaderBoardGrid list={list} /> : <LeaderBoardTable list={list.slice(3, list.length)} /> }
                {/* <LeaderBoardGrid list={data1} /> */}
              </div>

              <div>
                <div className="bg-[#F7FAFF] text-[#4682BB] text-[20px] font-medium p-[16px] w-[100%] text-center rounded-lg justify-center  flex items-center mb-10">
                  <p className="mr-2">Top Brass of the week</p> <CiSquareInfo />
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
	)
}

export default Leaderboard