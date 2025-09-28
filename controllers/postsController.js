const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
    try {
        const { title, body, author, tags } = req.body;
        const post = await Post.create({ title, body, author, tags });
        return res.status(201).json(post);
    } catch (err) {
        return next(err);
    }
};

exports.getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const search = req.query.search || '';
        const tag = req.query.tag;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { body: { $regex: search, $options: 'i' } }
            ];
        }
        if (tag) {
            filter.tags = tag;
        }
        const total = await Post.countDocuments(filter);
        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            posts
        });
    } catch (err) {
        return next(err);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.json(post);
    } catch (err) {
        return next(err);
    }
};
exports.updatePost = async(req,res,next) => {
    try{
        const updates = req.body;
        const post = await Post.findByIdAndUpdate(req.params.id,updates, {
            new: true,
            runValidators: true
        });
        if (!post) {
            return res.status(404).json({message: 'Post not found'});

        }
        return res.json(post);

    } catch(err) {
        return next(err);
    }
};
exports.deletePost = async(req,res,next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if( !post) {
            return res.status(404).json({message:'Post not found'});

        }
        return res.json({message:'Post deleted'});

    } catch(err) {
        return next(err);
    }
};