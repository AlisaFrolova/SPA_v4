import { createEl } from "../../../tools.js"
import { getVideos } from "../../../NasaApi.js"
import spawnVideoCards from "../Components/spawnVideoCards.js"

export default function spawnVideosSection(){
    const cardsContainer = createEl("section", "", "previewCardsContainer")

    const loadingText = createEl("p", "Loading videos...", "loadingText")
    cardsContainer.append(loadingText)

    getVideos(20, "science").then(data => { //nf
        const dataJSON = JSON.stringify(data)
        localStorage.setItem("videoArticles", dataJSON)
        
        loadingText.remove()
        spawnVideoCards(cardsContainer)
    })

    return cardsContainer
}