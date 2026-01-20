const mongoose = require('mongoose');

const vinylSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Vinyl title is required'],
      trim: true,
      maxlength: [100, 'Title must not exceed 100 characters'],
    },
    artist: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: ['Rock', 'Pop', 'Jazz', 'Clásica', 'Electrónica', 'Hip-Hop', 'R&B', 'Country', 'Folk', 'Metal', 'Reggae', 'Otro'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must not exceed 500 characters'],
    },
    purchaseLocation: {
      type: String,
      trim: true,
    },
    releaseYear: {
      type: Number,
      min: [1900, 'Release year must be 1900 or later'],
      max: [new Date().getFullYear(), 'Release year cannot be in the future'],
    },
    condition: {
      type: String,
      enum: ['Nuevo', 'Casi Nuevo', 'Muy Bueno', 'Bueno', 'Regular', 'Pobre'],
      default: 'Bueno',
    },
    image: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

vinylSchema.index({ owner: 1 });
vinylSchema.index({ genre: 1 });
vinylSchema.index({ title: 'text', artist: 'text' });

module.exports = mongoose.model('Vinyl', vinylSchema);






