import { createEl } from "../../tools.js"
import spawnVideosSection from "./Modules/spawnVideoSection.js"

export default function videoView(){
    const app = document.querySelector('#app')
    
    //section
    const section = createEl("section", "", "videosSection")
    app.append(section)
    
    section.append(createEl("h1", "Videos", "header"))
    
    section.append(spawnVideosSection())
    
    return section
}