import { createEl } from "../../tools.js"
import spawnSearchBox from "./Components/spawnSearchBox.js"

export default function videoView(){
    const section = createEl("section", "", "videosSection")

    section.append(createEl("h1", "Videos", "header"))

    section.append(spawnSearchBox())

    section.append(createEl("section", "", "previewCardsContainer"))
    section.append(createEl("div", "", "navContainer"))

    return section
}