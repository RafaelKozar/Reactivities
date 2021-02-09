import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import ActivityStore from '../../../app/stores/activityStore';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {activitiesByDate , selectActivity, deleteActivity, submitting, target} = activityStore
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((x) => (
          <Item key={x.id}>
            <Item.Content>
              <Item.Header as="a">{x.title}</Item.Header>
              <Item.Meta>{x.date}</Item.Meta>
              <Item.Description>
                <div>{x.description}</div>
                <div>
                  {x.city}, {x.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button

                  as={Link} to={`/activities/${x.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  name={x.id}
                  loading={target === x.id && submitting}
                  onClick={(e) => deleteActivity(e, x.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={x.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
