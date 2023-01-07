importScripts("./vendor/moment.js");
importScripts("./issues.js");
importScripts("./pr.js");

let loggedIn = false;
let username = '';

// Read username from storage
async function readUsernameFromStorage() {
    let res = await chrome.storage.local.get(["username"]);
    if(res.username === undefined || res.username === null || res.username === "") {
        loggedIn = false;
        return;
    }
    username = res.username;
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

async function updateLocalDatabase(){
    // Issues
    // IssueType.ASSIGNED
    const assignedIssues = await  findIssues(username, IssueType.ASSIGNED);
    // IssueType.CREATED
    const createdIssues = await  findIssues(username, IssueType.CREATED);
    // IssueType.MENTIONED
    const mentionedIssues = await  findIssues(username, IssueType.MENTIONED);

    // Store the details
    await chrome.storage.local.set({
        "assigned_issues": assignedIssues,
        "created_issues": createdIssues,
        "mentioned_issues": mentionedIssues,
    })

    console.log(assignedIssues);
    console.log(createdIssues);
    console.log(mentionedIssues);

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
                sendResponse({
                    "isSuccess" : isSuccess
                })
            })
    }

    return true;
});


// chrome.runtime.sendMessage('get-user-data', (response) => {
//     // 3. Got an asynchronous response with the data from the service worker
//     console.log('received user data', response);
// });

// run on start
readUsernameFromStorage();
// setInterval(function () {
//     console.log('open');
// }, 1000)

chrome.runtime.onInstalled.addListener(async()=>{

})