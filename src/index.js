import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/ItemList';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore()

store.subscribe(() => {
  console.log(store.getState());
});


ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
