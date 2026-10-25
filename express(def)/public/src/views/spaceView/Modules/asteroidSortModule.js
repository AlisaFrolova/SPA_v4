import spawnCards from "../Components/spawnCards.js"
import { createEl } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"

let tempArr = []

export default function createSortMenu(){
    tempArr = getValueFromLocalStorage("asteroidsArr")
    
    const asteroidSortMenu = createEl("div", "", "asteroidSortMenu")

    asteroidSortMenu.append(createEl("h2", "Filter & Sort Asteroids", "textWhite"))

    const asteroidSortContainer = createEl("div", "", "asteroidSortContainer")
    asteroidSortContainer.append(createSortBlock("range", "Diameter"))
    asteroidSortContainer.append(createSortBlock("range", "LD"))
    asteroidSortContainer.append(createSortBlock("checkbox", "Hazardous"))
    
    asteroidSortContainer.append(createSortContainer("Size"))
    asteroidSortContainer.append(createSortContainer("Distance"))

    asteroidSortMenu.append(asteroidSortContainer)
    
    const confirmButton = createEl("button", "Apply", "confirmButton")
    const hazardousInput = asteroidSortContainer.children[2].firstElementChild
    confirmButton.addEventListener("click", () => {
        if(!hazardousInput.checked){
            tempArr = tempArr.filter(obj => { return !obj.is_potentially_hazardous_asteroid })
        }
        tempArr = filterByRange(tempArr)
        
        document.querySelector(".asteroidContainer").innerHTML = ""
        spawnCards(tempArr)

        tempArr = getValueFromLocalStorage("asteroidsArr")
    })
    asteroidSortMenu.append(confirmButton)

    return asteroidSortMenu
}  

const filterByRange = (arr) => arr.filter(obj => { return obj.estimated_diameter.meters.estimated_diameter_min >= parseInt(document.querySelector("#Diameter").value) &&
        obj.close_approach_data[0].miss_distance.lunar >= parseInt(document.querySelector("#LD").value)}) //2

function findMinAndMax(type){ 
    const newArr = []
    for (const el of tempArr) {
        let temp
        if(type === "Diameter"){
            temp = Math.floor(el.estimated_diameter.meters.estimated_diameter_min)
        }
        if(type === "LD"){
            temp = Math.floor(el.close_approach_data[0].miss_distance.lunar)
        }
        newArr.push(temp)
    }
    const max = Math.max(...newArr);
    const min = Math.min(...newArr);
    
    return [min, max]
}

function createSortBlock(inputType, inputName){
    const sortBlock = createEl("div", "", "sortBlock")

    const tempInput = createEl("input", "", "asteroidInput")
    tempInput.type = inputType
    tempInput.id = inputName
    tempInput.name = inputName
    sortBlock.append(tempInput)

    const tempLabel = createEl("label", inputName, "asteroidLabel")
    tempLabel.for = inputName
    sortBlock.append(tempLabel)
    
    if(inputType === "range"){
        const minAndMax = findMinAndMax(inputName)
        tempInput.value = minAndMax[0]
        tempInput.min = minAndMax[0]
        tempInput.max = minAndMax[1]

        const inputValue = createEl("p", tempInput.value, "accent")
        tempInput.addEventListener("input", () => {
            inputValue.textContent = tempInput.value
        })
        sortBlock.prepend(inputValue)
    }

    return sortBlock
}

function createSortContainer(type){ 
    const sortContainer = createEl("div", "", "sortContainer")

    const sortByIncrease = createSortBlock("radio", `Sort By Increasing ${type}`)
    sortByIncrease.classList.add(type)
    sortByIncrease.firstElementChild.name = "sortOption"
    sortByIncrease.addEventListener("click", () => {
        tempArr = sortByIncreasing(tempArr, type)
    })
    sortContainer.append(sortByIncrease)

    const sortByDecrease = createSortBlock("radio", `Sort By Decreasing ${type}`)
    sortByDecrease.classList.add(type)
    sortByDecrease.firstElementChild.name = "sortOption"
    sortByDecrease.addEventListener("click", () => {
        tempArr = sortByIncreasing(tempArr, type).reverse()
    })
    sortContainer.append(sortByDecrease)

    return sortContainer
}

const sortByIncreasing = (tempArr, type) => {
    if(type === "Distance"){
        return tempArr.sort((a, b) => a.close_approach_data[0].miss_distance.lunar - b.close_approach_data[0].miss_distance.lunar)
    }else{
        return tempArr.sort((a, b) => a.estimated_diameter.meters.estimated_diameter_min - b.estimated_diameter.meters.estimated_diameter_min)
    }
}