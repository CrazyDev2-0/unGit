async function callApi(route, queryParameters) {
    const queryParamsString = new URLSearchParams(queryParameters).toString();
    while (true){
        try{
            const response = await fetch(`https://api.github.com/${route}?${queryParamsString}`);
            if(response.status !== 200) throw Error("Rate limit reached");
            return await response.json();
        }catch (e) {
            await new Promise(r => setTimeout(r, 1000*60));
            continue;
        }
    }
}


async function update_profile(email, phone_no){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const username = (await chrome.storage.local.get(['username'])).username
    ;
    var raw = JSON.stringify({
        "username": username,
        "email_id": email,
        "mobile_no": phone_no
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    const response = await fetch("https://hacknitr.tanmoy.codes/profile/update", requestOptions);
    return await response.json();
}

async function unsubscribe(owner_name, repo_name) {
    const user = (await chrome.storage.local.get(['username'])).username;
    var myHeaders = new Headers();
    myHeaders.append("username", user);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "owner_name": owner_name,
        "repository_name": repo_name
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    const response = await fetch("https://hacknitr.tanmoy.codes/unsubscribe", requestOptions);
    const result = await response.json();
    return result;
}

async function subscribe(owner_name, repo_name, labels){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const username = (await chrome.storage.local.get(['username'])).username;
    myHeaders.append("username", username);

    var raw = JSON.stringify({
        "owner_name": owner_name,
        "repository_name": repo_name,
        "labels": labels
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    }

    const response = await fetch("https://hacknitr.tanmoy.codes/rollbacksubscription", requestOptions);
    return await response.json();
}