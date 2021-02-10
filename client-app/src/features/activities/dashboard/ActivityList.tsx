import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activityStore';
import { ActivityListItem } from "./ActivityListItem";

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore
  return (
    <Fragment>
      {activitiesByDate.map(([group, actvities]) => (
        <Fragment>
          <Label key={group} size='large' color='blue'>
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {actvities.map((x) => (
                <ActivityListItem key={x.id} activity={x} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>

  );
};

export default observer(ActivityList);
