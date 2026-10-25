import tokenData from "../../tokenModule.js"
import { spawnLogoutButton } from "../../tools.js"
import spawnForm from "./Modules/formModule.js"

export default function signIn(){
    tokenData.refreshAccessToken().then(res =>{
        if(res){
            spawnLogoutButton()
        }else{
            document.querySelector("#app").prepend(spawnForm())
        }
    })
    return ""
}