"use client";
import React from "react";
import Image from "next/image";

interface LeaderBoardCardProps {
  list: any[];
}

const rankMap = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

const LeaderBoardCard: React.FC<LeaderBoardCardProps> = ({ list }) => {
  const getGradientClass = (rank: any) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-b from-[#F9DE16] to-[#E99002]";

      case 2:
        return "bg-gradient-to-b from-[#F9F9F9] to-[#B4BEC4]";
      case 3:
        return "bg-gradient-to-b from-[#FFD287] to-[#994217]";
      default:
        return "bg-gradient-to-b from-[#F9DE16] to-[#E99002]";
    }
  };
  return (
    <div className=" ">
      <div className="flex  justify-between items-start w-[100%]  mb-8">
        {list.map((singleItem, index) => {
          const {
            user: { name, social, slug },
            highlights: { points, pr_opened, pr_reviewed, pr_merged },
          } = singleItem;
          return (
            <div
              className="h-[300px] w-[270px] bg-[#E7F3FF] mr-4 flex flex-col  justify-center items-center p-4 rounded-xl relative cursor-pointer"
              onClick={() => (window.location.href = `/contributors/${slug}`)}
            >
              <p
                className={`absolute top-[-25px] h-[44px] w-[44px] rounded-full ${getGradientClass(
                  index + 1
                )} flex  justify-center items-center text-[15px] font-semibold shadow-[0_0_0_3px_#fff]`}
              >
                {rankMap[index + 1]}
              </p>
              <Image
                src={`https://avatars.githubusercontent.com/${slug}`}
                alt={slug}
                className="rounded-[50%] object-cover"
                height={114}
                width={114}
              />

              <div className="text-[20px] font-medium mt-2">{name}</div>
              <div className="text-[14px] ">{`${pr_merged}PR merged; ${pr_opened} Open; ${pr_reviewed} reviewed`}</div>
              <div className="text-[16px] font-medium mt-6 rounded-lg border-[#4682BB] border-solid border-[1px] px-[12px] py-[6px] text-[#4682BB] flex items-center">
                <img src="assets/images/star.svg" alt="" />
                <p className="pl-2">{points}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoardCard;