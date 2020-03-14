import axios from 'axios';

class API {
    static get(path) {
        const promise = new Promise((resolve, reject) => {
            axios.get(`/${path}`)
            .then((response) => {            
                resolve(response.data);
            }, (error) => {
                reject(error);
            })
        })
        
        return promise
    }

    static post(path, data) {
        const promise = new Promise((resolve, reject) => {
            axios.post(`/${path}`, data)
            .then((response) => {            
                resolve(response);
            },(error) => {
                reject(error);
            });

        })
        
        return promise;
    }

    static put(path, data) {
        const promise = new Promise((resolve, reject) => {
            axios.put(`/${path}`, data)
            .then((response) => {            
                resolve(response);
            }, (error) => {
                reject(error);
            })
        })
        
        return promise;
    }

    static delete(path) {
        const promise = new Promise((resolve, reject) => {
            axios.delete(`/${path}`)
            .then((response) => {            
                resolve(response.data);
            }, (error) => {
                reject(error);
            })
        })
        
        return promise;
    }
}

export default API;