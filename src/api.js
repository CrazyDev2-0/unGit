async function callApi(route, queryParameters) {
    const queryParamsString = new URLSearchParams(queryParameters).toString()
    const response = await fetch(`https://api.github.com/${route}?${queryParamsString}`);
    return await response.json();
}

/**
 {
     "q" : "is:open is:pr assignee:Tanmoy741127 archived:false",
      "r" : 45
 }
 *
 * */