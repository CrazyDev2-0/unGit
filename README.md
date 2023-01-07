## Issues

Assigned - findIssues(username, IssueType.ASSIGNED)
Created - findIssues(username, IssueType.CREATED)
Mentioned - findIssues(username, IssueType.MENTIONED)

Output format

```js
  {
    id: 3311,
    title: 'Add a welcome message to all the new users ',
    api_url: 'https://api.github.com/repos/CircuitVerse/CircuitVerse/issues/3311',
    html_url: 'https://github.com/CircuitVerse/CircuitVerse/issues/3311',
    labels:
        [
            {
                id: 1237826947,
                node_id: 'MDU6TGFiZWwxMjM3ODI2OTQ3',
                url: 'https://api.github.com/repos/CircuitVerse/CircuitVerse/labels/%F0%9F%8C%9F%20feature',
                name: '🌟 feature',
                color: '0e8a16',
                default: false,
                description: ''
            }
        ],
    comments_count: 8,
    created_at: 2022 - 10 - 08T09: 45: 57.000Z,
    updated_at: 2023 - 01 - 06T15: 40: 13.000Z
}

```

## Pull Requests

Output format

```js
  {
    id: 3416,
    title: 'Circuitverse UI update',
    owner: 'CircuitVerse',
    repo: 'CircuitVerse',
    api_url: 'https://api.github.com/repos/CircuitVerse/CircuitVerse/issues/3416',
    html_url: 'https://github.com/CircuitVerse/CircuitVerse/pull/3416',
    labels: [],
    comments_count: 5,
    created_at: 2022-12-19T07:50:27.000Z,
    updated_at: 2022-12-26T06:25:11.000Z
  }
```

- Draft - findPR_Draft(username)
- Awaiting Review (All reviewers pending ) - findPR_AwaitingReview(username)
- Under Review (At least one reviewer interacted with it) - findPR_UnderReview(username)
- CI Succeed PRs - findPR_CISucceed(username)
- CI Failed PRs - findPR_CIFailed(username)
- Merged PRs [Last 3 days] - findPR_Merged(username)

Reviewers Functions [Special for Awaiting Review and Under Review]
- Requested reviewers who have done nothing - findPRRequestedReviewers(orgName, repoName, id)
- Reviewers who have interacted a bit findPRReviewersStatus(orgName, repoName, id)