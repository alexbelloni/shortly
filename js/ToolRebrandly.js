const ToolRebrandly = () => {
    const endpoint = "https://api.rebrandly.com/v1/links";

    function getRequestHeader() {
        return {
            "apikey": configObj.AUTH_REBRANDLY
        }
    }

    function getRequestData(link) {
        return {
            destination: link,
            domain: { fullName: "rebrand.ly" }
        };
    }

    function parseResponse(res) {
        return { link: res.shortUrl };
    }
    return {
        endpoint,
        getRequestHeader,
        getRequestData,
        parseResponse
    }
}

export default ToolRebrandly();