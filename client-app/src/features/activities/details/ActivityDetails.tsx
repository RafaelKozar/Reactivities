import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityStore from "../../../app/stores/activityStore";

interface DetailsParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailsParams>> = ({
  match, history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,    
    loadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if(loadingInitial || !activity) return <LoadingComponent content='Loading component' />

  return (
    <div>
      <Card>
        <Image
          src={`/assets/categoryImages/${activity!.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity!.title}</Card.Header>
          <Card.Meta>
            <span>{activity!.date}</span>
          </Card.Meta>
          <Card.Description>{activity!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
            <Button
              basic
              color="blue"
              as={Link} to={`/manage/${activity.id}`}
              content="Edit"
            />
            <Button
              basic
              color="grey"
              onClick={() => history.push('/activities')}
              content="Cancel"
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </div>
  );
};

export default observer(ActivityDetails);
