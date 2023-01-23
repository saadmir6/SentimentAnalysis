
export default async function FetchJson(callback) {

        let response = await fetch('/json')
        let jsonData =await response.json()
        console.log(jsonData)
        callback(jsonData)
        return jsonData
    }
      







