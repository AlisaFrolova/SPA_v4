import { createEl } from "../../../tools.js"

export default function getDescription(el){
    const tempBlock = createEl("div", "", "block")
    tempBlock.innerHTML = el.explanation
    return tempBlock.textContent
}