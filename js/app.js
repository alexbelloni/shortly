window.addEventListener("load",()=>{
    document.querySelector("#hamburger").addEventListener("click",e=>{
        const mobileClasses = document.querySelector("#menu-mobile").getAttribute("class");
        document.querySelector("#menu-mobile").setAttribute("class", mobileClasses === "part close"? "part open" : "part close");
        const imageClasses = document.querySelector("#working").getAttribute("class");
        document.querySelector("#working").setAttribute("class", imageClasses === "part close"? "part" : "part close");
    })

})