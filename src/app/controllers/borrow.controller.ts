import { Request, Response } from 'express';
import bookModel from '../models/book.model';
import borrowModel from '../models/borrow.model';

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    
    // The middleware will handle all validations automatically
    const borrow = await borrowModel.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    });
  } catch (error: any) {
    // Handle validation errors from middleware
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: {
          name: error.name,
          errors: error.errors
        }
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Borrow failed', 
        error: error.message 
      });
    }
  }
};

export const getBorrowedSummary = async (_req: Request, res: Response): Promise<void> => {
  try {
    const summary = await borrowModel.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      { $unwind: '$bookInfo' },
      {
        $project: {
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn'
          },
          totalQuantity: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Summary failed', error });
  }
};

// New endpoint to demonstrate middleware functionality
export const cancelBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { borrowId } = req.params;
    
    const borrow = await borrowModel.findByIdAndDelete(borrowId);
    if (!borrow) {
      res.status(404).json({
        success: false,
        message: 'Borrow record not found',
        error: 'Borrow with this ID does not exist'
      });
      return;
    }

    // The post-remove middleware will automatically restore book copies
    res.json({
      success: true,
      message: 'Borrow cancelled successfully',
      data: null
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error cancelling borrow', 
      error: error instanceof Error ? error.message : error 
    });
  }
};
