
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Message = mongoose.model('Message')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Message.load(id, function (err, message) {
    if (err) return next(err);
    if (!message) return next(new Error('not found'));
    req.message = message;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res){
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var perPage = 30;

  var options = {
          perPage: perPage,
          page: page
        };

  if(req.query.criteria){

    try{
      var criteria=  JSON.parse(req.query.criteria);
      options.criteria=[];
      var count = 0;
      var isGeo=false;

      var notRegexing = false;
      for(i in criteria){


        //check for geolocational query by finding a lat param
        if(criteria.lat){
          options.criteria={};
          try{

            criteria['geo']=true;
            criteria['lat'] = parseFloat(criteria['lat'])
            criteria['lon'] = parseFloat(criteria['lon'])
            criteria['distance'] = parseFloat(criteria['distance'])
           
            isGeo=true;

            if(criteria['query']){
              criteria['query']=criteria['query'];
              for(t in criteria['query']){
                if(notRegexing==false){
                    criteria['query'][t] = new RegExp(".*?"+criteria['query'][t]+".*?", 'i')
                }
              
                notRegexing=true;
              }
            }

            else{
              criteria['query']={};
            }
          }

          catch(err){
            console.log('geospatial query failed because the distance,lon, lat not working to parseFloat')
          }
        }
        options.criteria[count]={};
        if(isGeo==false){
          if(isNaN(criteria[i]) == true){
             options.criteria[count][i]=new RegExp(".*?"+criteria[i]+".*?", 'i')
          }

          else{
               options.criteria[count][i]= criteria[i];
          }
         
        

          count = count+1;
        }

        else{

          options.criteria= criteria;
        }
      }
      
      console.log(options.criteria)
    }

    catch(err){
      console.log(err);
      console.log('not searching by critera as no conditions are specified in array formation / e.g. {title:"example"}')
    }


  }
 
  
  if(req.query.format=="json"){
    Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.send( {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.render('messages/index', {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




exports.myMessages = function (req, res){
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var perPage = 30;

  var options = {
          perPage: perPage,
          page: page
        };

  options.criteria = [{user:req.user}, {toUser:req.user}];

 
  
  if(req.query.format=="json"){
    Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.send( {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.render('messages/list', {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};


exports.conversations = function (req, res){
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var perPage = 30;

  var options = {
          perPage: perPage,
          page: page
        };

        if(!req.query.userId){

          res.send({"status":"fail", "msg":"Please send a userId"})
          return;
        }

        else{

          var userId = req.query.userId;
        }

  options.criteria = [{user:req.user, toUser:userId},{user:userId, toUser:req.user}];

 
  
  if(req.query.format=="json"){
    Message.list(options, function (err, messages) {

    if (err){ 
      console.log(err);
      console.log('wtf')
      res.send({"status":"fail", "msg":"userId doesnt exist"})
      return
    }
    Message.count().exec(function (err, count) {
      res.send( {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.render('messages/list', {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};








exports.list = function (req, res){
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var perPage = 30;

  var options = {
          perPage: perPage,
          page: page
        };

  if(req.query.criteria){

    try{
      var criteria=  JSON.parse(req.query.criteria);
      options.criteria=[];
      var count = 0;
      var isGeo=false;

      var notRegexing = false;
      for(i in criteria){


        //check for geolocational query by finding a lat param
        if(criteria.lat){
          options.criteria={};
          try{

            criteria['geo']=true;
            criteria['lat'] = parseFloat(criteria['lat'])
            criteria['lon'] = parseFloat(criteria['lon'])
            criteria['distance'] = parseFloat(criteria['distance'])
           
            isGeo=true;

            if(criteria['query']){
              criteria['query']=criteria['query'];
              for(t in criteria['query']){
                if(notRegexing==false){
                    criteria['query'][t] = new RegExp(".*?"+criteria['query'][t]+".*?", 'i')
                }
              
                notRegexing=true;
              }
            }

            else{
              criteria['query']={};
            }
          }

          catch(err){
            console.log('geospatial query failed because the distance,lon, lat not working to parseFloat')
          }
        }
        options.criteria[count]={};
        if(isGeo==false){
          if(isNaN(criteria[i]) == true){
             options.criteria[count][i]=new RegExp(".*?"+criteria[i]+".*?", 'i')
          }

          else{
               options.criteria[count][i]= criteria[i];
          }
         
        

          count = count+1;
        }

        else{

          options.criteria= criteria;
        }
      }
      
      console.log(options.criteria)
    }

    catch(err){
      console.log(err);
      console.log('not searching by critera as no conditions are specified in array formation / e.g. {title:"example"}')
    }


  }
 
  
  if(req.query.format=="json"){
    Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.send( {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Message.list(options, function (err, messages) {
    if (err) return res.render('500');
    Message.count().exec(function (err, count) {
      res.render('messages/list', {
        title: 'Messages',
        messages: messages,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New message
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Message',
      message: new Message({})
    });
  }
  else{
    res.render('messages/new', {
      title: 'New Message',
      message: new Message({})
    });
  }
};

/**
 * Create an message
 * Upload an image
 */

exports.create = function (req, res) {
  var message = new Message(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  message.user = req.user;
   if(req.query.format=="json"){
       message.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created message!');
          return res.redirect('/messages/'+message._id);
        }
        res.send({
          title: 'New Message',
          message: message,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     message.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created message!');
          return res.redirect('/messages/'+message._id);
        }
        res.render('messages/new', {
          title: 'New Message',
          message: message,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an message
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.message.title,
      message: req.message
    });
   }

   else{
    res.render('messages/edit', {
      title: 'Edit ' + req.message.title,
      message: req.message
    });
  }
};

/**
 * Update message
 */

exports.update = function (req, res){
  var message = req.message;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  message = extend(message, req.body);

  message.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/messages/' + message._id+"?format=json");
      }
      else{
        return res.redirect('/messages/' + message._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Message',
        message: message,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('messages/edit', {
        title: 'Edit Message',
        message: message,
        errors: utils.errors(err.errors || err)
      });
    }


  });
};

/**
 * Show
 */

exports.show = function (req, res){
  
  if(req.query.format=="json"){

    res.send( {
      title: req.message.title,
      message: req.message
    });
  }

  else{
    res.render('messages/show', {
      title: req.message.title,
      message: req.message
    });
  }
};

/**
 * Delete an message
 */

exports.destroy = function (req, res){
  var message = req.message;
  message.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/messages?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/messages');
    }
  });
};
