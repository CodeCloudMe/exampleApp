
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Result = mongoose.model('Result')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Result.load(id, function (err, result) {
    if (err) return next(err);
    if (!result) return next(new Error('not found'));
    req.result = result;
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
    Result.list(options, function (err, results) {
    if (err) return res.render('500');
    Result.count().exec(function (err, count) {
      res.send( {
        title: 'Results',
        results: results,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Result.list(options, function (err, results) {
    if (err) return res.render('500');
    Result.count().exec(function (err, count) {
      res.render('results/index', {
        title: 'Results',
        results: results,
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
    Result.list(options, function (err, results) {
    if (err) return res.render('500');
    Result.count().exec(function (err, count) {
      res.send( {
        title: 'Results',
        results: results,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Result.list(options, function (err, results) {
    if (err) return res.render('500');
    Result.count().exec(function (err, count) {
      res.render('results/list', {
        title: 'Results',
        results: results,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New result
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Result',
      result: new Result({})
    });
  }
  else{
    res.render('results/new', {
      title: 'New Result',
      result: new Result({})
    });
  }
};

/**
 * Create an result
 * Upload an image
 */

exports.create = function (req, res) {
  var result = new Result(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  result.user = req.user;
   if(req.query.format=="json"){
       result.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created result!');
          return res.redirect('/results/'+result._id);
        }
        res.send({
          title: 'New Result',
          result: result,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     result.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created result!');
          return res.redirect('/results/'+result._id);
        }
        res.render('results/new', {
          title: 'New Result',
          result: result,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an result
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.result.title,
      result: req.result
    });
   }

   else{
    res.render('results/edit', {
      title: 'Edit ' + req.result.title,
      result: req.result
    });
  }
};

/**
 * Update result
 */

exports.update = function (req, res){
  var result = req.result;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  result = extend(result, req.body);

  result.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/results/' + result._id+"?format=json");
      }
      else{
        return res.redirect('/results/' + result._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Result',
        result: result,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('results/edit', {
        title: 'Edit Result',
        result: result,
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
      title: req.result.title,
      result: req.result
    });
  }

  else{
    res.render('results/show', {
      title: req.result.title,
      result: req.result
    });
  }
};

/**
 * Delete an result
 */

exports.destroy = function (req, res){
  var result = req.result;
  result.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/results?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/results');
    }
  });
};
