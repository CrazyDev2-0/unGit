importScripts("./vendor/moment.js");
importScripts("./issues.js");
importScripts("./pr.js");

let loggedIn = false;
let username = '';
let scheduler = null;

// Read username from storage
async function readUsernameFromStorage() {
    let res = await chrome.storage.local.get(["username"]);
    if(res.username === undefined || res.username === null || res.username === "") {
        loggedIn = false;
        return;
    }
    username = res.username;
    scheduleDataFetch();
    loggedIn = true;
}

// Set username
async function setUsername(usernameNew){
    try{
        await chrome.storage.local.set({
            "username": usernameNew
        })
        loggedIn = true;
        username = usernameNew;
        return true;
    }catch (e) {
        return  false;
    }
}

// Return login status
async function loginCheck() {
    if(loggedIn) return true;
    await readUsernameFromStorage();
    if(loggedIn) return true;
    else return  false;
}

function scheduleDataFetch(){
    if(scheduler != null) clearInterval(scheduler);
    scheduler = setInterval(async function () {
        await updateLocalDatabase();
    }, 60*1000);
}

async function updateLocalDatabase(){
    // Issues
    // IssueType.ASSIGNED
    const assignedIssues = await findIssues(username, IssueType.ASSIGNED);
    // IssueType.CREATED
    const createdIssues = await findIssues(username, IssueType.CREATED);
    // IssueType.MENTIONED
    const mentionedIssues = await findIssues(username, IssueType.MENTIONED);
    // PR Draft
    const draftedPRs = await findPR_Draft(username);
    // PR Merged
    const mergedPRs = await findPR_Merged(username);
    // CI Succeed
    const CISucceedPRs = await findPR_CISucceed(username);
    // CI Failed
    const CIFailedPRs = await findPR_CIFailed(username);
    // Awaiting Review
    let AwaitingReviewPRs = await findPR_AwaitingReview(username);
    // Under Review
    let UnderReviewPRs = await  findPR_UnderReview(username);

    // Fetch request_reviewers list
    for (let i = 0; i < AwaitingReviewPRs.length; i++) {
        const requested_reviewers = await findPRRequestedReviewers(AwaitingReviewPRs[i].owner, AwaitingReviewPRs[i].repo, AwaitingReviewPRs[i].id);
        AwaitingReviewPRs[i].requested_reviewers = requested_reviewers;
    }

    // Fetch under review reviewers list
    for (let i = 0; i < UnderReviewPRs.length; i++) {
        const requested_reviewers = await findPRRequestedReviewers(UnderReviewPRs[i].owner, UnderReviewPRs[i].repo, UnderReviewPRs[i].id);
        const reviewers_status = await findPRReviewersStatus(UnderReviewPRs[i].owner, UnderReviewPRs[i].repo, UnderReviewPRs[i].id);
        UnderReviewPRs[i].requested_reviewers = requested_reviewers;
        UnderReviewPRs[i].reviewers_status = reviewers_status;
    }

    // Fetch old details
    const oldDetails = await chrome.storage.local.get();

    // Store the details
    await chrome.storage.local.set({
        "assigned_issues": assignedIssues,
        "created_issues": createdIssues,
        "mentioned_issues": mentionedIssues,
        "drafted_prs": draftedPRs,
        "merged_prs": mergedPRs,
        "ci_succeed_prs": CISucceedPRs,
        "ci_failed_prs": CIFailedPRs,
        "awaiting_review_prs": AwaitingReviewPRs,
        "under_review_prs": UnderReviewPRs
    })

    // Fetch new details
    const newDetails = await chrome.storage.local.get();
    try {
        if(changed(oldDetails, newDetails)){
            chrome.notifications.create((Math.random() + 1).toString(36).substring(7), {
                type: 'basic',
                iconUrl: 'https://gcdnb.pbrd.co/images/yH3va4BzDRQh.png?o=1',
                title: 'Check UnGit for updated information',
                message: 'If you have some update in your profile',
                priority: 2
            })
        }
    }catch (e){
        console.log("Failed to analyze changes");
    }

    console.log("updated")
}

// Helpers
function IDMap(arg) {
    abc = {}
    for(obj in arg) {
        if(typeof obj != "object") continue;
        for (let i = 0; i < arg[obj].length; i++) {
            id = arg[obj][i].id
            if (id === undefined){
                continue
            }else{
                abc[id] = obj
            }
        }
    }
    return abc
}

function changed(oldState, newState) {
    const oldIDMap = IDMap(oldState)
    const newIDMap = IDMap(newState)
    for(const [key, value] of Object.entries(newIDMap)){
        if(oldIDMap[key] !== value){
            return true;
        }
    }
    return false;
}

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type === "get-login-status"){
        loginCheck()
        .then((loginStatus)=>{
            sendResponse({
                "isLoggedin": loginStatus
            })
        })
    }else if(message.type === "set-username"){
        setUsername(message.username)
            .then((isSuccess)=>{
                scheduleDataFetch();
                sendResponse({
                    "isSuccess" : isSuccess
                })
            })
    }else if(message.type === "fetch-issues"){
        const category = message.category;
        const key = `${category}_issues`;
        chrome.storage.local.get([key])
            .then((e)=>{
                let result = e[key];
                if(result === undefined || result === null || result === ""){
                    sendResponse({
                        "isIssue": true,
                        "count" : 0,
                        "data" : []
                    })
                }else{
                    sendResponse({
                        "isIssue": true,
                        "count" : result.length,
                        "data" : result
                    })
                }
            })
    }else if(message.type === "fetch-prs"){
        const category = message.category;
        let key = "";
        if(category === "under-review") key = "under_review_prs"
        else if(category === "awaiting-review") key = "awaiting_review_prs"
        else if(category === "merged") key = "merged_prs"
        else if(category === "draft") key = "drafted_prs"
        else if(category === "ci-passed") key = "ci_succeed_prs"
        else if(category === "ci-failed") key = "ci_failed_prs"
        if(category === "") return  true;
        chrome.storage.local.get([key])
            .then((e)=>{
                let result = e[key];
                if(result === undefined || result === null || result === ""){
                    sendResponse({
                        "isIssue": false,
                        "count" : 0,
                        "data" : []
                    })
                }else {
                    sendResponse({
                        "isIssue": false,
                        "count" : result.length,
                        "data" : result
                    })
                }
            })
    }

    return true;
});


// run on start
readUsernameFromStorage();

