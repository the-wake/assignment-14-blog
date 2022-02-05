const router = require('express').Router();
const { Comment } = require('../../models');
const { restore } = require('../../models/User');
const withAuth = require('../../utils/auth.js');

// /api/comments
// New post
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            postId: req.body.postId,
            body: req.body.body,
            userId: req.session.userId,
        });
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;
