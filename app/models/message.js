
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
 * Message Schema
 */

var MessageSchema = new Schema({
  title: {type : String, default : '', trim : true},
  body: {type : String, default : '', trim : true},
  user: {type : Schema.ObjectId, ref : 'User'},
  comments: [{
    body: { type : String, default : '' },
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
  toUsers:[],
  toUser: {type: Schema.Types.ObjectId, ref: 'User'},
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

//MessageSchema.index({type: 1, location: 1});
MessageSchema.index({ location: '2dsphere' });
MessageSchema.index({ loc: '2dsphere' });
MessageSchema.index({ type: 'Point' });


/**
 * Validations
 */

MessageSchema.path('title').required(true, 'Message title cannot be blank');
MessageSchema.path('body').required(true, 'Message body cannot be blank');

/**
 * Pre-remove hook
 */

MessageSchema.pre('remove', function (next) {
  var imager = new Imager(imagerConfig, 'S3');
  var files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  imager.remove(files, function (err) {
    if (err) return next(err);
  }, 'message');

  next();
});

/**
 * Methods
 */

MessageSchema.methods = {

  /**
   * Save message and upload image
   *
   * @param {Object} images
   * @param {Function} cb
   * @api private
   */

  uploadAndSave: function (images, cb) {
    if (!images || !images.length) return this.save(cb)

      console.log(images);
    var fs = require('fs');
    //create uploads folder if it doesn't exsit
      try{

       var statsFolder = fs.lstatSync('./public/uploads/');
       fs.createReadStream(images[0]['path']).pipe(fs.createWriteStream('./public/uploads/'+images[0]['name']))

      }
      catch(err){
        console.log('uploads Folder doesnt exist. create /public/uploads folder');

        fs.mkdir('./public/uploads/',function(e){
            
          console.log('created uploads folder')
          fs.createReadStream(images[0]['path']).pipe(fs.createWriteStream('./public/uploads/'+images[0]['name']))
        });
      }

    
    
    console.log('save upload')
    ;

    //if using amazon...
    //var imager = new Imager(imagerConfig, 'S3');
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
      }, 'message');*/
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
    var notify = require('../mailer');

    this.comments.push({
      body: comment.body,
      user: user._id
    });

    if (!this.user.email) this.user.email = 'email@product.com';
    notify.comment({
      message: this,
      currentUser: user,
      comment: comment.body
    });

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
  }
}

/**
 * Statics
 */

MessageSchema.statics = {

  /**
   * Find message by id
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
   * List messages
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
      .populate('user', 'name username email')
      .populate('toUser', 'name username email')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);


   }
   
  }
}

mongoose.model('Message', MessageSchema);
