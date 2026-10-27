import spawnVideosSection from "../Modules/spawnVideoSection.js"
import { createEl } from "../../../tools.js"

export default function spawnNav(){ 
    const navContainer = document.querySelector(".navContainer")
    navContainer.innerHTML = ""

    const currentPage = parseInt(localStorage.getItem("pageNumber"))

    if(currentPage > 1){
        if(currentPage > 2) {
            navContainer.append(createEl("button", 1, "navButton"))
            navContainer.append(createEl("p", "...", "text"))
        }
        navContainer.append(createEl("button", currentPage-1, "navButton"))
    }
    navContainer.append(createEl("p", currentPage, "currentPage"))

    const maxPage = parseInt(localStorage.getItem("maxPageNumber"))
    if(currentPage+1 < maxPage){
        navContainer.append(createEl("button", currentPage+1, "navButton"))
    }

    if(currentPage < maxPage) {
        navContainer.append(createEl("p", "...", "text"))
        navContainer.append(createEl("button", maxPage, "navButton"))
    }

    const navButtons = document.querySelectorAll(".navButton")
    for (const el of navButtons) {
        el.addEventListener("click", () => {
            localStorage.setItem("pageNumber", parseInt(el.textContent))
            spawnNav()
            spawnVideosSection()
        })
    }
}