import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from 'process';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IActivity } from '../models/activity';
import { User, UserFormValues } from '../models/user';
import { storeee } from '../stores/store';

axios.defaults.baseURL = "http://localhost:5001/api";



const sleep = (ms : number) => (response : AxiosResponse) => new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));
const sleep2 = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async response => {
    await sleep(3000);
    return response;
}, (err : AxiosError) => {
    const {data, status, config} = err.response!;
    
    switch(status){
        case 400:
            if(typeof data === 'string')
            {
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id'))
            {
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } 
    
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            storeee.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(err);
});

const ms = 1000;

const responseBody = (response : AxiosResponse) => response.data;
const responseBody2 = <T extends {}>(response : AxiosResponse<T>) => response.data;

const requests = {
    get: (url : string) => axios.get(url).then(sleep(ms)).then(responseBody),    
    post: (url : string, body : {}) => axios.post(url, body).then(sleep(ms)).then(responseBody),
    
    put: (url : string, body : {}) => axios.put(url, body).then(sleep(ms)).then(responseBody),
    delete: (url : string) => axios.delete(url).then(sleep(ms)).then(responseBody),
} 

const requests2 = {
    get2: <T extends {}>(url : string) => axios.get<T>(url).then(sleep(ms)).then(responseBody2),
    post2: <T extends {}>(url : string, body : {}) => axios.post<T>(url, body).then(sleep(ms)).then(responseBody2),
}

const Activities = {
    list: () : Promise<IActivity[]> => requests.get(`/activities`),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (activity: IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id : string) => requests.delete(`/activities/${id}`),
}

const Account = {
    current: () => requests2.get2<User>('/account'),
    login : (user : UserFormValues) => requests2.post2<User>('/account/login', user),
    register: (user : UserFormValues)  => requests2.post2<User>('/account/register', user)  
}

export default {
    Activities,
    Account
}