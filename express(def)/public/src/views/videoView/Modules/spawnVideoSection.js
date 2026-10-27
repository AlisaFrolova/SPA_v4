import { createEl } from "../../../tools.js"
import { getVideos } from "../../../NasaApi.js"
import spawnVideoCards from "../Components/spawnVideoCards.js"
import spawnNav from "../Components/videoNavigation.js"

export default function spawnVideosSection(){
    const cardsContainer = document.querySelector(".previewCardsContainer")
    cardsContainer.innerHTML = ""

    const loadingText = createEl("p", "Loading videos...", "loadingText")
    cardsContainer.append(loadingText)

    let pageNumber = parseInt(localStorage.getItem("pageNumber"))

    let theme = localStorage.getItem("videoTheme")
    let prevTheme = localStorage.getItem("prevVideoTheme")
    localStorage.setItem("prevVideoTheme", theme)
    if(prevTheme !== theme) pageNumber = 1

    getVideos(10, theme, pageNumber).then(data => {
        loadingText.remove()
        if(data){
            spawnVideoCards(cardsContainer)
            localStorage.setItem("pageNumber", pageNumber)
            spawnNav()
        }else{
            const errorImg = createEl("img", "", "kernelPanicImg")
            errorImg.src = "../../../../images/kernelPanic.jpg"
            cardsContainer.append(errorImg)
        }
    })
}