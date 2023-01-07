async function callApi(route, queryParameters) {
    const response = await axios.get(`https://api.github.com/${route}`, {
        params: queryParameters
    });
    return response.data;
}