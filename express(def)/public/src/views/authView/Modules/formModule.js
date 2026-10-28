import { createEl } from "../../../tools.js"
import { register } from "../Components/registerAndLogin.js"
import { login } from "../Components/registerAndLogin.js"
import createInputBlock from "../Components/createInputBlock.js"

export default function spawnForm(){
    fetch("/api/spawn",{ method: 'GET', headers: { 'Content-Type': 'application/json' }})
    
    const formContainer = createEl("section", "", "formContainer")

    //form
    const form = createEl("div", "", "form")

    const header = createEl("h2", "Register", "authHeader")
    form.append(header)

    form.append(createInputBlock("Login"))
    form.append(createInputBlock("Password"))

    //login button
    let isLogin = false
    const loginButton = createEl("button", "Switch to Login", "loginButton")
    loginButton.addEventListener("click", () => {
        if(!isLogin){
            isLogin = true
            loginButton.textContent = "Switch to Register"
            header.textContent = "Login"
        }else{
            isLogin = false
            loginButton.textContent = "Switch to Login"
            header.textContent = "Register"
        }
    })
    form.append(loginButton)

    //submit button
    const submitButton = createEl("button", "Submit", "confirmButton")
    form.append(submitButton)

    const messageContainer = createEl("div", "", "messageContainer")
    messageContainer.append(createEl("p", "Invalid enter", "messageText"))

    submitButton.addEventListener("click", () => { 
        const username = document.getElementById("LoginId").value
        const password = document.getElementById("PasswordId").value

        const userData = {
            username: username,
            password: password
        }

        if(isLogin){
            if(!login(userData)){
                form.append(messageContainer)
                setTimeout(() => {messageContainer.remove()}, 5000)
            }
        }else{
            if(!register(userData)){ 
                form.append(messageContainer)
                setTimeout(() => {messageContainer.remove()}, 5000)
            }
        } 
        event.preventDefault()
    })

    formContainer.prepend(createEl("div", "", "logo"))
    formContainer.append(createEl("div", "", "companyName"))

    formContainer.append(form)

    return formContainer
}