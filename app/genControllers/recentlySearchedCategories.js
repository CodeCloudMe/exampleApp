
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var recentlySearched = req.recentlySearched;
  utils.findByParam(recentlySearched.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var recentlySearched = req.recentlySearched;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/recentlySearcheds/'+ recentlySearched.id);

  recentlySearched.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/recentlySearcheds/'+ recentlySearched.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var recentlySearched = req.recentlySearched;
  recentlySearched.removeCategory(req.params.recentlySearchedCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/recentlySearcheds/' + recentlySearched.id);
  });
};
