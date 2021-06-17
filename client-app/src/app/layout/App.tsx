import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, useLocation, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import { useStore } from '../stores/store';
import { LoadingComponent } from './LoadingComponent';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';


function App() {
  const activityStore = useStore().activityStore

  const location = useLocation();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading activities" />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashBoard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
              <Route path='/server-error' component={ServerError} />
              <Route component={NotFound}  path='/not-found'/>
            </Switch>
          </Container>
        </Fragment>
      )} />

    </>
  );
}

export default observer(App);
// export default withRouter(observer(App));
