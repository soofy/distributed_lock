import React from "react";
import   ReactDOM   from "react-dom";
import App from './App'
import {Provider} from 'react-redux';
import { store } from './redux/store';

//use Reducer Hook
let root = document.getElementById("root");
 
ReactDOM.render(

    <React.StrictMode>
        <Provider store={store}>
                <App/>
        </Provider>
    </React.StrictMode>

    // <React.StrictMode>
    // <Provider store={store}>
    //      <PersistGate loading={null} persistor={persistor}>
    //          <App/>
    //      </PersistGate>
    // </Provider>
    // </React.StrictMode>
, root);
 
 
    
 