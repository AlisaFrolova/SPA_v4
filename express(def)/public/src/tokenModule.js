let currentAccessToken = null
let tokenData 

export default tokenData = {
    setAccessToken(accessToken){
        currentAccessToken = accessToken
    },
    getAccessToken(){
        return currentAccessToken
    },
    refreshAccessToken(){
        return fetch("/api/refresh", {
            method: "POST",
            credentials: "include"
        }).then(res => res.json()).then(data => {
            if(data.accessToken === undefined){
                return false
            }else{
                currentAccessToken = data.accessToken
                return true
            }
        })
    },
    async clearTokens(){
        try{
            const res = await fetch("/api/clear", {
                method: "POST",
                credentials: "include"
            })

            if(res.ok){
                currentAccessToken = null
                return true
            }
        }
        catch(err){
            return false
        }

    }
}