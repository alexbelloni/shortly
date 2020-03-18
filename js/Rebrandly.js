const Rebrandly = () => {
    const endpoint = "https://api.rebrandly.com/v1/links";

    function getRequestHeader() {
        return {
            "apikey": "954ba592f5554b5c89de844bd75e015e"
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

export default Rebrandly();