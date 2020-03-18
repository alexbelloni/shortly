const APISender = () => {
    function post(shortenerTool, link, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", shortenerTool.endpoint);
        xhr.setRequestHeader("Content-Type", "application/json");
        const header = shortenerTool.getRequestHeader();
        for (var key in header) {
            xhr.setRequestHeader(key, header[key]);
        }
        xhr.addEventListener("readystatechange", function () {
            const response = JSON.parse(this.responseText);
            if (response.errors && response.errors.length > 0) {
                callback({error: response.errors.map(e => `${e.field}: ${e.error_code}`).join(", ")});
            } else {
                if (this.readyState === 4) {
                    const result = shortenerTool.parseResponse(response);
                    callback(result);
                }
            }
        });
        xhr.send(JSON.stringify(shortenerTool.getRequestData(link)));
    }
    return {
        post
    }
}

export default APISender;