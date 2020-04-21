window.addEventListener("load", () => {
    import("./FirebaseAuth.js").then(module => {
        const FirebaseAuth = module.default;
        FirebaseAuth.getConfigFirebase(config => {
            // Initialize Firebase
            firebase.initializeApp(config);

            FirebaseAuth.getRedirectResult(function (result) {

                if (result.credential) {
                    document.querySelectorAll(".login-area").forEach(e => e.setAttribute("class", "close"));
                    document.querySelectorAll(".username").forEach(e => e.innerHTML = `<span>${result.user.displayName}</span>`)
                }
            });

            document.querySelectorAll(".btn-signup").forEach(e => e.addEventListener("click", () => {
                FirebaseAuth.signIn();
            }));
        });
    });

    document.querySelector("#hamburger").addEventListener("click", e => {
    const mobileClasses = document.querySelector("#menu-mobile").getAttribute("class");
    document.querySelector("#menu-mobile").setAttribute("class", mobileClasses === "part close" ? "part open" : "part close");
    const imageClasses = document.querySelector("#working").getAttribute("class");
    document.querySelector("#working").setAttribute("class", imageClasses === "part close" ? "part" : "part close");
});

document.querySelector("#btn-shorten-it").addEventListener("click", e => {
    function createElement(atype, aclass, atext) {
        const element = document.createElement(atype);
        element.className = aclass || "";
        element.innerText = atext || "";
        return element;
    }
    function getTrunkedLink(link) {
        return `${link.substr(0, 30)}...`;
    }
    function createLinkPanel(shortlyLink) {
        const nodeLink = createElement("div", "link");
        nodeLink.appendChild(createElement("span", null, getTrunkedLink(userLink)));
        nodeLink.appendChild(createElement("span", null, shortlyLink));
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
        createLinkPanel(success);
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

    const shortenerModule = (Math.random() < 0.5) ? "ToolBitly" : "ToolRebrandly";

    import("./APISender.js").then(module => {
        const APISender = module.default();
        import(`./${shortenerModule}.js`).then(module => {
            const shortener = module.default;
            APISender.post(shortener, userLink, e => {
                if (e.error) {
                    error(e.error);
                } else {
                    success(e.link);
                }
            });
        })
    })
}

