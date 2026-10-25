import { createEl } from "../../../tools.js"
import { getRandomNumber } from "../../../tools.js"

const asteroidImages = {
    img1: "https://images-assets.nasa.gov/image/PIA23876/PIA23876~orig.jpg",
    img2: "https://images-assets.nasa.gov/image/PIA15506/PIA15506~orig.jpg",
    img3: "https://images-assets.nasa.gov/image/PIA02471/PIA02471~orig.jpg"
}

export default function spawnCards(arr){
    for (const el of arr) {
        document.querySelector(".asteroidContainer").append(createAsteroidCard(el.name,
            el.close_approach_data[0].close_approach_date_full,
                Math.floor(el.estimated_diameter.meters.estimated_diameter_min),
                   Math.floor(el.close_approach_data[0].miss_distance.lunar),
                       el.is_potentially_hazardous_asteroid, asteroidImages[`img${getRandomNumber(1, 4)}`]))
    }
}

function createAsteroidCard(asteroidName, approachDate, diameter, lunarDistance, hazardous, imageSource){ //-I
    const card = createEl("div", "", "asteroidCard")

    const img = createEl("img", "", "asteroidImage")
    img.src = imageSource
    card.append(img)

    card.append(createEl("p", asteroidName, "accent"))

    card.append(createEl("p", `Date: ${approachDate}`, "textWhite"))

    card.append(createEl("p", `Diameter: ${diameter} m`, "textWhite"))

    card.append(createEl("p", `Lunar Distance: ${lunarDistance} LD`, "textWhite"))

    const asteroidStatus = document.createElement("p")
    if(hazardous){
        asteroidStatus.textContent = "Hazardous Asteroid"
        asteroidStatus.classList.add("hazardousAsteroid")
    } else{
        asteroidStatus.textContent = "Safe Asteroid"
        asteroidStatus.classList.add("safeAsteroid")
    }
    card.append(asteroidStatus)
    return card
}