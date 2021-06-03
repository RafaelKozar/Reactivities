import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import {LoadingComponent} from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

 export default observer(function ActivityDashBoard(){     
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
       <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
});

