//we'll will be using Express.Router to defined routers explicitely out of express app
const express = require("express");
const defaultRouter = express.Router({});//options for router can be put in

defaultRouter.get('/', function (req, res) {
    res.send('Hello World')
})
  
defaultRouter.get('/name', function (req, res) {
    res.json({'name':'Jason'})
})

console.log(__dirname);
defaultRouter.get('/html', function (req, res) {
    res.sendFile(__dirname+"/public/index.html")
})

//userinfo.js is a static file
defaultRouter.get('/getjs', function (req, res) {
    res.sendFile(__dirname+"/public/userinfo.js")
})

defaultRouter.get('/add', (req, res) => { //localhost:3000/add?a=5&b=10 
    //request - req => this object contains information about client and what it expects from server
    //response - res => this object contains information we sent to client from server
    console.log(req);

    let param1 = req.query["a"]
    let param2 = req.query["b"]
    let param3 = req.query["c"]


    res.json({"Sum" : parseInt(param1) + parseInt(param2),
                "Third Param" : param3})
})

defaultRouter.get('/details/:id/:user', (req, res) => { //localhost:3000/details/200/Jason
//Route Params are the other way to send data from client to server
let id = req.params["id"]
let user = req.params["user"]

res.json({"ID is" :id , "Name " : user})
})
  

defaultRouter.all("/",(req, res)=>{
    res.send("This is default express router response")
});

module.exports = defaultRouter;