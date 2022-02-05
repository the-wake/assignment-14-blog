const router = require('express').Router();
const { Post, User } = require('../../models');
const { restore } = require('../../models/User');
const withAuth = require('../../utils/auth.js');

// /api/posts
// Create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.session.userId,
        });
        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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
        const postData = await Post.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                },
            ]
        });

        const post = postData.get({ plain: true });

        if (req.session.username != post.user.username) {
            res.status(403).send('Nice try, but you can\'t delete a post you don\'t own.');
            return;
        }

        Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


module.exports = router;
