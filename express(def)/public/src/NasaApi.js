//tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA
 const APIKey = "tOrrEVAmkqSnlbf5QcUBPCrfWOuqPplOzbi2JveA"
export async function getAPOD(date){ //date in YYYY-MM-DD only; wotk with img NF
    try{
        const response = await fetch(`https://science.nasa.gov/wp-json/wp/v2/apod-basic/`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function getAsteroids(startDate, endDate){ //date format is the same; 2-3 days = 35-65 asteroids
     try{
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${APIKey}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch(error){
        console.log(error)
    }
}

export async function getVideos(numberOfVideos, theme, pageNumber){
    try{
        const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURI(theme)}&media_type=video&page_size=${numberOfVideos}&page=${pageNumber}`)
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()

        localStorage.setItem("pageNumber", 1)
        localStorage.setItem("maxPageNumber", Math.ceil(data.collection.metadata.total_hits/10))

        const videos = data.collection.items
        return videos.slice(0, numberOfVideos)
    } catch(error){
        console.log(error)
        return []
    }
}