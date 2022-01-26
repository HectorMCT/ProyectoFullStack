import axios from "axios";

export class CarService{

    baseUrl = "http://localhost:8080/api/v1/cars"

    getAvailable(start, end){
        return axios.get(this.baseUrl+"?start="+start+"&end="+end).then( res => res.data);
    }

    getCategory(){
        return axios.get(this.baseUrl+"/category").then(res => res.data);
    }

    getColors(){
        return axios.get(this.baseUrl+"/colors").then(res => res.data);
    }

    getCarsY(){
        return axios.get(this.baseUrl+"/year").then(res => res.data);
    }

    getModels(){
        return axios.get(this.baseUrl+"/model").then(res => res.data);
    }

    getMakers(){
        return axios.get(this.baseUrl+"/maker").then(res => res.data);
    }

    getByFilters(category, color, year, model, makec, start, end){
        let order = 'DESC';
        return axios.get(this.baseUrl+"/filters"+"?categoriaf="+category+"&colorf="+color+"&yearf="+year+"&modelf="+model+"&makef="+makec+"&ordderf="+order+"&startDate="+start+"&endDate="+end).then(res => res.data);
    }
}