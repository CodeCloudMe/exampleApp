
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../lib/utils');
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id) {
  var options = {
    criteria: { _id : id }
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};

exports.loadOther = function (req, res, next, id){
 

  User.load(id, function (err, user) {
    if (err){ 
      console.log('error on load other')
      return next(err);
    }
    if (!user) return next(new Error('not found'));
    //req.user = user;
    console.log('next' +id)
    next();
  });
};

/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {

      if(req.query.format=="json"){

         return res.send({
          errors: utils.errors(err.errors),
          user: user,
          title: 'Sign up'
        });
      }

      else{
        if(req.query.format=="json"){
            res.send({
            errors: utils.errors(err.errors),
            user: user,
            title: 'Sign up'
          });

        }
        else{
          return res.render('users/signup', {
            errors: utils.errors(err.errors),
            user: user,
            title: 'Sign up'
          });
        }
      }
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      if(req.query.format=="json"){
        return res.redirect('/?format=json');
      }
      else{
        return res.redirect('/');
      }
      
    });
  });
};

exports.info = function (req, res) {
  
  var info = req.session;
  if(req.session.passport.user){
     var options = {
    criteria: { _id : req.session.passport.user }
  };
  User.list(options, function (err, user) {
    if (err){
      res.send({"status":"fail", "msg":"who knows?"})
      return;

    } 
    if (!user) {
      res.send({"status":"fail", "msg":'Failed to load User ' + id})
    };

    req.profile = user;
    //next();
       res.send({"status":"success", "data":req.session, "profile":user[0]})

  });


   
  }
  else{
    res.send({"status":"fail", "data":req.session})
  }
  
};


/**
 *  Show profile
 */

exports.show = function (req, res) {
  var user = req.profile;
  if(req.query.format=="json"){
     res.send( {
      title: user.name,
      user: user
    });
  }
  else{
    res.render('users/show', {
      title: user.name,
      user: user
    });
  }
  
};

exports.signin = function (req, res) {};

/**
 * Auth callback
 */

exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function (req, res) {

  if(req.query.format=="json"){
    res.send({
      title: 'Login'
    });
  }
  else{
    res.render('users/login', {
      title: 'Login'
    });
  }
  
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  if(req.query.format=="json"){
     res.send( {
      title: 'Sign up',
      user: new User()
    });
  }

  else{
    res.render('users/signup', {
      title: 'Sign up',
      user: new User()
    });
  }
  
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  if(req.query.format=="json"){
    res.redirect('/login?format=json');
  }
  else{
    res.redirect('/login');
  }
  
};


exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: req.user.username,
      user: req.user
    });
   }

   else{
    res.render('users/edit', {
      title: req.user.username,
      user: req.user
    });
  }
};

/**
 * Update article
 */

exports.update = function (req, res){
  var user = req.user;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  user = extend(user, req.body);

  user.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/users/' + user._id+"?format=json");
      }
      else{
        return res.redirect('/users/' + user._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit User',
        user: user,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('users/edit', {
        title: 'Edit User',
        user: user,
        errors: utils.errors(err.errors || err)
      });
    }


  });
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
    User.list(options, function (err, users) {
    if (err) return res.render('500');
    User.count().exec(function (err, count) {
      res.send( {
        title: 'Users',
        users: users,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  User.list(options, function (err, users) {
    if (err) return res.render('500');
    User.count().exec(function (err, count) {
      res.render('users/list', {
        title: 'Users',
        users: users,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;

  if(req.query.format=="json"){
    res.redirect(redirectTo+"?format=json");
  }
  else{
    res.redirect(redirectTo);
  }

  
};
