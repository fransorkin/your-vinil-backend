const express = require('express');
const Vinyl = require('../models/Vinyl.model');
const { authenticate } = require('../middleware/auth');
const commentsRouter = require('./comments.routes');

const router = express.Router();

// Usar rutas de comentarios como sub-router
router.use('/:id/comments', commentsRouter);

// GET /api/vinyls - Obtener todos los vinyls con filtros opcionales
router.get('/', async (req, res) => {
  try {
    const { genre, owner, search, limit = 20, page = 1 } = req.query;
    const filter = { isPublic: true };

    if (genre) filter.genre = genre;
    if (owner) filter.owner = owner;
    if (search) filter.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const vinyls = await Vinyl.find(filter)
      .populate('owner', 'username email profileImage')
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 });

    const total = await Vinyl.countDocuments(filter);

    res.status(200).json({
      message: 'Vinyls retrieved successfully',
      data: vinyls,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get vinyls error:', error);
    res.status(500).json({
      message: 'Error retrieving vinyls',
      error: error.message,
    });
  }
});

// GET /api/vinyls/:id - Obtener un vinyl específico por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const vinyl = await Vinyl.findById(id).populate('owner', 'username email profileImage');

    if (!vinyl) {
      return res.status(404).json({
        message: 'Vinyl not found',
        error: `No vinyl found with ID ${id}`,
      });
    }

    res.status(200).json({
      message: 'Vinyl retrieved successfully',
      data: vinyl,
    });
  } catch (error) {
    console.error('Get vinyl error:', error);
    res.status(500).json({
      message: 'Error retrieving vinyl',
      error: error.message,
    });
  }
});

// POST /api/vinyls - Crear un nuevo vinyl (protegida)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, artist, genre, description, purchaseLocation, releaseYear, condition, image } = req.body;

    if (!title || !artist || !genre) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['title', 'artist', 'genre'],
      });
    }

    const newVinyl = new Vinyl({
      title,
      artist,
      genre,
      description: description || '',
      purchaseLocation: purchaseLocation || '',
      releaseYear: releaseYear || null,
      condition: condition || 'Good',
      image: image || null,
      owner: req.user.id,
    });

    await newVinyl.save();
    await newVinyl.populate('owner', 'username email profileImage');

    res.status(201).json({
      message: 'Vinyl created successfully',
      data: newVinyl,
    });
  } catch (error) {
    console.error('Create vinyl error:', error);
    res.status(500).json({
      message: 'Error creating vinyl',
      error: error.message,
    });
  }
});

// PUT /api/vinyls/:id - Actualizar vinyl (protegida + solo owner)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, genre, description, purchaseLocation, releaseYear, condition, image, isPublic } = req.body;

    const vinyl = await Vinyl.findById(id);

    if (!vinyl) {
      return res.status(404).json({
        message: 'Vinyl not found',
        error: `No vinyl found with ID ${id}`,
      });
    }

    if (vinyl.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Unauthorized',
        error: 'You do not have permission to update this vinyl',
      });
    }

    if (title) vinyl.title = title;
    if (artist) vinyl.artist = artist;
    if (genre) vinyl.genre = genre;
    if (description !== undefined) vinyl.description = description;
    if (purchaseLocation !== undefined) vinyl.purchaseLocation = purchaseLocation;
    if (releaseYear) vinyl.releaseYear = releaseYear;
    if (condition) vinyl.condition = condition;
    if (image !== undefined) vinyl.image = image;
    if (isPublic !== undefined) vinyl.isPublic = isPublic;

    await vinyl.save();
    await vinyl.populate('owner', 'username email profileImage');

    res.status(200).json({
      message: 'Vinyl updated successfully',
      data: vinyl,
    });
  } catch (error) {
    console.error('Update vinyl error:', error);
    res.status(500).json({
      message: 'Error updating vinyl',
      error: error.message,
    });
  }
});

// DELETE /api/vinyls/:id - Eliminar vinyl (protegida + solo owner)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const vinyl = await Vinyl.findById(id);

    if (!vinyl) {
      return res.status(404).json({
        message: 'Vinyl not found',
        error: `No vinyl found with ID ${id}`,
      });
    }

    if (vinyl.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Unauthorized',
        error: 'You do not have permission to delete this vinyl',
      });
    }

    await Vinyl.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Vinyl deleted successfully',
      data: {
        id: vinyl._id,
        title: vinyl.title,
      },
    });
  } catch (error) {
    console.error('Delete vinyl error:', error);
    res.status(500).json({
      message: 'Error deleting vinyl',
      error: error.message,
    });
  }
});

module.exports = router;
