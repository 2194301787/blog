import axios from 'axios';
import {BaseUrl} from './baseURL';

const Ajax = axios.create({
    baseURL: BaseUrl,
    withCredentials: true
});

export default Ajax;