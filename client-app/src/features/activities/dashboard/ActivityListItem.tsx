import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { IActivity } from '../../../app/models/activity';
import {format} from 'date-fns';

export const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Description>
                                Hosted by
                        </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                <Icon name='marker' /> {activity.venue}, {activity.city}
            </Segment>
            <Segment secondary>
                Attendess will go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link} to={`/activities/${activity.id}`}
                    floated="right"
                    content="View"
                    color="blue"
                ></Button>

            </Segment>
        </Segment.Group>

    )
}
