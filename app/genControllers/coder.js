
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Coder = mongoose.model('Coder')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Coder.load(id, function (err, coder) {
    if (err) return next(err);
    if (!coder) return next(new Error('not found'));
    req.coder = coder;
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
    Coder.list(options, function (err, coders) {
    if (err) return res.render('500');
    Coder.count().exec(function (err, count) {
      res.send( {
        title: 'Coders',
        coders: coders,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Coder.list(options, function (err, coders) {
    if (err) return res.render('500');
    Coder.count().exec(function (err, count) {
      res.render('coders/index', {
        title: 'Coders',
        coders: coders,
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
    Coder.list(options, function (err, coders) {
    if (err) return res.render('500');
    Coder.count().exec(function (err, count) {
      res.send( {
        title: 'Coders',
        coders: coders,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Coder.list(options, function (err, coders) {
    if (err) return res.render('500');
    Coder.count().exec(function (err, count) {
      res.render('coders/list', {
        title: 'Coders',
        coders: coders,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New coder
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Coder',
      coder: new Coder({})
    });
  }
  else{
    res.render('coders/new', {
      title: 'New Coder',
      coder: new Coder({})
    });
  }
};

/**
 * Create an coder
 * Upload an image
 */

exports.create = function (req, res) {
  var coder = new Coder(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  coder.user = req.user;
   if(req.query.format=="json"){
       coder.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created coder!');
          return res.redirect('/coders/'+coder._id);
        }
        res.send({
          title: 'New Coder',
          coder: coder,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     coder.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created coder!');
          return res.redirect('/coders/'+coder._id);
        }
        res.render('coders/new', {
          title: 'New Coder',
          coder: coder,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an coder
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.coder.title,
      coder: req.coder
    });
   }

   else{
    res.render('coders/edit', {
      title: 'Edit ' + req.coder.title,
      coder: req.coder
    });
  }
};

/**
 * Update coder
 */

exports.update = function (req, res){
  var coder = req.coder;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  coder = extend(coder, req.body);

  coder.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/coders/' + coder._id+"?format=json");
      }
      else{
        return res.redirect('/coders/' + coder._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Coder',
        coder: coder,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('coders/edit', {
        title: 'Edit Coder',
        coder: coder,
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
      title: req.coder.title,
      coder: req.coder
    });
  }

  else{
    res.render('coders/show', {
      title: req.coder.title,
      coder: req.coder
    });
  }
};

/**
 * Delete an coder
 */

exports.destroy = function (req, res){
  var coder = req.coder;
  coder.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/coders?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/coders');
    }
  });
};
