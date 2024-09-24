import { v4 as uuidv4 } from 'uuid';
import { readUsersFromFile, writeUsersToFile } from '../services/service.js';

import { validateEmail, validatePassword } from '../services/service.js';
import bcrypt from 'bcrypt';







export const getAllUsers = (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
};

export const getUserById = (req, res) => {/////dlvsrjmbhin;vwhemcodvs
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
};

export const createUser = (req, res) => {   
    const { name, email, password } = req.body;
    if(!validateEmail(email)) {
        return res.status(400).send('Invalid email');
    }

    if(!validatePassword(password)) {
        return res.status(400).send('Invalid password');
    }
    const saltRounds = 10; // מספר הסיבובים

    // הצפנת הסיסמה באמצעות callback
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        const newUser = {
            id: uuidv4(),
            name: name,
            email: email,
            password: hash // שמירת הסיסמה המוצפנת
        };
        
        users.push(newUser);
        writeUsersToFile(users);

        res.status(201).json(newUser);
    });
};


export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        const updatedUser = {
            id: id,
            name: users[userIndex].name,
            email: users[userIndex].email,
            password: users[userIndex].password
        };

        users[userIndex] = updatedUser;
        writeUsersToFile(users);
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    console.log(typeof userId);
    const users = readUsersFromFile();  // קריאה מקובץ JSON
    const userIndex = users.findIndex(u => u.id === Number( userId));
    console.log(userIndex);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);  // מחיקת המשתמש מהמערך

        // כתיבת המערך המעודכן חזרה לקובץ JSON
        writeUsersToFile(users);

        res.send(`User with id ${userId} deleted`);
    } else {
        res.status(404).send('User not found');
    }
};


export const loginUser = (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};