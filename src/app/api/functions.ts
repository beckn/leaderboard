import {
  LeaderboardSortKey, LeaderboardAPIResponse,

} from "@/lib/types";
import { getContributors } from "@/lib/api";

export const getLeaderboardData = async (
  dateRange: readonly [Date, Date],
  sortBy: LeaderboardSortKey = "points",
  ordering: "asc" | "desc" = "desc",
  // roles: ("core" | "intern" | "operations" | "contributor")[] = [],
) => {
  const contributors = await getContributors();

  const data = contributors
    .filter((a) => a.highlights.points)
    .map((contributor) => ({
      ...contributor,
      summary: contributor.summarize(...dateRange),
    }))
    .filter((contributor) => contributor.summary.points)
    // .filter(
    //   (contributor) => roles.length == 0 || roles.includes(contributor.role),
    // )
    .sort((a, b) => {
      if (sortBy === "pr_stale") {
        return b.activityData.pr_stale - a.activityData.pr_stale;
      }
      return b.summary[sortBy] - a.summary[sortBy];
    });

  if (ordering === "asc") {
    data.reverse();
  }

  return data.map((contributor): LeaderboardAPIResponse[number] => {
    return {
      user: {
        slug: contributor.slug,
        name: contributor.name,
        title: contributor.title,
        role: contributor.role,
        content: contributor.content,
        joining_date: contributor.joining_date,
        social: {
          github: contributor.github,
          linkedin: contributor.linkedin,
          slack: contributor.slack,
          twitter: contributor.twitter,
        },
      },
      highlights: {
        ...contributor.summary,
        pr_stale: contributor.activityData.pr_stale,
      },
    };
  });
};
