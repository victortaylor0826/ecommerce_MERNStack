const express = require('express') //importing express module with name - express

const app = express();//invoking top level function of express to return Express Application
const adminApp = express();//in one server we can have multiple express applications that can be delegated
//application
//request
//response
//router

//setting up the middleware static to handle all the static files we need to serve to client
// serve static files like images css using static middleware 
app.use('/static', express.static('public')) //localhost:3000/static/userinfo.js

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/name', function (req, res) {
    res.json({'name':'Jason'})
  })

console.log(__dirname);
app.get('/html', function (req, res) {
  res.sendFile(__dirname+"/public/index.html")
})

//userinfo.js is a static file
app.get('/getjs', function (req, res) {
  res.sendFile(__dirname+"/public/userinfo.js")
})

app.get('/add', (req, res) => { //localhost:3000/add?a=5&b=10 
    //request - req => this object contains information about client and what it expects from server
    //response - res => this object contains information we sent to client from server
    console.log(req);

    let param1 = req.query["a"]
    let param2 = req.query["b"]
    let param3 = req.query["c"]


    res.json({"Sum" : parseInt(param1) + parseInt(param2),
                "Third Param" : param3})
})

app.get('/details/:id/:user', (req, res) => { //localhost:3000/details/200/Jason
  //Route Params are the other way to send data from client to server
  let id = req.params["id"]
  let user = req.params["user"]
  
  res.json({"ID is" :id , "Name " : user})
})

//Mounting of one express app on another 
app.use("/admin", adminApp); //localhost:3000/admin

adminApp.get("/", (req, res)=>{
  res.send("<h2>Hello From Admin App</h2>")
})

adminApp.get("/reports",(req, res)=>{ //localhost:3000/admin/reports
  res.send("Reports Are not generated yet!!!")
})

//wild card operator or *
// app.get('*', function (req, res) { 
//     res.send("This is the default response. Please look for specific API")
// })


app.listen(3000)

console.log("node server is listening at port 3000");//localhost:3000/html => URI(API Endpoint)


//HTTP Standard Status Codes

//200 - Everything is okay and we'll response (200.1) - success
//304 - Permanent Re-routing - The page we are looking is moved /page1 now /page2
//404 - page not found
//500 - error on application