const router = require('express').Router();
const session = require('express-session');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js');
const { formatDate, setDate } = require('../utils/helpers.js');


// dashboard
// show all of my posts
router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                userId: req.session.userId
            },
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                },
            ]
        });
        const posts = allPosts.map((post) => post.get({ plain: true }));
        posts.forEach(post => post.createdAt = setDate(post.createdAt));
        
        res.status(200).render('all-posts-admin', { posts, layout: 'dashboard', loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// /dashboard/new
// New post page
router.get('/new', withAuth, async (req, res) => {
    try {
        res.status(200).render('new-post', { layout: 'dashboard', loggedIn: req.session.loggedIn, userSession: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Load edit page
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                    }
                },
            ]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post with this ID!' });
            return;
        }

        const post = postData.get({ plain: true });
        
        if (req.session.username != post.user.username) {
            res.status(403).send('You don\'t have permission to access this page.');
            return;
        }

        res.render('edit-post', { post, layout: 'dashboard', loggedIn: req.session.loggedIn, userSession: req.session.username, postAuthor: post.user.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;
