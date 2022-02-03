const router = require('express').Router();

// /api/posts
// Get all posts
router.get('/', async (req, res) => {
    try {
        res.status(200).render('all-posts');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.status(200).render('single-post');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
