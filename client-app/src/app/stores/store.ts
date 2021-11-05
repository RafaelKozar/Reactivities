import { createContext, useContext } from "react";
import ActivityStore  from "./activityStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";

interface Store{
    activityStore : ActivityStore;
    commonStore : CommonStore;    
    userStore : UserStore;
}

// export const store : Store = {
//     activityStore: new ActivityStore()
// }

export const storeee : Store = {
     activityStore : new ActivityStore(),
     commonStore : new CommonStore(),
     userStore: new UserStore()
}

export const StoreContext = createContext(storeee);

export function useStore(){
    return useContext(StoreContext);
}
