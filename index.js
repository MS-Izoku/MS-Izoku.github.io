//#region Pages
const mainPage = document.getElementById("main-page-content")
const welcomePage = document.getElementById("welcome-page")
const projectsPage = document.getElementById("projects-page")
const aboutMePage = document.getElementById("about-me-page")
const contactPage = document.getElementById("contact-page")

let currentPage = mainPage;
//#endregion

//#region startup

projectsPage.remove();
contactPage.remove();
aboutMePage.remove();

//#endregion

//#region Header Links
//#endregion

function loadPage(page){
    mainPage.replaceChild(currentPage , page);
    currentPage = page;
}

function goToPageButton(page , buttonText = "Page Link Button"){
    const button = document.createElement("button")
    button.innerText = buttonText
    button.addEventListener("click", ()=>{
        if(currentPage !== page)
            loadPage(page)
    })
    mainPage.appendChild(button)
}

//#region page change tester buttons
goToPageButton(mainPage , "MAIN");
goToPageButton(contactPage , "CONTACT");
goToPageButton(aboutMePage , "ABOUT ME");
goToPageButton(projectsPage , "PROJECTS");
//#endregion

// for when the dom is loaded, not sure what I need yet
document.addEventListener("DOMContentLoaded" , ()=>{})