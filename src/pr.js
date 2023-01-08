importScripts("api.js");
importScripts("helper.js")

// Helper function
function formatPRListResponses(rawData) {
    return rawData.items.map(el => {
        // Parse owner username and repo name from html_url
        const urlParsed = el.html_url.match(/(^https:\/\/github.com)?\/(?<org>.*)\/(?<repo>.*)(\/pull.*)/).groups;
        
        return {
            id: el.number,
            title: el.title,
            owner: urlParsed.org,
            repo: urlParsed.repo,
            api_url: el.url,
            html_url: el.html_url,
            labels: el.labels,
            comments_count: el.comments,
            created_at: el.created_at,
            updated_at: el.updated_at
        }
    });
}

async function findPR_Draft(username){
    // is:open is:pr author:Tanmoy741127 archived:false draft:true 
    const result = await callApi(`search/issues`, {
        q: `is:open is:pr author:${username} archived:false draft:true`
    });
    return formatPRListResponses(result);
}

async function findPR_Merged(username)  {
    // current from list of PRs check merged field and filter only last 3 days
    const FETCH_BEFORE_DAYS = 7;
    var currentDate = new Date(Date.now());
    var currentDateString = datetimeToDateString(currentDate);
    var threeDaysBeforeDateString = datetimeToDateString(new Date(currentDate - FETCH_BEFORE_DAYS*24*3600*1000));
    const result = await callApi(`search/issues`, {
        q: `is:pr is:closed author:${username} merged:${threeDaysBeforeDateString}..${currentDateString} sort:updated-desc`
    });
    return formatPRListResponses(result);
}

// async function findPR_RequestedChanges(username)  {
//     const result = await callApi(`search/issues`, {
//         q: `is:pr author:${username} review:changes_requested archived:false is:open`
//     });
//     return formatPRListResponses(result);
// }

async function findPR_AwaitingReview(username)  {
    const result = await callApi(`search/issues`, {
        q: `is:open is:pr author:${username} archived:false review:none draft:false`
    });
    return formatPRListResponses(result);
}

async function findPR_UnderReview(username)  {
    const result = await callApi(`search/issues`, {
        q: `is:pr author:${username} archived:false -review:none draft:false is:open`
    });
    return formatPRListResponses(result);
}

async function findPR_CIFailed(username)  {
    const result = await callApi(`search/issues`, {
        q: `is:pr author:${username} archived:false status:failure is:open`
    });
    return formatPRListResponses(result);
}

async function findPR_CISucceed(username)  {
    const result = await callApi(`search/issues`, {
        q: `is:pr author:${username} archived:false status:success is:open `
    });
    return formatPRListResponses(result);
}


async function findPRRequestedReviewers(orgName, repoName, id)  {
    const result = await callApi(`repos/${orgName}/${repoName}/pulls/${id}/requested_reviewers`);
    // login, avatar_url, html_url
    return result.users.map(ele => {
        return {
            username: ele.login,
            avatar_url: ele.avatar_url,
            html_url: ele.html_url
        }
    });
}

async function findPRReviewersStatus(orgName, repoName, id)  {
    let result = await callApi(`repos/${orgName}/${repoName}/pulls/${id}/reviews`);
    result = result.map(el => {
        return {
            username: el.user.login,
            avatar_url: el.user.avatar_url,
            html_url: el.user.html_url,
            body: el.body,
            state: el.state

        }
    })
    let final_result = {};
    for (let i = 0; i < result.length; i++) {
        const ele = result[i];
        if(ele.username in final_result){
            if((final_result[ele.username].state === "APPROVED" || final_result[ele.username].state === "CHANGES_REQUESTED") && ele.state === "COMMENTED"){
                continue;
            }
            final_result[ele.username] = ele;
        }else{
            final_result[ele.username] = ele;
        }
    }
    return Object.values(final_result);
}