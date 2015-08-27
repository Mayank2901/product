var express=require('express'),
	request = require('request'),
	bodyParser=require('body-parser'),
	fs=require('fs');

var myJSON = require("JSON");	
var app=express();

var url;
var score;
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
	res.sendFile(__dirname+"/input.html");   //Page to input the query.Query is inputted to textbox in the page.
});
app.post('/scrap',function(req,res){
	console.log(req.body.query);
	url='http://api.artt.in/?q='+(req.body.query);
	request(url, function(error, response, html){

	console.log(html);
	myJSON=html;							    			//html contains the data produced by the askparrot based on the query
	var data=JSON.parse(myJSON);			    			//data is parsed into JSON format
	var action=data.dependencies[1].dep[0].dependent._;		//action is inserted in action variable
	var sentimentvalue=data.$.sentimentValue;				//sentiment	
	var sentiment=data.$.sentiment;							//sentiment Value
	console.log(sentimentvalue);
	console.log(sentiment);
	console.log(action);
	/******************************************************
	*Score is calculated by adding the sentiment value     *
	*with the sentiment which is 1 for positive sentiment, *
	*0 for neutral and -1 for negative and dividing the sum*
	*with 5 which is the sum of largest value of sentiment *
	*value which is 4 and positive sentiment which is 1.   *
	********************************************************/
	if(action=='buy')
	{
		if(sentiment=='Positive')
			{	
				score=(sentimentvalue+1)/5;
				console.log('score=='+score);
				fs.readFile('/file1', function (err, data) 
					{	console.log('hi');
						if(err)
							console.log(err);
						else
  						console.log('file data=='+data);	
  									//Send a file in response
					});
										
											    
			}								   
											   
		else								    
			{
				score=(sentimentvalue)/5;	   
				console.log('score=='+score);
				fs.readFile('file2', function (err, data) 
					{	
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
  						
					});
										
							//Send a file in response
			}
	}
	if(action=='sell')
	{
		if(sentiment=='Positive')
			{	
				score=(sentimentvalue+1)/5;
				console.log('score=='+score);
				//send file1
				fs.readFile('file3', function (err, data) 
					{
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
					});

				r			//Send a file in response
			}
		else
			{
				score=(sentimentvalue)/5;
				console.log('score=='+score);
				fs.readFile('file4', function (err, data) 
					{
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
					});
										
						//Send a file in response
			}
	}
	if(action=='purchase')
	{
		if(sentiment=='Positive')
			{	
				score=(sentimentvalue+1)/5;
				console.log('score=='+score);
				fs.readFile('file5', function (err, data) 
					{
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
					});
										
							//Send a file in response
			}
		else
			{
				score=(sentimentvalue)/5;
				console.log('score=='+score);
				fs.readFile('file6', function (err, data) 
					{
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
					});
											//Send a file in response
			}
	}
	if(action=='deliever')
	{
		if(sentiment=='Positive')
			{	
				score=(sentimentvalue+1)/5;
				console.log('score=='+score);
				fs.readFile('file7', function (err, data) 
					{
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
					});
										
							//Send a file in response
			}
		else
			{
				score=(sentimentvalue)/5;
				console.log('score=='+score);
				fs.readFile('file8', function (err, data) 
					{
  						if (err)
  						console.log(err);
  						else
  						console.log('file data=='+data);
					});
										
							//Send a file in response
			}
	}
	return res.send(data);
});
});
app.listen(4000);