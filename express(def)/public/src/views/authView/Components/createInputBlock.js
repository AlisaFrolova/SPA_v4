import { createEl } from "../../../tools.js"

export default function createInputBlock(type){
    const container = createEl("div", "", "inputContainer")

    const input = createEl("input", "", type)
    input.type = "text"
    input.placeholder = type
    input.id = `${type}Id`
    container.append(input)

    const label = createEl("label", type, "textWhite")
    label.for = `${type}Id`
    container.append(label)

    return container
}