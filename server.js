var http = require("http");
var url = require("url");
var references = require('./references')
var axios = require("axios");
var fetch = require('node-fetch');
var querystring = require('querystring');
var qs = require('qs');
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
var b = querystring.stringify({


})
var postData = querystring.stringify({
    "usename": 'usename',
    "password": "pass"
});
fetch('https://tranquil-bastion-28756.herokuapp.com/herokuCheckIn')
    .then(function (res) {
        return res.text();
    }).then(function (body) {
        console.log(body);
    });

// fetch('https://tranquil-bastion-28756.herokuapp.com/herokuCheckIn',
//     {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: postData,

//     })
//     .then(function (res) {
//         console.log(res)
//         return res.json();
//     }).then(function (json) {
//         console.log('here')
//         //console.log(json);
//     });
//axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = {
//     usename: 'ahmed',
//     password: 'checking'
// };
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var querystring = require('querystring');
axios.post('https://tranquil-bastion-28756.herokuapp.com/login'
    ,

    {
	"usename":"ahmed",
	"password":"checking"
}

    ,
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        withCredentials: true,
        // auth: {
        //     usename: 'ahmed',
        //     password: 'checking'
        // },
    }).then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
//console.log(references.data);

// axios.post('https://tranquil-bastion-28756.herokuapp.com/login',{
//     usename:'ahmed',
//     password:'checking'
// }).then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });