import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import CarStore from "./store/CarStore"
import TruckStore from "./store/TruckStore";

export const Context = createContext(null)


ReactDOM.render(

    <Context.Provider value={{
        user: new UserStore(),
        car: new CarStore(),
        truck: new TruckStore()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);




