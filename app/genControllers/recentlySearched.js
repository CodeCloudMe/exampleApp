
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var RecentlySearched = mongoose.model('RecentlySearched')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  RecentlySearched.load(id, function (err, recentlySearched) {
    if (err) return next(err);
    if (!recentlySearched) return next(new Error('not found'));
    req.recentlySearched = recentlySearched;
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
    RecentlySearched.list(options, function (err, recentlySearcheds) {
    if (err) return res.render('500');
    RecentlySearched.count().exec(function (err, count) {
      res.send( {
        title: 'RecentlySearcheds',
        recentlySearcheds: recentlySearcheds,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  RecentlySearched.list(options, function (err, recentlySearcheds) {
    if (err) return res.render('500');
    RecentlySearched.count().exec(function (err, count) {
      res.render('recentlySearcheds/index', {
        title: 'RecentlySearcheds',
        recentlySearcheds: recentlySearcheds,
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
    RecentlySearched.list(options, function (err, recentlySearcheds) {
    if (err) return res.render('500');
    RecentlySearched.count().exec(function (err, count) {
      res.send( {
        title: 'RecentlySearcheds',
        recentlySearcheds: recentlySearcheds,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  RecentlySearched.list(options, function (err, recentlySearcheds) {
    if (err) return res.render('500');
    RecentlySearched.count().exec(function (err, count) {
      res.render('recentlySearcheds/list', {
        title: 'RecentlySearcheds',
        recentlySearcheds: recentlySearcheds,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New recentlySearched
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New RecentlySearched',
      recentlySearched: new RecentlySearched({})
    });
  }
  else{
    res.render('recentlySearcheds/new', {
      title: 'New RecentlySearched',
      recentlySearched: new RecentlySearched({})
    });
  }
};

/**
 * Create an recentlySearched
 * Upload an image
 */

exports.create = function (req, res) {
  var recentlySearched = new RecentlySearched(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  recentlySearched.user = req.user;
   if(req.query.format=="json"){
       recentlySearched.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created recentlySearched!');
          return res.redirect('/recentlySearcheds/'+recentlySearched._id);
        }
        res.send({
          title: 'New RecentlySearched',
          recentlySearched: recentlySearched,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     recentlySearched.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created recentlySearched!');
          return res.redirect('/recentlySearcheds/'+recentlySearched._id);
        }
        res.render('recentlySearcheds/new', {
          title: 'New RecentlySearched',
          recentlySearched: recentlySearched,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an recentlySearched
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.recentlySearched.title,
      recentlySearched: req.recentlySearched
    });
   }

   else{
    res.render('recentlySearcheds/edit', {
      title: 'Edit ' + req.recentlySearched.title,
      recentlySearched: req.recentlySearched
    });
  }
};

/**
 * Update recentlySearched
 */

exports.update = function (req, res){
  var recentlySearched = req.recentlySearched;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  recentlySearched = extend(recentlySearched, req.body);

  recentlySearched.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/recentlySearcheds/' + recentlySearched._id+"?format=json");
      }
      else{
        return res.redirect('/recentlySearcheds/' + recentlySearched._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit RecentlySearched',
        recentlySearched: recentlySearched,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('recentlySearcheds/edit', {
        title: 'Edit RecentlySearched',
        recentlySearched: recentlySearched,
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
      title: req.recentlySearched.title,
      recentlySearched: req.recentlySearched
    });
  }

  else{
    res.render('recentlySearcheds/show', {
      title: req.recentlySearched.title,
      recentlySearched: req.recentlySearched
    });
  }
};

/**
 * Delete an recentlySearched
 */

exports.destroy = function (req, res){
  var recentlySearched = req.recentlySearched;
  recentlySearched.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/recentlySearcheds?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/recentlySearcheds');
    }
  });
};
