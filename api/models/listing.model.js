import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    condition: {
      type: String, // New field for condition (new or used)
      required: true,
      enum: ['new', 'used'], // Condition should be either 'new' or 'used'
    },
    category: {
      type: String, // New field for category (books or electronics)
      required: true,
      enum: ['books', 'electronics', 'furniture'], // Category should be either 'books' or 'electronics'
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: [String], // Array of image URLs
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
