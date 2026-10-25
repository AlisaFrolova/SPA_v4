import { getValueFromLocalStorage } from "../../../tools.js"
import getDescription from "./getDescription.js"
import { shortenDescription } from "../../../tools.js"
import { createPreviewCard } from "../../../tools.js"

export default function spawnNewsCards(container){
    for (const el of getValueFromLocalStorage("newsArticles")) {
        container.append(createPreviewCard(el.hdurl, 
            el.title, shortenDescription(getDescription(el)), 
             el.post_id, 
              "/news/article"))
    }
}