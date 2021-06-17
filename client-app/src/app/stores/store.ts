import { createContext, useContext } from "react";
import ActivityStore  from "./activityStore";
import CommonStore from "./commonStore";

interface Store{
    activityStore : ActivityStore;
    commonStore : CommonStore;    
}

// export const store : Store = {
//     activityStore: new ActivityStore()
// }

export const storeee : Store = {
     activityStore : new ActivityStore(),
     commonStore : new CommonStore()     
}

export const StoreContext = createContext(storeee);

export function useStore(){
    return useContext(StoreContext);
}
