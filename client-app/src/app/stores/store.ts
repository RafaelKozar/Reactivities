import { createContext, useContext } from "react";
import ActivityStore  from "./activityStore";

interface Store{
    activityStore : ActivityStore;
}

export const store : Store = {
    activityStore: new ActivityStore()
}

export const storeee : ActivityStore = new ActivityStore();

export const StoreContext = createContext(storeee);

export function useStore(){
    return useContext(StoreContext);
}
