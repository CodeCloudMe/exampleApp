
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var browse = req.browse;
  utils.findByParam(browse.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var browse = req.browse;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/browses/'+ browse.id);

  browse.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/browses/'+ browse.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var browse = req.browse;
  browse.removeComment(req.params.browseCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/browses/' + browse.id);
  });
};
