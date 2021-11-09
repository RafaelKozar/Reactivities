import { ca } from "date-fns/locale";
import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { storeee } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get IsLoggedIn(){
        return !!this.user;
    }

    login = async(creds : UserFormValues) => {
        try{
            debugger
            const user = await agent.Account.login(creds);
            storeee.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push('/activities')         
            storeee.modalStore.closeModal();   
        }catch(err){
            throw err;
        }
    }

    logout = () => {
        storeee.commonStore.setToken(null);
        window.localStorage.removeItem('jwt')
        this.user = null
        history.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.user = user)
        } catch(err){
            console.log(err)
        }
    }

    register = async(creds : UserFormValues) => {
        try{
            debugger
            const user = await agent.Account.register(creds);
            storeee.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push('/activities')         
            storeee.modalStore.closeModal();   
        }catch(err){
            throw err;
        }
    }
}