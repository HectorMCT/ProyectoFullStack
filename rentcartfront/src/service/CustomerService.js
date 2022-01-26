import axios from "axios";

export class CustomerService{

    baseUrl = "http://localhost:8080/api/v1/customer/"

    async getCustomer(email){
        return await axios.get(this.baseUrl+"search/" + email).then(res => res.data);
    }

    async postCustomer(customer) {
        return await axios.post(this.baseUrl + "create", customer).then(res => res.data);
    }
}