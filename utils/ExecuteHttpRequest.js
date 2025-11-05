import axios from "axios";

export class ExecuteHttpRequest{

    static #baseUrl = "http://localhost:3000/";

    static async callout(url = "", method = "GET", body = "", param = {}, headers = {}) {
        try {

            const requestUrl = this.#baseUrl + url;
            
            const functionType = this.requestType[method.toUpperCase()];


            if(["GET", "DELETE"].includes(method.toUpperCase())){
                return await functionType(requestUrl, {
                    params : param,
                    headers : headers,
                    timeout: 10000,
                    responseType: 'json'
                });
            }

            else{
                return await functionType(requestUrl, body, {
                    param : param,
                    headers : headers,
                    timeout : 10000,
                    responseType : 'json'
                });
            }



        } 
        catch (error) {
            console.log("Error has happened" +error)
        }

    }

    static requestType = {    
        "GET" : axios.get,
        "POST" : axios.post,
        "PATCH" : axios.patch,
        "PUT" : axios.put,
        "DELETE" : axios.delete
    
    }


}
