import LoadingText from "@/components/LoadingText";
import { IGitHubEvent } from "@/lib/gh_events";
import GitHubEvent from "@/components/gh_events/GitHubEvent";
import { env } from "@/env.mjs";
import octokit from "@/lib/octokit";

export const fetchCache = 'force-no-store';

const GITHUB_ORG: string = env.NEXT_PUBLIC_GITHUB_ORG;

const excludeBotEvents = (event: IGitHubEvent) => {
  return !event.actor.login.includes("bot");
};

const excludeBlacklistedEvents = (event: IGitHubEvent) => {
  const blacklist = [
    "CreateEvent",
    "WatchEvent",
    "PullRequestReviewCommentEvent",
    "DeleteEvent",
    "IssueCommentEvent",
  ];
  return !blacklist.includes(event.type);
};

export default async function FeedPage() {
  try {
    const events = await octokit.paginate(
      "GET /orgs/{org}/events",
      {
        org: GITHUB_ORG,
        per_page: 1000,
      },
      (response) => {
        const data = response.data as IGitHubEvent[];
        return data.filter(excludeBotEvents).filter(excludeBlacklistedEvents);
      },
    );
    if (!events?.length) {
      return <LoadingText text="No events found" />;
    }

    return (
      <div className="relative mx-auto my-8 flow-root max-w-4xl p-4">
        <h1 className="text-4xl text-primary-500 dark:text-white">Feed</h1>
        <ul role="list" className="mb-20 mt-10 flex flex-col gap-4 space-y-4">
          {events.map((e: IGitHubEvent) => (
            <GitHubEvent key={e.id} event={e} />
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return <LoadingText text="Failed to fetch events" />;
  }
}

