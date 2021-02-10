import { action, makeObservable, observable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: 'always' });

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    constructor() {
        makeObservable(this);
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach((x) => {
                    x.date = x.date.split('.')[0];
                    this.activityRegistry.set(x.id, x);
                });
            });

            this.loadingInitial = false;
        } catch (er) {
            runInAction(() => {
                this.loadingInitial = false;
            });

            console.log(er);

        }
    };

    @action loadActivity = async (id : string) => {
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

    @action clearActvity = () => {
        this.activity = null;
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.submitting = false;
            });

        } catch (err) {
            runInAction(() => {
                this.submitting = false;
            });
            console.log(err);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    }

    @action openEditForm = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedActivity = () => {
        this.activity = null;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    }

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
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

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
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
}

export default createContext(new ActivityStore())