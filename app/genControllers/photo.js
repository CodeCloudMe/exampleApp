
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Photo = mongoose.model('Photo')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Photo.load(id, function (err, photo) {
    if (err) return next(err);
    if (!photo) return next(new Error('not found'));
    req.photo = photo;
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
    Photo.list(options, function (err, photos) {
    if (err) return res.render('500');
    Photo.count().exec(function (err, count) {
      res.send( {
        title: 'Photos',
        photos: photos,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Photo.list(options, function (err, photos) {
    if (err) return res.render('500');
    Photo.count().exec(function (err, count) {
      res.render('photos/index', {
        title: 'Photos',
        photos: photos,
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
    Photo.list(options, function (err, photos) {
    if (err) return res.render('500');
    Photo.count().exec(function (err, count) {
      res.send( {
        title: 'Photos',
        photos: photos,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Photo.list(options, function (err, photos) {
    if (err) return res.render('500');
    Photo.count().exec(function (err, count) {
      res.render('photos/list', {
        title: 'Photos',
        photos: photos,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New photo
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Photo',
      photo: new Photo({})
    });
  }
  else{
    res.render('photos/new', {
      title: 'New Photo',
      photo: new Photo({})
    });
  }
};

/**
 * Create an photo
 * Upload an image
 */

exports.create = function (req, res) {
  var photo = new Photo(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  photo.user = req.user;
   if(req.query.format=="json"){
       photo.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created photo!');
          return res.redirect('/photos/'+photo._id);
        }
        res.send({
          title: 'New Photo',
          photo: photo,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     photo.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created photo!');
          return res.redirect('/photos/'+photo._id);
        }
        res.render('photos/new', {
          title: 'New Photo',
          photo: photo,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an photo
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.photo.title,
      photo: req.photo
    });
   }

   else{
    res.render('photos/edit', {
      title: 'Edit ' + req.photo.title,
      photo: req.photo
    });
  }
};

/**
 * Update photo
 */

exports.update = function (req, res){
  var photo = req.photo;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  photo = extend(photo, req.body);

  photo.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/photos/' + photo._id+"?format=json");
      }
      else{
        return res.redirect('/photos/' + photo._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Photo',
        photo: photo,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('photos/edit', {
        title: 'Edit Photo',
        photo: photo,
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
      title: req.photo.title,
      photo: req.photo
    });
  }

  else{
    res.render('photos/show', {
      title: req.photo.title,
      photo: req.photo
    });
  }
};

/**
 * Delete an photo
 */

exports.destroy = function (req, res){
  var photo = req.photo;
  photo.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/photos?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/photos');
    }
  });
};
