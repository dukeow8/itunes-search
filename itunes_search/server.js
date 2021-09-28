//create the server
const express = require('express');
const app = express();
const fetch = require("node-fetch");
const dotenv = require('dotenv');
const helmet = require('helmet')
const path = require('path');

const Util = require('./util/utilities');

const PORT = process.env.PORT || 8080;
//Process file
dotenv.config();

//parse body of requests req
const bodyParser = require('body-parser');
app.use(express.static(path.resolve(__dirname, './client/public')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/*serving files*/
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//use helmet
app.use(helmet())

/* If our React app makes a GET request to that route, 
we respond (using res, which stands for response) with our JSON data */
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
  // All other GET requests not handled before will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
  });
//post (/search)
app.post('/search', (req, res) => {

    console.log("Searching...");
    //if type then values are "channel" "playlist" "video"
    //if video duration videoDuration "long" "medium" "short"
    //fetch inside the URL api
    // req.search_input

    //create the query
    console.log("request.body", req.body);
    const query = {
        q: req.body.q,
        type: req.body.type,
        key: process.env.API_KEY,
        part: "snippet",
        maxResults: "10"
    }

    //build the url query
    console.log("query", Util.encodeQueryData(query));
    const url = `http://itunes.apple.com/search?' + params + '&callback=?'${Util.encodeQueryData(query)}`;
    console.log("url",url);
    fetch(url, {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json',
 //     'Authorization' : `Bearer ${process.env.ACCESS_TOKEN}`
        }
    }).then(itunes => itunes.json())
    .then(data => res.send(data))
    .catch(error => console.log(error));
    
    //with response headers and errors

})

app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})


//body parsers

//resolve 
if (process.env.NODE_ENV) {
    app.use(express.static(path.resolve(process.cwd(), 'client/public')))
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'client/public/index.html'))
    })
  }
// Deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/public")));
    app.get("*", (req, res) =>
      // res.sendFile(path.resolve(__dirname, "../client", "public", "index.html"))
      res.sendFile(path.resolve(__dirname, "../client/public/index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API IS RUNNING.");
    });
  }

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});