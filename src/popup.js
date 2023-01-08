console.log("popup.js loaded");

let loggedIn = false;
let isIssueTabSelected = true;
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
    let user = $("#username-input").val();
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
}

function onClickIssueBtn(){
    isIssueTabSelected = true;
    $("#prs-tab").removeClass("is-active");
    $("#issues-tab").addClass("is-active");
    $("#pr-category-bar").addClass("hidden");
    $("#issue-category-bar").removeClass("hidden");
    $("#issue-category-assigned").click();
}

function onClickPRBtn(){
    isIssueTabSelected = false;
    $("#issues-tab").removeClass("is-active");
    $("#prs-tab").addClass("is-active");
    $("#issue-category-bar").addClass("hidden");
    $("#pr-category-bar").removeClass("hidden");
    $("#pr-category-under-review").click();
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

$("#issue-category-assigned").click(()=>onClickIssueCategory("assigned"));
$("#issue-category-mentioned").click(()=>onClickIssueCategory("mentioned"));
$("#issue-category-created").click(()=>onClickIssueCategory("created"));

$("#pr-category-under-review").click(()=>onClickPRCategory("under-review"));
$("#pr-category-merged").click(()=>onClickPRCategory("merged"));
$("#pr-category-ci-passed").click(()=>onClickPRCategory("ci-passed"));
$("#pr-category-ci-failed").click(()=>onClickPRCategory("ci-failed"));
$("#pr-category-awaiting-review").click(()=>onClickPRCategory("awaiting-review"));
$("#pr-category-draft").click(()=>onClickPRCategory("draft"));