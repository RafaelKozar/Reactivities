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
import LoginForm from '../../features/users/LoginForm';
import ModalContainer from '../common/modals/ModalContainer';


function App() {  

  const location = useLocation();
  const {commonStore, userStore} = useStore();
  
  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])
  

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
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
              <Route path='/login' component={LoginForm} />
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
