
const resultError = {
                type: 'error',
                message: 'Error connecting to the server',
            }
export var DataAccess = function () {

    async function fetchData(url) {

        try {
            //console.log(url)
            const dataResponse = await axios.get(url);
            let result = dataResponse.data;
            //console.log("DataAccess GET")
            //console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return resultError
        }
    }

    async function saveData(url, object) {
        try {
            const dataResponse = await axios.post(url, object);
            let result = dataResponse.data;
            console.log("DataAccess POST")
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
            return resultError
        }
    }
    
    return {
        fetchData,
        saveData
    };

}(window);