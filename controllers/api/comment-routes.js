const router = require('express').Router();
const { Comment } = require('../../models');
const { restore } = require('../../models/User');
const withAuth = require('../../utils/auth.js');

// /api/comments
// New post
router.post('/', withAuth, async (req, res) => {
    // console.log(req.session.userId);
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

// TODO: Methods below this point
// Update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(`Post ID ${req.params.id} successfully deleted.`)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;
