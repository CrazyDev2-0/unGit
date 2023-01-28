console.log("popup.js loaded");

let loggedIn = false;
let isIssueTabSelected = true;
let isTrackerTabSelected = false;
let selectedCategory = "assigned";
let dataVersion = 0;
let scheduler = null;

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
        loggedIn = response.isLoggedin || false;
    });
}

// signout
function signout()  {
    chrome.runtime.sendMessage({
        "type" : "signout"
    }, (response) => {
        loggedIn = false;
        dataVersion = 0;
        $("#second-screen").addClass("hidden");
        $("#welcome-screen").removeClass("hidden");
        $("#cards-list").html(`
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;">
            <p>Please wait. First time it can take few minutes</p>
        </div>
        `);
    });
}

// Ask for details via background call
function fetchDetailsFromBackend(){
    if(isTrackerTabSelected)    return;
    if(isIssueTabSelected){
        chrome.runtime.sendMessage({
            type: "fetch-issues",
            category: selectedCategory
        }, (response) => {
            dataVersion = response.version;
            updateCardList(response);
        });
    }else {
        chrome.runtime.sendMessage({
            type: "fetch-prs",
            category: selectedCategory
        }, (response) => {
            dataVersion = response.version;
            updateCardList(response);
        });
    }
}

// Scheduler
function startNewDataCheckingScheduler(){
    if(scheduler != null) clearInterval(scheduler);
    // Run one time
    chrome.runtime.sendMessage({
        type: "check-for-new-data",
        isIssue: isIssueTabSelected,
        category: selectedCategory,
        dataVersion: dataVersion
    }, (response) => {
        if(response.update_available)   {
            fetchDetailsFromBackend();
        }
    })
    // run every 10 seconds
    scheduler = setInterval(async function () {
        chrome.runtime.sendMessage({
            type: "check-for-new-data",
            isIssue: isIssueTabSelected,
            category: selectedCategory,
            dataVersion: dataVersion
        }, (response) => {
            if(response.update_available)   {
                fetchDetailsFromBackend();
            }
        })
    }, 10*1000);

}

// UI Related Functions
function  onClickUsernameSubmitBtn(){
    $("#github-username-not-found-helper").addClass("hidden");
    $("#username-input").removeClass('is-danger');

    let user = $("#username-input").val();

    fetch(`https://api.github.com/users/${user}`)
        .then((res)=>  {
            if(res.status !== 200) throw Error("GitHub Username not found");
            chrome.runtime.sendMessage({
                "type" : "set-username",
                "username": user
            }, (response) => {
                if(response.isSuccess){
                    $("#welcome-screen").addClass("hidden");
                    $("#second-screen").removeClass("hidden");
                    loggedIn = true;
                    $("#cards-list").html(`
                        <div style="
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;">
                            <p>Please wait. First time it can take few minutes</p>
                        </div>
                    `);
                }
            });
        }).catch((e)=>   {
            console.log(e);
            $("#username-input").addClass('is-danger');
            $("#github-username-not-found-helper").removeClass("hidden");
        });
    // chrome.runtime.sendMessage({
    //     "type" : "set-username",
    //     "username": user
    // }, (response) => {
    //     if(response.isSuccess){
    //         $("#welcome-screen").addClass("hidden");
    //         $("#second-screen").removeClass("hidden");
    //         loggedIn = true;
    //         $("#cards-list").html(`
    //             <div style="
    //                 display: flex;
    //                 justify-content: center;
    //                 align-items: center;
    //                 width: 100%;
    //                 height: 100%;">
    //                 <p>Please wait. First time it can take few minutes</p>
    //             </div>
    //         `);
    //     }
    // });
}

function onClickIssueBtn(){
    isIssueTabSelected = true;
    isTrackerTabSelected = false;
    $("#prs-tab").removeClass("is-active");
    $("#issues-tab").addClass("is-active");
    $("#trackers-tab").removeClass("is-active");
    $("#pr-category-bar").addClass("hidden");
    $("#tracker-category-bar").addClass("hidden");
    $("#issue-category-bar").removeClass("hidden");
    $("#issue-category-assigned").click();
    
    $("#cards-list").removeClass("hidden");
}

function onClickPRBtn(){
    isIssueTabSelected = false;
    isTrackerTabSelected = false;
    $("#issues-tab").removeClass("is-active");
    $("#prs-tab").addClass("is-active");
    $("#trackers-tab").removeClass("is-active");
    $("#issue-category-bar").addClass("hidden");
    $("#tracker-category-bar").addClass("hidden");
    $("#pr-category-bar").removeClass("hidden");
    $("#pr-category-under-review").click();
    
    $("#cards-list").removeClass("hidden");
}

function onClickTrackerBtn(){
    console.log("CLICKED");
    let repoUrl = $("#track-link-input").val();
    let repoLabel = $("#track-label-input").val();
    console.log(repoUrl, repoLabel);
}

function onClickIssueCategory(category){
    selectedCategory = category;
    dataVersion = 0;
    $("#issue-category-assigned").removeClass("is-active");
    $("#issue-category-mentioned").removeClass("is-active");
    $("#issue-category-created").removeClass("is-active");

    $(`#issue-category-${category}`).addClass("is-active");
    fetchDetailsFromBackend();
}

function onClickPRCategory(category){
    selectedCategory = category;
    dataVersion = 0;
    $("#pr-category-under-review").removeClass("is-active");
    $("#pr-category-merged").removeClass("is-active");
    $("#pr-category-ci-passed").removeClass("is-active");
    $("#pr-category-ci-failed").removeClass("is-active");
    $("#pr-category-awaiting-review").removeClass("is-active");
    $("#pr-category-draft").removeClass("is-active");

    $(`#pr-category-${category}`).addClass("is-active");
    fetchDetailsFromBackend();
}

function onClickTrackerCategory(){
    isIssueTabSelected = false;
    isTrackerTabSelected = true;
    $("#issues-tab").removeClass("is-active");
    $("#prs-tab").removeClass("is-active");
    $("#trackers-tab").addClass("is-active");
    $("#issue-category-bar").addClass("hidden");
    $("#tracker-category-bar").removeClass("hidden");
    $("#pr-category-bar").addClass("hidden");
    $("#cards-list").addClass("hidden");
}

// UI Update from Response | Major Function
function updateCardList(response){
    $("#cards-list").html(Handlebars.templates['list.template'](response));
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    onClickIssueBtn();
    startNewDataCheckingScheduler();
});
$("#signout").click(signout);
$("#username-submit-btn").click(onClickUsernameSubmitBtn);
$("#issues-tab").click(onClickIssueBtn);
$("#prs-tab").click(onClickPRBtn);
$("#trackers-tab").click(onClickTrackerCategory);

$("#tracker-submit-button").click(onClickTrackerBtn);
$("#issue-category-assigned").click(()=>onClickIssueCategory("assigned"));
$("#issue-category-mentioned").click(()=>onClickIssueCategory("mentioned"));
$("#issue-category-created").click(()=>onClickIssueCategory("created"));

$("#pr-category-under-review").click(()=>onClickPRCategory("under-review"));
$("#pr-category-merged").click(()=>onClickPRCategory("merged"));
$("#pr-category-ci-passed").click(()=>onClickPRCategory("ci-passed"));
$("#pr-category-ci-failed").click(()=>onClickPRCategory("ci-failed"));
$("#pr-category-awaiting-review").click(()=>onClickPRCategory("awaiting-review"));
$("#pr-category-draft").click(()=>onClickPRCategory("draft"));