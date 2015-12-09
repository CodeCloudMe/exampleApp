
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Imager = require('imager');
//var config = require('config');

var imagerConfig = require('../../config/imager.js');


var utils = require('../../lib/utils');

var Schema = mongoose.Schema;

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};

/**
 * Photo Schema
 */

var PhotoSchema = new Schema({
  title: {type : String, default : '', trim : true},
  body: {type : String, default : '', trim : true},
  user: {type : Schema.ObjectId, ref : 'User'},
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],

  ratings: [{
    rating: { type : Number, default : 3 },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],

  likes: [{
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],

   categories: [{
    category: { type :String, default :'default'},
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],


  tags: {type: [], get: getTags, set: setTags},
  image: {
    cdnUri: String,
    files: []
  },
  createdAt  : {type : Date, default : Date.now},

  //added
  media: [{
    url: { type : String, default : '' },
    type: { type : String, default : '' },
    files: [],
    createdAt: { type : Date, default : Date.now }
  }],
  location: {type: [Number], default: [-74.0059, 40.7127], index: '2dsphere' },
  //loc:{ type: {type : String, default : 'Point', index:true}, coordinates: {type: [Number], default: [-74.0059, 40.7127], index: '2dsphere' }},
   
  //type: String, default : 'Point' 
  type: {type : String, default : 'Point', index:true},
  updatedAt  : {type : Date, default : Date.now},
  price:{type: Number, default:0.00},
  rating:{type: Number, default:0.00},
  numRatings:{type: Number, default:0},
  email: {type : String, default : '', index:true},
  startDate: { type : Date, default : Date.now },
  endDate: { type : Date },
  availableNow: { type : Boolean, default:false },
  availabilitySlots: {type: []},
  accessSecret:{type : String, default : ''}


});

//PhotoSchema.index({type: 1, location: 1});
PhotoSchema.index({ location: '2dsphere' });
PhotoSchema.index({ loc: '2dsphere' });
PhotoSchema.index({ type: 'Point' });


/**
 * Validations
 */

PhotoSchema.path('title').required(true, 'Photo title cannot be blank');
PhotoSchema.path('body').required(true, 'Photo body cannot be blank');

/**
 * Pre-remove hook
 */

PhotoSchema.pre('remove', function (next) {
  /*
  var imager = new Imager(imagerConfig, 'S3');
  var files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  imager.remove(files, function (err) {
    if (err) return next(err);
  }, 'photo');
*/
  next();
});

/**
 * Methods
 */

PhotoSchema.methods = {

  /**
   * Save photo and upload image
   *
   * @param {Object} images
   * @param {Function} cb
   * @api private
   */

  uploadAndSave: function (images, cb) {
    if (!images || !images.length) return this.save(cb)

      console.log(images);
    var fs = require('fs');
    fs.createReadStream(images[0]['path']).pipe(fs.createWriteStream('./public/uploads/'+images[0]['name']))
    console.log('wrote file')
    ;
    var imager = new Imager(imagerConfig, 'Local');
    var self = this;

    this.validate(function (err) {
      if (err) {
        console.log("error:"+err);
        return cb(err);

      }
       
      
        if (images.length) {
          self.image = { cdnUri : '/uploads/'+images[0]['name'], files : images };
        }
        self.save(cb);
      

      /*
      imager.upload(images, function (err, cdnUri, files) {
        if (err) {
        console.log("error1:"+err);
        return cb(err);

      }
        if (files.length) {
          self.image = { cdnUri : cdnUri, files : files };
        }
        self.save(cb);
      }, 'photo');*/
    });
  },

  /**
   * Add comment
   *
   * @param {User} user
   * @param {Object} comment
   * @param {Function} cb
   * @api private
   */

  addComment: function (user, comment, cb) {
   // var notify = require('../mailer');

    this.comments.push({
      body: comment.body,
      user: user._id
    });
/*
    if (!this.user.email) this.user.email = 'email@product.com';
    notify.comment({
      photo: this,
      currentUser: user,
      comment: comment.body
    });
*/
    this.save(cb);
  },

  /**
   * Remove comment
   *
   * @param {commentId} String
   * @param {Function} cb
   * @api private
   */

  removeComment: function (commentId, cb) {
    var index = utils.indexof(this.comments, { id: commentId });
    if (~index) this.comments.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  }, 







//add rating



 addRating: function (user, comment, cb) {
   // var notify = require('../mailer');

    this.ratings.push({
      rating: comment.rating,
      user: user._id
    })
    this.save(cb);
  },

  /**
   * Remove like
   *
   * @param {commentId} String
   * @param {Function} cb
   * @api private
   */

  removeRating: function (commentId, cb) {
    var index = utils.indexof(this.ratings, { id: commentId });
    if (~index) this.ratings.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  },




 addLike: function (user, comment, cb) {
   // var notify = require('../mailer');

    this.likes.push({
      user: user._id
    })
    this.save(cb);
  },

  /**
   * Remove like
   *
   * @param {commentId} String
   * @param {Function} cb
   * @api private
   */

  removeLike: function (commentId, cb) {
    var index = utils.indexof(this.likes, { id: commentId });
    if (~index) this.likes.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  },




 addCategory: function (user, comment, cb) {
   // var notify = require('../mailer');

    this.categories.push({
      category: comment.category,
      user: user._id
    })
    this.save(cb);
  },

  /**
   * Remove like
   *
   * @param {commentId} String
   * @param {Function} cb
   * @api private
   */

  removeCategory: function (commentId, cb) {
    var index = utils.indexof(this.categories, { id: commentId });
    if (~index) this.categories.splice(index, 1);
    else return cb('not found');
    this.save(cb);
  }

}




/**
 * Statics
 */

PhotoSchema.statics = {

  /**
   * Find photo by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email username')
      .populate('comments.user')
      .exec(cb);
  },

  /**
   * List photos
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {

    //area1 = { center: [-74.0059, 40.7127], radius: 5000000000, unique: true }
    var criteria = options.criteria || {}
   // this.find({location:{$near:[-74.0059, 40.7127], $maxDistance:500000000}})
   if(criteria['lon']){
    console.log(criteria['lon']);
     this.find()
    .or(criteria['query'])
    .where('location').near({
        center: {'coordinates':[criteria['lon'], criteria['lat']], 'type':"Point"},
        maxDistance: criteria['distance'],
         spherical: true
      })
  
      .populate('user', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
   }

   else{
    console.log('not geospatial')

     this.find()
      .or(criteria)
      .populate('user', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);


   }
   
  }
}

mongoose.model('Photo', PhotoSchema);

