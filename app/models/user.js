
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var crypto = require('crypto');


var utils = require('../../lib/utils');


var Schema = mongoose.Schema;
var oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
];

/**
 * User Schema
 */

var UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  city: { type: String, default: '' },
  country: { type: String, default: '' },
  occupation: { type: String, default: '' },
  website: { type: String, default: '' },
  company: { type: String, default: '' },
  username: { type: String, default: '' },
  sectionTitle : { type: String, default: '' },
  description: { type: String, default: '' },
  provider: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' },
  authToken: { type: String, default: '' },
  linkDescription: { type: String, default: '' },
  linkTitle : { type: String, default: '' },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {},
  pinterest:{},


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
     body: { type : String, default : 'like' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],

   categories: [{
    category: { type :String, default :'default'},
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],

   followings: [{
    following:  { type : Schema.ObjectId, ref : 'User' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],


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


});

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 5 validations only apply if you are signing up traditionally

UserSchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true;
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) fn(true);

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');

UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, 'Username cannot be blank');


UserSchema.path('hashed_password').validate(function (hashed_password) {
  try{
    if (this.skipValidation()) return true;
    return hashed_password.length && this._password.length;
  }
  catch(err){
    console.log('hashed pass issue')
  }
}, 'Password cannot be blank');



/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

    changePassword: function (exPassword,newPassword1,newPassword2) {
    
     return((this.encryptPassword(exPassword) === this.hashed_password) && (newPassword1 === newPassword2));
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation: function() {
    return ~oAuthTypes.indexOf(this.provider);
  },








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
      }, 'article');*/
    });
  },
















addComment: function (user, comment, cb) {
   // var notify = require('../mailer');
 //  console.log(this);

 console.log(comment.user);
 console.log('\n\n\n\n\n\n\n\n')

    this.comments.push({
      body: comment.body,
      user: user
    });
/*
    if (!this.user.email) this.user.email = 'email@product.com';
    notify.comment({
      article: this,
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
    var index = utils.indexof(this.likes, { id: commentId });
    if (~index) this.likes.splice(index, 1);
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


},









/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'name username comments ratings followings likes categories';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },



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

mongoose.model('User', UserSchema);
