import { createEl } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"

export default function spawnVideoArticle(){
    const article = getArticleById(localStorage.getItem("articleID"))
    return createVideoArticle(article.href, article.data[0].title, article.data[0].description)
}

const videoLinks = {}
function createVideoArticle(videoURL, title, description){ 
    const videoArticle = createEl("section", "", "videoArticle")
    getVideos(videoURL).then(res =>{
        videoArticle.append(createEl("h2", title, "header"))

        if(res){
            const videoContainer = createEl("div", "", "videoContainer")
            const video = createEl("video", "", "articleVideo")
            video.setAttribute("controls", "true")
        //video.play()  video.pause() video.currentTime  video.volume (from 0.0 to 1.0)
        //video events: play pause timeupdate volumechange ended

            const videoSource = createEl("source", "", "videoSource")
            videoSource.type = "video/mp4"
            videoSource.src = videoLinks.medium
            video.append(videoSource)

            videoContainer.append(video)
            videoArticle.append(videoContainer)
        }else{
            const errorImg = createEl("img", "", "kernelPanicImg")
            errorImg.src = "../../../../images/kernelPanic.jpg"
            videoArticle.append(errorImg)
        }

        videoArticle.append(createEl("p", description, "videoDescription"))

        const linkContainer = createEl("div", "", "linkContainer")
        const returnLink = createEl("a", "Return to Videos  -->", "link")
        returnLink.href = "/video"
        returnLink.setAttribute("data-link", "")
        linkContainer.append(returnLink)

        videoArticle.append(linkContainer)
    })
    return videoArticle
}

function getVideos(url){//! cors policy blocks sometimes 
    return fetch(encodeURI(url)).then(res => {
        if(!res.ok){
            throw new Error(`Error: ${res.status}`)
        }
        return res.json()
    }).then(data => {
        videoLinks.large = data.find(link => link.includes("orig.mp4"))
        videoLinks.medium = data.find(link => link.includes("medium.mp4"))
        videoLinks.small = data.find(link => link.includes("small.mp4"))
        return true
    }).catch(error => {
        console.error("Error: ", error)
        return false
    })
}

function getArticleById(id){
    for (const el of getValueFromLocalStorage("videoArticles")) {
        if(el.data[0].nasa_id === id){
            return el
        }
    }
}