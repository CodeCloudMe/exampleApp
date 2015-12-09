
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var RecentlyViewed = mongoose.model('RecentlyViewed')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  RecentlyViewed.load(id, function (err, recentlyViewed) {
    if (err) return next(err);
    if (!recentlyViewed) return next(new Error('not found'));
    req.recentlyViewed = recentlyViewed;
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
    RecentlyViewed.list(options, function (err, recentlyVieweds) {
    if (err) return res.render('500');
    RecentlyViewed.count().exec(function (err, count) {
      res.send( {
        title: 'RecentlyVieweds',
        recentlyVieweds: recentlyVieweds,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  RecentlyViewed.list(options, function (err, recentlyVieweds) {
    if (err) return res.render('500');
    RecentlyViewed.count().exec(function (err, count) {
      res.render('recentlyVieweds/index', {
        title: 'RecentlyVieweds',
        recentlyVieweds: recentlyVieweds,
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
    RecentlyViewed.list(options, function (err, recentlyVieweds) {
    if (err) return res.render('500');
    RecentlyViewed.count().exec(function (err, count) {
      res.send( {
        title: 'RecentlyVieweds',
        recentlyVieweds: recentlyVieweds,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  RecentlyViewed.list(options, function (err, recentlyVieweds) {
    if (err) return res.render('500');
    RecentlyViewed.count().exec(function (err, count) {
      res.render('recentlyVieweds/list', {
        title: 'RecentlyVieweds',
        recentlyVieweds: recentlyVieweds,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New recentlyViewed
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New RecentlyViewed',
      recentlyViewed: new RecentlyViewed({})
    });
  }
  else{
    res.render('recentlyVieweds/new', {
      title: 'New RecentlyViewed',
      recentlyViewed: new RecentlyViewed({})
    });
  }
};

/**
 * Create an recentlyViewed
 * Upload an image
 */

exports.create = function (req, res) {
  var recentlyViewed = new RecentlyViewed(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  recentlyViewed.user = req.user;
   if(req.query.format=="json"){
       recentlyViewed.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created recentlyViewed!');
          return res.redirect('/recentlyVieweds/'+recentlyViewed._id);
        }
        res.send({
          title: 'New RecentlyViewed',
          recentlyViewed: recentlyViewed,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     recentlyViewed.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created recentlyViewed!');
          return res.redirect('/recentlyVieweds/'+recentlyViewed._id);
        }
        res.render('recentlyVieweds/new', {
          title: 'New RecentlyViewed',
          recentlyViewed: recentlyViewed,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an recentlyViewed
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.recentlyViewed.title,
      recentlyViewed: req.recentlyViewed
    });
   }

   else{
    res.render('recentlyVieweds/edit', {
      title: 'Edit ' + req.recentlyViewed.title,
      recentlyViewed: req.recentlyViewed
    });
  }
};

/**
 * Update recentlyViewed
 */

exports.update = function (req, res){
  var recentlyViewed = req.recentlyViewed;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  recentlyViewed = extend(recentlyViewed, req.body);

  recentlyViewed.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/recentlyVieweds/' + recentlyViewed._id+"?format=json");
      }
      else{
        return res.redirect('/recentlyVieweds/' + recentlyViewed._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit RecentlyViewed',
        recentlyViewed: recentlyViewed,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('recentlyVieweds/edit', {
        title: 'Edit RecentlyViewed',
        recentlyViewed: recentlyViewed,
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
      title: req.recentlyViewed.title,
      recentlyViewed: req.recentlyViewed
    });
  }

  else{
    res.render('recentlyVieweds/show', {
      title: req.recentlyViewed.title,
      recentlyViewed: req.recentlyViewed
    });
  }
};

/**
 * Delete an recentlyViewed
 */

exports.destroy = function (req, res){
  var recentlyViewed = req.recentlyViewed;
  recentlyViewed.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/recentlyVieweds?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/recentlyVieweds');
    }
  });
};
