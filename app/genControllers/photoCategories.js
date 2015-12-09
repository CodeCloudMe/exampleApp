
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var photo = req.photo;
  utils.findByParam(photo.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var photo = req.photo;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/photos/'+ photo.id);

  photo.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/photos/'+ photo.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var photo = req.photo;
  photo.removeCategory(req.params.photoCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/photos/' + photo.id);
  });
};
