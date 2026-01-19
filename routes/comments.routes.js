const express = require('express');
const Comment = require('../models/Comment.model');
const Vinyl = require('../models/Vinyl.model');
const { authenticate } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// GET /api/vinyls/:id/comments
router.get('/', async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 20, page = 1, sort = 'newest' } = req.query;

    const vinyl = await Vinyl.findById(id);
    if (!vinyl) {
      return res.status(404).json({
        message: 'Vinyl not found',
        error: `No vinyl found with ID ${id}`,
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let sortOptions = { createdAt: -1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };
    else if (sort === 'likes') sortOptions = { likes: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };

    const comments = await Comment.find({ vinyl: id })
      .populate('author', 'username profileImage')
      .limit(parseInt(limit))
      .skip(skip)
      .sort(sortOptions);

    const total = await Comment.countDocuments({ vinyl: id });

    res.status(200).json({
      message: 'Comments retrieved successfully',
      data: comments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      message: 'Error retrieving comments',
      error: error.message,
    });
  }
});

// POST /api/vinyls/:id/comments
router.post('/', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        message: 'Missing or invalid content',
        error: 'Comment content is required',
      });
    }

    if (content.length > 500) {
      return res.status(400).json({
        message: 'Content too long',
        error: 'Comment must not exceed 500 characters',
      });
    }

    const vinyl = await Vinyl.findById(id);
    if (!vinyl) {
      return res.status(404).json({
        message: 'Vinyl not found',
        error: `No vinyl found with ID ${id}`,
      });
    }

    const newComment = new Comment({
      content: content.trim(),
      vinyl: id,
      author: req.user.id,
      rating: rating ? Math.min(5, Math.max(1, parseInt(rating))) : null,
      isEdited: false,
    });

    await newComment.save();
    await newComment.populate('author', 'username profileImage');

    res.status(201).json({
      message: 'Comment created successfully',
      data: newComment,
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      message: 'Error creating comment',
      error: error.message,
    });
  }
});

// DELETE /api/vinyls/:vinylId/comments/:commentId
router.delete('/:commentId', authenticate, async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found',
        error: `No comment found with ID ${commentId}`,
      });
    }

    // Verificar que el usuario sea el autor del comentario
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Unauthorized',
        error: 'You can only delete your own comments',
      });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      message: 'Error deleting comment',
      error: error.message,
    });
  }
});

module.exports = router;
