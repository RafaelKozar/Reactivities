import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';


const ActivityDetails : React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {selectedActivity : activity, openEditForm, cancelFormOpen} = activityStore;
    return (
        <div>
            <Card>
                <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity!.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity!.date}</span>
                    </Card.Meta>
                    <Card.Description>
                    {activity! .description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                   <Button.Group widths={2}>
                       <Button basic color='blue' onClick={() => openEditForm(activity!.id)} content='Edit' />
                       <Button basic color='grey' onClick={cancelFormOpen} content='Cancel' />
                   </Button.Group>
                </Card.Content>
            </Card>
        </div>
    );
};

export default observer(ActivityDetails);