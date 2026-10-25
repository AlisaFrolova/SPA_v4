import { createEl } from "./tools.js";

export default function spawnFooter(){
    const footer = createEl("footer", "", "footer")
    footer.append(createEl("div", "", "logo"))
    footer.append(createEl("p", "ASA. 2026. All rights reserved", "footerText"))

    return footer
}