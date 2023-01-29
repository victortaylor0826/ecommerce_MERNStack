console.log("The very first javascript file we loaded")
//alert("We'll work on react content next")
import React from "react";
import * as ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";// provider component will make sure that it wraps whole react appln and has store object in it
import store from "./application/State/store";

//import { ApplicationComponent } from "./application/app"; //named import
import ApplicationComponent  from "./application/app"; //default import

//creating root of the react application where we can load the react app
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render( //the application should be child of Provider to access the store as top parent/ in the form of props
    <Provider store={store}>
        <ApplicationComponent />
    </Provider>
);//bootstrapping react application on index.html page