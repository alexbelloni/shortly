const Bitly = () => {
    const endpoint = "https://api-ssl.bitly.com/v4/shorten";

    function getRequestHeader() {
        return {
            "Authorization": "Bearer 0c0f6a3e164e8f1d3da13b09ab9587b9e937ec14"
        }
    }

    function getRequestData(link) {
        return {
            "long_url": link
        };
    }

    function parseResponse(res) {
        return { link: res.link.replace("http://","") };
    }
    return {
        endpoint,
        getRequestHeader,
        getRequestData,
        parseResponse
    }
}

export default Bitly();