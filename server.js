var http = require("http");
var url = require("url");
var references=require('./references')
var axios=require("axios");
var fetch = require('node-fetch');
var querystring = require('querystring');
// function start(route, handle) {
//     function onRequest(request, response) {
//         var pathname = url.parse(request.url).pathname;
//         console.log(url.parse(request.url).hash);
//         console.log("Request for " + pathname + " received.");
//         console.log(url.hash);
        
//         route(handle, pathname, response);
//     }
//     http.createServer(onRequest).listen(8888);
//     console.log("Server has started.");
// }
// exports.start = start;
var b=querystring.stringify({
        

     })
var postData = querystring.stringify({
   usename: "ahmed",
         password: "checking"
});
fetch('https://tranquil-bastion-28756.herokuapp.com/login')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
        console.log(body);
    });

    fetch('https://tranquil-bastion-28756.herokuapp.com/login',
     { method: 'POST', body: postData, 
      headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  } 
    })
    .then(function(res) {
        console.log(res)
        return res.json();
    }).then(function(json) {
        console.log(json);
    });
//axios.defaults.baseURL = 'https://api.example.com';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// var querystring = require('querystring');
// axios.post('https://tranquil-bastion-28756.herokuapp.com/login', querystring.stringify({
//      usename:"ahmed",
//     password:"checking"

//  }), {
//       headers: { 
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     }).then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//console.log(references.data);

// axios.post('https://tranquil-bastion-28756.herokuapp.com/login',{
//     usename:'ahmed',
//     password:'checking'
// })