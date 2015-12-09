
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var LearnMore = mongoose.model('LearnMore')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  LearnMore.load(id, function (err, learnMore) {
    if (err) return next(err);
    if (!learnMore) return next(new Error('not found'));
    req.learnMore = learnMore;
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
    LearnMore.list(options, function (err, learnMores) {
    if (err) return res.render('500');
    LearnMore.count().exec(function (err, count) {
      res.send( {
        title: 'LearnMores',
        learnMores: learnMores,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  LearnMore.list(options, function (err, learnMores) {
    if (err) return res.render('500');
    LearnMore.count().exec(function (err, count) {
      res.render('learnMores/index', {
        title: 'LearnMores',
        learnMores: learnMores,
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
    LearnMore.list(options, function (err, learnMores) {
    if (err) return res.render('500');
    LearnMore.count().exec(function (err, count) {
      res.send( {
        title: 'LearnMores',
        learnMores: learnMores,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  LearnMore.list(options, function (err, learnMores) {
    if (err) return res.render('500');
    LearnMore.count().exec(function (err, count) {
      res.render('learnMores/list', {
        title: 'LearnMores',
        learnMores: learnMores,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New learnMore
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New LearnMore',
      learnMore: new LearnMore({})
    });
  }
  else{
    res.render('learnMores/new', {
      title: 'New LearnMore',
      learnMore: new LearnMore({})
    });
  }
};

/**
 * Create an learnMore
 * Upload an image
 */

exports.create = function (req, res) {
  var learnMore = new LearnMore(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  learnMore.user = req.user;
   if(req.query.format=="json"){
       learnMore.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created learnMore!');
          return res.redirect('/learnMores/'+learnMore._id);
        }
        res.send({
          title: 'New LearnMore',
          learnMore: learnMore,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     learnMore.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created learnMore!');
          return res.redirect('/learnMores/'+learnMore._id);
        }
        res.render('learnMores/new', {
          title: 'New LearnMore',
          learnMore: learnMore,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an learnMore
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.learnMore.title,
      learnMore: req.learnMore
    });
   }

   else{
    res.render('learnMores/edit', {
      title: 'Edit ' + req.learnMore.title,
      learnMore: req.learnMore
    });
  }
};

/**
 * Update learnMore
 */

exports.update = function (req, res){
  var learnMore = req.learnMore;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  learnMore = extend(learnMore, req.body);

  learnMore.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/learnMores/' + learnMore._id+"?format=json");
      }
      else{
        return res.redirect('/learnMores/' + learnMore._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit LearnMore',
        learnMore: learnMore,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('learnMores/edit', {
        title: 'Edit LearnMore',
        learnMore: learnMore,
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
      title: req.learnMore.title,
      learnMore: req.learnMore
    });
  }

  else{
    res.render('learnMores/show', {
      title: req.learnMore.title,
      learnMore: req.learnMore
    });
  }
};

/**
 * Delete an learnMore
 */

exports.destroy = function (req, res){
  var learnMore = req.learnMore;
  learnMore.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/learnMores?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/learnMores');
    }
  });
};
