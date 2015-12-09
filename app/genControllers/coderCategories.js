
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var coder = req.coder;
  utils.findByParam(coder.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var coder = req.coder;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/coders/'+ coder.id);

  coder.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/coders/'+ coder.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var coder = req.coder;
  coder.removeCategory(req.params.coderCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/coders/' + coder.id);
  });
};
