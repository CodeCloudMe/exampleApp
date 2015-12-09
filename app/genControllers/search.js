
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Search = mongoose.model('Search')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Search.load(id, function (err, search) {
    if (err) return next(err);
    if (!search) return next(new Error('not found'));
    req.search = search;
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
    Search.list(options, function (err, searchs) {
    if (err) return res.render('500');
    Search.count().exec(function (err, count) {
      res.send( {
        title: 'Searchs',
        searchs: searchs,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Search.list(options, function (err, searchs) {
    if (err) return res.render('500');
    Search.count().exec(function (err, count) {
      res.render('searchs/index', {
        title: 'Searchs',
        searchs: searchs,
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
    Search.list(options, function (err, searchs) {
    if (err) return res.render('500');
    Search.count().exec(function (err, count) {
      res.send( {
        title: 'Searchs',
        searchs: searchs,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Search.list(options, function (err, searchs) {
    if (err) return res.render('500');
    Search.count().exec(function (err, count) {
      res.render('searchs/list', {
        title: 'Searchs',
        searchs: searchs,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New search
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Search',
      search: new Search({})
    });
  }
  else{
    res.render('searchs/new', {
      title: 'New Search',
      search: new Search({})
    });
  }
};

/**
 * Create an search
 * Upload an image
 */

exports.create = function (req, res) {
  var search = new Search(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  search.user = req.user;
   if(req.query.format=="json"){
       search.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created search!');
          return res.redirect('/searchs/'+search._id);
        }
        res.send({
          title: 'New Search',
          search: search,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     search.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created search!');
          return res.redirect('/searchs/'+search._id);
        }
        res.render('searchs/new', {
          title: 'New Search',
          search: search,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an search
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.search.title,
      search: req.search
    });
   }

   else{
    res.render('searchs/edit', {
      title: 'Edit ' + req.search.title,
      search: req.search
    });
  }
};

/**
 * Update search
 */

exports.update = function (req, res){
  var search = req.search;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  search = extend(search, req.body);

  search.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/searchs/' + search._id+"?format=json");
      }
      else{
        return res.redirect('/searchs/' + search._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Search',
        search: search,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('searchs/edit', {
        title: 'Edit Search',
        search: search,
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
      title: req.search.title,
      search: req.search
    });
  }

  else{
    res.render('searchs/show', {
      title: req.search.title,
      search: req.search
    });
  }
};

/**
 * Delete an search
 */

exports.destroy = function (req, res){
  var search = req.search;
  search.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/searchs?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/searchs');
    }
  });
};
