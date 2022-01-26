import axios from "axios";

export class RentService{

    baseUrl = "http://localhost:8080/api/v1/rent"


    getRentEmail(email){
        return axios.get(this.baseUrl +"?email="+ email).then(res => res.data);
    }

    async getRentId(id) {
        return await axios.get(this.baseUrl + "/rented?id=" + id).then(res => res.data);
    }

    postRent(rent){
        return axios.post(this.baseUrl + "/new", rent).then(res => res.data);
    }

    returnCar(id){
        return axios.put(this.baseUrl +"/return/" + id).then(res => res.data);
    }
}