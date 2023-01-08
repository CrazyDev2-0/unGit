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
