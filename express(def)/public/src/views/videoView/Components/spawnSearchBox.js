import { createEl } from "../../../tools.js"
import spawnVideosSection from "../Modules/spawnVideoSection.js"

export default function spawnSearchBox(){
    localStorage.setItem("pageNumber", 1)

    const searchBox = createEl("div", "", "searchBox")

    const searchLabel = createEl("label", "Search for videos", "searchLabel")
    searchLabel.for = "searchInput"
    searchBox.append(searchLabel)

    const searchInput = createEl("input", "", "searchInput")
    searchInput.type = "text"
    searchInput.id = "searchInput"
    searchBox.append(searchInput)

    const submitButton = createEl("button", "Search", "confirmButton")
    searchBox.append(submitButton)
    submitButton.addEventListener("click", () => {
        localStorage.setItem("videoTheme", searchInput.value)
        spawnVideosSection()
    })
    
    return searchBox
}