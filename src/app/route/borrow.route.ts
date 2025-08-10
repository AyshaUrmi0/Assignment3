import express from 'express';
import { borrowBook, getBorrowedSummary, cancelBorrow } from '../controllers/borrow.controller';

export const borrowRoutes = express.Router();

borrowRoutes.post('/', borrowBook);
borrowRoutes.get('/', getBorrowedSummary);
borrowRoutes.delete('/:borrowId', cancelBorrow); // New route to demonstrate middleware
