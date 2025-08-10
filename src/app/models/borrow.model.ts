import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true }
}, { timestamps: true });

// Pre-save middleware (PRE HOOK) - Validates book availability before borrowing
borrowSchema.pre('save', async function(next) {
  try {
    const book = await mongoose.model('Book').findById(this.book);
    if (!book) {
      throw new Error('Book not found');
    }
    if (book.copies < this.quantity) {
      throw new Error('Insufficient copies available for borrowing');
    }
    if (!book.available) {
      throw new Error('Book is not available for borrowing');
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Pre-save middleware (PRE HOOK) - Validates due date is in the future
borrowSchema.pre('save', function(next) {
  const today = new Date();
  if (this.dueDate <= today) {
    this.invalidate('dueDate', 'Due date must be in the future');
  }
  next();
});

// Post-save middleware (POST HOOK) - Updates book copies after borrowing
borrowSchema.post('save', async function(doc) {
  try {
    const book = await mongoose.model('Book').findById(doc.book);
    if (book) {
      book.copies -= doc.quantity;
      // The book model's pre-save hook will automatically update availability
      await book.save();
      console.log(`Book "${book.title}" borrowed: ${doc.quantity} copies. Remaining: ${book.copies}`);
    }
  } catch (error) {
    console.error('Error updating book copies after borrowing:', error);
  }
});

// Post-remove middleware (POST HOOK) - Restores book copies when borrowing is cancelled
borrowSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    try {
      const book = await mongoose.model('Book').findById(doc.book);
      if (book) {
        book.copies += doc.quantity;
        await book.save();
        console.log(`Book "${book.title}" borrowing cancelled: ${doc.quantity} copies restored. Total: ${book.copies}`);
      }
    } catch (error) {
      console.error('Error restoring book copies after borrowing cancellation:', error);
    }
  }
});

export default mongoose.model<IBorrow>('Borrow', borrowSchema);