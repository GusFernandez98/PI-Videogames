import { createStore, applyMiddleware, compose } from 'redux';  //·Para crear el store
import reducer from '../reducer/index';
import thunkMiddleware from 'redux-thunk';      //·Middle -> ayuda a JS para realizar peticiones asincronas. 

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta línea es para conectar con la extensión del navegador => REDUX DEVTOOLS 

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))       //·Es para poder hacer peticiones al server.
    );

export default store;