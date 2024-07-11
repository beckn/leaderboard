
import { LeaderboardAPIResponse } from "@/lib/types";


export const sortByReviewedPrs = (users:LeaderboardAPIResponse[number][])=>{
	 let sortedUsers = users.toSorted((a, b) => {
		return b.highlights.pr_reviewed - a.highlights.pr_reviewed;
	});
	return sortedUsers
}

export const sortByOpenedPrs = (users:LeaderboardAPIResponse[number][])=>{
	let sortedUsers = users.toSorted((a, b) => {
	 return b.highlights.pr_opened - a.highlights.pr_opened;
 });
 return sortedUsers
}

export const sortByCommentsCreated = (users:LeaderboardAPIResponse[number][])=>{
	let sortedUsers = users.toSorted((a, b) => {
	 return b.highlights.comment_created - a.highlights.comment_created;
 });
 return sortedUsers
}

export const sortByOpenedIssues = (users:LeaderboardAPIResponse[number][])=>{
	let sortedUsers = users.toSorted((a, b) => {
	 return b.highlights.issue_opened - a.highlights.issue_opened;
 });
 return sortedUsers
}