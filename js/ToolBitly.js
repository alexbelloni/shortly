const ToolBitly = () => {
    const endpoint = "https://api-ssl.bitly.com/v4/shorten";

    function getRequestHeader(configObj) {
        return {
            "Authorization": "Bearer " + configObj.AUTH_BITLY
        }
    }

    function getRequestData(link) {
        return {
            "long_url": link
        };
    }

    function parseResponse(res) {
        return { link: res.link.replace("http://", "") };
    }
    return {
        endpoint,
        getRequestHeader,
        getRequestData,
        parseResponse
    }
}

export default ToolBitly();