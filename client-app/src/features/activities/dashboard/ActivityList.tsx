import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({ activities, selectActivity }) => {
    return (
        <Segment clearing>
            <Item.Group divided>
                {activities.map(x => (
                    <Item key={x.id}>
                        <Item.Content>
                            <Item.Header as='a'>{x.title}</Item.Header>
                            <Item.Meta>{x.date}</Item.Meta>
                            <Item.Description>
                                <div>{x.description}</div>
                                <div>{x.city}, {x.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    onClick={() => selectActivity(x.id)}
                                    floated='right' 
                                    content='View' 
                                    color='blue'>

                                </Button>
                                <Label basic content={x.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))};
            </Item.Group>
        </Segment>
    )
}

export default ActivityList