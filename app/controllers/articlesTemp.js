
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Article = mongoose.model('Article')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User');

  Article.load(id, function (err, article) {
    if (err) return next(err);
    if (!article) return next(new Error('not found'));
    req.article = article;
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
    Article.list(options, function (err, articles) {
    if (err) return res.render('500');
    Article.count().exec(function (err, count) {
      res.send( {
        title: 'Articles',
        articles: articles,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Article.list(options, function (err, articles) {
    if (err) return res.render('500');
    Article.count().exec(function (err, count) {
      res.render('articles/index', {
        title: 'Articles',
        articles: articles,
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
    Article.list(options, function (err, articles) {
    if (err) return res.render('500');
    Article.count().exec(function (err, count) {
      res.send( {
        title: 'Articles',
        articles: articles,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });
  }
  else{
  Article.list(options, function (err, articles) {
    if (err) return res.render('500');
    Article.count().exec(function (err, count) {
      res.render('articles/list', {
        title: 'Articles',
        articles: articles,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      });
    });
  });

  }
};




/**
 * New article
 */

exports.new = function (req, res){
  if(req.query.format=="json"){
    res.send( {
      title: 'New Article',
      article: new Article({})
    });
  }
  else{
    res.render('articles/new', {
      title: 'New Article',
      article: new Article({})
    });
  }
};

/**
 * Create an article
 * Upload an image
 */

exports.create = function (req, res) {
  var article = new Article(req.body);
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  article.user = req.user;
   if(req.query.format=="json"){
       article.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created article!');
          return res.redirect('/articles/'+article._id);
        }
        res.send({
          title: 'New Article',
          article: article,
          errors: utils.errors(err.errors || err)
        });
      });


   }
    
    else{

     article.uploadAndSave(images, function (err) {
        if (!err) {
          req.flash('success', 'Successfully created article!');
          return res.redirect('/articles/'+article._id);
        }
        res.render('articles/new', {
          title: 'New Article',
          article: article,
          errors: utils.errors(err.errors || err)
        });
      });
   }
};

/**
 * Edit an article
 */

exports.edit = function (req, res) {

   if(req.query.format=="json"){
    res.send( {
      title: 'Edit ' + req.article.title,
      article: req.article
    });
   }

   else{
    res.render('articles/edit', {
      title: 'Edit ' + req.article.title,
      article: req.article
    });
  }
};

/**
 * Update article
 */

exports.update = function (req, res){
  var article = req.article;
  var images = req.files.image
    ? [req.files.image]
    : undefined;

  // make sure no one changes the user
  delete req.body.user;
  article = extend(article, req.body);

  article.uploadAndSave(images, function (err) {
    if (!err) {

      if(req.query.format=="json"){
        return res.redirect('/articles/' + article._id+"?format=json");
      }
      else{
        return res.redirect('/articles/' + article._id);
      }
    }

    if(req.query.format=="json"){
       res.send( {
        title: 'Edit Article',
        article: article,
        errors: utils.errors(err.errors || err)
      });
    }
    else{
      res.render('articles/edit', {
        title: 'Edit Article',
        article: article,
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
      title: req.article.title,
      article: req.article
    });
  }

  else{
    res.render('articles/show', {
      title: req.article.title,
      article: req.article
    });
  }
};

/**
 * Delete an article
 */

exports.destroy = function (req, res){
  var article = req.article;
  article.remove(function (err){

    if(req.query.format=="json"){
      req.flash('info', 'Deleted successfully');
      res.redirect('/articles?format=json');
    }

    else{
      req.flash('info', 'Deleted successfully');
      res.redirect('/articles');
    }
  });
};
