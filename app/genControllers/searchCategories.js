
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load category
 */

exports.load = function (req, res, next, id) {
  var search = req.search;
  utils.findByParam(search.categorys, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.category = comment;
    next();
  });
};

/**
 * Create category
 */

exports.create = function (req, res) {
  var search = req.search;
  var user = req.user;
  console.log(req.body);
  if (!req.body.category) return res.redirect('/searchs/'+ search.id);

  search.addCategory(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/searchs/'+ search.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var search = req.search;
  search.removeCategory(req.params.searchCategoryId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed category');
    }
    res.redirect('/searchs/' + search.id);
  });
};
