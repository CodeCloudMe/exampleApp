
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Detail = mongoose.model('Detail')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Detail.load(id, function (err, detail) {
    if (err) return next(err);
    if (!detail) return next(new Error('not found'));
    req.detail = detail;
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
    Detail.list(options, function (err, details) {
    if (err) return res.render('500');
    Detail.count().exec(function (err, count) {
      res.send( {
        title: 'Details',
        details: details,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Detail.list(options, function (err, details) {
    if (err) return res.render('500');
    Detail.count().exec(function (err, count) {
      res.render('details/index', {
        title: 'Details',
        details: details,
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
    Detail.list(options, function (err, details) {
    if (err) return res.render('500');
    Detail.count().exec(function (err, count) {
      res.send( {
        title: 'Details',
        details: details,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Detail.list(options, function (err, details) {
    if (err) return res.render('500');
    Detail.count().exec(function (err, count) {
      res.render('details/list', {
        title: 'Details',
        details: details,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New detail
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Detail',
      detail: new Detail({})
    });
  }
  else{
    res.render('details/new', {
      title: 'New Detail',
      detail: new Detail({})
    });
  }
};

/**
 * Create an detail
 * Upload an image
 */

exports.create = function (req, res) {
  var detail = new Detail(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  detail.user = req.user;
   if(req.query.format=="json"){
       detail.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created detail!');
          return res.redirect('/details/'+detail._id);
        }
        res.send({
          title: 'New Detail',
          detail: detail,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     detail.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created detail!');
          return res.redirect('/details/'+detail._id);
        }
        res.render('details/new', {
          title: 'New Detail',
          detail: detail,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an detail
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.detail.title,
      detail: req.detail
    });
   }

   else{
    res.render('details/edit', {
      title: 'Edit ' + req.detail.title,
      detail: req.detail
    });
  }
};

/**
 * Update detail
 */

exports.update = function (req, res){
  var detail = req.detail;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  detail = extend(detail, req.body);

  detail.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/details/' + detail._id+"?format=json");
      }
      else{
        return res.redirect('/details/' + detail._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Detail',
        detail: detail,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('details/edit', {
        title: 'Edit Detail',
        detail: detail,
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
      title: req.detail.title,
      detail: req.detail
    });
  }

  else{
    res.render('details/show', {
      title: req.detail.title,
      detail: req.detail
    });
  }
};

/**
 * Delete an detail
 */

exports.destroy = function (req, res){
  var detail = req.detail;
  detail.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/details?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/details');
    }
  });
};
