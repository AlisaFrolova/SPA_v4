import { createEl } from "../../../tools.js"
import { getValueFromLocalStorage } from "../../../tools.js"
import spawnNewsCards from "../Components/spawnNewsCards.js"

export default function spawnSortMenu(cardsContainer){
    const sortMenu = createEl("section", "", "newsSortMenu")

    sortMenu.append(createEl("h2", "Sort by Date", "text"))

    //sortMenu.append(createInputBlock("date", "date", "Date: "))//for what the actual hell i needed date input. sort works as newest - oldest 

    const sortContainer = createEl("div", "", "newsSortContainer")

    let isSortedByNewest = true

    const sortByNewest = createInputBlock("radio", "sortByDate", "Newest")
    sortByNewest.addEventListener("click", () => {
        if(!isSortedByNewest){
            changeNewsArticles()
            isSortedByNewest = true
        }
    })
    sortContainer.append(sortByNewest)

    const sortByOldest = createInputBlock("radio", "sortByDate", "Oldest")
    sortByOldest.addEventListener("click", () => {
        if(isSortedByNewest){
            changeNewsArticles()
            isSortedByNewest = false
        }
    })
    sortContainer.append(sortByOldest)

    sortMenu.append(sortContainer)

    const confirmButton = createEl("button", "Apply", "confirmButton")
    confirmButton.addEventListener("click", ()=>{
        cardsContainer.innerHTML = ""
        spawnNewsCards(cardsContainer)
    })

    sortMenu.append(confirmButton)

    return sortMenu
}
function changeNewsArticles(){
    let arrData = getValueFromLocalStorage("newsArticles")

    arrData = arrData.reverse()

    const arrJSON = JSON.stringify(arrData)
    localStorage.setItem("newsArticles", arrJSON)
}
function createInputBlock(type, name, labelText){
    const sortBlock = createEl("div", "", "sortBlock")

    const sortLabel = createEl("label", labelText, "sortLabel")
    sortLabel.for = name
    sortBlock.append(sortLabel)

    const sortOption = createEl("input", "", "sortInput")
    sortOption.type = type
    sortOption.id = name
    sortOption.name = name
    sortBlock.append(sortOption)

    return sortBlock
}
