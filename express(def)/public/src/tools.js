import tokenData from "./tokenModule.js"

export function createEl(tag, text, className){
    const el = document.createElement(tag)
    el.classList.add(className)
    el.textContent = text
    return el
}

let date = Date() //Wed Sep 23 2026 22:09:10 GMT+0300 (Moscow Standard Time)
date = new Date(date)

const currentDay = {
    year: date.toString().slice(11, 15), //2026
    month: (date.getMonth()+1).toString(), //9
    day: date.toString().slice(8, 11)//23
}

export const getCurrentDay = () => {
    if(parseInt(currentDay.month) >= 10){
        return `${currentDay.year}-${currentDay.month}-${currentDay.day}`
    }
    return `${currentDay.year}-0${currentDay.month}-${currentDay.day}`
}

export function getPreviousDay(){
    let day = parseInt(currentDay.day)
    let month = parseInt(currentDay.month)
    let year = parseInt(currentDay.year)

    for(let i = 0; i < 2; i++){
        day--
        if(day < 1){
            console.log(month, "before")
            month--
            console.log(month, "after")
            day = 30
            if(month < 1){
                year--
                month = 12
            }
        }
    }
    if(month >= 10){
        return `${year}-${month}-${day}`
    }

    return `${year}-0${month}-${day}`
}

export function getRandomNumber(min, max) {//may be equal to MIN, but always less than MAX
  return Math.floor(Math.random() * (max - min) + min)
}

export function getValueFromLocalStorage(key){
    const getArr = localStorage.getItem(key)
    return JSON.parse(getArr)
}

export function spawnLogoutButton(){
    const authLink = document.querySelector("#authLink") //I ->
    if(authLink) authLink.remove() //I ->
    const form = document.querySelector(".form")
    if(form) form.remove()

    const logoutButton = createEl("button", "Log out", "logoutButton")
    // document.querySelector(".header").append(logoutButton) //!
    logoutButton.addEventListener("click", () => {
        tokenData.clearTokens().then(res => {
            if(res){
                logoutButton.remove()
                window.location.replace("/")
            }
        })
    })
    return logoutButton
}

export const shortenDescription = (description) => {
    if(description !== undefined){
        return description.slice(0,description.indexOf(description.split(".")[3]))
    }else{
        return ""
    }
}

export function createPreviewCard(imgURL, title, description, id, href){
    const card = createEl("div", "", "previewCard")

    const textBlock = createEl("div", "", "previewText")
    textBlock.append(createEl("h2", title, "text"))
    
    textBlock.append(createEl("p", `${description} ... `, "text"))

    const articleLink = createEl("a", " Read more...", "link")
    articleLink.href = href // !
    articleLink.setAttribute("data-link", "")
    textBlock.append(articleLink)
    
    card.append(textBlock)
    
    const img = createEl("img", "", "previewImg")
    img.src = imgURL
    card.prepend(img)

    card.addEventListener("click", () => {
        localStorage.setItem("articleID", id)
    })

    return card
}