import { observer } from "mobx-react-lite";
import React, {  useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import  ActivityDetailedChat  from "./ActivityDetailedChat";
import  ActivityDetailedHeader  from "./ActivityDetailedHeader";
import  ActivityDetailedInfo from "./ActivityDetailedInfo";
import  ActivityDetailedSidebar from "./ActivityDetailedSidebar";


export default observer(function ActivityDetails(){
  const activityStore = useStore();
  const {
    activity,    
    loadActivity,
    loadingInitial,
  } = activityStore;

  const {id} = useParams<{id:string}>();

  useEffect(() => {

    if(id) loadActivity(id);    

  }, [loadActivity, id]);

  if(loadingInitial || !activity) return <LoadingComponent content='Loading component' />

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo  activity={activity}/>
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar />
        </Grid.Column>
      </Grid>

    </div>
  );
});


