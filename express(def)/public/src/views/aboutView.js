//--

import { createEl } from "../tools.js"

const sectionImages = {
    img1: "https://images-assets.nasa.gov/image/iss071e439624/iss071e439624~orig.jpg",
    img2: "https://images-assets.nasa.gov/image/sts098-333-007/sts098-333-007~orig.jpg",
    img3: "https://images-assets.nasa.gov/image/KSC-pa-sts-89/KSC-pa-sts-89~orig.jpg"
}
const headerText = {
    text1: "20 years of scientific activity",
    text2: "2500+ scientific studies in astrophysics",
    text3: "500+ unmanned space flights"
}
const mainText = {
    text1: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum consectetur iusto tenetur enim magnam pariatur praesentium inventore sapiente velit quam?", 
    text2: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum consectetur iusto tenetur enim magnam pariatur praesentium inventore sapiente velit quam?",
    text3: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum consectetur iusto tenetur enim magnam pariatur praesentium inventore sapiente velit quam?"
}

export default function aboutView(){
    const app = document.querySelector('#app')

    //section
    const section = document.createElement("section")
    app.append(section)

    section.append(createEl("h1", "About us", "header"))
    
    for(let i = 1; i < 4; i++){
        section.append(createInfoSection(headerText[`text${i}`], mainText[`text${i}`], sectionImages[`img${i}`]))
    }

    return section
}

function createInfoSection(headerText, mainText, imgURL){
    const infoSection = createEl("section", "", "infoSection")

    infoSection.append(createEl("h2", headerText, "infoSectionHeader"))
    infoSection.append(createEl("p", mainText, "infoSectionText"))
    infoSection.style.backgroundImage = `url(${imgURL})`

    return infoSection
}