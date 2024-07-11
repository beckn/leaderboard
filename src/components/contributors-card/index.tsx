import React from "react";
import Image from "next/image";
import { LeaderboardAPIResponse } from "@/lib/types";




interface ContributorsCardProps {
  title:string
  users:LeaderboardAPIResponse[number][]
}

const ContributorsCard:React.FC<ContributorsCardProps> = ({users,title}) => {
  return (
    <div className="bg-[#FAFAFA] rounded-xl border-[#E5E5E5] border-solid bg-[#FAFAFA] border-[1px] p-[18px] mb-6">
      <div className="text-[18px] mb-5">
        Most # of <span className="text-[#4682BB]">{title}</span>
      </div>
      {
        users.map((singleUser)=>{

          const {user:{name,social,slug},highlights:{points,pr_opened,pr_reviewed,pr_merged}} = singleUser
          return <div className="flex items-center justify-between text-[16px] mb-4">
        <div className="flex items-center ">
          
           <Image
        src={`https://avatars.githubusercontent.com/${slug}`} 
        alt={slug}
        className="rounded-[50%] object-cover"
        height={51}
        width={51}
      />
          <p className="ml-2">{name}</p>
        </div>
        <div className=" font-medium  rounded-lg text-[#4682BB] flex items-center">
          <img src="assets/images/star.svg" alt="" />
          <p className="pl-2">{points}</p>
        </div>
      </div>
        })
      }
    </div>
  );
};

export default ContributorsCard;
