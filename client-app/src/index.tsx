import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css'
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/layout/ScrollToTop';
import { storeee, StoreContext } from './app/stores/store';
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory();

ReactDOM.render(
    <StoreContext.Provider value={storeee}>
    <Router history={history}> 
    <ScrollToTop>
      <App />
    </ScrollToTop>
    </Router>
    </StoreContext.Provider>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
