import { createEl } from "../../tools.js"
import spawnNewsSection from "./Modules/spawnNewsSection.js"

export default function newsView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "newsSection")
    app.append(section)

    section.append(createEl("h1", "News", "header"))

    section.append(spawnNewsSection())

    return section
}