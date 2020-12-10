import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../app/models/activity'

interface IProps{
    setEditMode : (editMode : boolean) => void;
    activity : IActivity
}

export const ActivityForm: React.FC<IProps> = ({setEditMode, activity : initialFormState}) => {
    const initilizeForm = () => {
        if(initialFormState){
            return initialFormState
        }else{
            return {
                id : '',
                title: '',
                category: '',
                description: '',
                date: '',
                city : '',
                venue : ''
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initilizeForm);
    
    const handleInputChange = (event : any) => {
        const {name, value} = event.target;
        setActivity({...activity,  [name] : value})
    }

    return (
        <Segment clearing >
            <Form>
                <Form.Input onChange={handleInputChange} name='title' placeholder="Title" value={activity.title} />
                <Form.TextArea rows={2} placeholder="Description" value={activity.description} />
                <Form.Input placeholder="Category"  value={activity.category} />
                <Form.Input type='date' placeholder="Date" value={activity.date} />
                <Form.Input placeholder="City" value={activity.city}  />
                <Form.Input placeholder="Venue" value={activity.venue} />
                <Button floated='right' positive type='submit' content='Submit'></Button>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'></Button>
            </Form>
        </Segment>       
    )
}
