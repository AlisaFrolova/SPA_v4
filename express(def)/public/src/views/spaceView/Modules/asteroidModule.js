import spawnCards from "../Components/spawnCards.js"
import createSortMenu from "./asteroidSortModule.js"
import { getAsteroids } from "../../../NasaApi.js"
import { createEl } from "../../../tools.js"
import { getCurrentDay } from "../../../tools.js"
import { getPreviousDay } from "../../../tools.js"

export default function createAsteroidSection(){
    const asteroidSection = createEl("section", "", "asteroidSection")
    asteroidSection.append(createEl("h2", "Asteroids", "header")) 

    const asteroidContainer = createEl("div", "", "asteroidContainer")
    asteroidContainer.style.backgroundImage = `url(https://images-assets.nasa.gov/image/iss074e0472536/iss074e0472536~orig.jpg)`

    const loadingText = createEl("p", "Loading asteroids...", "loadingText")
    asteroidSection.append(loadingText)

    asteroidSection.append(asteroidContainer)

    let tempArr = []
    getAsteroids(getPreviousDay(), getCurrentDay()).then(asteroids => {
        for (const key in asteroids.near_earth_objects) {
            tempArr = tempArr.concat(asteroids.near_earth_objects[key])
        }
        return tempArr
    }).then(res => {
        const arrJSON = JSON.stringify(res)
        localStorage.setItem("asteroidsArr", arrJSON)

        loadingText.remove()
        asteroidSection.firstElementChild.after(createSortMenu())
        spawnCards(res)
    })

    return asteroidSection
}