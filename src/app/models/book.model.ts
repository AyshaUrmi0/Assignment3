import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  // Add instance method to interface
  updateAvailability(): Promise<IBook>;
}

// Add static methods interface
export interface IBookModel extends mongoose.Model<IBook> {
  findByGenre(genre: string): Promise<IBook[]>;
  findAvailableBooks(): Promise<IBook[]>;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
  },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true }
}, { timestamps: true });

// Pre-save middleware (PRE HOOK) - Updates availability when copies change
bookSchema.pre('save', function(next) {
  if (this.copies === 0) {
    this.available = false;
  } else if (this.copies > 0) {
    this.available = true;
  }
  next();
});

// Pre-validate middleware (PRE HOOK) - Ensures ISBN is unique
bookSchema.pre('validate', async function(next) {
  if (this.isModified('isbn')) {
    const existingBook = await mongoose.model('Book').findOne({ isbn: this.isbn, _id: { $ne: this._id } });
    if (existingBook) {
      this.invalidate('isbn', 'ISBN must be unique');
    }
  }
  next();
});

// Post-save middleware (POST HOOK) - Logs book operations
bookSchema.post('save', function(doc) {
  console.log(`Book "${doc.title}" saved with ${doc.copies} copies available`);
});

// Instance method - Updates book availability based on copies
bookSchema.methods.updateAvailability = function() {
  this.available = this.copies > 0;
  return this.save();
};

// Static method - Find books by genre
bookSchema.statics.findByGenre = function(genre: string) {
  return this.find({ genre, available: true });
};

// Static method - Find all available books
bookSchema.statics.findAvailableBooks = function() {
  return this.find({ available: true });
};

export default mongoose.model<IBook, IBookModel>('Book', bookSchema);