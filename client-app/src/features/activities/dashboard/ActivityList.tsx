import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activityStore';
import { useStore } from "../../../app/stores/store";
import { ActivityListItem } from "./ActivityListItem";

export default observer(function ActivityList(){
  const activityStore = useStore();
  const { activitiesByDate } = activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, actvities]) => (
        <Fragment>
          <Label key={group} size='large' color='blue'>
            {group}
          </Label>

          <Item.Group divided>
            {actvities.map((x) => (
              <ActivityListItem key={x.id} activity={x} />
            ))}
          </Item.Group>

        </Fragment>
      ))}
    </Fragment>

  );
});


