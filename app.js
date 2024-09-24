import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3000;


// Middleware ל-parsing של JSON
app.use(express.json());

// חיבור הראוטים
app.use('/users', userRoutes);

// הפעלת השרת
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
