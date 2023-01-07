importScripts("./vendor/axios.js");
importScripts("./vendor/moment.js")

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