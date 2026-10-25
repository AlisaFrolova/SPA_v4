import { createEl } from "../../../tools.js"

export default function createAchievementsSection(){
    //achievements block
        const achievSection = createEl("section", "", "achievements")
    
        const infoContainer = createEl("div", "", "infoContainer")
        achievSection.append(infoContainer)
    
        //block 1
        const firstBlock = createEl("div", "", "innerInfoBlocks")
        infoContainer.append(firstBlock)
        firstBlock.append(createEl("span", "20", "accent"))
        firstBlock.append(createEl("span", " years of scientific activity", "textBlack"))
    
        //block 2
        const secondBlock = createEl("div", "", "specialCard")
        infoContainer.append(secondBlock)
        secondBlock.append(createEl("span", "2500+", "accent"))
        secondBlock.append(createEl("span", " scientific studies in astrophysics", "textWhite"))
    
        //block 3
        const thirdBlock = createEl("div", "", "innerInfoBlocks")
        infoContainer.append(thirdBlock)
        thirdBlock.append(createEl("span", "500+", "accent"))
        thirdBlock.append(createEl("span", "unmanned space flights", "textBlack"))
    
        const link = createEl("a", "More About Us", "link")
        link.href = "/about"
        link.setAttribute("data-link", "")
        achievSection.append(link)

        return achievSection
}