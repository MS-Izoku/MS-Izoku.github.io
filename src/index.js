import { init } from './threeManager.js'

const root = document.getElementById("root");
const welcomePage = document.getElementById("welcome");
const contactPage = document.getElementById("contact");
const projectsPage = document.getElementById("projects");
const resumePage = document.getElementById("resume");
const bioPage = document.getElementById("bio");

const homeTab = document.getElementById("home-tab");
const contactTab = document.getElementById("contact-tab");
const resumeTab = document.getElementById("resume-tab");
const bioTab = document.getElementById("bio-tab");
const projectsTab = document.getElementById("projects-tab");

let currentPage;

const swapPage = pageElement => {
  if (pageElement === currentPage) return;
  currentPage.style.display = "none";
  pageElement.style.display = "";

  currentPage = pageElement;
  return currentPage;
};

document.addEventListener("DOMContentLoaded", () => {
  currentPage = welcomePage;
  const startUp = (function() {
    const shutOffPages = (function() {
      bioPage.style.display = "none";
      resumePage.style.display = "none";
      projectsPage.style.display = "none";
      contactPage.style.display = "none";
    })();

    //#region button setup
    homeTab.addEventListener("click", () => {
      swapPage(welcomePage);
    });

    contactTab.addEventListener("click", () => {
      swapPage(contactPage);
    });

    resumeTab.addEventListener("click", () => {
      swapPage(resumePage);
    });

    bioTab.addEventListener("click", () => {
      swapPage(bioPage);
    });

    projectsTab.addEventListener("click", () => {
      swapPage(projectsPage);
    });
    //#endregion
  })();
});

init();

