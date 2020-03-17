window.addEventListener("load", () => {
    document.querySelector("#hamburger").addEventListener("click", e => {
        const mobileClasses = document.querySelector("#menu-mobile").getAttribute("class");
        document.querySelector("#menu-mobile").setAttribute("class", mobileClasses === "part close" ? "part open" : "part close");
        const imageClasses = document.querySelector("#working").getAttribute("class");
        document.querySelector("#working").setAttribute("class", imageClasses === "part close" ? "part" : "part close");
    });

    document.querySelector("#btn-shorten-it").addEventListener("click", e => {
        function createElement(atype, aclass, atext, anid) {
            const element = document.createElement(atype);
            element.className = aclass || "";
            element.innerText = atext || "";
            element.id = anid || "";
            return element;
        }
        function getTrunkedLink(link) {
            return `${link.substr(0, 30)}...`;
        }
        function createElements(id, shortlyLink) {
            const nodeLink = createElement("div", "link");
            nodeLink.appendChild(createElement("span", null, getTrunkedLink(userLink)));
            nodeLink.appendChild(createElement("span", null, shortlyLink, id));
            const nodeButton = createElement("button", null, "Copy");
            nodeButton.addEventListener("click", () => {
                ClipboardAPIClipboardWrite(shortlyLink);
                nodeButton.innerText = "Copied!"
                nodeButton.className = "copied";
            });
            nodeLink.appendChild(nodeButton);
            document.querySelector("#links").appendChild(nodeLink);
        }

        const userLink = document.querySelector("#user-link").value;
        shortify(userLink, success => {
            const id = `sh${Math.random().toString().substr(2, 4)}`;
            createElements(id, success);
        }, error => alert(error));
    });
})

function ClipboardAPIClipboardWrite(value) {
    if (document.activeElement) {
        document.activeElement.blur();
    }
    window.focus();
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(value);
        }
    });
}

function shortify(userLink, success, error) {
    if (!userLink) return

    const data = {
        "long_url": userLink
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api-ssl.bitly.com/v4/shorten");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer 0c0f6a3e164e8f1d3da13b09ab9587b9e937ec14`);
    xhr.addEventListener("readystatechange", function () {
        const responseJson = JSON.parse(this.responseText);
        if (responseJson.errors && responseJson.errors.length > 0) {
            error(responseJson.errors.map(e => `${e.field}: ${e.error_code}`).join(", "));
        } else {
            if (this.readyState === 4) {
                success(responseJson.link);

            }
        }
    });
    xhr.send(JSON.stringify(data));
}