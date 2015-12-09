
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var MyAccount = mongoose.model('MyAccount')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  MyAccount.load(id, function (err, myAccount) {
    if (err) return next(err);
    if (!myAccount) return next(new Error('not found'));
    req.myAccount = myAccount;
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
    MyAccount.list(options, function (err, myAccounts) {
    if (err) return res.render('500');
    MyAccount.count().exec(function (err, count) {
      res.send( {
        title: 'MyAccounts',
        myAccounts: myAccounts,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  MyAccount.list(options, function (err, myAccounts) {
    if (err) return res.render('500');
    MyAccount.count().exec(function (err, count) {
      res.render('myAccounts/index', {
        title: 'MyAccounts',
        myAccounts: myAccounts,
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
    MyAccount.list(options, function (err, myAccounts) {
    if (err) return res.render('500');
    MyAccount.count().exec(function (err, count) {
      res.send( {
        title: 'MyAccounts',
        myAccounts: myAccounts,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  MyAccount.list(options, function (err, myAccounts) {
    if (err) return res.render('500');
    MyAccount.count().exec(function (err, count) {
      res.render('myAccounts/list', {
        title: 'MyAccounts',
        myAccounts: myAccounts,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New myAccount
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New MyAccount',
      myAccount: new MyAccount({})
    });
  }
  else{
    res.render('myAccounts/new', {
      title: 'New MyAccount',
      myAccount: new MyAccount({})
    });
  }
};

/**
 * Create an myAccount
 * Upload an image
 */

exports.create = function (req, res) {
  var myAccount = new MyAccount(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  myAccount.user = req.user;
   if(req.query.format=="json"){
       myAccount.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created myAccount!');
          return res.redirect('/myAccounts/'+myAccount._id);
        }
        res.send({
          title: 'New MyAccount',
          myAccount: myAccount,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     myAccount.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created myAccount!');
          return res.redirect('/myAccounts/'+myAccount._id);
        }
        res.render('myAccounts/new', {
          title: 'New MyAccount',
          myAccount: myAccount,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an myAccount
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.myAccount.title,
      myAccount: req.myAccount
    });
   }

   else{
    res.render('myAccounts/edit', {
      title: 'Edit ' + req.myAccount.title,
      myAccount: req.myAccount
    });
  }
};

/**
 * Update myAccount
 */

exports.update = function (req, res){
  var myAccount = req.myAccount;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  myAccount = extend(myAccount, req.body);

  myAccount.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/myAccounts/' + myAccount._id+"?format=json");
      }
      else{
        return res.redirect('/myAccounts/' + myAccount._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit MyAccount',
        myAccount: myAccount,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('myAccounts/edit', {
        title: 'Edit MyAccount',
        myAccount: myAccount,
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
      title: req.myAccount.title,
      myAccount: req.myAccount
    });
  }

  else{
    res.render('myAccounts/show', {
      title: req.myAccount.title,
      myAccount: req.myAccount
    });
  }
};

/**
 * Delete an myAccount
 */

exports.destroy = function (req, res){
  var myAccount = req.myAccount;
  myAccount.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/myAccounts?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/myAccounts');
    }
  });
};
