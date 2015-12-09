
/*!

  *Forked from:
 * nodejs-express-mongoose-demo
 * Copyright(c) 2013 Madhusudhan Srinivasa <madhums8@gmail.com>
 * MIT Licensed
 */
/**
 * Module dependencies
 */
 

var fs = require('fs');
var join = require('path').join;
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var Promise = require('bluebird');
var fsP = Promise.promisifyAll(require('fs'));
//var config = require('config');

connection_string = "127.0.0.1:27017/codefog";
ipaddress='127.0.0.1';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	ipaddress= process.env.OPENSHIFT_NODEJS_IP;
  connection_string = "mongodb://"+process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}



var app = express();


var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


// Connect to mongodb

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){

		var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(connection_string, options);
};


	}


	else{

		/*
		var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};

*/

		var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(connection_string, options);
};
	}

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models



fs.readdirSync(join(__dirname, 'app/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/models', file));
});



fs.readdirSync(join(__dirname, 'app/controllers')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/controllers', file));
});


try{
fs.readdirSync(join(__dirname, 'app/genModels')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/genModels', file));
});
}catch(err){console.log('genModels dont exist yet')}

try{
fs.readdirSync(join(__dirname, 'app/genControllers')).forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'app/genControllers', file));
});
}catch(err){console.log('genControllers dont exist yet')}




// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);


app.listen(port, ipaddress);

console.log('Express app started on port ' + port);

/**
 * Expose
 */

module.exports = app;



/*

var request = require('request');

    request('http://codefogssh-codefog.rhcloud.com/stop', function(error, response, html){
      console.log(response);
    });

*/







//giveTitleToApp('something')


function giveTitleToApp(theAppName){  


fs = require('fs');
    console.log('the app name is '+ theAppName)
    fs.readFile('./app/views/includes/header.html', function(err, buf) {
        var origCont = buf.toString();
        var newHeaderCont = removeBetween2('<a href="/" class="navbar-brand">', '</a><!--end title-->', origCont, theAppName)

        fs.writeFile('./app/views/includes/header.html', newHeaderCont, function(err) {
              if(err) {

                  return console.log(err);

              }
              
                console.log("The header file has been updated");
          }); 



    });



}

function removeBetween2(str1, str2, subject, newContent){

  
  var arr1 = subject.split(str1);
  var arr2 = subject.split(str2);

  var full = arr1[0]+""+str1 +"\n"+newContent+"\n"+str2+"\n" +arr2[1];

  return full;

}











//formatTemplates();



function formatTemplates(){

  var templatesDir='./public/templates/';
  var fs = require('fs');
  var files= fs.readdirSync(templatesDir).forEach(function(file) {

  //  file.isDirectory();
    console.log(file);

    if(file.indexOf('DS_S')==-1){


      fs.readFile(templatesDir+file+"/index.html", function(err, buf) {
        var theHTML = buf.toString();
        if(theHTML.indexOf('/templates/'+file) !=-1){

          console.log('not formating '+ file+" ... it is already formatted");
          return;
        }
        var newHTML = theHTML.replace(/link href=\"/g, 'link href="/templates/'+file+"/");

        var newHTML1 = newHTML.replace(/link href=\'/g, 'link href=\'/templates/'+file+"/");

        var newHTML2 = newHTML1.replace(/script src="/g, 'script src="/templates/'+file+"/");
        var newHTML3 = newHTML2.replace(/script src='/g, 'script src=\'/templates/'+file+"/");

         var newHTML4 = newHTML3.replace(/img src="/g, 'img src="/templates/'+file+"/");


       // console.log(newHTML3);


         fs.writeFile( templatesDir+file+"/index.html", newHTML4, null, 'utf8', function(){

              console.log(newHTML4)

             });

         fs.writeFile( templatesDir+file+"/index1.html", theHTML, null, 'utf8', function(){

              console.log(theHTML)

             });


      });

    }

  });
}


function unFormatTemplates(){

  var templatesDir='./public/templates/';
  var fs = require('fs');
  var files= fs.readdirSync(templatesDir).forEach(function(file) {

  //  file.isDirectory();
    console.log(file);

    if(file.indexOf('DS_S')==-1){

      fs.readFile(templatesDir+file+"/index.html", function(err, buf) {
        var theHTML = buf.toString();

        var find1 = new RegExp('link href="/templates/'+file+"/", 'g');
         var find2 = new RegExp('link href=\'/templates/'+file+"/", 'g');
          var find3 = new RegExp('script src="/templates/'+file+"/", 'g');
          var find4 = new RegExp('script src=\'/templates/'+file+"/", 'g');
           var find5 = new RegExp('img src="/templates/'+file+"/", 'g');


        var newHTML = theHTML.replace(find1, 'link href="');

        var newHTML1 = newHTML.replace(find2, 'link href=\'');

        var newHTML2 = newHTML1.replace(find3, 'script src="');
        var newHTML3 = newHTML2.replace(find4, 'script src=\'');
         var newHTML4 = newHTML3.replace(find5, 'img src="');


        console.log(newHTML4);


         fs.writeFile( templatesDir+file+"/index.html", newHTML4, null, 'utf8', function(){

              console.log(newHTML4)

             });


      });

    }

  });
}


/*


{% include '../../../public/templates/shopping-cart/index.html' %}

*/
