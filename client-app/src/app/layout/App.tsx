import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashBoard } from '../../features/activities/dashboard/ActivityDashBoard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting]= useState(false);
  const [target, setTarget] = useState('');

  const handleOperationCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateteActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleEditeActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id != activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));

  }

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false);
  }

  const handleDleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
    }).then(() => setSubmitting(false));

  }

  useEffect(() => {
    agent.Activities.list()
      .then((r) => {
        let activities: IActivity[] = [];
        r.forEach((x) => {
          x.date = x.date.split('.')[0];
          activities.push(x);
        })
        setActivities(activities);
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading activities" />
  return (
    <Fragment>
      <NavBar openCreateForm={handleOperationCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashBoard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateteActivity}
          editActivity={handleEditeActivity}
          deleteActivity={handleDleteActivity} 
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
}

export default App;
