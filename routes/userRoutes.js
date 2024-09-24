import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// ראוט לקריאת כל המשתמשים
router.get('/', getAllUsers);

// ראוט לקריאת משתמש לפי ID
router.get('/:id', getUserById);

// ראוט ליצירת משתמש חדש
router.post('/', createUser);

// ראוט לעדכון משתמש קיים
router.put('/:id', updateUser);

// ראוט למחיקת משתמש
router.delete('/:id', deleteUser);

router.post('/login', loginUser)

export default router;
