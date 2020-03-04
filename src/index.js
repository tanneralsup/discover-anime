import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Store/reducer";

  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
  )

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider> , document.getElementById('root'));

serviceWorker.unregister();
