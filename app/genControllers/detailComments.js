
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var detail = req.detail;
  utils.findByParam(detail.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */

exports.create = function (req, res) {
  var detail = req.detail;
  var user = req.user;
  console.log(req.body);
  if (!req.body.body) return res.redirect('/details/'+ detail.id);

  detail.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/details/'+ detail.id);
  });
}

/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var detail = req.detail;
  detail.removeComment(req.params.detailCommentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/details/' + detail.id);
  });
};
