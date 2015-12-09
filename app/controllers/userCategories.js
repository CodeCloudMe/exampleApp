
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var user = req.user;
  utils.findByParam(user.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var user = req.user;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/users/'+ user.id);

  user.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/users/'+ user.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var user = req.user;
  user.removeCategory(req.params.userCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/users/' + user.id);
  });
};
