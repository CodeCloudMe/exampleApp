
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var utils = require('../../lib/utils');

/**
 * Load comment
 */

exports.load = function (req, res, next, id) {
  var user = req.user;
  utils.findByParam(user.comments, { id: id }, function (err, comment) {
    if (err) return next(err);
    req.comment = comment;
    next();
  });
};

/**
 * Create comment
 */
/*
exports.create = function (req, res) {
  var user = req.userCommentId;
  //var toUser = req.toUser;

  console.log('toUser is'+ toUser+"\n\n\n\n\n")
  
  console.log(req.body);
  if (!req.body.body) return res.redirect('/users/'+ user.id);

  toUser.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/users/'+ user.id);
  });
}

*/

exports.create = function (req, res) {
  var user = req.user;
  
  console.log(req.body);
  if (!req.body.body) return res.redirect('/users/'+ user.id);

  user.addComment(user, req.body, function (err) {
    if (err) return res.render('500');
    res.redirect('/users/'+ user.id);
  });
}



/**
 * Delete comment
 */

exports.destroy = function (req, res) {
  var user = req.user;
  user.removeComment(req.params.commentId, function (err) {
    if (err) {
      req.flash('error', 'Oops! The comment was not found');
    } else {
      req.flash('info', 'Removed comment');
    }
    res.redirect('/users/' + user.id);
  });
};
