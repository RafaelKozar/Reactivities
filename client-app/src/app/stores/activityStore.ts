import { configure, runInAction, makeAutoObservable } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import {format} from 'date-fns'

export default class ActivityStore {

    activityRegistry = new Map();    
    activity: IActivity | null = null;
    loadingInitial = false;    
    submitting = false;
    target = '';

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {        
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities : IActivity[]){
        const sortedActivities = activities.slice().sort((a, b) => a.date!.getTime() - b.date!.getTime());
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            // const date = activity.date!.toISOString().split('T')[0];
            const date = format(activity.date!, 'dd MMM yyyy');
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key : string] : IActivity[]}));
    }

   

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach((x : IActivity) => {
                    this.setActivity(x);                    
                });
                this.loadingInitial = false;
            });
            console.log(this.groupActivitiesByDate(activities));                
        } catch (er) {
            runInAction(() => {
                this.loadingInitial = false;
            });

            console.log(er);

        }
    };

    loadActivity = async (id : string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.activity = activity;            
        }else {
            this.loadingInitial = true;
            try
            {
                activity = await agent.Activities.details(id);
                runInAction(() => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })
            }
            catch(err){
                runInAction(() => {
                    this.loadingInitial = false; 
                })
                console.log(err);
            }
        }
    }

    clearActvity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);                
                this.submitting = false;
            });

        } catch (err) {
            runInAction(() => {
                this.submitting = false;
            });
            console.log(err);
        }
    }

    editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;                
                this.submitting = false;
            });

        }
        catch (err) {
            runInAction(() => {
                this.submitting = false;
            });

            console.log(err);
        }
    }

    deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });

        }
        catch (err) {
            runInAction(() => {
                this.submitting = false;
                this.target = '';
            });

            console.log(err);
        }
    }

    setActivity = (activity: IActivity) => {
        // activity.date = activity.date.split('T')[0];
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }
}

// export default createContext(new ActivityStore())