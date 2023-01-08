console.log("popup.js loaded");

let loggedIn = false;
let isIssueTabSelected = true;
let selectedCategory = "assigned";

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
        $("#second-screen").addClass("hidden");
        $("#welcome-screen").removeClass("hidden");
    });
}

// Ask for details
function fetchDetailsFromBackend(){
    if(isIssueTabSelected){
        chrome.runtime.sendMessage({
            type: "fetch-issues",
            category: selectedCategory
        }, (response) => {
            updateCardList(response);
        });
    }else {
        chrome.runtime.sendMessage({
            type: "fetch-prs",
            category: selectedCategory
        }, (response) => {
            updateCardList(response);
        });
    }
}

// UI Related Functions
function  onClickSubmitBtn(){
    let user = $("#username-input").val();
    chrome.runtime.sendMessage({
        "type" : "set-username",
        "username": user
    }, (response) => {
        if(response.isSuccess){
            $("#welcome-screen").addClass("hidden");
            $("#second-screen").removeClass("hidden");
            loggedIn = true;
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
    $("#issue-category-assigned").removeClass("is-active");
    $("#issue-category-mentioned").removeClass("is-active");
    $("#issue-category-created").removeClass("is-active");

    $(`#issue-category-${category}`).addClass("is-active");
    fetchDetailsFromBackend();
}

function onClickPRCategory(category){
    selectedCategory = category;
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
});
$("#signout").click(signout);
$("#username-submit-btn").click(onClickSubmitBtn);
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