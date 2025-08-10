import { Request, Response } from "express";
import bookModel from "../models/book.model";

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await bookModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error
    });
  }
};

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
  
  try {
    let books;
    
    // Use static method if filtering by genre
    if (filter) {
      books = await bookModel.findByGenre(filter as string);
    } else {
      // Use static method for available books
      books = await bookModel.findAvailableBooks();
    }
    
    // Apply sorting and limit
    books = books
      .sort((a: any, b: any) => {
        const aValue = a[sortBy as string];
        const bValue = b[sortBy as string];
        
        if (sort === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      })
      .slice(0, parseInt(limit as string));
    
    console.log(`Retrieved ${books.length} books`);
    
    res.json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    console.log("error showing", error);
    res.status(500).json({ success: false, message: 'Error retrieving books', error });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await bookModel.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: 'Book not found', 
        error: 'Book with this ID does not exist' 
      });
      return;
    }
    res.json({ success: true, message: 'Book retrieved successfully', data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving book', error });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await bookModel.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: 'Book not found', 
        error: 'Book with this ID does not exist' 
      });
      return;
    }
    
    // Use instance method to update availability if copies were modified
    if (req.body.copies !== undefined) {
      await book.updateAvailability();
    }
    
    res.json({ success: true, message: 'Book updated successfully', data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating book', error });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: 'Book not found', 
        error: 'Book with this ID does not exist' 
      });
      return;
    }
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error deleting book', error });
  }
};

// New endpoint to demonstrate static methods
export const getBooksByGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre } = req.params;
    const books = await bookModel.findByGenre(genre);
    
    res.json({
      success: true,
      message: `Books in ${genre} genre retrieved successfully`,
      data: books
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving books by genre', error });
  }
};