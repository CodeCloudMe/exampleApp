
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var search = req.search;
  utils.findByParam(search.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var search = req.search;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/searchs/'+ search.id);

  search.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/searchs/'+ search.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var search = req.search;
  search.removeComment(req.params.searchCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/searchs/' + search.id);
  });
};
