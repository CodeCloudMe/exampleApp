
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var utils = require('../../lib/utils')
var extend = require('util')._extend

Promise = require('bluebird');
fsP = Promise.promisifyAll(require('fs'));

//

exports.get = function(req, res){ 


  if(!req.query.wantFor){
    res.send({"status":"fail", "msg":"please send a wantFor param e.g. browse, search, etc"});
    return false;
  }

  fsP.readFileAsync('./config/generator/swatchSettings.js', 'utf8').then(function(buf) {

    try{
        var content = buf.toString();
        var theJSON = JSON.parse(content);

        if(theJSON['for']['type']=="thing"){
          // look for products, posts, content, photos, then articles
          //how
            //how to apply the filter here?
        }


    }

    catch(err){
      console.log('error getting the swatchSettings')
        res.send({"status":"fail", "msg":"could not load swatchsettings"});
        return false;
    } 

    })
  //query for what kind of app

}
