window.addEventListener("load",()=>{
    document.querySelector("#hamburger").addEventListener("click",e=>{
        const mobileClasses = document.querySelector("#menu-mobile").getAttribute("class");
        document.querySelector("#menu-mobile").setAttribute("class", mobileClasses === "part close"? "part open" : "part close");
        const imageClasses = document.querySelector("#working").getAttribute("class");
        document.querySelector("#working").setAttribute("class", imageClasses === "part close"? "part" : "part close");
    });

    document.querySelector("#btn-shorten-it").addEventListener("click",e=>{
        function createElement(atype, aclass, atext, anid){
            const element = document.createElement(atype);
            element.className = aclass || "";
            element.innerText = atext || "";
            element.id = anid || "";
            return element;
        }
        const userLink = document.querySelector("#user-link").value;
        const id = Math.random().toString().substr(0,6);
        const shortlyLink = `https://short.ly/${id}`;

        const nodeLink = createElement("div", "link");
        nodeLink.appendChild(createElement("span", null, userLink));
        nodeLink.appendChild(createElement("span", null, shortlyLink));
        const nodeButton = createElement("button", null, "Copy", id);
        nodeButton.addEventListener("click", ()=>{ 
            nodeButton.innerText = "Copied!"
            nodeButton.className = "copied";
            alert(shortlyLink);
         });
        nodeLink.appendChild(nodeButton);
        document.querySelector("#links").appendChild(nodeLink);        
    });
})

function cu(){
    alert('hiii')
}