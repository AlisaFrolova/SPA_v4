import { createEl } from "../../tools.js"
import tokenData from "../../tokenModule.js"
import createAchievementsSection from "./Modules/achievementsModule.js"

export default function homeView(){
    const app = document.querySelector('#app')

    //section
    const section = createEl("section", "", "homeSection")
    app.append(section)

    const headerContainer = createEl("div", "", "headerContainer")

    headerContainer.append(createHeader("A", "STRA"))
    headerContainer.append(createHeader("S", "PECTRUM"))
    headerContainer.append(createHeader("A", "NALYTICS"))

    const backgroundVideo = createEl("video", "", "backgroundVideo")
    backgroundVideo.setAttribute("autoplay", "")
    backgroundVideo.setAttribute("loop", "")
    backgroundVideo.setAttribute("disablepictureinpicture", "")
    backgroundVideo.muted = "muted"
        
    const videoSource = createEl("source", "", "source")
    videoSource.type = "video/mp4"
    videoSource.src = "https://images-assets.nasa.gov/video/A Future in Orbit/A Future in Orbit~orig.mp4"
    backgroundVideo.append(videoSource)

    headerContainer.append(backgroundVideo)

    section.append(headerContainer)

    tokenData.refreshAccessToken().then(res => {
        if(res){
            fetch('/api/username', {   
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "authorization": `Bearer ${tokenData.getAccessToken()}` }
            }).then(response => {
                if(response.status == 200){
                    response.json().then(data => {
                        const messageBlock = createEl("div", "", "messageBlock")
                        messageBlock.append(createEl("p", `Hello, ${data.username}`, "accent"))
                        document.body.append(messageBlock)
                        setTimeout(() => {messageBlock.remove()}, 3000)
                    })
                }else{
                    tokenData.refreshAccessToken()
                }
            })
        }
    })
        
    section.append(createAchievementsSection())

    return section
}

function createHeader(firstLetter, text){
    const header = createEl("h2", text, "header")
    header.prepend(createEl("span", firstLetter, "headerLetter"))
    return header
}
