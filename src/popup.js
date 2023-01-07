console.log("popup.js loaded");

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("poupup received message", message);
// });

// chrome.runtime.sendMessage('get-user-data', (response) => {
//     // 3. Got an asynchronous response with the data from the service worker
//     console.log('received user data', response);
// });

// Check login status
function checkLoginStatus() {
    chrome.runtime.sendMessage({
        "type" : "get-login-status"
    }, (response) => {
        console.log(response);
        if(response.isLoggedin){
            $("#welcome-screen").addClass("hidden");
            $("#second-screen").removeClass("hidden");
        }else{
            $("#second-screen").addClass("hidden");
            $("#welcome-screen").removeClass("hidden");
        }
    });
}

function  onClickSubmitBtn(){
    let user = $("#username-input").val();
    chrome.runtime.sendMessage({
        "type" : "set-username",
        "username": user
    }, (response) => {
        console.log(response);
        if(response.isSuccess){
            $("#welcome-screen").addClass("hidden");
            $("#second-screen").removeClass("hidden");
        }
    });
}



// Initialize listeners
document.addEventListener('DOMContentLoaded', () => checkLoginStatus())
$("#username-submit-btn").click(onClickSubmitBtn);