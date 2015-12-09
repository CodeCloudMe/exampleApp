
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var result = req.result;
  utils.findByParam(result.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var result = req.result;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/results/'+ result.id);

  result.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/results/'+ result.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var result = req.result;
  result.removeCategory(req.params.resultCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/results/' + result.id);
  });
};
