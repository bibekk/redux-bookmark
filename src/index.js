import React from 'react';
import { createRoot } from 'react-dom/client';
import {App} from './containers';
import registerServiceWorker from './registerServiceWorker';
import {ENV} from './actions'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import 'semantic-ui-css/semantic.min.css';

const store = configureStore()
if(ENV === 'uat'){
  store.subscribe(() => {console.log(store.getState())})
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store = {store}><App /></Provider>);

//ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();


