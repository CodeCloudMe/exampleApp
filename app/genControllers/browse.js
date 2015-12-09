
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Browse = mongoose.model('Browse')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Browse.load(id, function (err, browse) {
    if (err) return next(err);
    if (!browse) return next(new Error('not found'));
    req.browse = browse;
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
    Browse.list(options, function (err, browses) {
    if (err) return res.render('500');
    Browse.count().exec(function (err, count) {
      res.send( {
        title: 'Browses',
        browses: browses,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Browse.list(options, function (err, browses) {
    if (err) return res.render('500');
    Browse.count().exec(function (err, count) {
      res.render('browses/index', {
        title: 'Browses',
        browses: browses,
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
    Browse.list(options, function (err, browses) {
    if (err) return res.render('500');
    Browse.count().exec(function (err, count) {
      res.send( {
        title: 'Browses',
        browses: browses,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Browse.list(options, function (err, browses) {
    if (err) return res.render('500');
    Browse.count().exec(function (err, count) {
      res.render('browses/list', {
        title: 'Browses',
        browses: browses,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New browse
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Browse',
      browse: new Browse({})
    });
  }
  else{
    res.render('browses/new', {
      title: 'New Browse',
      browse: new Browse({})
    });
  }
};

/**
 * Create an browse
 * Upload an image
 */

exports.create = function (req, res) {
  var browse = new Browse(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  browse.user = req.user;
   if(req.query.format=="json"){
       browse.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created browse!');
          return res.redirect('/browses/'+browse._id);
        }
        res.send({
          title: 'New Browse',
          browse: browse,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     browse.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created browse!');
          return res.redirect('/browses/'+browse._id);
        }
        res.render('browses/new', {
          title: 'New Browse',
          browse: browse,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an browse
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.browse.title,
      browse: req.browse
    });
   }

   else{
    res.render('browses/edit', {
      title: 'Edit ' + req.browse.title,
      browse: req.browse
    });
  }
};

/**
 * Update browse
 */

exports.update = function (req, res){
  var browse = req.browse;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  browse = extend(browse, req.body);

  browse.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/browses/' + browse._id+"?format=json");
      }
      else{
        return res.redirect('/browses/' + browse._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Browse',
        browse: browse,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('browses/edit', {
        title: 'Edit Browse',
        browse: browse,
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
      title: req.browse.title,
      browse: req.browse
    });
  }

  else{
    res.render('browses/show', {
      title: req.browse.title,
      browse: req.browse
    });
  }
};

/**
 * Delete an browse
 */

exports.destroy = function (req, res){
  var browse = req.browse;
  browse.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/browses?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/browses');
    }
  });
};
