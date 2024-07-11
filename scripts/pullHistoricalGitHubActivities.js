/**
 * Script to populate the data-repo with historical information from GitHub.
 *
 * Supports populating the ollowing activity types:
 *
 * - [x] issue_opened
 * - [x] pr_opened
 * - [x] pr_merged
 */

import { join } from 'path';
import { writeFile, mkdir, readFile } from 'fs/promises';
import { Octokit } from 'octokit';

const basePath = join(process.cwd(), "../data-repo/data/github");
console.log('CWD:: ', process.cwd())
console.info(`Data will be written to: '${basePath}'`);

const org = process.env.GITHUB_ORG;
console.log('Github org: ', org);
const token = process.env.GITHUB_TOKEN;

if (!org) {
  throw Error(
    "'GITHUB_ORG' environment needs to be set with a GitHub Organization (e.g.: 'coronasafe').",
  );
}

if (!token) {
  throw Error(
    "'GITHUB_TOKEN' environment needs to be set with a GitHub Access Token.",
  );
}

const blacklistedAccounts = ["dependabot", "snykbot", "codecov-commenter"];
console.log('Github token secret: ', token.substring(0, 12));
const octokit = new Octokit({ auth: token });

const getRepositories = async () => {
  const { organization } = await octokit.graphql.paginate(
    `query paginate($cursor: String, $org: String!) {
      organization(login: $org) {
        repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }, after: $cursor)  {
          nodes {
            name
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }`,
    { org },
  );
  return organization.repositories.nodes.map((node) => node.name);
};

const getIssues = async (repo) => {
  const { repository } = await octokit.graphql.paginate(
    `query paginate($cursor: String, $org: String!, $repo: String!) {
      repository(owner: $org, name: $repo) {
        issues(first: 100, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            number
            title
            url
            createdAt
            state
            author {
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
    `,
    { org, repo },
  );
  return repository.issues.nodes;
};

const getPullRequests = async (repo) => {
  const { repository } = await octokit.graphql.paginate(
    `query paginate($cursor: String, $org: String!, $repo: String!) {
      repository(owner: $org, name: $repo) {
        pullRequests(first: 100, after: $cursor) {
          nodes {
            number
            title
            url
            createdAt
            state
            body
            merged
            mergedAt
            closingIssuesReferences(first: 10) {
              totalCount
              nodes {
                number
                title
                url
                state
                createdAt
                author {
                  login
                }
              }
            }
            reviews(first: 10) {
              totalCount
              nodes {
                createdAt
                state
                author {
                  login
                }
              }
            }
            comments(first: 10) {
              totalCount
              nodes {
                body
                createdAt
                author {
                  login
                }
              }
            }
            author {
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
    `,
    { org, repo },
  );
  const pullRequests = repository.pullRequests.nodes;
  if(repo == 'protocol-server') {
    pullRequests.forEach(pr => {
      // const issueReferences = parseIssueReferences(pr.body);
      // pr.comments.nodes.forEach(comment => {
      //   issueReferences.push(...parseIssueReferences(comment.body));
  
      // });
      //console.log('PR Body::: ', JSON.stringify(pr.body));
      pr.closingIssuesReferences.nodes.forEach(issue => {
        // console.log(`  Issue #${issue.number}: ${issue.title}`);
        // console.log(`  URL: ${issue.url}`);
        // console.log(`  State: ${issue.state}`);
        // console.log(`  Created At: ${issue.createdAt}`);
        // console.log(`  Author: ${issue.author.login}`);
        console.log(`Linked Issue to pr: ${pr.url}   `, JSON.stringify(issue));
      });
      // console.log(`PR #${pr.number}: ${pr.title}`);
      // console.log(`URL: ${pr.url}`);
      // console.log(`Created At: ${pr.createdAt}`);
      // console.log(`State: ${pr.state}`);
      // console.log(`Merged: ${pr.merged}`);
      // console.log(`Merged At: ${pr.mergedAt}`);
      // console.log(`Author: ${pr.author.login}`);
      // console.log(`Issue References: ${issueReferences.join(', ')}`);
    });
  }
  
  return pullRequests;
};

const getUserActivities = async () => {
  const userActivities = {};

  const addActivity = (user, activity) => {
    userActivities[user] ??= [];
    userActivities[user].push(activity);
  };

  //const repositories = await getRepositories();
  const repositories = ['protocol-server']
  console.log('Repository names: ', repositories);
  for (const [i, repo] of repositories.entries()) {
    console.info(
      `[${i + 1}/${repositories.length}] Pulling activities for repository '${repo}'`,
    );

    const issues = await getIssues(repo);
    if(repo == 'protocol-server') {
      console.log('Protocol server issue: ', issues);
    }
    console.info(`  Captured ${issues.length} issues`);
    for (const issue of issues) {
      if (!issue.author?.login) {
        continue;
      }

      addActivity(issue.author.login, {
        type: issue.state === 'CLOSED' ? "issue_closed" : "issue_opened",
        title: `${org}/${repo}#${issue.number}`,
        time: issue.createdAt,
        link: issue.url,
        text: issue.title,
      });
    }

    const pulls = await getPullRequests(repo);
    console.info(`  Captured ${pulls.length} pull requests`);
    // if(repo == 'protocol-server') {
    //   console.log('Protocol server PRs: ', pulls)
      
    // }
    for (const pr of pulls) {
      if (!pr.author?.login) {
        continue;
      }
      if(repo == 'protocol-server' && pr.reviews.totalCount > 0) {
        //console.log('Protocol server reviewed pr: ', pr);
      }
      if(pr.state === 'OPEN') {
        if(pr?.reviews?.totalCount) {
          for(const review of pr?.reviews?.nodes) {
            if(review.state === 'APPROVED') {
              addActivity(review.author.login, {
                type: "pr_reviewed",
                title: `${org}/${repo}#${pr.number}`,
                time: pr.createdAt,
                link: pr.url,
                text: pr.title,
              });
            }
          }
          
        } else {
          addActivity(pr.author.login, {
            type: "pr_opened",
            title: `${org}/${repo}#${pr.number}`,
            time: pr.createdAt,
            link: pr.url,
            text: pr.title,
          });
        }
      }
      else if (pr.state === 'MERGED' && pr.merged) {
        addActivity(pr.author.login, {
          type: "pr_merged",
          title: `${org}/${repo}#${pr.number}`,
          time: pr.mergedAt,
          link: pr.url,
          text: pr.title,
        });
      }
    }
  }

  return userActivities;
};

const getUserJson = async (user, scrapedActivities) => {
  try {
    const data = JSON.parse(
      await readFile(join(basePath, `${user}.json`), "utf8"),
    );

    const oldActivities = data.activity;
    const newActivities = scrapedActivities.filter(
      (a) => !oldActivities.find((b) => a.link === b.link && a.type === b.type),
    );

    return {
      ...data,
      activity: [...oldActivities, ...newActivities],
    };
  } catch {
    return {
      last_updated: scrapedActivities[0]?.time ?? new Date().toISOString(),
      activity: scrapedActivities,
      open_prs: [],
      authored_issue_and_pr: [],
    };
  }
};

const isBlacklisted = (login) => {
  return login.includes("[bot]") || blacklistedAccounts.includes(login);
};

async function main() {
  const userActivities = await getUserActivities();

  const dataPoints = Object.values(userActivities)
    .map((arr) => arr.length)
    .reduce((p, v) => p + v, 0);
  console.log(`Captured ${dataPoints} data points.`);

  await mkdir(basePath, { recursive: true });

  await Promise.all(
    Object.entries(userActivities).map(async ([user, activities]) => {
      if (isBlacklisted(user)) {
        console.log(`Skipping for blacklisted account '${user}'`);
        return;
      }

      const path = join(basePath, `${user}.json`);
      console.log(`Writing activities for '${user}' to '${path}'.`);
      await writeFile(
        path,
        JSON.stringify(await getUserJson(user, activities), undefined, "  "),
        {
          encoding: "utf-8",
        },
      );
    }),
  );

  console.log("Completed");
}

main();
