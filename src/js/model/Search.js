import Axios from 'axios';
import { config } from '../config';

export class Search {
    
    constructor(query){
        this.query = query;
    }

    async getResult(){
        try {
            const res = await Axios.get(`${config.apiHOST.search}${this.query}`)
            this.search = res.data;

            //console.log(res);
        } catch (error) {
            console.log("Search Processing error",error)
        } 
    }
}