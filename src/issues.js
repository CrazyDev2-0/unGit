importScripts("api.js");

const IssueType = {
    ASSIGNED: "assignee",
    CREATED: "author",
    MENTIONED: "mentions"
}

// Assigned -> is:open is:issue assignee:Tanmoy741127 archived:false
// Created -> is:open is:issue author:Tanmoy741127 archived:false 
// Mentioned -> is:open is:issue mentions:Tanmoy741127 archived:false

async function findIssues(username, type) {
    if (!Object.values(IssueType).includes(type)) throw new Error("Invalid Issue Type");
    const result = await callApi(`search/issues`, {
        q: `is:open is:issue ${type}:${username} archived:false `,
        per_page: 10
    });
    return result.items.map(el => {
        return {
            id: el.number,
            title: el.title,
            api_url: el.url,
            html_url: el.html_url,
            labels: el.labels.map(el => {
                return {
                    color: el.color,
                    name: el.name
                }
            }),
            comments_count: el.comments,
            created_at: el.created_at,
            updated_at:el.updated_at
        }
    });
}
