import axios from 'axios';
import { BASE_SERVER_API } from '../common/config';


class APIService{

    protected baseURL:string = BASE_SERVER_API;

    buildURL = (method:string):string => {
        return this.baseURL + '/' + method;
    }
    
} export default APIService