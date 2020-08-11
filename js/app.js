var configObj = {};

window.addEventListener("load", () => {
    import("./FirebaseAuth.js").then(module => {
        const FirebaseAuth = module.default;
        FirebaseAuth.getConfigFirebase(config => {
            configObj = config;
            
            // Initialize Firebase
            firebase.initializeApp(config.firebase);

            //setLoginStatus(false, true, {name: "John Doe"}); return

            setLoginStatus(true);

            FirebaseAuth.getRedirectResult(function (result) {
                setLoginStatus(false);
                if (result.credential) {
                    setLoginStatus(false, true, {name: result.user.displayName});
                }
            });

            document.querySelectorAll(".btn-signup").forEach(e => e.addEventListener("click", () => {
                FirebaseAuth.signIn();
            }));
        });
    });

    document.querySelector("#hamburger").addEventListener("click", e => {
        const mobileClasses = document.querySelector("#menu-mobile").getAttribute("class");
        document.querySelector("#menu-mobile").setAttribute("class", mobileClasses === "part element-close" ? "part menu-mobile-open" : "part element-close");
        const imageClasses = document.querySelector("#img-working").getAttribute("class");
        document.querySelector("#img-working").setAttribute("class", imageClasses === "part element-close" ? "part" : "part element-close");
    });

    function createLinkPanel(userLink, shortlyLink) {
        function createElement(atype, aclass, atext) {
            const element = document.createElement(atype);
            element.className = aclass || "";
            element.innerText = atext || "";
            return element;
        }
        function getTrunkedLink(link) {
            return `${link.substr(0, 30)}...`;
        }

        const nodeLink = createElement("div", "link");
        nodeLink.appendChild(createElement("span", null, getTrunkedLink(userLink)));
        nodeLink.appendChild(createElement("span", null, shortlyLink));
        const nodeButton = createElement("div", "button btn-small", "Copy");
        nodeButton.addEventListener("click", () => {
            ClipboardAPIClipboardWrite(shortlyLink);
            nodeButton.innerText = "Copied!"
            nodeButton.className = "button btn-small copied";
            setTimeout(()=>{
                nodeButton.className = "button btn-small";
                nodeButton.innerText = "Copy"
            }, 2000);
        });
        nodeLink.appendChild(nodeButton);
        document.querySelector("#links").appendChild(nodeLink);
    }

    document.querySelector("#btn-shorten-it").addEventListener("click", e => {
        const userLink = document.querySelector("#user-link").value;
        shortify(userLink, success => {
            createLinkPanel(userLink, success);
        }, error =>{            
            alert(error);
            document.querySelector("#user-link").focus();
            document.querySelector("#btn-shorten-it").blur();
        }) 
    });
})

function setLoginStatus(isWaiting, isLogged, user) {
    if (isLogged) {
        document.querySelectorAll(".login-area").forEach(e => e.setAttribute("class", "login-area element-close"));
        document.querySelectorAll(".loading").forEach(e => e.setAttribute("class", "loading element-close"));
        document.querySelectorAll(".user").forEach(e => e.setAttribute("class", "user"));
        document.querySelectorAll(".username").forEach(e => e.innerText = user.name);
    } else {
        document.querySelectorAll(".user").forEach(e => e.setAttribute("class", "user element-close"));
        if (!isWaiting) {
            document.querySelectorAll(".login-area").forEach(e => e.setAttribute("class", "login-area"));
            document.querySelectorAll(".loading").forEach(e => e.setAttribute("class", "loading element-close"));
        } else {
            document.querySelectorAll(".login-area").forEach(e => e.setAttribute("class", "login-area element-close"));
            document.querySelectorAll(".loading").forEach(e => e.setAttribute("class", "loading"));
        }
    }
}

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
    if (!userLink) return error("Link is required");

    const shortenerModule = "ToolBitly" //(Math.random() < 0.5) ? "ToolBitly" : "ToolRebrandly";

    import("./APISender.js").then(module => {
        const APISender = module.default();
        import(`./${shortenerModule}.js`).then(module => {
            const shortener = module.default;            
            APISender.post(configObj.shorteners, shortener, userLink.indexOf('http')>-1 ? userLink : `https://${userLink}`, e => {
                if (e.error) {
                    error(e.error);
                } else {
                    success(e.link);
                }
            });
        })
    })
}

