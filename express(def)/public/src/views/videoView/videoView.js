import { createEl } from "../../tools.js"
import spawnVideosSection from "./Modules/spawnVideoSection.js"

export default function videoView(){
    const app = document.querySelector('#app')
    
    //section
    const section = createEl("section", "", "videosSection")
    app.append(section)
    
    section.append(createEl("h1", "Videos", "header"))

    const searchBox = createEl("div", "", "searchBox")
    section.append(searchBox)

    const searchLabel = createEl("label", "Search for videos", "searchLabel")
    searchLabel.for = "searchInput"
    searchBox.append(searchLabel)

    const searchInput = createEl("input", "", "searchInput")
    searchInput.type = "text"
    searchInput.id = "searchInput"
    searchBox.append(searchInput)
    section.append(searchBox)

    section.append(createEl("section", "", "previewCardsContainer"))
    section.append(createEl("div", "", "navContainer"))

    const submitButton = createEl("button", "Search", "confirmButton")
    searchBox.append(submitButton)
    submitButton.addEventListener("click", () => {
        localStorage.setItem("videoTheme", searchInput.value)
        spawnVideosSection()
        spawnNav()
    })
    return section
}

function spawnNav(){ //nf (?) ?
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