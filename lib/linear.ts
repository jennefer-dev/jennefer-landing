import "server-only";

export type RoadmapIssue = {
  id: string;
  identifier: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  completedAt: string | null;
  state: { name: string; type: string } | null;
};

type IssueConnection = {
  nodes: RoadmapIssue[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
};

const ISSUES_QUERY = `
  query PublicRoadmapIssues($after: String) {
    issues(first: 100, after: $after, filter: { labels: { some: { name: { eq: "public-roadmap" } } } }) {
      nodes {
        id
        identifier
        title
        description
        dueDate
        completedAt
        state { name type }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

export async function getRoadmapIssues(): Promise<RoadmapIssue[]> {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) throw new Error("LINEAR_API_KEY is missing");

  const issues: RoadmapIssue[] = [];
  let cursor: string | null = null;

  // The label filter runs in Linear, so unmarked issues never reach the page.
  for (let page = 0; page < 5; page++) {
    const response = await fetch("https://api.linear.app/graphql", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: ISSUES_QUERY, variables: { after: cursor } }),
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error(`Linear request failed (${response.status})`);

    const payload: {
      data?: { issues?: IssueConnection };
      errors?: Array<{ message: string }>;
    } = await response.json();

    if (payload.errors?.length || !payload.data?.issues) {
      throw new Error(payload.errors?.[0]?.message ?? "Invalid Linear response");
    }

    const connection = payload.data.issues;
    issues.push(...connection.nodes);
    if (!connection.pageInfo.hasNextPage || !connection.pageInfo.endCursor) break;
    cursor = connection.pageInfo.endCursor;
  }

  return issues.filter((issue) => issue.state?.type !== "canceled");
}

const CLOSED_BETA_QUERY = `
  query ClosedBetaLaunch {
    issues(first: 100, filter: { labels: { some: { name: { eq: "closed-beta" } } } }) {
      nodes {
        dueDate
        state { type }
      }
    }
  }
`;

export async function getClosedBetaLaunchDate(): Promise<string | null> {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) throw new Error("LINEAR_API_KEY is missing");

  const response = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: CLOSED_BETA_QUERY }),
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) throw new Error(`Linear request failed (${response.status})`);

  const payload: {
    data?: { issues?: { nodes: Array<{ dueDate: string | null; state: { type: string } | null }> } };
    errors?: Array<{ message: string }>;
  } = await response.json();

  if (payload.errors?.length || !payload.data?.issues) {
    throw new Error(payload.errors?.[0]?.message ?? "Invalid Linear response");
  }

  const dates = payload.data.issues.nodes
    .filter((issue) => issue.state?.type !== "canceled" && issue.dueDate)
    .map((issue) => issue.dueDate as string)
    .filter((date) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
      const parsed = new Date(`${date}T00:00:00Z`);
      return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
    })
    .sort();

  return dates[0] ?? null;
}
