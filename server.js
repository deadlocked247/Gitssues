/* Written by BA 2016 for Twitter Intership */

/* Declare our modules */
var express 		= require('express'),
    app     		= express(),
	bodyParser = require('body-parser');
	port    = 8000,
	request = require('request'),
	fs = require('fs');

app.use( bodyParser.json() );       // to support JSON-encoded bodies

/* Give the route for index page */
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/app/index.html');
});


/* Give the route for issue page */
app.get('/issue', function (req, res) {
	res.sendFile(__dirname + '/app/components/issue/issueView.html');
});


/* give access to bower components for client */
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/', express.static(__dirname + '/'));

/* Access comments for an issue */
app.get('/issueComments/:author/:repo/:issue', function(req, res) {
	request({
		url: 'https://api.github.com/repos/' + req.params.author + '/' + req.params.repo + '/issues/' + req.params.issue +'/comments',
		method: 'GET',
		headers: {
    		'User-Agent': req.params.author,
    		'Content-Type': 'application/json'
    	},
    	rejectUnauthorized:false,
   		}, function(error, response, body){
	    	if(error) {
	    		console.log(error);
	        	res.status(500).send();
	    	} else {
	        	res.send(body);
	    	}
	    });		
});

/* Get issue data */
app.get('/issueData/:author/:repo/:issue', function(req, res) {
	request({
		url: 'https://api.github.com/repos/' + req.params.author + '/' + req.params.repo + '/issues/' + req.params.issue,
		method: 'GET',
		headers: {
    		'User-Agent': req.params.author,
    		'Content-Type': 'application/json'
    	},
    	rejectUnauthorized:false,
   		}, function(error, response, body){
	    	if(error) {
	    		console.log(error);
	        	res.status(500).send();
	    	} else {
	        	res.send(body);
	    	}
	    });
});

/* GETs the data for the given repo and author and additional queries */
/* Request has format  */
app.get('/gitData/:author/:repo', function(req, res) {
	var queryString = "";
	for (var key in req.query) {
		if (req.query.hasOwnProperty(key)) {
			queryString = queryString + "&" + key + "=" + req.query[key];
		}
	}
	if(queryString.length > 0) {
		queryString = "?" + queryString.substring(1, queryString.length);
	}
	
	/* Create request object */
	request({
    	url: 'https://api.github.com/repos/' + req.params.author + '/' + req.params.repo + '/issues' + queryString,
    	method: 'GET',
    	headers: {
    		'User-Agent': req.params.author,
    		'Content-Type': 'application/json'
    	},
    	rejectUnauthorized:false,
   		}, function(error, response, body){
	    	if(error) {
	    		console.log(error);
	        	res.status(500).send();
	    	} else {
	        	res.send(body);
	    	}
		});
});

/* Listen on port 8000 */
app.listen((process.env.PORT || port), function() {
	console.log("gitssues listening on " + port);
});