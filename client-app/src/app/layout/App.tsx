import React, { useState, useEffect, Fragment } from 'react';
import { Container} from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashBoard } from '../../features/activities/dashboard/ActivityDashBoard';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleOperationCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateteActivity = (activity : IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditeActivity = (activity : IActivity) => {    
    setActivities([...activities.filter(a => a.id != activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleSelectActivity = (id : string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false);
  }

  const handleDleteActivity = (id : string) => {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>('http://localhost:5000/api/activities')
      .then((r) => {
        let activities : IActivity[] = [];
        r.data.forEach(x => {
          x.date = x.date.split('.')[0];
          activities.push(x);
        })
        setActivities(activities);
      });
  }, []);


  return (
    <Fragment>
      <NavBar  openCreateForm={handleOperationCreateForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashBoard 
          activities={activities} 
          selectActivity={handleSelectActivity} 
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity = {handleCreateteActivity}
          editActivity = {handleEditeActivity}
          deleteActivity = {handleDleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
