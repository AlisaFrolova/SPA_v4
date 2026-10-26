import { createEl } from "../../../tools.js"
import { getVideos } from "../../../NasaApi.js"
import spawnVideoCards from "../Components/spawnVideoCards.js"

export default function spawnVideosSection(){
    const cardsContainer = document.querySelector(".previewCardsContainer")
    cardsContainer.innerHTML = ""

    const loadingText = createEl("p", "Loading videos...", "loadingText")
    cardsContainer.append(loadingText)

    const theme = localStorage.getItem("videoTheme")
    let pageNumber = localStorage.getItem("pageNumber")
    if(pageNumber === null) pageNumber = 1 //smth with pageNumber

    getVideos(10, theme, pageNumber).then(data => { //nf (?)
        const dataJSON = JSON.stringify(data)
        localStorage.setItem("videoArticles", dataJSON)
        localStorage.setItem("pageNumber", pageNumber)
        
        loadingText.remove()
        spawnVideoCards(cardsContainer)
    })
}