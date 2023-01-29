About the App: 

Shopping Cart Application


Introduction: Project is delivering detailed working flow of each MERN Stack technology, in an SOA-
Service Oriented Architectural flow of web projects. It is built upon react library as part of UI and redux
to handle data interaction on UI. There is robust implementation of thunk and redux promise to have
interaction from UI to NodeAPI&#39;s, the required data to support all CRUD operations are present in
Restful API and have a traversal over http/s using REST specifications.
Skill Sets Involved:
 Vanila Javascript (Object Oriented JS)
 ES6 Ecmascript-6
 NODEJS Framework
 Express Framework
 MongoDB Basics with Mongoose
 HTML5 and Browser Specifications
 React Library
 Redux Library
 WebPack Basics
 React Router for standard navigations
 Promise To make data calls and modularization

Project Descriptions:
-&gt; Project is mainly divided in two parts so that we can have better development approach
1. Front End :
It is built to create an understanding of E-Commerce project, below things are done in this project to
create front-end web pages.
 Uses React and Redux at the front end to solve the problems we had with manual rendering
through JQuery and Html5, so that we have proper establishment of code management using
Component, Container and State (Reducer, Actions) in segregation to follow separation of
concern
 A Proper standard React Architecture UI and for data-management Redux components have
been used so that we have an optimization of Virtual DOM at react components re-rendering
and one way flow of data from store to components, using publisher-subscriber
implementation.

 We developed shared set of pages where Header and Footer will remain common, using class
component and functional component respectively
 Components developed are Home, Cart, Product, User, Coupon and Checkout to have
independent feature where user can interact for respective uses as described further, keeping
re-usability in scope.
 Each Component having their own respective page
 Home is the landing page remains as a default one and shows all the functionalities present in
project
 Navigations shared across all components through Header and Footer and are clickable
everywhere
 React Router is there to handle all the component routings for page navigations
 Cart component allows dynamically add, update, remove products upon button clicks (CRUD
Operations)
 Cart component uses redux store to show, product summary to the users and sum of the
amount to be paid which includes server side interaction
 Product page contains list of all products which we pull from NodeAPI (Backend) and Added
through Product Creation Page and show the same in Show Product Components
 The user which is created at Users Component is shown as buyer of the selected product and
saved in database
 To combine them all once user generates Product list it will use checkout page and its Cart gets
saved in MongoDB database.
 Checkout page contains association of Product, Price, User and Coupon. Once user clicks on
Make Payment success message is shown.
 This website uses webpack for all its configurations, package management, minification, conflict
resolution and hosting with react.
 ES6 and JSX will are used to write all components and feature including html generation
 User React Loadable for lazyloading technique to gain standard perfornmance.

2. Back-End:
-&gt; This includes multiple set of web-api’s (micro services / restful api’s) which are used part of NodeAPI
development and consumed on react application
 Used Node, NPM, Express to create and host server for API
 We are using Open SQL Standard database - MongoDB to save all data interactions present in
project
 We created multiple APIs to create, update User, so that it can Sign Up or Sign In accordingly
 API to GetProducts is created which contains all the details of product to be shown on UI
 APIs to store user purchase of product is created and uses JSON data structure to save the same
 Mongoose used in API to provide access and connections to MongoDB with Schema creation,
data modeling and data validations

 Upon hosting through ExpressJs each URI is allowed to use through Body Parser and CORS
(cross-origin) calls for different domains
 Similar to webpack we used Nodemon monitoring tool for handling API built and that would
avoid restarting of severs manually upon hosting to servers
 All these APIs are up and running along with the react project but in different directory to
provide better maintainability.
